<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%@ page import="java.util.*"%><%@ include file="/WEB-INF/view/control/common/base.jsp"%>

<div class="navbar-tabs-menu clearfix">
	<span class="expand-menu" data-action="expand-navbar-tabs-menu">
		<span class="menu-icon menu-icon-left">
			<i class="fa fa-ellipsis-h"></i>
		</span>
		<span class="menu-icon menu-icon-right">
			<i class="fa fa-ellipsis-h"></i>
		</span>
	</span>
	<div class="menu-container">
		<div class="vd_mega-menu-wrapper">
			<div class="vd_mega-menu" data-step=3>
				<ul class="mega-ul">
					<li  class="one-icon mega-li">
						<a class="mega-link  vd_bg-blue toBackBtn" href="javascript:void(0);" >
							<span class="mega-icon" >
								<i class="fa fa-reply"></i>
							</span>
						</a>
					</li>
					<li  class="one-icon mega-li">
						<a class="mega-link  vd_bg-green toActionBtn" href="javascript:void(0);" toAction="index/toIndex.do" >
							<span class="mega-icon" >
								<i class="fa fa-home"></i>
							</span>
						</a>
					</li>
					<li  class="one-icon mega-li">
						<a class="mega-link vd_bg-red toActionBtn" href="javascript:void(0);" toAction="system/user/toCenter.do">
							<span class="mega-icon">
								<i class="fa fa-user"></i>
							</span>
						</a>
					</li>
					<c:if test="${account == null }">
						<li  class="one-icon mega-li">
							<a class="mega-link vd_bg-yellow toExitBtn" href="javascript:void(0);" toAction="login/toExit.do">
								<span class="mega-icon">
									<i class="fa  fa-power-off"></i>
								</span>
							</a>
						</li>
					</c:if>
					<c:if test="${account != null }">
						<li class="one-icon mega-li"> 
							<c:set var="fileurl" value="${basePath }/images/sys/no_img.png"/>
							<c:if test="${account.icon !=null&&account.icon!='' }">
								<c:if test="${fn:indexOf(account.icon,'http')>=0 }">
									<c:set var="fileurl" value="${account.icon }"/>
								</c:if>
								<c:if test="${fn:indexOf(account.icon,'http')<0 }">
									<c:set var="fileurl" value="${fileServiceUrl }/${account.icon }"/>
								</c:if>
							</c:if>
					        <a class="mega-link " href="javascript:void(0);" style="background-image: url('${fileurl}');background-size: 100%;background-color: white;background-repeat: no-repeat;background-position: center center;"
					        data-toggle="tooltip" data-placement="bottom" data-original-title="${account.nickname }"
					         data-action="click-trigger">
					        </a>
					        <div class="vd_mega-menu-content  width-xs-2  center-xs-2" data-action="click-target" style="display: none;">
					                <div class="child-menu"> 
					                    <div class="content-list content-menu">
					                        <ul class="list-wrapper pd-lr-10">
					                        	<c:forEach items="${useraccounts }" var="useraccount">
													<c:set var="fileurl" value="${basePath }/images/sys/no_img.png"/>
													<c:if test="${useraccount.icon !=null&&useraccount.icon!='' }">
														<c:if test="${fn:indexOf(useraccount.icon,'http')>=0 }">
															<c:set var="fileurl" value="${useraccount.icon }"/>
														</c:if>
														<c:if test="${fn:indexOf(useraccount.icon,'http')<0 }">
															<c:set var="fileurl" value="${fileServiceUrl }/${useraccount.icon }"/>
														</c:if>
													</c:if>
													<li>
														<a href="javascript:;" class=" " >
															<div class="menu-icon">
																<img src="${fileurl }" style="margin-top: -5px;min-width: 25px;min-height: 25px;"/>
															</div>
															<div class="menu-text">
															<c:if test="${accountid == useraccount.accountid}">
																<span style="color: green;">${useraccount.nickname }</span>
															</c:if>
															<c:if test="${accountid != useraccount.accountid}">
																<span>${useraccount.nickname }</span>
															</c:if>
															</div>
															<c:if test="${accountid != useraccount.accountid}">
															<div class="menu-btn baseSubmitBtn" toAction="/wechat/account/changeAccount.do?accountid=${useraccount.accountid }"
															style="float: right;margin-top: -24px;color: #00C700;" successtodo="1" shouldconfirm="1" needalert="false"
															>切换</div>
															</c:if>
														</a>
													</li>
												</c:forEach>
					                                      
					                        </ul>
					                    </div> 
					                </div> 
					           </div>   <!-- vd_mega-menu-content  -->      
					    </li>
					</c:if>
					
				</ul>
			</div>
		</div>
	</div>                                            
</div>
	