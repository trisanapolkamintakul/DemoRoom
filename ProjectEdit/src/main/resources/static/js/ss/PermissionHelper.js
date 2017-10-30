var PermissionHelper = {
	currentRoles : undefined,
	currentStatus : undefined,
	userRoles : undefined
};

/**
 * Public
 * Set User Roles
 * @param roles
 */
PermissionHelper.setUserRoles = function(roles) {
	PermissionHelper.userRoles = roles;
};

/**
 * Public
 * Set Current status
 * @param currentStatus
 */
PermissionHelper.setCurrentStatus = function(currentStatus) {
	PermissionHelper.currentStatus = currentStatus;
};

/**
 * Public
 * Set User Roles
 * @returns userRoles
 */
PermissionHelper.getUserRoles = function() {
	return PermissionHelper.userRoles;
};

/**
 * Public
 * Set Current status
 * @returns currentStatus
 */
PermissionHelper.getCurrentStatus = function() {
	return PermissionHelper.currentStatus;
};

/**
 * Public
 * Set page permission
 *
 * json = {<br>
 * currentRoles:['*'],<br>
 * currentStatus:'STATUS',<br>
 * componentIdPermissionMap:{'componentId':'VISIBLE_AND_ENABLE'},<br>
 * componentVarNamePermissionMap:{'componentVarName':'INVISIBLE'},<br>
 * };
 *
 * @param JSONObject
 */
PermissionHelper.setPagePermission = function(json) {
	PermissionHelper.setUserRoles(json['userRoles']);
	PermissionHelper.setCurrentStatus(json['currentStatus']);

	var componentIdPermission = json['componentIdPermissionMap'];
	var componentVarNamePermission = json['componentVarNamePermissionMap'];

	if(!Ext.isEmpty(componentIdPermission)) {
		for(var cmpId in componentIdPermission) {
			if(cmpId) {
				var variable = Ext.getCmp(cmpId);
				if(!variable && console && console.log) {
					console.log('component [' + cmpId + '] is undefined.' );
				}
				PermissionHelper.processPermission(variable, componentIdByPermission[cmpId]);
			}
		}
	}

	if(!Ext.isEmpty(componentVarNamePermission)) {
		for(var cmpVarName in componentVarNamePermission) {
			if(cmpVarName) {
				var variable = eval(cmpVarName);
				if(!variable && console && console.log) {
					console.log('component [' + cmpVarName + '] is undefined.' );
				}
				PermissionHelper.processPermission(variable, componentVarNamePermission[cmpVarName]);
			}
		}
	}
};

/**
 * Public
 * Refresh page permission
 * @param url
 * @param parameters
 * @param callback
 * @param errorHangler
 */
PermissionHelper.refreshPagePermission = function(url, parameters, callback, errorHandler) {
	var loadMask = new Ext.LoadMask(Ext.getBody());
	loadMask.show();

	var params = {xaction:'permission'};

	Ext.Ajax.request({
	    method: 'POST',
	    params: Ext.apply(params, parameters),
	    url: url,
	    success: function(response, options) {
	    	var json = Ext.decode(response.responseText);
    		PermissionHelper.setPagePermission(json.permission);
	    	if(Ext.isFunction(callback)) {
	    		callback.call(this, response, options);
	    	}
			loadMask.hide();
	    },
	    failure: function(response, options) {
	    	if(Ext.isFunction(errorHandler)) {
	    		errorHandler.call(this, response, options);
	    		loadMask.hide();
	    	} else {
	    		var json = Ext.decode(response.responseText);
	    		loadMask.hide();
	    		Ext.Msg.alert(json.title, json.message);
	    	}
	    }
	});
};

/**
 * Private
 * Process permission Visible and enable
 * @param component
 */
