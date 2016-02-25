package com.web.listener;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;

import org.springframework.context.ApplicationContext;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.support.install.service.InstallService;
import com.web.common.AppContext;

public class ShareContextLoaderListener extends ContextLoaderListener {
    @Override
    public void contextInitialized(ServletContextEvent event) {
        super.contextInitialized(event);
        ServletContext context = event.getServletContext();
        ApplicationContext ctx = WebApplicationContextUtils.getRequiredWebApplicationContext(context);
        AppContext.setContext(ctx);
        try {
            InstallService service = new InstallService();
            service.install();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
