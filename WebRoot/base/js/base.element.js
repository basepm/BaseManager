/**
 * 页面元素初始化
 */

(function() {
	'use strict';
	if (window['base.element']) {

		initPageElement();
		return;
	}
	window['base.element'] = true;
	if (typeof jQuery === 'undefined') {
		throw new Error('需要jQuery');
	}

	window.initPageElement = function() {
		initElementGroup();
		initElementEvent();
		initElementConfig();;
		initAllImg();
	}
	function initAllImg(){
		var imgs = $('img');
		$(imgs).each(function(index, img){
			img = $(img);
			if(img.attr('baseloadsuccess') == 'true'){
				return;
			}
			img.attr('baseloadsuccess' ,'true');
			var src = img.attr('src');
			if(src == null || src == ''){
				img.attr('src' ,basePath + '/images/sys/no_img.png');
			}else{
				img.attr('src' ,basePath + '/images/sys/onload.gif');
				var image = new Image();
				image = $(image);
				image.on('load',function(){
					img.attr('src', src);
				});
				image.on('error',function(){
					img.attr('src' ,basePath + '/images/sys/404.jpg');
//					img.attr('src' ,basePath + '/images/sys/no_img.png');
				});
				image.attr('src', src);
			}
		});
	}
	function initElementConfig(){
		// 获取所有需要组合的元素
		var elements = $('.needinitelementconfig').removeClass('needinitelementconfig');
		elements.each(function(index, element) {
			element = $(element);
			var config = element.attr('config');
			if(config == null || config == ''){
				return;
			}
			var configs = JSON.parse(config);
			$(configs).each(function(index, config) {
				var type = config.type;
				if(type == 'change'){
					var value = config.value;
					var hideelementids = config.hideelementids;
					var showelementids = config.showelementids;
					var hideforms = config.hideforms;
					var showforms = config.showforms;
					element.change(function(){
						var thisvalue = $(this).val();
						if(thisvalue == value){
							if(hideelementids!=null && hideelementids!=''){
								var ids = hideelementids.split(',');
								$(ids).each(function(index, id) {
									$('[elementid='+id+']').hide();
								});
							}
							if(showelementids!=null && showelementids!=''){
								var ids = showelementids.split(',');
								$(ids).each(function(index, id) {
									$('[elementid='+id+']').show();
								});
							}
							if(hideforms!=null && hideforms!=''){
								var ids = hideforms.split(',');
								$(ids).each(function(index, id) {
									$(''+id+'').hide();
								});
							}
							if(showforms!=null && showforms!=''){
								var ids = showforms.split(',');
								$(ids).each(function(index, id) {
									$(''+id+'').show();
								});
							}
						}
					});
				}
				
			});
			element.change();
		});
	}
	function initElementGroup() {
		// 获取所有需要组合的元素
		var elements = $('.needinitelement').removeClass('needinitelement');
		elements.each(function(index, element) {
			element = $(element);
			element.addClass('form-control');
			var value = element.attr('value');
			var display = element.attr('display');
			display = display == null || display == 'true' || display == '1'?true:false;
			var canupdate = element.attr('canupdate');
			canupdate = canupdate == null || canupdate == 'true' || canupdate == '1'?true:false;
			var cannull = element.attr('cannull');
			cannull = cannull == null || cannull == 'true' || cannull == '1'?true:false;
			var inputtype = element.attr('inputtype');
			var search = element.attr('search');
			search = search != null&&search=='true' || search == '1'?true:false;
			var needgroup = element.attr('needgroup');
			needgroup = needgroup != null&&needgroup=='false' || needgroup == '0'?false:true;
			var design = element.attr('design');
			design = design != null&&design=='true' || design == '1'?true:false;
			// 选项
			var baseoption = element.next('select.baseoption');
			// 标签
			var label = element.attr('label');
			// 标签长度
			var labelsize = element.attr('labelsize');
			labelsize = labelsize == null || labelsize == '' ? 3
					: labelsize;
			labelsize = labelsize > 12 ? 12 : labelsize;
			var inputsize = 12 - labelsize;
			// 行数
			var linesize = element.attr('linesize');
			linesize = linesize == null || linesize == '' ? 1
					: linesize;
			// 帮助行数
			var helpline = element.attr('helpline');
			helpline = helpline == null || helpline == '' ? 1
					: helpline;
			// 提示信息
			var info = element.attr('info');
			info = info == null || info == '' ? label : info;
			// 需要help提示
			var needhelp = element.attr('needhelp');
			
			var inputgrouptype = element.attr('inputgrouptype');
			//两行显示无提示
			if(inputgrouptype == '1'){
				needhelp = "0";
				linesize = 2;
				helpline = 2;
			}
			//两行显示有提示
			else if(inputgrouptype == '2'){
				needhelp = "1";
				linesize = 2;
				helpline = 2;
			}
			//一行显示无提示
			else if(inputgrouptype == '3'){
				needhelp = "0";
				linesize = 1;
				helpline = 2;
			}
			//一行显示有提示
			else if(inputgrouptype == '4'){
				needhelp = "1";
				linesize = 1;
				helpline = 2;
			}
			// 列尺寸
			var columnsize = element.attr('columnsize');
			columnsize = columnsize == null || columnsize == '' ? 12
					: columnsize;
			columnsize = columnsize > 12 ? 12 : columnsize;
			// 元素组合组
			var formgeoup = $('<div class="form-group " ></div>');
			// 字段容器
			var columndiv = $('<div class=" onecolumn mgbt-lg-5 col-sm-' + columnsize
					+ '"></div>');
			if(needgroup){
				columndiv = $('<div class=" onecolumn mgbt-lg-5 col-sm-' + columnsize
						+ '"></div>');
				element.before(columndiv);
			}else{
				columndiv = element.parent();
			}
			if(!display){
				columndiv.hide();
				columndiv.removeClass('col-sm-'+columnsize);
				columndiv.addClass('col-sm-3');
				columndiv.addClass('needhidden');
			}
			var elementid = element.attr('elementid');
			if(elementid!=null&&elementid!=''){
				columndiv.attr('elementid',elementid);
			}
			columndiv.attr('cannull',cannull);
			columndiv.attr('canupdate',canupdate);
			columndiv.attr('display',display);
//			formgeoup.append(columndiv);
			// 输入框组合
			var inputgroup = $('<div class="controls input-group input-group-sm "></div>')
			// 标签
			var label = $('<label class="control-label" style="padding-top: 4px;padding-bottom: 3px;position: inherit;">' + label
					+ '</label>');
			// 帮助信息
			var help = $('<span class="help-inline">' + info + '</span>');
			
			element.attr('placeholder', info);
			if(needgroup){
				element.appendTo(inputgroup)
				element.before(baseoption)
				if (needhelp == '1' || needhelp == 'true') {
					inputgroup.append(help);
				}
				columndiv.append(label);
			}
			
			//必须的
			var required = false;
			var readonly = false;
			if(cannull == null||cannull == 'true' || cannull == '1'){
				required = false;
				element.attr('required', required);
			}else{
				required = true;
				element.attr('required', "required");
			}
			if(canupdate){
				readonly = false;
			}else{
				readonly = true;
				element.attr('readonly', "readonly");
			}
			//是必填项
			if(required){
				if(!readonly){
					label.append("<span class=\"vd_red\">*</span>");
				}
			}
			if(needgroup){
				columndiv.append(inputgroup);
				if (linesize == 1) {
					columndiv.find('label').addClass('col-sm-' + labelsize);
					columndiv.find('.controls').addClass(
							'col-sm-' + inputsize);
				} else if (linesize == 2) {
					inputgroup.addClass('width-100');
				}

			}
			
			if (needhelp&&helpline == 1) {
				element.addClass('width-50');
			} else if (!needhelp||helpline == 2) {
				element.addClass('width-100');
				help.css('display','table-footer-group');
			}

			var options = baseoption.find('option');
			options.each(function(index, one) {
				one = $(one);
				if (one.text() == null || one.text() == '') {
					one.text(one.attr('text'));
				}
			});
			if (inputtype == null || inputtype == '') {

			} else if (inputtype == "input") {

			} else if (inputtype == "switch") {
				if(value!=null&&(value=='true'||value=='1')){
					element.attr('checked', 'checked');
				}
				element.attr('isswitch', true);
				element.attr('data-size', 'mini');
				element.attr('data-wrapper-class', 'yellow');
				element.attr('type', 'checkbox');
			} else if (inputtype == "select" || inputtype == "selectchild") {
				if (element.attr('ischeckbox')
						&& element.attr('ischeckbox') == 'true') {

				} else {
					element.append("<option value=''>请选择</option>");
					options.each(function(index, one) {
						one = $(one);
						element.append(one);
					});
				}
			} else if (!search&&inputtype == "textarea") {
				element.css('height', '160px');

			} else if (inputtype == "editor") {
				inputgroup.removeClass('input-group-sm');
				element.removeClass('form-control');
				element.css('height', '370px');
				element.css('width', '100%');

			}else if (inputtype == "file") {
				
			}
			if(inputtype != "textarea" && inputtype != "editor"){

				element.val(value);
			}
			if(!canupdate){
				element.css('background-color','white');
				element.attr('disabled', true);
				/*var showvalue = element.attr('showvalue');
				
				if(inputtype == 'text'){
					
				}else if(inputtype == 'select'){
					showvalue = showvalue== null || showvalue==''||showvalue=='null'?'空':showvalue;
					var showInput = $('<input class="form-control " readonly="readonly" />');
					showInput.css('background-color','white')
					showInput.val(showvalue);
					element.before(showInput);
					element.hide();
				}else{
					showvalue = showvalue== null || showvalue==''||showvalue=='null'?'空':showvalue;
					var showDiv = $('<div class="form-control " style="height: auto;overflow: hidden;"></div>');
					showDiv.html(showvalue);
					element.before(showDiv);
					element.hide();
				}*/
			}
		});
	}
	function s(){
		$('.emotion').qqFace({
			id : 'facebox', //表情盒子的ID
			assign:'saytext', //给那个控件赋值
			path:'face/'	//表情存放的路径
		});
		$(".sub_btn").click(function(){
			var str = $("#saytext").val();
			$("#show").html(replace_em(str));
		});
		//查看结果
		function replace_em(str){
			str = str.replace(/\</g,'&lt;');
			str = str.replace(/\>/g,'&gt;');
			str = str.replace(/\n/g,'<br/>');
			str = str.replace(/\[em_([0-9]*)\]/g,'<img src="face/$1.gif" border="0" />');
			return str;
		}
	}

	function editorEvent() {
		var elements = $('.inputtype-editor').removeClass('inputtype-editor');
		if(elements == null || elements.length<1){
			return;
		}
		tool.loadJS('/ueditor/ueditor.config.js', function(){
			tool.loadJS('/ueditor/ueditor.all.min.js', function(){
				tool.loadJS('/ueditor/lang/zh-cn/zh-cn.js', function(){
					$(elements).each(function(index ,element){
						element = $(element);
						
						var design = element.attr('design');
						design = design == null || design == 'false' || design == '0'?false:true;
						var canupdate = element.attr('canupdate');
						canupdate = canupdate == null || canupdate == 'true' || canupdate == '1'?true:false;
						if(!canupdate){
							return;
						}
						if(design){
							return;
						}
						var id = element.attr('id');
						if(id == null || id == ''){
							id = new Date().getTime()+''+Math.ceil(Math.random()*10000);
						}
						element.attr('id',id);
						if (alleditors[id] != null) {
							alleditors[id].destroy();
						}
						// 实例化编辑器
						// 建议使用工厂方法getEditor创建和引用编辑器实例，如果在某个闭包下引用该编辑器，直接调用UE.getEditor('editor')就能拿到相关的实例
						var ue = UE.getEditor(element.attr('id'), {
							zIndex : '0',
							initialFrameWidth : '100%',
							initialFrameHeight : element.height()
						});
						ue.ready(function() {
							var fullscreens = $('.edui-for-fullscreen');
							$(fullscreens).each(function(index ,fullscreen){
								var fullscreen = $(fullscreen);
								fullscreen.click(function() {
									if ($(this).parent().parent().parent()
											.parent().parent().width() >= ($(
											window).width() - 10)) {
										$('#header').addClass('z-index-0');
									} else {
										$('#header').removeClass('z-index-0');
									}
								});
							});
						});
						ue.addListener("contentChange", function() {
							element.html(this.getContent())
						});
						alleditors[id] = ue;
						
					})
				});
			});
			
		});
		
	}
	function fileEvent() {
		var elements = $('.inputtype-file').removeClass('inputtype-file');
		elements.each(function(index, element) {
			element = $(element);
			var design = element.attr('design');
			design = design != null&&design=='true'?true:false;
			var search = element.attr('search');
			search = search != null&&search=='true'?true:false;
			var canupdate = element.attr('canupdate');
			canupdate = canupdate != null &&( canupdate == 'true' || canupdate == '1')?true:false;
			if(search){
				return;
			}
			var length = element.attr('length');
			length = length == null || length == ''?1:length;
			element.addClass('width-100');
			var group = $('<div class="input-group input-group-sm"></div>');
			if (element.parent().hasClass('input-group')) {
				group = element.parent();
			} else {
				element = element.clone(true);
				group = $('<div class="input-group input-group-sm"></div>');
				element.before(group);
				element.appendTo(group);
			}
			var btn = $('<span class="input-group-addon vd_btn vd_black "><i class="fa fa-upload"></i></span></div>"');
			if(canupdate){
				element.after(btn);
			}
			var filetype = element.attr('filetype');
			filetype = filetype==null||filetype==''?'file':filetype;
			
			if(filetype=='file'){
				element.parent().find('.input-group-addon').click(function() {
					initBaseUploadFile(function(files) {
						var path = files[files.length - 1].path;
						element.val(path);
						element.change();
					});
				});
			}else if(filetype=='files'){
				element.parent().find('.input-group-addon').click(function() {
					initBaseUploadFile(function(files) {
						var path = files[files.length - 1].path;
						var path = files[files.length - 1].path;
						var value = element.val();
						if(length == 1){
							value = path;
							imageDiv.html('');
						}else{
							if(value!=null&&value!=''){
								value = value + ',' + path;
							}else{
								value = path;
							}
						}
						element.val(value);
						element.change();
					});
				});
			}else if(filetype=='video'){
				element.parent().find('.input-group-addon').click(function() {
					initBaseUploadFile(function(files) {
						var path = files[files.length - 1].path;
						var filetimelong = files[files.length - 1].filetimelong;
						if (path.indexOf('.mp4') > 1
								|| path.indexOf('.MP4') > 1) {
							element.val(path);
							element.change();
						} else {
							alert('只支持MP4格式的视频！');
						}
					});
				});
				
			}else if(filetype=='audio'){
				element.parent().find('.input-group-addon').click(function() {
					var linkagename = element.attr('linkagename');
					initBaseUploadFile(function(files) {
						var path = files[files.length - 1].path;
						var filetimelong = files[files.length - 1].filetimelong;
						$('[name=' + linkagename + ']').val(filetimelong);
						if (path.indexOf('.mp3') > 1
								|| path.indexOf('.MP3') > 1
								|| path.indexOf('.OGG') > 1
								|| path.indexOf('.OGG') > 1) {
							element.val(path);
						} else {
							alert('只支持MP3和OGG格式的音频！');
						}
					});
				});
				
			}else if(filetype=='apk'){
				element.parent().find('.input-group-addon').click(function() {
					initBaseUploadFile(function(files) {
						var file = files[files.length - 1];
						var path = file.path;
						$('[name=' + 'versionname]').val(file.versionname);
						$('[name=' + 'versioncode]').val(file.versioncode);
						$('[name=' + 'packagename]').val(file.packagename);
						$('[name=' + 'size]').val(file.apkfilesize);
						if (path.indexOf('.apk') > 1|| path.indexOf('.APK') > 1) {
							element.val(path);
						} else {
							alert('只支持APK格式的文件！');
						}
					});
				});
			}else if(filetype=='titleimage'){
				var thisvalue = element.val();
				if (thisvalue != null && thisvalue != '') {
					var thisvalues = thisvalue.split('&');
					for (var n = 0; n < thisvalues.length; n++) {
						if (thisvalues[n] != null && thisvalues[n] != '') {
							var title = thisvalues[n].split(':')[0];
							var imgs = thisvalues[n].split(':')[1].split(',');
							var col_group = $('<div class="col-sm-12 "><label class="control-label "></label><div class="thiscontrols controls input-group-sm"></div></div>');
							col_group.find('label').text(title);

							for (var m = 0; m < imgs.length; m++) {
								var url = imgs[m].path;
								if (url != null && url != '') {
									var img = $('<img src="'
											+ fileServiceUrl
											+ url
											+ '" style="width: 80px;height: 80px;margin-right: 10px;"/>');
									col_group.find('.controls').append(img);
								}
							}
							element.parent().before(col_group);
						}
					}

				}
				element.hide();
				element.next('span').hide();
			}else if(filetype=='image'){
				var imageDiv = $('<div></div>');
				imageDiv.addClass('width-100');
				imageDiv.addClass('image-group');
				imageDiv.css('display','table-caption');
				imageDiv.css('border','1px solid #E4E4E4');
				imageDiv.css('border-bottom','0px');
				imageDiv.css('padding','10px 10px 10px 10px');
				
				element.before(imageDiv);
				element.parent().find('.input-group-addon').click(function() {
					initBaseUploadFile(function(files) {
						
						var path = files[files.length - 1].path;
						var value = element.val();
						if(length == 1){
							value = path;
							imageDiv.html('');
						}else{
							if(value!=null&&value!=''){
								value = value + ',' + path;
							}else{
								value = path;
							}
						}
						addImage(path);
						element.val(value);
					});
				});
				var addImage = function(url){
					imageDiv.find('.no-img').remove();
					var image = $('<div class="one-image"><img style="width: 100%;height: 100%;"/></div>');
					if(canupdate){
						image.find('img').before('<div class="remove  fa fa-remove vd_red"></div>');
					}
					image.find('img').attr('src',basePath+'/images/sys/no_img.png');
					image.css('width', 110);
					image.css('height', 109);
					image.css('margin-right', 10);
					image.css('border', '1px solid #F1F1F1');
					image.find('img').attr('path', url);
					if(url.indexOf('http') == 0){
					}else{
						url = baseFilePath + url;
					}
					image.find('img').attr('src', url);
					image.appendTo(imageDiv);
					image.find('.remove').click(function(){
						var thispath = $(this).next('img').attr('path');
						var thisvalue = element.val();
						if(thisvalue!=null&&thisvalue!=''){
							var urls = thisvalue.split(',');
							thisvalue = '';
							for(var i=0;i<urls.length;i++){
								var url = urls[i];
								if(url!=null && url!='' && url!=thispath){
									thisvalue += url + ',';
								}
							}
						}
						if(thisvalue!=''&&thisvalue.indexOf(',')>0){
							thisvalue = thisvalue.substring(0, thisvalue.length-1);
						}
						element.val(thisvalue);
						$(this).parent().remove();
						if(imageDiv.find('img').length<1){
							var image = $('<div class="no-img one-image"><img style="width: 100%;height: 100%;"/></div>')
							image.find('img').attr('src',basePath+'/images/sys/no_img.png');
							image.css('width', 110);
							image.css('height', 109);
							image.css('margin-right', 10);
							image.css('border', '1px solid #F1F1F1');
							image.appendTo(imageDiv);
							fullImgFun(image);
						}
					});
					fullImgFun(image);
				};
				var fullImgFun = function(image){
					if(!canupdate){
						return;
					}
					image.find('img').click(function(){
						var image = $(this);
						var oldpath = image.attr('path');
						initBaseUploadFile(function(files) {
							var thispath = files[files.length - 1].path;
							
							image.attr('src', baseFilePath + thispath);
							image.attr('path', thispath);
							var url = element.val();
							var thisvalue = '';
							if(url!=null&&url!=''){
								var urls = url.split(',');
								$(urls).each(function(index, url){
									if(url == oldpath){
										thisvalue += thispath + ",";
									}else{
										thisvalue += url + ",";
									}
								});
							}else{
								thisvalue = thispath;
							}
							
							if(thisvalue!=''&&thisvalue.indexOf(',')>0){
								thisvalue = thisvalue.substring(0, thisvalue.length-1);
							}
							element.val(thisvalue);
							
						});
					});
				}
				element.change(function(){
					imageDiv.html('');
					var url = $(this).val();
					if(url!=null&&url!=''){
						var urls = url.split(',');
						$(urls).each(function(index, url){
							addImage(url);
						});
					}else{
						var image = $('<div class="no-img one-image"><img style="width: 100%;height: 100%;"/></div>')
						image.find('img').attr('src',basePath+'/images/sys/no_img.png');
						image.css('width', 110);
						image.css('height', 109);
						image.css('margin-right', 10);
						image.css('border', '1px solid #F1F1F1');
						image.appendTo(imageDiv);
						fullImgFun(image);
					}
				});
				element.change();
			}
			
			
		});

	}
	
	function selectEvent() {
		// 下拉框
		var elements = $('.inputtype-select').removeClass('inputtype-select');
		$(elements).each(function(index, element){
			var element = $(element);
			var canupdate = element.attr('canupdate');
			canupdate = canupdate == null || canupdate == 'true' || canupdate == '1'?true:false;
			if(!canupdate){
				return;
			}
			var design = element.attr('design');
			design = design != null&&design=='true'?true:false;
			var search = element.attr('search');
			search = search != null&&search=='true'?true:false;
			var relationname = element.attr('relationname');
			var ischeckbox = element.attr('ischeckbox');
			ischeckbox = ischeckbox != null && ischeckbox == 'true' ? true : false;
			if ((element.attr('needaddon') != null && element.attr('needaddon') == 'true') || (ischeckbox)) {
				element.addClass('width-100');
				var group = $('<div class="input-group input-group-sm"></div>');
				if (element.parent().hasClass('input-group')) {
					group = element.parent();
				} else {
					element = element.clone(true);
					group = $('<div class="input-group input-group-sm"></div>');
					element.before(group);
					element.appendTo(group);
				}
				var btn = $('<span class="input-group-addon vd_btn vd_black "><i class="fa fa-search"></i></span>');
				element.after(btn);
				if (ischeckbox) {
					// 复制
					var showelement = element.clone();
					var options = element.parent().find('select.baseoption').find(
							'option');
					var value = showelement.val();
					if (value != null && value != '') {
						var values = value.split(',');
						var valuemap = {};
						options.each(function(index, one) {
							one = $(one);
							valuemap[one.attr('value')] = one.text();
						});
						var showvalue = '';
						$(values).each(function(index, one) {
							showvalue += valuemap[one] + ",";
						});
						if(showvalue!=''&&showvalue.indexOf(',')>0){
							showvalue = showvalue.substring(0, showvalue.length-1);
						}
						showelement.val(showvalue);
					}

					element.before(showelement);
					element.hide();
					showelement.click(function() {
						var valueelement = $(showelement).next('input');
						var baseoption =  $(showelement).parent().find('select.baseoption');
						var config = {};
						config.showelement = showelement;
						config.valueelement = valueelement;
						config.baseoption = baseoption;
						showSearchSelectWindow('checkbox', config);
					});
					btn.click(function() {
						var valueelement = $(showelement).next('input');
						var baseoption =  $(showelement).parent().find('select.baseoption');
						var config = {};
						config.showelement = showelement;
						config.valueelement = valueelement;
						config.baseoption = baseoption;
						showSearchSelectWindow('checkbox', config);
					});
				} else {
					btn.click(function() {
						var config = {};
						var baseoption =  $(this).parent().find('select.baseoption');
						config.showelement = element;
						config.valueelement = element;
						config.baseoption = element;
						showSearchSelectWindow('radio', config);
					});
				}
			}
			if(!design){
				// 组合级联菜单
				if (relationname != null) {
					initSelectChild(element);
				}
			}
		});
	}
	function colorEvent() {
		var elements = $('.inputtype-color').removeClass('inputtype-color');
		if(elements.length>0){
			elements.each(function(index, element) {
				element = $(element);
				var canupdate = element.attr('canupdate');
				canupdate = canupdate == null || canupdate == 'true' || canupdate == '1'?true:false;
				if(!canupdate){
					return;
				}
				colorPickerEvent(element);
			});
		}
	}
	function inputselectEvent() {
		var elements = $('.inputtype-inputselect').removeClass(
				'inputtype-inputselect');
		elements.each(function(index, element) {
			element = $(element);
			var canupdate = element.attr('canupdate');
			canupdate = canupdate == null || canupdate == 'true' || canupdate == '1'?true:false;
			if(!canupdate){
				return;
			}
			var datas = $(element).next('datas').find('data');
			if (datas) {
				var texts = [];
				for (var i = 0; i < datas.length; i++) {
					var data = $(datas[i]);
					var text = data.attr('text');
					texts[texts.length] = text;
				}
				$(element).autocomplete({
					source : texts
				});
			}
		});
	}
	function dateEvent() {
		var elements = $('.inputtype-date').removeClass('inputtype-date');
		elements.each(function(index, element) {
			element = $(element);
			var canupdate = element.attr('canupdate');
			canupdate = canupdate == null || canupdate == 'true' || canupdate == '1'?true:false;
			if(!canupdate){
				return;
			}
			element.datepicker({
				dateFormat : 'yy-mm-dd'
			});
		});
	}
	function timeEvent() {
		var elements = $('.inputtype-time').removeClass('inputtype-time');
		elements.each(function(index, element) {
			element = $(element);
			var canupdate = element.attr('canupdate');
			canupdate = canupdate == null || canupdate == 'true' || canupdate == '1'?true:false;
			if(!canupdate){
				return;
			}
			element.timepicker({
				showMeridian : false,
				showSeconds : true
			});
		});
	}
	function datetimeEvent() {
		var elements = $('.inputtype-datetime').removeClass(
				'inputtype-datetime');

		elements.each(function(index, element) {
			element = $(element);
			var canupdate = element.attr('canupdate');
			canupdate = canupdate == null || canupdate == 'true' || canupdate == '1'?true:false;
			if(!canupdate){
				return;
			}
			var value = element.val();
			value = initDateTime(value);
			element.val(value);
			element.datetimepicker({lang:'ch'});
		});
		
	}
	function tagEvent() {
		var elements = $('.inputtype-tag').removeClass('inputtype-tag');

		elements.each(function(index, element) {
			element = $(element);
			var canupdate = element.attr('canupdate');
			canupdate = canupdate == null || canupdate == 'true' || canupdate == '1'?true:false;
			if(!canupdate){
				return;
			}
			element.tagsInput({
				width : 'auto',
				onAddTag : function(tag) {
					$(this).val(this.value);
					$(this).change();
				},
				onRemoveTag : function(tag) {
					$(this).val(this.value);
					$(this).change();
				}
			});

		});
	}
	function switchEvent() {

		var elements = $('.inputtype-switch').removeClass('inputtype-switch');

		elements.each(function(index, element) {
			element = $(element);
			var canupdate = element.attr('canupdate');
			canupdate = canupdate == null || canupdate == 'true' || canupdate == '1'?true:false;
			if(!canupdate){
				return;
			}
			//var height = element.parent().height();
			//element.parent().css('min-height', height);
//			element.parent().css('min-height', 53);
			element.hide();
			element.bootstrapSwitch();
		});
	}
	function baseSelectEvent() {
		var maps = {};
		function initBaseSelectId() {
			var checks = $('.baseSelectOne').find('[type=checkbox]');
			var ids = '';
			var allChecked = true;
			for (var m = 0; m < checks.length; m++) {
				if (checks[m].checked) {
					ids += checks[m].value + ",";
				} else {
					allChecked = false;
				}
			}
			if (allChecked) {
				$('#baseSelectAll').get(0).checked = true;
			} else {
				$('#baseSelectAll').get(0).checked = false;
			}
			$(this).parent().find('#baseSelectAll').val(ids);
		}
		var baseSelectAlls = $('.baseSelectAll');
		for (var i = 0; i < baseSelectAlls.length; i++) {
			var baseSelectAll = $(baseSelectAlls[i]);
			// 判断是否已经初始化
			if ($(baseSelectAlls[i]).attr('initeventedbaseSelectAll')) {
				continue;
			} else {
				$(baseSelectAlls[i]).attr('initeventedbaseSelectAll', true);
			}
			baseSelectAll.change(function() {
				var checked = $(this).find('[type=checkbox]').get(0).checked;
				var checks = $('.baseSelectOne').find('[type=checkbox]');
				for (var m = 0; m < checks.length; m++) {
					checks[m].checked = checked;
				}
				initBaseSelectId();
			});
		}

		var baseSelectOnes = $('.baseSelectOne');
		for (var i = 0; i < baseSelectOnes.length; i++) {
			var baseSelectOne = $(baseSelectOnes[i]);
			// 判断是否已经初始化
			if ($(baseSelectOnes[i]).attr('initeventedbaseSelectOne')) {
				continue;
			} else {
				$(baseSelectOnes[i]).attr('initeventedbaseSelectOne', true);
			}
			baseSelectOne.change(function() {
				var checkbox = $(this).find('[type=checkbox]').get(0);
				var checked = checkbox.checked;

				initBaseSelectId();
			});
		}
	}
	function locationEvent() {
		var elements = $('.inputtype-location').removeClass(
				'inputtype-location');

		elements.each(function(index, element) {
			element = $(element);
			var canupdate = element.attr('canupdate');
			canupdate = canupdate == null || canupdate == 'true' || canupdate == '1'?true:false;
			if(!canupdate){
				return;
			}
			var id = 'map_' + element.attr('id');

			var mapPanel = $('<div style="width: 100%;height: 300px;margin-bottom: 10px;">这里插入百度地图</div>');
			var utilPanel = $('<div style="width: 100%;height: 50px;" class="col-sm-12"></div>');
			utilPanel.append('<label class=" control-label">检索：</label>');
			utilPanel
					.append('<input style="display: initial;width: 150px;" class="searchtext form-control" placeholder="输入检索信息" success="true">');
			utilPanel
					.append('<a style="margin-left: 5px;margin-top: -5px;" class="searchbtn btn btn-xs vd_bg-green vd_white" >检索</a>');
			utilPanel
					.append('<span class="vd_red">&nbsp;&nbsp;点击地图即可设定位置哦！</span>');
			utilPanel
					.append('<span class="vd_green">&nbsp;&nbsp;当前选中:</span>');
			utilPanel
					.append('<span class="vd_blue thisaddress">&nbsp;&nbsp;</span>');
			utilPanel.find('.searchbtn').attr('mapid', id);
			mapPanel.attr('id', id);
			element.before(utilPanel);
			element.before(mapPanel);
			// 百度地图API功能
			maps[id] = new BMap.Map(id); // 创建Map实例
			maps[id].utilPanel = utilPanel;
			maps[id].mapid = id;
			var locationinfo = element.val();
			if (locationinfo != null && locationinfo != ''
					&& locationinfo.indexOf(',') > 0) {
				var locationinfos = locationinfo.split(',');
				var point = new BMap.Point(locationinfos[0],
						locationinfos[1]);
				maps[id].centerAndZoom(point, 15);
				point.mapid = maps[id].mapid;
				showLocationInfo(point, maps[id].utilPanel
						.find('.thisaddress'));
			} else {
				maps[id].centerAndZoom('南京', 15);// 初始化地图,设置中心点坐标和地图级别
			}

			maps[id].enableScrollWheelZoom(true);// 开启鼠标滚轮缩放
			maps[id].addEventListener("click",
			function(e) {
				var locationinfo = e.point.lng + "," + e.point.lat;
				element.val(locationinfo);
				var point = e.point;
				point.mapid = this.mapid;
				showLocationInfo(point, this.utilPanel
						.find('.thisaddress'));
			});
			utilPanel.find('.searchbtn').click(
			function() {
				var mapid = $(this).attr('mapid');
				var searchtext = $(this).parent().find(
						'.searchtext').val();
				if (searchtext != null && searchtext != '') {
					var map = maps[mapid];
					var local = new BMap.LocalSearch(map, {
						renderOptions : {
							map : map
						}
					});
					local.search(searchtext);
				}

			});
		});

	}
	function baseTreeListEvent() {
		var this_sys_tree_lists = $('.inputtype-this_sys_tree_list')
				.removeClass('inputtype-this_sys_tree_list');
		for (var i = 0; i < this_sys_tree_lists.length; i++) {
			var this_sys_tree_list = $(this_sys_tree_lists[i]);
			// 判断是否已经初始化
			if ($(this_sys_tree_lists[i]).attr('initeventedthis_sys_tree_list')) {
				continue;
			} else {
				$(this_sys_tree_lists[i]).attr('initeventedthis_sys_tree_list',
						true);
			}
			var thistreelistdatas = (this_sys_tree_list.find('textarea').val());
			thistreelistdatas = $.parseJSON(thistreelistdatas);
			this_sys_tree_list.html('');
			this_sys_tree_list.removeClass('this_sys_tree_list');
			var setting = {};
			setting.id = 'id';
			setting.pid = 'pid';
			setting.name = 'name';
			setting.btnhtml = 'btnhtml';
			setting.haveCheckbox = ($('#treeshowcheckbox').val() == 'true');
			setting.checkboxClassName = $('#treecheckboxclassname').val();
			for (var i = 0; i < thistreelistdatas.length
					&& typeof (thistreelistdatas[i]) != 'undefined'; i++) {
				var data = thistreelistdatas[i];
				var have = false;
				for (var m = 0; i < thistreelistdatas.length
						&& typeof (thistreelistdatas[m]) != 'undefined'; m++) {
					var data2 = thistreelistdatas[m];
					if (data.pid == data2.id) {
						have = true;
						break;
					}
				}
				if (!have) {
					if (typeof (thistreelistdatas[i]) != 'undefined') {
						thistreelistdatas[i].pid = '';
					}
				}
			}
			base.tree.init_(this_sys_tree_list, setting, thistreelistdatas);
		}
	}
	

	function initElementEvent() {
		colorEvent();
		inputselectEvent();
		dateEvent();
		timeEvent();
		datetimeEvent();
		editorEvent();
		tagEvent();
		switchEvent();
		baseSelectEvent();
		locationEvent();
		baseTreeListEvent();
		fileEvent();
		selectEvent();
		//$('[data-toggle^="tooltip"]').tooltip(); 
	}
	function showLocationInfo(point,thisaddress){
		var geoc = new BMap.Geocoder();
		geoc.getLocation(point, function(rs){
			var addComp = rs.addressComponents;
			var addressinfo = addComp.province + " " + addComp.city + " " + addComp.district + " " + addComp.street + " " + addComp.streetNumber;
			thisaddress.text(addressinfo);
		});

		var mapid = point.mapid;
		maps[mapid].clearOverlays();
		var marker = new BMap.Marker(point);  // 创建标注
		maps[id].addOverlay(marker);               // 将标注添加到地图中
		//marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
		
	}
	function buildLevelOption(options){
		//组合层级查询
		//判断是否层级查询
		var hasLevel = false;
		var levels = [];
		var levelIndex = 0;
		var levelData = {};
		var levelDatas = [];
		for(var i=0;i<options.length;i++){
			var option = $(options[i]);
			var parentid = option.attr('parentid');
			var value = option.attr('value');
			var text = option.text();
			if(parentid != null){
				hasLevel = true;
				if(levels[0] == null){
					levels[0] = [];
				}
				if(parentid == 'null'){
					levelData = {};
					levelData['parentid'] = ''+parentid;
					levelData['value'] = ''+value;
					levelData['text'] = ''+text;
					levelDatas[levelDatas.length] = levelData;
				}
			}
		}
		if(hasLevel){
			levels[0] = levelDatas;
			function initSubDatas(parentdatas){
				if(parentdatas == null || parentdatas.length<1){
					return;
				}
				levelDatas = [];
				levelIndex++;
				for(var i=0;i<options.length;i++){
					var option = $(options[i]);
					var parentid = option.attr('parentid');
					var value = option.attr('value');
					var text = option.text();
					if(parentid!=null&&parentid!='null'){
						for(var m=0;m<parentdatas.length;m++){
							if(parentid == parentdatas[m].value){
								levelData = {};
								levelData['parentid'] = ''+parentid;
								levelData['value'] = ''+value;
								levelData['text'] = ''+text;
								levelDatas[levelDatas.length] = levelData;
							}
						}
					}
					
				}
				if(levelDatas.length>0){
					levels[levelIndex] = levelDatas;
					initSubDatas(levelDatas);
				}
			}
			initSubDatas(levels[0]);
		}
		return levels;
	}
	var showSearchSelectWindowIndex=0;
	function showSearchSelectWindow(type, config){
		showSearchSelectWindowIndex++;
		var baseoption = config.baseoption;
		var showelement = config.showelement;
		var valueelement = config.valueelement;
		var over_window = $('.over-window');
		over_window.show();
		var options = baseoption.find('option');
		
		//selectconfig
		var selectconfig = valueelement.attr('selectconfig');
		if(selectconfig!=null && selectconfig!=''){
			if(selectconfig.indexOf('linkelement:')==0){
				var configs = selectconfig.split(':');
				var elementname = configs[1];
				var columnname = configs[2];
				var thisvalue = $('[name='+elementname+']').val();
				var values = [];
				if(thisvalue!=null){
					values = [thisvalue];
				}
				if(thisvalue!=null&&thisvalue.indexOf(',')>0){
					values = thisvalue.split(',');
				}
				
				var os = [];
				for(var i=0;i<options.length;i++){
					var o = options[i];
					for(var n=0;n<values.length;n++){
						var v = values[n];
						if($(o).attr(columnname) == v){
							os[os.length] = o;
						}
					}
				}
				options = os;
			}
		}
		over_window.find('.tab-content').find('.row').html('');
		
		var utilPanel = $('<div style="width: 100%;height: 50px;" class="col-sm-12"></div>');
		utilPanel.append('<label class=" control-label">检索：</label>');
		utilPanel.append('<input style="display: initial;width: 150px;" class="searchtext form-control" placeholder="输入检索信息" success="true">');
		utilPanel.append('<a style="margin-left: 5px;margin-top: -5px;" class="searchbtn btn btn-xs vd_bg-green vd_white" >检索</a>');
		if(type=='checkbox'){
			utilPanel.append('<a style="margin-left: 5px;margin-top: -5px;" class="selectAllBtn btn btn-xs vd_bg-green vd_white" >全选</a>');
			utilPanel.find('.selectAllBtn').click(function(){
				var checktype = $(this).attr('checktype');
				if(checktype==null||checktype=='1'){
					var inputs = over_window.find('.oneoption').find('input');
					for(var i=0;i<inputs.length;i++){
						var input = inputs[i];
						input.checked = true;
					}
					$(this).attr('checktype','2');
				}else{
					var inputs = over_window.find('.oneoption').find('input');
					for(var i=0;i<inputs.length;i++){
						var input = inputs[i];
						input.checked = false;
					}
					$(this).attr('checktype','1');
				}
			});
		}
		
		utilPanel.find('.searchbtn').click(function(){
			$(this).parent().parent().find('.oneoption').hide();
			var searchtext = $(this).parent().find('.searchtext').val();
			var searchvalue = null;
			var search_selects = $(this).parent().find('.search_select');
			for(var m=0;m<search_selects.length;m++){
				var v = $(search_selects[m]).val();
				if(v != null && v != ''){
					searchvalue = v;
				}
			}
			searchtext = searchtext == ''?null:searchtext;
			var eles = $(this).parent().parent().find('.oneoption').find('input');
			for(var i=0;i<eles.length;i++){
				var ele = $(eles[i]);
				var text = ele.parent().find('label').text();
				var value = ele.attr('value');
				if(searchtext==null||searchtext==''||text.indexOf(searchtext)>=0){
					ele.parent().parent().show();
				}
			}
		});

		over_window.find('.tab-content').find('.row').append(utilPanel);
		
		var levels = buildLevelOption(options);
		var colsize = 12/levels.length;
		function subChecked(value){
			var subs = over_window.find('[pid='+value+']');
			for(var i=0;i<subs.length;i++){
				var sub = $(subs[i]);
				if(sub.find('input').get(0).checked){
					return true;
				}
			}
			return false;
		}
		function fullCheck(){
			var onelevelpanels = $('.onelevelpanel');
			var levellength = onelevelpanels.length;
			for(var i=(levellength-1);i>0;i--){
				var onelevelpanel = $(onelevelpanels[i]);
				var inputs = onelevelpanel.find('.oneoption').find('input');
				for(var m=0;m<inputs.length;m++){
					var input = $(inputs[m]);
					var parentid = input.attr('parentid');
					if(input.get(0).checked&&parentid!=null){
						//设置父
						$('.onelevelpanel').find('[value='+parentid+']').get(0).checked = true;
					}
				}
			}
		}
		if(levels.length>0){
			
			for(var m=0;m<levels.length;m++){
				//组合层级树复选框
				var levelSelectPanel = $('<div class="col-sm-'+colsize+' onelevelpanel levelindex_'+m+'" ></div>');

				var levelDatas = levels[m];
				for(var n=0;n<levelDatas.length;n++){
					var levelData = levelDatas[n];
					var value = levelData.value;
					var text = levelData.text;
					var parentid = levelData.parentid;
					var thisid = value+'_'+n;
					var one = $('<div class="col-sm-12 oneoption" pid="'+parentid+'"><div class="vd_checkbox checkbox-danger">'+
							'<input id="'+thisid+'" class="thischeckbox" type="checkbox" parentid="'+parentid+'" value="'+value+'"/><label for="'+thisid+'">'+text+'</label></div></div>');
					if(levels.length > (m+1)){
						var hasSub = false;
						var subDatas = levels[m+1];
						//判断是否有子项
						for(var l=0;l<subDatas.length;l++){
							var subData = subDatas[l];
							if(value == subData.parentid){
								hasSub = true;
								break;
							}
						}
						if(hasSub){
							one.find('.vd_checkbox').append('<a style="float: right;" levelindex='+m+' value="'+value+'" class="showSubBtn btn btn-xs vd_bg-grey vd_white">子项</a>');
						}
						
						//
					}
					
					one.find('label').click(function(){
						var input = $(this).parent().find('input');
						var parentid = input.attr('parentid');
						var checked = input.get(0).checked;
						var value = input.get(0).value;
						var subs = over_window.find('[pid='+value+']');
						for(var i=0;i<subs.length;i++){
							var sub = $(subs[i]);
							if(checked != sub.find('input').get(0).checked){
								sub.find('input').get(0).checked = checked;
							}
							sub.find('label').click();
						}
						if(subs.length<1){
							window.setTimeout(function(){
								fullCheck();
							}, 500);
							
						}
					});
					one.find('.showSubBtn').click(function(){
						var levelindex = $(this).attr('levelindex');
						var nextlevelindex = Number(levelindex)+1;
						var value = $(this).attr('value');
						var onelevelpanels = $('.onelevelpanel');
						for(var i=nextlevelindex;i<onelevelpanels.length;i++){
							$(onelevelpanels[i]).find('.oneoption').hide();
						}
						var nextlevelpanel = over_window.find('.levelindex_'+nextlevelindex);
						var showoption = nextlevelpanel.find('[pid='+value+']');
						showoption.show();
						if(showoption.find('.showSubBtn').length>0){
							showoption.find('.showSubBtn').get(0).click();
						}
						over_window.find('.levelindex_'+levelindex).find('.showSubBtn').removeClass('vd_bg-green').addClass('vd_bg-grey');
						$(this).removeClass('vd_bg-grey');
						$(this).addClass('vd_bg-green');
					});
					levelSelectPanel.append(one);
				}
				over_window.find('.tab-content').find('.row').append(levelSelectPanel);
			}
			var levelPanel = over_window.find('.tab-content').find('.row').find('.levelindex_0');
			if(levelPanel.length>0&&levelPanel.find('.showSubBtn').size()>0){
				levelPanel.find('.showSubBtn').get(0).click();
			}
		}else{
			for(var i=0;i<options.length;i++){
				var option = $(options[i]);
				var value = option.attr('value');
				var parentid = option.attr('parentid');
				var text = option.text();
				var thisid = value+'_'+i;
				var one = $('<div class="col-sm-3 oneoption" ><div class="vd_'+type+' '+type+'-danger">'+
						'<input id="'+thisid+'" type="'+type+'" name="thisoneoption" value="'+value+'"/><label for="'+thisid+'">'+text+'</label></div></div>');
				var picture = option.attr('picture');
				if(picture!=null && picture!=''){
					var src = picture;
					if(src!=null&&src.indexOf('http') == 0){
						
					}else{
						if(src == null || src == ''){
							src = basePath + '/images/sys/no_img.png';
						}else{
							src = fileServiceUrl + src;
						}
					}
					var imgstr = "<div>"+text + "</div><br/><img style='width: 100px;' src='"+src+"' />";
					one.find('label').html(imgstr);
				}
				over_window.find('.tab-content').find('.row').append(one);
			}
		}
		

		var thisvalue = valueelement.val();
		var values = [];
		if(thisvalue!=null){
			values = [thisvalue];
		}
		if(thisvalue!=null&&thisvalue.indexOf(',')>0){
			values = thisvalue.split(',');
		}
		for(var n=0;n<values.length;n++){
			over_window.find('.tab-content').find('.row').find('.oneoption').find('[value='+values[n]+']').attr('checked','checked');
		}

		fullCheck();
		over_window.find('.ok').unbind("click").click(function(){
			var options = $(this).parent().parent().parent().parent().find('.oneoption').find('input');
			var value = '';
			var text = '';
			for(var i=0;i<options.length;i++){
				var option = $(options[i]);
				if(option.get(0).checked){
					if(option.attr('value')!=null && option.attr('value')!=''){
						value += option.attr('value')+',';
						text += option.parent().find('label').text()+',';
					}
				}
			}
			if(text!=''&&text.indexOf(',')>0){
				text = text.substring(0, text.length-1);
			}
			if(value!=''&&value.indexOf(',')>0){
				value = value.substring(0, value.length-1);
			}
			if(value!=null){
				showelement.val(text);
				valueelement.val(value);
			}
			valueelement.change();
			$(this).closest('.over-window').hide();
			
		});
		over_window.show();
	}

	function initSelectChild(selectchild){
		var thiselement = $(selectchild);
		var id = thiselement.attr('id');
		var thisvalue = thiselement.val();
		var relationname = thiselement.attr('relationname');
		var thisoptions = thiselement.find('option');
		var relation = $('[name="'+relationname+'"]');
		var relationvalue = relation.val();
		if(relationvalue == null || relationvalue == ''){
			thiselement.html('<option value="">请选择</option>');
		}else{
			thiselement.html('<option value="">请选择</option>');
			for(var i=0;i<thisoptions.length;i++){
				var option = $(thisoptions[i]);
				if(option.attr('relationvalue') == relationvalue){
					thiselement.append(option);
				}
			}
			thiselement.val(thisvalue);
		}
		relation.change(function(){
			var relationvalue = $(this).val();
			if(relationvalue == null || relationvalue == ''){
				thiselement.html('<option value="">请选择</option>');
			}else{
				thiselement.html('<option value="">请选择</option>');
				var have = false;
				for(var i=0;i<thisoptions.length;i++){
					var option = $(thisoptions[i]);
					if(option.attr('relationvalue') == relationvalue){
						thiselement.append(option);
						if(option.attr('value') == thisvalue){
							have = true;
						}
					}
				}
				if(have){
					thiselement.val(thisvalue);
				}else{
				}
			}
			thiselement.change();
		});
	}
	initPageElement();
})();