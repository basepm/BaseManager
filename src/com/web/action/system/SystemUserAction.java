package com.web.action.system;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.support.cache.BaseDataCache;
import com.support.constant.Constant;
import com.support.entity.system.SystemUser;
import com.support.entity.system.SystemUserBind;
import com.support.status.Status;
import com.support.tool.CommonTool;
import com.web.service.BaseService;

/**
 * 
 * 用户
 * 
 * @author 朱亮
 *
 */
@Controller(value = "com.web.action.system.SystemUserAction")
@RequestMapping("/system/user/")
public class SystemUserAction {
    protected final static Log logger = LogFactory.getLog(SystemUserAction.class);

    @Resource
    private BaseService service;

    /**
     * 添加绑定用户
     * 
     * @param request
     * @param map
     * @return
     */
    @RequestMapping("/addBindUser.do")
    public ModelAndView addBindUser(HttpServletRequest request, ModelMap map) {
        Status status = Status.SUCCESS();

        try {
            if (request.getSession().getAttribute(Constant.ParamName.SYSTEM_USER_ID) != null) {
                String userid = (String) request.getSession().getAttribute(Constant.ParamName.SYSTEM_USER_ID);
                String nickname = request.getParameter("nickname");

                String sql = "select * from system_user where 1=1 and nickname = :nickname ";
                map.put("nickname", nickname);
                List<SystemUser> systemUsers = service.queryList(SystemUser.class, sql, map);
                if (systemUsers != null && systemUsers.size() > 0) {

                    String binduserid = systemUsers.get(0).getUserid();
                    sql = "select * from system_user_bind where 1=1 and userid = :userid and binduserid = :binduserid ";
                    map.put("binduserid", binduserid);
                    map.put("userid", userid);
                    if (service.queryList(sql, map).size() > 0) {
                        status.setRtnCode(-3);
                        status.setRtnMsg("已绑定该用户！");
                        return new ModelAndView("jsonView", "data", status);
                    }

                    String id = CommonTool.getRandomNumber();

                    SystemUser systemUser = new SystemUser();
                    SystemUser bindSystemUser = new SystemUser();
                    bindSystemUser.setUserid(binduserid);
                    systemUser.setUserid(userid);
                    SystemUserBind systemUserBind = new SystemUserBind();
                    systemUserBind.setUserid(systemUser.getUserid());
                    systemUserBind.setBinduserid(bindSystemUser.getUserid());
                    systemUserBind.setCreatetime(CommonTool.getSystemTime());
                    systemUserBind.setType(1);
                    systemUserBind.setUserbindid(id);
                    service.save(systemUserBind);

                    systemUserBind = service.get(SystemUserBind.class, id);

                    status.setRtnCode(0);
                    status.setRtnMsg(systemUserBind);
                } else {

                    status.setRtnCode(-2);
                    status.setRtnMsg("用户不存在！");
                }

            } else {

                status.setRtnCode(-1);
                status.setRtnMsg("需要登录！");
            }
        } catch (Exception e) {

            status.setRtnCode(-2);
            status.setRtnMsg("系统繁忙，请稍候再试！");
        }

        return new ModelAndView("jsonView", "data", status);
    }

    /**
     * 个人中心
     * 
     * @param request
     * @param map
     * @return
     */
    @RequestMapping("/toCenter.do")
    public String toCenter(HttpServletRequest request, ModelMap map, SystemUser systemUser) throws Exception {

        if (request.getSession().getAttribute(Constant.ParamName.SYSTEM_USER_ID) != null) {
            String userid = (String) request.getSession().getAttribute(Constant.ParamName.SYSTEM_USER_ID);
            systemUser = service.get(SystemUser.class, userid);

            request.getSession().setAttribute(Constant.ParamName.SYSTEM_USER_INFO, systemUser);
        }

        // 获取省市区列表
        List<Map<String, Object>> categorys = service.queryList("select * from wechat_category where optional=1", null);
        map.put("categorys", categorys);

        List<Map<String, Object>> categorylevels = service.queryList("select * from wechat_category_level where 1=1",
                null);
        map.put("categorylevels", categorylevels);
        map.put("provinces", BaseDataCache.Data.getProvince());
        map.put("citys", BaseDataCache.Data.getCity());
        map.put("areas", BaseDataCache.Data.getArea());
        map.put("id", "system/user/center.jsp");
        return Constant.PAGE.PUBLIC;
    }

