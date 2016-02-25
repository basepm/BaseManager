<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%@ page import="java.util.*"%><%@ include file="/WEB-INF/view/control/common/base.jsp"%>

<input type="hidden" id="thisuserid" value="${userid }"/>
<div class="vd_title-section clearfix"><div class="vd_panel-header"><h1>用户个人中心</h1></div></div>
<div class="vd_content-section clearfix">
	<div class="row ">
		<div class="col-md-12 plate-panels pd-5">
		<div class="panel widget light-widget panel-bd-top">
			<div class="panel-heading ">
				<h3 class="panel-title"> 基本数据 </h3>
			</div>
				<form class="form-horizontal" action="#" onsubmit="javascript:;" role="form">
					<div class="panel-body">
						
						<div class="row">
							<div class="col-sm-12">
								<h3 class="mgbt-xs-15">账号信息</h3>
								<div class="form-group">
									<label class="col-sm-2 control-label">用户名</label>
									<div class="col-sm-10 controls">
										<div class="row mgbt-xs-0">
											<div class="col-xs-11 input-group-sm">
												<input type="text" readonly="readonly" style="border: 0px;" class="nickname form-control" value="${SYSTEM_USER_INFO.nickname }" placeholder="用户名">
											</div>
										</div>
									</div>
								</div>
								<div class="form-group" hidden>
									<label class="col-sm-2 control-label">头像</label>
									<div class="col-sm-10 controls">
										<div class="row mgbt-xs-0">
											<div class="col-xs-11 input-group-sm">
												<c:set var="fileurl" value="${basePath }/images/sys/no_img.png"/>
												<c:if test="${SYSTEM_USER_INFO.photo !=null&&SYSTEM_USER_INFO.photo!='' }">
													<c:if test="${fn:indexOf(SYSTEM_USER_INFO.photo,'http')>=0 }">
														<c:set var="fileurl" value="${SYSTEM_USER_INFO.photo }"/>
													</c:if>
													<c:if test="${fn:indexOf(SYSTEM_USER_INFO.photo,'http')<0 }">
														<c:set var="fileurl" value="${fileServiceUrl }/${SYSTEM_USER_INFO.photo }"/>
													</c:if>
												</c:if>
												<img class="" id="userimage"  style="width: 60px;height: 60px;"  alt="example image" src="${fileurl }">
												
												<button type="button" putvalueid="photo" showimageid="userimage" class="btn btn-xs vd_btn vd_bg-green  baseUploadFileBtn" style="margin-top: 30px;margin-left: 20px;">
													<span class="menu-icon"><i class="fa fa-upload"></i>
													</span> 上传
												</button>
												<input type="hidden" class="photo form-control" id="photo" value="${SYSTEM_USER_INFO.photo }"/>
											</div>
										</div>
									</div>
								</div>
								<div class="form-group">
									<label class="col-sm-2 control-label">区域</label>
									<div class="col-sm-10 controls">
										<div class="row mgbt-xs-0">
											<div class="col-xs-11 ">
												<div class="col-md-3  input-group-sm " style="">
												<div class="row">
													
													<select id="provinceno" disabled readonly="readonly" style="border: 0px;" name="provinceno"  class="col-md-4 element-select form-control parameter" initeventedselect="true">
														<option value="">请选择</option>
														<c:forEach items="${provinces }" var="one">
														<option value="${one.provinceno }" text="${one.name }" <c:if test="${SYSTEM_USER_INFO.provinceno == one.provinceno }">selected</c:if> name="${one.name }" provinceno="${one.provinceno }">${one.name }</option>
														</c:forEach>
													</select>
												</div>
									 			</div>
												<div class="col-md-1  input-group-sm " style="">
												</div>
												<div class="col-md-3  input-group-sm  " style="" >
												<div class="row">
													<select id="cityno" disabled readonly="readonly" style="border: 0px;" name="cityno"  class="element-selectchild form-control parameter" relationname="provinceno" initeventedselect="true">
														<option value="">请选择</option>
														<c:forEach items="${citys }" var="one">
														<option value="${one.cityno }" text="${one.name }" <c:if test="${SYSTEM_USER_INFO.cityno == one.cityno }">selected</c:if> name="${one.name }" relationvalue="${one.provinceno }" relationname="provinceno" cityno="${one.cityno }"  provinceno="${one.provinceno }" >${one.name }</option>
														</c:forEach>
													</select>
												</div>
										 		</div>
												<div class="col-md-1  input-group-sm " style="">
												</div>
												<div class="col-md-4  input-group-sm" style="" >
												<div class="row">
													<select id="areano" disabled readonly="readonly" style="border: 0px;" name="areano"  class="element-selectchild form-control parameter"  relationname="cityno" initeventedselect="true">
														<option value="">请选择</option>
														<c:forEach items="${areas }" var="one">
														<option value="${one.areano }" text="${one.name }" <c:if test="${SYSTEM_USER_INFO.areano == one.areano }">selected</c:if> name="${one.name }" relationvalue="${one.cityno }" relationname="cityno" cityno="${one.cityno }" areano="${one.areano }" >${one.name }</option>
														</c:forEach>
										   			</select>
												</div>
										  	 	</div>
											</div>
										</div>
									</div>
								</div>
								<div class="form-group " style="margin-top: -15px;">
									<label class="col-sm-2 control-label">邮箱</label>
									<div class="col-sm-10 controls">
										<div class="row mgbt-xs-0">
											<div class="col-xs-11 input-group-sm">
												<input type="email" class="email form-control " value="${SYSTEM_USER_INFO.email }" placeholder="邮箱">
											</div>
										</div>
									</div>
								</div>
								<div class="form-group">
									<label class="col-sm-2 control-label">手机</label>
									<div class="col-sm-10 controls">
										<div class="row mgbt-xs-0">
											<div class="col-xs-11 input-group-sm">
												<input type="text" class="phone form-control" maxlength="11" value="${SYSTEM_USER_INFO.phone }" placeholder="手机">
											</div>
										</div>
									</div>
								</div>
								<div class="form-group" hidden>
									<label class="col-sm-2 control-label">身份证</label>
									<div class="col-sm-10 controls">
										<div class="row mgbt-xs-0">
											<div class="col-xs-11 input-group-sm">
												<input type="text" class="no form-control" value="${SYSTEM_USER_INFO.no }" placeholder="身份证" />
											</div>
										</div>
									</div>
								</div>
								<div class="pd-20" >
									<button type="button" class="btn btn-xs vd_btn vd_bg-green col-md-offset-1 saveUserInfoBtn">
										<span class="menu-icon"><i class="fa fa-fw fa-check"></i>
										</span> 提交
									</button>
								</div>
							</div>
							<div class="col-sm-12">
								<h3 class="mgbt-xs-15">重置密码</h3>
								<div class="form-group">
									<label class="col-sm-2 control-label">原密码</label>
									<div class="col-sm-10 controls">
										<div class="row mgbt-xs-0">
											<div class="col-xs-11 input-group-sm">
												<input type="password" class="password form-control" value="" placeholder="密码">
											</div>
										</div>
									</div>
								</div>
								<div class="form-group">
									<label class="col-sm-2 control-label">新密码</label>
									<div class="col-sm-10 controls">
										<div class="row mgbt-xs-0">
											<div class="col-xs-11 input-group-sm">
												<input type="password" class="newpassword form-control" value="" placeholder="新密码">
											</div>
										</div>
									</div>
								</div>
								<div class="form-group">
									<label class="col-sm-2 control-label">确认密码</label>
									<div class="col-sm-10 controls">
										<div class="row mgbt-xs-0">
											<div class="col-xs-11 input-group-sm">
												<input type="password" class="resetnewpassword form-control" value="" placeholder="确认密码" />
											</div>
										</div>
									</div>
								</div>
								<div class="pd-20" >
									<button type="button" class="btn btn-xs vd_btn vd_bg-green col-md-offset-1 updatePasswordBtn">
										<span class="menu-icon"><i class="fa fa-fw fa-check"></i>
										</span> 重置密码
									</button>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>

