<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.sql.ResultSet"%>					<%-- 导入java.sql.ResultSet类 --%>
<%@ page import="java.util.Vector"%>					<%-- 导入Java的向量类 --%>
<%@ page import="com.model.Goodselement"%>				<%-- 导入购物车商品模型类 --%>
<jsp:useBean id="chStr" scope="page" class="com.tools.ChStr" /><%-- 创建ChStr类的对象 --%>
<jsp:useBean id="conn" scope="page" class="com.tools.ConnDB" /><%-- 创建ConnDB类的对象 --%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
<%
	if (session.getAttribute("cart") == "") {						//判断购物车对象是否为空
		out.println(
				"<script language='javascript'>alert('您还没有购物!');"
 				+"window.location.href='index.jsp';</script>");
	}
	String Username = (String) session.getAttribute("username");	//获取输入的账户名称
	if (Username != "") {
		try {													//捕捉异常
			ResultSet rs_user = conn.executeQuery("select * from tb_Member where username='"
 			+ Username + "'");
			if (!rs_user.next()) {	//如果获取的账户名称在会员信息表中不存在（表示非法会员）
				session.invalidate();//销毁Session
				out.println(
						"<script language='javascript'>alert('请先登录后，再进行购物!'); "
 						+"window.location.href='index.jsp';</script>");
				return;									//返回
			} else {										//如果合法会员，则保存订单
 				//获取输入的收货人姓名
				String recevieName = chStr.chStr(request.getParameter("recevieName")); 
 				//获取输入的收货人地址
				String address = chStr.chStr(request.getParameter("address")); 
				String tel = request.getParameter("tel");			//获取输入的电话号码
				String bz = chStr.chStr(request.getParameter("bz"));//获取输入的备注
				int orderID = 0;		//定义保存订单ID的变量
				Vector cart = (Vector) session.getAttribute("cart");//获取购物车对象
				int number = 0;		//定义保存商品数量的变量
				float nowprice = (float) 0.0;				//定义保存商品价格的变量
				float sum = (float) 0;					//定义商品金额的变量
				float Totalsum = (float) 0;				//定义商品件数的变量
				boolean flag = true;						//标记订单是否有效，为true表示有效
				int temp = 0;							//保存返回自动生成的订单号的变量
				int ID = -1;
				//插入订单主表数据
				float bnumber = cart.size();
				String sql = "insert into tb_Order(bnumber,username, recevieName,address, "
 						+"tel,bz) values("+ bnumber + ",'" + Username + "','" + recevieName 
 						+ "','" + address + "','" + tel+ "','" + bz + "')";
				temp = conn.executeUpdate_id(sql); 		//保存订单主表数据
				if (temp == 0) {							//如果返回的订单号为0，表示不合法
					flag = false;
				} else {
					orderID = temp;						//把生成的订单号赋值给订单ID变量
				}
				String str = "";							//保存插入订单详细信息的SQL语句
				//插入订单明细表数据
				for (int i = 0; i < cart.size(); i++) {
 					//获取购物车中的一个商品
					Goodselement mygoodselement = (Goodselement) cart.elementAt(i); 
					ID = mygoodselement.ID;					//获取商品ID
					nowprice = mygoodselement.nowprice;		//获取商品价格
					number = mygoodselement.number;			//获取商品数量
					sum = nowprice * number;					//计算商品金额
					str = "insert into tb_order_Detail (orderID,goodsID,price,number)"
 							+" values(" + orderID + ","+ ID + "," + nowprice + "," 
 							+ number + ")";					//插入订单明细的SQL语句
					temp = conn.executeUpdate(str);			//保存订单明细
					Totalsum = Totalsum + sum;				//累加合计金额
					if (temp == 0) {							//如果返回值为0，表示不合法
						flag = false;
					}
				}
				if (!flag) {									//如果订单无效
					out.println("<script language='javascript'>alert('订单无效');"
 								+"history.back();</script>");
				} else {
					session.removeAttribute("cart");			//清空购物车
					out.println("<script language='javascript'>alert('订单生成，请记住您"
 							+"的订单号[" + orderID
 					+ "]');window.location.href='index.jsp';</script>");//显示生成的订单号
				}
				conn.close();								//关闭数据库连接
			}
		} catch (Exception e) {								//处理异常
			out.println(e.toString());						//输出异常信息
		}
	} else {
		session.invalidate();									//销毁Session
		out.println(
				"<script language='javascript'>alert('请先登录后，再进行购物!');"
 				+"window.location.href='index.jsp';</script>");
	}
%>

</body>
</html>