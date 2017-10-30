<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<html>
 <!-- <link rel="stylesheet" href="webjars/bootstrap/3.2.0/css/bootstrap.min.css">
   <script src="webjars/jquery/2.1.1/jquery.min.js"></script> 
  <script src="webjars/bootstrap/3.2.0/js/bootstrap.min.js"></script> -->
	  <!--Sylesheets and JavaScript files to be included-->
	<link href='Bootstrap-calendar/public_html/fullcalendar.css' rel='stylesheet' />
	<link href='Bootstrap-calendar/public_html/fullcalendar.print.css' rel='stylesheet' media='print' />
	<script  type="text/javascript" src='Bootstrap-calendar/public_html/lib/moment.min.js'></script>
	<script  type="text/javascript" src='Bootstrap-calendar/public_html/lib/jquery.min.js'></script>
	<script  type="text/javascript" src='Bootstrap-calendar/public_html/fullcalendar.min.js'></script>
    <body>
		
		<div id='calendar'></div>
		
    </body>
    
    <!--Styling for calendar-->

<style>
body {
margin: 40px 10px;
padding: 0;
font-family: "Lucida Grande",Helvetica,Arial,Verdana,sans-serif;
font-size: 14px;
}
#calendar {
max-width: 900px;
margin: 0 auto;
}
</style>
	<script>
		$(document).ready(function() {
			$('#calendar').fullCalendar({
			
				<!--Header Section Including Previous,Next and Today-->
				header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,basicWeek,basicDay'
				},
				
				<!--Default Date-->
				defaultDate: '2015-02-12',
				editable: true,
				eventLimit: true, // allow "more" link when too many events
			});
		});
	</script>
</html>