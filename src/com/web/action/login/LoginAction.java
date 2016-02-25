package com.web.action.login;

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
import com.support.cache.BaseSupportDataCache;
import com.support.constant.Constant;
import com.support.entity.base.BaseConfig;
import com.support.entity.base.BaseMailbox;
import com.support.entity.base.data.BaseDataArea;
import com.support.entity.base.data.BaseDataCity;
import com.support.entity.base.data.BaseDataCountry;
import com.support.entity.base.data.BaseDataProvince;
import com.support.entity.base.data.BaseDataStreet;
import com.support.entity.base.user.BaseUserRole;
import com.support.entity.system.SystemUser;
import com.support.status.Status;
import com.support.tool.CommonTool;
import com.support.tool.email.Mail;
import com.web.filter.BaseActionController;
import com.web.service.BaseService;

/**
 * 
 * 登录流程Action
 * 
 * @author 朱亮
 *
 */
@Controller
@RequestMapping("/login/")
public class LoginAction {
    protected final static Log logger = LogFactory.getLog(LoginAction.class);

    @Resource
    private BaseService service;

    /**
     * 登录页面
     * 
     * @param request
     * @param map
     * @return
     */
    @RequestMapping("/toLogin.do")
    public String toLogin(HttpServletRequest request, ModelMap map) {

        map.put("id", "login/login.jsp");
        return Constant.PAGE.PUBLIC;
    }

    /**
     * 登录
     * 
     * @param request
     * @param map
     * @return
     */
    @RequestMapping("/doLogin.do")
    public ModelAndView doLogin(HttpServletRequest request, ModelMap map) {

        Status status = Status.SUCCESS();
        try {
            String nickname = request.getParameter("nickname");
            String password = request.getParameter("password");
            if (nickname == null || nickname.equals("")) {
                status.setRtnCode(-1);
                status.setRtnMsg("请输入名登录名！");
                return new ModelAndView("jsonView", "data", status);
            }
            if (password == null || password.equals("")) {
                status.setRtnCode(-1);
                status.setRtnMsg("请输入登录密码！");
                return new ModelAndView("jsonView", "data", status);
            }
            SystemUser systemUser = null;

            String password_md5 = DigestUtils.md5Hex(password).toString().toUpperCase();
            String sql = "select * from system_user where nickname = :nickname and password = :password_md5";
            map.put("nickname", nickname);
            map.put("password_md5", password_md5);
            List<SystemUser> users = service.queryList(SystemUser.class, sql, map);
            if (users != null && users.size() == 1) {
                systemUser = users.get(0);
            }

            if (systemUser == null) {
                status.setRtnCode(-1);
                status.setRtnMsg("用户名或密码错误！");
                return new ModelAndView("jsonView", "data", status);
            }
            if (systemUser.getStatus() != null && systemUser.getStatus() == -1) {

                status.setRtnCode(-1);
                status.setRtnMsg("用户失效，请联系管理员！");
                return new ModelAndView("jsonView", "data", status);
            }
            // 效验是否有用户登录
            // if(systemUser.getOnlinestatus()!=null&&!systemUser.getOnlinestatus().equals("")&&systemUser.getOnlinestatus()
            // != 3){
            // status.setRtnCode(-2);
            // status.setRtnMsg("该用户已登录，请联系管理员！");
            // return new ModelAndView("jsonView","data",status);
            //
            // }

            request.getSession().setAttribute("accountid", null);
            request.getSession().setAttribute(Constant.ParamName.SYSTEM_USER_INFO, systemUser);
            request.getSession().setAttribute(Constant.ParamName.SYSTEM_USER_ID, systemUser.getUserid());
            request.getSession().setAttribute("userid", systemUser.getUserid());
            request.getSession().setAttribute("username", systemUser.getUsername());
            request.getSession().setAttribute("nickname", systemUser.getNickname());
            BaseDataCountry country = service.get(BaseDataCountry.class, systemUser.getCountryno());
            BaseDataProvince province = service.get(BaseDataProvince.class, systemUser.getProvinceno());
            BaseDataCity city = service.get(BaseDataCity.class, systemUser.getCityno());
            BaseDataArea area = service.get(BaseDataArea.class, systemUser.getAreano());
            BaseDataStreet street = service.get(BaseDataStreet.class, systemUser.getStreetno());
            if (country != null) {
                request.getSession().setAttribute("countryno", country.getCountryno());
                request.getSession().setAttribute("countryname", country.getName());
            }
            if (province != null) {
                request.getSession().setAttribute("provinceno", province.getProvinceno());
                request.getSession().setAttribute("provincename", province.getName());
            }
            if (city != null) {
                request.getSession().setAttribute("cityno", city.getCityno());
                request.getSession().setAttribute("cityname", city.getName());
            }
            if (area != null) {
                request.getSession().setAttribute("areano", area.getAreano());
                request.getSession().setAttribute("areaname", area.getName());
            }
            if (street != null) {
                request.getSession().setAttribute("streetno", street.getStreetno());
                request.getSession().setAttribute("streetname", street.getName());
            }
            request.getSession().setAttribute(Constant.ParamName.BASE_USER_ACTIONS, null);
            request.getSession().setAttribute(Constant.ParamName.BASE_USER_MENUS, null);
            request.getSession().setAttribute(Constant.ParamName.BASE_USER_MENUS_STR, null);
            request.getSession().setAttribute(Constant.ParamName.SYSTEM_USER_INFO, null);
            BaseActionController.initUserInfo(request);
            BaseActionController.initAllMenus(request);
            BaseActionController.initCanVisitAllActions(request);
            status.setRtnCode(0);
            status.setRtnMsg("登录成功！");
            logger.info("用户" + systemUser.getUserid() + "登录");
        } catch (Exception e) {
            status.setRtnCode(-1);
            status.setRtnMsg("系统繁忙，请联系管理员！");
            return new ModelAndView("jsonView", "data", status);
        }

        return new ModelAndView("jsonView", "data", status);
    }

