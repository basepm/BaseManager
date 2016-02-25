(function(){
	
	window.frame = window.frame == null?{}:window.frame;
	
	window.frame.init = function(){
		frame.pageInofInit();
	};

	window.frame.pageInofInit = function(){
		var SYSTEM_USER_INFO_STR = $('#SYSTEM_USER_INFO_STR').val();
		if(SYSTEM_USER_INFO_STR!=null&&SYSTEM_USER_INFO_STR.length<=0){
			return;
		}
		var user = eval('('+SYSTEM_USER_INFO_STR+')');
		if (user != null) {
			var showstr = '欢迎您，游客';
			if(user.username == null || user.username == ''){
				if(user.nickname == null || user.nickname == ''){
					showstr = user.phone;
				}else{
					showstr = user.nickname;
				}
			}else{
				showstr = user.username;
			}
			$('#system_user_id').val(user.userid);
			$('.usershowinfo').html(showstr);
			$('.nousershouldhidden').show();
			$('.nousershouldshow').remove();
		}else{
			$('.nousershouldhidden').remove();
			$('.nousershouldshow').show();
			$('.system-chatmenu').hide();
		}
		base.initNotFindImg();
		initSystemMenu();
	};

	/**
	 * 初始化菜单
	 */
	function initSystemMenu(){
//		var menu_set_type = $('body').attr('menu_set_type');
		var BASE_USER_MENUS_STR = $('#BASE_USER_MENUS_STR').val();
		if(BASE_USER_MENUS_STR!=null&&BASE_USER_MENUS_STR.length<=0){
			return;
		}
		var menus = eval('('+BASE_USER_MENUS_STR+')');
		var width = $('body').width();
		if(menus!=null && menus.length > 0){
			window.usermenus = menus;
			var index = 0;
			//组合顶部菜单
			for(var i=0;i<menus.length;i++){
				var menu = menus[i];
				if(menu.parentid == null || menu.parentid == ''){
					var topMenu = $('<li class="one-icon mega-li " menuid="'+menu.menuid+'"><a class="">'+menu.menuname+'</a></li>');
					
					$(topMenu).click(function(){
						var menuid = $(this).attr('menuid');

						window.localStorage.setItem("thismenuid",menuid);
						initMenusByParentid(menuid);
					});
					$('.system-top-menu').append(topMenu);
					if(index==0){
						index++;
						if(window.localStorage.getItem('thismenuid')!=null){
							var menuid = window.localStorage.getItem('thismenuid');
							initMenusByParentid(menuid);
						}else{

							initMenusByParentid(menu.menuid);
						}
					}
				}
			}
		}
	}
	function initMenusByParentid(menuid){
		if(window.usermenus!=null && window.usermenus.length > 0){
			var menus = [];
			fullSubMenu(menus, menuid);
			initBigMenu(menus);
		}
	}
	function fullSubMenu(menus, menuid){
		menus = menus == null?[]:menus;
		for(var i=0;i<window.usermenus.length;i++){
			var menu = window.usermenus[i];
			if(menu.parentid == menuid){
				menus[menus.length] = menu;
				fullSubMenu(menus, menu.menuid)
			}
		}
	}
	
	function initBigMenu(menus){
		$('.system_top_menu').hide();
		$('.system_left_menu_top').show();
		$(".system_menu").html('');
		if(menus!=null && menus.length > 0){
			var datas_ = menus;
			var obj_ = $(".system_menu");
			var addClick = function(){
				
			};

			var buildNodes = function(){
				for(var i=0;i<datas_.length;i++){
					var data = datas_[i];
					if(isTopData(data)){
						addNode(obj_,i,1);
					}
				}
			};
			function isTopData(data){
				for(var i=0;i<datas_.length;i++){
					var data_ = datas_[i];
					if(data_.menuid == data.parentid){
						return false;
					}
				}
				return true;
			}

			var addNode = function(nodeP,index,leveindex){
				var data = datas_[index];
				
				if(haveSubNode(index)){
				
					var node = $('<li id="menu_li_'+data.menuid+'"></li>');
					if(isTopData(data)){
						node.append('<a href="javascript:;" class="dropdown-toggle menu_'+data.menuid+'" data-action="click-trigger">'
								+'<span class="menu-icon" style="line-height: 25px;"><i class="fa '+data.menuicon+'"></i></span><span class="menu-text">'+data.menuname+'</span>'
								+'<span class="menu-badge"><span class="badge vd_bg-black-30"><i class="fa fa-angle-down"> </i></span></span></a>');
							
					}else{
						node.append('<a href="javascript:;" class="dropdown-toggle menu_'+data.menuid+'" data-action="click-trigger">'
								+'<span class="menu-text">'+data.menuname+'</span>'
								+'<span class="menu-badge"><span class="badge vd_bg-black-30"><i class="fa fa-angle-down"> </i></span></span></a>');
							
					}
					node.append('<div class="child-menu" data-action="click-target"><ul class="clearfix"></ul></div>');
					nodeP.append(node);
					node = node.find('ul');
					for(var i=0;i<datas_.length;i++){
						if(datas_[i].parentid == data.menuid){
							var leveindex_ = leveindex + 1;
							addNode(node,i,leveindex_);
						}
					}
				}else{
					var node;
					if(isTopData(data)){
						node = $('<li id="menu_li_'+data.menuid+'"><a href="javascript:;" class="toActionBtn " toAction="'+data.doaction+'" actionData="&selectmenuid='+data.menuid+'">'
								+'<span class="menu-icon" style="line-height: 25px;"><i class="fa '+data.menuicon+'"></i></span><span class="menu-text">'+data.menuname+'</span></a></li>');
								
					}else{
						node = $('<li id="menu_li_'+data.menuid+'"><a href="javascript:;" class="toActionBtn " toAction="'+data.doaction+'" actionData="&selectmenuid='+data.menuid+'">'
								+'<span class="menu-text">'+data.menuname+'</span></a></li>');
					}
					nodeP.append(node);		
					node.click(function(){
						// Active Menu
						$('.system_menu').find('li').removeClass('active');
						$('.system_menu').find('.menu-active').remove();
						$(this).addClass('active');
						$(this).find('a').append('<span class="menu-active"><i class="fa fa-caret-right"></i></span>');
					});
				}
			};
			var haveSubNode = function(index){
				var data = datas_[index];
				for(var i=0;i<datas_.length;i++){
					if(datas_[i].parentid == data.menuid){
						return true;
					}
				}
				return false;
			};

			buildNodes();
			addClick();
		}
		$('body').attr('menu_set_type','big');
	}

	var pageInit = function(){
		var action = '';
		var hash = ''+window.location.hash;
		if(hash != '' && hash.length>7 ){
			action = hash.replace("#action=", "");
			base.toPageByHash(action,function(){
			});
		}else{
			var url = window.location.href;
			var port = window.location.port;
			var hostname = window.location.hostname;
			if(basePath.indexOf('http')>=0){
				action = url.split(basePath)[1];
			}else{
				if(port && port!=null && port>0){
					action = url.split(hostname+':'+port+basePath)[1];
				}else{
					action = url.split(hostname+basePath)[1];
				}
			}
			if(action == null || action.length<1 || action == '/'){
				action = '/index/toIndex.do';
			}
			base.getAction(action, {});
		}
	};
	pageInit();
	frame.init();
})(window);

