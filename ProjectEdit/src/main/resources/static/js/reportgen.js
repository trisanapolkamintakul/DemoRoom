var ReportGen = {};
ReportGen.urlGen = application.contextPath+'/reportGen.html';

ReportGen.generate = function(prams, reportCode){
	if(!BeanUtils.isEmpty(reportCode)){
		prams.reportCode = 	reportCode;
		prams.reportFormat = 	"pdf";
		$("a#downloadFile").attr('href', ReportGen.urlGen+'?'+"reportParameter="+JSON.stringify(prams));
	 	document.getElementById('downloadFile').click();
	}
};