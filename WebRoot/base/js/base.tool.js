/**
 * 基本工具类
 * 常用页面工具 事件 等
 */
(function(){
	'use strict';
	if(window['base.tool']){
		throw new Error('base.tool不可以重复加载!');
	}
	window['base.tool'] = true;
	if (typeof jQuery === 'undefined') {
		throw new Error('需要jQuery');
	}
	window.tool = window.tool == null? {}:window.tool;
})();
(function(){
	'use strict';
	tool.error= {}
	tool.error.page = {};
	tool.error.page['404'] = "base/error/404.do";
	tool.error.page['500'] = "base/error/500.do";
	tool.error.page['toNoAccess'] = "base/error/toNoAccess.do";
	tool.error.page['toLogin'] = "login/toLogin.do";
	tool.error.page['toIndex'] = "index/toIndex.do";
	function getRootPath(){
		//获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
		var curWwwPath = window.document.location.href;
		//获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
		var pathName = window.document.location.pathname;
		var pos = curWwwPath.indexOf(pathName);
		//获取主机地址，如： http://localhost:8083
		var localhostPaht = curWwwPath.substring(0,pos);
		//获取带"/"的项目名，如：/uimcardprj
		if(pathName!=null){
			pathName = pathName.replace('////','/');
			pathName = pathName.replace('///','/');
			pathName = pathName.replace('//','/');
			pathName = pathName.replace('//','/');
		}
		var projectName = pathName.substring(0,pathName.substr(1).indexOf('/')+1);

		return (localhostPaht + projectName) + '/';
	}
	window.basePath = tool.basePath = getRootPath();
	window.webSocketPath = tool.webSocketPath = basePath.replace('http://','ws://').replace('https://','ws://');
	
	tool.websocket = {};
	var pageWinIndex = 0;
	
	tool.setting = {
		toPageSuccess : function(o ,actionHref, showinwindow){
			var pageDiv = $('<html></html>').append(o);
			if(pageDiv.find('#base_need_full_window').val() == 'true'){
				$('header').hide();
				$('.vd_navbar-right').hide();
				$('.vd_navbar-left').hide();
				$('.vd_head-section').hide();
				$('body').get(0).className = 'full-layout no-nav-left no-nav-right responsive clearfix nav-right-hide nav-left-hide';
				window['windowisfull'] = true;
				showinwindow = false;
			}else{
				if(window['windowisfull']){
					$('header').show();
					$('.vd_navbar-right').show();
					$('.vd_navbar-left').show();
					$('.vd_head-section').show();
					$('body').get(0).className = 'full-layout  nav-right-hide nav-right-start-hide  responsive ';
				}
				window['windowisfull'] = false;
			}
			$('.page-window').hide();
			$('.page-window').find('.page-content').find('.page-body').html('');
			if(showinwindow!=null && showinwindow == true){
				if(pageDiv.find('.plate-content').length>0){
					$('.page-window').find('.page-content').find('.page-title .title').text(pageDiv.find('.vd_panel-header').find('h1').text());
					var thisOpenWin = $('.page-window').find('.page-content').find('.page-body');
					thisOpenWin.html(pageDiv.find('.plate-content').removeClass('col-sm-12'));
					thisOpenWin.append(pageDiv.find('.script'));
					$('.page-window').show();
					$('.page-window').find('.page-content').find('.page-body').mCustomScrollbar({
						  mouseWheel:"auto",   
						  autoDraggerLength:true,  			
						  autoHideScrollbar:true,
						  advanced:{  
							updateOnBrowserResize:true,   
							updateOnContentResize:true   
						  }
					});
				}else{
					
				}
				
			}else{
				var thisOpenWin = $('#page-content');
				thisOpenWin.html(pageDiv.html());
			}
			
			calculateContentHeight();

		},
		initEntrustElementEvent : function(){}
	};
	tool.config = function(setting){
		$.extend(true, this.setting, setting);
		this.setting = setting;
	};
	var loadJSS = {};
	tool.loadJS = function(path,callback){
		if(loadJSS[path]){
			if(callback){
				callback();
			}
			return;
		}
		loadJSS[path] = true;
		$.getScript(basePath + '/' + path,function(){
			if(callback){
				callback();
			}
		});
	};
	tool.getElementLeft = function(element){
		var actualLeft = element.offsetLeft;
		var current = element.offsetParent;
		while (current !== null){
			actualLeft += current.offsetLeft;
			current = current.offsetParent;
		}
		return actualLeft;
	}
	tool.getElementTop = function(element){
		var actualTop = element.offsetTop;
		var current = element.offsetParent;
		while (current !== null){
			actualTop += current.offsetTop;
			current = current.offsetParent;
		}
		return actualTop;
	}
	tool.isImage = function(file){
		var ext = file.substring(file.lastIndexOf("."),file.length).toUpperCase();
		if(ext!=".BMP"&&ext!=".PNG"&&ext!=".GIF"&&ext!=".JPG"&&ext!=".JPEG"){
			return false;
		}
		return true;
	}
	tool.isVideo = function(file){
		var ext = file.substring(file.lastIndexOf("."),file.length).toUpperCase();
		if(ext!=".AIFF"&&ext!=".AVI"&&ext!=".MOV"&&ext!=".MPEG"&&ext!=".QT"&&ext!=".RAM"&&ext!=".VIV"&&ext!=".MP4"){
			return false;
		}
		return true;
	}
	tool.isAudio = function(file){
		var ext = file.substring(file.lastIndexOf("."),file.length).toUpperCase();
		if(ext!=".WMA"&&ext!=".MP3"&&ext!=".WAV"&&ext!=".MP1"&&ext!=".MP2"&&ext!=".MIDI"){
			return false;
		}
		return true;
	}
	tool.getImagePath = function(src){
		var srcs = [];
		if(src == null || src == ''){
			src = basePath + '/images/sys/no_img.png';
			srcs[srcs.length] = src;
		}else{
			if(src.indexOf(',')>0){
				var ss = src.split(',');
				$(ss).each(function(index , s){
					if(s != null || s != ''){
						if(s.indexOf('http') == 0){

							srcs[srcs.length] = s;
						}else{
							s = fileServiceUrl + s;
							srcs[srcs.length] = s;
						}
					}
				});
			}else if(src.indexOf('http') == 0){
				if(src.indexOf("/0")==src.length-2){
					src = src.replace("/0", "/46");
				}
				srcs[srcs.length] = src;
			}else{
				src = fileServiceUrl + src;
				srcs[srcs.length] = src;
			}
		}
		
		return srcs;
	}
	tool.showError = function(message){
		
		var alertPanel = $('<div class="alert-message"><div style="width: 300px;margin: 0px auto;" class=" alert alert-danger ">'+
                        '<button aria-hidden="true" data-dismiss="alert" class="close" type="button"><i class="icon-cross"></i></button>'+
                        '<i class="fa fa-exclamation-circle append-icon"></i>'+message+'</div></div>')
        $('body').append(alertPanel);
		
		alertPanel.animate({top: 50}, 500).animate({opacity: "hide"}, "slow");
		window.setTimeout(function(){
			alertPanel.remove();
		},1200);
		
	}
	tool.getActionPath = function(action){
		
		if(action == null || action == ''){
			return;
		}
		if(action.indexOf('http')>=0){
			return action;
		}
		if(action.indexOf('//') == 0){
			action = action.substring(1);
		}
		if(action.indexOf('//') == 0){
			action = action.substring(1);
		}
		if(action.indexOf('/')==0){
		}else{
			action = "/" + action;
		}
		return basePath +action;
	};
	//onpopstate
	//监听浏览器地址
	$(window).on('hashchange',function(){
		var action = '';
		var hash = ''+window.location.hash;
		if(hash != '' && hash.length>7 ){
			action = hash.replace("#action=", "");
			base.toPageByHash(action,function(){
			});
		}else{
		}
	});
	jQuery(document).ready(function($){
		$('html').on('click','.baseBatchWorkBtn',function(){
			var action = $(this).attr('toAction');
			var checks = $('.baseSelectOne').find('[type=checkbox]');
			var ids = '';
			var count = 0;
			for(var m=0;m<checks.length;m++){
				if(checks[m].checked){
					ids+=checks[m].value+",";
					count++;
				}
			}
			if(count<1){
				alert('请选择操作数据！');
				return;
			}else{
				var c = window.confirm('您确定要执行本次操作,您选中'+count+'条数据！');
				if(c){
					var data = tool.getButtonData(this);
					data.ids = ids;
					base.POST(action,data,'json',function(o){
						if(o.data.rtnCode == 0){
							alert(o.data.rtnMsg);
							window.location.reload();
						}else{
							alert(o.data.rtnMsg);
						}
					});
				}
			}
			
		});
		var uploadfileresults = [];
		$('html').on('click','.baseUploadFileBtn',function(){
			if($(this).attr('isfiles')){
				var putvaluesid = $(this).attr('putvaluesid');
				var putvalueselement = $('#'+putvaluesid);
				var values = putvalueselement.val();
				var thisuploadelement = $(this);
				
				if(values!=null&&values!=''){
					var urls = values.split(',');
					values = '';
					for(var i=0;i<urls.length;i++){
						var url = urls[i];
						if(url!=null && url!=''){
							values += url + ',';
						}
					}
				}
				initBaseUploadFile(function(files){
					for(var i=0;i<files.length;i++){
						var file = files[i];
						var path = file.path;
						values += path + ',';
						var fullpath = fileServiceUrl + path;
						if(base.isImage(path)){
							fullpath = fileServiceUrl + path;
						}else if(base.isVideo(path)){
							fullpath = basePath + '/images/ico/ico-video.jpg';
						}else if(base.isAudio(path)){
							fullpath = basePath + '/images/ico/ico-audio.jpg';
						}else{
							fullpath = basePath + '/images/ico/ico-file.jpg';
						}
						var img = $('<div class="one-image"><div putvaluesid="'+putvaluesid+'" class="remove">x</div><img src="'+fullpath +'" path="'+path+'" style="width: 80px;height: 80px;margin-right: 10px;"/></div>');
						thisuploadelement.before(img);
					}
					putvalueselement.val(values);
					
				});
			}else{
				var putvalueid = $(this).attr('putvalueid');
				var showimageid = $(this).attr('showimageid');
				initBaseUploadFile(function(files){
					var file = files[files.length-1];
					var path = file.path;
					$('#'+putvalueid).val(path);
					if(showimageid){
						if(base.isImage(path)){
							$('#'+showimageid).attr('src',fileServiceUrl + path);
						}else if(base.isVideo(path)){
							$('#'+showimageid).attr('src', basePath + '/images/ico/ico-video.jpg');
						}else if(base.isAudio(path)){
							$('#'+showimageid).attr('src', basePath + '/images/ico/ico-audio.jpg');
						}else{
							$('#'+showimageid).attr('src', basePath + '/images/ico/ico-file.jpg');
						}
					}
				});
			}
			
		});
		$('html').on('click','.baseHelpBtn',function(){
			//
			$('#baseHelpDiv').remove();
			var baseHelpDiv = $('<div id="baseHelpDiv" class="mask">');
			var baseRemoveHelpDiv = $('<i class="baseRemoveHelpDiv fa fa-remove" style="position: absolute;right: 20px;top: -49px;font-size: 25px;color: white;border: 4px solid white;width: 40px;border-radius: 40px;height: 40px;line-height: 32px !important;text-align: center;    z-index: 9999;"></i>');
			var panelContent = $(this).closest('.panel').find('.plate-content');
			panelContent.append(baseRemoveHelpDiv);
			var columns = panelContent.find('.onecolumn');
			$('.help-info-div').remove();
			$(columns).each(function(index ,column){
				column = $(column);
				if(column.is(':hidden')){
					return;
				}
				if(column.find('.elementparameter').length<1){
					return;
				}
				var input = $(column.find('.elementparameter')[column.find('.elementparameter').length-1]);
				var label = input.attr('label');
				var helpinfo = input.attr('helpinfo');
				var helplabeldiv = $('<div class="help-label-div full-div"></div>');
				helplabeldiv.css('z-index' , '10000');
				helplabeldiv.css('padding-top' , '4px');
				helplabeldiv.css('padding-bottom' , '3px');
				helplabeldiv.css('left' , '-10px');
				helplabeldiv.css('right' , '-10px');
				helplabeldiv.css('text-align' , 'center');
				helplabeldiv.css('border' , '1px dotted #1fae66');
				helplabeldiv.css('border-bottom' , '0px');
				helplabeldiv.css('bottom' , '-1px');
				
				helplabeldiv.text(label);
				column.find('.control-label').append(helplabeldiv);
				
				
				var helpinfodiv = $('<div class="help-info-div full-div"></div>');
				helpinfodiv.css('z-index' , '9999');
				helpinfodiv.css('left' , '-10px');
				helpinfodiv.css('right' , '-10px');
				helpinfodiv.css('padding-left' , '5px');
				helpinfodiv.css('padding-right' , '5px');
				helpinfodiv.css('border' , '1px dotted #1fae66');
				
				helpinfodiv.text(helpinfo);
				column.find('.input-group').append(helpinfodiv);
			});
			$('body').append(baseHelpDiv);
			baseHelpDiv.click(function(){
				baseHelpDiv.remove();
				$('.help-label-div').remove();
				$('.help-info-div').remove();
				$('.baseRemoveHelpDiv').remove();
			});
			baseRemoveHelpDiv.click(function(){
				baseHelpDiv.remove();
				$('.help-label-div').remove();
				$('.help-info-div').remove();
				$('.baseRemoveHelpDiv').remove();
			});
		});
		$('html').on('click','.baseSubmitBtn',function(){
			tool.baseSubmit(this);
		});
		$('html').on('click','.baseToActionBtn',function(){
			tool.baseToAction(this);
		});
		$('html').on('click','.toActionBtn',function(){
			tool.baseToAction(this);
		});
		$('html').on('click','.toBackBtn',function(){
			if($(this).closest('.page-window').length>0){
				$(this).closest('.page-window').hide();
			}else{
				tool.systemBack();
			}
		});
		$('html').on('click','.baseDeleteBtn',function(){
			tool.baseDelete(this);
		});
		$('html').on('click','.toExitBtn',function(){
			tool.baseExit(this);
		});
		//处理不支持placeholder
		tool.notSupportedPlaceholder();
	});
})();
(function(){
	'use strict';

	/**
	 * 根据地址栏改变值回到之前状态
	 */
	tool.toPageByHash = function(action,backFun ,showinwindow){
		showinwindow = showinwindow == null? false : showinwindow;
		tool.showMask();
		var actionHref = tool.getActionPath(action);
		if(actionHref.indexOf('needloadframework')<0){
			if(actionHref.indexOf('?')>0){
				actionHref += "&needloadframework=false";
			}else{
				actionHref += "?needloadframework=false";
			}
		}
		$.ajax({
			url : actionHref,
			data : {},
			type : 'post',
			dataType : 'html',
			async : true,      // 异步请求
			beforeSend : function() {},
			success : function(o){
				if(tool.setting.toPageSuccess!=null){
					tool.setting.toPageSuccess(o, actionHref, showinwindow);
				}else{
					$('#page-content').html(o);
				}
				initEntrustElementEvent();
				if(backFun!=null){
					backFun(o);
				}
				tool.hideMask();
			},
			complete : function(XMLHttpRequest, textStatus) {
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				tool.hideMask();
				if(XMLHttpRequest.status == 500){
					tool.toPageByHash(tool.error.page['500']);
				}else if(XMLHttpRequest.status == 404){
					tool.toPageByHash(tool.error.page['404']);
				}
			}
		});
	};
	/** 通用方法-震动效果*/
	tool.invalid = function($cue) {
		//按钮动画效果
		$cue.stop().delay(100).animate({'margin-left':-5}, 100).animate({'margin-left':5}, 100).animate({'margin-left':-4}, 100)
		.animate({'margin-left':4}, 100).animate({'margin-left':-3}, 100).animate({'margin-left':0}, 100);
	};
	/** form 表单提交 */
	tool.setAction = function(action, data, method, formId, target) {

		var actionHref = tool.getActionPath(action);
		//组合参数
		if(data){
			if(actionHref.indexOf('?')<0){actionHref = actionHref + '?1=1';}
			for(var n in data){
				actionHref += '&' + n + '=' + data[n];
			}
		}
		//隐藏导航
		$('.sys_nav').css('display','none');
		method = method || "post";
		formId = "#" + (formId || "mainForm");
		target = target || "_self";
		$(formId).attr("action", actionHref).attr("method", method).attr("target",target).submit();
	};
	/** get提交*/
	tool.getAction = function(action, data, showinwindow){
		if(action.indexOf('//') == 0){
			action = action.substring(1);
		}
		if (data){
			if(action.indexOf('?')<0){
				action = action + "?1=1";
			}
			for(var n in data){
				action += "&" + n + "=" +data[n];
			}
		}
		if(action.indexOf('/login/')<0){
			if(showinwindow == true){
				tool.toPageByHash(action, function(){
				}, true);
			}else{
				document.location.hash = "#action=" + action;
			}
		}else{
		}
	};

	/** url跳转*/
	tool.toUrl = function(action,data){
		var actionHref = tool.getActionPath(action);
		//组合参数
		if(data){
			if(actionHref.indexOf('?')<0){
				actionHref = actionHref + '?1=1';
			}
			for(var n in data){
				actionHref += '&' + n + '=' + data[n];
			}
		}
		window.location.href= actionHref;

	};
	
	/** ajax公共方法 */
	tool.POST = function(action, data, type, callback,async) {
		tool.showMask();
		var actionHref = tool.getActionPath(action);
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
			success : function(o) {
				// 可添加完成后处理
				tool.hideMask();
				if(type == 'html'){
					var thisdata = $('<div>'+o+'</div>')
					if($(thisdata).find('#system_no_access').val() == '0' && $('#system_no_access').val() != '0'){

						tool.toPageByHash(tool.error.page['toNoAccess']);
						return;
					}
					if($(thisdata).find('#system_no_user').val() == '0' && $('#system_no_user').val() != '0'){
						tool.toPageByHash(tool.error.page['toLogin']);
						return;
					}
				}
				
				if (callback && $.isFunction(callback)) {
					callback(o);
				}
			},
			complete : function(XMLHttpRequest, textStatus) {
			},
			error : function(XMLHttpRequest,textStatus,errorThrown) {
				tool.hideMask();
				if(textStatus == 'parsererror' && type != 'html'){
					tool.POST(action, dataObj, 'html', null, 'true');
				}else{
					if (callback && $.isFunction(callback)) {
						callback(XMLHttpRequest.responseText);
					}
				}
			}

		});
	};
	tool.getHrefData = function(){
		var href = window.location.href;
		var hash = ''+window.location.hash;
		var toAction = href;
		if(hash!=null && hash.indexOf('action')>=0){
			toAction = hash;
		}
		var data = {};
		if(toAction.indexOf('?')>0){
			var toActions = toAction.split('?');
			toAction = toActions[0] + '?1=1';
			var datastr = toActions[1];
			if(datastr.indexOf('&')>0){
				var datas = datastr.split('&');
				for(var i=0;i<datas.length;i++){
					if(datas[i].indexOf('=')>0){
						var n = datas[i].split('=')[0];
						var v = datas[i].split('=')[1];
						if(data[n] == null){
							data[n] = v;
						}
					}
				}
			}else{
				if(datastr.indexOf('=')>0){
					var n = datastr.split('=')[0];
					var v = datastr.split('=')[1];
					if(data[n] == null){
						data[n] = v;
					}
				}
			}
		}
		return data;
	};
	tool.getButtonData = function(btn){
		var data = {};
		if($(btn).length>0){
			var actionDataStr = $(btn).attr('actionData');
			if(actionDataStr!=null && actionDataStr!=''){
				if(actionDataStr.indexOf('&')!=-1){
					var datas = actionDataStr.split('&');
					for(var i=0;i<datas.length;i++){
						var d = datas[i];
						if(d.indexOf('=')!=-1&&d.split('=').length>1){
							data[d.split('=')[0]] = d.split('=')[1];
						}
					}
				}else{
					if(actionDataStr.indexOf('=')!=-1&&actionDataStr.split('=').length>1){
						var d = actionDataStr;
						data[actionDataStr.split('=')[0]] = actionDataStr.split('=')[1];
					}
				}
			}
			var forms = [];
			var form = $(btn).attr('form');
			if(form&&form!=''){
				if(form.indexOf('p:')==0){
					form = $(btn).closest(form.replace('p:',''));
				}else if(form == 'this' || form == 'thisform'){
					form = $(btn).closest('form');
				}else{
					form = $(form);
				}
				if(form!=null&&form.size()>0){
					forms[forms.length] = form;
					
				}
			}
			var usethisform = $(btn).attr('usethisform');
			if(usethisform!=null){
				var form = $(btn).closest('form');
				if(form!=null&&form.size()>0){
					forms[forms.length] = form;
					
				}
			}
			for(var i=0;i<forms.length;i++){
				var form = $(forms[i]);
				var formdatas = validationForm(form);
				if(!formdatas){
					return false;
				}
				for(var name in formdatas){
					var value = formdatas[name];
					if(value != null && data[name] == null){
						data[name] = value;
					}
				}
				var subform = form.find('.subform');
				if(subform.length>0){
					var subformones = subform.find('.subone');
					var subdatalist = [];
					for(var m=0;m<subformones.length;m++){
						var subformone = $(subformones[m]);
						var formdatas = validationForm(subformone ,true);
						if(!formdatas){
							return false;
						}
						for(var name in formdatas){
							var value = formdatas[name];
							if(value != null && data[name+'_'+m] == null){
								data[name+'_'+m] = value;
							}
						}
					}
					data.subdatalength = subformones.length;
				}
			};

		}
		return data;
	}
	tool.getRandomNumber = function(){
		var thisid = null;
		base.POST('/base/getRandomNumber.do',{},'json',function(o){
			thisid = o.data;
		},false);
		return thisid;
	}
	tool.fullFormData = function(form,data){
		for(var n in data){
			var value = data[n];
			
			var eles = $(form).find('[name='+n+']');
			if(eles.size()>0&&eles.get(0).type == 'radio'){
				if(value == true){
					value = '1';
				}
				if(value == false){
					value = '0';
				}
				for(var m=0;m<eles.length;m++){
					if(eles[m].value == value){
						eles[m].checked = 'checked';
					}
				}
			}else{
				$(form).find('[name='+n+']').val(value);
			}
		}
	}
	tool.getThisForm = function(element){
		var parent = $(element).parent();
		if(parent.size()>0){
			if(parent.get(0).tagName == 'FORM'){
				return parent;
			}else{
				return tool.getThisForm(parent);
			}
		}
		
	}
	tool.baseToAction = function(btn){
		var shouldconfirm = $(btn).attr('shouldconfirm');
		var showinwindow = $(btn).attr('showinwindow');
		showinwindow = showinwindow!=null&&showinwindow=='true'?true:showinwindow;
		if(shouldconfirm!=null && (shouldconfirm == 'true' || shouldconfirm == '1')){
			if(!window.confirm('确定执行本次操作？')){
				return;
			}
		}
		var toAction = $(btn).attr('toAction');
		var data = tool.getButtonData(btn);
		if(!data){
			return false;
		}
		if(toAction!=null&&toAction!=''){
			if(toAction.indexOf('?')>0){
				var toActions = toAction.split('?');
				toAction = toActions[0] + '?1=1';
				var datastr = toActions[1];
				if(datastr.indexOf('&')>0){
					var datas = datastr.split('&');
					for(var i=0;i<datas.length;i++){
						if(datas[i].indexOf('=')>0){
							var n = datas[i].split('=')[0];
							var v = datas[i].split('=')[1];
							if(data[n] == null){
								data[n] = v;
							}
						}
					}
				}else{
					if(datastr.indexOf('=')>0){
						var n = datastr.split('=')[0];
						var v = datastr.split('=')[1];
						if(data[n] == null){
							data[n] = v;
						}
					}
				}
			}
			if(toAction.indexOf("toExport")>=0){
				var tourl = basePath + toAction;
				data.needloadframework = false;
				tool.toUrl(tourl, data);
				return;
			}
			if(toAction.indexOf('http')!=-1){
				tool.toUrl(toAction, data);
			}else{
				tool.getAction(toAction, data, showinwindow);
			}
		}
	}

	tool.baseExit = function(btn){
		
		var toAction = $(btn).attr('toAction');
		if(toAction.indexOf('//') == 0){
			toAction = toAction.substring(1);
		}
		var data = {};
		tool.POST(toAction, data, 'json', function(o){
			var status = o.data;
			if (status && status.rtnCode == 0) {
				window.location.reload();
			}else{
				alert(status.rtnMsg);
			}
		});
	}

	tool.baseDelete = function(btn){
		var flag = window.confirm('确定要删除该条记录？');
		if (flag) {
			var action = $(btn).attr('toAction');
			if (action) {
				var data = {};
				base.POST(action, data, 'json', function(o) {
					var status = o.data;
					if (status && status.rtnCode == 0) {
						if(status.rtnMsg == null || status.rtnMsg == ''){
							alert('操作成功！');
						}else{
							alert(status.rtnMsg);
						}
						window.location.reload();
					} else {
						if(status.rtnMsg!=null && status.rtnMsg.indexOf('-1001')>0){
							var info = status.rtnMsg.replace('-1001','');
							info+="\n是否强制删除数据？";
							var flag = window.confirm(info);
							if(flag){
								var data = {};
								data.forciblyremove = true;
								base.POST(action, data, 'json', function(o) {
									var status = o.data;
									if (status && status.rtnCode == 0) {
										if(status.rtnMsg == null || status.rtnMsg == ''){
											alert('操作成功！');
										}else{
											alert(status.rtnMsg);
										}
										window.location.reload();
									} else {
										alert(status.rtnMsg);
									}
								});
							}
						}else{
							alert(status.rtnMsg);
						}
					}
				});
			}
		}
	}
	tool.baseSubmit = function(btn){
		var needalert = $(btn).attr('needalert');
		needalert = needalert!=null &&( needalert=="false"||needalert=="0")?false:true;
		var shouldconfirm = $(btn).attr('shouldconfirm');
		var successtodo = $(btn).attr('successtodo');
		var callback = $(btn).attr('callback');
		if(shouldconfirm!=null && (shouldconfirm == 'true' || shouldconfirm == '1')){
			if(!window.confirm('确定执行本次操作？')){
				return;
			}
		}
		var toAction = $(btn).attr('toAction');

		var data = tool.getButtonData(btn);
		if(!data){
			return false;
		}
		if(toAction!=null&&toAction!=''){
			if(toAction.indexOf('?')>0){
				var toActions = toAction.split('?');

				toAction = toActions[0] + '?1=1';
				var datastr = toActions[1];
				if(datastr.indexOf('&')>0){
					var datas = datastr.split('&');
					for(var i=0;i<datas.length;i++){
						if(datas[i].indexOf('=')>0){
							var n = datas[i].split('=')[0];
							var v = datas[i].split('=')[1];
							if(data[n] == null){
								data[n] = v;
							}
						}
					}
				}else{
					if(datastr.indexOf('=')>0){
						var n = datastr.split('=')[0];
						var v = datastr.split('=')[1];
						if(data[n] == null){
							data[n] = v;
						}
					}
				}
			}

			if(toAction.indexOf('http')!=-1){
				tool.toUrl(toAction, data);
			}else{
				tool.POST(toAction,data,'json',function(o){
					if(o.data.rtnCode==0){
						if(needalert){
							if(o.data.rtnMsg == null || o.data.rtnMsg == ''){
								alert('操作成功！');
							}else{
								alert(o.data.rtnMsg);
							}
						}
						if(successtodo!=null){
							//刷新
							if(successtodo=='1'){
								window.location.reload();
							}
							//回退
							else if(successtodo=='2'){
								window.history.back();
							}
						}
					}else{
						if(needalert){
							alert(o.data.rtnMsg);
						}
					}
					if(callback!=null && callback!=''){
						eval('('+callback+')');
					}
				});
			}
		};
	}
	tool.systemBack = function(){
		window.history.back();
	};

	//定制元素鼠标事件
	tool.gestureEvents = function(obj, type, func) {
		//滑动范围在5x5内则做点击处理，s是开始，e是结束
		var init = {
				x : 5,
				y : 5,
				sx : 0,
				sy : 0,
				ex : 0,
				ey : 0
		};
		var sTime = 0, eTime = 0;
		type = type.toLowerCase();
		if ("ontouchstart" in document.documentElement) {
			obj.addEventListener("touchstart", function() {
				sTime = new Date().getTime();
				init.sx = event.targetTouches[0].pageX;
				init.sy = event.targetTouches[0].pageY;
				init.ex = init.sx;
				init.ey = init.sy;
				if (type.indexOf("start") != -1)
					func();
			}, false);
			obj.addEventListener("touchmove", function() {
				event.preventDefault();//阻止触摸时浏览器的缩放、滚动条滚动
				init.ex = event.targetTouches[0].pageX;
				init.ey = event.targetTouches[0].pageY;
				if (type.indexOf("move") != -1)
					func();
			}, false);
			obj.addEventListener("touchend", function() {
				var changeX = init.sx - init.ex;
				var changeY = init.sy - init.ey;
				if (Math.abs(changeX) > Math.abs(changeY)
						&& Math.abs(changeY) > init.y) {
					//左右事件
					if (changeX > 0) {
						if (type.indexOf("left") != -1)
							func();
					} else {
						if (type.indexOf("right") != -1)
							func();
					}
				} else if (Math.abs(changeY) > Math.abs(changeX)
						&& Math.abs(changeX) > init.x) {
					//上下事件
					if (changeY > 0) {
						if (type.indexOf("top") != -1)
							func();
					} else {
						if (type.indexOf("down") != -1)
							func();
					}
				} else if (Math.abs(changeX) < init.x
						&& Math.abs(changeY) < init.y) {
					eTime = new Date().getTime();
					//点击事件，此处根据时间差细分下
					if ((eTime - sTime) > 300) {
						if (type.indexOf("long") != -1)
							func(); //长按
					} else {
						if (type.indexOf("click") != -1)
							func(); //当点击处理
					}
				}
				if (type.indexOf("end") != -1)
					func();
			}, false);
		} else {
			obj.addEventListener("mousedown", function() {
				sTime = new Date().getTime();
				init.sx = event.pageX;
				init.sy = event.pageY;
				init.ex = init.sx;
				init.ey = init.sy;
				if (type.indexOf("start") != -1)
					func();
			}, false);
			obj.addEventListener("mousemove", function() {
				event.preventDefault();//阻止触摸时浏览器的缩放、滚动条滚动
				init.ex = event.pageX;
				init.ey = event.pageY;
				if (type.indexOf("move") != -1)
					func();
			}, false);

			obj.addEventListener("mouseup", function() {
				var changeX = init.sx - init.ex;
				var changeY = init.sy - init.ey;
				if (Math.abs(changeX) > Math.abs(changeY)
						&& Math.abs(changeX) >= init.x) {
					//左右事件
					if (changeX > 0) {
						if (type.indexOf("left") != -1)
							func();
					} else {
						if (type.indexOf("right") != -1)
							func();
					}
				} else if (Math.abs(changeY) > Math.abs(changeX)
						&& Math.abs(changeY) >= init.y) {
					//上下事件
					if (changeY > 0) {
						if (type.indexOf("top") != -1)
							func();
					} else {
						if (type.indexOf("down") != -1)
							func();
					}
				} else if (Math.abs(changeX) < init.x
						&& Math.abs(changeY) < init.y) {
					eTime = new Date().getTime();
					//点击事件，此处根据时间差细分下
					if ((eTime - sTime) > 300) {
						if (type.indexOf("long") != -1)
							func(); //长按
					} else {
						if (type.indexOf("click") != -1)
							func(); //当点击处理
					}
				}
				if (type.indexOf("end") != -1)
					func();
			}, false);
		}
	};

	/**
	 * 处理不支持placeholder
	 */
	tool.notSupportedPlaceholder = function(){
		if(!'placeholder' in document.createElement('input')){   // 判断浏览器是否支持 placeholder
			$('[placeholder]').focus(function() {
				var input = $(this);
				if (input.val() == input.attr('placeholder')) {
					input.val('');
					input.removeClass('placeholder');
				}
			});
			$('[placeholder]').blur(function() {
				var input = $(this);
				if (input.val() == '' || input.val() == input.attr('placeholder')) {
					input.addClass('placeholder');
					input.val(input.attr('placeholder'));

				}
			});
			$('[placeholder]').blur();
		};

	};
	tool.initNotFindImg = function(){
		var userimgs = $('.system-user-img');
		for(var i=0;i<userimgs.length;i++){
			var img = userimgs[i];

			if(img.tagName == 'IMG'){
				img.img = img;
				img.onerror = function(){};
				img.onerror = function(){
					this.img.src = basePath + "/images/sys/no_img.png";
				};
			}

			if(img.tagName == 'DIV'){
				var imgUrl = $(img).attr('src');
				var img1 = new Image();
				img1.src = imgUrl;
				img1.img = img;
				img1.onerror = function(){
					$(this.img).css('background-image','url("'+basePath + "/images/sys/no_img.png"+'")');
				};

				img1.onload = function(){
					$(this.img).css('background-image','url("'+this.src+'")');
				};
			}

		}
	};
	tool.format = function(format){ 
		var o = { 
				"M+" : this.getMonth()+1, //month 
				"d+" : this.getDate(), //day 
				"h+" : this.getHours(), //hour 
				"m+" : this.getMinutes(), //minute 
				"s+" : this.getSeconds(), //second 
				"q+" : Math.floor((this.getMonth()+3)/3), //quarter 
				"S" : this.getMilliseconds() //millisecond 
		};

		if(/(y+)/.test(format)) { 
			format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
		} 

		for(var k in o) { 
			if(new RegExp("("+ k +")").test(format)) { 
				format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length)); 
			} 
		} 
		return format; 
	};

	tool.initMap = function(){
		var map = new BMap.Map("container");//在指定的容器内创建地图实例

		$('.store').each(function() {
			//目的地经纬度
			var stoerLogOrLat = $(this).find('#longitude').val();

			var stoerLogOrLatArray = stoerLogOrLat.split(',');
			var stoerlog = parseFloat(stoerLogOrLatArray[0]);
			var stoerlat = parseFloat(stoerLogOrLatArray[1]);
			//用户经纬度
			var customerPoint = new BMap.Point(118.764756, 31.980833);
			var stoerPoint = new BMap.Point(stoerlat,stoerlog);
			//返回距离 米
			var aaa = map.getDistance(customerPoint, stoerPoint);
			//转成公里
			var distance = Math.round(aaa)/1000;
			$(this).find('.distance strong').text(distance);
			$(this).find('#sortAttr').attr('distance', distance);
		});
	}
	window.sortableindex = 1;
	tool.tree = function(obj, set, datas){
		var setting= {
			id:'id',
			pid:'pid',
			name:'name',
			btnhtml:'btnhtml',
			haveCheckbox: false,
			doNotCheckParent: false,
			needsortable: false,
			checkboxClassName: '',
			tablename: ''
		};
		$.extend(true, setting, set);
		var addClick = function(){
			obj.find('li:has(ul)').addClass('parent_li').find(' > span').attr('title', '');
			obj.find('li.parent_li > span > i').on('click',function(e) {
				var children = $(this).parent().parent('li.parent_li').find(' > ul > li');
				if(children.is(":visible")) {
					if($(this).parent().parent().attr('leveindex') == 1){
						$(this).parent().attr('title', '').find(' > i').addClass('glyphicon-folder-close').removeClass('glyphicon-folder-open');
					}else{
						$(this).parent().attr('title', '').find(' > i').addClass('glyphicon-plus').removeClass('glyphicon-minus');
					}
					children.hide('fast',function(){
						$(this).parent().parent().css('overflow','inherit');
					});
				} else {
					if($(this).parent().parent().attr('leveindex') == 1){
						$(this).parent().attr('title', '').find(' > i').addClass('glyphicon-folder-open').removeClass('glyphicon-folder-close');
					}else{
						$(this).parent().attr('title', '').find(' > i').addClass('glyphicon-minus').removeClass('glyphicon-plus');
					}
					children.show('fast',function(){
						$(this).parent().parent().find('li').css('overflow','inherit');
					});
				}
				e.stopPropagation();
			});
			obj.find('.checkbox').on('click',function(e) {
				var isSelected = $(this).get(0).checked;
				//选中
				if(isSelected){
					if(setting.doNotCheckParent){
						return;
					}
					var children = $(this).parent().parent('li.parent_li').find('.checkbox');
					for(var m=0;m<children.length;m++){
						children[m].checked = true;
					}
					//children.attr('checked',true);
					var checkParent = function(li){
						if(li.attr('pid')!=null&&li.attr('pid')!=''){
							li = $('.tree'+li.attr('pid'));
							//$(li.find('.checkbox').get(0)).attr('checked',true);
							li.find('.checkbox').get(0).checked = true;
							checkParent(li);
						}
					};
					checkParent($(this).parent().parent());
				}else{
					if(setting.doNotCheckParent){
						return;
					}
					var children = $(this).parent().parent('li.parent_li').find('.checkbox');
					for(var m=0;m<children.length;m++){
						children[m].checked = false;
					}
					children.attr('checked',false);
				}
			});
		};
		var isParent = function(d){
			if(d[setting.pid] == null || d[setting.pid].length == 0){
				return true;
			}
			for(var i=0;i<datas.length;i++){
				var data = datas[i];
				if(data[setting.id] == d[setting.pid]){
					return false;
				}
			}
			return true;
		}
		var parentUL = $('<ul class=""></ul>');
		obj.append(parentUL);
		if(setting.needsortable){
			sortableindex++;
			parentUL.attr('tablename',setting.tablename);
			parentUL.addClass('needsortable-list');
			parentUL.addClass('needsortable-list-'+sortableindex);
			parentUL.attr('needsortable-index',sortableindex);
		}
		var buildNodes = function(){
			for(var i=0;i<datas.length;i++){
				var data = datas[i];
				if(isParent(data)){
					addNode(parentUL,i,1);
				}
			}
		};
		var addNode = function(nodeP,index,leveindex){
			var data = datas[index];
			var node = createNode(index,leveindex);
			if(setting.needsortable){
				var needsortableindex = nodeP.attr('needsortable-index');
				node.addClass('needsortable-one-'+needsortableindex);
				node.attr('thisid', data[setting.id]);
			}
			$(nodeP).append(node);
			if(haveSubNode(index)){
				var p = $('<ul></ul>');
				if(setting.needsortable){
					sortableindex++;
					p.addClass('needsortable-list');
					p.attr('tablename',setting.tablename);
					p.attr('needsortable-index',sortableindex);
					p.addClass('needsortable-list-'+sortableindex);
				}
				node.append(p);
				for(var i=0;i<datas.length;i++){
					if(datas[i][setting.pid] == data[setting.id]){
						var leveindex_ = leveindex + 1;
						addNode(p,i,leveindex_);
					}
				}
			}
		};
		var createNode = function(index,leveindex){
			var data = datas[index];
			var node;
			var btnhtml = data[setting.btnhtml];
			if(data[setting.pid] == null || data[setting.pid].length == 0){
				node = $('<li><span><i class="glyphicon glyphicon-folder-open"></i>'
						+'<input type="checkbox" class="checkbox"/>'+data[setting.name]+'<a class="tree_btn" href="javascript:;"></a></span></li>');

			}else{
				if(haveSubNode(index)){
					node = $('<li><span><i class="glyphicon glyphicon-minus"></i>'
							+'<input type="checkbox" class="checkbox"/>'+data[setting.name]+'<a class="tree_btn" href="javascript:;"></a></span></li>');
				}else{
					node = $('<li><span><i class="glyphicon glyphicon-leaf"></i>'
							+'<input type="checkbox" class="checkbox"/>'+data[setting.name]+'<a class="tree_btn" href="javascript:;"></a></span></li>');

				}
			}
			if(!setting.haveCheckbox){
				node.find('.checkbox').remove();
			}else{
				node.find('.checkbox').css('display','inherit').css('position','absolute').css('min-height','14px').css('margin-top','5px').css('margin-left','-15px');
				node.find('.checkbox').addClass(setting.checkboxClassName);
				node.find('.checkbox').val(data[setting.id]);
				node.find('i').css('margin-right','20px');

				node.find('.checkbox').attr('checked',data.checked);
			}
			node.attr('leveindex',leveindex);
			node.attr('pid',data[setting.pid]);
			node.addClass('tree' + data[setting.id]);
			node.find('.tree_btn').append($(btnhtml));
			return node;

		};
		var haveSubNode = function(index){
			var data = datas[index];
			for(var i=0;i<datas.length;i++){
				if(datas[i][setting.pid] == data[setting.id]){
					return true;
				}
			}
			return false;
		};
		buildNodes();
		addClick();
	};
	window.base = tool;
})();

