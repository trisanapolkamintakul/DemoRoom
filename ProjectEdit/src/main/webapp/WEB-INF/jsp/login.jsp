<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<html>
<head>

 <link rel="stylesheet" href="webjars/bootstrap/3.2.0/css/bootstrap.min.css">
 <link rel="stylesheet" href="css/base/login.css">
 <script  type="text/javascript" src="webjars/jquery/2.1.1/jquery.min.js"></script>
 <script  type="text/javascript" src="webjars/bootstrap/3.2.0/js/bootstrap.min.js"></script>
 <script  type="text/javascript" src="js/util/BeanUtils.js"></script>
  
        <title></title>
    </head>
    <body>
    	<c:if test="${not empty error}">
			<div class="error" style="visibility:hidden;" >${error}</div>
		</c:if>
		<c:if test="${not empty msg}">
			<div class="msg" style="visibility:hidden;">${msg}</div>
		</c:if>
 		<c:url value="/login.html" var="loginUrl" />
 		
<div class="container">
	<div class="wrapper">
		<form class="form-signin"  action="http://${ipDomainSystem}${loginUrl}" method="post">
			<!--  <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/> -->
			<h3 class="form-signin-heading" action="${loginUrl}" method="post">Please sign in</h3>
			<hr class="colorgraph"><br>
			
			<div class="input-group">
			 	<span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
				<input id="username" name="username" class="form-control" type="text" required="" placeholder="Username">
			</div>
			
			<div class="input-group">
				<span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
				<input id="password" name="password" class="form-control" type="password" required="" placeholder="Password">
			</div>
			
			<div class="showmsg">${error}</div>
			<button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
		</form>
	</div>
</div>

    </body>
    
</html>

<script>
	if(BeanUtils.isNotEmpty($('div.error').html())){
		$('div.showmsg').html($('div.error').html())
	}else{
		$('div.showmsg').html($('div.msg').html())
	}

</script>