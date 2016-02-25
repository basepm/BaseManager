<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%@ page import="java.util.*"%><%@ include file="/WEB-INF/view/control/common/base.jsp"%>

<c:forEach items="${modeltypes }" var="modeltype" >
	<div role="tabpanel" class="tab-pane" id="${modeltype.modeltype }">
    	<c:forEach items="${modeltype.models }" var="model" varStatus="s">
    		<div class="page-model ">
     			<div class="info">
     				<c:choose>
     					<c:when test="${model.inputnumber}">
     						<c:set var="defaultValue" value="3"/>
	   						<c:choose>
		   						<c:when test="${model.inputnumberlength > 0}">
		   							<c:forEach begin="1" end="${model.inputnumberlength-1 }">
										<c:set var="defaultValue" value="${defaultValue } 3"/>
		   							</c:forEach>
		   						</c:when>
		   						<c:otherwise>
									<c:set var="defaultValue" value="4 4 4 "/>
		   						</c:otherwise>
							</c:choose>
							<input type="text" class="inputnumber " value="${defaultValue }"
							inputnumberlength="${model.inputnumberlength }"
							inputnumbersum="${model.inputnumbersum }"
							clonebyinputnumber="${model.clonebyinputnumber }"
							inputnumbercloneconfig="${model.inputnumbercloneconfig }"
							canappend="${model.canappend }"
							appendconfig="${model.appendconfig }"/>
						</c:when>
						<c:otherwise>
							<%-- <div class="name">${model.name }</div> --%>
						</c:otherwise>
					</c:choose>
					<div class="content" canappend="${model.canappend }" appendconfig="${model.appendconfig }" hidden>${model.content }</div>
					<c:if test="${model.description == null || model.description == ''  }">
						<div class="description">${model.name }</div>
					</c:if>
					<c:if test="${model.description != null && model.description != ''  }">
						<div class="description">${model.description }</div>
					</c:if>
				</div>
	     		<div class="page-model-control-btn-group"></div>
   				<div class="view col-xs-12" style="float: none;">${model.content }</div>
   			</div>
    	</c:forEach>
    </div>
</c:forEach>
<script type="text/javascript">
	$(function() {
		function isPositiveNum(s){//是否为正整数 
			var re = /^[0-9]*[1-9][0-9]*$/ ; 
			return re.test(s);
		}
		$(".inputnumber").bind("keyup", function() {
			var input = $(this);
			var pagemodel = input.closest('.page-model');
			var inputnumberstr = input.val();
			var inputnumberlength = input.attr('inputnumberlength');
			var inputnumbersum = input.attr('inputnumbersum');
			var inputnumbercloneconfig = input.attr('inputnumbercloneconfig');
			var canappend = input.attr('canappend');
			canappend = canappend==null||canappend==''||canappend=='0'||canappend=='false'?false:true;
			var appendconfig = input.attr('appendconfig');
			var clonebyinputnumber = input.attr('clonebyinputnumber');
			clonebyinputnumber = clonebyinputnumber==null||clonebyinputnumber==''||clonebyinputnumber=='0'||clonebyinputnumber=='false'?false:true;
			var content = pagemodel.find('.content').html();
			var view = pagemodel.find('.view');
			if($.trim(inputnumberstr) == null || $.trim(inputnumberstr) == ''){
				pagemodel.find('.page-model-control-btn-group').hide();
				return;
			}
			var numbers = $.trim(inputnumberstr).split(' ');
			if(inputnumberlength>0 && numbers.length != inputnumberlength){
				pagemodel.find('.page-model-control-btn-group').hide();
				return;
			}
			var sum = 0;
			for(var i=0;i<numbers.length;i++){
				var number = numbers[i];
				if(!isPositiveNum(number)){
					pagemodel.find('.page-model-control-btn-group').hide();
					return;
				}
				sum+=number;
			}
			if(inputnumbersum > 0 && inputnumbersum < sum){
				pagemodel.find('.page-model-control-btn-group').hide();
				return;
			}
			var contentDiv = $('<div>').append(content);
				
			if(inputnumbercloneconfig == 'column'){
				var viewhtml = $('<div>');
				$(numbers).each(function(index, number) {
					viewhtml.append(contentDiv.html().replace('$n' ,number));
				});
				view.html(viewhtml.html());
			}else if(inputnumbercloneconfig == 'table'){
				var th = $(contentDiv.find('th')[0]).clone().html("<div ></div>");
				var td = $(contentDiv.find('td')[0]).clone().html("<div class=\"column\"></div>");
				var thlength = numbers[0];
				var trlength = numbers[1];
				var theadTr = $(contentDiv.find('table thead tr')[0]).clone();
				var tbodyTr = $(contentDiv.find('table tbody tr')[0]).clone();
				var thead = contentDiv.find('table thead');
				var tbody = contentDiv.find('table tbody');
				theadTr.html('');
				tbodyTr.html('');
				thead.html('');
				tbody.html('');
				for(var i=0;i<thlength;i++){
					var thisth = th.clone();
					thisth.find('div').html('标题'+i);
					theadTr.append(thisth);
					var thistd = td.clone();
					//thistd.find('div').attr("contenteditable", true);
					tbodyTr.append(thistd);
				}
				thead.append(theadTr);
				for(var i=0;i<trlength;i++){
					tbody.append(tbodyTr.clone());
				}
				view.html(contentDiv.html());
			}else if(inputnumbercloneconfig == 'button'){
				var btn = $(contentDiv.find('.btn')[0]).clone();
				var btnGroup = contentDiv.find(".btn-group");
				
				btnGroup.html('');
				for(var i=0;i<numbers[0];i++){
					var thisbtn = btn.clone();
					thisbtn.html('按钮'+i);
					btnGroup.append(thisbtn);
				}
				view.html(contentDiv.html());
			}
			if(canappend){
				if(appendconfig == null || appendconfig=='' || appendconfig=='this'){
					view.children().addClass('column');
				}else{
					view.find(appendconfig).addClass('column');
				}
			}
			view.find('.column');
			pagemodel.find('.page-model-control-btn-group').show();
		});
		
		$('.design-tool .content').each(function(index, content){
			var pagemodel = $(content).closest('.page-model');
			var canappend = $(content).attr('canappend');
			canappend = canappend==null||canappend==''||canappend=='0'||canappend=='false'?false:true;
			var appendconfig = $(content).attr('appendconfig');
			var content = $(content).html();
			var view = pagemodel.find('.view');
			if(canappend){
				if(appendconfig == null || appendconfig=='' || appendconfig=='this'){
					view.children().addClass('column');
				}else{
					view.find(appendconfig).addClass('column');
				}
			}
		});
		$(".inputnumber").keyup();
	});
</script>