<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%@ page import="java.util.*"%><%@ include file="/WEB-INF/view/control/common/base.jsp"%>
<script type="text/javascript">
$(function(){
	$('body').get(0).className = 'full-layout no-nav-left no-nav-right  background-login responsive login-layout clearfix nav-right-hide nav-left-hide';
	$('body').attr('data-active','pages');
	$('body').attr('id','pages');
	$('body').attr('data-smooth-scrolling','1');
});
</script>
<style type="text/css">
	form input{
		font-size: 13px !important;
	}
	form select{
		font-size: 13px !important;
	}
	body{
		background-color: white;
	}
</style>
<input type="hidden" id="base_need_full_window" value="true"/>
<div class="vd_content-section clearfix">
	<div class="vd_register-page " style="">
		<div class="heading clearfix">
			<div class="logo">
				<h2 class="mgbt-xs-5"></h2>
			</div>
			<h4 class="text-center font-semibold vd_grey">用户 注册</h4>
		</div>
		<div class="panel widget">
			<div class="panel-body">
				<form class="form-horizontal"  onsubmit="javascript:return false;" role="form" id="register-form">
					<div class="alert alert-danger vd_hidden">
						<button type="button" class="close" data-dismiss="alert" aria-hidden="true"><i class="icon-cross"></i></button>
						<span class="vd_alert-icon"><i class="fa fa-exclamation-circle vd_red"></i></span><strong>错误!</strong> <span class="error-info"></span> 
					</div>
					<div class="alert alert-success vd_hidden">
						<button type="button" class="close" data-dismiss="alert" aria-hidden="true"><i class="icon-cross"></i></button>
						<span class="vd_alert-icon"><i class="fa fa-check-circle vd_green"></i></span><strong>注册成功!</strong> </a>
					</div>                      
					<div class="form-group">
						<div class="col-md-12">
							<div class="label-wrapper">
								<label class="control-label">用户名 <span class="vd_red">*</span></label>
							</div>
							<div class="" id="first-name-input-wrapper"> 
								<input type="text" placeholder="用户名" class="form-control parameter"  name="nickname" id="nickname">
							</div>
						</div>
					</div>
					<div class="form-group">
					  	<div class="col-md-6">
					    	<div class="label-wrapper">
					      		<label class="control-label">密码 <span class="vd_red">*</span></label>
					    	</div>
					    	<div class="" id="password-input-wrapper">
					     		<input type="password" placeholder="Password" class="form-control parameter"   name="password" id="password">
					    	</div>
					  	</div>
					  	<div class="col-md-6">
					    	<div class="label-wrapper">
					      		<label class="control-label">确认密码 <span class="vd_red">*</span></label>
					    	</div>
					    	<div class="" id="confirm-password-input-wrapper">
					      		<input type="password" placeholder="确认密码" class="form-control parameter"  name="repeatpassword" id="repeatpassword">
					    	</div>
					  	</div>
					</div>
					<div class="form-group">
					  	<div class="col-md-12">
					    	<div class="label-wrapper">
					      		<label class="control-label">手机号 <span class="vd_red">*</span></label>
					    	</div>
					    	<div class="" id="phone-input-wrapper"> 
					      		<input type="phone" placeholder="手机号" class="form-control parameter"   name="phone" id="phone">
					    	</div>
				 		</div>
					</div>
					<div class="form-group">
					  	<div class="col-md-4" >
					    	<div class="label-wrapper">
					      		<label class="control-label">所属省市 <span class="vd_red">*</span></label>
				    		</div>
							<div class=" ">
								<select id="provinceno" name="provinceno"  class="inputtype-select form-control parameter" initeventedselect="true">
									<option value="">请选择</option>
									<c:forEach items="${provinces }" var="one">
									<option value="${one.provinceno }" text="${one.name }" name="${one.name }" provinceno="${one.provinceno }">${one.name }</option>
									</c:forEach>
								</select>
				 			</div>
					  	</div>
					  	<div class="col-md-4" >
					    	<div class="label-wrapper">
					      		<label class="control-label">&nbsp;</label>
				    		</div>
					 		<div class="" >
								<select id="cityno" name="cityno"  class="inputtype-select form-control parameter" relationname="provinceno" initeventedselect="true">
									<option value="">请选择</option>
									<c:forEach items="${citys }" var="one">
									<option value="${one.cityno }" text="${one.name }" name="${one.name }" relationvalue="${one.provinceno }" relationname="provinceno" >${one.name }</option>
									</c:forEach>
								</select>
					 		</div>
					  	</div>
					  	<div class="col-md-4"  >
					    	<div class="label-wrapper">
					      		<label class="control-label">&nbsp;</label>
				    		</div>
					 		<div class="">
								<select id="areano" name="areano"  class="inputtype-select form-control parameter"  relationname="cityno" initeventedselect="true">
									<option value="">请选择</option>
									<c:forEach items="${areas }" var="one">
									<option value="${one.areano }" text="${one.name }" name="${one.name }" relationvalue="${one.cityno }" relationname="cityno" >${one.name }</option>
									</c:forEach>
					   			</select>
					  	 	</div>
					  	</div>
					</div>
					
					<div class="form-group" >
					  	<div class="col-md-12">
					    	<div class="label-wrapper">
					      		<label class="control-label">邮箱 <span class="vd_red">*</span></label>
					    	</div>
					    	<div class="" id="email-input-wrapper"> 
					      		<input type="email" placeholder="邮箱" class="form-control parameter"   name="email" id="email">
				    		</div>
					  	</div>
					</div>
                   	<div id="vd_login-error" class="alert alert-danger hidden"><i class="fa fa-exclamation-circle fa-fw"></i> 输入信息有误！ </div>
                    <div class="form-group">
                  		<div class="col-md-12 mgbt-xs-10 mgtp-20" hidden>
                        	<div class="vd_checkbox">
                          		<input type="checkbox" id="agreeterms" value="1" class="agreeterms form-control" required name="checkbox-2">
                          		<label for="agreeterms"> 同意 <a href="#">服务条款</a></label>
                       		</div>
                      	</div>
						<div class="col-md-12 text-center mgbt-xs-5">
							<button class="btn vd_bg-green vd_white width-100 doRegisterBtn" type="button" id="" name="">注册</button>
						</div>
                    </div>
				</form>
			</div>
		</div>
			<!-- Panel Widget -->
   		<div class="register-panel text-center font-semibold"> 已经有帐号? <br/>
			<a href="javascript:;" class="toActionBtn" toAction="login/toLogin.do">登录<span class="menu-icon"><i class="fa fa-angle-double-right fa-fw"></i></span></a>
		</div>
	</div>
