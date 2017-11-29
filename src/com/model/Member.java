package com.model;

/*会员类*/
public class Member {
	private Integer ID = Integer.valueOf("-1"); // 会员ID属性
	private String username = ""; // 账户属性
	private String truename = ""; // 真实姓名属性
	private String pwd = ""; // 密码属性
	private String city = ""; // 所在城市属性
	private String address = ""; // 地址属性
	private String postcode = ""; // 邮编属性
	private String cardno = ""; // 证件号码属性
	private String cardtype = ""; // 证件类型属性
	private String tel = ""; // 联系电话属性
	private String email = ""; // 邮箱属性

	public Integer getID() {
		return ID;
	}

	public void setID(Integer iD) {
		ID = iD;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getTruename() {
		return truename;
	}

	public void setTruename(String truename) {
		this.truename = truename;
	}

	public String getPwd() {
		return pwd;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPostcode() {
		return postcode;
	}

	public void setPostcode(String postcode) {
		this.postcode = postcode;
	}

	public String getCardno() {
		return cardno;
	}

	public void setCardno(String cardno) {
		this.cardno = cardno;
	}

	public String getCardtype() {
		return cardtype;
	}

	public void setCardtype(String cardtype) {
		this.cardtype = cardtype;
	}

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

}
