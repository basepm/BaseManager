<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%@ page import="java.util.*"%><%@ include file="/WEB-INF/view/control/common/base.jsp"%>
<c:if test="${userid!=null&&userid!=''}">
	<div class="vd_chat-menu " style="border-top: 3px solid #39515F;" >
		<div class="vd_mega-menu-wrapper">
			<div class="vd_mega-menu">
				<ul class="mega-ul">
					<li class="one-big-icon mega-li mgl-10 system-chat-window" style="display: none;"> 
						<a href="javascript:;" class="open-chat-window mega-link" data-action="click-trigger">
							<span class="mega-icon">
								<img class="system-user-img photo" src="">
							</span>
							<span class="badge vd_bg-red user-chat-count"></span>
						</a>
						<div class="vd_mega-menu-content  open-top width-xs-4 width-md-4 width-lg-4 center-xs-4" data-action="click-target">
							<div class="child-menu">  
								<div class="title"> 
									<span class="nickname"></span>
									<div class="vd_panel-menu">
										<div data-rel="tooltip"  data-original-title="Close" onclick="javascript:$(this).closest('li').find('.open-chat-window').click();" class="menu entypo-icon">
											<i class="icon-cross"></i>
										</div>                                                                                                 
									</div>
								</div>                 
								<div class="content-list content-image content-menu">	
									<div data-rel="scroll">
										<ul class="list-wrapper pd-lr-10 user-message-list" style="max-height: 300px;overflow-y: auto;">
										</ul>
									</div>
									<div class="closing chat-area">
										<div class="chat-box">
											<input type="text" class="message-text" placeholder="输入聊天信息" />
					                   </div>
					                   <div class="vd_panel-menu">
											<div  data-rel="tooltip"  data-original-title="Insert Picture" class="menu send-message">
												<i class="glyphicon glyphicon-send"></i>
					                        </div>               
											<div  data-rel="tooltip"  data-original-title="Emoticons" class="menu">
												<i class="fa fa-smile-o"></i>
											</div>                                                                                  
					                    </div>
									</div>                                                                       
								</div>                              
							</div>        
						</div>
					</li>
					<li class="profile mega-li pdlr-15 bordered chat-user-list"> 
						<a class="mega-link" href="#"  data-action="click-trigger"> 
							<span class="menu-name">
								<i class="fa fa-comments append-icon"></i> 好友
							</span>
						</a> 
						<div class="vd_mega-menu-content  width-xs-3  center-xs-3 open-top" style="left: -114px;" data-action="click-target">
							<div class="child-menu"> 
								<div class="title">
									<span class="">好友列表</span>
									<div class="vd_panel-menu">
										<div data-rel="tooltip" data-action="close" class="menu entypo-icon">
											<i class="fa fa-remove"></i>
										</div>
									</div>
								</div>
								<div class="content-list  content-image">
									<div data-rel="scroll">
										<ul class="list-wrapper pd-lr-10 chat-system-bind-users">
											
										</ul>
									</div>
								</div>
							</div> 
						</div>     
					</li>  
					<li class="profile border-left mega-li chat-close-open"> 
						<a class="mega-link pd-10 chat-menu-open" style="display: none;" href="javascript:;"  data-action="chat-open"> 
							<span class="mega-icon">
								<i class="fa fa-sign-in"></i>
							</span>
						</a>
						<a class="mega-link pd-10 chat-menu-close"  href="javascript:;"  data-action="chat-close"> 
							<span class="mega-icon">
								<i class="fa fa-sign-out"></i>
							</span>
						</a>
					</li>                      
				</ul>
			</div>   
		</div>      
	</div>
	<script type="text/javascript" src="${basePath}/frame/js/chart.js"></script>
</c:if>

