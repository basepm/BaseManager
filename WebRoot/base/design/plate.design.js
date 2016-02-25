var showelementids = [];
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
	var action = 'base/plate/design.do';
	var data = {};
	data.plateid = plateid;
	base.POST(action,data,'json',function(o){
		var data = o.data.rtnMsg;
		thisplate = data.plate;
		thisplate.design = true;
		var one = {};
		buttons = thisplate.buttons;
		for(var i=0;i<buttons.length;i++){
			one['btn'+buttons[i]['buttonid']] = buttons[i]['buttonid'];
		}
		thisplate.one = one;
		thisplate.list = [one];
		inputs = {};
		for(var i=0;i<data.inputs.length;i++){
			var input = data.inputs[i];
			inputs[input.inputtype] = input;
		}
		foreignthistabletablenames = data.foreignthistabletablenames;
		foreignthistabletablecolumns = data.foreignthistabletablecolumns;
		foreigntablenames = data.foreigntablenames;
		foreigncolumntablenames = data.foreigncolumntablenames;
		foreigntablecolumns = data.foreigntablecolumns;
		thistablecolumns = data.thistablecolumns;
		foreigntablenames = data.foreigntablenames;
		var eles = thisplate.elements;
		for(var i=0;i<eles.length;i++){
			var ele = eles[i];
			ele = initElementInfo(ele);
			var elementid = ele.elementid;
			showelementids[showelementids.length] = elementid;
			elementidelements[elementid] = ele;
		}
		initAllTableColumns();
		initElements();
	});
	
}
/*foreignthistabletablenames = data.foreignthistabletablenames;
foreignthistabletablecolumns = data.foreignthistabletablecolumns;
foreigntablenames = data.foreigntablenames;
foreigncolumntablenames = data.foreigncolumntablenames;
foreigntablecolumns = data.foreigntablecolumns;
thistablecolumns = data.thistablecolumns;
foreigntablenames = data.foreigntablenames;*/

