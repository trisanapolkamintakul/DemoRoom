package com.softsquare.application.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;
import com.softsquare.application.domain.PeriodMapping;
import com.softsquare.application.service.PeriodService;

@RestController
@RequestMapping("/period.html")
@Configurable
public class PeriodController {

	@Autowired
	private PeriodService periodService;
	
	@RequestMapping(method=RequestMethod.GET)
    public ModelAndView page(HttpServletRequest request, HttpServletResponse response){
    	ModelAndView mav = new ModelAndView();
    	mav.setViewName("hyPeriod");
    	return ControllerDefault.DefaultModelAndView(mav, request);
    }
	 
	@RequestMapping(params =  {"method=periodGrid", "xaction=read"} , method=RequestMethod.POST)
    public void search(HttpServletRequest request, HttpServletResponse response, @ModelAttribute PeriodMapping periodMapping) throws Throwable{
	 Gson gson = new Gson();
	 String  json = gson.toJson(periodService.findPeriod(periodMapping));
	 response.getWriter().write("{records:"+json+"}");
	}
	 
	@RequestMapping(params =  {"method=periodGrid", "xaction=save"}  , method=RequestMethod.POST)
    public void save(HttpServletRequest request, HttpServletResponse response, @ModelAttribute PeriodMapping periodMapping) throws Throwable{
		periodService.periodSave(periodMapping);
	}
	
}
