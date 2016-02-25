package com.web.action.socket;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;

import org.apache.catalina.websocket.StreamInbound;
import org.apache.catalina.websocket.WebSocketServlet;

import com.support.tool.CommonTool;

@SuppressWarnings("deprecation")
@WebServlet(urlPatterns = { "/message" })
// 如果要接收浏览器的ws://协议的请求就必须实现WebSocketServlet这个类
public class WebSocketMessageServlet extends WebSocketServlet {

    private static final long serialVersionUID = 1L;

    // 跟平常Servlet不同的是，需要实现createWebSocketInbound，在这里初始化自定义的WebSocket连接对象
    @Override
    protected StreamInbound createWebSocketInbound(String subProtocol, HttpServletRequest request) {

        String userid = (String) request.getSession().getAttribute("userid");
        String clientid = CommonTool.getRandomNumber();
        try {
            return new WebSocketMessageInbound(clientid, userid);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}