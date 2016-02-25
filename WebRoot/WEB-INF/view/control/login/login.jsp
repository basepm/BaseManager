<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%@ page import="java.util.*"%><%@ include file="/WEB-INF/view/control/common/base.jsp"%>
<script type="text/javascript">
$(function(){
	$('body').get(0).className = 'full-layout no-nav-left no-nav-right  background-login responsive login-layout clearfix nav-right-hide nav-left-hide';
	$('body').attr('data-active','pages');
	$('body').attr('id','pages');
	$('body').attr('data-smooth-scrolling','1');
});
</script>
<input type="hidden" id="system_no_user" value="0"/>
<input type="hidden" id="base_need_full_window" value="true"/>
<div class="vd_content-section clearfix">
  <div class="vd_login-page">
    <div class="heading clearfix">
      <div class="logo">
        <h2 class="mgbt-xs-5"></h2>
      </div>
      <h4 class="text-center font-semibold vd_grey">${thisbaseconfig.systemname }</h4>
    </div>
    <div class="panel widget">
      <div class="panel-body">
        <div class="login-icon "> <i class="fa fa-key"></i> </div>
        <form class="form-horizontal" id="login-form" action="#" role="form">
        <div class="alert alert-danger vd_hidden">
          <button type="button" class="close" data-dismiss="alert" aria-hidden="true"><i class="icon-cross"></i></button>
          <span class="vd_alert-icon"><i class="fa fa-exclamation-circle vd_red"></i></span><strong>错误!</strong> <span class="error-info"></span> </div>
        <div class="alert alert-success vd_hidden">
          <button type="button" class="close" data-dismiss="alert" aria-hidden="true"><i class="icon-cross"></i></button>
          <span class="vd_alert-icon"><i class="fa fa-check-circle vd_green"></i></span><strong>登录成功!</strong> </a> </div>                  
          <div class="form-group  mgbt-xs-20">
            <div class="col-md-12">
              <div class="label-wrapper sr-only">
                <label class="control-label" for="email">用户名</label>
              </div>
              <div class="vd_input-wrapper" id="email-input-wrapper"> <span class="menu-icon"> <i class="fa fa-user"></i> </span>
                <input type="text" placeholder="用户名" id="nickname" name="nickname" class="" >
              </div>
              <div class="label-wrapper">
                <label class="control-label sr-only" for="password">密码</label>
              </div>
              <div class="vd_input-wrapper" id="password-input-wrapper" > <span class="menu-icon"> <i class="fa fa-lock"></i> </span>
                <input type="password" placeholder="密码" id="password" name="password" class="required" required>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-md-12 text-center mgbt-xs-5">
              <button class="btn vd_bg-green vd_white width-100 baseLoginBtn" type="button" id="">登录</button>
            </div>
            <div class="col-md-12">
              <div class="row">
                <div class="col-xs-6">
                  <div class="vd_checkbox">
                    <input type="checkbox" id="rememberPassword" value="1">
                    <label for="rememberPassword"> 记住密码</label>
                  </div>
                </div>
                <div class="col-xs-6 text-right">
                  <div class=""> 
                  
				   <c:if test="${thisbaseconfig.openregistration }">
	                  <a href="javascript:;" class="toActionBtn" toAction="login/toRegister.do">立即注册 </a>
				   </c:if>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
  <!-- Panel Widget -->
  <div class="register-panel text-center font-semibold"> 
  
    <c:if test="${thisbaseconfig.openforgetpassword }">
	    <a href="javascript:;" class="toActionBtn" toAction="login/toForgetPasswordSendMail.do">忘记密码？
	    	<span class="menu-icon">
	    		<i class="fa fa-angle-double-right fa-fw"></i>
	  		</span>
	  	</a> 
    </c:if> 
 
  </div>
  </div>
</div>
<script type="text/javascript">
$(document).ready(function() {
	
	$('.baseLoginBtn').click(function() {
		doLogin();
	});
	$(window).on('keydown', function(e) {
		var theEvent = window.event || e;
		var code = theEvent.keyCode || theEvent.which;
		if (code == 13) {
			doLogin();
		}
	});
	if(window.localStorage){
		if(window.localStorage.nickname!=null&&window.localStorage.nickname!=''){
			$("#nickname").val(window.localStorage.nickname);
			$("#password").val(window.localStorage.password);
		}
		if(window.localStorage.rememberPassword != null){
			$('#rememberPassword').get(0).checked = window.localStorage.rememberPassword;
		}
	}
});

function doLogin() {
	var nickname = $('#nickname').val();
	var password = $('#password').val();

	var action = '/login/doLogin.do';
	var data = {};
	data.nickname = nickname;
	data.password = password;

	//选中记住密码
	if($('#rememberPassword').get(0).checked){
		if(window.localStorage){
			window.localStorage.nickname = nickname;
			window.localStorage.password = password;
			window.localStorage.rememberPassword = 'checked';
		}
	}else{
		if(window.localStorage){
			window.localStorage.nickname = '';
			window.localStorage.password = '';
			window.localStorage.rememberPassword = '';
		}
	}
	
	base.POST(action, data, 'json', function(o) {
		var data = o.data;
		//登录成功
		if (data.rtnCode == 0) {
			$('.alert-danger').hide();
			$('.alert-success').show();
			var hash = ''+window.location.hash;
			if(hash != '' && hash.length>7 ){
				action = hash.replace("#action=", "");
				if(action.indexOf('toLogin.do')>0){
					var thishref = window.location.href;
					window.location.href = thishref.split('#')[0];
				}else{
					window.location.reload();
				}
			}else{
				if(window.location.href.indexOf('toLogin.do')>0){
					window.location.href = basePath + '/index/toIndex.do';
				}else{
					window.location.reload();
				}
			}
			
		} else {
			$('.alert-success').hide();
			$('.alert-danger').show();
			$('.alert-danger').find('.error-info').html(data.rtnMsg);
		}
	});
}
</script>