<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib uri='http://java.sun.com/jsp/jstl/core' prefix='c'%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<tiles:importAttribute name="pageToolBar" ignore="true"/>
<c:set var="toolBar" scope="request" value="${pageToolBar}"></c:set>
<script type="text/javascript">
application.toolbar = {
	button : {},
	fn : {}
};
Ext.onReady(function() {
	var items = ['&nbsp;'];
<c:forTokens items="${toolBar}" delims="|" var="id">
	<c:choose><c:when test="${id eq 'Back'}">
application.toolbar.button.backButton = new Ext.Button({ 
	iconCls: 'back', 
	tooltip: __commonMessages['Back'], 
	handler: function(){ backFunction(); }, 
	cls : 'defaultToolbarButton' 
});
items.push(application.toolbar.button.backButton);
	</c:when><c:when test="${id eq 'Add'}">
application.toolbar.button.addButton = new Ext.Button({ 
	iconCls: 'add', 
	tooltip: __commonMessages['Add'], 
	handler: function(){ addFunction(); }, 
	cls : 'defaultToolbarButton' 
});
items.push(application.toolbar.button.addButton);
	</c:when><c:when test="${id eq 'Delete'}">
application.toolbar.button.removeButton = new Ext.Button({ 
	iconCls: 'remove', 
	tooltip: __commonMessages['Delete'], 
	handler: function(){ deleteFunction(); }, 
	cls : 'defaultToolbarButton' 
});
items.push(application.toolbar.button.removeButton);
	</c:when><c:when test="${id eq 'Save'}">
application.toolbar.button.saveButton = new Ext.Button({ 
	iconCls: 'save', 
	tooltip: __commonMessages['Save'], 
	handler: function(){ FormHelper.preventCleanSave('save'); }, 
	cls : 'defaultToolbarButton' 
});
items.push(application.toolbar.button.saveButton);
	</c:when><c:when test="${id eq 'Search'}">
application.toolbar.button.searchButton = new Ext.Button({ 
	iconCls: 'query', 
	tooltip: __commonMessages['Search'], 
	handler: function(){ FormHelper.confirmSearchOperation() }, 
	cls : 'defaultToolbarButton' 
});

items.push(application.toolbar.button.pdfButton);
	</c:when><c:when test="${id eq ' '}">
	items.push(' ');
	</c:when><c:when test="${id eq '-'}">
	items.push('-');
	</c:when><c:when test="${id eq '->'}">
	items.push('->');
	</c:when><c:otherwise>
application.toolbar.button['${id}'] = new Ext.Button({ 
	text: '<spring:message code="${id}" text="${id}"></spring:message>', 
	tooltip: '<spring:message code="${id}" text="${id}"></spring:message>',
	handler: function(){ application.toolbar.fn['${id}']() }, 
	cls : 'toolbarButton' 
});
items.push(application.toolbar.button['${id}']);
	</c:otherwise></c:choose>
</c:forTokens>
	var __toolbar = new Ext.Toolbar({ 
		renderTo: 'toolbar', 
		toolbarCls: 'x-panel-fbar', 
		items: items
	});
});
</script>
