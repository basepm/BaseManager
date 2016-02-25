<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%@ page import="java.util.*"%><%@ include file="/WEB-INF/view/control/common/base.jsp"%>

<div class="col-sm-12" >
	<div class="row">
		<div class="vd_content-wrapper ">
			<div class="vd_title-section clearfix" ><div class="vd_panel-header"><h1>表设计</h1></div></div>
			<div class="vd_content-section clearfix" >
				<div class="row ">
					<div class="col-sm-12" >
						<div class="panel widget light-widget panel-bd-top">
							<div class="panel-heading bordered">
								<h3 class="panel-title">
									数据列表
								</h3>
								<div class="vd_panel-menu">
									<div data-action="minimize" class=" menu "> <i class="fa fa-minus"></i> </div>
									<!-- <div class=" menu refreshData"> <i class="fa fa-refresh"></i> </div> -->
									<div data-action="close" class=" menu"> <i class="fa fa-remove"></i> </div>
								</div>
							</div>
							<div class="panel-body-list ">
								<c:forEach begin="1" end="10" varStatus="s">
									<div class="col-sm-2" style="position: relative;margin: 0px;padding: 0px;">
										<div class="" style="width: 100%;padding-top: 100%;position: relative;">
											<div class="" style="position: absolute;top: 5px;left: 5px;right: 5px;bottom: 5px;border: 1px dotted #CECECE;">
												${s.count }
											</div>
										</div>
									</div>
								</c:forEach>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript">
	$(function() {
		$(".panel-body-list").sortable({
			cancel : '',
			cursor : 'crosshair',
			helper : 'clone',
			distance: 5,
			opacity : .8,
			scroll : false,
			update: function(e, t) {
				
			}
		}).disableSelection();
	});
</script>