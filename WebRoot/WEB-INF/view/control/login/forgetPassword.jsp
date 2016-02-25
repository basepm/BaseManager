<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%@ page import="java.util.*"%><%@ include file="/WEB-INF/view/control/common/base.jsp"%>
<script type="text/javascript">
$(function(){
	$('body').get(0).className = 'full-layout no-nav-left no-nav-right  background-login responsive login-layout clearfix nav-right-hide nav-left-hide';
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
                  <h2 class="mgbt-xs-5"></h2>
                </div>
                <h4 class="text-center font-semibold vd_grey">重置 密码</h4>
              </div>
              <div class="panel widget">
                <div class="panel-body">
				 <form class="form-horizontal"  action="functions/register-form.php" role="form" id="register-form">
                  <div class="alert alert-danger vd_hidden">
                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true"><i class="icon-cross"></i></button>
                    <span class="vd_alert-icon"><i class="fa fa-exclamation-circle vd_red"></i></span><strong>错误!</strong> <span class="error-info"></span> </div>
                  <div class="alert alert-success vd_hidden">
                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true"><i class="icon-cross"></i></button>
                    <span class="vd_alert-icon"><i class="fa fa-check-circle vd_green"></i></span><strong>注册成功!</strong> </a></div>                      
                   
                    <div class="form-group">
                      <div class="col-md-12">
                        <div class="label-wrapper">
                          <label class="control-label">密码 <span class="vd_red">*</span></label>
                        </div>
                        <div class="vd_input-wrapper" id="password-input-wrapper"> <span class="menu-icon"> <i class="fa fa-lock"></i> </span>
                          <input type="password" placeholder="Password" class="form-control"  name="password" id="password">
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="label-wrapper">
                          <label class="control-label">确认密码 <span class="vd_red">*</span></label>
                        </div>
                        <div class="vd_input-wrapper" id="confirm-password-input-wrapper"> <span class="menu-icon"> <i class="fa fa-lock"></i> </span>
                          <input type="password" placeholder="确认密码" class="form-control"  name="repeatpassword" id="repeatpassword">
                        </div>
                      </div>
                    </div>
                    <div id="vd_login-error" class="alert alert-danger hidden"><i class="fa fa-exclamation-circle fa-fw"></i> 输入信息有误！ </div>
                   
                      <div class="col-md-12 text-center mgbt-xs-5">
                        <button class="btn vd_bg-green vd_white width-100 doForgetPasswordBtn" type="button" id="" name="">重置密码</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <!-- Panel Widget -->
              <div class="register-panel text-center font-semibold"> 已经有帐号? <br/>
                <a href="javascript:;" class="toActionBtn" toAction="login/toLogin.do">登录<span class="menu-icon"><i class="fa fa-angle-double-right fa-fw"></i></span></a> </div>
            </div>
          </div>
          <input type="hidden" id="a" value="${a }"/>
<script type="text/javascript">
$(document).ready(function() {
	$('.doForgetPasswordBtn').click(function() {
		doForgetPassword();
	});
	

});

function doForgetPassword() {
	
	var password = $('#password').val();
	var repeatpassword = $('#repeatpassword').val();
	$('.alert-success').hide();

	$('.alert-danger').hide();
	if(password == null || password == '' || password.length < 6){
		$('#password').parent().addClass('has-error');
		$('.alert-danger').show();
		$('.alert-danger').find('.error-info').html('请输入密码，并且密码不能小于六位');
		return;
	}
	$('#password').parent().removeClass('has-error');

	if(repeatpassword == null || repeatpassword == '' || repeatpassword.length < 6){
		$('#repeatpassword').parent().addClass('has-error');
		$('.alert-danger').show();
		$('.alert-danger').find('.error-info').html('请确认密码，并且密码不能小于六位');
		return;
	}
	$('#repeatpassword').parent().removeClass('has-error');
	
	if(repeatpassword != password){
		$('#repeatpassword').parent().addClass('has-error');
		$('.alert-danger').show();
		$('.alert-danger').find('.error-info').html('两次密码输入不一致');
		return;
	}
	$('#repeatpassword').parent().removeClass('has-error');

	var action = '/login/doForgetPassword.do';
	var data = {};
	data.password = password;
	data.repeatpassword = repeatpassword;
	data.basePath = basePath;
	data.a = $('#a').val();
	base.POST(action, data, 'json', function(o) {
		var data = o.data;
		if (data.rtnCode == 0) {
			$('.alert-danger').hide();
			$('.alert-success').show();
			window.location.href = basePath + '/login/toLogin.do';

		} else {
			$('.alert-success').hide();
			$('.alert-danger').show();
			$('.alert-danger').find('.error-info').html(data.rtnMsg);
		}
	});
}
</script>
