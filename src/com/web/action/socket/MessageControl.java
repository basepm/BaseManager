package com.web.action.socket;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import com.support.entity.base.BaseMessage;
import com.support.tool.CommonTool;
import com.web.service.BaseService;

/**
 * 信息控制 <一句话功能简述> <功能详细描述>
 * 
 * @author 朱亮
 * @version [1.0, 2015年12月2日]
 * @see [相关类/方法]
 * @since [产品/模块版本]
 */
public class MessageControl {
    /**
     * 获取所有未读信息
     */
    public static List<BaseMessage> getUnreadMessage(String userid, String type) {
        List<BaseMessage> list = new ArrayList<BaseMessage>();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("userid", userid);
            params.put("type", type);
            // 获取最早一条未读信息
            String sql = "select * from base_message where type=:type and (touserid =:userid ) and state='1' order by createtime asc";
            List<BaseMessage> messages = BaseService.getService().queryPage(BaseMessage.class, sql, params, 1, 1);
            if (messages != null && messages.size() > 0) {
                String messageid = messages.get(0).getMessageid();
                params.put("messageid", messageid);
                // 聊天信息总数 Chat
                sql = "select * from base_message where type=:type and messageid>=:messageid and (touserid =:userid or fromuserid=:userid)  order by createtime asc";
                list = BaseService.getService().queryList(BaseMessage.class, sql, params);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return list;
    }

    /**
     * 获取信息总数 <一句话功能简述> <功能详细描述>
     */
    public static JSONObject getUnreadMessageCount(String userid) {
        JSONObject object = new JSONObject();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("userid", userid);
            // 聊天信息总数 Chat
            String sql = "select count(messageid) from base_message where touserid = :userid and type='1' and status=1";
            int count1 = BaseService.getService().queryCount(sql, params);
            object.put("1", "" + count1);
            // 系统信息总数 system
            sql = "select count(messageid) from base_message where touserid = :userid and type='2' and status=1 ";
            int count2 = BaseService.getService().queryCount(sql, params);
            object.put("2", "" + count2);
        } catch (Exception e) {
        }

        return object;
    }

    /**
     * 根据页面最后的信息编号 获取下边信息
     */
    public static List<BaseMessage> getNextList(String userid, String fromuserid, String lastmessageid) {
        try {
            lastmessageid = lastmessageid == null || lastmessageid.equals("") ? "0" : lastmessageid;
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("touserid", userid);
            params.put("fromuserid", fromuserid);
            params.put("lastmessageid", lastmessageid);
            String sql = "select * from base_message where ( (touserid = :touserid and fromuserid = :fromuserid) or (touserid = :fromuserid and fromuserid = :touserid)) and messageid > :lastmessageid order by messageid asc";
            return BaseService.getService().queryList(BaseMessage.class, sql, params);
        } catch (Exception e) {
        }
        return null;

    }

    /**
     * 发送信息
     */
    public static BaseMessage send(String userid, String touserid, String content) {

        try {

            BaseMessage systemMessage = new BaseMessage();
            String messageid = CommonTool.getRandomNumber();
            systemMessage.setMessageid(messageid);
            systemMessage.setFromuserid(userid);
            systemMessage.setTouserid(touserid);
            systemMessage.setContent(content);
            systemMessage.setCreatetime(CommonTool.getSystemTime());
            systemMessage.setState(1);
            systemMessage.setType(1);
            return BaseService.getService().save(systemMessage);

        } catch (Exception e) {
        }

        return null;
    }

    /**
     * 获取未读用户信息列表
     * 
     */
    public static List<BaseMessage> getUnreadUserMessageList(String userid) {

        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("touserid", userid);

            String sql = "select * from base_message where type = 1 and ((touserid = :touserid and state in (1))) ) order by createtime asc";

            return BaseService.getService().queryList(BaseMessage.class, sql, params);
        } catch (Exception e) {
        }

        return null;
    }

    /**
     * 获取未读系统信息列表
     * 
     */
    public static List<BaseMessage> getUnreadSystemMessageList(String userid) {
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("touserid", userid);
            String sql = "select * from base_message where state = 1 and type = 2 and (touserid = :touserid) order by createtime asc";
            return BaseService.getService().queryList(BaseMessage.class, sql, params);
        } catch (Exception e) {
        }
        return null;
    }

    /**
     * 修改未读信息状态
     * 
     */
    public static int updateUnreadMessageState(String userid, String messageidstr) {
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("touserid", userid);
            if (messageidstr == null || "".equals(messageidstr)) {
                return 0;
            }
            if (messageidstr.lastIndexOf(",") + 1 == messageidstr.length()) {
                messageidstr = messageidstr.substring(0, messageidstr.length() - 1);
            }
            String sql = "update base_message set state = 2 where state=1 and messageid in(" + messageidstr + ")";
            return BaseService.getService().executeSql(sql, params);
        } catch (Exception e) {

        }
        return 0;
    }
}