function initAllTableColumns(){
	var index = 1;
	var panel = $('#accordion1').find('.model').clone().removeClass('model');
	panel.show();
	panel.find('.tname').text('当前表字段');
	panel.find('.a').attr('href', '#collapse_'+index);
	panel.find('.collapse').attr('id' , 'collapse_'+index);
	$(thistablecolumns).each(function(index ,column){
		
		initAllTableColumn(panel.find('.panel-body'),thisplate.tableid,thisplate.tablename,column);
	});
	$('#accordion1').append(panel);
	for(var tname in foreigntablenames){
		index++;
		var panel = $('#accordion1').find('.model').clone().removeClass('model');
		panel.show();
		panel.find('.tname').text(tname);
		panel.find('.a').attr('href', '#collapse_'+index);
		panel.find('.collapse').attr('id' , 'collapse_'+index);
		$(foreigntablecolumns[tname]).each(function(index ,column){
			initAllTableColumn(panel.find('.panel-body'),thisplate.tableid,tname,column);
		});
		$('#accordion1').append(panel);
	}

	for(var tname in foreignthistabletablenames){
		index++;
		var panel = $('#accordion1').find('.model').clone().removeClass('model');
		panel.show();
		panel.find('.tname').text(tname);
		panel.find('.a').attr('href', '#collapse_'+index);
		panel.find('.collapse').attr('id' , 'collapse_'+index);
		$(foreignthistabletablecolumns[tname]).each(function(index ,column){
			initAllTableColumn(panel.find('.panel-body'),thisplate.tableid,tname,column);
		});
		$('#accordion1').append(panel);
	}
	
	
}
function initAllTableColumn(content ,tableid ,tablename ,column){
	//组合设置的元素
	var canaddcolumn = $('<div class=" mgbt-lg-5 col-sm-12"></div>');
	canaddcolumn.append('<label class="control-label">'+column.columnname+'</label>')
	canaddcolumn.find('.control-label').append('<a class="add fa  fa-plus" columnid="'+column.columnid+'"></a>');
	canaddcolumn.find('.add').click(function(){
		var columnid = $(this).attr('columnid');
		var elementid = tool.getRandomNumber();
		var element = {};
        element.cannull = (true);
        element.display = (true);
        element.displayforsearch = (true);
        element.readonly = (false);
        element.usedsearch = (true);
		element.plateid = thisplate.plateid;
		element.elementid = elementid;
		element.column = column;
		element.inputtype = column.inputtype;
		element.input = inputs[element.inputtype];
		elementidelements[elementid] = element;
		showelementids[showelementids.length] = elementid;
		initElements();
	});
	content.append(canaddcolumn);
}
function buildDesignWorkBtn(place,elementid){
	var btngroup = $('<a class="btngroup"></a>')
	var element = elementidelements[elementid];
	var canaddbtn = false;
	if(place == 'form' || place == 'searchform'){
		
	}
	if(place == 'form' || place=='th'){
		if(elementidelements[elementid].display){
			var bt = $('<a class=" fa fa-eye-slash vd_red" elementid="'+elementid+'"></a>');
			btngroup.append(bt);
			bt.click(function(){
				var elementid = $(this).attr('elementid');
				elementidelements[elementid].display = false;
				initElements();
			});
		}else{
			var bt = $('<a class=" fa fa-eye vd_green" elementid="'+elementid+'"></a>');
			btngroup.append(bt);
			bt.click(function(){
				var elementid = $(this).attr('elementid');
				elementidelements[elementid].display = true;
				initElements();
			});
		}
	}
	if(place == 'form'){

		if(!elementidelements[elementid].readonly){
			var bt = $('<a class=" fa fa-lock vd_red" elementid="'+elementid+'"></a>');
			btngroup.append(bt);
			bt.click(function(){
				var elementid = $(this).attr('elementid');
				elementidelements[elementid].readonly = true;
				initElements();
			});
		}else{
			var bt = $('<a class=" fa fa-unlock vd_green" elementid="'+elementid+'"></a>');
			btngroup.append(bt);
			bt.click(function(){
				var elementid = $(this).attr('elementid');
				elementidelements[elementid].readonly = false;
				initElements();
			});
		}
		if(elementidelements[elementid].cannull){
			var bt = $('<a class=" fa fa-file-text-o vd_red" elementid="'+elementid+'"></a>');
			btngroup.append(bt);
			bt.click(function(){
				var elementid = $(this).attr('elementid');
				elementidelements[elementid].cannull = false;
				initElements();
			});
		}else{
			var bt = $('<a class=" fa fa-file-o vd_green" elementid="'+elementid+'"></a>');
			btngroup.append(bt);
			bt.click(function(){
				var elementid = $(this).attr('elementid');
				elementidelements[elementid].cannull = true;
				initElements();
			});
		}
	}
	if(place == 'searchform' || place=='th'){
		if(elementidelements[elementid].usedsearch){
			var bt = $('<a class=" fa fa-search-minus vd_red" elementid="'+elementid+'"></a>');
			btngroup.append(bt);
			bt.click(function(){
				var elementid = $(this).attr('elementid');
				elementidelements[elementid].usedsearch = false;
				initElements();
			});
		}else{
			var bt = $('<a class=" fa fa-search-plus vd_green" elementid="'+elementid+'"></a>');
			btngroup.append(bt);
			bt.click(function(){
				var elementid = $(this).attr('elementid');
				elementidelements[elementid].usedsearch = true;
				initElements();
			});
		}
	}
	if(place == 'searchform'){
		if(elementidelements[elementid].displayforsearch){
			var bt = $('<a class=" fa fa-eye-slash vd_red" elementid="'+elementid+'"></a>');
			btngroup.append(bt);
			bt.click(function(){
				var elementid = $(this).attr('elementid');
				elementidelements[elementid].displayforsearch = false;
				initElements();
			});
		}else{
			var bt = $('<a class=" fa fa-eye vd_green" elementid="'+elementid+'"></a>');
			btngroup.append(bt);
			bt.click(function(){
				var elementid = $(this).attr('elementid');
				elementidelements[elementid].displayforsearch = true;
				initElements();
			});
		}
		
	}
	var bt = $('<a class=" fa fa-remove vd_red" elementid="'+elementid+'"></a>');
	btngroup.append(bt);
	bt.click(function(){
		var elementid = $(this).attr('elementid');
		var ses = [];
		for(var i_=0;i_<showelementids.length;i_++){
			if(showelementids[i_] != elementid){
				ses[ses.length] = showelementids[i_];
			}
		}
		showelementids = ses;
		initElements();
	});
	
	return btngroup;
}
function initElements(){
	var es = [];
	//组合设置的元素
	for(var i=0;i<showelementids.length;i++){
		var element = elementidelements[showelementids[i]];
		element.design = true;
		es[es.length] = element;
	}
	thisplate.elements = es;

	//
	thisdesign.empty();
	thisplate.buttons = buttons;
	buildPlate(thisplate , thisdesign);
	thisdesign.find('.pagination').remove();
	

	initEntrustElementEvent();
	calculateContentHeight();
	
	initCanaddelements();
	initSortDrag();
	thisdesign.find('.toActionBtn,.baseToActionBtn,.toBackBtn ').removeClass('toActionBtn baseToActionBtn toBackBtn ')
	
	var onebuttons = thisdesign.find('.onebutton');
	for(var i=0;i<onebuttons.length;i++){
		var onebutton = $(onebuttons[i]);
		onebutton.removeClass('toActionBtn baseToActionBtn toBackBtn ')
		onebutton.click(function(){
			thisselectbuttonid =  $(this).attr('buttonid');
			initSelectButton();
		});
	}
	thisdesign.find('.needhidden').show();
	//thisdesign.find('.onecolumn').find('*').attr('disabled',"disabled")
	var onecolumns = thisdesign.find('.onecolumn');
	
	for(var i=0;i<onecolumns.length;i++){
		var onecolumn = $(onecolumns[i]);
		var elementid = onecolumn.attr('elementid');
		if(elementid==null||elementid==''){
			elementid = onecolumn.find('.elementparameter').attr('elementid');
		}
		if(elementid == null || elementid == ''){
			continue;
		}
		onecolumn.find('.input-group-addon').unbind('click');
		onecolumn.find('img').unbind('click');
		onecolumn.attr('elementid',elementid);
		var place = 'form';
		if(onecolumn.closest('.form').length>0){
			place = 'form';
		}else if(onecolumn.closest('.searchForm').length>0){
			place = 'searchform';
		}else if(onecolumn.is('th')){
			place = 'th';
		}
		var btgroup = buildDesignWorkBtn(place, elementid);
		if(onecolumn.find('.control-label').length>0){
			onecolumn.find('.control-label').append(btgroup);
		}else{
			onecolumn.append(btgroup);
		}
		onecolumn.click(function(){
			thisselectelementid =  $(this).attr('elementid');
			initSelectElement();
		});
		
	}
	initElementOptions();
	initSelectElement();
}

