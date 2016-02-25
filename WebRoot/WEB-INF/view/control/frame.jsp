<%@ page trimDirectiveWhitespaces="true" %><%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%@ page import="java.util.*"%><%@ include file="/WEB-INF/view/control/common/base.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<!--[if IE 8]><html class="ie ie8" xmlns="http://www.w3.org/1999/xhtml"><![endif]-->
<!--[if IE 9]><html class="ie ie9" xmlns="http://www.w3.org/1999/xhtml"><![endif]-->
<!--[if gt IE 9]><html xmlns="http://www.w3.org/1999/xhtml"><![endif]-->
	<head>
		<title>${thisbaseconfig.systemname }</title>
	    <meta name="keywords" content="微管理,www.basepm.com" />
	    <meta name="description" content="微管理,www.basepm.com" />
	    <meta name="author" content="朱亮" />
	    <meta name="viewport" content="width=device-width, initial-scale=1.0 , user-scalable=no" />
	    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
	    <c:set var="fileurl" value="${basePath }/images/sys/no_img.png"/>
		<c:if test="${thisbaseconfig.icon !=null&&thisbaseconfig.icon!='' }">
			<c:if test="${fn:indexOf(thisbaseconfig.icon,'http')>=0 }">
				<c:set var="fileurl" value="${thisbaseconfig.icon }"/>
			</c:if>
			<c:if test="${fn:indexOf(thisbaseconfig.icon,'http')<0 }">
				<c:set var="fileurl" value="${fileServiceUrl }/${thisbaseconfig.icon }"/>
			</c:if>
		</c:if>
	    <link rel="shortcut icon" type="image/x-icon" href="${fileurl}" />
	    <script type="text/javascript">
			var basePath = '${basePath}';
			var fileServiceUrl = '${fileServiceUrl}';
			var baseFilePath = '${fileServiceUrl}';
			var fileUploadServiceUrl = '${fileUploadServiceUrl}';
			var currentPath = '${currentPath}';
		</script>
		<%@ include file="frame/csspath.jsp"%>
		<script type="text/javascript" src="${basePath}/base/js/jquery.js"></script>
		<script type="text/javascript" src="${basePath}/base/js/base.load.js"></script>
		<%@ include file="frame/jspath.jsp"%>
	</head>
	<!-- nav-top-fixed class名控制固定顶部 效果有点卡暂时放弃 -->
	<body class="full-layout nav-right-hide nav-right-start-hide responsive clearfix" > 
		<textarea id="BASE_USER_MENUS_STR" rows="" cols="" style="display: none;">${BASE_USER_MENUS_STR }</textarea>
		<textarea id="SYSTEM_USER_INFO_STR" rows="" cols="" style="display: none;">${SYSTEM_USER_INFO_STR }</textarea>
		<div class="vd_body">
			<%@ include file="frame/header.jsp"%>
			<div class="content">
				<div class="container">
					<%@ include file="frame/leftnavbar.jsp"%>
					<div class="vd_content-wrapper">
						<div class="vd_container">
							<div class="vd_content clearfix">
								<div class="vd_head-section clearfix" >
									<div class="vd_panel-header">
										<div class="vd_panel-menu hidden-sm hidden-xs" data-step=5  data-position="left">
											<div data-action="remove-navbar" data-original-title="删除导航栏" data-toggle="tooltip" data-placement="bottom" class="remove-navbar-button menu"> <i class="fa fa-arrows-h"></i> </div>
											<div data-action="remove-header" data-original-title="删除头部" data-toggle="tooltip" data-placement="bottom" class="remove-header-button menu"> <i class="fa fa-arrows-v"></i> </div>
											<div data-action="fullscreen" data-original-title="移除头部和导航栏" data-toggle="tooltip" data-placement="bottom" class="fullscreen-button menu"> <i class="fa  fa-arrows"></i> </div>
										</div>
									</div>
								</div>
								<div class="clearfix " id="page-content" >
								</div>
								<div class="clearfix page-window" hidden >
									<div class="page-mask" >
									</div>
									<div class="page-content panel  widget vd_bd-green" >
										<div class="panel-heading vd_bg-green " style="border-radius: 0px;">
											<h3 class="panel-title font-bold title"> 基本数据</h3>
										</div>
										<div class="vd_panel-menu" style="font-size: 17px;">
											<!-- <div data-action="minimize" class=" menu "> <i class="fa fa-minus"></i> </div> -->
											<!-- <div class=" menu refreshData"> <i class="fa fa-refresh"></i> </div> -->
											<div class=" menu" onclick="javascript:$(this).closest('.page-window').hide();"> <i class="fa fa-remove"></i> </div>
										</div>
										<div class="page-body " >
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<c:if test="${thisbaseconfig.needfoot }">
				<%@ include file="frame/footer.jsp"%>
			</c:if>
			<c:if test="${thisbaseconfig.openchat }">
				<%@ include file="frame/chatmenu.jsp"%>
			</c:if>
			<a id="back-top" href="javascript:;" data-action="backtop" class="vd_back-top visible"> <i class="fa  fa-angle-up"> </i> </a>
			<script type="text/javascript" src="${basePath}/base/js/base.init.js"></script>
			<%@ include file="base/file/uploadFile.jsp"%>
			<%@ include file="frame/over-window.jsp"%>
		</div>
	</body>
</html>