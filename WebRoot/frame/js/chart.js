(function(window){
	var thisuserid = $('#system_user_id').val();
	var websocket;
	var message = {};
	var allbindusers = {};
	//初始话WebSocket  
	function initWebSocket() {
		if (window.WebSocket) {
			websocket = new WebSocket(encodeURI(webSocketPath + '/message'));
			//连接成功获取所有未读信息
			websocket.onopen = function() {
				//连接成功  
				console.log('(已连接)');
				message.touserid = 123;
				message.content = 123;
			}
			websocket.onerror = function() {
				//连接失败  
				console.log('(连接发生错误)');
			}
			websocket.onclose = function() {
				//连接断开  
				console.log('(已经断开连接)');
			}
			//消息接收  
			websocket.onmessage = function(message) {
				var data = JSON.parse(message.data);
				var type = data.type;
				//有用户登录
				if(type == 'join'){
					var user = data.one;
					$('.chat-to-user-'+user.userid).find('.badge.onlinestatus').removeClass("vd_bg-grey").addClass("vd_bg-green");
				}
				//有用户退出
				else if(type == 'close'){
					var user = data.one;
					$('.chat-to-user-'+user.userid).find('.badge.onlinestatus').removeClass("vd_bg-green").addClass("vd_bg-grey");
				}
				//获取在线用户列表
				else if(type == 'bindusers'){
					$('.chat-system-bind-users').find('.chat-to-user').parent().remove();
					$('.system-bind-users').find('.chat-to-user').parent().remove();
					var list = data.list;
					if(list!=null && list.length > 0){
						$('.vd_chat-menu').show();
						for(var i=0;i<list.length;i++){
							var user = list[i];
							
							allbindusers[user.userid] = user;
							if(user.userid == thisuserid){
								continue;
							}
							var li = $('<li><a href="javascript:;" class="chat-to-user " touserid="'+user.userid+'"><div class="menu-icon">'
									+'<img class="system-user-img" src="'+fileServiceUrl + user.photo +'" />'
									+'<span class="badge status vd_bg-red user-chat-count" style="left: 45px;right: auto;top: 5px;position: absolute;"></span>'
									+'</div>'
									+'<div class="menu-text">'
									+user.nickname
									+'<div class="menu-info">'
									+'<span class="menu-date">心情 </span>'
									+'</div>'
									+'</div>'
									+'<div class="menu-badge">'
									+'<span class="badge status onlinestatus vd_bg-green">&nbsp;</span>'
									+'</div></a></li>');
							for(var n in user){
								if(n!='userid'){
									li.find('.chat-to-user').attr(n,user[n]);
								}
							}
							if(user.onlinestatus != 1){
								li.find('.badge.onlinestatus').removeClass("vd_bg-green").addClass("vd_bg-grey");
							}
							li.addClass('chat-to-user-'+user.userid);
							$('.chat-system-bind-users').append(li.clone());
							$('.system-bind-users').append(li.clone());
						}
					}else{
						var li = $('<li class="group-heading vd_bg-black-20">暂无好友</li>');
						$('.chat-system-bind-users').append(li.clone());
						$('.system-bind-users').append(li.clone());
					}
					
				}
				//获取未读的用户信息
				else if(type == 'unreadusermessagelist'){
					var messagelist = data.messagelist;
					messageUtil.fullChatMessage(messagelist);
				}
				//获取未读的系统信息
				else if(type == 'unreadsystemmessagelist'){
					var messagelist = data.messagelist;
					$('.system-message-system-count').text('');
					if(messagelist == null || messagelist.length < 1){
						$('.system-message-system-count').text('');
						$('.system-message-system-count').hide();
					}else{
						$('.system-message-system-count').text(messagelist.length);
						$('.system-message-system-count').show();
						messageUtil.fullSystemMessage(messagelist);
					}
				}
				//接收消息
				else if(type == 'message'){
					var message = data.one;
					var messages = [message];
					messageUtil.fullChatMessage(messages);
				}
				//获取信息列表
				else if(type == 'unreadmessages'){
					var messages = data.list;
					messageUtil.fullChatMessage(messages);
				}
			}
		}
	};
	if(thisuserid!=null&&thisuserid!=''){
		initWebSocket();
	}
	$('.addBindUser').click(function(){
		var add_nickname = $('.add-nickname').val();
		if(add_nickname == null || add_nickname.length < 1){
			alert('请输入昵称');
			return;
		}
		var action = '/system/user/addBindUser.do';
		var data = {};
		data.nickname = add_nickname;
		base.POST(action,data,'json',function(o){
			var status = o.data;
			if(status && status.rtnCode == 0){
				alert('添加成功！');
				var message = {};
				message.type = "getbindusers";
	            websocket.send(JSON.stringify(message));
			}else{
				alert(status.rtnMsg);
			}
		});
	});
	
	window.messageUtil = {};
	
	window.createChatWindow = function(touserid,nickname,photo){

		var chat_window = $('.chat_window_' + touserid);
		
		
		if(chat_window.length < 1){
			chat_window = $('.system-chat-window').clone();
			chat_window.addClass('chat_window');
			chat_window.removeClass('system-chat-window');
			chat_window.addClass('chat_window_' + touserid);
			chat_window.find('.nickname').text(nickname);
			chat_window.find('.photo').attr('src',fileServiceUrl + '/' + photo);
			$('.chat-user-list').before(chat_window);
			chat_window.find('.send-message').attr('touserid',touserid);
			chat_window.show();
			base.initNotFindImg();
		}
		chat_window.attr('touserid',touserid);
		
		var canshowcount = 5;
		if($('html').width()<800){
			canshowcount = 3;
		}
		var ws = $('.chat_window');
		$('.chat_window').hide();
		var thisshowcount = 0;
		var hasthisw = false;
		var lastw = null;
		for(var index=0;index<ws.length;index++){
			var w = $(ws[index]);
			var thistouserid = w.attr('touserid');
			if(touserid == thistouserid){
				hasthisw = true;
			}
			thisshowcount++;
			w.show();
			lastw = w;
			if(thisshowcount >= canshowcount){
				break;
			}
		}
		if(!hasthisw){
			lastw.hide();
		}
		//如果屏幕小于500则删除其它聊天窗口
		if($('html').width()<500){
			$('.chat_window').hide();
		}
		
		chat_window.show();
		return chat_window;
	};

	$('html').on('click','.chat-to-user',function(){
		var touserid = $(this).attr('touserid');
		var nickname = $(this).attr('nickname');
		var photo = $(this).attr('photo');
		var chat_window = createChatWindow(touserid,nickname,photo);

		chat_window.find('[data-action^="click-trigger"]').removeClass('open');
		chat_window.find('[data-action^="click-trigger"]').click();
		
	});
	messageUtil.sendMessage = function(touserid,message_text){
		if(message_text!=null && message_text!=''){
			var message = {};
			message.touserid = touserid;
			message.content = message_text;
			message.type = "sendtouser";
            websocket.send(JSON.stringify(message));
		}
	};

	window.bindSendMessage = function(){
		$('html').on('click','.send-message',function(){
			var touserid = $(this).attr('touserid');
			var message_text = $(this).parent().parent().find('.message-text').val();
			messageUtil.sendMessage(touserid,message_text);
			$(this).parent().parent().find('.message-text').val('');
		});
		$('html').on('keyup','.message-text',function(){
			var e = event;
			if(e.keyCode == 13){
				$(this).parent().parent().find('.send-message').click();
				$(this).val('');
			}
		});
	};
	bindSendMessage();
	
	messageUtil.fullChatMessage = function(messagelist){
		for(var m=0;m<messagelist.length;m++){
			var message = messagelist[m];
			messageUtil.addChatMessage(message);
		}
		var allcount = $('.system-message-chat-count').text();
		if(allcount == null || allcount == ''){
			allcount = 0;
		}
		allcount = Number(allcount);
		//单个用户未读信息展示
		if(messagelist.length > 0){
			var usermessagecounts = {};
			for(var m=0;m<messagelist.length;m++){
				var message = messagelist[m];
				var fromuserid = message.fromuserid;
				if(fromuserid != thisuserid){
					if(usermessagecounts[fromuserid] == null){
						usermessagecounts[fromuserid] = 1;
					}else{
						usermessagecounts[fromuserid] = usermessagecounts[fromuserid] + 1;
					}
				}
			}
			for(var fromuserid in usermessagecounts){
				var count = usermessagecounts[fromuserid];
				var chat_window_count = $('.chat_window_'+fromuserid).find('.user-chat-count');
				var chat_user_count = $('.chat-to-user-'+fromuserid).find('.user-chat-count');
				var oldcount = chat_window_count.text();
				if(oldcount == null || oldcount == ''){
					oldcount = 0;
				}
				oldcount = Number(oldcount);
				//判断是否打开了窗口
				if($('.chat_window_'+fromuserid).find('a.open').length<1){
					count+=oldcount;
				}else{
					count = 0;
				}
				allcount+=count;
				chat_window_count.text(count);
				chat_user_count.text(count);
				if(count>0){
					chat_user_count.show();
					chat_window_count.show();
				}else{
					chat_user_count.hide();
					chat_window_count.hide();
				}
			}
		}
		//信息条数展示
		$('.system-message-chat-count').text(allcount);
		if(allcount>0){
			$('.system-message-chat-count').show();
		}else{
			$('.system-message-chat-count').hide();
		}
	};
	
	var getUserInfo = function(userid){
		return allbindusers[''+userid];
	}
	messageUtil.addChatMessage = function(message){
		
		if($('.message-li-' + message.messageid).length>0){
			return;
		}
		var touser = getUserInfo(message.touserid);
		var fromuser = getUserInfo(message.fromuserid);
		var chat_window = null;
		if(message.fromuserid == thisuserid){
			chat_window = createChatWindow(touser.userid,touser.nickname,touser.photo);
		}else{
			chat_window = createChatWindow(fromuser.userid,fromuser.nickname,fromuser.photo);
		}
		var usermessagelistul = chat_window.find('.user-message-list');
		var messageLi = $;
		//自己发的信息
		if(message.fromuserid == thisuserid){
			messageLi = $(toMessageStr);
			messageLi.find('.photo').attr('src',baseFilePath + fromuser.photo);
		}else{
			messageLi = $(fromMessageStr);
			messageLi.find('.photo').attr('src',baseFilePath + fromuser.photo);
		}
		messageLi.attr('touserid',touser.userid);
		messageLi.find('.content').text(message.content);
		messageLi.find('.menu-date').text(initDateTime(message.createtime));
		messageLi.attr('messageid',message.messageid);
		messageLi.attr('state',message.state);
		messageLi.addClass('message-li');
		messageLi.addClass('message-li-' + message.messageid);
		usermessagelistul.append(messageLi);
		usermessagelistul.get(0).scrollTop = usermessagelistul.get(0).scrollHeight;
		base.initNotFindImg();
	};
	messageUtil.updateUnreadState = function(){
		//设置打开的窗口为已读
		
		var chat_windows = $('.chat_window');
		for(var i=0;i<chat_windows.length;i++){
			var chat_window = $(chat_windows.get(i));
			if(chat_window.find('a.open').length > 0){
				var touserid = chat_window.attr('touserid');
				var from_lis = chat_window.find('.from-li');
				var messageidstr = '';
				var count = 0;
				for(var m=0;m<from_lis.length;m++){
					var from_li = $(from_lis.get(m));
					if(from_li.attr('state') == 1){
						messageidstr += from_li.attr('messageid') + ",";
						from_li.attr('state',2);
						count++;
					}
				}

				if(messageidstr == null || messageidstr == ''){
					continue;
				}
				var allcount = $('.system-message-chat-count').text();
				if(allcount == null || allcount == ''){
					allcount = 0;
				}
				allcount = Number(allcount);
				allcount-=count;
				var chat_window_count = $('.chat_window_'+touserid).find('.user-chat-count');
				var chat_user_count = $('.chat-to-user-'+touserid).find('.user-chat-count');
				chat_window_count.text('0');
				chat_user_count.text('0');
				chat_window_count.hide();
				chat_user_count.hide();
				$('.system-message-chat-count').text(allcount);
				if(allcount>0){
					$('.system-message-chat-count').show();
				}else{
					$('.system-message-chat-count').hide();
				}
				//修改已读信息状态
				var message = {};
				message.type = "readmessage";
				message.messageidstr = messageidstr;
			    websocket.send(JSON.stringify(message));
			}
			
		}
	};
	$('html').on('click','.chat-to-user',function(){
		window.setTimeout(function(){
			//设置打开的窗口为已读
			messageUtil.updateUnreadState();
		}, 200);
	});
	$('html').on('click','.chat_window .mega-icon .system-user-img',function(){
		window.setTimeout(function(){
			//设置打开的窗口为已读
			messageUtil.updateUnreadState();
		}, 200);
	});
	$('html').on('focus','.chat_window .message-text',function(){
		window.setTimeout(function(){
			//设置打开的窗口为已读
			messageUtil.updateUnreadState();
		}, 200);
	});
})(window);

var fromMessageStr = ('<li class="from-li"><a href="#"><div class="menu-icon">'
		+'<img class="system-user-img photo" src=""/>'
		+'</div><div class="menu-text">'
		+'<span class="content"></span>'
		+'<div class="menu-info">'
		+'<span class="menu-date"></span>'
		+'</div></div></a></li>');
var toMessageStr = ('<li class="align-right to-li"><a href="#"><div class="menu-icon">'
		+'<img class="system-user-img photo" src=""/>'
		+'</div><div class="menu-text">'
		+'<span class="content"></span>'
		+'<div class="menu-info">'
		+'<span class="menu-date"></span>'
		+'</div></div></a></li>');
