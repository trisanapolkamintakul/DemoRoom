package com.softsquare.application.controller.calendar;

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
import com.softsquare.application.common.util.BeanUtils;
import com.softsquare.application.controller.ControllerDefault;
import com.softsquare.application.domain.CalendarMapping;
import com.softsquare.application.service.calendar.CalendarService;

@RestController
@RequestMapping("/calendarController.html")
@Configurable
public class calendarController {

	@Autowired
	private CalendarService calendarService;
	
	@RequestMapping(method=RequestMethod.GET)
    public ModelAndView page(HttpServletRequest request, HttpServletResponse response, @ModelAttribute CalendarMapping calendarMapping){
    	ModelAndView mav = new ModelAndView();
    	mav.setViewName("hyPeriod");
    	return ControllerDefault.DefaultModelAndView(mav, request);
    }
	
	@RequestMapping(params = {"xaction=read" , "method=searchCalendar"} , method=RequestMethod.POST)
    public void search(HttpServletRequest request, HttpServletResponse response, @ModelAttribute CalendarMapping calendarMapping) throws Throwable{
	 Gson gson = new Gson();
	 String  json = null;
	 if(BeanUtils.isNotEmpty(calendarMapping.getId())){
		 json = gson.toJson(calendarService.calendarEdit(calendarMapping));
	 }else{
		 json = gson.toJson(calendarService.calendarQuery());
	 }
	 
	 response.getWriter().write("{records:"+json+"}");
	
	}
	
	@RequestMapping(params = {"xaction=save" , "method=saveCalendar"} , method=RequestMethod.POST)
    public void save(HttpServletRequest request, HttpServletResponse response, @ModelAttribute CalendarMapping calendarMapping) throws Throwable{
		System.out.println("Id : " + calendarMapping.getId());
		System.out.println("Start : " + calendarMapping.getStart());
	}

}
