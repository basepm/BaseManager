package com.web.action.index;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import com.support.constant.Constant;
import com.web.service.BaseService;

/**
 * 全局Action处理 整个程序用到的操作
 * 
 * @author 朱亮
 *
 */
@Controller("com.web.action.index.IndexAction")
@RequestMapping("/index")
public class IndexAction {

    @Resource
    private BaseService service;

    /**
     * 进入首页
     * 
     * @param request
     * @param map
     * @return
     */
    @RequestMapping("/toIndex.do")
    public String toIndex(HttpServletRequest request, HttpServletResponse response, ModelMap map) {

        map.put("id", "index/index.jsp");
        return Constant.PAGE.PUBLIC;
    }

    /**
     * 进入页面编辑
     * 
     * @param request
     * @param map
     * @return
     */
    @RequestMapping("/toPageDesign.do")
    public String toPageDesign(HttpServletRequest request, HttpServletResponse response, ModelMap map) {
        //
        try {
            String sql = "select * from base_page_model_type order by sequence asc ";
            List<Map<String, Object>> modeltypes = service.queryList(sql, null);
            Map<String, Object> params = new HashMap<String, Object>();
            for (Map<String, Object> modeltype : modeltypes) {
                sql = "select * from base_page_model where modeltype=:modeltype order by sequence asc";
                params.put("modeltype", modeltype.get("modeltype"));
                List<Map<String, Object>> models = service.queryList(sql, params);
                modeltype.put("models", models);
            }
            map.put("modeltypes", modeltypes);
        } catch (Exception e) {
            e.printStackTrace();
        }
        map.put("id", "index/pageDesign.jsp");
        return Constant.PAGE.PUBLIC;
    }

}
