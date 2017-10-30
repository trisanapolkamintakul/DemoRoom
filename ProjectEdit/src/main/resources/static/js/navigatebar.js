//Ext.QuickTips.init();
//
//Ext.onReady(function(){
//
//	var user = app.user;
//	if(Ext.isEmpty(user)) {
//		window.location.href = app.contextPath + '/home.html';
//	}
//
//	var menu = application.menu;
//	if(Ext.isEmpty(menu)) {
//		menu = {
//			id: 'rootMenu',
//			text: __messages['menu.root'],
//			menu: {
//			}
//		};
//	}
//
//	var programCode = (application.currentProgramCode)?application.currentProgramCode:'';
//	var programName = (application.currentProgramName)?' : ' + application.currentProgramName:'';
//	
//	new Ext.Toolbar({
//		id : '__nevigateToolbar',
//		renderTo : 'navigate',
//		items : [menu,'-',{
//			iconCls : 'home',
//		    text : __messages['menu.home'],
//		    handler:function() {
//		    	FormHelper.confirmChangeMenu({url:application.contextPath + '/home.html'});
//		 	}
//		 },'-',(programCode + programName),'->'
//		 ,(application.currentProgramRole)?application.currentProgramRole:'','-',{
//			xtype: 'tbtext',
//			text: (user)?('<div class="'+ ((user.gender === 'F') ? 'user_female' : 'user_green') +'"></div>'):''
//		 },{
//			iconCls: 'home',
//		 	xtype: 'tbtext',
//		 	text: (user)?('<b>' + user.nameConcat + '</b>'):'-'
//		 },'-',{
//			iconCls: 'logoutBtn',
//		 	text:__messages['menu.exit'],
//		 	handler:function(){
//		 		FormHelper.confirmLogout('logout');
//		 	}
//		 }]
//	});
//});
//
//FormHelper.changeToLogoutPage = function() {
//	window.location.href = application.contextPath + '/logout.html';
//};
//
//FormHelper.unchangeToLogoutPage = function() {
//};
//
//FormHelper.changeMenu = function(object) {
////	var params = {
////		programId : object.programId,
////		menuId: object.menuId,
////		menuName: object.menuName,
////		profileId: object.profileId,
////		profileName: object.profileName,
////		role: object.profileId
////	};
//	window.location.href = object.url;
//};
//
//FormHelper.unchangeMenu = function(href) {
//};