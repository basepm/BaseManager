<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%@ page import="java.util.*"%><%@ include file="/WEB-INF/view/control/common/base.jsp"%>
<div class="btn-group btn-group-xs " role="group">
	<a class="btn btn-default">
		<span class="fa fa-save"><!-- 保存  --></span>
		<div>保存</div>
	</a>
	<a class="btn btn-default btn-edit">
		<span class="fa fa-edit"><!-- 编辑  --></span>
		<div>编辑模式</div>
	</a>
	<a class="btn btn-default btn-preview">
		<span class="fa fa-eye"><!-- 预览  --></span>
		<div>预览模式</div>
	</a>
	<a class="btn btn-default btn-delete need-select-element">
		<span class="fa fa-remove"><!-- 删除  --></span>
		<div>删除</div>
	</a>
	<a class="btn btn-default need-select-element " color="">
		<input class="btn-font-color need-select-element" style="width: 51px;height: 18px;padding: 0px;line-height: 18px;font-size: 12px;"/>
		<div>字体颜色</div>
	</a>
	<a class="btn btn-default need-select-element " color="">
		<input class="btn-background-color need-select-element" style="width: 51px;height: 18px;padding: 0px;line-height: 18px;font-size: 12px;"/>
		<div>背景颜色</div>
	</a>
	<a class="btn btn-default need-select-element" >
		<span class="fa fa-pencil"><!-- 文案  --></span>
		<div>文案</div>
	</a>
	<div class="btn btn-default btn-group " role="group" style="width: 130px;">
		<select class="elementtype" style="width: 60px;padding: 1px 0px;margin: 7px 3px 6px;">
			<option value="span">span</option>
			<option value="div">div</option>
			<option value="p">p</option>
			<option value="a">a</option>
			<option value="button">button</option>
		</select>
		<span class="need-select-element btn-add-element" >添加元素</span>
	</div>
	<div class="btn-group " role="group">
		<a style="padding: 10px;font-size: 12px;" type="button" class="btn btn-default need-select-element dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			<span class="fa fa-font"><!-- 字体  --></span>&nbsp;&nbsp;排版&nbsp;&nbsp;<span class="caret "></span>
		</a>
		<ul class="dropdown-menu">
			<li>
				<a class="btn btn-default need-select-element btn-class" classdata="text-justify" noncoexistenceclass="text-center,text-right,text-left">
					<span class="fa fa-align-justify"><!-- 默认  --></span>
					&nbsp;&nbsp;默认
				</a>
			</li>
			<li>
				<a class="btn btn-default need-select-element btn-class" classdata="text-center" noncoexistenceclass="text-right,text-justify,text-left">
					<span class="fa fa-align-left"><!-- 居中  --></span>
					&nbsp;&nbsp;居中
				</a>
			</li>
			<li>
				<a class="btn btn-default need-select-element btn-class" classdata="text-left" noncoexistenceclass="text-center,text-justify,text-right">
					<span class="fa fa-align-center"><!-- 居左  --></span>
					&nbsp;&nbsp;居左
				</a>
			</li>
			<li>
				<a class="btn btn-default need-select-element btn-class" classdata="text-right" noncoexistenceclass="text-center,text-justify,text-left">
					<span class="fa fa-align-right"><!-- 居右  --></span>
					&nbsp;&nbsp;居右
				</a>
			</li>
		</ul>
	</div>
	
	<div class="btn-group " role="group">
		<a style="padding: 10px;font-size: 12px;" type="button" class="btn btn-default need-select-element dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			<span class="fa fa-font"><!-- 字体  --></span>&nbsp;&nbsp;浮动&nbsp;&nbsp;<span class="caret "></span>
		</a>
		<ul class="dropdown-menu">
			<li class="">
				<a class="btn btn-default need-select-element btn-class" classdata="pull-right">
					右浮动
				</a>
			</li>
			<li class="">
				<a class="btn btn-default need-select-element btn-class" classdata="pull-left">
					左浮动
				</a>
			</li>
		</ul>
	</div>
	
	<div class="btn-group " role="group">
		<a style="padding: 10px;font-size: 12px;" type="button" class="btn btn-default need-select-element dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			<span class="fa fa-font"><!-- 字体  --></span>&nbsp;&nbsp;字体&nbsp;&nbsp;<span class="caret "></span>
		</a>
		<ul class="dropdown-menu">
			<li class="text-italic">
				<a class="btn btn-default need-select-element btn-class" classdata="text-italic">
					<span class="fa fa-italic"><!-- 斜体  --></span>
					&nbsp;&nbsp;斜体
				</a>
			</li>
			<li class="text-bold">
				<a class="btn btn-default need-select-element btn-class" classdata="text-bold">
					<span class="fa fa-bold"><!-- 加粗  --></span>
					&nbsp;&nbsp;加粗
				</a>
			</li>
		</ul>
	</div>
	
	<div class="btn-group " role="group">
		<a style="padding: 10px;font-size: 12px;" type="button" class="btn btn-default need-select-element dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			<span class="fa fa-font"><!-- 字体  --></span>&nbsp;&nbsp;内容色&nbsp;&nbsp;<span class="caret "></span>
		</a>
		<ul class="dropdown-menu">
			<li class="text-active">
				<a class="btn btn-default need-select-element btn-class" classdata="text-active" noncoexistenceclass="text-success,text-warning,text-danger,text-info">
					<span class="text-active">active</span>
				</a>
			</li>
			<li class="text-success">
				<a class="btn btn-default need-select-element btn-class" classdata="text-success" noncoexistenceclass="text-active,text-warning,text-danger,text-info">
					<span class="text-success">success</span>
				</a>
			</li>
			<li class="text-warning">
				<a class="btn btn-default need-select-element btn-class" classdata="text-warning" noncoexistenceclass="text-success,text-active,text-danger,text-info">
					<span class="text-warning">warning</span>
				</a>
			</li>
			<li class="text-danger">
				<a class="btn btn-default need-select-element btn-class" classdata="text-danger" noncoexistenceclass="text-success,text-warning,text-active,text-info">
					<span class="text-danger">danger</span>
				</a>
			</li>
			<li class="text-info">
				<a class="btn btn-default need-select-element btn-class" classdata="text-info" noncoexistenceclass="text-success,text-warning,text-danger,text-active">
					<span class="text-info">info</span>
				</a>
			</li>
		</ul>
	</div>
	
	
	<div class="btn-group " role="group">
		<a style="padding: 10px;font-size: 12px;" type="button" class="btn btn-default need-select-element dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			<span class="fa fa-font"><!-- 字体  --></span>&nbsp;&nbsp;背景色&nbsp;&nbsp;<span class="caret "></span>
		</a>
		<ul class="dropdown-menu">
			<li class="bg-primary">
				<a class="btn btn-default need-select-element btn-class" classdata="text-active" noncoexistenceclass="bg-success,bg-warning,bg-danger,bg-info">
					<span class="">primary</span>
				</a>
			</li>
			<li class="bg-success">
				<a class="btn btn-default need-select-element btn-class" classdata="text-success" noncoexistenceclass="bg-primary,bg-warning,bg-danger,bg-info">
					<span class="">success</span>
				</a>
			</li>
			<li class="bg-warning">
				<a class="btn btn-default need-select-element btn-class" classdata="text-warning" noncoexistenceclass="bg-success,bg-primary,bg-danger,bg-info">
					<span class="">warning</span>
				</a>
			</li>
			<li class="bg-danger">
				<a class="btn btn-default need-select-element btn-class" classdata="text-danger" noncoexistenceclass="bg-success,bg-warning,bg-primary,bg-info">
					<span class="">danger</span>
				</a>
			</li>
			<li class="bg-info">
				<a class="btn btn-default need-select-element btn-class" classdata="text-info" noncoexistenceclass="bg-success,bg-warning,bg-danger,bg-primary">
					<span class="">info</span>
				</a>
			</li>
		</ul>
	</div>
	
	<div class="btn-group " role="group">
		<a style="padding: 10px;font-size: 12px;" type="button" class="btn btn-default need-select-element dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			<span class="fa fa-crosshairs"><!-- 字体  --></span>&nbsp;&nbsp;隐藏&nbsp;&nbsp;<span class="caret "></span>
		</a>
		<ul class="dropdown-menu">
			<li class="">
				<a class="btn btn-default need-select-element btn-class" classdata="hidden">
					<span class="fa fa-th-large"><!-- 一直隐藏  --></span>
					&nbsp;&nbsp;一直隐藏
				</a>
			</li>
			<li class="">
				<a class="btn btn-default need-select-element btn-class" classdata="hidden-xs">
					<span class="fa fa-mobile"><!-- 超小屏幕  --></span>
					&nbsp;&nbsp;超小屏幕(&lt;768px)
				</a>
			</li>
			<li class="">
				<a class="btn btn-default need-select-element btn-class" classdata="hidden-sm">
					<span class="fa fa-tablet"><!-- 小屏幕 平板 --></span>
					&nbsp;&nbsp;较小屏幕 (&ge;768px)
				</a>
			</li>
			<li class="">
				<a class="btn btn-default need-select-element btn-class" classdata="hidden-md">
					<span class="fa fa-tv"><!-- 中等屏幕 --></span>
					&nbsp;&nbsp;中等屏幕(&ge;992px)
				</a>
			</li>
			<li class="">
				<a class="btn btn-default need-select-element btn-class" classdata="hidden-lg">
					<span class="fa fa-television"><!-- 大屏幕 --></span>
					&nbsp;&nbsp;较大屏幕 (&ge;1200px)
				</a>
			</li>
		</ul>
	</div>
</div>