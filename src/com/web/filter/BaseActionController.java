package com.web.filter;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.support.constant.Constant;
import com.support.entity.base.BaseAction;
import com.support.entity.base.BaseMenu;
import com.support.entity.system.SystemUser;
import com.web.service.BaseService;

/**
 * 操作控制
 * 
 * @author 朱亮
 *
 */
@SuppressWarnings("unchecked")
public class BaseActionController {

    public static BaseAction getBaseActionByServletpath(String servletpath) throws Exception {
        String sql = "select * from base_action where servletpath=:servletpath ";
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("servletpath", servletpath);
        BaseAction action = (BaseAction) BaseService.getService().queryOne(BaseAction.class, sql, params);
        return action;
    }

    /**
     * 判断是否登录 使用缓存机制
     * 
     * @param serv
     * @return
     */
    public static boolean shouldLogin(String servletpath) throws Exception {
        BaseAction action = getBaseActionByServletpath(servletpath);
        if (action != null) {
            if (action.isShouldlogin()) {
                return true;
            }
        }
        return false;
    }

    /**
     * 判断是否可以有访问权限
     * 
     * @param serv
     * @return
     */
    public static boolean canVisit(HttpServletRequest request) throws Exception {

        String servletpath = request.getServletPath();
        BaseAction r = getBaseActionByServletpath(servletpath);
        if (r == null) {
            return true;
        }
        if (!r.isShouldauthorize()) {
            return true;
        }
        List<BaseAction> canVisitAllActions = new ArrayList<BaseAction>();
        if (request.getSession().getAttribute(Constant.ParamName.BASE_USER_ACTIONS) != null) {
            canVisitAllActions = (List<BaseAction>) request.getSession().getAttribute(
                    Constant.ParamName.BASE_USER_ACTIONS);
        }
        if (canVisitAllActions != null) {
            for (BaseAction canVisitAllAction : canVisitAllActions) {
                String canvisitservletpath = canVisitAllAction.getServletpath();
                if (canvisitservletpath != null) {
                    servletpath = servletpath.replaceAll("//", "/").replaceAll("//", "/");
                    canvisitservletpath = canvisitservletpath.replaceAll("//", "/").replaceAll("//", "/");
                    if (canvisitservletpath.indexOf(servletpath) >= 0) {
                        return true;
                    }
                }

            }
        }
        return false;
    }

    /**
     * 获取可访问的所有资源
     * 
     * @return
     */
    public static void initCanVisitAllActions(HttpServletRequest request) {
        String sql = "";
        if (request.getSession().getAttribute(Constant.ParamName.BASE_USER_ACTIONS) == null) {
            String userid = (String) request.getSession().getAttribute(Constant.ParamName.SYSTEM_USER_ID);
            Map<String, Object> map = new HashMap<String, Object>();
            try {
                sql = "select * from base_action where shouldlogin != 1 or shouldlogin is null ORDER BY sequence ASC ";

                // 根据用户编号 获取用户所有资源
                if (userid != null) {
                    map.put("userid", userid);
                    if (userid.equals("0")) {
                        sql = "select * from base_action  ORDER BY sequence ASC ";
                    } else {
                        sql = "select * from base_action where  ";

                        sql += " (";
                        sql += " actionid in (select actionid from base_user_action where userid=:userid) ";
                        sql += " or actionid in (select actionid from base_role_action where roleid in (select roleid from base_user_role where userid=:userid)) ";
                        // sql +=
                        // " or actionid in (select actionid from base_group_action where groupid in (select groupid from base_user_group where userid=:userid)) ";
                        sql += " or shouldlogin != 1 or shouldlogin is null ";
                        sql += " ) ";
                        sql += " and  actionid not in(select actionid from base_user_disable_action where userid=:userid) ";
                        sql += "  ORDER BY sequence ASC ";

                    }
                }
                List<BaseAction> canVisitActions = BaseService.getService().queryList(BaseAction.class, sql, map);
                request.getSession().setAttribute(Constant.ParamName.BASE_USER_ACTIONS, canVisitActions);
            } catch (Exception e) {

                e.printStackTrace();
            }

        }
        request.getSession().setAttribute(Constant.ParamName.BASE_USER_ACTIONS,
                request.getSession().getAttribute(Constant.ParamName.BASE_USER_ACTIONS));

    }

    public static void initUserInfo(HttpServletRequest request) {
        if (request.getSession().getAttribute(Constant.ParamName.SYSTEM_USER_INFO) == null
                && request.getSession().getAttribute(Constant.ParamName.SYSTEM_USER_ID) != null) {
            try {

                String userid = (String) request.getSession().getAttribute(Constant.ParamName.SYSTEM_USER_ID);
                SystemUser systemUser = BaseService.getService().get(SystemUser.class, userid);
                request.getSession().setAttribute(Constant.ParamName.SYSTEM_USER_INFO, systemUser);
                request.getSession().setAttribute(Constant.ParamName.SYSTEM_USER_INFO_STR,
                        JSONObject.fromObject(systemUser).toString());

            } catch (Exception e) {

                e.printStackTrace();
            }
            request.getSession().setAttribute(Constant.ParamName.SYSTEM_USER_INFO,
                    request.getSession().getAttribute(Constant.ParamName.SYSTEM_USER_INFO));
            request.getSession().setAttribute(Constant.ParamName.SYSTEM_USER_INFO_STR,
                    request.getSession().getAttribute(Constant.ParamName.SYSTEM_USER_INFO_STR));
        }
    }

    public static void initAllMenus(HttpServletRequest request) {
        try {
            if (request.getSession().getAttribute(Constant.ParamName.BASE_USER_MENUS) == null) {
                String sql = "";
                String userid = (String) request.getSession().getAttribute(Constant.ParamName.SYSTEM_USER_ID);
                Map<String, Object> map = new HashMap<String, Object>();
                if (userid != null) {
                    userid = (String) request.getSession().getAttribute(Constant.ParamName.SYSTEM_USER_ID);

                    if (userid.equals("0")) {
                        sql = "select * from base_menu   ORDER BY sequence ASC  ";
                    } else {
                        map.put("userid", userid);
                        sql = "select * from base_menu where  ";
                        sql += " (";
                        sql += " menuid in (select menuid from base_user_menu where userid=:userid) ";
                        sql += " or menuid in (select menuid from base_role_menu where roleid in (select roleid from base_user_role where userid=:userid)) ";
                        // sql +=
                        // " or menuid in (select menuid from base_group_menu where groupid in (select groupid from base_user_group where userid=:userid)) ";
                        sql += " or shouldlogin != 1 or shouldlogin is null )";
                        sql += " and menuid not in(select menuid from base_user_disable_menu where userid=:userid) ";
                        sql += "  ORDER BY sequence ASC  ";
                    }

                } else {
                    sql = "select * from base_menu where 1=1 and shouldlogin != 1 or shouldlogin is null ORDER BY sequence ASC ";

                }
                List<BaseMenu> menus = BaseService.getService().queryList(BaseMenu.class, sql, map);
                request.getSession().setAttribute(Constant.ParamName.BASE_USER_MENUS, menus);
                request.getSession().setAttribute(Constant.ParamName.BASE_USER_MENUS_STR,
                        JSONArray.fromObject(menus).toString());
            }
            request.getSession().setAttribute(Constant.ParamName.BASE_USER_MENUS,
                    request.getSession().getAttribute(Constant.ParamName.BASE_USER_MENUS));
            request.getSession().setAttribute(Constant.ParamName.BASE_USER_MENUS_STR,
                    request.getSession().getAttribute(Constant.ParamName.BASE_USER_MENUS_STR));

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
