/*****************************************************************
Table of Contents

1.) Document Ready State
	- Initialize
	- Back Top
	- Tags Input
	- Tool Tips	
	- Pop Over
	- Pretty Photo
	- Data Tables
	- Custom Scrollbar
	- Mega Menu Hover Checking
	- Resize Screen Checking
	- Menu Size Button
	- Content Resizing
	- Sub Menu of Top Menu Button
	- Open Menu Trigger
	- Expand Tree Menu Button
	- Custom Input Wrapper
	- Widget Minimize Button
	- Widget Close Button
	- Widget Refresh Button
	- Chat Close Button
	- Notification Button
	- Sticky Menu
	
	

!Note: You can search using the title above
*****************************************************************/
// 计算高度函数
window.calculateContentHeight = function(){
	var height=$('.vd_navbar-left .navbar-tabs-menu').height() + $('.vd_navbar-left .navbar-menu').height() + $('.vd_navbar-left .navbar-spacing').height()  + 8;
	var height_right=$('.vd_navbar-right .navbar-tabs-menu').height() + $('.vd_navbar-right .navbar-menu').height() + $('.vd_navbar-right .navbar-spacing').height()  + 8;			
	var minh = (height > height_right ) ? height : height_right;
	var body_height = $(window).height() - 	$('#header').height();
	var minh = (minh > body_height ) ? minh : body_height;
	$('.container>.vd_content-wrapper').css('min-height', minh );
};
			
/* Document Ready State. 
   Used: Global */	
