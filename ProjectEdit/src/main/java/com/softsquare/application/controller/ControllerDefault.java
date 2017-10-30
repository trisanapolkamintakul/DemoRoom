package com.softsquare.application.controller;

import java.net.InetAddress;
import java.net.UnknownHostException;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.servlet.ModelAndView;

import com.softsquare.application.common.util.BeanUtils;
import com.softsquare.application.common.util.LoginUtils;

public class ControllerDefault {

	
	public static  ModelAndView DefaultModelAndView(ModelAndView mav, HttpServletRequest httpServletRequest){
		if(BeanUtils.isEmpty(LoginUtils.getUsername())){
			mav.setViewName("login");
		}else{
			mav.addObject("userNameUserSystem", LoginUtils.getUsername());
			mav.addObject("roleUserSystem", LoginUtils.getRole());
		}
		
		try {
			mav.addObject("ipDomainSystem", InetAddress.getLocalHost().getHostAddress()+":"+httpServletRequest.getServerPort());
		} catch (UnknownHostException e) {
			mav.addObject("ipDomainSystem", "http://127.0.0.1:"+httpServletRequest.getServerPort());
		}
		
		return mav;
	}
}
