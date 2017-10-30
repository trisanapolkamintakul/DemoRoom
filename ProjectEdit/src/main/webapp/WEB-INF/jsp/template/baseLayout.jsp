<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib uri='http://java.sun.com/jsp/jstl/core' prefix='c'%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<c:set var="contextPath" scope="request" value="${pageContext.request.contextPath}"></c:set>
<tiles:importAttribute name="ssJavaScripts"/>
<tiles:importAttribute name="ssStyleSheets"/>
<tiles:importAttribute name="ssStyleSheetsCalendar"/>
<tiles:importAttribute name="localization"/>
<tiles:importAttribute name="defaultLocalization"/>
<tiles:importAttribute name="pageToolBar"/>
<tiles:importAttribute name="menuBar"/>
<html>
<head>
<!--  <span>
    <a href="?lang=en">en</a> 
    | 
    <a href="?lang=th">th</a>
</span>
-->
   	<!-- menuBar -->
	<c:set var="jspMenuBar" scope="request" value="${menuBar}"></c:set>
    <tiles:insertTemplate template="${jspMenuBar}"></tiles:insertTemplate>
 	<!-- end menuBar -->

 <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title><tiles:getAsString name="title" /></title>

   <!-- StyleSheets -->
    <c:forEach var="ssCss" items="${ssStyleSheets}">
        <link type="text/css" rel="stylesheet" href="<c:url value="${ssCss}"/>" />
    </c:forEach>
   <!-- end StyleSheets -->
   
   <!-- StyleSheets Calendar -->
    <c:forEach var="ssCssCalendar" items="${ssStyleSheetsCalendar}">
        <link media="print" rel="stylesheet" href="<c:url value="${ssCssCalendar}"/>" />
    </c:forEach>
   <!-- end StyleSheets Calendar -->
   
   <link rel="shortcut icon" href="${contextPath}/images/favicon.ico?v=1.1" type="image/x-icon"> 
   
</head>
<body>
	<div id="toolbar">
		<tiles:insertAttribute name="toolbar" ignore="true"/>
	</div>
	<div id="body">
	    <tiles:insertAttribute name="body" ignore="true"/>
	</div>
	<div id="specialPage">
	    <tiles:insertAttribute name="specialPage" ignore="true"/>
	</div>
	<div id="renderDiv"><div id='calendarDiv'></div></div>
	
	<tiles:insertTemplate template="/WEB-INF/jsp/preScript.jsp"></tiles:insertTemplate>

	<!-- defaultLocalization -->
	<c:set var="jspDefaultLocalization" scope="request" value="${defaultLocalization}"></c:set>
	<tiles:insertTemplate template="${jspDefaultLocalization}"></tiles:insertTemplate>
	<!-- end defaultLocalization -->
	
	<!-- localization -->
	<c:set var="jspLocalization" scope="request" value="${localization}"></c:set>
    <tiles:insertTemplate template="${jspLocalization}"></tiles:insertTemplate>
 	<!-- end localization -->

   <!-- scripts -->
    <c:forEach var="ssScript" items="${ssJavaScripts}">
        <script type="text/javascript" src="<c:url value="${ssScript}"/>"></script>
    </c:forEach>
   <!-- end scripts -->
   
   	<!-- toolBar -->
   	<c:set var="pToolBar" scope="request" value="${pageToolBar}"></c:set>
	<tiles:insertTemplate template="/WEB-INF/jsp/toolbar/toolbarTemplate.jsp">
			<tiles:putAttribute name="pageToolBar" value="${pToolBar}" />
	</tiles:insertTemplate>
   	<!-- end toolBar -->
   	
   	<c:if test="${not empty headerId}">
    	<input type="hidden" id="headerId" value="${headerId}">
	</c:if>
   	<c:if test="${empty headerId}">
    	<input type="hidden" id="headerId" value="">
	</c:if>
   	
    <c:if test="${not empty userNameUserSystem}">
    	<input type="hidden" id="userNameUserSystem" value="${userNameUserSystem}">
	</c:if>
   	<c:if test="${empty userNameUserSystem}">
    	<input type="hidden" id="userNameUserSystem" value="">
	</c:if>
	
	<c:if test="${not empty roleUserSystem}">
    	<input type="hidden" id="roleUserSystem" value="${roleUserSystem}">
	</c:if>
   	<c:if test="${empty roleUserSystem}">
    	<input type="hidden" id="roleUserSystem" value="">
	</c:if>
	
	<c:if test="${not empty ipDomainSystem}">
    	<input type="hidden" id="ipDomainSystem" value="${ipDomainSystem}">
	</c:if>
	<c:if test="${empty ipDomainSystem}">
    	<input type="hidden" id="ipDomainSystem" value="">
	</c:if>

<script type="text/javascript" src="${contextPath}<tiles:getAsString name='pageJsRenderIncluded' />"></script>
<script type="text/javascript" src="${contextPath}<tiles:getAsString name='pageJsIncluded' />"></script>
<script type="text/javascript">
	var headerId = document.getElementById("headerId").value;
	var userNameUserSystem = document.getElementById("userNameUserSystem").value;
	var roleUserSystem = document.getElementById("roleUserSystem").value;
	var ipDomainSystem = document.getElementById("ipDomainSystem").value;
</script>
</body>
</html>