    /**
     * 注册页面
     * 
     * @param request
     * @param map
     * @return
     */
    @RequestMapping("/toRegister.do")
    public String toRegister(HttpServletRequest request, ModelMap map) throws Exception {

        // 获取省市区列表
        List<BaseDataProvince> provinces = BaseDataCache.Data.getProvince();
        List<BaseDataCity> citys = BaseDataCache.Data.getCity();
        List<BaseDataArea> areas = BaseDataCache.Data.getArea();
        List<Map<String, Object>> categorys = service.queryList("select * from wechat_category where optional=1", null);
        map.put("categorys", categorys);
        List<Map<String, Object>> categorylevels = service.queryList("select * from wechat_category_level where 1=1",
                null);
        map.put("categorylevels", categorylevels);
        map.put("provinces", provinces);
        map.put("citys", citys);
        map.put("areas", areas);
        map.put("id", "login/register.jsp");
        return Constant.PAGE.PUBLIC;
    }

    /**
     * 注册
     * 
     * @param request
     * @param map
     * @return
     */
    @RequestMapping("/doRegister.do")
    public ModelAndView doRegister(HttpServletRequest request, ModelMap map) {

        Status status = Status.SUCCESS();
        try {
            String nickname = request.getParameter("nickname");
            String password = request.getParameter("password");
            String repeatpassword = request.getParameter("repeatpassword");
            String phone = request.getParameter("phone");
            String countryno = request.getParameter("countryno");
            String provinceno = request.getParameter("provinceno");
            String cityno = request.getParameter("cityno");
            String areano = request.getParameter("areano");
            // String accountnickname = request.getParameter("accountnickname");
            // String categoryid = request.getParameter("categoryid");
            // String categorylevelid = request.getParameter("categorylevelid");
            String icon = request.getParameter("icon");
            // String qrcode = request.getParameter("qrcode");
            String email = request.getParameter("email");
            countryno = countryno == null ? "86" : countryno;

            if (nickname == null || nickname.trim().equals("")) {
                status.setRtnCode(-1);
                status.setRtnMsg("请输入名登录名！");
                return new ModelAndView("jsonView", "data", status);
            }
            if (password == null || password.trim().equals("")) {
                status.setRtnCode(-1);
                status.setRtnMsg("请输入密码！");
                return new ModelAndView("jsonView", "data", status);
            }
            if (repeatpassword == null || repeatpassword.trim().equals("")) {
                status.setRtnCode(-1);
                status.setRtnMsg("请确认密码！");
                return new ModelAndView("jsonView", "data", status);
            }
            if (!repeatpassword.equals(password)) {
                status.setRtnCode(-1);
                status.setRtnMsg("两次密码输入不匹配！");
                return new ModelAndView("jsonView", "data", status);
            }
            if (phone == null || phone.trim().equals("")) {
                status.setRtnCode(-1);
                status.setRtnMsg("请输入手机号！");
                return new ModelAndView("jsonView", "data", status);
            }

            String sql = "select count(*) from system_user where nickname=:nickname ";
            map.put("nickname", nickname);
            int count = service.queryCount(sql, map);
            if (count > 0) {
                status.setRtnCode(-2);
                status.setRtnMsg("用户名已存在，请重新输入！");
                return new ModelAndView("jsonView", "data", status);
            }
            if (email != null && email.trim().length() > 0) {
                sql = "select count(*) from system_user where email=:email ";
                map.put("email", email);
                count = service.queryCount(sql, map);
                if (count > 0) {
                    status.setRtnCode(-2);
                    status.setRtnMsg("邮箱已存在，请重新输入！");
                    return new ModelAndView("jsonView", "data", status);
                }
            }

            SystemUser systemUser = new SystemUser();
            systemUser.setUsername(nickname);
            systemUser.setNickname(nickname);
            systemUser.setEmail(email);
            systemUser.setAreano(areano);
            systemUser.setCityno(cityno);
            systemUser.setCountryno(countryno);
            systemUser.setPhone(phone);
            systemUser.setPhoto(icon);
            systemUser.setProvinceno(provinceno);
            String password_md5 = DigestUtils.md5Hex(password).toString().toUpperCase();
            systemUser.setPassword(password_md5);
            String id = CommonTool.getRandomNumber();
            systemUser.setUserid(id);
            systemUser.setStatus(0);
            service.save(systemUser);

            if (BaseSupportDataCache.config.getDefaultroleid() != null) {
                BaseUserRole systemUserRole = new BaseUserRole();
                systemUserRole.setUserroleid(CommonTool.getRandomNumber());
                systemUserRole.setRoleid(BaseSupportDataCache.config.getDefaultroleid());
                systemUserRole.setUserid(systemUser.getUserid());
                service.save(systemUserRole);
            }

            logger.info("用户" + id + "注册");
            request.setAttribute("userid", systemUser.getUserid());
            status.setRtnCode(0);
            status.setRtnMsg("注册成功！");
            return new ModelAndView("jsonView", "data", status);
        } catch (Exception e) {
            e.printStackTrace();
        }

        status.setRtnCode(-99);
        status.setRtnMsg("注册失败！");
        return new ModelAndView("jsonView", "data", status);
    }