function addElementConfig(){
	if(thisselectelementid == null){
		alert('请选择元素！');
		return;
	}
	var element = elementidelements[thisselectelementid];
	var config = element.config;
	var configs = [];
	if(config!=null&&config!=''){
		configs = JSON.parse(config);
	}else{
	}
	var index = configs.length;
	configs[index] = {'type':'change'};
	element.config = JSON.stringify(configs);
	initElementConfig(configs[index], index);
}
function saveElementConfig(btn){
	var form = $(btn).closest('.panel').find('form');
	var data = validationForm(form);
	if(!data){
		return false;
	}
	var index = data.index;
	var element = elementidelements[thisselectelementid];
	var config = element.config;
	var configs = [];
	if(config!=null&&config!=''){
		configs = JSON.parse(config);
	}
	configs[index] = data;
	element.config = JSON.stringify(configs);
}
function deleteElementConfig(btn){
	var index = $(btn).attr('index');
	var element = elementidelements[thisselectelementid];
	var config = element.config;
	var configs = [];
	if(config!=null&&config!=''){
		configs = JSON.parse(config);
	}
	var cs = [];
	$(configs).each(function(i,config){
		if(i!=index){
			cs[cs.length] = config;
		}
	});
	element.config = JSON.stringify(cs);
	initSelectElementConfig();
}
function initSelectElementConfig(){
	
	var element = elementidelements[thisselectelementid];
	$('#accordion2').find('.oneconfig').remove();
	var config = element.config;
	var configs = [];
	if(config!=null&&config!=''){
		configs = JSON.parse(config);
	}
	$(configs).each(function(index, config){
		initElementConfig(config ,index);
	});
}
function initElementConfig(config ,index){
	var panel = $('.configeditmodel').clone().removeClass('configeditmodel');
	panel.addClass('oneconfig');
	panel.find('.saveBtn').attr('index',index);
	panel.find('.deleteBtn').attr('index',index);
	panel.show();
	panel.find('.title').text('配置项'+index);
	panel.find('.a').attr('href', '#collapse2_'+index);
	panel.find('.collapse').attr('id' , 'collapse2_'+index);
	for(var n in config){
		panel.find('[name='+n+']').val(config[n]);
	}
	panel.find('[name=index]').val(index);
	$('#accordion2').append(panel);
	panel.find('[name=hideelementids]').addClass('inputtype-select');
	panel.find('[name=showelementids]').addClass('inputtype-select');
	initEntrustElementEvent();
}
function initElementOptions(){
	$('.element-options').html('');
	$(showelementids).each(function(index, eid){
		var option = $('<option></option>');
		var element = elementidelements[eid];
		option.attr('value',eid);
		option.text(element.label);
		$('.element-options').append(option);
	});
}
function initSelectElement(){
	if(thisselectelementid == null){
		return;
	}
	initSelectElementConfig();
	var element = elementidelements[thisselectelementid];
	$('.thiselementname').text(element.label);
	base.fullFormData($('#elementform'), element);
	$('#elementform').find('[name=label]').val(element.label);
	if(element.column!=null){
		$('#elementform').find('[name=columnid]').val(element.column.columnid);
	}
	thisdesign.find('.onecolumn').removeClass('thisselect');
	thisdesign.find('[elementid='+thisselectelementid+'].onecolumn ').addClass('thisselect');
}
$(window).on('keyup', function(e){
	var keyCode = e.keyCode;
	if(thisselectelementid!=null){
		var element = elementidelements[thisselectelementid];
		var columnsize = element.columnsize;
		//-
		if(keyCode == 189 || keyCode == 187){
			if(keyCode == 189){
				columnsize--;
			}
			//+
			else if(keyCode == 187){
				columnsize++;
			}
			columnsize = columnsize < 1? 1 : columnsize;
			columnsize = columnsize > 12? 12 : columnsize;
			element.columnsize = columnsize;
			initElements();
		}
		
	}
});
var thisselectelementid = null;
function initCanaddelements(){
	
}

