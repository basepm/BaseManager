package com.web.common;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class AppContext {
    private static ApplicationContext context;

    static {
        AppContext.context = new ClassPathXmlApplicationContext("applicationContext.xml");
    }

    public static ApplicationContext getContext() {
        if (AppContext.context == null) {
            AppContext.context = new ClassPathXmlApplicationContext("applicationContext.xml");
        }
        return AppContext.context;
    }

    public static void setContext(ApplicationContext context) {
        AppContext.context = context;
    }

}
