package com.web.action.socket;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.util.List;

import net.sf.json.JSONObject;

import org.apache.catalina.websocket.MessageInbound;
import org.apache.catalina.websocket.WsOutbound;

import com.support.entity.base.BaseMessage;
import com.support.entity.system.SystemUser;
import com.web.service.BaseService;

@SuppressWarnings("deprecation")
public class WebSocketMessageInbound extends MessageInbound {

    private final String clientid;

    private final SystemUser user;

    public WebSocketMessageInbound(String clientid, String userid) throws Exception {
        this.clientid = clientid;
        user = BaseService.getService().get(SystemUser.class, userid);
    }

    public String getClientid() {
        return clientid;
    }

    public SystemUser getUser() {
        return this.user;
    }

    // 建立连接的触发的事件
    @Override
    protected void onOpen(WsOutbound outbound) {
        // 向连接池添加当前的连接对象
        WebSocketMessageInboundPool.addMessageInbound(this);
        // 触发连接事件，在连接池中添加连接
        JSONObject result = new JSONObject();
        result.put("type", "join");
        result.put("one", this.user);
        // 向所有在线用户推送当前用户上线的消息
        WebSocketMessageInboundPool.sendMessageToAll(result.toString());
        // 获取在线用户
        sendBindusersToClient();
        // 获取未读信息
        sendUnreadMessageToClient("1");
    }

    /**
     * 获取未读信息 <一句话功能简述> <功能详细描述>
     * 
     * @see [类、类#方法、类#成员]
     */
    private void sendUnreadMessageToClient(String type) {
        JSONObject result = new JSONObject();
        result.put("type", "unreadmessages");
        result.put("list", MessageControl.getUnreadMessage(this.user.getUserid(), type));
        // 向当前连接发送当前在线用户的列表
        WebSocketMessageInboundPool.sendMessageToClient(this.clientid, result.toString());

    }

    /**
     * 获取在线用户 <一句话功能简述> <功能详细描述>
     * 
     * @see [类、类#方法、类#成员]
     */
    private void sendBindusersToClient() {
        JSONObject result = new JSONObject();
        result.put("type", "bindusers");
        result.put("list", WebSocketMessageInboundPool.getBindUsers(this.user.getUserid()));
        // 向当前连接发送当前在线用户的列表
        WebSocketMessageInboundPool.sendMessageToClient(this.clientid, result.toString());

    }

    @Override
    protected void onClose(int status) {
        // 触发关闭事件，在连接池中移除连接
        WebSocketMessageInboundPool.removeMessageInbound(this);
        JSONObject result = new JSONObject();
        result.put("type", "close");
        result.put("one", this.user);
        // 向在线用户发送当前用户退出的消息
        WebSocketMessageInboundPool.sendMessageToAll(result.toString());
    }

    @Override
    protected void onBinaryMessage(ByteBuffer message) throws IOException {
        throw new UnsupportedOperationException("Binary message not supported.");
    }

    private void sendToUserMessage(String touserid, String content) {
        BaseMessage message = MessageControl.send(this.user.getUserid(), touserid, content);
        JSONObject result = new JSONObject();
        result.put("type", "message");
        result.put("one", message);
        result.put("touserid", touserid);
        result.put("fromuserid", this.user.getUserid());

        WebSocketMessageInboundPool.sendMessageToUser(this.user.getUserid(), result.toString());
        WebSocketMessageInboundPool.sendMessageToUser(touserid, result.toString());
    }

    private void getMessages(String fromuserid, String lastmessageid) {

        List<BaseMessage> messages = MessageControl.getNextList(this.user.getUserid(), fromuserid, lastmessageid);
        JSONObject result = new JSONObject();
        result.put("type", "messages");
        result.put("list", messages);
        WebSocketMessageInboundPool.sendMessageToUser(this.user.getUserid(), result.toString());
    }

    private void readMessages(String messageidstr) {

        int count = MessageControl.updateUnreadMessageState(this.user.getUserid(), messageidstr);
        JSONObject result = new JSONObject();
        result.put("type", "updatestatus");
        result.put("one", count);

        WebSocketMessageInboundPool.sendMessageToUser(this.user.getUserid(), result.toString());
    }

    // 客户端发送消息到服务器时触发事件
    @Override
    protected void onTextMessage(CharBuffer message) throws IOException {
        JSONObject object = JSONObject.fromObject(message.toString());
        String type = object.getString("type");
        // 处理消息
        // 发送给个人
        if (type.equals("sendtouser")) {
            String touserid = object.getString("touserid");
            String content = object.getString("content");
            sendToUserMessage(touserid, content);

        } else if (type.equals("getmessages")) {
            String fromuserid = object.getString("fromuserid");
            String lastmessageid = object.getString("lastmessageid");
            getMessages(fromuserid, lastmessageid);
        } else if (type.equals("readmessage")) {
            String messageidstr = object.getString("messageidstr");
            readMessages(messageidstr);
        } else if (type.equals("getbindusers")) {
            sendBindusersToClient();
        } else {
            // 向所有在线用户发送消息
            WebSocketMessageInboundPool.sendMessageToAll(message.toString());
        }
    }
}