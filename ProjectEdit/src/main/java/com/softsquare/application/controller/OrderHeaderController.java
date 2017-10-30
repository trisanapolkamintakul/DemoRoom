package com.softsquare.application.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;
import com.softsquare.application.domain.OrderHeaderMapping;
import com.softsquare.application.service.OrderHeaderService;

@RestController
@RequestMapping("/orderHeader.html")
@Configurable
public class OrderHeaderController {

	@Autowired
	private OrderHeaderService orderHeaderService;
	
	@RequestMapping(method=RequestMethod.GET)
    public ModelAndView page(HttpServletRequest request, HttpServletResponse response){
    	ModelAndView mav = new ModelAndView();
    	mav.setViewName("hyOrderHeader");
    	return ControllerDefault.DefaultModelAndView(mav, request);
    }
	 
	
	@RequestMapping(params =  {"method=orderHeaderGrid", "xaction=read"} , method=RequestMethod.POST)
    public void search(HttpServletRequest request, HttpServletResponse response, @ModelAttribute OrderHeaderMapping orderHeaderMapping) throws Throwable{
	 Gson gson = new Gson();
	 String  json = gson.toJson(orderHeaderService.search(orderHeaderMapping));
	 Integer totalRecord = orderHeaderService.pagingTotalRecord(orderHeaderMapping);
	 response.getWriter().write("{records:"+json+",total:"+totalRecord+"}");
	}
	 
	@Transactional
	@RequestMapping(params =  {"method=orderHeaderGrid", "xaction=save"}  , method=RequestMethod.POST)
    public void save(HttpServletRequest request, HttpServletResponse response, @ModelAttribute OrderHeaderMapping orderHeaderMapping) throws Throwable{
		orderHeaderService.delete(orderHeaderMapping);
	}
	
}
