package com.web.common;

import java.util.Properties;

import com.support.config.SystemConfig;

public class WapondConstantParam {
    /** 系统类型 **/
    public static String SYSTEM = "linux";

    /** 文件系统路径 **/
    public static String fileServiceUrl = SystemConfig.readValue("fileserviceurl");

    /** 文件上传系统路径 **/
    public static String fileUploadServiceUrl = SystemConfig.readValue("fileuploadserviceurl");

    public static String domainUrl = SystemConfig.readValue("domainurl");
    static {
        Properties prop = System.getProperties();
        SYSTEM = prop.getProperty("os.name");
        if (SYSTEM.startsWith("win") || SYSTEM.startsWith("Win")) {
            SYSTEM = "windows";
        } else {
        }
    }

    public static void init() {

        /** 文件系统路径 **/
        WapondConstantParam.fileServiceUrl = SystemConfig.readValue("fileserviceurl");

        /** 文件上传系统路径 **/
        WapondConstantParam.fileUploadServiceUrl = SystemConfig.readValue("fileuploadserviceurl");
    }

}
