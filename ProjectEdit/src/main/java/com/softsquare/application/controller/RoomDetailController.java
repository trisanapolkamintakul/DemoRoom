package com.softsquare.application.controller;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;
import com.softsquare.application.domain.RoomDetailMapping;
import com.softsquare.application.service.RoomDetailService;

@RestController
@RequestMapping("/roomdetail.html")
@Configurable
public class RoomDetailController {

	@Autowired
	RoomDetailService roomDetailService;
	
	

	@RequestMapping(method = RequestMethod.GET)
	public ModelAndView page(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("roomdetail");
		return ControllerDefault.DefaultModelAndView(mav, request);
	}

	@RequestMapping(params = "method=save", method = RequestMethod.POST)
	public void saveRoomDetail(HttpServletRequest request, HttpServletResponse response,
			@ModelAttribute RoomDetailMapping roomDetail) throws Throwable {
		roomDetailService.RMSave(roomDetail);
		System.out.println(roomDetail.getName());
	}

	@RequestMapping(params = "method=delete", method = RequestMethod.POST)
	public void deleteRoomDetail(HttpServletRequest request, HttpServletResponse response,
			@ModelAttribute RoomDetailMapping roomDetail) throws Throwable {
		roomDetailService.RMDelete(roomDetail);
		System.out.println(roomDetail.getName());
	}

	@RequestMapping(params = "method= update", method = RequestMethod.POST)
	public void updateRoomDetail(HttpServletRequest request, HttpServletResponse response,
			@ModelAttribute RoomDetailMapping roomDetail) throws Throwable {
		roomDetailService.RMUpdate(roomDetail);
		System.out.println(roomDetail.getName());
	}

	@RequestMapping(params = "method=search", method = RequestMethod.POST)
	public void searchRoomDetail(HttpServletRequest request, HttpServletResponse response,
			@ModelAttribute RoomDetailMapping roomDetail) throws Throwable {
		List<Map<String, Object>> listRoom = roomDetailService.RMSearch(roomDetail);

		Gson gson = new Gson();
		String json = gson.toJson(listRoom);
		try {
			response.getWriter().write("{records:" + json + "}");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@RequestMapping(params = "method=searchall", method = RequestMethod.POST)
	public void searchallRoomDetail(HttpServletRequest request, HttpServletResponse response,
			@ModelAttribute RoomDetailMapping roomDetail) throws Throwable {
		List<Map<String, Object>> listRoom = roomDetailService.RMSearch(roomDetail);

		Gson gson = new Gson();
		String json = gson.toJson(listRoom);
		try {
			response.getWriter().write("{records:" + json + "}");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@RequestMapping(params = { "method=savegrid1" }, method = RequestMethod.POST)
	public void savegrid2(@ModelAttribute RoomDetailMapping room,
			@RequestParam(value = "savegrid1", required = false) String grid, HttpServletRequest request,
			HttpServletResponse response) throws NoSuchMethodException, SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException {
		{
			Gson gson = new Gson();
			RoomDetailMapping[] roomgrid = gson.fromJson(grid, RoomDetailMapping[].class);
			roomDetailService.savegrid1(roomgrid);
		}
	}	
	
	@RequestMapping(params = { "method=removeRoom" }, method = RequestMethod.POST)
	public void removeRoom(@RequestParam(value = "code", required = false) List<Integer> delete,
			HttpServletRequest request, HttpServletResponse response) {

		for (Integer deletes : delete) {
			roomDetailService.removeRoom(deletes);
		}
	}
	
}
