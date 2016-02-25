<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%@ page import="java.util.*"%><%@ include file="/WEB-INF/view/control/common/base.jsp"%>

<div  class="vd_navbar vd_nav-width vd_navbar-tabs-menu vd_navbar-left  ">
	<%@ include file="leftnavbartop.jsp"%>
	
	<div class="navbar-menu clearfix">
        <div class="vd_panel-menu hidden-xs">
            <span data-original-title="打开所有菜单" data-toggle="tooltip" data-placement="bottom" data-action="expand-all" class="menu" data-step=4 >
                <i class="fa fa-sort-amount-asc"></i>
            </span>                   
        </div>
    	<h3 class="menu-title hide-nav-medium hide-nav-small">操作导航</h3>
        <div class="vd_menu">
        	<ul class="system_menu">
				
			</ul>
		</div>             
	</div>
    <div class="navbar-spacing clearfix" >
    </div>
    <div class="vd_menu vd_navbar-bottom-widget">
    </div>     
</div>
<c:if test="${thisbaseconfig.openchat }">
	<%@ include file="rightnavbar.jsp"%> 
</c:if>   