function initSortDrag(){
	//拖动事件
	thisdesign.find(".formcontent").sortable({
		cancel : '.btns,.searchinput,.subform ',
		cursor : 'crosshair',
		helper : 'clone',
		distance: 5,
		opacity : .6,
		scroll : false,
		update: function(e, t) {
			var onecolumns = thisdesign.find(".formcontent").find('.onecolumn');
			showelementids = [];
			var mapid = {};
			for(var i=0;i<onecolumns.length;i++){
				var onecolumn = $(onecolumns[i]);
				var elementid = onecolumn.attr('elementid');
				
				if(elementid!=null && mapid[elementid] == null){
					showelementids[showelementids.length] = elementid;
					mapid[elementid] = elementid;
				}
			}
			initElements();
		}
	}).disableSelection();
	thisdesign.find(".oneform").find(".formcontent").sortable({
		cancel : '.btns,.searchinput,.subonebtn ',
		cursor : 'crosshair',
		helper : 'clone',
		distance: 5,
		opacity : .6,
		scroll : false,
		update: function(e, t) {
			var onecolumns = thisdesign.find(".formcontent").find('.onecolumn');
			showelementids = [];
			var mapid = {};
			for(var i=0;i<onecolumns.length;i++){
				var onecolumn = $(onecolumns[i]);
				var elementid = onecolumn.attr('elementid');
				
				if(elementid!=null && mapid[elementid] == null){
					showelementids[showelementids.length] = elementid;
					mapid[elementid] = elementid;
				}
			}
			initElements();
		}
	}).disableSelection();
	thisdesign.find("table thead tr").sortable({
		cancel : '.btns .searchinput',
		cursor : 'crosshair',
		helper : 'clone',
		distance: 5,
		opacity : .6,
		scroll : false,
		update: function(e, t) {
			var onecolumns = thisdesign.find('table thead tr th.onecolumn');
			showelementids = [];
			var mapid = {};
			for(var i=0;i<onecolumns.length;i++){
				var onecolumn = $(onecolumns[i]);
				var elementid = onecolumn.attr('elementid');
				if(elementid!=null && mapid[elementid] == null){
					showelementids[showelementids.length] = elementid;
					mapid[elementid] = elementid;
				}
			}

			initElements();
		}
	});
	
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
	for(var id in elementidelements){
		if(elementid!=id){
			if(data.name == elementidelements[id].name){
				alert('不能添加元素名称相同的元素，请修改名称！');
				return;
			}
		}
	}
	for(var n in data){
		elementidelements[elementid][n] = data[n];
	}
	initElements();
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
	initElements();
}
function addButton(btn){
	var data = tool.getButtonData(btn);
	if(!data){
		return;
	}
	data.buttonid = base.getRandomNumber();
	buttons[buttons.length] = data;
	initElements();
	
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