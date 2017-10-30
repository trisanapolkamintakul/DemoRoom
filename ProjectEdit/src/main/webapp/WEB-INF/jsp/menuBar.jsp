<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<html>
 <link rel="stylesheet" href="webjars/bootstrap/3.2.0/css/bootstrap.min.css">
  <script src="webjars/jquery/2.1.1/jquery.min.js"></script>
  <script src="webjars/bootstrap/3.2.0/js/bootstrap.min.js"></script>
  
    <body>
    <a download id="downloadFile" hidden></a>
    <div class="nav-div-header-menu" style="position:fixed; width:100%;  z-index:300" >
    <nav class="navbar navbar-default">
	  <div class="container-fluid">
	    <div class="navbar-header">
	      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
		    <span class="sr-only">Toggle navigation</span>
		    <span class="icon-bar"></span>
		    <span class="icon-bar"></span>
		    <span class="icon-bar"></span>
		     <span class="icon-bar"></span>
		  </button>
	      <a class="navbar-brand" href="http://${ipDomainSystem}/demo_res_room/home.html">ROOM RESERVATION </a>
	    </div>
	   <div class="collapse navbar-collapse">
	   <c:choose>
	   <c:when test="${roleUserSystem =='admin'}">
	    <ul class="nav navbar-nav">
	    
	      <li><a href="http://${ipDomainSystem}/demo_res_room/register.html">สมัครสมาชิก</a></li>   
	      
	      <li class="dropdown">
	        <a class="dropdown-toggle" data-toggle="dropdown" href="#">จัดการห้อง
	        <span class="caret"></span></a>
	        <ul class="dropdown-menu">
	          <li><a href="http://${ipDomainSystem}/demo_res_room/roomdetail.html">ห้อง</a></li>
	          
	        </ul>
	      </li>
	      
	      <li><a href="http://${ipDomainSystem}/demo_res_room/reservation.html">อนุมัติการจอง</a></li>
	      
	     
	      
	 <!--   <li class="dropdown">
	        <a class="dropdown-toggle" data-toggle="dropdown" href="#">Report
	        <span class="caret"></span></a>
	        <ul class="dropdown-menu">
	          <li><a href="http://${ipDomainSystem}/hymanage/report.html?reportName=report01">Report01</a></li>
	        </ul>
	      </li>  --> 
	    </ul>
	    </c:when>
	    
	     <c:when test="${roleUserSystem =='user'}">
	    <ul class="nav navbar-nav">
	    
	    
	    <li><a href="http://${ipDomainSystem}/demo_res_room/reservation.html">จองห้อง</a></li>       
	     
	    
	    
	   <!--  <li class="dropdown">
	        <a class="dropdown-toggle" data-toggle="dropdown" href="#">Manage
	        <span class="caret"></span></a>
	        <ul class="dropdown-menu">
	          <li><a href="http://${ipDomainSystem}/hymanage/period.html">Period Manage</a></li>
	          <li><a href="http://${ipDomainSystem}/hymanage/orderHeader.html">Order Manage</a></li>
	        </ul>
	      </li> -->  
	      
	   <!--    <li class="dropdown">
	        <a class="dropdown-toggle" data-toggle="dropdown" href="#">Manage Room
	        <span class="caret"></span></a>
	        <ul class="dropdown-menu">
	          <li><a href="http://${ipDomainSystem}/demo_res_room/roomdetail.html">Rooms</a></li>
	          
	        </ul>
	      </li>   --> 
	      
	 
	    </ul>
	    </c:when>
</c:choose>

	  <ul class="nav navbar-nav navbar-right">
	  <li><a>User Name : ${userNameUserSystem}</a></li>
        <!--  <li class="dropdown">
	        <a class="dropdown-toggle" data-toggle="dropdown" href="#">User Data
	        <span class="caret"></span></a>
	        <ul class="dropdown-menu">
	          <li><a>User Name : ${userNameUserSystem}</a></li>
	          <li><a>User Role : ${roleUserSystem}</a></li>     
	        </ul>
	      </li>  -->   
	       <li><a href="http://${ipDomainSystem}/demo_res_room/logoutpage.html">Logout</a></li>
      </ul>
      <!--    <ul class="nav navbar-nav navbar-right">
        <li class="dropdown">
	        <a class="dropdown-toggle" data-toggle="dropdown" href="#">Language
	        <span class="caret"></span></a>
	        <ul class="dropdown-menu">
	          <li><a href="?lang=en">English</a></li>
	          <li><a href="?lang=th">Thai</a></li>
	        </ul>
	      </li>
      </ul>
	 -->
	  </div>
	  </div>
	</nav>
</div>
    </body>
</html>