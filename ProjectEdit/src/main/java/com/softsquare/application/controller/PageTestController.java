package com.softsquare.application.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;
import com.softsquare.application.common.util.LoginUtils;
import com.softsquare.application.domain.PageTest;

@RestController
@RequestMapping("/pageTest.html")
@Configurable
public class PageTestController {
	
	
    @RequestMapping(method=RequestMethod.GET)
    public ModelAndView page(){
    	ModelAndView mav = new ModelAndView();
    	mav.setViewName("pageTest");
    	return mav;
    }
    
    @RequestMapping(method=RequestMethod.POST, params = "xaction=read")
    public void read(){
    }
    
	
	@RequestMapping(params =  "method=search" , method=RequestMethod.POST)
    public void login(HttpServletRequest request, HttpServletResponse response, @ModelAttribute PageTest pageTest){
//		ArrayList<Map<String,Object>> arr = new ArrayList<>();
//		Map<String,Object> map = new HashMap<String,Object>();
//		map.put("itemId", "1");
//		map.put("itemCd", "1111");
//		map.put("itemName", "item_1");
//		arr.add(map);
//		
//		map = new HashMap<String,Object>();
//		map.put("itemId", "2");
//		map.put("itemCd", "2222");
//		map.put("itemName", "item_2");
//		arr.add(map);
		
//		domain.save();
//		domain.delete();
//		domain.update();
		System.out.println("//////////////**************************------------------");
		System.out.println(LoginUtils.getUsername());
		System.out.println(LoginUtils.getPassword());
		System.out.println(LoginUtils.getRole());
		Gson gson = new Gson();
		String  json = gson.toJson(null);
		try {
//			domain.searchAllCourse();
			response.getWriter().write(json);
//			response.getWriter().write("{records:"+json+"}");
		} catch (Exception e) {
			e.printStackTrace();
		}
    }
	
}
