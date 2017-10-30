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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;
import com.softsquare.application.domain.ReservationMapping;
import com.softsquare.application.domain.RoomDetailMapping;
import com.softsquare.application.entity.Reservation;
import com.softsquare.application.service.ReservationService;
import com.softsquare.application.service.RoomDetailService;
import com.softsquare.application.service.calendar.CalendarService;

@RestController
@RequestMapping("/reservation.html")
@Configurable
public class ReservationController {
	@Autowired
	RoomDetailService roomDetailService;
	
	@Autowired
	ReservationService reservationService;
	@Autowired
	CalendarService calendarService;

	@RequestMapping(method = RequestMethod.GET)
	public ModelAndView page(HttpServletRequest request, HttpServletResponse response) {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("reservation");
		return ControllerDefault.DefaultModelAndView(mav, request);
	}


	@RequestMapping(params = "method=save", method = RequestMethod.POST)
	public void saveReservation(HttpServletRequest request, HttpServletResponse response,
			@ModelAttribute ReservationMapping reservation) throws Throwable {
		   Reservation res =  reservationService.RSVSave(reservation);
		    System.out.println(res.getRsvDateAvailable()+"-------------------Date-------");
		    calendarService.SaveCalendar(res);
	}

	@RequestMapping(params = "method=update", method = RequestMethod.POST)
	public void update(@ModelAttribute ReservationMapping reservation,
			@RequestParam(value = "savegrid1", required = false) String grid, HttpServletRequest request,
			HttpServletResponse response) {
		// System.out.println("00000000000000000000000000000000000");
		Gson gson = new Gson();
		ReservationMapping[] reservationgrid = gson.fromJson(grid, ReservationMapping[].class);
		reservationService.updategrid(reservationgrid);

	}

	@RequestMapping(params = { "method=savegrid1" }, method = RequestMethod.POST)
	public void savegrid2(@ModelAttribute ReservationMapping reservationMap,
			@RequestParam(value = "savegrid1", required = false) String grid, HttpServletRequest request,
			HttpServletResponse response) {
		{
			Gson gson = new Gson();
			ReservationMapping[] reservationgrid = gson.fromJson(grid, ReservationMapping[].class);

			// RoomDetailService.savegrid1(roomgrid);
			reservationService.savegrid1(reservationgrid);

		}

	}

	@RequestMapping(params = "method=search", method = RequestMethod.POST)
	public void searchReservation(HttpServletRequest request, HttpServletResponse response,
			@ModelAttribute ReservationMapping reservation) throws Throwable {
		// System.out.println(roomDetail.getName());
		List<Map<String, Object>> listReservation = reservationService.RSVSearch(reservation);

		Gson gson = new Gson();
		String json = gson.toJson(listReservation);
		try {
			response.getWriter().write("{records:" + json + "}");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@RequestMapping(params = { "method=meetingRoom" }, method = RequestMethod.POST)
	public void MeetingRoom(HttpServletRequest request, HttpServletResponse response) {

		List<Map<String, Object>> meetingRoom = roomDetailService.meetingRoom(request.getParameter("roomdate"), request.getParameter("starttime"), request.getParameter("endtime"));

		Gson gson = new Gson();
		String json = gson.toJson(meetingRoom);
		try {
			response.getWriter().write("{records:" + json + "}");
		} catch (IOException e) {
			e.printStackTrace();
		}

	}

	@RequestMapping(params = { "method=meetingroom" }, method = RequestMethod.POST)
	public void MeetingRoom1(HttpServletRequest request, HttpServletResponse response) {

		List<Map<String, Object>> meetingroom = roomDetailService.meetingroom(request.getParameter("roomdate"), request.getParameter("starttime"), request.getParameter("endtime"));

		Gson gson = new Gson();
		String json = gson.toJson(meetingroom);
		try {
			response.getWriter().write("{records:" + json + "}");
		} catch (IOException e) {
			e.printStackTrace();
		}

	}

	@RequestMapping(params = { "method=removeReservation" }, method = RequestMethod.POST)
	public void removeReservation(@RequestParam(value = "code", required = false) List<Integer> delete,
			HttpServletRequest request, HttpServletResponse response) {

		for (Integer deletes : delete) {
			System.out.println(deletes);
			reservationService.removeReservation(deletes);
		}
	}
}