jQuery(document).ready(function($)
	{
		"use strict";
		
		var phone_width = 464;		
		var tablet_width = 751;
		var desktop_width = 975;
		
		/* Initialize 
		   Used: On Application Init
		*/
		initialize();
		
		function initialize(){
			// Nav-toggle Active
			if ($('body').hasClass('nav-medium')) {
				$('[data-action^="nav-medium"]').addClass('active');
			}
			if ($('body').hasClass('nav-small')) {
				$('[data-action^="nav-small"]').addClass('active');
			}	
			
			calculateContentHeight();
	
			if ($(window).width() <= desktop_width ) {
				checkWindowTablet();
			}else{
				checkWindowDesktop();
			};
			checkStickyMenu();
			checkBackTop();
			checkMegaMenu();
		}
		/* 返回顶部 */		
		$('[data-action^="backtop"]').click(function(e){
				e.preventDefault();
				$('body,html').animate({scrollTop:0},800);
		});		
		
		$('[data-toggle^="tooltip"]').tooltip();
		
		$('[data-toggle^="popover"]').popover();
		
/*
		 自定义滚动条
		$('html.no-touch [data-rel^="scroll"]').mCustomScrollbar({
			  set_height: function(){$(this).css('max-height',$(this).data('scrollheight')); return $(this).data('scrollheight'); },
			  mouseWheel:"auto",   
			  autoDraggerLength:true,  			
			  autoHideScrollbar:true,
			  advanced:{  
				updateOnBrowserResize:true,   
				updateOnContentResize:true   
			  }, // removed extra commas 
		});
		$('html.touch [data-rel^="scroll"]').css({
			'height' : function(){return($(this).data('scrollheight')) },
			'max-height': function(){return($(this).data('scrollheight')) },
			'overflow-y' :'scroll',
		});		
		*/
		
		/* 兆丰菜单悬停检查*/
		$( window ).resize(function() {
			checkMegaMenu();
		});	
				
		function checkMegaMenu(){
			if ($(window).width() <= tablet_width ) {		
				$('.vd_mega-menu .hover-target').removeClass('hover-target').addClass('hover-target-temp');			
			} else {
				$('.vd_mega-menu .hover-target-temp').removeClass('hover-target-temp').addClass('hover-target');							
			}
			
		}

		/* 调整屏幕检查*/
		function checkWindowTablet(){
				if ($('body').hasClass('no-responsive')){
					return(false);
				}
				if (!$('body').hasClass('nav-left-hide')) {
					$('body').addClass('nav-left-hide');
				}
				if (!$('body').hasClass('nav-right-hide')) {	
					$('body').addClass('nav-right-hide');
				}			
				$('body').removeClass('remove-navbar');
				$('body').removeClass('remove-header');
				$('body').removeClass('fullscreen');	
				resizeAffixPanel();
		}
		function checkWindowDesktop(){
				if ($('body').hasClass('no-responsive')){
					return(false);
				}
				if ($('body').hasClass('nav-left-hide') ) {	
					if (!$('body').hasClass('nav-left-start-hide')){
						$('body').removeClass('nav-left-hide');								
					} else{
						$('body').addClass('nav-left-hide');					
					}
				}
				if ($('body').hasClass('nav-right-hide')) {	
					if (!$('body').hasClass('nav-right-start-hide')){
						$('body').removeClass('nav-right-hide');
					} else{
						$('body').addClass('nav-right-hide');						
					}
				}			
				$('body').removeClass('remove-navbar');
				$('body').removeClass('remove-header');
				$('body').removeClass('fullscreen');	
				resizeAffixPanel();									
		}
		
		if ($("body").hasClass('responsive')){		

			$(window).setBreakpoints({
				breakpoints: [480, 751, 975]
			});
			$(window).bind('exitBreakpoint751', function () {
				$(window).bind('enterBreakpoint480', function () {
						checkWindowTablet();
				});
			});
			
			$(window).bind('exitBreakpoint480', function () {
				$(window).bind('enterBreakpoint751', function () {
					checkWindowTablet();
				});
			});		
			
			$(window).bind('exitBreakpoint751', function () {
				$(window).bind('enterBreakpoint975', function () {
					checkWindowDesktop();
				});
			});	
			
			$(window).bind('exitBreakpoint975', function () {
				$(window).bind('enterBreakpoint751', function () {
					checkWindowTablet();
	
				});
			});			
		}



		/* Widget Minimize Button
		   Used: < data-action="minimize" > in panel widget   */
		$('html').on('click','[data-action^="minimize"]',function(e){
			if ($(this).hasClass('active')){
				$(this).removeClass('active');
				$(this).closest(".widget").children('.panel-body, .panel-body-list').slideDown('fast');	
			} else{
				$(this).addClass('active');
				$(this).closest(".widget").children('.panel-body, .panel-body-list').slideUp('fast');	
			}			
		});	
		/* 菜单大小按钮 */

		$('html').on('click','[data-action^="nav-left-medium"]',function(e){
			navbarResize('left','medium');		
			resizeAffixPanel();															
		});					
		$('html').on('click','[data-action^="nav-left-small"]',function(e){
			navbarResize('left','small');	
			resizeAffixPanel();																		
		});	

		$('html').on('click','[data-action^="nav-right-medium"]',function(e){
			navbarResize('right','medium');	
			resizeAffixPanel();																		
		});					
		$('html').on('click','[data-action^="nav-right-small"]',function(e){
			navbarResize('right','small');	
			resizeAffixPanel();																	
		});															
		$('html').on('click','[data-action^="toggle-navbar-left"]',function(e){	
			toggleNavbar('left');			
			resizeAffixPanel();							
		});			
		$('html').on('click','[data-action^="toggle-navbar-right"]',function(e){
			toggleNavbar('right');			
			resizeAffixPanel();										
		});			
		
		
		function navbarResize(direction, size){
			var opposite= (size=="small")? "medium":"small"
			// if nav size state
			if ($('body').hasClass('nav-'+direction+'-'+size)){
				$('body').removeClass('nav-'+direction+'-'+size);
				if (size=='small' && $('body').hasClass('enlarge-'+direction+'-to-medium')){
					$('body').addClass('nav-'+direction+'-medium');				
				}
			// if nav normal 			
			} else {
				$('body').removeClass('nav-'+direction+'-'+opposite);		
				$('body').addClass('nav-'+direction+'-'+size);											
			}			
			$('.vd_navbar-'+direction+' .navbar-tabs-menu .menu-container').removeAttr('style');	
			$('.vd_navbar-'+direction+' .navbar-tabs-menu [data-action^="expand-navbar-tabs-menu"] .badge').removeAttr('style');				
			
		}
	
		function toggleNavbar(direction){
			var opposite= (direction=="left")? "right":"left";
			$('body').removeClass('remove-navbar');	
			$('body').removeClass('fullscreen');
						
			// if nav-direction is hiding	
			if ($('body').hasClass('nav-'+direction+'-hide')) {				
				$('body').removeClass('nav-'+direction+'-hide');
//				navToggle(direction, "show");							
				// if there is nav-opposite AND (nav-direction start with hiding OR smaller screen)
				if (!$('body').hasClass('no-nav-'+opposite) && !$('body').hasClass('nav-'+opposite+'-hide') && ($('body').hasClass('nav-'+direction+'-start-hide') || $(window).width() < desktop_width) ){					
//					navToggle(opposite, "hide");					
					$('body').addClass('nav-'+opposite+'-hide');			
				}																
			}	else	
			// if nav-opposite is hiding					
			if ($('body').hasClass('nav-'+opposite+'-hide') && $(window).width()>= desktop_width ){
				$('body').removeClass('nav-'+opposite+'-hide');	
				$('body').addClass('nav-'+direction+'-hide');									
			}  else {												
				$('body').addClass('nav-'+direction+'-hide');				
			}				
		}		

		$('html').on('click','.navbar-tabs-menu [data-action^="expand-navbar-tabs-menu"]',function(e){
			$(this).next().animate({width:'toggle', opacity:'toggle'},300,"swing");
			$(this).find(".badge").toggle('fast');			
		});
						

		/* 内容调整大小*/
		$('html').on('click','.vd_container',function(e){
			if ($(window).width() <= desktop_width){	
				if (!$('body').hasClass('nav-right-hide')){		
					toggleNavbar('right');			
					resizeAffixPanel();						
				} else if (!$('body').hasClass('nav-left-hide')){
					toggleNavbar('left');			
					resizeAffixPanel();						
				}
				
			} 
		});		
	    // 贴上设置功能 	  
	    function resizeAffixPanel(){
		    $('.sidebar-affix .panel').css('width',($('.vd_content-section').innerWidth()-114)/3+'px');
		    if ($(window).width()<=tablet_width)	{
				  $('.sidebar-affix .panel').removeAttr('style');		  
		    }
	    }

		
		
		// 内容调整大小按钮
		$('html').on('click','[data-action^="remove-navbar"]',function(e){
//			$(this).siblings().removeClass('active');
			// if remove-navbar state				
			if ($('body').hasClass('remove-navbar')){
				$('body').removeClass('remove-navbar');	
				if (!$('body').hasClass('nav-left-start-hide')){
					$('body').removeClass('nav-left-hide');	
				};	
				if (!$('body').hasClass('nav-right-start-hide')){
					$('body').removeClass('nav-right-hide');					
				};
					
//				$('[data-action^="remove-navbar"]').removeClass('active');								
			// if nav normal state			
			} else {
				$('body').removeClass('fullscreen');	
				$('body').removeClass('remove-header');							
				$('body').addClass('remove-navbar');
				$('body').addClass('nav-left-hide');	
				$('body').addClass('nav-right-hide');					
//				$('[data-action^="remove-navbar"]').addClass('active');								
			}				
		});	
		$('html').on('click','[data-action^="remove-header"]',function(e){
//			$(this).siblings().removeClass('active');
			// if remove-navbar state				
			if ($('body').hasClass('remove-header')){
				$('body').removeClass('remove-header');	
//				$('[data-action^="remove-header"]').removeClass('active');								
			// if nav normal state			
			} else {
				$('body').removeClass('fullscreen');
				$('body').removeClass('remove-navbar');
				if (!$('body').hasClass('nav-left-start-hide')){
					$('body').removeClass('nav-left-hide');	
				};	
				if (!$('body').hasClass('nav-right-start-hide')){
					$('body').removeClass('nav-right-hide');					
				};											
				$('body').addClass('remove-header');	
//				$('[data-action^="remove-header"]').addClass('active');								
			}				
		});	
		$('html').on('click','[data-action^="fullscreen"]',function(e){
//			$(this).siblings().removeClass('active');
			// if remove-navbar state				
			if ($('body').hasClass('fullscreen')){
				$('body').removeClass('fullscreen');	
				if (!$('body').hasClass('nav-left-start-hide')){
					$('body').removeClass('nav-left-hide');	
				};	
				if (!$('body').hasClass('nav-right-start-hide')){
					$('body').removeClass('nav-right-hide');					
				};			
//				$('[data-action^="fullscreen"]').removeClass('active');								
			// if nav normal state			
			} else {
				$('body').removeClass('remove-header');
				$('body').removeClass('remove-navbar');									
				$('body').addClass('fullscreen');	
				$('body').addClass('nav-left-hide');	
				$('body').addClass('nav-right-hide');				
//				$('[data-action^="fullscreen"]').addClass('active');								
			}				
		});	
		
		$('html').on('click','[data-action^="boxedtofull"]',function(e){
			if ($('body').hasClass('boxed-layout')){
				$('body').removeClass('boxed-layout');
				$('body').addClass('full-layout');	
				$('[data-action^="boxedtofull"]').addClass('active');							
			}
			else if ($('body').hasClass('full-layout')){
				$('body').removeClass('full-layout');
				$('body').addClass('boxed-layout');	
				$('[data-action^="boxedtofull"]').removeClass('active');								
			}									
		});


		
		/* 的顶部菜单按钮子菜单。*/	
		$('html').on('click','[data-action^="submenu"]',function(e){
			// if submenu state				
			if ($('body').hasClass('submenu')){
				$('body').removeClass('submenu');														
			} else {								
				$('body').addClass('submenu');						
			}				
		});	
		


		
		/* 打开菜单触发*/			
		$('html').on('click','[data-action^="click-trigger"]',function(e){
			e.preventDefault();
			if ($(this).parent().hasClass("hover-trigger") && $(this).siblings().hasClass("hover-target")){
				return(0);
			}			
			// check if not children of click-target then slideup
			if ( $(this).parent().parent().parent().data("action") != "click-target" && $(this).parent().parent().parent().parent().parent().data("action") != "click-target"    )  {
				$('[data-action^="click-target"]').slideUp('fast',  function(){calculateContentHeight();														
					});				
			} else{
			// check if children of click-target then slideup all the parent kids
				$(this).parent().siblings().children('[data-action^="click-trigger"]').removeClass('open');	
				$(this).parent().siblings().children('[data-action^="click-target"]').slideUp('fast',  function(){calculateContentHeight();
					});
			}
			// if this is close
			if (! $(this).hasClass('open')){


				if ($(this).parent().parent().parent().data("action") != "click-target"){
					$('[data-action^="click-trigger"]').removeClass('open');
				};
				$(this).addClass('open');
				$(this).parent().children('[data-action^="click-target"]').slideDown('fast',  function(){
					calculateContentHeight();					
					
				});	
				
			// if this is open			
			} else {
				$(this).removeClass('open');
				// check if children of click-target then slideup				
				//if ($(this).parent().parent().parent().data("action") == "click-target"){
					$(this).parent().children('[data-action^="click-target"]').slideUp('fast',  function(){calculateContentHeight(); });				
				//}				
			}
			$('body').removeClass('expand-all');							
		});		
								
		// 点击之外的点击目标			
		$(document).click(function(event) {
			 if (( $(event.target).closest('[data-action^="click-trigger"]').get(0) == null ) && ( $(event.target).closest('[data-action^="click-target"]').get(0) == null ) && ( $(event.target).closest('[data-action^="expand-all"]').get(0) == null)) { 
				 
				 var tarGets = $('[data-action^="click-target"]');
				 for(var i=0;i<tarGets.length;i++){
					 var tarGet = $(tarGets[i]);
					 if(tarGet.closest('.system_menu').length<1){
						 tarGet.hide();
						 tarGet.removeClass('open');	
					 }
				 }
	 			 $('body').removeClass('expand-all');				 			 
				 calculateContentHeight();
			}			
		});
		
		
		
		/* 展开树状菜单按钮*/			
		$('[data-action^="expand-all"]').click(function() {
			$('[data-action^="click-target"]').slideUp('fast',  function(){
					calculateContentHeight();					
					
			});								
			$('[data-action^="click-trigger"]').removeClass('open');					
			if ($('body').hasClass('expand-all')){
				$('body').removeClass('expand-all');																	
			// if nav normal state			
			} else {
				$(this).closest('.navbar-menu').find('.vd_menu .child-menu').slideDown('fast',  function(){
					calculateContentHeight();					
					
				}).find('[data-action^="click-trigger"]').addClass('open');						
				$('body').addClass('expand-all');					
			}						
		});	
		
		
				
		/* 自定义输入包装*/			
    	$('.vd_input-wrapper input').blur(function(){
    			$(this).parent(".vd_input-wrapper").removeClass("focus");
    	})
             .focus(function() {		
    	        $(this).parent(".vd_input-wrapper").addClass("focus");
    	});		
		

		/* 小部件最小化按钮*/	
		$('[data-action^="minimize"]').click(function() {
			if ($(this).hasClass('active')){
				$(this).removeClass('active');
				$(this).closest(".widget").children('.panel-body, .panel-body-list').slideDown('fast');	
			} else{
				$(this).addClass('active');
				$(this).closest(".widget").children('.panel-body, .panel-body-list').slideUp('fast');	
			}			
		});	
		
		$('html').on('click','[data-action^="close"]',function(e){
			$(this).closest(".widget").hide();	
		});

		$('html').on('click','[data-action^="refresh"]',function(e){
			$(this).closest(".widget").block({ 
				message: '<h2><i class="fa fa-spinner fa-spin vd_green"></i></h2>',
				css: { 
					border: 'none', 
					padding: '15px', 
					background: 'none',
				},
				overlayCSS: { backgroundColor: '#FFF' },
				timeout: 2000 
			}); 
		});		
		

		$('html').on('click','[data-action^="chat-close"]',function(e){
			$('.system-chatmenu').hide();
			$('.chat_window').hide();
			$('.chat-user-list').hide();
			$('.chat-menu-open').show();
			$('.chat-menu-close').hide();
		});		


		$('html').on('click','[data-action^="chat-open"]',function(e){
			$('.system-chatmenu').show();
			$('.chat_window').show();
			$('.chat-user-list').show();
			$('.chat-menu-close').show();
			$('.chat-menu-open').hide();
		});	

		$('html').on('click','[data-action^="notification"]',function(e){
			e.preventDefault();
			position=$(this).data('position');
			type=$(this).data('type');
			icon=$(this).data('icon');
			title=$(this).data('title');
			message=$(this).data('message');
			
			notification(position,type,icon,title,message);
			
		});	
		

		/* Sticky Menu. 
		   Used: Global */	
		var headerHeight = $("header").height();
		var submenuHeight = 0;

		function checkStickyMenu(){
			if ( !$("body").hasClass("nav-top-fixed") || $("body").hasClass("boxed-layout")) return(false);
		
			if($(window).scrollTop() > headerHeight-submenuHeight   &&  $(window).width() >= desktop_width){
				// #Back-Top visible
				
				if($("body").hasClass("sticky-menu-active"))
					return false;
				$("body").addClass("sticky-menu-active");
				if(!$("body").hasClass("fullscreen") && !$("body").hasClass("remove-header")){
					$("body").css('padding-top',headerHeight);		
				}
				$('.header').css({
							top: -headerHeight,
							opacity:'.5',
							transition: 'none',
						}).stop(true, true).animate({
							top: 0,
							opacity: '1'
					}, 1000, function(){
						$('.header').removeAttr('style');
						// Animation complete.
				});			
			} else if( $(window).scrollTop() <= 0||  $(window).width() < desktop_width){
				if ($("body").hasClass("sticky-menu-active")){
					$("body").css('padding-top',0);
					$("body").removeClass("sticky-menu-active");
					$("body").removeAttr('style');
				}
			}
		}		
		
		function checkBackTop(){
			if($(window).scrollTop() > headerHeight-submenuHeight){
				$('#back-top').addClass('visible');
			}  else if( $(window).scrollTop() <= 0 ){
				$('#back-top').removeClass('visible');		
			}
		}		
		$(window).on("scroll", function(){
				checkStickyMenu();	
				checkBackTop();			
		});
		$(window).on("resize", function(){
				checkStickyMenu();
				checkBackTop();
		});

		//$('[data-toggle^="tooltip"]').tooltip(); 
		
});


