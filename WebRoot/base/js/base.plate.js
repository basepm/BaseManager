(function(){
	'use strict';
	window.PlateView = function(p, content){
		
		function hasBatchWork(buttons){
			for(var i=0;i<buttons.length;i++){
				var button = buttons[i];
				if(button.place == ("batchwork")){
					return true;
				}
			}
			return false;
		}
		var buildPanelContent = function(plate){
			if(plate.platetype == ("treelist")){
				buildSearchForm(plate);
				buildTreeList(plate);
			}else if(plate.platetype == ("list")){
				buildSearchForm(plate);
				buildBatchForm(plate);
				buildTable(plate);
			}else if(plate.platetype == ("count")){
				buildSearchForm(plate);
				buildBatchForm(plate);
				buildTable(plate);
				content.find('.pagination').remove();
			}else if(plate.platetype == ("form")){
				buildForm(plate);
			}else if(plate.platetype == ("addform")){
				buildForm(plate);
			}
		};
		var buildBatchForm = function(plate){
			var batchWorkDiv = $("<div class=\" col-sm-12\"></div>");
			var batchWorkUl = $("<ul style=\"margin: 0px;\" class=\"pagination pagination-sm \"></ul>");
			batchWorkDiv.append(batchWorkUl);
			var elements = plate.elements;
			var buttons = plate.buttons;
			//判断是否有批量操作
			if(hasBatchWork(buttons)){
				var li = $("<li class=\" \"><a class=\"vd_checkbox checkbox-danger baseSelect baseSelectAll\"><input type=\"checkbox\" id=\"baseSelectAll\"/></a></li>");
				li.find('a').append("<label for=\"baseSelectAll\" style=\"font-size: 12px;\" > 全选 </label>");
				batchWorkUl.append(li);
				for(var i=0;i<buttons.length;i++){
					var button = buttons[i];
					if(button.place == ("batchwork")){
						var label = button.label;
						var toaction = "";
						if(button.action!=null){
							var servletpath = button.action.servletpath;
							if(servletpath.indexOf('?')<0){
								servletpath += "?1=1";
							}
							toaction = servletpath + '&thisplateid='+plate.plateid;
						}
						var batchcolumnids = button.batchcolumnids;
						if(batchcolumnids!=null && batchcolumnids!=''){
							var batchcolumnids = batchcolumnids.split(',');
							for(var n=0;n<batchcolumnids.length;n++){
								var batchcolumnid = batchcolumnids[n];
								for(var nn=0;nn<elements.length;nn++){
									var element = elements[nn];
									if(element.column!=null&&element.column.columnid == batchcolumnid){
										var canull = true;
										var display = true;
										var canupdate = false;
										element.batchform = true;
										var li = $("<li class=\" \" ><a style=\"width: 150px;padding: 0px;\"></a></li>")
										var input = (buildFormElement(element.elementid, element, "", canull, display, display));
										li.find('a').append(input);
										batchWorkUl.append(li);
									}
								}
							}
						}
						batchWorkUl.append("<li class=\" \"><a href=\"javascript:;\" class=\"baseBatchWorkBtn\" form=\"p:ul\" form toAction=\""+toaction+"\">"+label+"</a></li>");
					}
				}
			}
			content.append(batchWorkDiv);
		}
		var buildTable = function(plate){
			var keyname = "thiskeyvalue";
			var table = $("<table class=\"table table-hover table-striped no-head-border\"></table>");
			var thead = $("<thead></thead>");
			var tbody = $("<tbody></tbody>");
			var theadtr = $("<tr></tr>");
			thead.append(theadtr);
			table.append(thead);
			table.append(tbody);
			if(plate.needsortable){
				table.find('tbody').addClass("needsortable-list");
				table.find('tbody').addClass("needsortable-list-1");
				table.find('tbody').attr("needsortable-index",1);
				table.find('tbody').attr("tablename", plate.tablename);
			}
			var elements = plate.elements;
			theadtr.append("<th style=\"text-align: left;word-break: keep-all;\">序号</th>");
			var columnCount = 1;
			for(var i=0;i<elements.length;i++){
				var element = elements[i];
				if(!element.display){
					theadtr.append("<th display=\"false\" class=\"onecolumn needhidden\" elementid=\""+element.elementid+"\" style=\"text-align: left;display: none;word-break: keep-all;\">"+element.label+"</th>");
				}
			}
			for(var i=0;i<elements.length;i++){
				var element = elements[i];
				if(element.display){
					var th = $("<th display=\"true\" class=\"onecolumn\" elementid=\""+element.elementid+"\" style=\"text-align: left;word-break: keep-all;\">"+element.label+"</th>");
					if(element.cansequence){
						th.attr('eid', element.elementid);
						th.attr('elementname', element.name);
						if(element.orderbystr == null || element.orderbystr == ''){
							th.addClass('base_sort_both');
							th.addClass('baseOrderByBtn');
						}
						else if(element.orderbystr.indexOf('asc')>0){
							th.addClass('base_sort_asc');
							th.addClass('baseOrderByBtn');
							th.attr('sort','asc');
						}else if(element.orderbystr.indexOf('desc')>0){
							th.addClass('base_sort_desc');
							th.addClass('baseOrderByBtn');
							th.attr('sort','desc');
						}else{
							th.addClass('base_sort_both');
							th.addClass('baseOrderByBtn');
						}
					}
					theadtr.append(th);
					columnCount++;
				}
			}
			var actionth = $("<th class=\"table-action-th\" style=\"text-align: left;word-break: keep-all;\">操作</th>");
			if(plate.platetype != ("count")){
				theadtr.append(actionth);
				columnCount++;
			}
			if(plate.list==null || plate.list.length<1){
				var tbodytr = $("<tr></tr>");
				tbody.append(tbodytr);
				tbodytr.append("<td style=\"text-align: center;word-break: keep-all;\" colspan=\""+columnCount+"\">暂无匹配条件数据</td>");
			}else{
				var list = plate.list;
				var index = 0;
				var buttons = plate.buttons;
				for(var i=0;i<list.length;i++){
					var one = list[i];
					var tbodytr = $("<tr class=\"needsortable-one-1\" thisid=\""+one[keyname]+"\" >");
					tbody.append(tbodytr);
					index++;
					//判断是否有批量操作
					if(hasBatchWork(buttons)){
						var batchWorkStr = "";
						batchWorkStr+="<a class=\"vd_checkbox checkbox-danger baseSelect baseSelectOne\"><input type=\"checkbox\" value=\""+one[keyname]+"\" id=\"baseSelectOne"+index+"\"/>";
						batchWorkStr+="<label for=\"baseSelectOne"+index+"\" > "+index+" </label></a>";
						tbodytr.append("<td style=\"text-align: left;word-break: keep-all;\">"+batchWorkStr+"</td>");
					}else{
						tbodytr.append("<td style=\"text-align: left;word-break: keep-all;\">"+index+"</td>");
					}
					//组合操作
					var actionTd = $("<td class=\"menu-action table-action-th\" style=\"text-align: left;word-break: keep-all;display: flex;\"></td>");
					for(var m=0;m<buttons.length;m++){
						var button = buttons[m];
						var buttonname = "btn"+button.label+"";
						if(button.place == ("list") && (one[(buttonname)]!= null || plate.design)){
							actionTd.append(buildBtn(button, one, 'p:tr', plate));
						}
					}
					for(var m=0;m<elements.length;m++){
						var element = elements[m];
						if(!element.display){
							tbodytr.append("<td class='onecolum needhidden' display='false' style='display: none;word-break: keep-all;'></td>");
						}
					}
					for(var m=0;m<elements.length;m++){
						var element = elements[m];
						if(element.display){
							var name = element.name;
							var value = getElementValue(element, one);
							var thisvalue = getShowValue(element, value);
							if(element.inputtype == 'image'){
								var imgstr = "<img style=\"width: 60px;\" src=\""+base.getImagePath(thisvalue)[0]+"\" />";
								tbodytr.append("<td style=\"\">"+imgstr+"</td>");
							}else if(element.inputtype == 'images'){
								var imgstr = "<img style=\"width: 60px;\" src=\""+base.getImagePath(thisvalue)[0]+"\" />";
								tbodytr.append("<td style=\"\">"+imgstr+"</td>");
							}else{
								tbodytr.append("<td style=\"\">"+thisvalue+"</td>");
							}
						}
					}
					if(plate.platetype != ("count")){
						tbodytr.append(actionTd);
					}
					if(plate.link!=null && plate.link!=''){
						var link = plate.link;
						if(link.indexOf('thiskeyvalue')>0){
							link = link.replace('thiskeyvalue',one['thiskeyvalue']);
						}else{
							link += "&"+plate.keycolumnname+"="+one['thiskeyvalue'];
						}
						tbody.append("<tr><td style=\"text-align: left;word-break: keep-all;\">"+index+".1</td><td colspan=\""+(columnCount-1)+"\" style=\"font-size: 12px;word-break: keep-all;\">"+link+"</td></tr>");
					}
				}
			}
			var ul = getListPaginationUl(plate);
			ul.find('ul').css('display','flex');
			ul.find('li').css('word-break','keep-all');
			ul.find('li').css('display','inline-table');
			var tableDiv = $("<div class=\"col-sm-12 table-responsive\"></div>").append(table).append($("<div class=\"row\"></div>").append(ul));
			content.append(tableDiv);
			return table;
		};
		function buildTreeList(plate){
			var list = plate.list;
			var buttons = plate.buttons;
			var thistreelistdatastr = "[";
			var datas = [];
			var treeDiv = $("<div class=\"col-sm-12\"></div>")
			treeDiv.append("<div class=\"row\" style=\"margin: 0px;border-bottom: 1px solid #ddd;padding: 8px 0px;font-weight: 700;\"><div class=\"col-sm-6 text-center\">名称</div><div class=\"col-sm-6 text-center\">操作</div></div>");
			if(list == null || list.length < 1){
				treeDiv.append("<div style=\"text-align: center;word-break: keep-all;\">暂无匹配条件数据</div>");
			}else{
				for(var i=0;i<list.length;i++){
					var one = list[i];
					var btnhtml = "";
					for(var m=0;m<buttons.length;m++){
						var button = buttons[m];
						var button_ = buildBtn(button, one, "p:form", plate);
						var buttonname = "btn"+button.label;
						if((button.place == ("list") || button.place == ("treelist")) && (one[(buttonname)]!=null || plate.design)){
							btnhtml += (button_);
						}
					}
					var id = one[(plate.treeidname)];
					id = id == null?"":id;
					var pid = one[(plate.treepidname)];
					pid = pid == null?"":pid;
					var name = one[(plate.treenamename)];
					name = name == null?"":name;
					if(plate.design){
						id = id == ""?"1":id;
						name = name == ""?"名称":name;
					}
					var data = {};
					data['id'] = id;
					data['pid'] = pid;
					data['name'] = name;
					data['btnhtml'] = btnhtml;
					datas[datas.length] = data;
				}
			}
			var treepanel = $("<div class=\"sys_tree_list this_sys_tree_list \" style=\"min-width: 800px;\"></div>");
			treeDiv.append(treepanel);
			content.append(treeDiv);
			//组合树状菜单
			var setting = {};
			setting.haveCheckbox = false;
			setting.needsortable = plate.needsortable;
			setting.tablename = plate.tablename;
			base.tree(treepanel, setting, datas);
		}
		var buildForm = function(plate){

			var allreadonly = false;
			if(plate.buttons.length < 1){
				allreadonly = true;
			}
			var elements = plate.elements;
			var results = [];
			var formModel = $("<form class=\"form-horizontal\" onsubmit=\"javascript:return false;\"><div class=\"col-sm-12\"><div class=\"row formcontent parentform\"></div></div></form>");
			formModel.addClass("form");
			var remark = "";
			if(plate.link!=null && plate.link!=""){
				var link = plate.link;
				if(link.indexOf("thiskeyvalue")>0){
					link = link.replace("thiskeyvalue",plate.one["thiskeyvalue"]);
				}else{
					link += "&"+plate.keycolumnname+"="+plate.one["thiskeyvalue"];
				}
				remark = (""+link+"");
			}
			if(remark!=null && remark!=''){
				content.closest(".vd_content-wrapper").find(".vd_panel-header").append(remark);
			}
			var hiddenElementDiv = $("<div></div>");
			var showElementDiv = $("<div></div>");
			var subtablename = null;
			var one = plate.one;
			one = one == null?{}:one;
			var needsublist = false;
			$(elements).each(function(index, element){
				var value = getElementValue(element, one);
				if(allreadonly){
					element.readonly = true;
				}
				//必要 必填
				var cannull = element.cannull;
				//只读
				var canupdate = !element.readonly;
				var display = element.display;
				if(element.isthistable || element.isforeigntable){
					if(!element.display){
						var input = $(buildFormElement(element.elementid, element, value, cannull, canupdate, display));
						hiddenElementDiv.append(input);
					}else{
						var input = $(buildFormElement(element.elementid, element, value, cannull, canupdate, display));

						showElementDiv.append(input);
					}
				}else{
					needsublist = true;
				}
				
			});

			formModel.find(".parentform").append("<input name=\"thisplateid\" class=\"parameter hiddenparameter\" type=\"hidden\" value=\""+plate.plateid +"\" />");
			formModel.find(".parentform").append(hiddenElementDiv.html());
			formModel.find(".parentform").append("<div class=\"col-sm-12\"></div>");
			formModel.find(".parentform").append(showElementDiv.html());
			if(needsublist){
				var subonemodel = null;
				var subform = $("<form class=\"subform \"  ></form>");
				subform.append("<div class=\"subformbtn col-sm-12\" style=\"height: 30px;margin-top: 20px;\"><h3 class=\"list-title\">列表数据</h3></div>");
				subform.append("<div class=\"list needsortable-list needsortable-list-01\" needsortable-index=\"01\" style=\"padding: 0px 15px;\"></div>");
				var list = plate.list;
				list = list == null?[]:list;
				if(list.length<1){
					list = [{}];
				}
				var tablechinesename = null;
				$(list).each(function(index, one){
					var subone = $("<div class=\"col-sm-6 oneform\"><div class=\"subone formcontent needsortable-one-01 col-sm-12\" style=\"border: 1px dotted #C7C5C5;background: #FDFDFD_;margin-bottom: 15px;padding: 15px;\" ></div></div>");
					var hiddenListElementDiv = $("<div></div>");
					var showListElementDiv = $("<div></div>");
					$(elements).each(function(index, element){
						var value = getElementValue(element, one);
						tablechinesename = element.tablechinesename;
						//必要 必填
						var cannull = element.cannull;
						//只读
						var canupdate = !element.readonly;
						var display = element.display;
						if(!element.isthistable && !element.isforeigntable){
							subtablename = element.column.table.tablename;
							if(!element.display){
								var input = $(buildFormElement(element.elementid, element, value, cannull, canupdate, display));
								hiddenListElementDiv.append(input);
							}else{
								var input = $(buildFormElement(element.elementid, element, value, cannull, canupdate, display));
								showListElementDiv.append(input);
							}
						}
					});
					subone.find(".formcontent").append("<div class=\"subonebtn col-sm-12\" style='height: 30px;'></div>");
					subone.find(".formcontent").append(hiddenListElementDiv.html());
					subone.find(".formcontent").append("<div class=\" col-sm-12\"></div>");
					subone.find(".formcontent").append(showListElementDiv.html());
					subone.find(".formcontent").find(".subonebtn").append("<a class=\"deletesubone btn btn-xs onebutton vd_bd-red vd_red \" style=\" position: absolute;right: 0px;top: -5px;z-index: 5;\">删除</a>")
					subone.find(".formcontent").find(".subonebtn").find(".deletesubone").click(function(){
						$(this).closest(".oneform").remove();
					});
					subform.find(".list").append(subone);
					
					subonemodel = subone.clone();
				});
				subform.find(".list-title").text(tablechinesename+"数据")
				if(subonemodel!=null){
					subonemodel.find(".elementparameter").val("");
					subonemodel.find(".elementparameter").addClass("needinitelementconfig");
					subonemodel.find(".elementparameter").attr("value", "");
					formModel.find(".parentform").append("<div class=\"col-sm-12\"></div>");
					formModel.find(".parentform").append(subform);
					subform.find(".subformbtn").append("<a class=\"addsubone btn btn-xs onebutton vd_bd-green vd_green \" style=\" position: absolute;right: 15px;top: 0px;\">添加</a>")
					subform.find(".subformbtn").find(".addsubone").click(function(){
						var subone = subonemodel.clone();
						subone.find(".formcontent").find(".subonebtn").find(".deletesubone").click(function(){
							$(this).closest(".oneform").remove();
						});
						subform.find(".list").append(subone);
						initEntrustElementEvent();
					});
				}
				
			}
			
			
			//组合按钮
			var buttonGroup = $("<div class=\"col-sm-12 btn-div\"><div class=\" btns\" style=\"margin-top: 10px;margin-bottom: 10px;\"></div></div>");
			buttonGroup.find(".btns").append("<a class=\"btn vd_btn vd_grey  toBackBtn \" href=\"javascript:;\">取消</a>");
			var buttons = plate.buttons;
			for(var i=0;i<buttons.length;i++){
				var button = buttons[i];
				if(button.place == ("form") && ((one[("btn"+button.label)]!=null || one["thisisaddplate"]) || plate.design)){
					var btn = $(buildBtn(button, one, "p:form", plate));
					btn.removeClass("btn-xs");
					btn.addClass("vd_btn");
					buttonGroup.find(".btns").append(btn);
				}
			}
			formModel.find(".parentform").append(buttonGroup);
			content.append(formModel);
		};
		var buildSearchForm = function(plate){
			var elements = plate.elements;
			var searchFormModel = $("<form class=\"form-horizontal\" onsubmit=\"javascript:return false;\"><div class=\"col-sm-12\"><div class=\"row formcontent\"></div></div></form>");
			searchFormModel.addClass("searchForm");
			var hiddenElementDiv = $("<div></div>");
			var showElementDiv = $("<div></div>");
			//页数
			var pages = [1 , 5, 10 , 20 , 30];
			var pageSelect = $("<select class=\"form-control elementparameter needinitelement inputtype-select\" ></select>")
			var pagesize = plate.pagesize;
			$(pages).each(function(index ,page){
				var option = $("<option />");
				option.attr("value", page);
				option.text(page);
				if(page == pagesize){
					option.attr("selected" , "selected");
				}
				pageSelect.append(option);
			});
			pageSelect.attr("label", "显示");
			pageSelect.attr("name", "pagesize");
			pageSelect.attr("columnsize", "3");
			pageSelect.attr("inputgrouptype", "1");
			pageSelect.attr("value", pagesize);
			showElementDiv.append(pageSelect);
			var one = plate.forshowsearchdatas;
			$(elements).each(function(index, element){
				var cannull = true;
				var canupdate = true;
				var display = true;
				element.search = true;
				if(element.usedsearch){
					if(!element.displayforsearch){
						var value = getElementValue(element, one);
						display = false;
						var input = $(buildFormElement(element.elementid, element, value, cannull, canupdate, display));
						hiddenElementDiv.append(input);
					}else{
						display = true;
						var startelement = jQuery.extend(true, {}, element);
						var endelement = jQuery.extend(true, {}, element);
						startelement.name = element.name+"_start";
						endelement.name = element.name+"_end";
						var value = getElementValue(element, one);
						var startvalue = getElementValue(startelement, one);
						var endvalue = getElementValue(endelement, one);
						if(element.intervalsearch){
							var intervalsearchDiv = $("<div class=\"col-sm-6 onecolumn \" elementid=\""+startelement.elementid+"\" style=\"padding-left: 0px;padding-right: 0px;\">");
							
							startelement.label += "(<span class=\"vd_red\">始</span>)";
							startelement.columnsize = 6;
							
							intervalsearchDiv.append(buildFormElement(startelement.elementid, startelement, startvalue, cannull, canupdate, display));
							endelement.label += "(<span class=\"vd_red\">止</span>)";
							endelement.columnsize = 6;
							intervalsearchDiv.append(buildFormElement(endelement.elementid, endelement, endvalue, cannull, canupdate, display));
							
							showElementDiv.append(intervalsearchDiv);
						}else{
							showElementDiv.append(buildFormElement(element.elementid, element, value, cannull, canupdate, display));
						}
					}
				}
				
			});
			searchFormModel.find(".formcontent").append(hiddenElementDiv.html());
			searchFormModel.find(".formcontent").append("<div class=\"col-sm-12\"></div>");
			searchFormModel.find(".formcontent").append(showElementDiv.html());
			
			//组合按钮
			var buttonGroup = $("<div class=\"col-sm-12 text-right \"><div class=\" btns\" style=\"margin-top: 10px;margin-bottom: 10px;\"></div></div>");
			buttonGroup.find(".btns").append("<button type=\"reset\" class=\"btn btn-xs vd_btn vd_black\" href=\"javascript:;\"><span class=\"menu-icon\"><i class=\"fa fa-times-circle\"></i></span> 重置</button>");
			buttonGroup.find(".btns").append("<a style=\"margin-left: 5px;\" class=\"btn vd_btn btn-xs vd_bg-green vd_white baseSearchBtn \" href=\"javascript:;\"><span class=\"menu-icon\"><i class=\"fa fa-check-circle\"></i></span> 搜索</a>");
			if(plate.canexport){
				buttonGroup.find(".btns").append("<a style=\"margin-left: 5px;\" toAction=\"/base/toExportData.do?plateid="+plate.plateid+"\" class=\"btn vd_btn btn-xs vd_bg-green vd_white toActionBtn \" href=\"javascript:;\"><span class=\"menu-icon\"><i class=\"fa fa-check-circle\"></i></span> 导出</a>");
			}
			
			var buttons = plate.buttons;
			for(var i=0;i<buttons.length;i++){
				var button = buttons[i];
				if(button.place == ("form")){
					buttonGroup.find(".btns").append(buildBtn(button, one, "p:form", plate));
				}
			}
			searchFormModel.find(".formcontent").append(buttonGroup);
			content.append(searchFormModel);
		};
		function buildBtn(button, one, formstr, plate){
			var toActionUrl = getButtonAction(plate, button, one);
			var actiontype = "topage";
			if(button.action!=null){
				actiontype = button.action.actiontype;
			}
			var showinwindow = button.showinwindow;
			showinwindow = showinwindow!=null && (showinwindow == "1"||showinwindow == true)? true : false;
			if(actiontype == null || "" == (actiontype) || actiontype == ("topage")){
				actiontype = " baseToActionBtn ";
			}else if(actiontype == ("delete")){
				actiontype = " baseDeleteBtn ";
			}else{
				actiontype = " baseSubmitBtn ";
			}
			var successtodo = button.successtodo;
			var classname = " vd_bd-"+button.color+" vd_"+button.color;
			if(button.place == ("form")){
				classname = " vd_bg-"+button.color+" vd_white ";
			}
			var button_ = ("<a style='margin-left: 5px;' showinwindow='"+showinwindow+"' buttonid='"+button.buttonid+"' class='btn btn-xs onebutton "+actiontype+" "+classname+" ' toAction='"+toActionUrl+"' data-original-title='"+button.label+"' data-toggle='tooltip' " +
					" data-placement='top' form='"+formstr+"' successtodo='"+successtodo+"' shouldconfirm='"+button.shouldconfirm+"' >"+button.label+"</a>");
			return (button_);
		}
		function buildFormElement(elementid, element, value, cannull, canupdate, display){
			var label = element.label;
			var design = element.design;
			var search = element.search;
			var inputtype = element.inputtype;
			var batchform = element.batchform;
			var name = element.name;
			var messageinfo = element.messageinfo;
			var minlength = element.minlength;
			var maxlength = element.maxlength;
			var linkagename = element.linkagename;
			var id = elementid;
			var parameterstr = "";
			var columnsize = element.columnsize;
			var inputgrouptype = element.inputgrouptype;
			var config = element.config;
			var helpinfo = element.helpinfo;
			var showvalue = getShowValue(element, value);
			//隐藏
			if(!display){
				inputtype = "text";
			}
			if(search){
				if(inputtype == "switch" ){
					inputtype = "select";
				}
				if(inputtype == "textarea" || inputtype == "editor"
					|| inputtype == "image" || inputtype == "images" || inputtype == 'file' || inputtype == 'files'){
					inputtype = 'text';
				}
			}
			var isTextareas = ['textarea','editor','',''];
			var isSelects = ['select','selectcheckbox','selectchild','',''];
			var isCheckboxs = ['switch','','',''];
			var input = null;
			$(isTextareas).each(function(index , type){
				if(type == inputtype){
					input = $("<textarea  rows=\"3\" >"+value+"</textarea>");
				}
			});
			$(isSelects).each(function(index , type){
				if(type == inputtype){
					input = $("<select ></select>");
				}
			});
			$(isCheckboxs).each(function(index , type){
				if(type == inputtype){
					input = $("<input type=\"checkbox\" />");
				}
			});
			if(input == null){
				input = $("<input type=\"text\" />");
			}
			
			input.attr('value' , value);
			input.val(value);
			input.attr('helpinfo' ,helpinfo );
			input.attr('elementid' ,elementid );
			input.attr('showvalue' ,showvalue );
			input.attr('id' ,id );
			input.attr('name' ,name );
			input.attr('label' ,label );
			input.attr('info' ,messageinfo );
			input.attr('linkagename' ,linkagename );
			input.attr('placeholder' ,label );
			input.attr('minlength' ,minlength );
			input.attr('maxlength' ,maxlength );
			input.attr('cannull' ,cannull );
			input.attr('columnsize' ,columnsize );
			input.attr('inputgrouptype' ,inputgrouptype );
			input.attr('canupdate' ,canupdate );
			input.attr('display' ,display );
			input.attr('inputtype' ,inputtype );
			input.attr('design' ,design );
			input.attr('search' ,search );
			input.attr('needaddon' , true );
			input.addClass('elementparameter');
			input.addClass('needinitelement');
			if(config!=null && config!=''){
				input.addClass('needinitelementconfig');
				input.attr('config' ,config);
			}
			if(inputtype == 'image'){
				input.addClass('inputtype-file');
				input.attr('filetype' ,'image' );
			}else if(inputtype == 'file'){
				input.addClass('inputtype-file');
				input.attr('filetype' ,'file' );
			}else if(inputtype == 'files'){
				input.addClass('inputtype-file');
				input.attr('filetype' ,'files' );
				input.attr('length' ,'5' );
			}else if(inputtype == 'apk'){
				input.addClass('inputtype-file');
				input.attr('filetype' ,'apk' );
			}else if(inputtype == 'audio'){
				input.addClass('inputtype-file');
				input.attr('filetype' ,'audio' );
			}else if(inputtype == 'images'){
				input.addClass('inputtype-file');
				input.attr('filetype' ,'image' );
				input.attr('length' ,'5' );
			}else if(inputtype == 'selectchild'){
				input.addClass('inputtype-select');
			}else if(inputtype == 'selects'){
				input.addClass('inputtype-select');
				input.attr('ischeckbox' ,'true' );
			}else{
				input.addClass('inputtype-'+inputtype);
			}
			if(batchform){
				input.attr('needgroup' ,'false' );
			}
			if(batchform){
				input.attr('style' ,'height: 28px;border: 0px;padding: 0px;margin: 0px;font-size: 12px;' );
			}
			var datas = element.selectdatas;
			var inputDiv = $('<div></div>');

			if(element.needwrap){
				inputDiv.append("<div class=\"col-sm-12\"></div>");
			}
			inputDiv.append(input);
			if(datas!=null){
				var relationname = "";
				var baseoption = $('<select class="baseoption" hidden/>');
				$(datas).each(function(index, data){
					var option = $('<option />');
					for(var n in data){
						option.attr(n, data[n]);
					}
					if(data[("relationname")]!=null){
						relationname = data[("relationname")];
					}
					baseoption.append(option);
				});
				if(relationname!=null && relationname!=''){
					input.attr('relationname', relationname);
				}
				inputDiv.append(baseoption);
			}

			return $(inputDiv.html());
		}
		function getListPaginationUl(plate){
			var currentpage = plate.currentpage;
			var totalpages = plate.totalpages;
			var totalcount = plate.totalcount;
			var pagesize = plate.pagesize;
			var uppage = plate.uppage;
			var nextpage = plate.nextpage;
			var ul = $("<ul class=\"pagination pagination-sm\" ></ul>");
			var li = $("<li ><a href=\"javascript:;\" >|&lt;</a></li>");
			ul.append(li);
			if(currentpage<=1){
				li.addClass('disabled');
			}
			if(currentpage>1){
				li.find('a').addClass('pageSearchBtn');
				li.find('a').attr('pagesize' , 1);
			}
			li = $("<li ><a href=\"javascript:;\" >&lt;</a></li>");
			ul.append(li);
			if(currentpage<=1){
				li.addClass('disabled');
			}
			if(currentpage>1){
				li.find('a').addClass('pageSearchBtn');
				li.find('a').attr('currentpage' , uppage);
			}
			if(totalpages > 6){
				if(currentpage <= 3){
					var pageIndex = 1;
					for(var i=1;i<=6;i++){
						li = $("<li ><a href=\"javascript:;\" >"+pageIndex+"</a></li>");
						ul.append(li);
						if(pageIndex == currentpage){
							li.addClass('active');
						}else{
							li.find('a').addClass('pageSearchBtn');
						}
						li.find('a').attr('currentpage' , pageIndex);
						pageIndex++;
					}
					li = $("<li ><a href=\"javascript:;\" >...</a></li>");
					ul.append(li);
				}
				if(currentpage > 3 && currentpage < (totalpages-3)){
					li = $("<li ><a href=\"javascript:;\" >...</a></li>");
					ul.append(li);
					var pageIndex = currentpage - 2;
					for(var i=1;i<=6;i++){
						li = $("<li ><a href=\"javascript:;\" >"+pageIndex+"</a></li>");
						ul.append(li);
						if(pageIndex == currentpage){
							li.addClass('active');
						}else{
							li.find('a').addClass('pageSearchBtn');
						}
						li.find('a').attr('currentpage' , pageIndex);
						pageIndex++;
					}
					li = $("<li ><a href=\"javascript:;\" >...</a></li>");
					ul.append(li);
				}
				if(currentpage >= (totalpages-3)){
					li = $("<li ><a href=\"javascript:;\" >...</a></li>");
					ul.append(li);
					var pageIndex = totalpages - 5;
					for(var i=1;i<=6;i++){
						li = $("<li ><a href=\"javascript:;\" >"+pageIndex+"</a></li>");
						ul.append(li);
						if(pageIndex == currentpage){
							li.addClass('active');
						}else{
							li.find('a').addClass('pageSearchBtn');
						}
						li.find('a').attr('currentpage' , pageIndex);
						pageIndex++;
					}
				}
			}else{
				if(totalpages <=6){
					var pageIndex = 1;
					for(var i=1;i<=totalpages;i++){
						li = $("<li ><a href=\"javascript:;\" >"+pageIndex+"</a></li>");
						ul.append(li);
						if(pageIndex == currentpage){
							li.addClass('active');
						}else{
							li.find('a').addClass('pageSearchBtn');
						}
						li.find('a').attr('currentpage' , pageIndex);
						pageIndex++;
					}
				}
			}
			li = $("<li ><a href=\"javascript:;\" >&gt;</a></li>");
			ul.append(li);
			if(currentpage>=totalpages){
				li.addClass('disabled');
			}
			if(currentpage<totalpages){
				li.find('a').addClass('pageSearchBtn');
				li.find('a').attr('currentpage' , nextpage);
			}
			li = $("<li ><a href=\"javascript:;\" >&gt;|</a></li>");
			ul.append(li);
			if(currentpage>=totalpages){
				li.addClass('disabled');
			}
			if(currentpage<totalpages){
				li.find('a').addClass('pageSearchBtn');
				li.find('a').attr('currentpage' , totalpages);
			}
			li = ("<li class=\"disabled\"><a href=\"javascript:;\" >"+currentpage+"/"+totalpages+"</a></li>");
			ul.append(li);
			li = ("<li class=\"disabled\"><a href=\"javascript:;\" >"+pagesize+"条/页</a></li>");
			ul.append(li);
			li = ("<li class=\"disabled\"><a href=\"javascript:;\" >共"+totalcount+"条</a></li>");
			ul.append(li);
			ul.find('.pageSearchBtn').click(function(){
				var currentpage = $(this).attr('currentpage');
				formSearch(currentpage , true);
			});
			var ulDiv = $("<div class='col-sm-12'></div>").append(ul);
			return ulDiv;
		}
		var plate = jQuery.extend(true, {}, p);
		if(plate.one == null){
			plate.one = {};
		}
		buildPanelContent(plate);
		initEntrustElementEvent();
		var platetype = plate.platetype;
		var needsearch = false;
		if(plate.platetype == ("treelist")){
			needsearch = true;
		}else if(plate.platetype == ("list")){
			needsearch = true;
		}else if(plate.platetype == ("addform")){
			content.find('.baseRefreshData').remove();
		}else if(plate.platetype == ("form")){
			content.find('.baseRefreshData').remove();
		}else if(plate.platetype == ("count")){
			needsearch = true;
		}
		if(needsearch){
			if(!plate.design){
				
				content.find('.baseOrderByBtn').click(function(){
					
					var sort = $(this).attr('sort');
					if(sort == null){
						sort = 'asc'
					}else if(sort == 'asc'){
						sort = 'desc'
					}else if(sort == 'desc'){
						sort = 'asc'
					}
					content.find('.baseOrderByBtn').attr('sort','');
					$(this).attr('sort' ,sort);
					formSearch(1 , true );
				});
				
				content.find('.baseSearchBtn').click(function(){
					formSearch(1 , true );
				});
				
				content.find('.refreshData').click(function(){
					var currentpage = plate.currentpage;
					formSearch(currentpage , false);
				});
			}
			

		}
		function formSearch(currentpage, needToPage){
			currentpage = currentpage == null?1:currentpage;
			
			if(needToPage){
				var data = {};
				var formdatas = validationForm(content.find('.searchForm'));
				content.find('.searchForm').find('.elementparameter').removeClass('vd_bd-green');
				data = jQuery.extend(true, data, formdatas);
				data.plateid = plate.plateid;
				data.currentpage = currentpage;
				for(var n in data){
					if(n.indexOf('_orderbystr')>0){
						delete data[n];
					}
				}
				var baseOrderByBtns = content.find('.baseOrderByBtn');
				var elements = plate.elements;
				$(baseOrderByBtns).each(function(i ,baseOrderByBtn){
					var sort = $(baseOrderByBtn).attr('sort');
					var elementname = $(baseOrderByBtn).attr('elementname');
					if(sort == null || sort == ''){
						return;
					}
					data[elementname+'_orderbystr'] = sort;
				});
				
				base.getAction(plate.searchlistaction, data);
			}else{
				var data = base.getHrefData();
				var formdatas = validationForm(content.find('.searchForm'));
				content.find('.searchForm').find('.elementparameter').removeClass('vd_bd-green');
				data = jQuery.extend(true, data, formdatas);
				data.plateid = plate.plateid;
				data.currentpage = currentpage;
				for(var n in data){
					if(n.indexOf('_orderbystr')>0){
						delete data[n];
					}
				}
				content.find('.table').parent().next().remove();
				content.find('.table').parent().remove();
				base.POST('base/plate/getData.do',data,'json',function(o){
					var pageModel = o.data.rtnMsg;
					plate.list = pageModel.list;
					plate.one = pageModel.one;
					plate.currentpage = pageModel.currentpage;
					plate.totalpages = pageModel.totalpages;
					plate.totalcount = pageModel.totalcount;
					plate.pagesize = pageModel.pagesize;
					plate.uppage = pageModel.uppage;
					plate.nextpage = pageModel.nextpage;
					buildTable(plate);
				}, 'false');
			}
		}
	};
})();
function buildPlate(plate ,content){
	if(plate.one == null){
		plate.one = {};
	}
	//初始化模块元素
	initPlateElement(plate);
	calculateContentHeight();
	PlateView(plate, content);
	
}
/**
 * 组建模块
 * @param plates
 */
