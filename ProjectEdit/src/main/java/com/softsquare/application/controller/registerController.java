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

import com.softsquare.application.domain.LoginMapping;
import com.softsquare.application.service.LoginService;

@RestController
@RequestMapping("/register.html")
@Configurable
public class registerController {
	
	@Autowired
	LoginService loginService;
	
    @RequestMapping(method=RequestMethod.GET)
    public ModelAndView page(HttpServletRequest request, HttpServletResponse response){
    	ModelAndView mav = new ModelAndView();
    	mav.setViewName("register");
    	return ControllerDefault.DefaultModelAndView(mav, request);
    }
	
	@RequestMapping(params =  "method=save" , method=RequestMethod.POST)
    public void login(HttpServletRequest request, HttpServletResponse response, @ModelAttribute LoginMapping login) throws Throwable{
//		System.out.println("Con----------------------------"+login.getUsfname());
		loginService.saveUser(login);
	}
	
}
