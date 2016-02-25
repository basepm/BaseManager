<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%@ page import="java.util.*"%><%@ include file="/WEB-INF/view/control/common/base.jsp"%>

<div class="vd_navbar vd_nav-width vd_navbar-chat vd_navbar-right   ">
	<div class="navbar-tabs-menu clearfix">
		<span class="expand-menu" data-action="expand-navbar-tabs-menu">
			<span class="menu-icon menu-icon-left">
				<i class="fa fa-ellipsis-h"></i>
		       <span class="badge vd_bg-red">20</span>                    
			</span>
			<span class="menu-icon menu-icon-right">
				<i class="fa fa-ellipsis-h"></i>
		       <span class="badge vd_bg-red">20</span>                    
			</span>                
		</span>  
		<div class="menu-container">               
			<div class="navbar-search-wrapper">
				<div class="navbar-search vd_bg-black-30">
					<span class="append-icon"><i class="fa fa-search"></i></span>
					<input type="text" placeholder="Search" class="vd_menu-search-text no-bg no-bd vd_white width-70" name="search">
					<div class="pull-right search-config">                                
						<a  data-toggle="dropdown" href="javascript:void(0);" class="dropdown-toggle" >
							<span class="prepend-icon vd_grey"><i class="fa fa-cog"></i></span>
						</a>
						<ul role="menu" class="dropdown-menu">
							<li><a href="#">在线</a></li>
							<li><a href="#">离线</a></li>
							<li><a href="#">所有</a></li>
							<li class="divider"></li>
							<li><a href="#">黑名单</a></li>
						</ul>                                    
					</div>
				</div>
			</div>  
		</div>
	</div>
	<div class="navbar-menu clearfix">
    	<div class="content-list content-image content-chat">
            <ul class="list-wrapper no-bd-btm pd-lr-10 system-bind-users">
            	<li class="group-heading vd_bg-black-20">
					<a class="mega-link show-add-user" href="javascript:void(0);" data-action="click-trigger"  >
						<span class="mega-icon" >
							<i class="fa fa-plus"></i>
						</span>
					</a>
					<div class=" vd_mega-menu-content width-xs-3 width-sm-3 width-md-3 center-xs-3 right-sm pd-0" data-action="click-target">
						<div class="child-menu">
							<div class="title"> 添加用户
				               	<div class="vd_panel-menu" style="top: 2px;">
				                     <div data-action="close" onclick="javascript:$(this).closest('li').find('.show-add-user').click();" class="menu entypo-icon" style="font-size: 15px;line-height: 20px;">
				                        <i class="fa  fa-times"></i>
				                    </div>                                                                                                 
		                		</div>
							</div>
							<div class="form-horizontal" style="margin-top: 20px;margin-left: 10px;margin-right: 10px;">
		                		<div class="form-group">
		                  			<label class="col-sm-3 control-label" style="">昵称</label>
			                  		<div class="col-sm-7 controls input-group input-group-sm">
			                    		<input type="text" style="" class="form-control add-nickname">
			                  		</div>
			                	</div>
		                	<div class="form-group form-actions">
	                  			<div class="col-sm-3"> </div>
		            			<div class="col-sm-7">
				                    <button class="btn btn btn-xs  vd_btn vd_bg-green vd_white addBindUser" type="button">保存</button>
			                  	</div>
		                	</div>
						</div>
					</div>
				</li>
				<li class="group-heading vd_bg-black-20">好友</li>
				
			</ul>
        </div>
    </div>
    <div class="navbar-spacing clearfix">
    </div>
</div>    