<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%@ page import="java.util.*"%><%@ include file="/WEB-INF/view/control/common/base.jsp"%>
<div class="over-window" style="height: 100%;display: none;">
	<div class="row" id="form-basic" style="height: 90%;width: 90%;margin-left: 5%;margin-top: 5%;">
		<div class="col-md-12" style="height: 90%;">
			<div class="panel widget" style="height: 100%;">
				<div class="panel-heading vd_bg-green">
					<h3 class="panel-title"> <span class="title"> 数据 </span></h3>
				</div>
				<div class="panel-body" style="height: 100%;overflow: hidden;">
					<ul class="nav nav-pills">
						<li class="" style="float: right;margin-right: 20px;"><a href="javascript:;" style="background-color: #1fae66;color: white;" onclick="javascript:$(this).closest('.over-window').hide();">取&nbsp;消</a></li>
						<li class="" style="float: right;margin-right: 20px;"><a href="javascript:;" style="background-color: #1fae66;color: white;" class="ok">确&nbsp;定</a></li>
					</ul>
					<div class="tab-content mgbt-xs-20" style="height: 100%;overflow: hidden;overflow-y: auto;">
						<div class="row">
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>