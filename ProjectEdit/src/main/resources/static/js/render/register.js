var register = {};
register.url = application.contextPath +'/register.html';

if (!register.loadMask) {
	register.loadMask = new Ext.LoadMask(Ext.getBody(), {
	       msg: __messages['message.processing']
	  });
}

register.buildUserDetail = function () {
	
	register.userFName = new Ext.form.TextField({
		id : 'userFName',
		fieldLabel : "First Name",	
	});
	
	register.userLName = new Ext.form.TextField({
		id : 'userLName',
		fieldLabel : "Last Name",
	});
	
	register.userEmail = new Ext.form.TextField({
		id : 'userEmail',
		fieldLabel : "Email",
	});
	
	register.userPhone = new Ext.form.TextField({
		id : 'userPhone',
		fieldLabel : "Phone",
	});
	
	register.userOrganization = new Ext.form.TextField({
		id : 'userOrganization',
		fieldLabel : "Organization",
	});
	
	register.userAddress = new Ext.form.TextField({
		id : 'userAddress',
		fieldLabel : "Address",
	});
	
	register.userName = new Ext.form.TextField({
		id : 'userName',
		fieldLabel: __messages['label.userName'],
	    allowBlank: false
	});
	
	register.userPassword = new Ext.form.TextField({
		id : 'userPassword',
		inputType: 'password',
		fieldLabel: __messages['label.userPassword'],
	    allowBlank: false
	});
	
	
	register.userPasswordConfirm = new Ext.form.TextField({
		id : 'userPasswordConfirm',
		inputType: 'password',
		fieldLabel: __messages['label.userPasswordConfirm'],
	    allowBlank: false
	});
	
	register.roleCombobox = new Ext.ss.form.ComboBox({
		 id: 'roleCombobox',
		 fieldLabel: __messages['label.role'],
		 allowBlank: false,
         mode: 'remote',
         width: 150,
         triggerAction: 'all',
         minChars: 0,
         forceSelection: true,
         valueField: 'roleId',
         displayField: 'roleCode',
         descriptionField: 'roleName',
         showDescription: false,
//         useOriginalTpl: true,
         store: {
             xtype: 'jsonstore',
             storeId: id + '-store',
             idProperty: 'roleId',
             fields: ['roleId', 'roleCode', 'roleName'],
             url: application.contextPath + '/combobox.html',
             baseParams: {
                 method: 'role'
             }
         }
	});
	
	register.roleContainer = new Ext.Container({
        layout: 'column',
        items: [{
                xtype: 'container',
                layout: 'form',
                columnWidth: 0.4,
                items: [register.roleCombobox]
            }
        ]

    });
	
	register.containerCombo1 = new Ext.Container({
		layout :'column',
		items:[{
			xtype:'container',
			layout:'form',
			columnWidth: 0.5,
			labelWidth:100,
			items:[register.userFName,register.userEmail,register.userOrganization,register.userName,register.userPasswordConfirm]
		
		},{
			xtype:'container',
			layout:'form',
			columnWidth: 0.5,
			labelWidth:100,
			items:[register.userLName,register.userPhone,register.userAddress,register.userPassword,register.roleContainer]
		}]
	});

	register.fieldSet = new Ext.form.FieldSet({
	    title: __messages['label.register'],
	    items: [
	              register.containerCombo1
                ]
	});
}

Ext.onReady(function () {
	
	register.buildUserDetail();

	register.allFieldSet = new Ext.form.FieldSet({
        title: __messages['label.all'],
        items: [register.fieldSet]
    });
	
	register.formPanel = new Ext.form.FormPanel({
        url: register.url,
        items: [register.allFieldSet],
        plugins: [new Ext.ux.FitToParent({
                fitHeight: false
            })],
        renderTo: 'renderDiv'
    });
	
});