Date.prototype.format = function(format){
	var o = {
		"M+" : (this.getMonth()+1)<10?'0'+(this.getMonth()+1):(this.getMonth()+1), //month
		"d+" : this.getDate()<10?'0'+this.getDate():this.getDate(),    //day
		"h+" : this.getHours()<10?'0'+this.getHours():this.getHours(),   //hour
		"H+" : this.getHours()<10?'0'+this.getHours():this.getHours(),   //hour
		"m+" : this.getMinutes()<10?'0'+this.getMinutes():this.getMinutes(), //minute
		"s+" : this.getSeconds()<10?'0'+this.getSeconds():this.getSeconds(), //second
		"q+" : Math.floor((this.getMonth()+3)/3),  //quarter
		"S" : this.getMilliseconds()<10?'0'+this.getMilliseconds():this.getMilliseconds() //millisecond
	}
	if(/(y+)/.test(format)){
		format=format.replace(RegExp.$1,(this.getFullYear()+"").substr(4 - RegExp.$1.length));
	}
	for(var k in o){
		if(new RegExp("("+ k +")").test(format)){
			format = format.replace(RegExp.$1,RegExp.$1.length==1 ? o[k] :("00"+ o[k]).substr((""+ o[k]).length));
		}
	}
	return format;
}
function initEntrustElementEvent(){

	//初始化全局元素渲染
	initPageElement();
	//委托全局验证
	entrustElementValidation();
	

}
function initDateTime(datetime){
	var value = datetime;
	value = value.replace(/-/g, '');
	value = value.replace(/:/g, '');
	value = value.replace(/ /g, '');
	value = value.replace(/\//g, '');
	if(value != null && value != '' && value.length>=12){
		value = value.substring(0,4)+'/'+value.substring(4,6)+'/'+value.substring(6,8)+' '+value.substring(8,10)+':'+value.substring(10,12);
	}
	return value;
}
var alleditors = {};

function colorPickerEvent(thiscolor){
	thiscolor.ColorPicker({
		element: thiscolor,
		color: '#ff00ff',
		onSubmit: function(hsb, hex, rgb, el) {
			$(thiscolor).val('#' + hex);
			$(thiscolor).ColorPickerHide();
		},
		onBeforeShow: function () {
			$(thiscolor).ColorPickerSetColor(this.value);
		},
		onChange: function (hsb, hex, rgb) {
			$(thiscolor).val('#' + hex);
			$(thiscolor).css({'color' : '#' + hex});
		}
	}).bind('keyup', function(){
		$(this).ColorPickerSetColor(this.value);
	}).siblings().click(function(e){ 
		$(this).siblings().click();
	});	
}
/**
 * 委托全局验证
 * @returns {Boolean}
 */
function entrustElementValidation(){
	var elementparameters = $('.elementparameter');
	for(var i=0;i<elementparameters.length;i++){
		var element = $(elementparameters[i]);
		element.change(function(){
			validationElement(this);
		});
		element.keyup(function(){
			validationElement(this);
		});
	}
	
	return true;
}
/**
 * 验证表单
 * @param form
 * @returns {Boolean}
 */
function validationForm(form ,canvalidationsub){
	form = $(form);
	var data = {};
	var elementparameters = form.find('.elementparameter');
	for(var i=0;i<elementparameters.length;i++){
		var element = $(elementparameters[i]);
		if(!canvalidationsub&&element.closest('.subform').length>0){
			continue;
		}
		var tablename = element.attr('tablename');
		
		var result = validationElement(element);
		if(!result){
			return false;
		}else{
			data[result.name] = result.value;
			if(tablename!=null){
				data[tablename+result.name] = result.value;
			}
		}
	}
	var parameters = form.find('.parameter');
	for(var i=0;i<parameters.length;i++){
		var element = $(parameters[i]);
		if(!canvalidationsub&&element.closest('.subform').length>0){
			continue;
		}
		var tablename = element.attr('tablename');
		var result = validationElement(element);
		if(!result){
			return false;
		}else{
			data[result.name] = result.value;
			if(tablename!=null){
				data[tablename+result.name] = result.value;
			}
		}
	}
	var hiddenparameters = form.find('.hiddenparameter');
	for(var i=0;i<hiddenparameters.length;i++){
		var hiddenparameter = $(hiddenparameters[i]);
		var name = hiddenparameter.attr('name');
		var value = hiddenparameter.val();
		data[name] = value;
		
	}
	return data;
}
/**
 * 验证元素
 * @param element
 * @returns {Boolean}
 */
function validationElement(element){
	element = $(element);
	var infomessage = element.attr('data-original-title');
	var help = element.parent().find('.help-inline');
	if(help.length<1){
		help = element.parent().parent().find('.help-inline');
	}
	//必填
	var required = $(element).attr('required');
	var readonly = $(element).attr('readonly');
	var ismailbox = $(element).attr('ismailbox');
	var minlength = $(element).attr('minlength');
	var maxlength = $(element).attr('maxlength');
	var isnumber = $(element).attr('isnumber');
	var label = $(element).attr('label');
	var thisvalue =  $(element).val();
	var inputtype = $(element).attr('inputtype');
	inputtype = inputtype == null || inputtype == ''?'text':inputtype;
	if(inputtype == ('number') && !element.is(":hidden")){
		isnumber = true;
	}
	if(inputtype == ('switch')){
		if($(element).get(0).checked){
			thisvalue = '1';
		}else{
			thisvalue = '0';
		}
	}else if($(element).attr('type')!=null&&$(element).attr('type')=='radio'){
		var name = $(element).attr('name');
		thisvalue = $("input[name='"+name+"']:checked").val();
	}else if($(element).attr('type')!=null&&$(element).attr('type')=='checkbox'){
		thisvalue = '';
		var name = $(element).attr('name');
		$("input[name='"+name+"']:checked").each(function() {
			thisvalue += $(this).val()+',';
        });
		if(thisvalue.length>0){
			thisvalue = thisvalue.substring(0, thisvalue.length-1);
		}
	}
	if(required=='required' && !readonly && !element.is(":hidden")){
		if(thisvalue == null || thisvalue=='' ){
			setElementErrorInfo(element, help, '此为必填项，请仔细填写！');
			return false;
		}else{
			setElementSuccessInfo(element, help, '正确！');
		}
	}else{
		setElementSuccessInfo(element, help, '正确！');
	}
	if(thisvalue!=null&&thisvalue.length<minlength && !element.is(":hidden")){
		setElementErrorInfo(element, help, '字符数不能小于'+minlength+'！');
		return false;
	}
	if(thisvalue!=null&&thisvalue.length>maxlength && !element.is(":hidden")){
		setElementErrorInfo(element, help, '字符数不能大于'+maxlength+'！');
		return false;
	}
	if(ismailbox&&thisvalue!='' && !element.is(":hidden")){
		var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if (filter.test(thisvalue)) {
			setElementSuccessInfo(element, help, '正确！');
		}else {
			setElementErrorInfo(element, help, '请输入正确邮箱格式！');
			return false;
		}
	}
	if(isnumber&&thisvalue!='' && !element.is(":hidden")){
		var filter  = /^[-]?[0-9]+\.?[0-9]*$/;
		if (filter.test(thisvalue)) {
			setElementSuccessInfo(element, help, '正确！');
		}else {
			setElementErrorInfo(element, help, '请输入数字！');
			return false;
		}
		var isinteger = $(element).attr('isinteger');
		if(isinteger){
			var filter  = /^-?[0-9]*$/;
			if (filter.test(thisvalue)) {
				setElementSuccessInfo(element, help, '正确！');
			}else {
				setElementErrorInfo(element, help, '请输入整数数字！');
				return false;
			}
		}
		var minnumber = $(element).attr('minnumber');
		var maxnumber = $(element).attr('maxnumber');
		if(minnumber!=null){
			minnumber = Number(minnumber);
			if(minnumber>thisvalue){
				setElementErrorInfo(element, help, '请输入数字不能小于'+minnumber+'！');
				return false;
			}else{
				setElementSuccessInfo(element, help, '正确！');
			}
		}
		if(maxnumber!=null){
			maxnumber = Number(maxnumber);
			if(maxnumber<thisvalue){
				setElementErrorInfo(element, help, '请输入数字不能大于'+maxnumber+'！');
				return false;
			}else{
				setElementSuccessInfo(element, help, '正确！');
			}
		}
	}
	var name = $(element).attr('name');
	if(name == null){
		name = $(element).attr('parametername');
	}
	return {name:name,value:thisvalue};
}

function setElementErrorInfo(element,help,message){
	base.showError(message, element);
	$(element).removeClass('vd_bd-green');
	$(element).addClass('vd_bd-red');
	help.removeClass('vd_red fa fa-check vd_green fa-times');
	help.html(message);
	help.addClass('fa fa-times vd_red ');
	if(!canLook(element)){
		$("body").animate({scrollTop: base.getElementTop($(element)[0]) - 100}, 200);
	}
	//base.invalid($(element));
}
function canLook(item){
	return !($(window).scrollTop()>($(item).offset().top+$(item).outerHeight()))||(($(window).scrollTop()+$(window).height())<$(item).offset().top)
}
function setElementSuccessInfo(element,help,message){
	
	$(element).removeClass('vd_bd-red');
	$(element).addClass('vd_bd-green');
	help.removeClass('vd_red fa fa-check vd_green fa-times');
	help.html(message);
	help.addClass('fa fa-check vd_green ');
}