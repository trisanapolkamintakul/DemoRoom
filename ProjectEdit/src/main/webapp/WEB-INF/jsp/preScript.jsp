<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@page import="com.softsquare.application.common.util.DateUtils"%>
<script type="text/javascript">
var application = {};
var postScript = function(){};
var __messages = {};
application.contextPath = '${pageContext.request.contextPath}';
application.formatDate = 'd/m/Y';
application.yesterdayDate = '<%=com.softsquare.application.common.util.DateUtils.getShortYesterdayDate()%>';
application.todayDate = '<%=com.softsquare.application.common.util.DateUtils.getShortTodayDate()%>';
application.tomorrowDate = '<%=com.softsquare.application.common.util.DateUtils.getShortTomorrowDate()%>';
application.originSystemDate = '<%=com.softsquare.application.common.util.DateUtils.getShortSystemStartDate()%>';
application.lastSystemDate = '<%=com.softsquare.application.common.util.DateUtils.getShortSystemEndDate()%>';
application.currentFullYear = '<%=com.softsquare.application.common.util.DateUtils.getCurrentFullYear()%>';
application.currentShortYear = '<%=com.softsquare.application.common.util.DateUtils.getCurrentShortYear()%>';
application.currentMonth = '<%=com.softsquare.application.common.util.DateUtils.getCurrentMonth()%>';

//<c:if test="${not empty user}">
//app.user = ${user};
//</c:if>

</script>
