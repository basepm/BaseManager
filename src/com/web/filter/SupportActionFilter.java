package com.web.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import com.support.cache.BaseSupportDataCache;
import com.support.constant.Constant;
import com.support.entity.base.BaseAction;
import com.support.entity.base.BaseLog;
import com.support.plate.execute.BaseExecute;
import com.support.tool.CommonTool;
import com.web.service.BaseService;

/**
 * 操作过滤器 统一处理项目所有请求
 * 
 * @author 朱亮
 *
 */
public class SupportActionFilter implements Filter {

    public void destroy() {
    }

    public static void initSessionAttribute(HttpServletRequest request) {
        BaseActionController.initUserInfo(request);
        BaseActionController.initAllMenus(request);
        request.getSession().setAttribute("thisbaseconfig", BaseSupportDataCache.config);
        request.getSession().setAttribute(Constant.ParamName.SYSTEM_USER_INFO,
                request.getSession().getAttribute(Constant.ParamName.SYSTEM_USER_INFO));
        request.getSession().setAttribute(Constant.ParamName.SYSTEM_USER_ID,
                request.getSession().getAttribute(Constant.ParamName.SYSTEM_USER_ID));
        request.getSession().setAttribute(Constant.ParamName.BASE_USER_ACTIONS,
                request.getSession().getAttribute(Constant.ParamName.BASE_USER_ACTIONS));
        request.getSession().setAttribute(Constant.ParamName.BASE_USER_MENUS,
                request.getSession().getAttribute(Constant.ParamName.BASE_USER_MENUS));
        request.getSession().setAttribute("userid", request.getSession().getAttribute("userid"));
        request.getSession().setAttribute("shopid", request.getSession().getAttribute("shopid"));
        request.getSession().setAttribute("countryno", request.getSession().getAttribute("countryno"));
        request.getSession().setAttribute("countryname", request.getSession().getAttribute("countryname"));
        request.getSession().setAttribute("provinceno", request.getSession().getAttribute("provinceno"));
        request.getSession().setAttribute("provincename", request.getSession().getAttribute("provincename"));
        request.getSession().setAttribute("cityno", request.getSession().getAttribute("cityno"));
        request.getSession().setAttribute("cityname", request.getSession().getAttribute("cityname"));
        request.getSession().setAttribute("areano", request.getSession().getAttribute("areano"));
        request.getSession().setAttribute("areaname", request.getSession().getAttribute("areaname"));
        request.getSession().setAttribute("streetno", request.getSession().getAttribute("streetno"));
        request.getSession().setAttribute("streetname", request.getSession().getAttribute("streetname"));
        request.getSession().setAttribute("username", request.getSession().getAttribute("username"));
        request.getSession().setAttribute("nickname", request.getSession().getAttribute("nickname"));
    }

    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException,
            ServletException {

        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;

        String servletpath = request.getServletPath();
        String method = request.getMethod();

        servletpath = servletpath.replaceAll("//", "/").replaceAll("//", "/");
        try {
            initSessionAttribute(request);

            if (servletpath.indexOf("plugin/") > 0) {

                chain.doFilter(req, res);
                return;
            } else {
                if (method.equals("GET")) {
                    try {
                        if (request.getParameter("needloadframework") == null
                                || request.getParameter("needloadframework").equals("true")) {
                            request.getRequestDispatcher("/WEB-INF/view/control/frame.jsp").forward(request, response);
                            return;
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
                if (BaseSupportDataCache.config != null && BaseSupportDataCache.config.isMustlogin()) {
                    if (request.getSession().getAttribute(Constant.ParamName.SYSTEM_USER_INFO) == null) {
                        if (servletpath.indexOf("login") < 0) {
                            request.getRequestDispatcher("/login/toLogin.do").forward(request, response);
                            return;
                        }
                    } else {
                    }
                }
                BaseAction action = BaseSupportDataCache.DataAction.getByServletpath(servletpath);
                if (action != null) {
                    BaseActionController.initCanVisitAllActions(request);
                    if (action.isShouldlogin() || action.isShouldauthorize()) {
                        if (request.getSession().getAttribute(Constant.ParamName.SYSTEM_USER_INFO) == null) {
                            request.getRequestDispatcher("/login/toLogin.do").forward(request, response);
                            return;
                        } else {
                        }
                        // 如果没有权限访问
                        if (!BaseActionController.canVisit(request)) {
                            request.getRequestDispatcher("/base/error/toNoAccess.do").forward(request, response);
                            return;
                        }
                    }
                    // 需要记录日志
                    if (action.isShouldlog()) {
                        String userid = (String) request.getSession().getAttribute("userid");
                        String accountid = (String) request.getSession().getAttribute("accountid");
                        BaseLog log = new BaseLog();
                        log.setAccountid(accountid);
                        log.setActionname(action.getActionname());
                        log.setCreatetime(CommonTool.getSystemTime());
                        log.setLogid(CommonTool.getRandomNumber());
                        log.setParametercontent(JSONObject.fromObject(request.getParameterMap()).toString());
                        log.setServletpath(action.getServletpath());
                        log.setStatus(0);
                        log.setIp(CommonTool.getIP(request));
                        log.setUserid(userid);
                        BaseService.getService().save(log);
                    }
                    request.setAttribute("thisBaseAction", action);

                    BaseExecute.execute(request, response, chain, action);

                } else {
                    chain.doFilter(req, res);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    public void init(FilterConfig arg0) throws ServletException {
    }

}
