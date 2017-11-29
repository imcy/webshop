package com.tools;

public class ChStr {
	/**
	 * 功能：解决中文乱码问题
	 * 
	 * @param str
	 * @return
	 */
	public String chStr(String str) {
		if (str == null) { // 当变量str为null时
			str = ""; // 将变量str赋值为空
		} else {
			try { // 捕捉异常
				// 将字符串转换为UTF-8编码
				str = (new String(str.getBytes("iso-8859-1"), "UTF-8")).trim();
			} catch (Exception e) { // 处理异常
				e.printStackTrace(System.err); // 输出异常信息
			}
		}
		return str; // 返回转换后的变量str
	}
}
