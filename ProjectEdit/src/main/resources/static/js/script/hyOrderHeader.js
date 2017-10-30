   function renderInstall(value, metaData, record, row, col, store, gridView){
       return('<a href="'+orderHeader.urlOrderDetail+'?hyOrdhId='+record.data.hyOrdhId+'">Edit</a>');
    }
   
   application.toolbar.fn['Create Order'] = function(){
	   location.href = "orderDetail.html"
   }
   
   searchFunction = function(){
	   orderHeader.grid.load({
	          xaction: 'read',
	          method: 'orderHeaderGrid',
	          hyOrdhName  : orderHeader.orderHeaderName.getValue(),
	          hyPeriodId  : orderHeader.periodDateComboBox.getValue()
		  }, function () {});
   }
   
   orderHeader.save = function(){
	   if(orderHeader.grid.isDirty()){
		   var prams = { method: 'orderHeaderGrid', xaction: 'save'};
			GridConvert.save(orderHeader.grid, prams,function(){
				searchFunction();
			});
	   }
   }