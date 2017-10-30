var EXIMTreePanel = function () {

	var resolveConfig = function (defaultConfig, config) {
		if(config) {
			if (config.loader) {
				if (config.loader.baseParams) {
					Ext.apply(defaultConfig.loader.baseParams, config.loader.baseParams);
					delete config.loader.baseParams;
				}

				if (config.loader.listeners) {
					if (!defaultConfig.loader.listeners) {
						defaultConfig.loader.listeners = {};
					}

					for (var p in config.loader.listeners) {
						if (p) {
							if (Ext.isFunction(defaultConfig.loader.listeners[p]) && Ext.isFunction(config.loader.listeners[p])) {
								defaultConfig.loader.listeners[p] = defaultConfig.loader.listeners[p].createSequence(config.loader.listeners[p]);
							} else {
								defaultConfig.loader.listeners[p] = config.loader.listeners[p];
							}
						}
					}

					delete config.loader.listeners;
				}

				Ext.apply(defaultConfig.loader, config.loader);
				delete config.loader;
			}

			if (config.listeners) {
				if (!defaultConfig.listeners) {
					defaultConfig.listeners = {};
				}

				for (var p in config.listeners) {
					if (p) {
						if (Ext.isFunction(defaultConfig.listeners[p]) && Ext.isFunction(config.listeners[p])) {
							defaultConfig.listeners[p] = defaultConfig.listeners[p].createSequence(config.listeners[p]);
						} else {
							defaultConfig.listeners[p] = config.listeners[p];
						}
					}
				}

				delete config.listeners;
			}

			Ext.apply(defaultConfig, config);
		}
		return defaultConfig;
	};

	return {
		getStoreGroupStoreCodeSelectionForTemplate: function (id, config) {
			var defaultConfig = {
				id: id,
		        title: __messages['label.store_Group_'],
		        saveAndLoad: true,
		        useArrows:true,
		        animate:true,
		        enableDD:false,
		        autoScroll: true,
		        rootVisible: true,
		        loader: {
		        	baseParams : {
		        	},
		        	timeout: 60000,
		        	url : application.contextPath + '/treepanel.html',
		        	listeners : {
		        		'beforeload' : function(loader, node, callback) {
							Ext.applyIf(loader.baseParams,{
								xaction: 'read',
					        	method: 'storeGroupStoreCodeSelectionForTemplate'
					        });
						},
						'load' : function(loader, node, response) {
							delete loader.baseParams.xaction;
							delete loader.baseParams.method;
						},
						'loadexception' : function(loader, node, response) {
							delete loader.baseParams.xaction;
							delete loader.baseParams.method;
							try {
								var obj = Ext.decode(response.responseText);

				    			if(obj) {
				    				Ext.Msg.alert(obj.title, obj.message);
				    			}
							} catch(e) {
								Ext.Msg.alert(__messages['title.error'], e);
							}
						}
		        	}
		        },
		        root: {
		            nodeType: 'async',
		            text: __messages['label.all'],
		            draggable: false,
		            id: 'root',
		            leaf: false,
		            checked:false
		        },
		        processEachRecord : function(node) {
		        	var attributes = Ext.apply({},node.attributes);
		        	if(attributes.leaf === true) {
		        		delete attributes.children;
			    		delete attributes.loader;
			    		return attributes;
		        	}
		        	return false;
		        },
		        saveTree : function(parameters, callback, errorHandler) {
		        	var param = Ext.apply({}, parameters);
		        	var param = Ext.apply(param, {
		        		xaction:'save',
			    		method: 'storeGroupStoreCodeSelectionForTemplate'
		        	});
		        	this.save(param, callback, errorHandler);
		        },
		        listeners: {
		            'checkchange': function(node, checked){
		            	var treePanel = this;
		            	if(!this.__isProcessCheckChange) {
		            		this.__isProcessCheckChange = true;
				        	node.cascade(function(child) {
				        		if(node != child) {
				        			child.getUI().toggleCheck(checked);
				        		}
				        	} );

				        	node.bubble(function(parent) {
				        		if(node != parent) {
				    	    		var isCheckedAll = true;
				    	    		parent.eachChild(function(child){
				    	    			if(parent != child && !child.getUI().isChecked()){
				    	    				isCheckedAll = false;
				    	    			}
				    	    		});

				    	    		parent.getUI().toggleCheck(isCheckedAll);
				        		}
				        	} );
				        	delete this.__isProcessCheckChange;
		            	}
			        },
			        'load':function(node) {
			        	var treePanel = this;
			        	var isCheckedAll = true;

			        	var childNodes = node.childNodes;
			        	for(var i = 0; i < childNodes.length; i++) {
			        		if(!childNodes[i].attributes.checked){
	    	    				isCheckedAll = false;
	    	    				break;
	    	    			}
			        	}
			        	treePanel.checkedNoFire(node, isCheckedAll);
			        }
		        }
		    };
			return new Ext.ss.tree.TreePanel(resolveConfig(defaultConfig, config));
		},
		getDivisionSelectionForTemplate: function (id, config) {
			var defaultConfig = {
				id: id,
				title: __messages['label.divisions'],
		        saveAndLoad: true,
		        useArrows:true,
		        animate:true,
		        enableDD:false,
		        autoScroll: true,
		        rootVisible: true,
		        loader: {
		        	baseParams : {
		        	},
		        	timeout: 60000,
		        	url : application.contextPath + '/treepanel.html',
		        	listeners : {
		        		'beforeload' : function(loader, node, callback) {
							Ext.applyIf(loader.baseParams,{
								xaction: 'read',
					        	method: 'divisionSelectionForTemplate'
					        });
						},
						'load' : function(loader, node, response) {
							delete loader.baseParams.xaction;
							delete loader.baseParams.method;
						},
						'loadexception' : function(loader, node, response) {
							try {
								var obj = Ext.decode(response.responseText);

				    			if (obj) {
				    				Ext.Msg.alert(obj.title, obj.message);
				    			}
							} catch(e) {
								Ext.Msg.alert(__messages['title.error'], e);
							}
						}
		        	}
		        },
		        root: {
		            nodeType: 'async',
		            text: __messages['label.all'],
		            draggable: false,
		            id: 'root',
		            leaf: false,
		            checked:false
		        },
		        processEachRecord : function(node) {
		        	var attributes = Ext.apply({},node.attributes);
		        	if(attributes.leaf === true) {
		        		delete attributes.children;
			    		delete attributes.loader;
			    		return attributes;
		        	}
		        	return false;
		        },
		        saveTree : function(parameters, callback, errorHandler) {
		        	var param = Ext.apply({}, parameters);
		        	var param = Ext.apply(param, {
		        		xaction:'save',
			    		method: 'divisionSelectionForTemplate'
		        	});
		        	this.save(param, callback, errorHandler);
		        },
		        listeners: {
		            'checkchange': function(node, checked){
		            	var treePanel = this;
		            	if(!this.__isProcessCheckChange) {
		            		this.__isProcessCheckChange = true;
				        	node.cascade(function(child) {
				        		if(node != child) {
				        			child.getUI().toggleCheck(checked);
				        		}
				        	} );

				        	node.bubble(function(parent) {
				        		if(node != parent) {
				    	    		var isCheckedAll = true;
				    	    		parent.eachChild(function(child){
				    	    			if(parent != child && !child.getUI().isChecked()){
				    	    				isCheckedAll = false;
				    	    			}
				    	    		});

				    	    		parent.getUI().toggleCheck(isCheckedAll);
				        		}
				        	} );
				        	delete this.__isProcessCheckChange;
		            	}
			        },
			        'load':function(node) {
			        	var treePanel = this;
			        	var isCheckedAll = true;

			        	var childNodes = node.childNodes;
			        	for(var i = 0; i < childNodes.length; i++) {
			        		if(!childNodes[i].attributes.checked){
	    	    				isCheckedAll = false;
	    	    				break;
	    	    			}
			        	}

			        	treePanel.checkedNoFire(node, isCheckedAll);
			        }
		        }
		    };
			return new Ext.ss.tree.TreePanel(resolveConfig(defaultConfig, config));
		},
		getStoreGroupStoreCodeSelectionForEvent: function (id, config) {
			var defaultConfig = {
				id: id,
		        title: __messages['store_Group_'],
		        height: 300,
		        saveAndLoad: true,
		        useArrows:true,
		        animate:true,
		        enableDD:false,
		        autoScroll: true,
		        rootVisible: true,
		        loader: {
		        	baseParams : {
		        	},
		        	timeout: 60000,
		        	url : application.contextPath + '/treepanel.html',
		        	listeners : {
		        		'beforeload' : function(loader, node, callback) {
							Ext.applyIf(loader.baseParams,{
								xaction: 'read',
					        	method: 'storeGroupStoreCodeSelectionForEvent'
					        });
						},
						'load' : function(loader, node, response) {
							delete loader.baseParams.xaction;
							delete loader.baseParams.method;
						},
						'loadexception' : function(loader, node, response) {
							delete loader.baseParams.xaction;
							delete loader.baseParams.method;
							try {
								var obj = Ext.decode(response.responseText);

				    			if(obj) {
				    				Ext.Msg.alert(obj.title, obj.message);
				    			}
							} catch(e) {
								Ext.Msg.alert(__messages['title.error'], e);
							}
						}
		        	}
		        },
		        root: {
		            nodeType: 'async',
		            text: __messages['all'],
		            draggable: false,
		            id: 'root',
		            leaf: false,
		            expanded: true,
		            checked:false
		        },
		        processEachRecord : function(node) {
		        	var attributes = Ext.apply({},node.attributes);
		        	if(attributes.leaf === true) {
		        		delete attributes.children;
			    		delete attributes.loader;
			    		return attributes;
		        	}
		        	return false;
		        },
		        saveTree : function(parameters, callback, errorHandler) {
		        	var param = Ext.apply({}, parameters);
		        	var param = Ext.apply(param, {
		        		xaction:'save',
			    		method: 'storeGroupStoreCodeSelectionForEvent'
		        	});
		        	this.save(param, callback, errorHandler);
		        },
		        listeners: {
		            'checkchange': function(node, checked){
		            	var treePanel = this;
		            	if(!this.isProcessCheckChange) {
		            		this.isProcessCheckChange = true;
				        	node.cascade(function(child) {
				        		if(node != child) {
				        			child.getUI().toggleCheck(checked);
				        		}
				        	} );

				        	node.bubble(function(parent) {
				        		if(node != parent) {
				    	    		var isCheckedAll = true;
				    	    		parent.eachChild(function(child){
				    	    			if(parent != child && !child.getUI().isChecked()){
				    	    				isCheckedAll = false;
				    	    			}
				    	    		});
				    	    		parent.getUI().toggleCheck(isCheckedAll);
				        		}
				        	} );
				        	delete this.__isProcessCheckChange;
		            	}
			        },
			        'load':function(node) {
			        	var treePanel = this;
			        	var isCheckedAll = true;

			        	var childNodes = node.childNodes;
			        	for(var i = 0; i < childNodes.length; i++) {
			        		if(!childNodes[i].attributes.checked){
	    	    				isCheckedAll = false;
	    	    				break;
	    	    			}
			        	}

			        	treePanel.checkedNoFire(node, isCheckedAll);
			        }
		        }
		    };
			return new Ext.ss.tree.TreePanel(resolveConfig(defaultConfig, config));
		},
		// tmp Name
		getEvaluationTplTopic : function (id, config) {
			var defaultConfig = {
				id: id,
		        height: 300,
		        useArrows:true,
		        animate:true,
		        enableDD:false,
		        autoScroll: true,
		        rootVisible: true,
		        loader: {
		        	baseParams : {
		        	},
		        	timeout: 60000,
		        	url : application.contextPath + '/treepanel.html',
		        	listeners : {
		        		'beforeload' : function(loader, node, callback) {
							Ext.applyIf(loader.baseParams,{
								xaction: 'read',
					        	method: 'Excaqy01',
					        	year : EXCAQY01.year.getValue()
					        });
						},
						'load' : function(loader, node, response) {
							delete loader.baseParams.xaction;
							delete loader.baseParams.method;
						},
						'loadexception' : function(loader, node, response) {
							delete loader.baseParams.xaction;
							delete loader.baseParams.method;
							try {
								var obj = Ext.decode(response.responseText);

				    			if(obj) {
				    				Ext.Msg.alert(obj.title, obj.message);
				    			}
							} catch(e) {
								Ext.Msg.alert(__messages['title.error'], e);
							}
						}
		        	}
		        },
		        root: {
		            nodeType: 'async',
		            text: __messages['label.all'],
		            draggable: false,
		            id: 'root',
		            value : '',
		            leaf: false,
		            expanded: true,
		            checked:true
		        },
		        processEachRecord : function(node) {
		        	var attributes = Ext.apply({},node.attributes);
		        	if(attributes.leaf === true) {
		        		delete attributes.children;
			    		delete attributes.loader;
			    		return attributes;
		        	}
		        	return false;
		        },
		        saveTree : function(parameters, callback, errorHandler) {
		        	var param = Ext.apply({}, parameters);
		        	var param = Ext.apply(param, {
		        		xaction:'save',
			    		method: 'storeGroupStoreCodeSelectionForEvent'
		        	});
		        	this.save(param, callback, errorHandler);
		        },
		        listeners: {
		            'checkchange': function(node, checked){
		            	var treePanel = this;
		            	if(!this.isProcessCheckChange) {
		            		this.isProcessCheckChange = true;
				        	node.cascade(function(child) {
				        		if(node != child) {
				        			child.getUI().toggleCheck(checked);
				        		}
				        	} );

				        	node.bubble(function(parent) {
				        		if(node != parent) {
				    	    		var isCheckedAll = true;
				    	    		parent.eachChild(function(child){
				    	    			if(parent != child && !child.getUI().isChecked()){
				    	    				isCheckedAll = false;
				    	    			}
				    	    		});
				    	    		parent.getUI().toggleCheck(isCheckedAll);
				        		}
				        	} );
				        	delete this.isProcessCheckChange;
		            	}
			        },
			        'load':function(node) {
			        	var treePanel = this;
			        	var isCheckedAll = true;
			        	var childNodes = node.childNodes;
			        	for(var i = 0; i < childNodes.length; i++) {
			        		if(Ext.isDefined(childNodes[i].attributes.checked)){
			        			childNodes[i].attributes.checked = (childNodes[i].attributes.checked == 'true' || childNodes[i].attributes.checked)? true : false ;
			        			
			        		}
			        		if(Ext.isDefined(childNodes[i].attributes.leaf)){
			        			childNodes[i].attributes.leaf = (childNodes[i].attributes.leaf == 'true' || childNodes[i].attributes.leaf)? true : false ;
			        		}
			        	}

			        	for(var i = 0; i < childNodes.length; i++) {
			        		if(!childNodes[i].attributes.checked){
	    	    				isCheckedAll = false;
	    	    				break;
	    	    			}
			        	}
			        	treePanel.checkedNoFire(node, true);
			        }
		        }
		    };
			return new Ext.ss.tree.TreePanel(resolveConfig(defaultConfig, config));
		}
	};
}();