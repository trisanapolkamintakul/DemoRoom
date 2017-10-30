var DateUtils = {};
var monthEng = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

DateUtils.convertToDateBuddhistFormat = function(dateValue){
	var result = dateValue;
	if(BeanUtils.isNotEmpty(dateValue)){
		if(dateValue.getFullYear() < 2200){
			dateValue.setFullYear(dateValue.getFullYear()+543);
			result = dateValue;
		}
	}
	return result;
}

DateUtils.convertSaveGridData = function(dateValue){
	var result = dateValue;
	if(BeanUtils.isNotEmpty(dateValue)){
		if(dateValue.getFullYear() < 2200){
			dateValue.setFullYear(dateValue.getFullYear()+543);
		}
		
		var date = dateValue.getDate();
		var month = dateValue.getMonth();
		var year = dateValue.getFullYear();
		result = monthEng[month]+' '+date+','+' '+year+' 12:00:00 AM';
	}
	return result;
}

DateUtils.convertDateFormatDDMMYYYY = function(dateValue){
	var dateFormat = new Date(dateValue);
	var date = ("0" + dateFormat.getDate()).slice(-2).toString();
	var month = ("0" + (dateFormat.getMonth() + 1)).slice(-2).toString();
	var year = dateFormat.getFullYear().toString();
	return [date, month, year].join('/');
}

DateUtils.convertDateFormatYYYYMMDD = function(dateValue){
	var dateFormat = new Date(dateValue);
	var date = ("0" + dateFormat.getDate()).slice(-2).toString();
	var month = ("0" + (dateFormat.getMonth() + 1)).slice(-2).toString();
	var year = dateFormat.getFullYear().toString();
	return [year, month, date].join('-');
}