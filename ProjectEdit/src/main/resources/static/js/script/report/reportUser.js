 application.toolbar.fn.ออกรายงาน = function(){
	 var prams = {};
		 prams.RSVID = reportUser.orderListComboBox.getValue();
		 ReportGen.generate(prams, 'reportUser');
 }
 
 
 
 	/*function loadMail(){
	   console.log('aaaaaaaaaaaaaaaaaaaa');
	}

 	loadMail(); // This will run on page load
	setInterval(function(){
		loadMail() // this will run after every 5 seconds
	}, 5000);*/