var showelementids = [];
var otherelementids = [];
var allelementids = [];
var elementidelements = {};
var thisplateid;
var buttons = [];
var thisplate = {};
/**
 * 停止保存
 */
var stopsave = 0;
/**
 * 开始拖动
 */
var startdrag = 0;
function initDesignPlate(plateid){
	thisplateid = plateid;
	//模拟渲染页面
	var action = 'base/plate/render.do';
	var data = {};
	data.plateid = plateid;
	base.POST(action,data,'json',function(o){
		var data = o.data.rtnMsg;
		thisplate = data.plate;
		buttons = thisplate.buttons;
		inputs = {};
		for(var i=0;i<data.inputs.length;i++){
			var input = data.inputs[i];
			inputs[input.inputtype] = input;
		}
		var eles = thisplate.elements;
		for(var i=0;i<eles.length;i++){
			var ele = eles[i];
			ele = initElementInfo(ele);
			var elementid = ele.elementid;
			showelementids[showelementids.length] = elementid;
			elementidelements[elementid] = ele;
			allelementids[allelementids.length] = elementid;
		}
		eles = data.elements;
		for(var i=0;i<eles.length;i++){
			var ele = eles[i];
			ele = initElementInfo(ele);
			var elementid = ele.elementid;
			otherelementids[otherelementids.length] = elementid;
			elementidelements[elementid] = ele;
			allelementids[allelementids.length] = elementid;
		}
		initElements();
	});
	
}
function initElements(){
	var showelementform = '';
	//组合设置的元素
	for(var i=0;i<showelementids.length;i++){
		var element = elementidelements[showelementids[i]];
		element = initElementInfo(element);
		var value = "";
		//必要 必填
		var cannull = element.cannull;
		//只读
		var canupdate = !element.readonly;
		var display = element.display;
		if(element.input.inputtype=="editor"){
			element.input.inputtype="text";
			element.columnsize = 12;
		}else if(element.input.inputtype=="textarea"){
			element.input.inputtype="text";
			element.columnsize = 12;
		}
		element.design = true;
		showelementform+=(buildFormColumn(element.elementid, element, value, cannull, canupdate, display));
	}

	var otherelementsform = '';
	//组合设置的元素
	for(var i=0;i<otherelementids.length;i++){
		var element = elementidelements[otherelementids[i]];
		element = initElementInfo(element);
		var value = "";
		if(element.input.inputtype=="editor"){
			element.input.inputtype="text";
			element.columnsize = 12;
		}else if(element.input.inputtype=="textarea"){
			element.input.inputtype="text";
			element.columnsize = 12;
		}
		//必要 必填
		var cannull = element.cannull;
		//只读
		var canupdate = !element.readonly;
		var display = element.display;
		element.design = true;
		otherelementsform+=(buildFormColumn(element.elementid, element, value, cannull, canupdate, true));

	}
	$('.tool-content').html('');
	$('.tool-elements').html('');
	$('.tool-hidden-content').html('');
	$('.tool-search-show-content').html('');
	$('.tool-search-hidden-content').html('');
	$('.tool-content').append(showelementform);
	$('.tool-elements').append(otherelementsform);

	initEntrustElementEvent();
	
	initButtons();
	initSortDrag();
	initCanMoveColumn();
}

