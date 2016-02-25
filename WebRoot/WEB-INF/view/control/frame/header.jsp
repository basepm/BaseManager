<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%@ page import="java.util.*"%><%@ include file="/WEB-INF/view/control/common/base.jsp"%>

<!-- Header Start -->
<header class="header-2 sys-header header" id="header">
	<div class="vd_top-menu-wrapper">
		<div class="container ">
			<div class="vd_top-nav vd_nav-width  ">
				<div class="vd_panel-header">
					<div class="logo">
            			<a href="${basePath }/index/toIndex.do">${thisbaseconfig.systemname }</a>
            		</div>
					<div class="vd_panel-menu  hidden-sm hidden-xs" data-step=1>
						<span class="nav-medium-button menu" data-toggle="tooltip" data-placement="bottom" data-original-title="切换中等导航" data-action="nav-left-medium">
	                    	<i class="fa fa-bars"></i>
						</span>		                    
						<span class="nav-small-button menu" data-toggle="tooltip" data-placement="bottom" data-original-title="切换小导航" data-action="nav-left-small">
							<i class="fa fa-ellipsis-v"></i>
						</span>         
					</div>
					<div class="vd_panel-menu left-pos visible-sm visible-xs">
						<span class="menu" data-action="toggle-navbar-left">
                            <i class="fa fa-ellipsis-v"></i>
                        </span>
					</div>
					<div class="vd_panel-menu visible-sm visible-xs">
 						<span class="menu visible-xs visible-sm" data-action="submenu">
							<i class="fa fa-bars"></i>
						</span>
						
									
					   <c:if test="${thisbaseconfig.openchat }">
					   <span class="menu visible-sm visible-xs nousershouldhidden" data-action="toggle-navbar-right">
                            <i class="fa fa-comments"></i>
                        </span>
					   </c:if>
                        
					</div>
				</div>
			</div>    
			<div class="vd_container ">
				<div class="row">
					<div class="col-sm-8 col-xs-12">
						<div class="vd_mega-menu-wrapper horizontal-menu">
							<div class="vd_mega-menu">                
								<ul class="mega-ul system-top-menu">   
									<li class="mega-li"> 
									    <a class="mega-link" href="#action=index/toIndex.do"> 
									        <span class="mega-text">Home</span>
									    </a> 
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="col-sm-4 col-xs-12">
              			<div class="vd_mega-menu-wrapper">
                    		<div class="vd_mega-menu pull-right">
            					<ul class="mega-ul">
									<li class="one-icon mega-li nousershouldshow" style="display: none;">
										<a href="javascript:;" class="mega-link toActionBtn" toAction="login/toLogin.do">
											登录
										</a>
									</li>
									
								   <c:if test="${thisbaseconfig.openregistration }">
								  	<li class="one-icon mega-li nousershouldshow" style="display: none;">
											<a href="javascript:;" class="mega-link toActionBtn" toAction="login/toRegister.do">
												注册
											</a>
										</li>
								   </c:if> 
									
									
								   <c:if test="${thisbaseconfig.openmessage }">
								  	<li id="top-menu-2" class="one-icon mega-li system-message-window nousershouldhidden" style="display: none;">
										<a href="javascript:;" class="mega-link system-message-window" data-action="click-trigger">
											<span class="mega-icon">
												<i class="fa fa-envelope"></i>
											</span>
											<span class="badge vd_bg-red system-message-system-count" style="display:none;"></span>
										</a>
										<div class="vd_mega-menu-content width-xs-3 width-sm-4 width-md-5 width-lg-4 right-xs left-sm" data-action="click-target">
											<div class="child-menu">
												<div class="title"> 信息
									               	<div class="vd_panel-menu">
									                     <div data-action="close" data-original-title="Close" class="menu entypo-icon">
									                        <i class="fa fa-remove"></i>
									                    </div>                                                                                                 
									                </div>
									           	</div>
												<div class="content-list content-image">
													<div data-rel="scroll">
														<ul class="list-wrapper pd-lr-10 system-message-ul">
															
														</ul>
													</div>
													<div class="closing text-center" style="">
														<a href="javascript:;">See All Notifications <i class="fa fa-angle-double-right"></i> </a>
													</div>
												</div>
											</div>
										</div>
									</li>
								   </c:if> 
									<li id="top-menu-profile" class="profile mega-li nousershouldhidden" style="display: none;">
										<a href="javascript:;" class="mega-link" data-action="click-trigger">
											<span class="mega-image">
												<i class=" fa fa-user" style="width: 36px;height: 36px;font-size: 25px;text-align: center;padding-top: 3px;"> </i>
											</span>
											<span class="mega-name">
												<span class="usershowinfo"></span>
												<i class="fa fa-caret-down fa-fw"></i>
											</span>
										</a>
										<div class="vd_mega-menu-content  width-xs-2  left-xs left-sm" data-action="click-target">
											<div class="child-menu">
												<div class="content-list content-menu">
													<ul class="list-wrapper pd-lr-10">
														<li>
															<a href="javascript:;" class="toActionBtn" toAction="system/user/toCenter.do">
																<div class="menu-icon">
																	<i class=" fa fa-user"></i>
																</div>
																<div class="menu-text">个人中心</div>
															</a>
														</li>
														<li>
															<a href="javascript:;" class="toExitBtn" toAction="login/toExit.do">
																<div class="menu-icon">
																	<i class=" fa  fa-power-off"></i>
																</div>
																<div class="menu-text">退出</div>
															</a>
														</li>
													</ul>
												</div>
											</div>
										</div>
									</li>
									
									<%-- <li id="top-menu-profile" class="profile mega-li nousershouldhidden" style="display: none;">
										<a href="javascript:;" class="mega-link" data-action="click-trigger">
											<span class="mega-image" style="width: 45px;padding-top: 1px;">
											公众号:
											</span>
											<span class="mega-name">
												<span class="">${account.nickname }</span>
												<i class="fa fa-caret-down fa-fw"></i>
											</span>
										</a>
										<div class="vd_mega-menu-content  width-xs-2  left-xs left-sm" data-action="click-target">
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
																	<div class="menu-btn baseSubmitBtn" toAction="system/changeAccount.do?accountid=${useraccount.accountid }"
																	style="float: right;margin-top: -24px;color: #00C700;" successtodo="1" shouldconfirm="1"
																	>切换</div>
																	</c:if>
																</a>
															</li>
														</c:forEach>
													</ul>
												</div>
											</div>
										</div>
									</li> --%>
								   <c:if test="${thisbaseconfig.openchat }">
								  	 <li id="top-menu-settings" class="one-big-icon hidden-xs hidden-sm mega-li nousershouldhidden" style="display: none;" data-intro="" data-step=2 data-position="left">
										<a href="javascript:;" class="mega-link" data-action="toggle-navbar-right">
											<span class="mega-icon">
												<i class="fa fa-comments"></i>
											</span>
											<span class="badge vd_bg-red system-message-chat-count"  style="display:none;"></span>
										</a>
									</li>
								   </c:if>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<input type="hidden" value="${userid }" id="system_user_id">
</header>