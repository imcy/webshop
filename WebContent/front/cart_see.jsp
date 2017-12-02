<%@page import="org.apache.jasper.tagplugins.jstl.core.ForEach"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.sql.ResultSet" %>
<%@ page import="java.util.Vector" %>
<%@ page import="com.model.Goodselement" %> <!-- 导入购物车模型类 -->
<%@ page import="java.text.DecimalFormat" %><!-- 导入格式化数字类 -->
<jsp:useBean id="conn" scope="page" class="com.tools.ConnDB" />

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>我的购物车-51商城</title>
<link rel="stylesheet" href="css/mr-01.css" type="text/css">
<script src="js/jsArr01.js" type="text/javascript"></script>
<script src="js/module.js" type="text/javascript"></script>
<script src="js/jsArr02.js" type="text/javascript"></script>
<script src="js/tab.js" type="text/javascript"></script>
</head>
<%
		String username=(String)session.getAttribute("username");	//获取会员账号
		//未登录，调整至登录界面
		if(username==null||username==""){
			response.sendRedirect("login.jsp");					//重定向页面到会员登录页面
			return;//返回
		}else{
			Vector cart=(Vector)session.getAttribute("cart");	//获取session中的购物车类
			if (cart == null || cart.size() == 0) {				//如果购物车为空
				response.sendRedirect("cart_null.jsp");			//重定向页面到购物车为空页面
			} else {
%>
<body>
	<jsp:include page="index-loginCon.jsp" />
	<!-- 网站头部 -->
	<%@ include file="common-header.jsp"%>
	<!-- //网站头部 -->
	<div id="mr-mainbody" class="container mr-mainbody">
		<div class="row">
			<!-- 页面主体内容 -->
			<div id="mr-content" class="mr-content col-xs-12">
				<div id="mrshop" class="mrshop common-home">
					<div class="container_oc">
						<div class="row">
							<div id="content_oc" class="col-sm-12">
								<h1>我的购物车</h1>
								<!-- 显示购物车中的商品 -->
								<div class="table-responsive cart-info">
									<table class="table table-bordered">
										<thead>
											<tr>
												<td class="text-center image">商品图片</td>
												<td class="text-left name">商品名称</td>
												<td class="text-left quantity">数量</td>
												<td class="text-right price">单价</td>
												<td class="text-right total">总计</td>
											</tr>
										</thead>
										<tbody>
										<!-- 遍历购物车中的商品并显示 -->
											<%
												float sum=0;
												DecimalFormat fnum=new DecimalFormat("#,##0.0");	//定义显示金额的格式
												int ID=-1;
												String goodsname = "";										//保存商品名称的变量
												String picture = "";											//保存商品图片的变量
												for(int i=0;i<cart.size();i++){
													Goodselement goodsitem=(Goodselement)cart.elementAt(i);//获取一个商品
													sum=sum+goodsitem.number*goodsitem.nowprice;	//计算总价
													ID=goodsitem.ID;
													if (ID > 0) {
														ResultSet rs_goods = conn.executeQuery("select * from tb_goods where ID=" + ID);
														if (rs_goods.next()) {
															goodsname = rs_goods.getString("goodsname");		//获取商品名称
															picture = rs_goods.getString("picture");			//获取商品图片
														}
														conn.close();										//关闭数据库的连接
												}
											%>
											<!-- 显示一条商品信息 -->
											<tr>
												<td class="text-center image" width="20%"><a href="goodsDetail.jsp?ID=<%=ID%>">
													<img width="80px" src="images/goods/<%=picture%>"> </a></td>
												<td class="text-left name"><a
													href="goodsDetail.jsp?ID=57"><%=goodsname %></a>
												</td>
												<td class="text-left quantity"><%=goodsitem.number %>件</td>
												<td class="text-right price"><%=goodsitem.nowprice %>元</td>
												<td class="text-right total"><%=goodsitem.nowprice*goodsitem.number %>元
												</td>
											</tr>
											<!-- 显示一条商品信息 -->
											<%
												}
												String sumString=fnum.format(sum);	//格式化总价
											%>
											<!-- //遍历购物车中的商品并显示 -->
										</tbody>
									</table>
								</div>
								<!-- //显示购物车中的商品 -->
								<!-- 显示总计金额  -->
								<div class="row cart-total">
									<div class="col-sm-4 col-sm-offset-8">
										<table class="table table-bordered">
											<tbody>
												<tr >
												<span>
													<strong>总计:</strong>
													<p><%=sumString %>元</p>
												</span>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
								<!-- //显示总计金额  -->
							</div>
						</div>

						<!-- 填写物流信息 -->
						<div class="row">
							<div id="content_oc" class="col-sm-12">
								<h1>物流信息</h1>
								<!-- 填写物流信息的表单 -->
								<form action="cart_order.jsp" method="post" id="myform">
									<div class="table-responsive cart-info">
										<table class="table table-bordered">
											<tbody>
												<tr>
													<td class="text-right" width="20%">收货人姓名：</td>
													<td class="text-left quantity">
														<div class="input-group btn-block" style="max-width: 400px;">
															<input type="text" id="recevieName" name="recevieName" size="10" class="form-control">
														</div>
													</td>
												</tr>
												<tr>
													<td class="text-right">收货人手机：</td>
													<td class="text-left quantity">
														<div class="input-group btn-block" style="max-width: 400px;">
															<input type="text" id="tel" name="tel" size="10" class="form-control">
														</div>
													</td>
												</tr>
												<tr>
													<td class="text-right">收货人地址：</td>
													<td class="text-left quantity">
														<div class="input-group btn-block" style="max-width: 400px;">
															<input type="text" id="address" name="address" size="1" class="form-control">
														</div>
													</td>
												</tr>
												<tr>
													<td class="text-right">备注：</td>
													<td class="text-left quantity">
														<div class="input-group btn-block" style="max-width: 400px;">
															<input type="text" name="bz" size="1" class="form-control">
														</div>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</form>
								<!-- //填写物流信息的表单 -->
							</div>
						</div>
						<!-- //填写物流信息 -->
						<br />
						<!-- 显示支付方式 -->
						<div class="row">
							<div id="content_oc" class="col-sm-12">
								<h1>支付方式</h1>
								<div class="table-responsive cart-info">
									<table class="table table-bordered">
										<tbody>
											<tr>
												<td class="text-left"><img src="images/zhifubao.png" /></td>
											</tr>
										</tbody>
									</table>
								</div>
								<br /> <br />
								<div class="buttons">
									<div class="pull-left">
										<a href="index.jsp" class="btn btn-primary btn-default">继续购物</a>
									</div>
									<div class="pull-left">
										<a href="cart_clear.jsp" class="btn btn-primary btn-default">清空购物车</a>
									</div>
									<div class="pull-right">
										<a href="javascript:zhifu();" class="tigger btn btn-primary btn-primary">结账</a>
									</div>
								</div>
							</div>
						</div>
						<!-- //显示支付方式 -->
					</div>
				</div>
			</div>
			<!-- //页面主体内容 -->
		</div>
	</div>
	<!-- 版权栏 -->
	<%@ include file="common-footer.jsp"%>
	<!-- //版权栏 -->

	<!-- 使用jBox插件实现一个支付对话框 -->
	<script type="text/javascript" src="js/jBox/jquery-1.4.2.min.js"></script>
	<script type="text/javascript" src="js/jBox/jquery.jBox-2.3.min.js"></script>
	<link type="text/css" rel="stylesheet" href="js/jBox/Skins2/Pink/jbox.css" />
	<script type="text/javascript">
		function zhifu() {
			//验证收货人姓名
			if ($('#recevieName').val() === "") {
				alert('收货人姓名不能为空！');
				return;
			}
			//验证收货人手机
			if ($('#tel').val() === "") {
				alert('收货人手机不能为空！');
				return;
			}
			//验证手机号是否合法
			if (isNaN($('#tel').val())) {
				alert("手机号请输入数字");
				return;
			}
			//验证收货人地址
			if ($('#address').val() === "") {
				alert('收货人地址不能为空！');
				return;
			}
			//设置对话框中要显示的内容
			var html = '<div class="popup_cont">'
					+ '<p>扫一扫支付</p>'
					+ '<strong>￥<font id="show_money_info">0.01元</font></strong>'
					+ '<div style="width: 256px; height: 250px; text-align: center; margin-left: auto; margin-right: auto;" >'
					+ '<image src="images/qr.png" width="256" height="256" /></div>'
					+ '</div><p style="text-align:center">支付二维码仅为测试用（相关知识点在书中有介绍）</p>';
			var content = {
				state1 : {
					content : html,
					buttons : {
						'取消' : 0,
						'支付' : 1
					},
					buttonsFocus : 0,
					submit : function(v, h, f) {
						if (v == 0) {//取消按钮的响应事件
							return true; //关闭窗口
						}
						if (v == 1) {//支付按钮的响应事件
							document.getElementById('myform').submit();//提交表单
							return true;
						}
						return false;
					}
				}
			};
			$.jBox.open(content, '支付', 400, 450);//打开支付窗口
		}
	</script>
	<!-- // 使用jBox插件实现一个支付对话框 -->
	<%
			}
		}
	%>
</body>
</html>
