function getRootPath(){
	//获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
	var curWwwPath=window.document.location.href;
	//获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
	var pathName=window.document.location.pathname;
	var pos=curWwwPath.indexOf(pathName);
	//获取主机地址，如： http://localhost:8083
	var localhostPaht=curWwwPath.substring(0,pos);
	//获取带"/"的项目名，如：/uimcardprj
	var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
	return(localhostPaht+projectName)+'/';
}
basePath = getRootPath();
window.getElementLeft = function(element){
	var actualLeft = element.offsetLeft;
	var current = element.offsetParent;
	while (current !== null){
		actualLeft += current.offsetLeft;
		current = current.offsetParent;
	}
	return actualLeft;
}
window.getElementTop = function(element){
	var actualTop = element.offsetTop;
	var current = element.offsetParent;
	while (current !== null){
		actualTop += current.offsetTop;
		current = current.offsetParent;
	}
	return actualTop;
}
window.fullElementParameter = function(element){
	element.left = getElementLeft(element);
	element.top = getElementTop(element);
	element.width = element.clientWidth;
	element.height = element.clientHeight;
	element.right = element.left+element.width;
	element.bottom = element.top+element.height;
}
//内间距在XX值以内用于改变大小
var usedchangesizemarginsize = 10;
function isNearLeft(element,e){
	var number = getElementLeft(element);
	if((e.pageX-number)>=0&&(e.pageX-number)<usedchangesizemarginsize){
		return true;
	}
	return false;
}
function isNearRight(element,e){
	var number = getElementLeft(element) + element.offsetWidth;
	if((e.pageX-number)>-usedchangesizemarginsize&&(e.pageX-number)<=0){
		return true;
	}
	return false;
}
function isNearTop(element,e){
	var number = getElementTop(element);
	if((e.pageY - number)>=0&&(e.pageY - number)<usedchangesizemarginsize){
		return true;
	}
	return false;
}
function isNearBottom(element,e){
	var number = getElementTop(element)+element.offsetHeight;
	if((e.pageY-number)>-usedchangesizemarginsize&&(e.pageY-number)<=0){
		return true;
	}
	return false;
}
POST = function(action, data,type,callback,async) {
	if(typeof (showMask) != "undefined"){
		showMask();
	}
	if(action.indexOf('//') == 0){
		action = action.substring(1);
	}
	var actionHref = '';
	if(basePath==null||basePath==''){
		if(action.indexOf('/')==0){
			actionHref = action;
		}else{
			actionHref = "/" + action;
		}
	}else{
		actionHref = basePath + "/" +action;
	}
	var dataObj = {};
	if (data){
		dataObj = data;
	}
	if(!type){
		type = 'json';
	}
	var as = true;
	if(async == null || typeof(async) == 'undefinde' || async == 'true'){
		as = true;
	}else{
		as = false;
	}
	$.ajax({
		url : actionHref,
		data : dataObj,
		type : 'post',
		dataType : type,
		async : as,      // 取消异步请求
		beforeSend : function(){
		},
		success : function(res) {
			if(callback && $.isFunction(callback)) {
				callback(res);
			}
			// 可添加完成后处理
			if (typeof (hideMask) != "undefined"){
				hideMask();
			}
		},
		complete : function(XMLHttpRequest, textStatus) {
		},
		error : function(XMLHttpRequest,textStatus,errorThrown) {
			// 可添加完成后处理
			if (typeof (hideMask) != "undefined"){
				hideMask();
			}
		}
	});
};


