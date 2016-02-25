<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%@ page import="java.util.*"%><%@ include file="/WEB-INF/view/control/common/base.jsp"%>
<input type="hidden" id="base_need_full_window" value="true"/>
<link href="${basePath}/base/design/page.design.css" rel="stylesheet" >
<script type="text/javascript" src="${basePath}/base/design/support.js"></script>
<div class="page-design">
	<div class="design-tool">
		<ul class="nav nav-tabs" role="tablist">
			<li role="presentation" class="active"><a href="#tool-1" role="tab" data-toggle="tab">基础</a></li>
			<li role="presentation"><a href="#tool-2" role="tab" data-toggle="tab">设计</a></li>
			<c:forEach items="${modeltypes }" var="modeltype" varStatus="s">
				<li class="tool-model-${s.count }" role="presentation"><a href="#${modeltype.modeltype }" role="tab" data-toggle="tab">${modeltype.name }
				<%-- (<span class="">${fn:length(modeltype.models) }</span>) --%></a></li>
			</c:forEach>
			<li role="presentation" ><a href="#tool-99" role="tab" data-toggle="tab">隐藏</a></li>
		</ul>
		<div class="tab-content">
			<div role="tabpanel" class="tool-btns tab-pane active" id="tool-1">
				<%@ include file="tool-1.jsp" %>
			</div>
			<div role="tabpanel" class="tab-pane" id="tool-2">
				<%@ include file="tool-2.jsp" %>
			</div>
			<%@ include file="tool-3.jsp" %>
			<div role="tabpanel" class="tab-pane" id="tool-99"></div>
		</div>
	</div>
	<div class="design-container column"></div>
</div>
<script type="text/javascript">
  	
  	$(function(){
  	});
 </script>