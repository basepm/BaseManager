package com.web.action.error;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import com.support.constant.Constant;

/**
 * 错误处理
 * 
 * @author 朱亮
 *
 */
@Controller("com.web.action.base.error.ErrorAction")
@RequestMapping("/base/error")
public class BaseErrorAction {

    /**
     * 到无权限页面
     * 
     * @param request
     * @param map
     * @return
     */
    @RequestMapping("/toNoAccess.do")
    public String toNoAccess(HttpServletRequest request, ModelMap map) {

        map.put("needloadjqueryjs", true);
        map.put("needhtmlandhead", true);
        map.put("needloadframework", false);
        map.put("needloadjs", true);
        map.put("needloadcss", true);
        map.put("id", "error/noAccess.jsp");
        return Constant.PAGE.PUBLIC;
    }

    /**
     * 到错误页面
     * 
     * @param request
     * @param map
     * @return
     */
    @RequestMapping("/fail.do")
    public String fail(HttpServletRequest request, ModelMap map) {

        map.put("needloadjqueryjs", true);
        map.put("needhtmlandhead", true);
        map.put("needloadframework", false);
        map.put("needloadjs", true);
        map.put("needloadcss", true);
        map.put("id", "error/fail.jsp");
        return Constant.PAGE.PUBLIC;
    }

    /**
     * 未上线页面
     * 
     * @param request
     * @param map
     * @return
     */
    @RequestMapping("/notOnLine.do")
    public String notOnLine(HttpServletRequest request, ModelMap map) {

        map.put("needloadjqueryjs", true);
        map.put("needhtmlandhead", true);
        map.put("needloadframework", false);
        map.put("needloadjs", true);
        map.put("needloadcss", true);
        map.put("id", "error/notOnLine.jsp");
        return Constant.PAGE.PUBLIC;
    }

    /**
     * 到500页面
     * 
     * @param request
     * @param map
     * @return
     */
    @RequestMapping("/500.do")
    public String fiveZeroZero(HttpServletRequest request, ModelMap map) {

        map.put("needloadjqueryjs", true);
        map.put("needhtmlandhead", true);
        map.put("needloadframework", false);
        map.put("needloadjs", true);
        map.put("needloadcss", true);
        String msg = request.getParameter("msg");
        map.put("msg", msg);
        return "control/error/500";
    }

    /**
     * 到404页面
     * 
     * @param request
     * @param map
     * @return
     */
    @RequestMapping("/404.do")
    public String fourZeroFour(HttpServletRequest request, ModelMap map) {

        map.put("needloadjqueryjs", true);
        map.put("needhtmlandhead", true);
        map.put("needloadframework", false);
        map.put("needloadjs", true);
        map.put("needloadcss", true);
        String msg = request.getParameter("msg");
        map.put("msg", msg);
        return "control/error/404";
    }

    /**
     * 到信息页面
     * 
     * @param request
     * @param map
     * @return
     */
    @RequestMapping("/msg.do")
    public String msg(HttpServletRequest request, ModelMap map) {

        map.put("needloadjqueryjs", true);
        map.put("needhtmlandhead", true);
        map.put("needloadframework", false);
        map.put("needloadjs", true);
        map.put("needloadcss", true);
        String msg = request.getParameter("msg");
        map.put("msg", msg);
        map.put("id", "error/msg.jsp");
        return Constant.PAGE.PUBLIC;
    }

}
