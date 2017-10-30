Ext.util.Format.commonStatusRenderer = function(combobox) {
	return function(value, metaData, record, rowIndex, colIndex, store) {
		if(value === true)
			value = 1;
		if(value === false)
			value = 0;
		var record = combobox.findRecord(combobox.valueField, ""+value);
		if(record){
			return record.get(combobox.displayField);
		}else{
			return value;
		}
	};
};

/**
 * @deprecated ห้ามใช้
 */
Ext.util.Format.shortDateFormat = function() {
	return function(value, metaData, record, rowIndex, colIndex, store) {
		if(!(value instanceof Ext.ss.form.DateField) && !Ext.isEmpty(value)){
			value = new Date(value);
			// 543 is different buddhist year from Christi
			value.setFullYear(value.getFullYear()+543);
//			value.setFullYear(value.getFullYear());
		}
		if(!Ext.isEmpty(value)){
			return value.format(application.formatDate);
		}
		else{
			return value;
		}	
	};
};

Ext.util.Format.ComboboxDisplayAlias = function(dataIndex) {
	return function(value, metaData, record, rowIndex, colIndex, store) {
		if(record.json) {
    		value = record.json[dataIndex+'-disp'];
        }
        return value;
	}
};

Ext.util.Format.commonStatusRemote = function(combobox) {
	return function(value, metaData, record, rowIndex, colIndex, store) {
		if(combobox){
			var record = combobox.findRecord(combobox.valueField,value);
			if(record){
				return record.get(combobox.displayField);
			}else{
				return value;
			}
		}
		return value;
	}
};

Ext.util.Format.indicatorStatusColor = function(combobox) {
	return function (value, metaData, record, rowIndex, colIndex, store){
    	if (!Ext.isEmpty(value)) {
    		if(value == 'แดง') {
    			metaData.attr = 'style="background-color:red;"';    			
    		} else if(value == 'เขียว') {
    			metaData.attr = 'style="background-color:green;"';    			
    		} else if(value == 'เหลือง') {
    			metaData.attr = 'style="background-color:yellow;"';    			
    		} 
    	} else {
    		value = '';
    	}
    	return '<b>'+ value+'</b>';
    }
};