function buildPlates(plates){
	var plateslength = plates.length;
	for(var i=0;i<plateslength;i++){
		var plate = plates[i];
		var plateContent = $('.plate-content-'+plate.plateid);
		buildPlate(plate ,plateContent);
		
		var needsortablelists = plateContent.find(".needsortable-list");
		for(var i=0;i<needsortablelists.length;i++){
			var needsortablelist = $(needsortablelists[i]);
			var needsortableindex = needsortablelist.attr('needsortable-index');
			$('.needsortable-list-'+needsortableindex).sortable({
				opacity: 0.35,
				update: function(e,t) {
					var needsortableindex = $(this).attr('needsortable-index');
					var tablename = $(this).attr('tablename');
					var datas = $(this).find('.needsortable-one-'+needsortableindex);
					var idstr = '';
					datas.each(function(index , d){
						idstr += $(d).attr('thisid') + ",";
						$(d).find('[name=sequence]').val(index);
					});
					if(tablename!=null && tablename!='' &&idstr!=null && idstr!=''  ){
						var data = {};
						data.tablename = tablename;
						data.idstr = idstr;
						var action = "/base/sortable.do";
						base.POST(action, data, 'json', function(o){
							
						}, false);
					}
					
				}
			});
		}
	}
}

function initPlateElement(plate){
	var elements = plate.elements;
	var thisforeigntables = [];
//	console.log(plate.table)
	if(plate.table.foreigntables!=null){
		thisforeigntables = plate.table.foreigntables;
	}
	var thistableid = plate.tableid;
	var elements1 = [];
	var elements2 = [];
	$(elements).each(function(index, element){
		if(element.column!=null){
			var column = element.column;
			var table = column.table;
			var tableid = table.tableid;
			if(tableid == thistableid){
				elements1[elements1.length] = element;
				element.isthistable = true;
				element.isforeigntable = false;
			}else{
				element.isthistable = false;
				var isforeigntable = false;
				$(thisforeigntables).each(function(index,t){
					if(t.tableid == tableid){
						isforeigntable = true;
					}
				});
				element.isforeigntable = isforeigntable;
				if(isforeigntable){
					elements1[elements1.length] = element;
				}else{
					elements2[elements2.length] = element;
				}
			}
			
		}else{
			element.isthistable = true;
			elements1[elements1.length] = element;
		}
	});
	var eles = [];
	$(elements1).each(function(index,element){
		eles[eles.length] = element;
	});
	$(elements2).each(function(index,element){
		eles[eles.length] = element;
	});
	elements = plate.elements = eles;
	for(var i=0;i<elements.length;i++){
		initElementInfo(elements[i]);
	}
}

