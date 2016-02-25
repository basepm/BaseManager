/**
 * 当前Document
 */
var currentDocument = null;
/**
 * 超时保存
 */
var timerSave = 1000;
/**
 * 停止保存
 */
var stopsave = 0;
/**
 * 开始拖动
 */
var startdrag = 0;
var demoHtml = $(".demo").html();
/**
 * 当前编辑器
 */
var currenteditor = null;
$(window).resize(function() {
	$(".demo").css("min-height", $(window).height() - 160)
});
/**
 * 数据恢复
 * @returns {Boolean}
 */
function restoreData(){
	if (supportstorage()) {
		layouthistory = JSON.parse(localStorage.getItem("layoutdata"));
		if (!layouthistory) return false;
		window.demoHtml = layouthistory.list[layouthistory.count-1];
		if (window.demoHtml) $(".demo").html(window.demoHtml);
	}
}
/**
 * 初始化
 */
function initContainer(){
	$(".demo, .demo .column").sortable({
		connectWith: ".column",
		opacity: .35,
		handle: ".drag",
		start: function(e,t) {
			if (!startdrag) stopsave++;
			startdrag = 1;
		},
		stop: function(e,t) {
			if(stopsave>0) stopsave--;
			startdrag = 0;
		}
	});
}
$(document).ready(function() {
	
	$("body").css("min-height", $(window).height() - 90);
	$(".demo").css("min-height", $(window).height() - 160);
	//拖动事件
	$(".sidebar-nav .lyrow").draggable({
		connectToSortable: ".demo",
		helper: "clone",
		handle: ".drag",
		start: function(e,t) {
			if (!startdrag) stopsave++;
			startdrag = 1;
		},
		drag: function(e, t) {
			t.helper.width(400)
		},
		stop: function(e, t) {
			$(".demo .column").sortable({
				opacity: .35,
				connectWith: ".column",
				start: function(e,t) {
					if (!startdrag) stopsave++;
					startdrag = 1;
				},
				stop: function(e,t) {
					if(stopsave>0) stopsave--;
					startdrag = 0;
				}
			});
			if(stopsave>0) stopsave--;
			startdrag = 0;
		}
	});
	//拖动事件
	$(".sidebar-nav .box").draggable({
		connectToSortable: ".column",
		helper: "clone",
		handle: ".drag",
		start: function(e,t) {
			if (!startdrag) stopsave++;
			startdrag = 1;
		},
		drag: function(e, t) {
			t.helper.width(400)
		},
		stop: function() {
			handleJsIds();
			if(stopsave>0) stopsave--;
			startdrag = 0;
		}
	});
	initContainer();
	//编辑器
	$('[data-target=#editorModal]').click(function(e) {
		e.preventDefault();
		currenteditor = $('.demo .box-element.select').find('.view');
		var eText = currenteditor.html();
		
		if(eText == null || eText == ''){
			return false;
		}else{
			contenthandle.setData(eText);
		}
	});
	//保存
	$("#savecontent").click(function(e) {
		e.preventDefault();
		currenteditor.html(contenthandle.getData());
	});
	//生成
	$("[data-target=#downloadModal]").click(function(e) {
		e.preventDefault();
		downloadLayoutSrc();
	});
	//源码
	$("[data-target=#sourceModal]").click(function(e) {
		e.preventDefault();
		$('#sourceeditor').val($(".demo").html());
	});
	//保存编辑的源码
	$("#savesource").click(function(){
		$('.demo').html($('#sourceeditor').val());
		initContainer();
		return;
	});
	//编辑
	$("#edit").click(function() {
		$("body").removeClass("devpreview sourcepreview");
		$("body").addClass("edit");
		removeMenuClasses();
		$('.nav-work').find('.btn').removeClass("active");
		$(this).addClass("active");
		return false
	});
	//清除
	$("#clear").click(function(e) {
		e.preventDefault();
		clearDemo()
	});
	//布局编辑
	$("#devpreview").click(function() {
		$("body").removeClass("edit sourcepreview");
		$("body").addClass("devpreview");
		removeMenuClasses();
		$(this).addClass("active");
		return false
	});
	//预览
	$("#sourcepreview").click(function() {
		$("body").removeClass("edit");
		$("body").addClass("devpreview sourcepreview");
		removeMenuClasses();
		$(this).addClass("active");
		return false
	});
	//自适应宽度
	$("#fluidPage").click(function(e) {
		e.preventDefault();
		changeStructure("container", "container-fluid");
		$("#fixedPage").removeClass("active");
		$(this).addClass("active");
		downloadLayoutSrc()
	});
	//固定宽度
	$("#fixedPage").click(function(e) {
		e.preventDefault();
		changeStructure("container-fluid", "container");
		$("#fluidPage").removeClass("active");
		$(this).addClass("active");
		downloadLayoutSrc()
	});
	//工具栏
	$(".nav-header").click(function() {
		var thisdisplay = $(this).parent().find('.boxes').css('display');
		$(".sidebar-nav .boxes").hide();
		if(thisdisplay != 'list-item'){
			$(this).next().slideDown();
		}
	});
	//撤销
	$('#undo').click(function(){
		stopsave++;
		if (undoLayout()) initContainer();
		stopsave--;
	});
	//重做
	$('#redo').click(function(){
		stopsave++;
		if (redoLayout()) initContainer();
		stopsave--;
	});
	/**
	 * 生成布局
	 */
	$(".lyrow .preview input").bind("keyup", function() {
		var e = 0;
		var t = "";
		var n = $(this).val().split(" ", 12);
		var columntype = $(this).attr('columntype');
		$.each(n, function(n, r) {
			e = e + parseInt(r);
			t += '<div class="col-'+columntype + r + ' "></div>'
		});
		if (e == 12) {
			$(this).parent().next().children().html(t);
			$(this).parent().parent().find('.drag ').show()
		} else {
			$(this).parent().parent().find('.drag ').hide()
		}
	})
	/**
	 * 删除事件
	 */
	$(".demo").delegate(".remove", "click", function(e) {
		e.preventDefault();
		$(this).parent().remove();
		if (!$(".demo .lyrow").length > 0) {
			clearDemo()
		}
	})
	//setInterval(function() {
	//	handleSaveLayout()
	//}, timerSave);
	
	/**
	 * 绑定配置事件
	 * @param e
	 * @param t
	 */
	$("html").delegate(".configuration > a", "click", function(e) {
		e.preventDefault();
		var t = $('.demo .box-element.select').find('.view').children();
		$(this).toggleClass("active");
		if($(this).attr("rel") != null && ''!=$(this).attr("rel")){
			t.toggleClass($(this).attr("rel"))
		}
	});
	$("html").delegate(".configuration .dropdown-menu a", "click", function(e) {
		e.preventDefault();
		var t = $(this).parent().parent();
		var n = $('.demo .box-element.select').find('.view').children();
		t.find("li").removeClass("active");
		$(this).parent().addClass("active");
		var r = "";
		t.find("a").each(function() {
			r += $(this).attr("rel") + " "
		});
		t.parent().removeClass("open");
		n.removeClass(r);
		n.addClass($(this).attr("rel"))
	})
	$('html').on('click','.demo .box-element',function(){
		$('.demo .box-element').removeClass('select');
		$(this).addClass('select');
	});
})