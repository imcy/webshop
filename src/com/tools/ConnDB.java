package com.tools;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.junit.Test;

public class ConnDB {
	public Connection conn = null; // 数据库连接对象
	public Statement stmt = null; // statement对象，用于执行Sql语句
	public ResultSet rs = null; // 结果对象集
	// 驱动类的类名
	private static String dbClassName = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
	private static String dbUrl = "jdbc:sqlserver://127.0.0.1:1433;DatabaseName=db_shop";
	private static String dbUser = "sa"; // 登录sql的用户名
	private static String dbPwd = "chaoya"; // 登录sql的密码

	/*
	 * 创建与数据库的连接
	 */
	public static Connection getConnection() {
		Connection conn = null;
		try {
			Class.forName(dbClassName).newInstance(); // 装在数据库驱动
			// 获取数据库连接对象
			conn = DriverManager.getConnection(dbUrl, dbUser, dbPwd);
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (conn == null) {
			System.err.println("DbConnectionManger.getConnection():" + dbClassName + "\r\n" + dbUrl + "\r\n" + dbUser
					+ "/" + dbPwd);
		}
		return conn;
	}

	/*
	 * 更新数据功能
	 */
	public int executeUpdate(String sql) {
		int result = 0; // 更新数据的记录条数
		try {
			conn = getConnection(); // 获取数据库连接
			// 创建用于执行SQL语句的statement对象
			stmt = conn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
			result = stmt.executeUpdate(sql);
		} catch (SQLException e) {
			// TODO: handle exception
			result = 0;
			e.printStackTrace(); // 输出异常信息
		}
		try {
			stmt.close();
		} catch (SQLException e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return result;
	}

	/*
	 * 根据指定的sql语句查询数据
	 */
	public ResultSet executeQuery(String sql) {
		try {
			conn = getConnection(); // 获取数据库连接
			// 创建用于执行SQL语句的statement对象
			stmt = conn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
			rs = stmt.executeQuery(sql); // 执行SQL语句
		} catch (SQLException e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return rs;
	}

	/**
	 * 功能：更新数据后获取生成的自动编号
	 * 
	 * @param sql
	 * @return
	 */
	public int executeUpdate_id(String sql) {
		int result = 0;
		try { // 捕捉异常
			conn = getConnection(); // 获取数据库连接
			// 创建用于执行SQL语句的Statement对象
			stmt = conn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
			result = stmt.executeUpdate(sql); // 执行SQL语句
			String ID = "select @@IDENTITY as id"; // 定义用于获取刚刚生成的自动编号的SQL语句
			rs = stmt.executeQuery(ID); // 获取刚刚生成的自动编号
			if (rs.next()) { // 如果存在数据
				int autoID = rs.getInt("id"); // 把获取到的自动编号保存到变量autoID中
				result = autoID;
			}
		} catch (SQLException ex) { // 处理异常
			result = 0;
		}
		return result; // 返回获取结果
	}

	/*
	 * 关闭数据库
	 */
	public void close() {
		try {
			if (rs != null) {
				rs.close();
			}
			if (stmt != null) {
				stmt.close();
			}
			if (conn != null) {
				conn.close();
			}
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace(System.err);
		}
	}

	@Test
	public void test() {
		if (getConnection() != null) {
			System.out.println("测试连接成功");
		}
	}
}
