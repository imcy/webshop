<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.sql.ResultSet"%>
<jsp:useBean id="conn" scope="page" class="com.tools.ConnDB" />
<%
	int hot_ID = 0;
	String hot_goodsName = "";
	float hot_nowprice = 0;
	String hot_picture = "";
	String sql="";
	if(request.getParameter("type")!=null && request.getParameter("type")!=""){
		int type=Integer.parseInt(request.getParameter("type"));
		sql="select top 7 t1.ID,t1.GoodsName,t1.nowprice,t1.picture from tb_goods t1,tb_subType t2 where t1.typeID=t2.ID and t2.superType="
				+ type + " order by t1.hit desc,t1.ID asc";
	}else if(request.getParameter("typeSystem")!=null && request.getParameter("typeSystem")!=""){
		int typeSystem = Integer.parseInt(request.getParameter("typeSystem"));
		sql="select top 7 ID,GoodsName,nowprice,picture from tb_goods where typeID=" + typeSystem
				+ " order by hit desc,ID asc";
	}else{
		sql="select top 7 ID,GoodsName,nowprice,picture from tb_goods order by hit desc";
	}
%>
<div
	class="mr-sidebar mr-sidebar-left col-xs-12 col-sm-4 col-sm-pull-8 col-md-3 col-md-pull-9  hidden-sm hidden-xs">

	<div class="mr-module module " id="Mod157">
		<div class="module-inner">
			<h3 class="module-title ">
				<span>热门商品</span>
			</h3>

			<div class="module-ct">
				<div class="mrshop">
					<div class="container_oc">
						<div class="box_oc">
							<div>
								<div class="box-product product-grid">

									<%
										ResultSet rs_hot = conn
												.executeQuery(sql);

										int s2 = 0;
										while (rs_hot.next()) {
											hot_ID = rs_hot.getInt(1);
											hot_goodsName = rs_hot.getString(2);
											hot_nowprice = rs_hot.getFloat(3);
											hot_picture = rs_hot.getString(4);
									%>
									<div>
										<div class="image">
											<a href="goodsDetail.jsp?ID=<%=hot_ID%>"><img
												src="images/goods/<%=hot_picture%>" width="80px">
											</a>
										</div>
										<div class="name">
											<a href="goodsDetail.jsp?ID=<%=hot_ID%>"> <%=hot_goodsName%>
											</a>
										</div>
										<div class="rating">
											<span class="fa fa-stack"><i
												class="fa fa-star fa-stack-2x"></i><i
												class="fa fa-star-o fa-stack-2x"></i></span> <span
												class="fa fa-stack"><i class="fa fa-star fa-stack-2x"></i><i
												class="fa fa-star-o fa-stack-2x"></i></span> <span
												class="fa fa-stack"><i class="fa fa-star fa-stack-2x"></i><i
												class="fa fa-star-o fa-stack-2x"></i></span> <span
												class="fa fa-stack"><i class="fa fa-star fa-stack-2x"></i><i
												class="fa fa-star-o fa-stack-2x"></i></span> <span
												class="fa fa-stack"><i class="fa fa-star fa-stack-2x"></i><i
												class="fa fa-star-o fa-stack-2x"></i></span>
										</div>
										<div class="price">
											<%=hot_nowprice%>
											元
										</div>

									</div>
									<%
										s2++;
										}
									%>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>