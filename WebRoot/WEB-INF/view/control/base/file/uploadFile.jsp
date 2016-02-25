<%@ page trimDirectiveWhitespaces="true" %><%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%@ page import="java.util.*"%><%@ include file="/WEB-INF/view/control/common/base.jsp"%>
<style type="text/css">
	.baseUploadFilePanel{
		position: fixed;
		z-index: 1000;
		left: 0px;right: 0px;
		top: 0px;
		bottom: 0px;
		background-color: rgba(0, 0, 0, 0.3);
	}
	.one-file a .bg-select{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background: #FFF;
		opacity: 0;
	}
	.one-file.select a .bg-select{
		background-color: white;
		display: block;
		opacity: .5;
	}
	.one-file.select a .bg-select .fa-check{
		display: block;
		opacity: initial;
	}
	.one-file a .bg-select .fa-check{
		display: none;
	}
	.baseUploadFilePanel .win{
		position: fixed;
		left: 10%;
	    top: 7%;
	    right: 10%;
	    bottom: 7%;
	}
</style>
<div class="baseUploadFilePanel" hidden>
	<div class="win" >
		<div class="panel widget light-widget" style="width: 100%;height: 100%;">
			<div class="panel-body-list tabs" style="height: 100%;">
				<ul class="nav nav-tabs widget">
					<!-- <li class="user-file-load" filetype='image'><a href="#image_list" data-toggle="tab"><span class="menu-icon"><i class="fa fa-user"></i></span>图片<span class="menu-active"><i class="fa fa-caret-up"></i></span> </a></li>
					<li class="user-file-load" filetype='video'><a href="#video_list" data-toggle="tab"><span class="menu-icon"><i class="fa fa-user"></i></span>视屏<span class="menu-active"><i class="fa fa-caret-up"></i></span> </a></li>
					<li class="user-file-load" filetype='audio'><a href="#audio_list" data-toggle="tab"><span class="menu-icon"><i class="fa fa-user"></i></span>音频<span class="menu-active"><i class="fa fa-caret-up"></i></span> </a></li>
					<li class="user-file-load" filetype='file'><a href="#file_list" data-toggle="tab"><span class="menu-icon"><i class="fa fa-user"></i></span>文档<span class="menu-active"><i class="fa fa-caret-up"></i></span> </a></li> -->
					<li class="active"><a href="#upload_list" data-toggle="tab"><span class="menu-icon"><i class="fa fa-upload"></i></span>本地上传<span class="menu-active"><i class="fa fa-caret-up"></i></span> </a></li>
				</ul>
				<div class="" style="float: right;position: relative;top: 15px;z-index: 1;margin-right: 20px;"><a href="javascript:;" style="" class="btn btn-default baseChooseFileCancel">取&nbsp;消</a></div>
				<div class="" style="float: right;position: relative;top: 15px;z-index: 1;margin-right: 20px;"><a href="javascript:;" style="" class="btn btn-success baseChooseFileDefine">确&nbsp;定</a></div>
				
				<div class="tab-content  mgbt-xs-20" style="padding-top: 50px;">
					<div class="tab-pane " id="image_list"  style="height: 80%;min-height: 80%;overflow: hidden;overflow-y: auto;"> 
						<div class="row">
							<div class="content-list vd_gallery">
							</div>
						</div>
					</div>
					<div class="tab-pane" id="video_list" style="height: 80%;min-height: 80%;overflow: hidden;overflow-y: auto;">
						<div class="row">
							<div class="content-list vd_gallery">
							</div>
						</div>
					</div>
					<div class="tab-pane" id="audio_list" style="height: 80%;min-height: 80%;overflow: hidden;overflow-y: auto;">
						<div class="row">
							<div class="content-list vd_gallery">
							</div>
						</div>
					</div>
					<div class="tab-pane" id="file_list" style="height: 80%;min-height: 80%;overflow: hidden;overflow-y: auto;">
						<div class="row">
							<div class="content-list vd_gallery">
							</div>
						</div>
					</div>
					<div class="tab-pane active" id="upload_list" style="height: 80%;min-height: 80%;overflow: hidden;overflow-y: auto;">
						<form id="baseUploadFileForm" action="${basePath }/uploadFileServlet" target="baseUploadFileIframe" method="post" enctype="multipart/form-data">
							<input type="hidden" name="uploadid" id="uploadid"/>
							<input type="hidden" name="filetype" id="filetype"/>
							<div class="col-lg-4 col-md-4 col-sm-4 mgbt-xs-15">
								<div class="baseUploadImageDiv form-img text-center mgbt-xs-15"> 
									<img class="baseUploadImage" width="160px" height="140px" alt="选择图片" src="${basePath }/images/sys/no_img.png" />
								</div>
								<div class="form-img-action text-center mgbt-xs-20">
									<span class="btn btn-success fileinput-button"> <i class="fa fa-cloud-upload append-icon"></i> <span>选择</span>
										<input type="file" name="upfile" class="baseUploadFileInput" onchange="javascript:baseFileChange(this);" 
										style="position: absolute;top: 150px;right: 0;margin: 0;opacity: 0;-ms-filter: 'alpha(opacity=0)';direction: ltr;cursor: pointer;height: 70px;">
									</span>
								</div>
								<br/>
								<div class="form-img-action text-center mgbt-xs-20">
									<span class="btn btn-success baseUploadFileSubmitBtn"> <i class="fa fa-fw fa-check"></i> <span>上传</span>
									</span>
								</div>
							</div>
							<div class="col-lg-8 col-md-8 col-sm-8 mgbt-xs-15">
								<div class="form-img text-center mgbt-xs-15 "> 
									<div class="gallery-item one-file animated fadeInUp" path="${basePath }/images/sys/no_img.png" >
										<a href="javascript:;" style="text-align: center;"> 
											<img class="baseUploadBackImage" width="160px" height="140px" alt="上传成功预览" src="${basePath }/images/sys/no_img.png" />
											<div class="bg-cover">
						              		</div>
						              		<div class="bg-select">
						              			<i class="fa fa-check " style="margin-top: 40px;font-size: 30px;" ></i>
						              		</div>
										</a>
									</div>
								</div>
								<div class="form-group">
		                            <label class="col-sm-2 control-label">文件名</label>
		                            <div class="col-sm-10 controls">
										<div class="row mgbt-xs-0">
											<div class="col-xs-9">
												<input class="baseuploadfilename" type="text" placeholder="filename">
											</div>
										</div>
		                            </div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
	<script type="text/javascript" charset="utf-8">
	var baseChooseFiles = [];
	var baseChooseFileBackFun = null;
	//初始化上传
	function initBaseUploadFile(backFun){
		baseChooseFileBackFun = backFun;
		baseChooseFiles = [];
		$('.baseUploadFilePanel').show();
		
	}
	function baseFileChange(e){
		var width = 160;
		var height = 140;
		var baseFileBtn = $(e);
		var docObj= baseFileBtn.get(0);
		var imgObjPreview= $('.baseUploadImage').get(0);
		var localImagId = $('.baseUploadImageDiv').get(0);
		var filevalue = docObj.value;
		var array = filevalue.split('\\');
		var filename = array[array.length-1];
		$('.baseuploadfilename').val(filename);
		if(base.isImage(filename)){
			if(docObj.files&&docObj.files[0]){
				//imgObjPreview.src = docObj.files[0].getAsDataURL();
				//火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式
				imgObjPreview.src = window.URL.createObjectURL(docObj.files[0]); 
			}else{
				//IE下，使用滤镜
				docObj.select();
				var imgSrc=document.selection.createRange().text;
				var localImagId=document.getElementById(localImg);//必须设置初始大小
				localImagId.style.width=width+'px';
				localImagId.style.height=height+'px';
				//图片异常的捕捉，防止用户修改后缀来伪造图片
				try{
					localImagId.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
					localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src=imgSrc;
				}catch(e){ 
					return false; 
				}
				imgObjPreview.style.display='none';
				document.selection.empty();
			}
			$('#baseUploadFileForm').find('#filetype').val('image');
		}else if(base.isVideo(filename)){
			imgObjPreview.src = basePath + '/images/ico/ico-video.jpg';
			$('#baseUploadFileForm').find('#filetype').val('video');
		}else if(base.isAudio(filename)){
			imgObjPreview.src = basePath + '/images/ico/ico-audio.jpg';
			$('#baseUploadFileForm').find('#filetype').val('audio');
		}else{
			imgObjPreview.src = basePath + '/images/ico/ico-file.jpg';
			$('#baseUploadFileForm').find('#filetype').val('file');
		}
		
	}
	
	function progresslistenerByUploadid(uploadid){
		
		var actionHref = '';
		if(basePath==null||basePath==''){
			actionHref = "/uploadFileServlet";
		}else{
			actionHref = basePath + "/uploadFileServlet";
		}

		$.ajax({
			url : actionHref,
			data : {worktype:'progresslistener',uploadid:uploadid},
			type : 'post',
			dataType : 'json',
			async : true,      
			beforeSend : function() {},
			success : function(o){
				alert(o.percent);
			},
			complete : function(XMLHttpRequest, textStatus) {},
			error : function(o,o1) {}
		});
	}
	var allUserFiles = {};
	

	function baseUploadFileSuccess(iframe){
		var result = $(window.frames[iframe.name].document).find('body').html();
		if(result == null || result == ''){
			return;
		}
		try{
			result = eval('('+result+')');
			if(result.length>0){
				var systemFile = result[result.length-1];
				var relativefileservicefilepath = systemFile.relativefileservicefilepath;
				systemFile.path = '/'+relativefileservicefilepath;
				allUserFiles[systemFile.fileid] = systemFile;
				var filetimelong = systemFile.filetimelong;
				if(base.isImage(relativefileservicefilepath)){
					$('#baseUploadFileForm').find('.baseUploadBackImage').attr('src',fileServiceUrl+relativefileservicefilepath);
				}else if(base.isVideo(relativefileservicefilepath)){
					$('#baseUploadFileForm').find('.baseUploadBackImage').attr('src', basePath + '/images/ico/ico-video.jpg');
				}else if(base.isAudio(relativefileservicefilepath)){
					$('#baseUploadFileForm').find('.baseUploadBackImage').attr('src', basePath + '/images/ico/ico-audio.jpg');
				}else{
					$('#baseUploadFileForm').find('.baseUploadBackImage').attr('src', basePath + '/images/ico/ico-file.jpg');
				}
				$('#baseUploadFileForm').find('.baseUploadBackImage').parent().parent().attr('fileid',systemFile.fileid);
				$('#baseUploadFileForm').find('.baseUploadBackImage').parent().parent().click();
			}
		}catch(e){}
	}
	$(document).ready(function(){
		$('html').on('click','.baseUploadFileSubmitBtn',function(){
			if($('.baseUploadFileInput').val()!=null && $('.baseUploadFileInput').val()!=''){
				var uploadid = ''+new Date().getTime()+''+Math.floor(Math.random()*10+1)+''+Math.floor(Math.random()*10+1)+''+Math.floor(Math.random()*10+1)+''+Math.floor(Math.random()*10+1)+''+Math.floor(Math.random()*10+1)+''+Math.floor(Math.random()*10+1)+''+Math.floor(Math.random()*10+1)+''+Math.floor(Math.random()*10+1);

				$('.baseUploadBackImage').attr('src',basePath+'/images/sys/no_img.png');
				$('#uploadid').val(uploadid);
				$('#baseUploadFileForm').attr('action',basePath+'/uploadFileServlet?filetype='+$('#filetype').val());
				$('#baseUploadFileForm').submit();
				
			}else{
				alert('请先选择文件！');
			}
		});
		$('html').on('click','.one-file',function(){
			var fileid = $(this).attr('fileid');
			if(fileid == null || fileid == ''){
				alert('请先选择文件！');
				return;
			}
			if($(this).hasClass('select')){
				$(this).removeClass('select')
				
				var cfs = [];
				for(var i=0;i<baseChooseFiles.length;i++){
					if(fileid != baseChooseFiles[i].fileid){
						cfs[cfs.length] = baseChooseFiles[i];
					}
				}
				baseChooseFiles = cfs;
			}else{
				$(this).addClass('select')
				var f = allUserFiles[fileid];
				baseChooseFiles[baseChooseFiles.length] = f;
			}
		});

		$('html').on('click','.baseChooseFileDefine',function(){
			if(baseChooseFiles.length == 0){
				alert('您还未选择文件！');
				return;
			}else{
				$('.one-file').removeClass('select');
				$('.baseUploadFilePanel').hide();
				if(baseChooseFileBackFun!=null && baseChooseFileBackFun!=''){
					baseChooseFileBackFun(baseChooseFiles);
				}
			}
		});
		$('html').on('click','.baseChooseFileCancel',function(){
			$('.one-file').removeClass('select');
			$('.baseUploadFilePanel').hide();
		});
		
	});
	</script>
	<iframe name="baseUploadFileIframe" onload="javascript:baseUploadFileSuccess(this);" width="100px" height="100px" style="border: 0px;display: none;">
	</iframe>
</div>
<div class="baseOneFileDiv" style="display: none;">
	<div class="col-lg-2 col-md-4 col-sm-4 mgbt-xs-15  ">
		<div class="gallery-item full-width  animated fadeInUp one-file " path="${basePath }/images/sys/no_img.png" style=""> 
			<a href="javascript:;" style="text-align: center;"> 
				<img alt="" src="${basePath }/images/sys/no_img.png">
				<div class="bg-cover">
				</div>
				<div class="bg-select">
					<i class="fa fa-check " style="margin-top: 40px;font-size: 30px;" ></i>
        		</div>
        	</a>
        	<div class="filename"></div>
		</div>
	</div>
</div>