<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.sql.ResultSet" %>
<%@ page import="java.util.Vector" %>
<%@ page import="com.model.Goodselement" %> <!-- 导入购物车模型类 -->
<jsp:useBean id="conn" scope="page" class="com.tools.ConnDB" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
	<%
		String username=(String)session.getAttribute("username");	//获取会员账号
		String num=(String)request.getParameter("num");	//获取商品数目
		//未登录，调整至登录界面
		if(username==null||username==""){
			response.sendRedirect("login.jsp");					//重定向页面到会员登录页面
			return;//返回
		}
		int ID = Integer.parseInt(request.getParameter("goodsID"));//获取商品ID
		String sql = "select * from tb_goods where ID=" + ID;//定义根据商品ID查询商品信息的SQL语句
		ResultSet rs = conn.executeQuery(sql);						//根据商品ID查询商品
		float nowprice = 0;										//定义保存商品价格的变量
		if (rs.next()) {											//如果查询到指定商品
			nowprice = rs.getFloat("nowprice");					//获取该商品的价格
		}
		//创建保存购物车内商品信息的模型类对象mygoodselement
		Goodselement mygoodselement =new Goodselement();
		mygoodselement.ID=ID;
		mygoodselement.nowprice=nowprice;
		mygoodselement.number=Integer.parseInt(num);
		boolean Flag=true;	//记录购物车内是否已经存在所要添加的商品
		Vector cart=(Vector)session.getAttribute("cart");	//获取购物车对象
		if(cart==null){
			cart=new Vector();	//如果购物车对象为空则创建一个购物车
		}else{
			//判断购物车内是否已经存在所购买的商品
			for (int i = 0; i < cart.size(); i++) {
				Goodselement goodsitem = (Goodselement) cart.elementAt(i);//获取购物车内的一个商品
				if (goodsitem.ID == mygoodselement.ID) {	//如果当前要添加的商品已经在购物车中
	 				//直接改变购物数量
					goodsitem.number = goodsitem.number + mygoodselement.number; 
					cart.setElementAt(goodsitem, i);		//重新保存到购物车中
					Flag = false;			//设置标记变量Flag为false，代表购物车中存在该商品
				}
			}
		}
		if(Flag)	//购物车不存在该商品，则直接添加
			cart.addElement(mygoodselement);
		session.setAttribute("cart", cart);	//将购物车对象添加到Session中
		conn.close();	//关闭数据库连接
		response.sendRedirect("cart_see.jsp");//重定向页面到查看购物车页面
	%>
</body>
</html>