</div>
<script type="text/javascript">
$(document).ready(function() {
	$('.doRegisterBtn').click(function() {
		doRegister();
	});
	$(window).on('keydown', function(e) {
		var theEvent = window.event || e;
		var code = theEvent.keyCode || theEvent.which;
		if (code == 13) {
			doRegister();
		}
	});
});

function doRegister() {
	var parameters = $('.parameter');
	var data = {};
	var password = $('#password').val();
	$('.alert-success').hide();

	$('.alert-danger').hide();
	for(var i=0;i<parameters.length;i++){
		var parameter = $(parameters[i]);
		var name = parameter.attr('name');
		var value = parameter.val();
		
		if(name!='businessno'&&name!='mail'&&(value == null || $.trim(value) == '')){
			parameter.parent().addClass('has-error');
			$('.alert-danger').show();
			$('.alert-danger').find('.error-info').html('请检查资料是否完整！');
			return;
		}
		if(name == 'nickname' && value.length < 4){
			parameter.parent().addClass('has-error');
			$('.alert-danger').show();
			$('.alert-danger').find('.error-info').html('请输入用户名，并且用户名不能小于四位');
			return;
		}
		if(name == 'password' && value.length < 6){
			parameter.parent().addClass('has-error');
			$('.alert-danger').show();
			$('.alert-danger').find('.error-info').html('请输入密码，并且密码不能小于六位');
			return;
		}
		if(name == 'repeatpassword' && value.length < 6){
			parameter.parent().addClass('has-error');
			$('.alert-danger').show();
			$('.alert-danger').find('.error-info').html('请输入密码，并且密码不能小于六位');
			return;
		}
		if(name == 'repeatpassword' && value != password){
			parameter.parent().addClass('has-error');
			$('.alert-danger').show();
			$('.alert-danger').find('.error-info').html('两次密码输入不一致');
			return;
		}
		/* if(name == 'email'){
			var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
			var isok= reg.test(value);
			if(!isok){
				parameter.parent().addClass('has-error');
				$('.alert-danger').show();
				$('.alert-danger').find('.error-info').html('请输入正确邮箱');
				return;
			}
		} */
		data[name] = value;
		parameter.parent().removeClass('has-error');
	}
	/* if(!$('#agreeterms').get(0).checked){
		$('#agreeterms').parent().addClass('has-error');
		$('.alert-danger').show();
		$('.alert-danger').find('.error-info').html('您必须同意条款');
		return;
	}
	$('#agreeterms').parent().removeClass('has-error'); */
	var action = '/login/doRegister.do';

	base.POST(action, data, 'json', function(o) {
		var data = o.data;
		//登录成功
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
