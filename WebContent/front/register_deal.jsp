<%@page import="java.sql.ResultSet"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%--创建ConnDB类的对象 --%>
<jsp:useBean id="conn" scope="page" class="com.tools.ConnDB"/>
<%-- 创建MemberDaoImpl类的对象 --%>	
<jsp:useBean id="ins_member" scope="page" class="com.dao.MemberDaoImpl" />
<%-- 创建Member类的对象，并对Member类的所有属性进行赋值 --%>	
<jsp:useBean id="member" scope="request" class="com.model.Member">
	<jsp:setProperty name="member" property="*" />
</jsp:useBean>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
	<%
		request.setCharacterEncoding("UTF-8");
		String username=member.getUsername();  //获取会员名称
		ResultSet rs=conn.executeQuery("select * from tb_Member where username='" + username + "'");
		if(rs.next())  //用户名已存在
		{
			out.println("<script language='javascript'>alert('该账号已经存在，请重新注册！');"
					+ "window.location.href='register.jsp';</script>");
		}else{
			int ret=0;
			ret=ins_member.insert(member);	//向数据库中插入用户
			if(ret!=0){
				session.setAttribute("username", username);
				out.println("<script language='javascript'>alert('会员注册成功！');"+ "window.location.href='index.jsp';</script>");
			}else{
				out.println("<script language='javascript'>alert('会员注册失败！');"+ "window.location.href='index.jsp';</script>");
			}
		}
	%>
</body>
</html>