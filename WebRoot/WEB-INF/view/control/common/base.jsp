<%@ page trimDirectiveWhitespaces="true" %>
<%@ page import="com.web.common.WapondConstantParam"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*,java.io.*" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="/WEB-INF/classes/base.tld" prefix="base"%>
<c:set var="basePath" value="${pageContext.request.contextPath}"/>
<c:set var="systemType" value="<%=WapondConstantParam.SYSTEM%>"></c:set>
<c:set var="fileServiceUrl" value="<%=WapondConstantParam.fileServiceUrl%>"/>
<c:set var="baseFilePath" value="<%=WapondConstantParam.fileServiceUrl%>"/>
<c:set var="fileUploadServiceUrl" value="<%=WapondConstantParam.fileUploadServiceUrl%>"/>
<c:set var="domainUrl" value="<%=WapondConstantParam.domainUrl%>"/>