PermissionHelper.beforeProcessPermissionVisibleAndEnable = function(component) {
	return false;
};
PermissionHelper.afterProcessPermissionVisibleAndEnable = function(component) {
};
PermissionHelper.defaultProcessPermissionVisibleAndEnable = function(component) {
	if(component instanceof Ext.ss.grid.CheckColumn){
		component.setDisabled(false); // must call grid.getView().refresh(true); after this;
	}else if(component instanceof Ext.grid.Column){
		component.editable = true; // must call grid.getView().refresh(true); after this;
	}else{
		if(component.isXType('editorgrid')){
			component.setVisible(true);
			var cm = component.getColumnModel();
			var columnCount = cm.getColumnCount();
	
			for(var i=0; i<columnCount; i++) {
				var c = cm.config[i], hidden = false;
			    if(c.hidden !== hidden){
			        c.hidden = hidden;
			    }
			    if(c.editor) {
			    	c.editable = true;
			    }
				if(c instanceof Ext.ss.grid.CheckColumn) {
					c.setDisabled(false);
				}
			}
			// must call grid.getView().refresh(true); after this;
		} else if(component.isXType('checkbox')) {
			component.setVisible(true);
			component.setDisabled(false);
		} else if(component.isXType('checkboxgroup')) {
			component.setVisible(true);
			component.setDisabled(false);
		} else if(component.isXType('field')) {
			component.setVisible(true);
			component.setReadOnly(false);
		} else {
			component.setVisible(true);
			component.setDisabled(false);
		}
	}
};
PermissionHelper.processPermissionVisibleAndEnable = function(component) {
	if(!PermissionHelper.beforeProcessPermissionVisibleAndEnable(component)) {
		PermissionHelper.defaultProcessPermissionVisibleAndEnable(component);
		PermissionHelper.afterProcessPermissionVisibleAndEnable(component);
	}
};

/**
 * Private
 * Process permission Invisible
 * @param component
 */
PermissionHelper.beforeProcessPermissionInvisible = function(component) {
	return false;
};
PermissionHelper.afterProcessPermissionInvisible = function(component) {
};
PermissionHelper.defaultProcessPermissionInvisible = function(component) {
	if(component instanceof Ext.ss.grid.CheckColumn){
		component.hidden = true; // must call grid.getView().refresh(true); after this;
	}else if(component instanceof Ext.grid.Column){
		component.hidden = true; // must call grid.getView().refresh(true); after this;
	}else{
		component.setVisible(false);
	}
};
PermissionHelper.processPermissionInvisible = function(component) {
	if(!PermissionHelper.beforeProcessPermissionInvisible(component)) {
		PermissionHelper.defaultProcessPermissionInvisible(component);
		PermissionHelper.afterProcessPermissionInvisible(component);
	}
};



/**
 * Private
 * Process permission Visible and disable
 * @param component
 */
PermissionHelper.beforeProcessPermissionVisableAndDisable = function(component) {
	return false;
};
PermissionHelper.afterProcessPermissionVisableAndDisable = function(component) {
};
PermissionHelper.defaultProcessPermissionVisableAndDisable = function(component) {
	if(component instanceof Ext.ss.grid.CheckColumn){
		component.hidden = false;
		component.disabled = true;
	}else if(component instanceof Ext.grid.Column){
		component.hidden = false;
		component.editable = false;
	}else{
		if(component.isXType('fileuploadfield')) {
			component.setVisible(true);
			component.setDisabled(true);
		}else if(component.isXType('editorgrid')) {
			component.setVisible(true);
			var cm = component.getColumnModel();
			var columnCount = cm.getColumnCount();
			for(var i=0; i<columnCount; i++) {
				var c = cm.config[i], hidden = false;
			    if(c.hidden !== hidden){
			        c.hidden = hidden;
			    }
			    if(c.editor) {
			    	c.editable = false;
			    }
				if(c instanceof Ext.ss.grid.CheckColumn) {
					c.setDisabled(true);
				}
			}
		} else if(component.isXType('treepanel')) {
			component.setVisible(true);
			component.setDisabled(true);
		} else if(component.isXType('checkbox')) {
			component.setVisible(true);
			component.setDisabled(true);
		} else if(component.isXType('checkboxgroup')) {
			component.setVisible(true);
			component.setDisabled(true);
		} else if(component.isXType('field')) {
			component.setVisible(true);
			component.setReadOnly(true);
		} else {
			component.setVisible(true);
			component.setDisabled(true);
		}
	}
	
};
PermissionHelper.processPermissionVisableAndDisable = function(component) {
	if(!PermissionHelper.beforeProcessPermissionVisableAndDisable(component)) {
		PermissionHelper.defaultProcessPermissionVisableAndDisable(component);
		PermissionHelper.afterProcessPermissionVisableAndDisable(component);
	}
};

/**
 * Private
 * This function implement by project.
 * @param component
 * @param permission
 */
PermissionHelper.processPermission = function(component, permission) {
	if(permission) {
		if(permission === 'VISIBLE_AND_ENABLE') {
			PermissionHelper.processPermissionVisibleAndEnable(component);
		} else if(permission === 'INVISIBLE') {
			PermissionHelper.processPermissionInvisible(component);
		} else if(permission === 'VISIBLE_AND_DISABLE') {
			PermissionHelper.processPermissionVisableAndDisable(component);
		}
	}
};