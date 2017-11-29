<%@ page contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>注册-51商城</title>
<link rel="stylesheet" href="css/mr-01.css" type="text/css">
</head>

<body>
	<!-- 主体内容 -->
	<div id="mr-mainbody" class="container mr-mainbody">
		<div class="row">
			<div id="mr-content" class="mr-content col-xs-12">
				<div class="login-wrap" style="margin-bottom: 60px; margin-top: 50px">
					<div style="max-width: 540px; margin: 0 auto;">
						<a href="index.jsp" title="点击返回首页"><img src="images/51logo.png"></a>
					</div>
					<div class="login">
						<div class="page-header" style="pause: 0px;">
							<h1 class="login_h1">会员注册</h1>
						</div>
						<!-- 会员注册表单 -->
						<form id="member-registration" action="register_deal.jsp"
							onsubmit="return regis();" method="post" class="form-horizontal">
							<fieldset>
								<div class="form-group">
									<div class="col-sm-4 control-label">
										<label id="username-lbl" for="username" class="required">
											账户 ：</label>
									</div>
									<div class="col-sm-8">
										<!-- 账户文本框 -->
										<input type="text" name="username" id="username" value=""
											class="required" size="38" required="required"
											aria-required="true"><span class="star">&nbsp;*</span>
									</div>
								</div>
								<div class="form-group">
									<div class="col-sm-4 control-label">
										<label id="password-lbl" for="password" class="required">
											真实姓名 ：</label>
									</div>
									<div class="col-sm-8">
										<!-- 真实姓名文本框 -->
										<input type="text" name="truename" id="jform_username"
											value="" class="validate-username required" size="38"
											required="required" aria-required="true"><span
											class="star">&nbsp;*</span>
									</div>
								</div>
								<div class="form-group">
									<div class="col-sm-4 control-label">
										<label id="password-lbl" for="password" class="required">
											密码 ：</label>
									</div>
									<div class="col-sm-8">
										<!-- 密码文本框 -->
										<input type="password" name="pwd" id="pwd" value=""
											autocomplete="off" class="validate-password required"
											size="38" maxlength="99" required="required"
											aria-required="true"><span class="star">&nbsp;*</span>
									</div>
								</div>
								<div class="form-group">
									<div class="col-sm-4 control-label">
										<label id="password-lbl" for="password" class="required">
											确认密码 ：</label>
									</div>
									<div class="col-sm-8">
										<!-- 确认密码文本框 -->
										<input type="password" name="pwd2" id="pwd2" value=""
											autocomplete="off" class="validate-password required"
											size="38" maxlength="99" required="required"
											aria-required="true"><span class="star">&nbsp;*</span>
									</div>
								</div>
								<div class="form-group">
									<div class="col-sm-4 control-label">
										<label id="password-lbl" for="password" class="required">
											联系电话 ：</label>
									</div>
									<div class="col-sm-8" style="clear: none;">
										<!-- 联系电话文本框 -->
										<input type="text" name="tel" class="validate-email " id="tel"
											value="" size="38" aria-required="true">
									</div>
								</div>
								<div class="form-group">
									<div class="col-sm-4 control-label">
										<label id="password-lbl" for="password" class="required">
											邮箱 ：</label>
									</div>
									<div class="col-sm-8" style="clear: none;">
										<!-- 邮箱文本框 -->
										<input type="email" name="email" class="validate-email"
											id="jform_email2" value="" size="38" aria-required="true">
									</div>
								</div>
								<div class="form-group">
									<div style="float: right; padding-right: 216px;">
										51商城<a href="" style="color: #0885B1;">《使用条款》</a>
									</div>
								</div>
								<div class="form-group">
									<div class="col-sm-offset-4 col-sm-8">
										<button type="submit" class="btn btn-primary login">同意协议并注册</button>
									</div>
								</div>
								<div class="form-group" style="margin: 20px;">
									<label
										style="float: right; color: #858585; margin-right: 80px; margin-top: 10px; font-size: 14px;">已有账号！<a
										href="login.jsp">去登录</a></label>
								</div>
							</fieldset>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- //主体内容 -->
</body>
<!-- 验证输入的注册信息是否合法 -->
<script src="js/jquery.1.3.2.js" type="text/javascript"></script>
<script>
	function regis() {
		/* ----------- 验证输入的账户是否合法 ------------------------- */
		if (/^[\u4e00-\u9fa5]+$/.test($('#username').val())) {
			alert("账户不能输入汉字！");
			return false;
		}
		/* ----------- 验证输入的联系电话是否合法 --------------------- */
		if (isNaN($('#tel').val())) {
			alert("联系电话请输入数字");
			return false;
		}
		/* ----------- 验证两次输入的密码是否一致 --------------------- */
		var pwd = document.getElementById("pwd").value;
		var pwd2 = document.getElementById("pwd2").value;
		if (pwd !== pwd2) {
			alert('密码前后不一致！');
			return false;
		}
		return true;
	}
</script>
<!-- //验证输入的信息是否合法 -->
</html>