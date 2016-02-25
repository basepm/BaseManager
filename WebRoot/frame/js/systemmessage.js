(function(window){
	var thisuserid = $('#system_user_id').val();
	var websocket;
	var message = {};
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
				var content = data.content;
				console.log(data);
				//有用户登录
				if(type == 'join'){
					var user = data.user;
				}
				//获取在线用户列表
				else if(type == 'bindusers'){
					$('.chat-system-bind-users').find('.chat-to-user').remove();
					$('.system-bind-users').find('.chat-to-user').remove();
					var list = data.list;
					if(list!=null && list.length > 0){
						$('.vd_chat-menu').show();
						for(var i=0;i<list.length;i++){
							var user = list[i];
							var li = $('<li><a href="javascript:;" class="chat-to-user " touserid="'+user.userid+'"><div class="menu-icon">'
									+'<img class="system-user-img" src="'+fileServiceUrl + user.photo +'" />'
									+'</div>'
									+'<div class="menu-text">'
									+user.username
									+'<div class="menu-info">'
									+'<span class="menu-date">心情 </span>'
									+'</div>'
									+'</div>'
									+'<div class="menu-badge">'
									+'<span class="badge status vd_bg-red user-chat-count"></span>'
									+'</div></a></li>');
							for(var n in user){
								if(n!='userid'){
									li.find('.chat-to-user').attr(n,user[n]);
								}
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
					var touserid = data.touserid;
					var fromuserid = data.fromuserid;
					var message = data.one;
					var messages = [message];
					messageUtil.fullChatMessage(messages);
				}
				//获取信息列表
				else if(type == 'messagelist'){
					
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
		var action = '/user/addBindUser.do';
		var data = {};
		data.nickname = add_nickname;
		base.POST(action,data,'json',function(o){
			var status = o.data;
			if(status && status.rtnCode == 0){
				alert('添加成功！');
				var systemUserBind = status.rtnMsg;
				var user = systemUserBind.binduser;
				var li = $('<li><a href="javascript:;" class="chat-to-user" touserid="'+user.userid+'"><div class="menu-icon">'
						+'<img class="system-user-img" src="'+fileServiceUrl + user.photo +'" alt="example image">'
						+'</div>'
						+'<div class="menu-text">'
						+user.username
						+'<div class="menu-info">'
						+'<span class="menu-date">心情 </span>'
						+'</div>'
						+'</div>'
						+'<div class="menu-badge">'
						+'<span class="badge status vd_bg-red user-chat-count"></span>'
						+'</div></a></li>');
				for(var n in user){
					li.find('.chat-to-user').attr(n,user[n]);
				}
				li.addClass('chat-to-user-'+user.userid);
				$('.system-bind-users').append(li);
				
				var li = $('<li><a href="javascript:;" class="chat-to-user" touserid="'+user.userid+'"><div class="menu-icon">'
						+'<img class="system-user-img" src="'+fileServiceUrl + user.photo +'" alt="example image">'
						+'</div>'
						+'<div class="menu-text">'
						+user.username
						+'<div class="menu-info">'
						+'<span class="menu-date">心情 </span>'
						+'</div>'
						+'</div>'
						+'<div class="menu-badge">'
						+'<span class="badge status vd_bg-red user-chat-count"></span>'
						+'</div></a></li>');
				for(var n in user){
					li.find('.chat-to-user').attr(n,user[n]);
				}
				li.addClass('chat-to-user-'+user.userid);
				$('.chat-system-bind-users').append(li);
			}else{
				alert(status.rtnMsg);
			}
		});
	});
	
	window.messageUtil = {};
	//获取用户信息间隔时间
	messageUtil.getUserMessageTime = 20000;
	//获取系统信息间隔时间
	messageUtil.getSystemMessageTime = 50000;
	
	messageUtil.fullSystemMessage = function(messagelist){
		for(var m=0;m<messagelist.length;m++){
			var message = messagelist[m];
			messageUtil.addSystemMessage(message);
		}
		//设置打开的窗口为已读
		var system_message_window = $('.system-message-window');
		if(system_message_window.find('a.open').length > 0){
			var lis = system_message_window.find('.system-message-li');
			var messageidstr = '';
			for(var m=0;m<lis.length;m++){
				var li = $(lis.get(m));
				if(li.attr('state') == 1){
					messageidstr += li.attr('messageid') + ",";
					li.attr('state',2);
				}
			}
			if(messageidstr == null || messageidstr == ''){
				return;
			}
			var action = "/message/updateUnreadSystemMessageState.do";
			var data = {};
			data.messageidstr = messageidstr;
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
			$.ajax({
				url : actionHref,
				data : data,
				type : 'post',
				dataType : 'json',
				async : 'false',      // 取消异步请求
				beforeSend : function(){},
				success : function(o) {
					var status = o.data;
					if(status && status.rtnCode == 0){
					}else{
					}
				},
				complete : function(XMLHttpRequest, textStatus) {},
				error : function(o,o1) {}
			});
		}
		
	};
	
	messageUtil.addSystemMessage = function(message){
		var system_message_ul = $('.system-message-ul');
		
		if($('.system-message-li-' + message.messageid).length>0){
			return;
		}
		var message_li = $('<li><div class="menu-icon">'
				+'<img class="photo" src=""></div>'
			+'<div class="menu-text"><span class="content"></span>'
			+'<div class="menu-info">'
			+'<span class="menu-date"></span>'
			+'<span class="menu-action">'
			+'<span class="menu-action-icon" data-original-title="Mark as Unread" data-toggle="tooltip" data-placement="bottom">'
			+'<i class="fa fa-eye"></i>'
			+'</span></span></div></div></li>');
		
		message_li.addClass('system-message-li system-message-li-'+message.messageid);
		
		message_li.find('.photo').attr('src',fileServiceUrl + message.fromuser.photo);
		message_li.find('.content').text(message.content);
		message_li.find('.menu-date').text(message.createtime);
		message_li.attr('messageid',message.messageid);
		message_li.attr('state',message.state);
		system_message_ul.append(message_li);
		system_message_ul.get(0).scrollTop = system_message_ul.get(0).scrollHeight;
		base.initNotFindImg();
	};
	window.createChatWindow = function(touserid,username,photo){

		//如果屏幕小于500则删除其它聊天窗口
		if($('html').width()<500){
			$('.chat_window').hide();
		}
		var chat_window = $('.chat_window_' + touserid);
		if(chat_window.length < 1){
			chat_window = $('.system-chat-window').clone();
			chat_window.addClass('chat_window');
			chat_window.removeClass('system-chat-window');
			chat_window.addClass('chat_window_' + touserid);
			chat_window.find('.username').text(username);
			chat_window.find('.photo').attr('src',fileServiceUrl + '/' + photo);
			$('.chat-user-list').before(chat_window);
			chat_window.find('.send-message').attr('touserid',touserid);
			chat_window.show();
			base.initNotFindImg();
		}
		chat_window.show();
		return chat_window;
	};

	$('html').on('click','.chat-to-user',function(){
		var touserid = $(this).attr('touserid');
		var username = $(this).attr('username');
		var photo = $(this).attr('photo');
		var chat_window = createChatWindow(touserid,username,photo);

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
		$('.user-chat-count').text('');
		//信息条数展示
		$('.system-message-chat-count').text(messagelist.length==0?'':messagelist.length);

		if($('.system-message-chat-count').text().length>0){
			$('.system-message-chat-count').show();
		}else{
			$('.system-message-chat-count').hide();
		}
		//单个用户未读信息展示
		if(messagelist.length > 0){
			var usermessagecounts = {};
			for(var m=0;m<messagelist.length;m++){
				var message = messagelist[m];
				var fromuserid = message.fromuser.userid;
				if(usermessagecounts[fromuserid] == null){
					usermessagecounts[fromuserid] = 1;
				}else{
					usermessagecounts[fromuserid] = usermessagecounts[fromuserid] + 1;
				}
			}
			for(var fromuserid in usermessagecounts){
				var count = usermessagecounts[fromuserid];
				var chat_window = $('.chat_window_'+fromuserid);
				var chat_user = $('.chat-to-user-'+fromuserid);
				chat_window.find('.user-chat-count').text(count);
				chat_user.find('.user-chat-count').text(count);

			}
			
		}
		var user_chat_counts = $('.user-chat-count');
		for(var i=0;i<user_chat_counts.length;i++){
			var user_chat_count = $(user_chat_counts[i]);
			if(user_chat_count.text().length>0){
				user_chat_count.show();
			}else{
				user_chat_count.hide();
			}
		}
		
		
	};
	messageUtil.updateUnreadUserMessageState = function(){
		//设置打开的窗口为已读
		
		var chat_windows = $('.chat_window');
		for(var i=0;i<chat_windows.length;i++){
			var chat_window = $(chat_windows.get(i));
			if(chat_window.find('a.open').length > 0){
				var from_lis = chat_window.find('.from-li');
				
				var messageidstr = '';
				for(var m=0;m<from_lis.length;m++){
					var from_li = $(from_lis.get(m));
					if(from_li.attr('state') == 1){
						messageidstr += from_li.attr('messageid') + ",";
						from_li.attr('state',2);
					}
				}
				if(messageidstr == null || messageidstr == ''){
					continue;
				}
				var action = "/message/updateUnreadUserMessageState.do";
				var data = {};
				data.messageidstr = messageidstr;
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
				$.ajax({
					url : actionHref,
					data : data,
					type : 'post',
					dataType : 'json',
					async : 'false',      // 取消异步请求
					beforeSend : function(){},
					success : function(o) {
						var status = o.data;
						if(status && status.rtnCode == 0){
						}else{
						}
					},
					complete : function(XMLHttpRequest, textStatus) {},
					error : function(o,o1) {}
				});
			}
			
		}
	};
	messageUtil.addChatMessage = function(message){
		var system_user_id = $('#system_user_id').val();
		
		if($('.message-li-' + message.messageid).length>0){
			return;
		}
		
		var chat_window = $;
		if(message.fromuser.userid == system_user_id){
			chat_window = createChatWindow(message.touser.userid,message.touser.username,message.touser.photo);
		}else{
			chat_window = createChatWindow(message.fromuser.userid,message.fromuser.username,message.fromuser.photo);
		}
		
		var usermessagelistul = chat_window.find('.user-message-list');
		var messageLi = $;
		//自己发的信息
		if(message.fromuser.userid==system_user_id){
			messageLi = toMessage.clone();
			messageLi.find('.photo').attr('src',fileServiceUrl + message.touser.photo);
		}else{
			messageLi = fromMessage.clone();
			messageLi.find('.photo').attr('src',fileServiceUrl + message.fromuser.photo);
		}
		messageLi.find('.content').text(message.content);
		messageLi.find('.menu-date').text(message.createtime);
		messageLi.attr('messageid',message.messageid);
		messageLi.attr('state',message.state);
		messageLi.addClass('message-li');
		messageLi.addClass('message-li-' + message.messageid);
		usermessagelistul.append(messageLi);
		usermessagelistul.get(0).scrollTop = usermessagelistul.get(0).scrollHeight;
		base.initNotFindImg();
	};
})(window);

var fromMessage = $('<li class="from-li"><a href="#"><div class="menu-icon">'
		+'<img class="system-user-img photo" src=""/>'
		+'</div><div class="menu-text">'
		+'<span class="content"></span>'
		+'<div class="menu-info">'
		+'<span class="menu-date"></span>'
		+'</div></div></a></li>');
var toMessage = $('<li class="align-right to-li"><a href="#"><div class="menu-icon">'
		+'<img class="system-user-img photo" src=""/>'
		+'</div><div class="menu-text">'
		+'<span class="content"></span>'
		+'<div class="menu-info">'
		+'<span class="menu-date"></span>'
		+'</div></div></a></li>');