$(function(){


	//元素移动控件
	$('html').on('mousedown','.tool-usedmove',function(e){
		e = window.event || e;
		var mouseX = e.pageX;
		var mouseY = e.pageY;
		var element = $(this).get(0);
		var me = $(this).attr('move-element');
		if(me != null && me != ''){
			if(me == 'parent' || me == 'p'){
				element = $(this).parent().get(0);
			}
			else if(me == 'parent.parent' || me == 'p.p'){
				element = $(this).parent().parent().get(0);
			}else{
				element = $(me).get(0);
			}
		}
		fullElementParameter(element);
		function move(e){
			var left = element.left + (e.pageX - mouseX);
			var top = element.top + (e.pageY - mouseY);
			$(element).css({
				'top' :  top + 'px',
				'left' : left + 'px'
			});
		}
		var canmove = true;
		if($(element).hasClass('tool-usedchangesize')){
			if(isNearLeft(element,e) || isNearRight(element,e) || isNearTop(element,e) || isNearBottom(element,e)){
				canmove = false;
			}
		}
		if(canmove){
			$(element).bind('mousemove',move);
		}
		$(document).mouseup(function(){
			$(element).unbind('mousemove');
		});
	});

	//元素改变大小控件
	$('html').on('mousedown','.tool-usedchangesize',function(e){
		e = window.event || e;
		var mouseX = e.pageX;
		var mouseY = e.pageY;
		var element = $(this).get(0);
		fullElementParameter(element);
		function changesize(e){
			e = window.event || e;
			var movex = (e.pageX - mouseX);
			var movey = (e.pageY - mouseY);
			//靠近左边
			if(isNearLeft(element, e)){
				//左移动
				if(movex<=0){
					var l = element.left + (movex);
					var w = element.width + (-movex);
					$(element).css({
						'width' :  w + 'px',
						'left' : l + 'px'
					});
				}else{
					var l = element.left + (movex);
					var w = element.width + (-movex);
					$(element).css({
						'width' :  w + 'px',
						'left' : l + 'px'
					});
				}

			}
			//靠近右边
			else if(isNearRight(element,e)){
				//左移动
				if(movex<=0){
					var w = element.width + (movex);
					$(element).css({
						'width' :  w + 'px'
					});
				}else{
					var w = element.width + (movex);
					$(element).css({
						'width' :  w + 'px'
					});
				}

			}
			//靠近上边
			if(isNearTop(element, e)){
				//上移动
				if(movey<=0){
					var t = element.top + (movey);
					var h = element.height + (-movey);
					$(element).css({
						'height' :  h + 'px',
						'top' : t + 'px'
					});
				}else{
					var t = element.top + (movey);
					var h = element.height + (-movey);
					$(element).css({
						'height' :  h + 'px',
						'top' : t + 'px'
					});
				}
			}
			//靠近下边
			else if(isNearBottom(element, e)){
				//上移动
				if(movey<=0){
					var h = element.height + (movey);
					$(element).css({
						'height' :  h + 'px'
					});
				}else{
					var h = element.height + (movey);
					$(element).css({
						'height' :  h + 'px'
					});
				}
			}
		}
		$(element).bind('mousemove',changesize);
		$(document).mouseup(function(){
			$(element).unbind('mousemove');
		});
	});
	selectelement = null;
	$(document).keydown(function(e){
		var theEvent = window.event || e;
		var code = theEvent.keyCode || theEvent.which;
		if(selectelement!=null&&$(selectelement).hasClass('tool-usedmove')){
			//37左 38上 39右 40下
			if(code == 37){
				fullElementParameter(selectelement);
				var left = selectelement.left-1+'px';
				if(theEvent.shiftKey){
					left = selectelement.left-5+'px';
				}
				$(selectelement).css({
					'left' : left
				});
			}
			if(code == 38){
				fullElementParameter(selectelement);
				var top = selectelement.top-1+'px';
				if(theEvent.shiftKey){
					top = selectelement.top-5+'px';
				}
				$(selectelement).css({
					'top' : top
				});
			}if(code == 39){
				fullElementParameter(selectelement);
				var left = selectelement.left+1+'px';
				if(theEvent.shiftKey){
					left = selectelement.left+5+'px';
				}
				$(selectelement).css({
					'left' : left
				});
			}
			if(code == 40){
				fullElementParameter(selectelement);
				var top = selectelement.top+1+'px';
				if(theEvent.shiftKey){
					top = selectelement.top+5+'px';
				}
				$(selectelement).css({
					'top' : top
				});
			}
		}
		if(selectelement!=null&&$(selectelement).hasClass('tool-usedchangesize')){
			//37左 38上 39右 40下
			if(code == 107||code==187){
				fullElementParameter(selectelement);
				var width = selectelement.width+1+'px';
				var height = selectelement.height+1+'px';
				if(theEvent.shiftKey){
					width = selectelement.width+5+'px';
					height = selectelement.height+5+'px';
				}
				$(selectelement).css({
					'width' : width,
					'height' : height
				});
			}
			if(code == 109||code==189){
				fullElementParameter(selectelement);
				var width = selectelement.width-1+'px';
				var height = selectelement.height-1+'px';
				if(theEvent.shiftKey){
					width = selectelement.width-5+'px';
					height = selectelement.height-5+'px';
				}
				$(selectelement).css({
					'width' : width,
					'height' : height
				});
			}
		}
	});
});
