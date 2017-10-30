var EXIMAttachment = function () {

    return {
        getAttachmentForm: function (system,config, refId) {
            var attachmentForm = {};

            attachmentForm.url = application.contextPath + '/attachment.html';
            attachmentForm.refId = refId;
            
            attachmentForm.system = new Ext.form.Hidden({
                name: 'system',
                value: system
            });
            
            attachmentForm.ref = new Ext.form.Hidden({
                name: 'ref'
            });

            attachmentForm.attachmentNameField = new Ext.form.TextField({
                width: 400
            });

            attachmentForm.fileUploadField = new Ext.ux.form.FileUploadField({
                id: 'file',
                width: 400,
                buttonText: '',
                fieldLabel: __messages['label.file'],
                buttonCfg: {
                    iconCls: 'upload-icon'
                }
            });

            attachmentForm.sm = new Ext.ss.grid.CheckboxSelectionModel({
            	id:'attachmentSm'
            });
            
            attachmentForm.columns = [attachmentForm.sm, {
                header: __messages['label.fileName'],
                dataIndex: 'attachmentName',
                align: 'left',
                width: 800
            },
            new Ext.grid.ActionColumn({
                header: __messages['label.download'],
                align: 'center',
                dataIndex: 'attachmentRawId',
                iconCls: 'attachButton',
                handler: function (grid, rowIndex, colIndex) {
                    var record = attachmentForm.store.getAt(rowIndex);
                    attachmentForm.downloaderForm.download(record.get('attachmentId'), record.get('attachmentName'), record.get('attachmentRawId'));
                }
            })];

            attachmentForm.store = new Ext.data.JsonStore({
                removeAndSave: true,
                storeId: 'attachmentStore',
                idProperty: 'attachmentId',
                fields: [
                    'attachmentId',
                    'attachmentName',
                    'attachmentRawId'],
                url: attachmentForm.url,
                listeners: {
                    beforeload: function (store, options) {
                        store.setBaseParam('system', attachmentForm.system.getValue());
                        if(!Ext.isEmpty(attachmentForm.refId)) {
                        	attachmentForm.ref.setValue(Ext.getCmp(attachmentForm.refId).getValue());
                        }
                        store.setBaseParam('ref', attachmentForm.ref.getValue());
                    }
                }
            });

            attachmentForm.addButton = new Ext.Button({
                iconCls: 'add',
                handler: function () {
                	if(Ext.isEmpty(attachmentForm.fileUploadField.getValue())) {
                		Ext.Msg.alert(__messages['title.warning'], __messages['message.pleaseSelectAttachmentFile']);
                		return;
                	}
                	
                	if(Ext.isEmpty(attachmentForm.attachmentNameField.getValue())) {
                		Ext.Msg.alert(__messages['title.warning'], __messages['message.pleaseNameAttachmentFile']);
                		return;
                	}
                	
                	if(attachmentForm.attachmentNameField.getValue().indexOf('.') == -1) {
                		Ext.Msg.alert(__messages['title.warning'], __messages['message.pleaseIndicateFileExtension']);
                		return;
                	}

                    attachmentForm.uploadAttachmentName.setValue(attachmentForm.attachmentNameField.getValue());
                    
                    if(!Ext.isEmpty(attachmentForm.refId)) {
                    	attachmentForm.uploadRef.setValue(Ext.getCmp(attachmentForm.refId).getValue());
                    }

                    attachmentForm.uploaderFormPanel.getForm().submit({
                        method: 'POST',
                        waitMsg: __messages['message.uploading'],
                        url: attachmentForm.url,
                        success: function (form, action) {
                            attachmentForm.attachmentNameField.reset();
                            attachmentForm.fileUploadField.reset();
                            attachmentForm.grid.load({},function(){});
                        },
                        failure: function (form, action) {
                            Ext.Msg.alert(action.result.title, action.result.message);
                        }
                    });
                }
            });
            
            attachmentForm.removeButton = new Ext.Button({
                iconCls: 'remove',
                handler: function () {
                    attachmentForm.grid.remove({}, function() {
                    	attachmentForm.sm.clearSelections();
                    	if(config && Ext.isFunction(config.removeHandler)) {
                    		config.removeHandler.call(attachmentForm);
                    	}
                    }, function(store, response, options) {
                    	attachmentForm.sm.clearSelections();
                    	Ext.Msg.alert(response.title, response.message);
                    });
                }
            });
            
            attachmentForm.grid = new Ext.ss.grid.EditorGridPanel({
                store: attachmentForm.store,
                columns: attachmentForm.columns,
                sm: attachmentForm.sm,
                height: (config && config.height) ? config.height : 200,
                viewConfig: {
                    forceFit: true
                },
                tbar: [attachmentForm.addButton, attachmentForm.removeButton,
                    '|',
                __messages['label.fileName'], ' ',
                attachmentForm.attachmentNameField,
                    ' ',
                    '->', '<span style="color:red;">' + __messages['label.maxUploadExceeded'] + '</span>']
            });

            attachmentForm.downloaderForm = EXIMAttachment.getDownloaderForm();

            // Upload
            attachmentForm.uploadSystem = new Ext.form.Hidden({
                name: 'system',
                value: system
            });
            
            attachmentForm.uploadRef = new Ext.form.Hidden({
            	name: 'ref'
            });

            attachmentForm.uploadMethod = new Ext.form.Hidden({
                name: 'method',
                value: 'upload'
            });

            attachmentForm.uploadAttachmentName = new Ext.form.Hidden({
                name: 'attachmentName'
            });

            attachmentForm.uploaderFormPanel = new Ext.form.FormPanel({
                renderTo: 'contentHidden',
                id: 'uploaderFormPanel',
                fileUpload: true,
                standardSubmit: false,
                labelWidth: 90,
                url: attachmentForm.url,
                items: [
                attachmentForm.uploadSystem,
                attachmentForm.uploadRef,
                attachmentForm.uploadMethod,
                attachmentForm.uploadAttachmentName,
                attachmentForm.fileUploadField,
                attachmentForm.grid]
            });

            attachmentForm.fieldSet = new Ext.form.FieldSet({
                title: (config && config.fieldSetTitle) ? config.fieldSetTitle :__messages['label.attachFile'],
                collapsible: true,
                items: [
                attachmentForm.uploaderFormPanel,
                attachmentForm.system,
                attachmentForm.ref]
            });
            
            if(config && config.downloadOnly === true) {
            	var tb = attachmentForm.grid.getTopToolbar();
            	tb.hide();
            	attachmentForm.fileUploadField.hide();
            }

            return attachmentForm;
        },
        getDownloaderForm : function() {
        	var downloaderForm = {
        		url : application.contextPath + '/attachment.html'		
        	};
        	
            downloaderForm.downloadMethod = new Ext.form.Hidden({
                name: 'method',
                value: 'download'
            });

            downloaderForm.downloadAttachmentId = new Ext.form.Hidden({
                name: 'attachmentId'
            });

            downloaderForm.downloadAttachmentRawId = new Ext.form.Hidden({
                name: 'attachmentRawId'
            });

            downloaderForm.downloadAttachmentName = new Ext.form.Hidden({
                name: 'attachmentName'
            });
            
            downloaderForm.download = function(attachmentId, attachmentName, attachmentRawId) {
            	downloaderForm.downloadAttachmentId.setValue(attachmentId);
                downloaderForm.downloadAttachmentName.setValue(attachmentName);
                downloaderForm.downloadAttachmentRawId.setValue(attachmentRawId);

                FormHelper.isUnLoadPage = false;
                downloaderForm.downloaderFormPanel.getForm().submit({
                    method: 'GET',
                    waitMsg: __messages['message.downloading'],
                    url: downloaderForm.url,
                    success: function (form, action) {
                    },
                    failure: function (form, action) {
                        Ext.Msg.alert(action.result.title, action.result.message);
                    }
                });
                FormHelper.isUnLoadPage = true;
            };

            downloaderForm.downloaderFormPanel = new Ext.form.FormPanel({
                renderTo: 'contentHidden',
                id: 'downloaderFormPanel',
                standardSubmit: true,
                method: 'GET',
                url: downloaderForm.url,
                hidden: true,
                items: [
                downloaderForm.downloadMethod,
                downloaderForm.downloadAttachmentId,
                downloaderForm.downloadAttachmentRawId,
                downloaderForm.downloadAttachmentName]
            });
            
            return downloaderForm;
        }
    };
}();