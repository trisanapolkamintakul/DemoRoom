package com.softsquare.application.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.softsquare.application.common.util.LoginUtils;

@Controller
public class ApplicationController {
	protected final Logger log = LoggerFactory.getLogger(getClass());

	
    @RequestMapping(value="/*",method=RequestMethod.GET)
    public ModelAndView etc(HttpServletRequest httpServletRequest){
    	ModelAndView mav = new ModelAndView();
    	mav.setViewName("login");
    	return ControllerDefault.DefaultModelAndView(mav, httpServletRequest);
    }
	
	@RequestMapping(value={"/","/login.html"},method=RequestMethod.GET)
    public ModelAndView login(HttpServletRequest httpServletRequest){
    	ModelAndView mav = new ModelAndView();
    	mav.setViewName("login");
    	return ControllerDefault.DefaultModelAndView(mav, httpServletRequest);
    }
	
	@RequestMapping(value="/test",method=RequestMethod.GET)
    public ModelAndView tess(){
    	ModelAndView mav = new ModelAndView();
    	mav.setViewName("tess");
    	return mav;
    }
    
    @RequestMapping(value={"/loginfail.html"},method=RequestMethod.GET)
    public ModelAndView loginfail(HttpServletRequest httpServletRequest){
    	ModelAndView mav = new ModelAndView();
		mav.addObject("error", "Invalid username and password!");
    	mav.setViewName("login");
    	return ControllerDefault.DefaultModelAndView(mav, httpServletRequest);
    }
    
    @RequestMapping(value={"/logoutpage.html"},method=RequestMethod.GET)
    public ModelAndView logout(HttpServletRequest httpServletRequest){
    	ModelAndView mav = new ModelAndView();
    	mav.addObject("msg", "You've been logged out successfully.");
    	mav.setViewName("login");
    	return ControllerDefault.DefaultModelAndView(mav, httpServletRequest);
    }
    
    @RequestMapping(value="/home.html",method=RequestMethod.GET)
    public ModelAndView home(HttpServletRequest httpServletRequest){
    	ModelAndView mav = new ModelAndView();
//    	if (LoginUtils.getRole().equals("administrator")){
    	mav.setViewName("home");
//    	}
//    	if (LoginUtils.getRole().equals("user")){
//        mav.setViewName("home");
//        }
    	return ControllerDefault.DefaultModelAndView(mav, httpServletRequest);
    }
    
    @RequestMapping(value="/error.html",method=RequestMethod.GET)
    public ModelAndView error(HttpServletRequest httpServletRequest){
    	ModelAndView mav = new ModelAndView();
    	mav.setViewName("error");
    	return  ControllerDefault.DefaultModelAndView(mav, httpServletRequest);
    }
    
}
