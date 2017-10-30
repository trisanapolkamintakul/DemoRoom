 application.toolbar.fn.ออกรายงาน = function(){
	 var prams = {};
		 prams.MAID = report01.orderListComboBox.getValue();
		 ReportGen.generate(prams, 'reportWaste2');
 }
 
 
 
 	/*function loadMail(){
	   console.log('aaaaaaaaaaaaaaaaaaaa');
	}

 	loadMail(); // This will run on page load
	setInterval(function(){
		loadMail() // this will run after every 5 seconds
	}, 5000);*/