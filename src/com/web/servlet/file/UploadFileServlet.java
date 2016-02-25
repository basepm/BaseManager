package com.web.servlet.file;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import com.support.config.SystemConfig;
import com.support.constant.Constant;
import com.support.entity.base.BaseFile;
import com.support.tool.ApkTool;
import com.support.tool.BaseFileTool;
import com.support.tool.CommonTool;
import com.web.service.BaseService;

@WebServlet(urlPatterns = { "/uploadFileServlet" })
public class UploadFileServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }

    @SuppressWarnings({ "deprecation", "unchecked" })
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        // 将请求，响应的编码设置为UTF-8(防止乱码)
        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");
        PrintWriter printWriter = response.getWriter();
        String worktype = request.getParameter("worktype");

        String uploadid = request.getParameter("uploadid");
        UploadProgress progressListener = new UploadProgress();
        Map<String, UploadProgress> progressListeners = new HashMap<String, UploadProgress>();
        if (request.getSession().getAttribute("progressListeners") != null) {
            progressListeners = (Map<String, UploadProgress>) request.getSession().getAttribute("progressListeners");
            if (progressListeners.get(uploadid) != null) {
                progressListener = progressListeners.get(uploadid);
            } else {
                progressListeners.put(uploadid, progressListener);
            }
        } else {
            progressListeners.put(uploadid, progressListener);
        }
        request.getSession().setAttribute("progressListeners", progressListeners);

        if (worktype != null) {
            if ("progresslistener".equals(worktype)) {
                try {

                    JSONObject jsonObject = JSONObject.fromObject(progressListener);
                    if (progressListener != null) {
                        double percent = progressListener.getPercent();
                        BigDecimal b = new BigDecimal(percent);
                        double percent1 = b.setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue();
                        jsonObject.put("percent", percent1);
                    }
                    printWriter.print(JSONObject.fromObject(jsonObject));
                } catch (Exception e) {
                    e.printStackTrace();
                } finally {
                    printWriter.close();
                }
            }
            return;

        }

        String fileservicename = SystemConfig.readValue("fileservicename");

        String servicepath = new File(request.getRealPath("/")).getParentFile().getAbsolutePath() + "/";

        Calendar calendar = Calendar.getInstance();
        int year = calendar.get(Calendar.YEAR);
        int month = calendar.get(Calendar.MONTH) + 1;
        int day = calendar.get(Calendar.DATE);
        String relativefileservicepath = SystemConfig.readValue("fileuploadsavepath") + "/" + year + "/" + month + "/"
                + day + "/";

        List<BaseFile> baseFiles = this.uploadFileWork(request, response, progressListener, servicepath,
                fileservicename, relativefileservicepath);
        request.setCharacterEncoding("utf-8");
        response.setCharacterEncoding("utf-8");
        response.setContentType("text/html");
        try {
            printWriter.print(JSONArray.fromObject(baseFiles));
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            printWriter.close();
        }
    }

    @SuppressWarnings("rawtypes")
    public List<BaseFile> uploadFileWork(HttpServletRequest request, HttpServletResponse response,
            UploadProgress progressListener, String servicepath, String fileservicename, String relativefileservicepath) {
        final List<BaseFile> baseFiles = new ArrayList<BaseFile>();
        try {
            String saveFolder = servicepath + fileservicename + "/" + relativefileservicepath;
            long userid = -1;
            if (null != request.getSession().getAttribute(Constant.ParamName.SYSTEM_USER_ID)) {
                userid = Long.valueOf((String) request.getSession().getAttribute(Constant.ParamName.SYSTEM_USER_ID));
            }

            File saveFolderFile = new File(saveFolder);
            if (!saveFolderFile.exists()) {
                saveFolderFile.mkdirs();
            }
            boolean isMultipart = ServletFileUpload.isMultipartContent(request);
            if (isMultipart) {
                // 构造一个文件上传处理对象
                DiskFileItemFactory factory = new DiskFileItemFactory();
                ServletFileUpload upload = new ServletFileUpload(factory);
                String tempPath = saveFolder + "/temp";
                File tempFile = new File(tempPath);
                if (!tempFile.exists()) {
                    tempFile.mkdirs();
                }
                factory.setSizeThreshold(10240);
                factory.setRepository(tempFile);

                // 添加文件字节流读取监听
                upload.setProgressListener(progressListener);
                Iterator items = upload.parseRequest(request).iterator();
                while (items.hasNext()) {
                    BaseFile baseFile = new BaseFile();
                    FileItem item = (FileItem) items.next();
                    if (!item.isFormField()) {
                        // 取出上传文件的文件名称
                        String name = item.getName();
                        // 取得上传文件以后的存储路径
                        String filename = name.substring(name.lastIndexOf('\\') + 1, name.length());

                        String fileid = CommonTool.getRandomNumber();

                        String savefilepath = "";
                        String saveName = "";
                        String filetype = "";
                        baseFile.setFilename(filename);
                        if (filename.lastIndexOf(".") >= 0) {
                            filetype = filename.substring(filename.lastIndexOf(".") + 1);
                            saveName = fileid + "." + filetype;
                            filename = filename.substring(0, filename.lastIndexOf("."));
                        } else {
                            saveName = fileid + "";
                        }
                        String relativefileservicefilepath = "/" + relativefileservicepath + "/" + saveName;
                        String filelength = "" + item.getSize();
                        baseFile.setFileid(fileid);
                        baseFile.setFilelength(filelength);
                        if (request.getParameter("filetype") != null) {
                            baseFile.setFiletype(request.getParameter("filetype"));
                        } else {
                            baseFile.setFiletype(filetype);
                        }
                        baseFile.setRelativefileservicefilepath(relativefileservicefilepath);
                        baseFile.setUserid("" + userid);
                        savefilepath = saveFolder + "/" + saveName;

                        File outFile = new File(savefilepath);
                        outFile.createNewFile();
                        item.write(outFile);
                        BaseFileTool.uploadFileToService(outFile, relativefileservicefilepath, saveName);
                        // HttpPostUtil u = new
                        // HttpPostUtil(fileUploadServiceUrl +
                        // "&relativefileservicefilepath=/"
                        // + fileservicename + relativefileservicefilepath);
                        // u.addFileParameter("upfile", outFile);
                        // u.send();
                        String type = filetype == null ? "" : filetype.toUpperCase();
                        if (type.equals("WMA") || type.equals("MP3") || type.equals("WAV") || type.equals("MP1")
                                || type.equals("MP2") || type.equals("MIDI") || type.equals("AIFF")
                                || type.equals("AVI") || type.equals("MOV") || type.equals("MPEG") || type.equals("QT")
                                || type.equals("RAM") || type.equals("VIV") || type.equals("MP4")) {
                            long timelong = BaseFileTool.getAudioPlayTime(savefilepath);
                            baseFile.setFiletimelong("" + timelong);
                        }
                        if (type.equals("APK")) {
                            try {
                                new ApkTool().getApkInfo(savefilepath, baseFile);
                            } catch (Exception e) {
                                e.printStackTrace();
                            }
                        }
                        // 保存入库
                        BaseService.getService().save(baseFile);

                        baseFiles.add(baseFile);
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return baseFiles;
    }

}
