/**
 * 系统组件加载 初始化
 */
function getRootPath(){
	// 获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
	var curWwwPath = window.document.location.href;
	// 获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
	var pathName = window.document.location.pathname;
	var pos = curWwwPath.indexOf(pathName);
	// 获取主机地址，如： http://localhost:8083
	var localhostPaht = curWwwPath.substring(0,pos);
	// 获取带"/"的项目名，如：/uimcardprj
	if(pathName!=null){
		pathName = pathName.replace('////','/');
		pathName = pathName.replace('///','/');
		pathName = pathName.replace('//','/');
		pathName = pathName.replace('//','/');
	}
	var projectName = pathName.substring(0,pathName.substr(1).indexOf('/')+1);

	return (localhostPaht + projectName) + '/';
}
window.tool = window.tool == null? {}:window.tool;
tool.showMaskIndex = 0;
window.showMask = tool.showMask = function(){
	tool.showMaskIndex++;
	var system_mask = $('#system_mask');
	if(system_mask.length<1){
		var styleText = 'position: fixed;z-index: 999999;left: 0px;right: 0px;bottom: 0px;top: 0px;'
			+'background-color: rgba(0, 0, 0, 0.27);font-size: 30px;text-align: center;color: white;';
		system_mask = $("<div id='system_mask' style='"+styleText+"'><div class='fa-spin'><div class='fa fa-spinner'></div></div></div>")
		$($('head').get(0)).before(system_mask);
	}
	system_mask = $('#system_mask');
	$('#system_mask').show();
};
window.hideMask = tool.hideMask = function(){
	tool.showMaskIndex--;
	if(tool.showMaskIndex == 0){
		window.setTimeout(function(){
			$('#system_mask').hide();
		}, 200);
	}
};
window.basePath = getRootPath();
tool.showMask();
(function(){
	$.ajax({
		url : basePath + "/base/base.config.json",
		data : {},
		type : 'post',
		dataType : 'json',
		async : false,      // 同步请求
		success : function(data){
			var file = data.file;
			var jsfiles = file.js;
			var cssfiles = file.css;

			cssfiles = cssfiles == null?[]:cssfiles;
			for(var i=0;i<cssfiles.length;i++){
				var cssfile = cssfiles[i];
				var src = cssfile.src;
				if(!src||src=='')continue;
				if(src.indexOf('http')!=0)src = basePath + src;
				document.write("<link href='"+ src +"' rel='stylesheet' type='text/css'>");
			}
			jsfiles = jsfiles == null?[]:jsfiles;
			for(var i=0;i<jsfiles.length;i++){
				var jsfile = jsfiles[i];
				var src = jsfile.src;
				if(!src||src=='')continue;
				if(src.indexOf('http')!=0)src = basePath + src;
				document.write("<script type='text/javascript' src='"+ src +"'></script>");
			}
			tool.hideMask();
		},
		complete : function(XMLHttpRequest, textStatus) {
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			tool.hideMask();
			if(XMLHttpRequest.status == 500){
			}else if(XMLHttpRequest.status == 404){
			}
		}
	});
})();
