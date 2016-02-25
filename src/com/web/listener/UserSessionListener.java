package com.web.listener;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionAttributeListener;
import javax.servlet.http.HttpSessionBindingEvent;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import com.support.constant.Constant;
import com.support.entity.system.SystemUser;
import com.support.tool.CommonTool;
import com.web.service.BaseService;

public class UserSessionListener implements HttpSessionListener, HttpSessionAttributeListener, ServletContextListener {
    public static Map<String, HttpSession> ALL_SYSTEM_SESSIONS = new HashMap<String, HttpSession>();

    public static Map<String, HttpSession> ONLINE_USER_SESSIONS = new HashMap<String, HttpSession>();

    /**
     * session创建
     */
    public void sessionCreated(HttpSessionEvent event) {
        HttpSession httpSession = event.getSession();
        UserSessionListener.ALL_SYSTEM_SESSIONS.put(httpSession.getId(), httpSession);
        userOnline((SystemUser) httpSession.getAttribute(Constant.ParamName.SYSTEM_USER_INFO));
    }

    /**
     * session销毁
     */
    public void sessionDestroyed(HttpSessionEvent event) {
        HttpSession httpSession = event.getSession();
        UserSessionListener.ALL_SYSTEM_SESSIONS.remove(httpSession.getId());
        userOffline((SystemUser) httpSession.getAttribute(Constant.ParamName.SYSTEM_USER_INFO));

    }

    /**
     * session值绑定
     */
    public void attributeAdded(HttpSessionBindingEvent bindingEvent) {

        String name = bindingEvent.getName();
        // 用户信息绑定
        if (name.equals(Constant.ParamName.SYSTEM_USER_INFO)) {
            SystemUser user = (SystemUser) bindingEvent.getValue();
            UserSessionListener.ONLINE_USER_SESSIONS.put(user.getUserid(), bindingEvent.getSession());
            userOnline(user);
        }
    }

    /**
     * 用户下线
     * 
     * @param session
     */
    public void userOnline(SystemUser user) {
        // 用户信息绑定
        if (user != null) {
            try {
                Integer logincount = user.getLogincount();
                logincount = logincount == null ? 1 : logincount + 1;
                String logintime = CommonTool.getSystemTime();
                String lastlogintime = user.getLogintime();
                if (lastlogintime == null || lastlogintime.equals("")) {
                    lastlogintime = logintime;
                }
                Map<String, Object> map = new HashMap<String, Object>();
                String sql = "update system_user set ";

                sql += "logintime=:logintime, ";
                sql += "lastlogintime=:lastlogintime, ";
                sql += "logincount=:logincount, ";
                sql += "onlinestatus=:onlinestatus ";
                sql += " where userid = :userid";

                map.put("userid", user.getUserid());
                map.put("logintime", logintime);
                map.put("lastlogintime", lastlogintime);
                map.put("logincount", logincount);
                map.put("onlinestatus", 1);

                BaseService.getService().executeSql(sql, map);
            } catch (Exception e) {
                e.printStackTrace();
            }

        }
    }

    /**
     * session值移除
     */
    public void attributeRemoved(HttpSessionBindingEvent bindingEvent) {
        String name = bindingEvent.getName();
        // 用户信息绑定
        if (name.equals(Constant.ParamName.SYSTEM_USER_INFO)) {
            SystemUser user = (SystemUser) bindingEvent.getValue();
            userOffline(user);
            UserSessionListener.ONLINE_USER_SESSIONS.remove(user.getUserid());
        }

    }

    /**
     * 用户下线
     * 
     * @param session
     */
    public void userOffline(SystemUser user) {
        // 用户信息绑定
        if (user != null) {
            try {
                Map<String, Object> map = new HashMap<String, Object>();
                String sql = "update system_user set ";

                sql += "onlinestatus=:onlinestatus ";
                sql += " where userid = :userid";

                map.put("userid", user.getUserid());
                map.put("onlinestatus", 3);

                BaseService.getService().executeSql(sql, map);
            } catch (Exception e) {
                e.printStackTrace();

            }

        }
    }

    /**
     * session值改变
     */
    public void attributeReplaced(HttpSessionBindingEvent bindingEvent) {

    }

    /**
     * 销毁
     */
    public void contextDestroyed(ServletContextEvent contextEvent) {
        try {
            Map<String, Object> map = new HashMap<String, Object>();
            String sql = "update system_user set ";

            sql += "onlinestatus=:onlinestatus ";

            map.put("onlinestatus", 3);

            BaseService.getService().executeSql(sql, map);
        } catch (Exception e) {

            e.printStackTrace();
        }

    }

    /**
     * 初始化
     */
    public void contextInitialized(ServletContextEvent contextEvent) {
        try {
            Map<String, Object> map = new HashMap<String, Object>();
            String sql = "update system_user set ";

            sql += "onlinestatus=:onlinestatus ";

            map.put("onlinestatus", 3);

            BaseService.getService().executeSql(sql, map);
        } catch (Exception e) {

            e.printStackTrace();
        }

    }
}
