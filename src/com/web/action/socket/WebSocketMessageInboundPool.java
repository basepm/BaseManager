package com.web.action.socket;

import java.io.IOException;
import java.nio.CharBuffer;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.support.entity.system.SystemUser;
import com.web.service.BaseService;

@SuppressWarnings("deprecation")
public class WebSocketMessageInboundPool {

    // 客户端集合
    private static final Map<String, WebSocketMessageInbound> CLIENT_MAP = new HashMap<String, WebSocketMessageInbound>();

    // 用户与客户端对应集合
    private static final Map<String, List<String>> USERID_CLIENT_MAP = new HashMap<String, List<String>>();

    // 向连接池中添加连接
    public static void addMessageInbound(WebSocketMessageInbound inbound) {
        String clientid = inbound.getClientid();
        SystemUser user = inbound.getUser();
        String userid = user.getUserid();

        // 添加连接
        CLIENT_MAP.put(clientid, inbound);
        List<String> clientids = USERID_CLIENT_MAP.get(userid);
        if (clientids == null) {
            clientids = new ArrayList<String>();
        }
        clientids.add(clientid);
        USERID_CLIENT_MAP.put(userid, clientids);
    }

    // 获取所有的在线用户
    public static List<SystemUser> getBindUsers(String userid) {
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            String sql = "select * from system_user t1 where  t1.userid=:userid or (t1.userid in (select t2.binduserid from system_user_bind t2 where userid = :userid) or t1.userid in (select t2.userid from system_user_bind t2 where binduserid = :userid))";
            params.put("userid", userid);
            List<SystemUser> users = BaseService.getService().queryList(SystemUser.class, sql, params);
            for (SystemUser user : users) {
                String id = user.getUserid();
                if (USERID_CLIENT_MAP.get(id) != null) {
                    user.setOnlinestatus(1);
                }
            }
            return users;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public static void removeMessageInbound(WebSocketMessageInbound inbound) {
        String clientid = inbound.getClientid();
        SystemUser user = inbound.getUser();
        String userid = user.getUserid();

        List<String> clientids = USERID_CLIENT_MAP.get(userid);
        if (clientids == null) {
            clientids = new ArrayList<String>();
        }
        clientids.remove(clientid);
        if (clientids == null || clientids.size() < 1) {
            USERID_CLIENT_MAP.remove(userid);
        } else {

            USERID_CLIENT_MAP.put(userid, clientids);
        }
        // 移除连接
        CLIENT_MAP.remove(inbound.getClientid());
    }

    public static void sendMessageToClient(String clientid, String content) {
        try {

            WebSocketMessageInbound inbound = CLIENT_MAP.get(clientid);
            if (inbound != null) {
                inbound.getWsOutbound().writeTextMessage(CharBuffer.wrap(content));
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void sendMessageToUser(String userid, String content) {
        try {
            List<String> clientids = USERID_CLIENT_MAP.get(userid);
            if (clientids == null) {
                clientids = new ArrayList<String>();
            }
            for (String clientid : clientids) {
                WebSocketMessageInbound inbound = CLIENT_MAP.get(clientid);
                if (inbound != null) {
                    inbound.getWsOutbound().writeTextMessage(CharBuffer.wrap(content));
                }
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // 向所有的用户发送消息
    public static void sendMessageToAll(String message) {
        try {
            Set<String> keySet = CLIENT_MAP.keySet();
            for (String key : keySet) {
                WebSocketMessageInbound inbound = CLIENT_MAP.get(key);
                if (inbound != null) {
                    inbound.getWsOutbound().writeTextMessage(CharBuffer.wrap(message));
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}