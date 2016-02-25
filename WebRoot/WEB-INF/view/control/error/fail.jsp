<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%@ page import="java.util.*"%><%@ include file="/WEB-INF/view/control/common/base.jsp"%>

<script type="text/javascript">
$(function(){
	$('body').get(0).className = 'full-layout no-nav-left no-nav-right  nav-top-fixed background-login     responsive remove-navbar login-layout   clearfix';
	$('body').attr('data-active','pages');
	$('body').attr('id','pages');
	$('body').attr('data-smooth-scrolling','1');
});
</script>
<input type="hidden" id="base_need_full_window" value="true"/>

<div class="vd_content-section clearfix">
	<div class="vd_register-page">
	  <div class="heading clearfix">
	    <div class="logo">
	      <h2 >${thisbaseconfig.systemname }</h2>
	    </div>
	  </div>
	  <div class="panel widget">
	    <div class="panel-body">
	      <div class="login-icon"> <i class="fa fa-cog"></i> </div>
	      <h1 class="font-semibold text-center" style="font-size:52px">错误信息</h1>
	    <form class="form-horizontal" action="#" role="form">
	      <div class="form-group">
	        <div class="col-md-12">
	          <h4 class="text-center mgbt-xs-20">${msg }</h4>
	          <p class="text-center"> 您可以 <a href="${basePath }/index/toIndex.do">返回首页</a> 或者搜索您想要去的页面</p>
	          <div class="vd_input-wrapper" id="email-input-wrapper"> <span class="menu-icon"> <i class="fa fa-search"></i> </span>
	            <input type="text" placeholder="请输入页面" class="width-80">
	          </div>
	        </div>
	      </div>
	    </form>
	  </div>
	</div>
	<!-- Panel Widget -->
	</div>
	</div>