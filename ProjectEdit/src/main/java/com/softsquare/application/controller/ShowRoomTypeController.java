package com.softsquare.application.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

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
import com.softsquare.application.domain.RoomDetailMapping;
import com.softsquare.application.service.RoomDetailService;

@RestController
@RequestMapping("/showroomtype.html")
@Configurable
public class ShowRoomTypeController {
	
	@Autowired
	RoomDetailService roomDetailService;
	
	@RequestMapping(method = RequestMethod.GET)
	public ModelAndView page(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("showroomtype");
		return ControllerDefault.DefaultModelAndView(mav, request);
	}
	
	@RequestMapping(params = "method=search", method = RequestMethod.POST)
	public void searchRoomDetail(HttpServletRequest request, HttpServletResponse response,
			@ModelAttribute RoomDetailMapping roomDetail) throws Throwable {
		// System.out.println(roomDetail.getName());
		List<Map<String, Object>> listRoom = roomDetailService.RMSearch(roomDetail);

		Gson gson = new Gson();
		String json = gson.toJson(listRoom);
		try {
			response.getWriter().write("{records:" + json + "}");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