    /**
     * 修改信息
     * 
     * @param request
     * @param map
     * @return
     */
    @RequestMapping("/updateInfo.do")
    public ModelAndView updateInfo(HttpServletRequest request, ModelMap map) throws Exception {
        Status status = Status.SUCCESS();
        String no = request.getParameter("no");
        String photo = request.getParameter("photo");
        String phone = request.getParameter("phone");
        String email = request.getParameter("email");
        String provinceno = request.getParameter("provinceno");
        String cityno = request.getParameter("cityno");
        String areano = request.getParameter("areano");
        String userid = (String) request.getSession().getAttribute(Constant.ParamName.SYSTEM_USER_ID);

        // if (email != null && email.trim().length() > 0) {
        // String sql =
        // "select count(*) from system_user where email=:email and userid != :userid";
        // map.put("email", email);
        // map.put("userid", userid);
        // int count = service.queryCount(sql, map);
        // if (count > 0) {
        // status.setRtnCode(-2);
        // status.setRtnMsg("邮箱已存在，请重新输入！");
        // return new ModelAndView("jsonView", "data", status);
        // }
        // }
        // if (no != null && no.trim().length() > 0) {
        // String sql =
        // "select count(*) from system_user where no=:no and userid != :userid";
        // map.put("no", no);
        // map.put("userid", userid);
        // int count = service.queryCount(sql, map);
        // if (count > 0) {
        // status.setRtnCode(-2);
        // status.setRtnMsg("身份证号已存在，请重新输入！");
        // return new ModelAndView("jsonView", "data", status);
        // }
        // }
        // if (phone != null && phone.trim().length() > 0) {
        // String sql =
        // "select count(*) from system_user where phone=:phone and userid != :userid";
        // map.put("phone", phone);
        // map.put("userid", userid);
        // int count = service.queryCount(sql, map);
        // if (count > 0) {
        // status.setRtnCode(-2);
        // status.setRtnMsg("手机号已存在，请重新输入！");
        // return new ModelAndView("jsonView", "data", status);
        // }
        // }
        if (request.getSession().getAttribute(Constant.ParamName.SYSTEM_USER_ID) != null) {
            status.setRtnCode(0);
            String sql = "update system_user set email=:email,no=:no,phone=:phone,photo=:photo,"
                    + "provinceno=:provinceno,cityno=:cityno,areano=:areano where userid=:userid";
            map.put("email", email);
            map.put("no", no);
            map.put("phone", phone);
            map.put("photo", photo);
            map.put("userid", userid);
            map.put("provinceno", provinceno);
            map.put("cityno", cityno);
            map.put("areano", areano);
            service.executeSql(sql, map);

        } else {
            status.setRtnCode(-1);
            status.setRtnMsg("");
        }
        return new ModelAndView("jsonView", "data", status);
    }

    /**
     * 重置密码
     * 
     * @param request
     * @param map
     * @return
     */
    @RequestMapping("/resetPassword.do")
    public ModelAndView resetPassword(HttpServletRequest request, ModelMap map, SystemUser systemUser) throws Exception {
        Status status = Status.SUCCESS();

        String id = CommonTool.getRandomNumber();

        if (systemUser.getUserid() == null || "".equals(systemUser.getUserid())) {

        } else {
            String password = request.getParameter("password");
            if (password != null && password.trim().length() > 0) {
                String password_md5 = DigestUtils.md5Hex(password).toString().toUpperCase();
                SystemUser user = service.get(SystemUser.class, systemUser.getUserid());
                if (!user.getPassword().equals(password_md5)) {

                    status.setRtnCode(-1);
                    status.setRtnMsg("您输入的原密码不正确！");
                    return new ModelAndView("jsonView", "data", status);
                }
            }
            String newpassword = request.getParameter("newpassword");
            if (newpassword == null || "".equals(newpassword)) {
                newpassword = "123456";
            }
            String newpassword_md5 = DigestUtils.md5Hex(newpassword).toString().toUpperCase();
            String sql = "update system_user set ";

            sql += "password=:password ";
            sql += " where userid = :userid";

            map.put("userid", request.getParameter("userid"));
            map.put("password", newpassword_md5);

            service.executeSql(sql, map);

        }
        status.setRtnCode(0);
        status.setRtnMsg(id);
        return new ModelAndView("jsonView", "data", status);
    }
}