// Device Touch Support Checker
function isTouch() {
	return $('html').hasClass('touch') ? 1 : 0
}

function isMobile() {
	return $('html').hasClass('mobile') ? 1 : 0
}
function isPhone() {
	return $('html').hasClass('phone') ? 1 : 0
}
function isTablet() {
	return $('html').hasClass('tablet') ? 1 : 0
}

// Scroll To Function
/*function scrollTo(element, offset) {
	pos = element ? $(element).offset().top : 0;
	$('html,body').animate({
		scrollTop: pos + (offset ? offset : 0)
	}, 'slow');
}*/

var stack_topleft = {"dir1": "down", "dir2": "right", "push": "bottom"};
var stack_topright = {"dir1": "down", "dir2": "left", "push": "bottom"};
var stack_bottomleft = {"dir1": "up", "dir2": "right", "push": "bottom"};
var stack_bottomright = {"dir1": "up", "dir2": "left", "push": "bottom"};

			
function notification(position, notif_type,icon_class,notif_title,notif_text){
	var output_title, output_stack;
	if (notif_title==""){output_title="";} else {
		output_title='<h5><strong>'+notif_title+'</strong></h5>';							
	};
	
	switch (position) {
		case 'topright' : output_stack = stack_topright; break;
		case 'topleft' : output_stack = stack_topleft; break;
		case 'bottomright' : output_stack = stack_bottomright; break;
		case 'bottomleft' : output_stack = stack_bottomleft; break;																
	}

	
	$.pnotify({
//				title: 'My Title',
		title_escape: true,
		text: '<div class="content-list content-image"><div class="list-wrapper mgtp-10 mgbt-xs-10"><div><div class="menu-icon"><i class="'+icon_class+'"></i></div> <div class="menu-text">'+output_title+'<p class="lh-sm">'+notif_text+'</p> </div></div></div></div>',
		cornerclass: '',
		type: notif_type,
		icon: 'false',
		width: '320px',
		closer_hover: false,
		sticker: true,
		opacity: 1,
		animation: {
			effect_in: 'shake',
			effect_out: 'fade'
		},
		addclass: 'stack-'+position,
		stack: output_stack			
		
	});		
}