(function(){
	"use strict";
	if(window["base.page.support"]){
		//throw new Error("base.page.support不可以重复加载!");
		return;
	}
	console.log("loadding base.page.support");
	window["base.page.support"] = true;
	if(window.base == null)
		window.base = {};
	if(window.base.page == null)
		base.page = {};
	var page = base.page;
		
	//添加拖动和删除按钮
	var controlbtngroups = $('.design-tool .page-model-control-btn-group');
	var dragBtn = $('<a class="btn vd_btn btn-xs drag"><span class="menu-icon"><i class="fa fa-arrows"></i> </span></a>');
	var delBtn = $('<a class="btn vd_btn btn-xs del"><span class="menu-icon"><i class="fa fa-remove"></i> </span></a>');
	var fullBtn = $('<a class="btn vd_btn btn-xs full"><span class="menu-icon"><i class="fa fa-expand"></i> </span></a>');
	controlbtngroups.append(dragBtn);
	controlbtngroups.append(delBtn);
	controlbtngroups.append(fullBtn);
	var selectElement = null;
	$('html').on('click','.del',function(){
		$(this).closest('.page-model').remove();
	});
	$('html').on('click','.full',function(){
		if(!$(this).hasClass('full')){
			return;
		}
		var status = $(this).attr('status');
		if(status == null || status == ''){
			status = 1;
		}
		if(status == 1){
			$('.page-model').removeClass('need-full');
			$(this).find('.fa').removeClass('fa-expand').addClass('fa-compress');
			$(this).closest('.page-model').addClass('need-full');
			$(this).attr('status', 2);
			$('body').addClass('full');
		}else{
			$(this).find('.fa').removeClass('fa-compress').addClass('fa-expand');
			$('.page-model').removeClass('need-full');
			$('body').removeClass('full');
			$(this).attr('status', 1);
		}
		
	});
	$('html').on('click','.btn-edit',function(){
		$('body').removeClass('show').addClass('edit');
		$(this).attr('disabled',"true");//添加disabled属性
		$('.btn-preview').removeAttr("disabled");//移除disabled属性
	});
	$('html').on('click','.btn-preview',function(){
		$('body').addClass('show').removeClass('edit');
		$(this).attr('disabled',"true");//添加disabled属性
		$('.btn-edit').removeAttr("disabled");//移除disabled属性
	});
	
	$('html').on('click','.btn-add-element',function(){
		var elementtype = $('.elementtype').val();
		var element = $('<'+elementtype+' class="column">');
		element.html(elementtype);
		if(selectElement == null){
			$('.design-container').append(element);
		}else{
			$(selectElement).append(element);
		}
	});

	$('html').on('click','.btn-delete',function(){
		$('.select').closest('.page-model').remove();
		initSelectElement();
	});
	$('html').on('click','.btn-div',function(){
		if(selectElement == null){
			$('.design-container').append('<div class="column">');
		}else{
			$(selectElement).append('<div class="column">');
		}
	});

	$('.btn-class').click(function(){
		var classdata = $(this).attr('classdata');
		if(classdata == null || classdata == ''){
			return;
		}
		if(selectElement != null){
			var noncoexistenceclass = $(this).attr('noncoexistenceclass');
			if(noncoexistenceclass != null && noncoexistenceclass != ''){
				var cs = noncoexistenceclass.split(',');
				for(var i=0;i<cs.length;i++){
					$(selectElement).removeClass(cs[i]);
				}
			}
			
			if($(selectElement).hasClass(classdata)){
				$(selectElement).removeClass(classdata);
			}else{
				$(selectElement).addClass(classdata);
			}
			initElementClassBtn();
		}
	});
	$('.btn-font-color').ColorPicker({
		color: '#ff00ff',
		onSubmit: function(hsb, hex, rgb, el) {
			$('.btn-font-color').parent().attr('color', '#' + hex)
			$('.btn-font-color').ColorPickerHide();
		},
		onBeforeShow: function () {
			$('.btn-font-color').ColorPickerSetColor($('.btn-font-color').parent().attr('color'));
		},
		onChange: function (hsb, hex, rgb) {
			$('.btn-font-color').css('background-color', '#' + hex);
			$('.btn-font-color').parent().attr('color', '#' + hex);
			if(selectElement != null && $(selectElement).length>0){
				$(selectElement).css('color', '#' + hex);
			}
		}
	}).bind('keyup', function(){
		$(this).ColorPickerSetColor(this.value);
	});
	$('.btn-background-color').ColorPicker({
		color: '#ff00ff',
		onSubmit: function(hsb, hex, rgb, el) {
			$('.btn-background-color').parent().attr('color', '#' + hex)
			$('.btn-background-color').ColorPickerHide();
		},
		onBeforeShow: function () {
			$('.btn-bg-color').ColorPickerSetColor($('.btn-background-color').parent().attr('color'));
		},
		onChange: function (hsb, hex, rgb) {
			$('.btn-background-color').css('background-color', '#' + hex);
			$('.btn-background-color').parent().attr('color', '#' + hex);
			if(selectElement != null && $(selectElement).length>0){
				$(selectElement).css('background-color', '#' + hex);
			}
		}
	}).bind('keyup', function(){
		$(this).ColorPickerSetColor(this.value);
	});
	function initElementClassBtn(){
		$('.btn-class').removeClass('choose');
		$('.btn-background-color').parent().attr('color', '');
		$('.btn-font-color').parent().attr('color', '');
		$('.btn-background-color').css('background-color', 'none');
		$('.btn-font-color').css('background-color', 'none');
		if(selectElement == null || $(selectElement).length<1){
			return;
		}
		var bgcolor = $(selectElement).css('background-color');
		var fontcolor = $(selectElement).css('color');

		$('.btn-background-color').parent().attr('color', bgcolor);
		$('.btn-font-color').parent().attr('color', fontcolor);
		$('.btn-background-color').css('background-color', bgcolor);
		$('.btn-font-color').css('background-color', fontcolor);
		
		$('.btn-class').each(function(index, btn){
			var classdata = $(btn).attr('classdata');
			if(classdata == null || classdata == ''){
				return;
			}
			if($(selectElement).hasClass(classdata)){
				$(btn).addClass('choose');
				return;
			}
		});
		
	}

	$(document).click(function(e){
		var target = $(e.target);
		if(target.closest('.design-container').length>0
				&&!target.hasClass('design-container')
				&&!target.parent().hasClass('page-model')
				&&target.closest('.page-model-control-btn-group').length < 1){
			if(target.hasClass('select')){
				$('.element-tool').hide();
				$('.select').removeClass('select');
				initSelectElement();
				return;
			}
			$('.select').removeClass('select');
			var tool = $('.element-tool').show();
			target.addClass('select');
			initSelectElement();
		}
		initSelectElement();
	});
	$('.design-tool .page-model').draggable({
		connectToSortable: ".column",
		helper: "clone",
		handle: ".drag",
		start: function(e, t) {
		},
		drag: function(e, t) {
			t.helper.width(200);
		},
		stop: function(e, t) {
			$(".design-container, .column").sortable({
				opacity: .35,
				connectWith: ".column",
				handle: ".drag",
				start: function(e, t) {
				},
				stop: function(e, t) {
				}
			});
		}
	});
	$(".design-container, .column").sortable({
		opacity: .35,
		connectWith: ".column",
		handle: ".drag",
		start: function(e, t) {
		},
		stop: function(e, t) {
		}
	});

	var initSelectElement = function(){
		selectElement = $('.select');
		initElementClassBtn();
		if(selectElement.length < 1){
			selectElement = null;
			$('.need-select-element').attr('disabled',"true");//添加disabled属性
			return;
		}else{
			$('.need-select-element').removeAttr("disabled");//移除disabled属性
		}
	}
	function initPageSize(){
  		$('.design-container').css('min-height', $(window).outerHeight()-$('.design-tool').outerHeight() - 30);
  	}
	$(window).resize(function() {
		initPageSize();
	});
	initPageSize();
	initSelectElement();
	$('.btn-edit').click();
	console.log("loadded base.page.support");
})();