function saveElement(btn){
	var data = tool.getButtonData(btn);
	if(!data){
		return;
	}
	if(data.elementid == null || data.elementid == ''){
		alert('元素编号丢失无法保存');
		return;
	}
	data.input = inputs[data.inputtype];
	var elementid = data.elementid;
	for(var n in data){
		elementidelements[elementid][n] = data[n];
	}
	initElements();
	$('.tool-design').find('[elementid='+elementid+']').addClass('thisselect');
}
function addElement(btn){
	var data = tool.getButtonData(btn);
	if(!data){
		return;
	}
	var elementid = base.getRandomNumber();
	data.elementid = elementid;
	data.input = inputs[data.inputtype];
	elementidelements[elementid] = data;
	showelementids[showelementids.length] = elementid;
	initElements();
	$('.tool-design').find('[elementid='+elementid+']').addClass('thisselect');
}
var thisselectbuttonid;
var thisselectbuttonparamid;
function initSelectButton(){
	var buttonform = $('#buttonform');
	for(var i=0;i<buttons.length;i++){
		var button = buttons[i];
		if(button.buttonid == thisselectbuttonid){
			$('.thisbuttonname').html(button.label);
			$('[name=buttonid]').val(button.buttonid);
			base.fullFormData(buttonform, button);
			for(var n in button){
				var value = button[n];
				$('#buttonparamform').find('[name='+n+']').val(value);
			}
			$('.tool-button-params').html('');
			var params = button.params;
			var paramstrs = '';
			if(params){
				for(var n=0;n<params.length;n++){
					var param = params[n];
					params[n].buttonid = button.buttonid;
					var name = param.getvaluename;
					if(name == null || name == ''){
						name = param.value;
					}
					var paramstr = ("<a style='margin-left: 5px;' buttonparamid='"+param.buttonparamid+"' class='btn btn-xs vd_bd-green vd_green'"+
							"  >"+name+"</a>");
					paramstrs += paramstr;
				}
			}
			$('.tool-button-params').html(paramstrs);
			$('.tool-button-params').find('.btn').click(function(){
				var buttonparamid = $(this).attr('buttonparamid');
				thisselectbuttonparamid = buttonparamid;
				initSelectButtonParam();
			});
			break;
		}
		
	}
	//var collapse = $('.collapse_buttonform');
	//if(collapse.attr('aria-expanded') == 'false'){
	//	collapse.click();
	//}
}
function initSelectButtonParam(){
	for(var i=0;i<buttons.length;i++){
		var button = buttons[i];
		if(button.buttonid == thisselectbuttonid){
			var params = button.params;
			if(params){
				for(var n=0;n<params.length;n++){
					var param = params[n];
					if(param.buttonparamid == thisselectbuttonparamid){
						for(var n in param){
							var value = param[n];
							$('#buttonparamform').find('[name='+n+']').val(value);
						}
						break;
					}
				}
			}
			break;
		}
	}
	//var collapse = $('.collapse_paramform');
	//if(collapse.attr('aria-expanded') == 'false'){
	//	collapse.click();
	//}
}
function initButtons(){
	//组合按钮
	var buttonstrs = '';
	for(var i=0;i<buttons.length;i++){
		var button = buttons[i];
		var buttonstr = getPlateButton(button, {}, '', thisplate);
		buttonstrs += buttonstr;
	}
	$('.tool-buttons').html('');
	$('.tool-buttons').append(buttonstrs);
	$('.tool-buttons').find('.btn').click(function(){
		var buttonid = $(this).attr('buttonid');
		thisselectbuttonid = buttonid;
		initSelectButton();
	});
}
function saveButton(btn){
	var data = tool.getButtonData(btn);
	if(!data){
		return;
	}

	if(data.buttonid == null || data.buttonid == ''){
		return;
	}
	var buttonid = data.buttonid;
	for(var i=0;i<buttons.length;i++){
		var button = buttons[i];
		if(button.buttonid == buttonid){

			for(var n in data){
				buttons[i][n] = data[n];
			}
		}
	}
	initButtons();
}
function addButton(btn){
	var data = tool.getButtonData(btn);
	if(!data){
		return;
	}
	data.buttonid = base.getRandomNumber();
	buttons[buttons.length] = data;
	initButtons();
	
}
function saveParam(btn){
	var data = tool.getButtonData(btn);
	if(!data){
		return;
	}
	if(data.buttonparamid == null || data.buttonparamid == ''){
		return;
	}
	if(data.buttonid == null || data.buttonid == ''){
		return;
	}
	var buttonid = data.buttonid;
	for(var i=0;i<buttons.length;i++){
		var button = buttons[i];
		if(button.buttonid == buttonid){

			var params = button.params;
			if(!params){
				button.params = [];
				button.params[button.params.length] = data;
			}else{
				for(var n=0;n<params.length;n++){
					var param = params[n];
					if(param.buttonparamid == data.buttonparamid){
						button.params[n] = data;
					}
				}
			}
		}
	}
	initSelectButton();
}
function addParam(btn){
	var data = tool.getButtonData(btn);
	if(!data){
		return;
	}
	if(data.buttonid == null || data.buttonid == ''){
		return;
	}
	data.buttonparamid = base.getRandomNumber();
	var buttonid = data.buttonid;
	for(var i=0;i<buttons.length;i++){
		var button = buttons[i];
		if(button.buttonid == buttonid){
			var params = button.params;
			if(!params){
				button.params = [];
			}
			button.params[button.params.length] = data;
		}
	}
	initSelectButton();
}
function initSortDrag(){
	//拖动事件
	$(".tool-content ").sortable({
		opacity: 0.35,
		stop: function(e,t) {
			initAllElementPlace();
		}
	});
	//拖动事件
//	$(".tool-elements .onecolumn").draggable({
//		connectToSortable: ".tool-content",
//		handle: ".control-label",
//		options: ".onecolumn",
//		helper: "clone",
//		option: function(e,t){
//			
//		},
//		start: function(e,t) {
//			if (!startdrag) stopsave++;
//			startdrag = 1;
//		},
//		drag: function(e, t) {
//			t.helper.width(400)
//		},
//		stop: function(e, t) {
//			initCanMoveColumn();
//			$(".tool-content ").sortable({
//				opacity: 0.35,
//				connectWith: ".onecolumn",
//				start: function(e,t) {
//					if (!startdrag) stopsave++;
//					startdrag = 1;
//				},
//				stop: function(e,t) {
//					if(stopsave>0) stopsave--;
//					startdrag = 0;
//					initAllElementPlace();
//				}
//			});
//			if(stopsave>0) stopsave--;
//			startdrag = 0;
//			
//		}
//	});
	
}
function initCanMoveColumn(){
	
	
	var designelements = $('.tool-design').find('.onecolumn');
	$('.tool-elements').find('.onecolumn').show();

	var otherelements = $('.tool-elements').find('.onecolumn');

	for(var i=0;i<otherelements.length;i++){
		var otherelement = $(otherelements[i]);
		if(otherelement.find('.addcolumn').size()<1){
			otherelement.append('<a class="addcolumn fa  fa-plus-circle"></a>');
			otherelement.find('.addcolumn').click(function(){
				var elementid = $(this).closest('.onecolumn').attr('elementid');
				var oes = [];
				for(var i_=0;i_<otherelementids.length;i_++){
					if(otherelementids[i_] != elementid){
						oes[oes.length] = otherelementids[i_];
					}
				}
				otherelementids = oes;
				showelementids[showelementids.length] = elementid;
				
				initElements();
			});
		}
	}
	for(var i=0;i<designelements.length;i++){
		var columnelement = $(designelements[i]);
		var elementid = columnelement.attr('elementid');
		$('.tool-elements').find('[elementid='+elementid+']').hide();

		var canMoveColumn = columnelement;
		//添加删除按钮
		if(canMoveColumn.find('.deletecolumn').size()<1){
			canMoveColumn.append('<a class="deletecolumn fa fa-times-circle"></a>');
			canMoveColumn.find('.deletecolumn').click(function(){
				var elementid = $(this).closest('.onecolumn').attr('elementid');
				$(this).closest('.onecolumn').remove();
				var ses = [];
				for(var i_=0;i_<showelementids.length;i_++){
					if(showelementids[i_] != elementid){
						ses[ses.length] = showelementids[i_];
					}
				}
				showelementids = ses;
				otherelementids[otherelementids.length] = elementid;
				
				initElements();
			});
			canMoveColumn.click(function(){
				var onecolumn = $(this);
				var elementid = onecolumn.attr('elementid');
				var element = elementidelements[elementid];

				base.fullFormData($('#elementform'), element);
				if(element.label!=null &&element.label!='' ){
					$('#elementform').find('[name=label]').val(element.label);
				}else{
					$('#elementform').find('[name=label]').val(element.column.label);
				}
				if(element.column!=null){
					$('#elementform').find('[name=columnid]').val(element.column.columnid);
				}
				$('.tool-design').find('.onecolumn').removeClass('thisselect');
				$('.tool-design').find('[elementid='+onecolumn.attr('elementid')+']').addClass('thisselect');
			});
		}
		
	}

	initAllElementPlace();
}
function initAllElementPlace(){
	var elementparameters = $('.tool-design').find('.elementparameter');
	$('.tool-hidden-content').html('');
	$('.tool-search-show-content').html('');
	$('.tool-search-hidden-content').html('');
	showelementids = [];
	otherelementids = [];
	for(var i=0;i<elementparameters.length;i++){
		var elementparameter = $(elementparameters[i]);
		var columnelement = elementparameter.closest('.onecolumn');
		var elementid = columnelement.attr('elementid');
		showelementids[showelementids.length] = elementid;
		if(elementidelements[elementid].usedsearch&&elementidelements[elementid].usedsearch!=0){
			var displayforsearch = elementidelements[elementid].displayforsearch;
			if(displayforsearch!=null&&(displayforsearch==true||displayforsearch=="1"||displayforsearch=="true")){
				$('.tool-search-show-content').append(columnelement.clone());
			}else{
				$('.tool-search-hidden-content').append(columnelement.clone());
			}
		}
		//处理隐藏的元素
		if(elementparameter.attr('display') == 'false'||elementparameter.attr('display') == '0'){
			$('.tool-hidden-content').append(columnelement);
		}
	}
	for(var i=0;i<allelementids.length;i++){
		var elementid = allelementids[i];
		var has = false;
		for(var m=0;m<showelementids.length;m++){
			var elementid_ = showelementids[m];
			if(elementid == elementid_){
				has = true;
				break;
			}
		}
		if(!has){
			otherelementids[otherelementids.length] = elementid;
		}
	}
}