    /**
     * 找回密码发送邮件
     * 
     * @param request
     * @param map
     * @return
     */
    @RequestMapping("/toForgetPasswordSendMail.do")
    public String toForgetPasswordSendMail(HttpServletRequest request, ModelMap map) {

        map.put("id", "login/forgetPasswordSendMail.jsp");
        return Constant.PAGE.PUBLIC;
    }

    /**
     * 找回密码发送邮件
     * 
     * @param request
     * @param map
     * @return
     */
    @RequestMapping("/forgetPasswordSendMail.do")
    public ModelAndView forgetPasswordSendMail(HttpServletRequest request, ModelMap map) {

        Status status = new Status();
        status.setRtnCode(2);
        status.setRtnMsg("");
        try {
            String inboxuser = request.getParameter("inboxuser");
            String basePath = request.getParameter("basePath");
            BaseSupportDataCache.config = BaseService.getService().get(BaseConfig.class, "0");
            String content = BaseSupportDataCache.config.getForgetcontent();
            if (content == null || content.trim().length() < 1) {
                content = "忘记了登录密码，如果您确定需要更换该密码，请<a href=#URL#>点击这里更换密码>></a><br/>如果不做任何操作，系统将保留原密码。";
            }

            String url = basePath + "/login/toForgetPassword.do?1=1";

            String sql = "select * from system_user where email=:email";
            map.put("email", inboxuser);
            List<SystemUser> users = BaseService.getService().queryList(SystemUser.class, sql, map);
            if (users == null || users.size() != 1) {

                status.setRtnCode(0);
                status.setRtnMsg("您输入的邮箱有误！");
                return new ModelAndView("jsonView", "data", status);
            }
            SystemUser user = users.get(0);
            String userid = user.getUserid();
            String forgotpasswordstr = DigestUtils
                    .md5Hex(CommonTool.getSystemTime() + CommonTool.getRandomNumber() + userid).toString()
                    .toUpperCase();
            user.setForgotpasswordstr(forgotpasswordstr);
            BaseService.getService().update(user);
            url += "&a=" + forgotpasswordstr;
            content = content.replace("#URL#", url);
            String title = "找回密码";
            String forgetmailboxid = BaseSupportDataCache.config.getForgetmailboxid();
            if (forgetmailboxid != null && !"".equals(forgetmailboxid)) {

                BaseMailbox mailbox = BaseService.getService().get(BaseMailbox.class, forgetmailboxid);
                String mailsmtphost = mailbox.getMailsmtphost();
                String mailsmtpauth = mailbox.getMailsmtpauth();
                String frommailboxusername = mailbox.getMailuser();
                String frommailboxpassword = mailbox.getPassword();
                Mail.sendMail(mailsmtphost, mailsmtpauth, frommailboxusername, frommailboxpassword, inboxuser, title,
                        content);
                status.setRtnCode(0);
                return new ModelAndView("jsonView", "data", status);
            }

        } catch (Exception e) {
            status.setRtnCode(-1);
            status.setRtnMsg(e.getMessage());
        }

        return new ModelAndView("jsonView", "data", status);
    }

