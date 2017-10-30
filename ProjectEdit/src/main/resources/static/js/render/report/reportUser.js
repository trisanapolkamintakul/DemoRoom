var reportUser = {};
reportUser.url = application.contextPath +'/reportUser.html';

if (!reportUser.loadMask) {
	reportUser.loadMask = new Ext.LoadMask(Ext.getBody(), {
	       msg: __messages['message.processing']
	  });
}

reportUser.buildReport01 = function () {
	
	reportUser.orderListComboBox = new BaseComboBox.getOrderListUser('orderListComboBox', {});
	
	reportUser.orderListContainer = new Ext.Container({
        layout: 'column',
        items: [{
                xtype: 'container',
                layout: 'form',
                columnWidth: 0.5,
                items: [reportUser.orderListComboBox]
            },{
                xtype: 'container',
                layout: 'form',
                columnWidth: 0.5,
                items: []
            }
        ]
    });
	
	reportUser.fieldSet = new Ext.form.FieldSet({
		title : 'บันทึกการจอง',
	    items: [reportUser.orderListContainer]
	});
	
}

Ext.onReady(function () {
	
	reportUser.buildReport01();

	reportUser.allFieldSet = new Ext.form.FieldSet({
        title: __messages['label.all'],
        items: [reportUser.fieldSet]
    });
	
	reportUser.formPanel = new Ext.form.FormPanel({
        url: reportUser.url,
        items: [reportUser.allFieldSet],
        plugins: [new Ext.ux.FitToParent({
                fitHeight: false
            })],
        renderTo: 'renderDiv'
    });
	
});