function saveAllElement(){
	var elementids = '';
	var plateid = '';
	for(var i=0;i<showelementids.length;i++){
		var elementid = showelementids[i];
		elementids += elementid + ',';
		var element = elementidelements[elementid];
		if(element.column!=null){
			element.columnid = element.column.columnid;
		}else{
			element.columnid = null;
		}
		plateid = element.plateid;
		var action = 'base/plate/managerSave.do';
		var data = {};
		data.type = 'element';
		for(var n in element){
			var value = element[n];
			if(n!='column'&&n!='input'){
				if(value!=null){
					data[n] = value;
				}
			}
			
		}
		data.sequence = i;
		base.POST(action,data,'json',function(o){
			
		},false);
	}
	
	var buttondatas = [];
	//保存按钮
	for(var i=0;i<buttons.length;i++){
		var button = buttons[i];
		var action = 'base/plate/managerSave.do';
		var data = {};
		data.type = 'button';
		for(var n in button){
			var value = button[n];
			if(n!='action'){
				if(value!=null){
					data[n] = value;
				}
			}
		}
		data.sequence = i;
		buttondatas[buttondatas.length] = data;
	}
	var datastr = JSON.stringify(buttondatas);
	var data = {};
	data.datastr = datastr;
	base.POST('base/plate/managerSave.do?type=button',data,'json',function(o){
		
	},false);
	var action = 'base/plate/deleteElement.do';
	var data = {};
	data.elementids = elementids;
	data.plateid = plateid;
	base.POST(action,data,'json',function(o){
		alert('保存成功');
	});
}