    /**
     * 找回密码
     * 
     * @param request
     * @param map
     * @return
     */
    @RequestMapping("/toForgetPassword.do")
    public String toForgetPassword(HttpServletRequest request, ModelMap map) {
        try {
            String a = request.getParameter("a");
            map.put("a", a);

            map.put("id", "login/forgetPassword.jsp");
            return Constant.PAGE.PUBLIC;
        } catch (Exception e) {
            e.printStackTrace();
        }
        map.put("id", "login/forgetPasswordSendMail.jsp");

        return Constant.PAGE.PUBLIC;
    }

    /**
     * 找回密码
     * 
     * @param request
     * @param map
     * @return
     */
    @RequestMapping("/doForgetPassword.do")
    public ModelAndView doForgetPassword(HttpServletRequest request, ModelMap map) {

        Status status = new Status();
        try {

            String a = request.getParameter("a");
            String sql = "select * from system_user where forgotpasswordstr=:forgotpasswordstr";
            map.put("forgotpasswordstr", a);
            List<SystemUser> users = BaseService.getService().queryList(SystemUser.class, sql, map);
            if (users == null || users.size() != 1) {
                status.setRtnCode(-1);
                status.setRtnMsg("重置密码失败，请重新发送验证！");
                return new ModelAndView("jsonView", "data", status);
            }
            String password = request.getParameter("password");
            String repeatpassword = request.getParameter("repeatpassword");
            if (password == null || password.equals("")) {
                status.setRtnCode(-1);
                status.setRtnMsg("请输入密码！");
                return new ModelAndView("jsonView", "data", status);
            }
            if (repeatpassword == null || repeatpassword.equals("")) {
                status.setRtnCode(-1);
                status.setRtnMsg("请确认密码！");
                return new ModelAndView("jsonView", "data", status);
            }
            if (!repeatpassword.equals(password)) {
                status.setRtnCode(-1);
                status.setRtnMsg("两次密码输入不匹配！");
                return new ModelAndView("jsonView", "data", status);
            }
            String password_md5 = DigestUtils.md5Hex(password).toString().toUpperCase();
            SystemUser user = users.get(0);
            user.setForgotpasswordstr(null);
            user.setPassword(password_md5);
            user = BaseService.getService().update(user);
            if (user != null) {
                status.setRtnCode(0);
                status.setRtnMsg("重置密码成功！");
                return new ModelAndView("jsonView", "data", status);
            } else {
                status.setRtnCode(2);
                status.setRtnMsg("重置密码失败！");
                return new ModelAndView("jsonView", "data", status);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        status.setRtnCode(-99);
        status.setRtnMsg("重置密码失败！");
        return new ModelAndView("jsonView", "data", status);
    }

    /**
     * 退出登录
     * 
     * @param request
     * @param map
     * @return
     */
    @RequestMapping("/toExit.do")
    public ModelAndView toExit(HttpServletRequest request, ModelMap map) {
        Status status = Status.SUCCESS();
        logger.info("用户" + request.getSession().getAttribute(Constant.ParamName.SYSTEM_USER_ID) + "登出");
        request.getSession().invalidate();
        status.setRtnCode(0);
        status.setRtnMsg("退出成功！");

        return new ModelAndView("jsonView", "data", status);
    }

}