function getElementValue(element, one){
	if(one == null){
		return '';
	}
	var name = element.name;
	var value = one[(name)];
	if(value == null){
		value = "";
	}
	if(element.value!=null && element.value!=''){
		value = element.value;
	}

	value = value==null?"":value;

	return value;
}
function initElementInfo(element){
	var column = element.column;
	var display = element.display;
	if(display != null && (display==false||display == '0')){
		element.display = false;
	}else{
		element.display = true;
	}

	var needwrap = element.needwrap;
	if(needwrap != null && (needwrap==true||needwrap == '1')){
		element.needwrap = true;
	}else{
		element.needwrap = false;
	}
	var displayforsearch = element.displayforsearch;
	if(displayforsearch != null && (displayforsearch==false||displayforsearch == '0')){
		element.displayforsearch = false;
	}else{
		element.displayforsearch = true;
	}
	var cannull = element.cannull;
	if(cannull != null && (cannull==false||cannull == '0')){
		element.cannull = false;
	}else{
		element.cannull = true;
	}
	var intervalsearch = element.intervalsearch;
	if(intervalsearch == null || intervalsearch==false||intervalsearch == '0'){
		element.intervalsearch = false;
	}else{
		element.intervalsearch = true;
	}
	var readonly = element.readonly;
	if(readonly == null || readonly==false||readonly == '0'){
		element.readonly = false;
	}else{
		element.readonly = true;
	}
	var forgroupby = element.forgroupby;
	if(forgroupby == null || forgroupby==false||forgroupby == '0'){
		element.forgroupby = false;
	}else{
		element.forgroupby = true;
	}
	var cansequence = element.cansequence;
	if(cansequence == null || cansequence==false||cansequence == '0'){
		element.cansequence = false;
	}else{
		element.cansequence = true;
	}
	if((element.label==null || element.label=='') && column!=null){
		element.label = column.label;
	}
	if(column!=null){
		element.tablename = column.table.tablename;
		element.tablechinesename = column.table.chinesename;
	}
	if((element.name == null || element.name == '')&& column!=null){
		element.name = column.columnname;
	}
	if(element['function'] == null){
		element['function'] = '';
	}
	if((element.messageinfo == null || element.messageinfo.length < 1) && column!=null){
		element.messageinfo = column.messageinfo;
	}
	if((element.helpinfo == null || element.helpinfo.length < 1)){
		element.helpinfo = element.messageinfo;
	}
	if(element.messageinfo == null || element.messageinfo.length < 1){
		element.messageinfo = element.label;
	}
	if((element.minlength == null || element.minlength < 1) && column!=null){
		element.minlength = column.minlength;
	}
	if((element.maxlength == null || element.maxlength < 1) && column!=null){
		element.maxlength = column.maxlength;
	}
	if(element.maxlength!=null&&element.maxlength<0){
		element.maxlength = 500000;
	}
	if(element.columnsize == null){
		element.columnsize = element.input.columnsize;
	}

	if(element.columnsize == null || element.columnsize == ''){
		element.columnsize = 3;
	}
	if(element.inputgrouptype == null){
		element.inputgrouptype = element.input.inputgrouptype;
	}
	if(element.inputgrouptype == null || element.inputgrouptype == ''){
		element.inputgrouptype = "1";
	}
	return element;
}
function getButtonAction(plate, button, one){
	if(button.action == null){
		return '';
	}
	var servletpath = button.action.servletpath;
	servletpath = servletpath.indexOf('?')<0?servletpath+"?1=1":servletpath;
	var buttonAction = servletpath;
	var parameterUrl = getParameterUrl(plate, button, one);
	buttonAction = buttonAction + parameterUrl + "&thisplateid="+plate.plateid;
	buttonAction = buttonAction.replace("1=1&", "");
	return buttonAction;
}
function getParameterUrl(plate, button, one){
	var parameterUrl = "";
	var params = button.params;
	//加上主键值
	var tablename = plate.tablename;
	var keycolumnname = plate.keycolumnname;
	var keyvalue = one[keycolumnname];
	if(keyvalue!=null){
		parameterUrl+='&'+keycolumnname+'='+keyvalue;
	}
	if(params!=null && params.length>0){
		for(var i=0;i<params.length;i++){
			var param = params[(i)];
			var getvaluename = param.getvaluename;
			if(param.value!=null && param.value!=''){
				var parameterstr = "&"+getvaluename+"=";
				parameterUrl += parameterstr + param.value;
			}else{
				var getparametertype = param.getparametertype;
				if(getparametertype == 'list' || getparametertype == 'one'){
					var parameterValue = one[getvaluename];
					var parameterstr = "&"+getvaluename+"=";
					if(parameterValue == null){
						getvaluename = plate.tablename+getvaluename;
						parameterValue = one[getvaluename];
						parameterstr = "&"+getvaluename+"=";
					}
					if(parameterValue!=null && parameterValue.length>0 && parameterUrl.indexOf(parameterstr)<0){
						parameterUrl += parameterstr + parameterValue;
					}
				}else{
					
					var parameterValue = plate.requestmap[getvaluename];
					if(parameterValue!=null && parameterValue.length>0){
						parameterValue = parameterValue[0];
					}
					var parameterstr = "&"+getvaluename+"=";
					if(parameterValue == null){
						getvaluename = plate.tablename+getvaluename;
						parameterValue = plate.requestmap[getvaluename];
						parameterstr = "&"+getvaluename+"=";
						if(parameterValue!=null && parameterValue.length>0){
							parameterValue = parameterValue[0];
						}
					}
					if(parameterValue!=null && parameterValue.length>0 && parameterUrl.indexOf(parameterstr)<0){
						parameterUrl += parameterstr + parameterValue;
					}
				}
			}
			
			
		}
	}

	return parameterUrl;
}
function getShowValue(element, value){
	var inputtype = element.inputtype;
	var datas = element.selectdatas;
	switch(inputtype){
		case 'checkbox':
			var showvalue = "";
			if(value!=null && "" != (value)){
				var values = value.split(",");
				for(var index=0;index<values.length;index++){
					var v = values[index];
					if(datas!=null){
						for(var i=0;i<datas.length;i++){
							var data = datas[i];
							if(v == (data[("value")])){
								showvalue += data[("text")]+",";
							}
						}
					}
				}
			}
			return showvalue;
			break;
		case 'datetime':
			var thisvalue = "";
			if(value == null){
				return value;
			}
			var length = (""+value).length;
			if(length>=12){
				value = value.length == 12?value+'00':value;
				thisvalue = value.substring(0,4)+'-'+
				value.substring(4,6)+'-'+
				value.substring(6,8)+' '+
				value.substring(8,10)+':'+
				value.substring(10,12)+':'+
				value.substring(12,14);
			}else if(length==8){
				thisvalue = value.substring(0,4)+'-'+
				value.substring(4,6)+'-'+
				value.substring(6,8)+' ';
			}
			return thisvalue;
	
			break;
		case 'radio':
			var thisvalue = "";
			if(datas!=null){
				for(var i=0;i<datas.length;i++){
					var data = datas[i];
					if(data[("value")] == (value)){
						thisvalue = data[("text")];
						break;
					}
				}
			}
	
			return thisvalue;
	
			break;
		case 'select':
			var thisvalue = "";
			if(datas!=null){
				for(var i=0;i<datas.length;i++){
					var data = datas[i];
					if(data[("value")] == (value)){
						thisvalue = data[("text")];
						break;
					}
				}
			}
			return thisvalue;
			break;
		case 'selects':
			if(value == null || value == ''){
				return "";
			}
			var thisvalue = "";
			var values = [];
			
			if(value!=null && value.indexOf(',')>0){
				values = value.split(',');
			}else{
				values[values.length] = value;
			}
			if(datas!=null&&values.length>0){
				for(var i=0;i<values.length;i++){
					var v = values[i];
					for(var m=0;m<datas.length;m++){
						var data = datas[m];
						if(data[("value")] == (v)){
							thisvalue += data[("text")] ;
							if(i < (values.length-1)){
								thisvalue += ",";
							}
							break;
						}
					}
				}
				
			}
			return thisvalue;
			break;
		case 'selectcheckbox':
			var showvalue = "";
			if(value!=null && "" != (value)){
				var values = value.split(",");
				for(var index=0;index<values.length;index++){
					var v = values[index];
					if(datas!=null){
						for(var i=0;i<datas.length;i++){
							var data = datas[i];
							if(v == (data[("value")])){
								showvalue += data[("text")]+",";
							}
						}
					}
				}
			}
			return showvalue;
	
			break;
		case 'selectchild':
			var thisvalue = "";
			for(var i=0;i<datas.length;i++){
				var data = datas[i];
				if(data[("value")] == (value)){
					thisvalue = data[("text")];
					break;
				}
			}
			return thisvalue;
	
			break;
		case 'switch':
			var thisvalue = "";
			if(value == ("1") || value == ("true")){
				thisvalue = "是";
			}else{
				thisvalue = "否";
			}
			return thisvalue;
	
			break;
		default:
			value = value == null?"":value;
			return value;
	}
	return value;
}