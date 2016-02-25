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
            <div class="vd_login-page">     
            	<div class="heading clearfix">
                	<div class="logo"><h2 class="mgbt-xs-5"></h2></div>
                    <h4 class="text-center font-semibold vd_grey">找回密码</h4>                     
                </div>
                <div class="panel widget">
                    <div class="panel-body">
                    
                          <div class="login-icon">
                                <i class="fa fa-lock"></i>
                          </div>      
                          <div id="password-success" class="alert alert-success vd_hidden"><i class="fa fa-exclamation-circle fa-fw"></i> Your reset password form has been sent to your email </div>              
                          <form class="form-horizontal"  role="form" id="forget-password-form" action="functions/forget-password-form.php">
                  <div class="alert alert-danger vd_hidden">
                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true"><i class="icon-cross"></i></button>
                    <span class="vd_alert-icon"><i class="fa fa-exclamation-circle vd_red"></i></span><strong>Oh snap!</strong> Change a few things up and try submitting again. </div>
                  <div class="alert alert-success vd_hidden">
                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true"><i class="icon-cross"></i></button>
                    <span class="vd_alert-icon"><i class="fa fa-check-circle vd_green"></i></span>Your reset password form has been sent to your email </a>. </div>                            
                             <div class="form-group mgbt-xs-20">
                                 <div class="col-md-12">
                                 	<p class="text-center"><strong>要重置密码，请输入您用来登录BasePM的电子邮件地址。</strong> </p>
                                    <div class="vd_input-wrapper" id="email-input-wrapper">
                                        <span class="menu-icon">
                                            <i class="fa fa-envelope"></i>
                                        </span>
                                        <input type="email" placeholder="Email" id="email" name="email" class="required">
                                    </div>   
                                
                                  </div>                            
                            </div>                                                           
                            <div class="form-group" id="submit-password-wrapper">
                              <div class="col-md-12 text-center mgbt-xs-5">
                                  <button class="btn vd_bg-green vd_white width-100" type="button" id="submit-password" name="submit-password">发送验证</button>   
                              </div>
                            </div>
                          </form>
                    </div>
                </div> <!-- Panel Widget --> 
                <div class="register-panel text-center font-semibold">	
                	<a href="javascript:;" class="toActionBtn" toAction="login/toLogin.do">登录</a> <span class="mgr-10 mgl-10">|</span>  	
                    <a href="javascript:;" class="toActionBtn" toAction="login/toRegister.do">注册</a>  	
                </div>
                </div> <!-- vd_login-page -->         
            </div>   
          <!-- .vd_content-section --> 

<script type="text/javascript">
$(document).ready(function() {

	$('#submit-password').click(function(){
		var email = $('#email').val();
		if(email == null || $.trim(email).length<1){
			alert('请输入邮箱！');
			return;
		}
		var data = {};
		data.inboxuser = email;
		data.basePath = basePath;
		var action = 'login/forgetPasswordSendMail.do';
		base.POST(action,data,'json',function(o){

			var data = o.data;
			//登录成功
			if (data.rtnCode == 0) {
				alert('发送成功，请访问邮件中给出的网页链接地址，根据页面提示完成密码重设。');
			}else{

				alert('发送失败，请检测邮箱是否正确。');
			}
		});
	});
	
});
</script>