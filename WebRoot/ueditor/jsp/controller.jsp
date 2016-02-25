<%@page import="net.sf.json.JSONArray"%>
<%@page import="com.support.tool.BaseFileTool"%>
<%@page import="net.sf.json.JSONObject"%>
<%@page import="com.web.common.WapondConstantParam"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="com.baidu.ueditor.ActionEnter" pageEncoding="UTF-8"%>
<%@ page import="java.util.*,java.io.*" %>
<%@ page trimDirectiveWhitespaces="true"%>
<%

    request.setCharacterEncoding( "utf-8" );
	response.setHeader("Content-Type" , "text/html");
	
	String rootPath = application.getRealPath( "/" );
	String action = request.getParameter("action");
	String result = new ActionEnter( request, rootPath ).exec();
	if( result!=null && !action.equals("config") && result.indexOf("file/web/file")>=0 ){

        JSONObject object = JSONObject.fromObject(result);
        rootPath = rootPath.replace("\\", "/");
	    result = result.replaceAll(rootPath, "");
	    result = result.replaceAll("/file/web/file/", "file/web/file/");//把返回路径中的物理路径替换为 '/'
	    
	    if(object.get("url")!=null){
		    String url = object.getString("url");
			File outFile = new File(request.getRealPath("/")+url);
	        BaseFileTool.uploadFileToService(outFile, url.replaceFirst("file/", "/"), outFile.getName());
	    }
	    if(object.get("list")!=null){
	        JSONArray array = object.getJSONArray("list");
	        for(int i=0;i<array.size();i++){
	            JSONObject one = array.getJSONObject(i);
	            if(one.get("source")!=null){
	                String url = one.getString("url");
	    			File outFile = new File(request.getRealPath("/")+url);
	    	        BaseFileTool.uploadFileToService(outFile, url.replaceFirst("file/", "/"), outFile.getName());
	            }
	        }
	    }
	}
	out.write( result );
	
%>