</div>
<script>
	$(function() {
		$('.saveAccountInfoBtn').click(function(){
			var accountnickname = $('.accountnickname').val();
			var categoryid = $('.categoryid').val();
			var categorylevelid = $('.categorylevelid').val();
			var qrcode = $('.qrcode').val();
			var icon = $('.icon').val();
			var data = {};
			data.accountnickname = accountnickname;
			data.categoryid = categoryid;
			data.qrcode = qrcode;
			data.icon = icon;
			data.categorylevelid = categorylevelid;
			
			var action = 'system/user/updateAccount.do';
			base.POST(action,data,'json',function(o){
				var status = o.data;
				if(status.rtnCode == 0){
					alert('修改信息成功！');
				}else{
					alert('修改信息失败！');
				}
			});
		});
		$('.saveUserInfoBtn').click(function(){
			var phone = $('.phone').val();
			var photo = $('.photo').val();
			var no = $('.no').val();
			var email = $('.email').val();
			var nickname = $('.nickname').val();
			var provinceno = $('#provinceno').val();
			var cityno = $('#cityno').val();
			var areano = $('#areano').val();
			var data = {};
			data.no = no;
			data.photo = photo;
			data.phone = phone;
			data.provinceno = provinceno;
			data.cityno = cityno;
			data.areano = areano;
			data.email = email;
			data.nickname = nickname;
			
			var action = 'system/user/updateInfo.do';
			base.POST(action,data,'json',function(o){
				var status = o.data;
				if(status.rtnCode == 0){
					alert('修改信息成功！');
				}else{
					alert(status.rtnMsg);
				}
			});
		});

		$('.updatePasswordBtn').click(function(){
			var password = $('.password').val();
			var newpassword = $('.newpassword').val();
			var resetnewpassword = $('.resetnewpassword').val();
			var data = {};
			data.password = password;
			data.newpassword = newpassword;
			data.resetnewpassword = resetnewpassword;
			data.userid = $('#thisuserid').val();
			if(password == null || $.trim(password).length < 1){
				alert('请输入原密码！');
				return;
			}
			if(newpassword == null || $.trim(newpassword).length < 1){
				alert('请输入新密码！');
				return;
			}
			if(resetnewpassword == null || $.trim(resetnewpassword).length < 1){
				alert('请确认新密码！');
				return;
			}

			if(newpassword != resetnewpassword){
				alert('两次密码输入不一致！');
				return;
			}
			var action = '/system/user/resetPassword.do';
			base.POST(action,data,'json',function(o){
				var status = o.data;
				if(status.rtnCode == 0){
					alert('修改密码成功！');
				}else{
					alert(status.rtnMsg);
				}
			});
		});
	});
</script>
