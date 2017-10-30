package com.softsquare.application.controller;

import java.util.ArrayList;
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

import com.google.gson.Gson;
import com.softsquare.application.common.util.DateUtils;
import com.softsquare.application.domain.ComboBoxMapping;
import com.softsquare.application.domain.OrderHeaderMapping;
import com.softsquare.application.domain.PeriodMapping;
import com.softsquare.application.entity.Period;
import com.softsquare.application.entity.Role;
import com.softsquare.application.entity.RoomDetail;
import com.softsquare.application.entity.RoomType;
import com.softsquare.application.service.OrderHeaderService;
import com.softsquare.application.service.PeriodService;
import com.softsquare.application.service.ReservationService;
import com.softsquare.application.service.RoleService;
import com.softsquare.application.service.RoomDetailService;
import com.softsquare.application.service.RoomTypeService;


@RestController
@RequestMapping("/combobox.html")
@Configurable
public class ComboboxController {
	
	@Autowired
	private RoleService roleSerivce;
	
	@Autowired
	private PeriodService periodService;
	
	@Autowired
	private OrderHeaderService orderHeaderService;
	
	@Autowired
	private RoomTypeService roomtypeService;
	
	@Autowired
	private RoomDetailService roomdetailService;
	
	
	
	@Autowired
	private RoomDetailService roomDetailService;
	
	
	@Autowired
	private ReservationService reservationService;
	
	@RequestMapping(params =  "method=role" , method=RequestMethod.POST)
    public void register(HttpServletRequest request, HttpServletResponse response){
		ArrayList<Role> roleList =  roleSerivce.getRole();
		Gson gson = new Gson();
		String  json = gson.toJson(roleList);
		try {
			response.getWriter().write("{records:"+json+"}");
		} catch (Exception e) {
				e.printStackTrace();
		}
	}
	
	@RequestMapping(params =  "method=period" , method=RequestMethod.POST)
    public void period(@ModelAttribute PeriodMapping periodMapping, HttpServletRequest request, HttpServletResponse response){
		try {
			Gson gson = new Gson();
			ArrayList<Period> periodList =  periodService.findPeriod(periodMapping);
			Integer totalRecord = periodService.findPeriodPagingTotalRecord(periodMapping);
			ArrayList<ComboBoxMapping> comboBoxMapping = new ArrayList<ComboBoxMapping>();
			for (Period period : periodList) {
				ComboBoxMapping boxMapping = new ComboBoxMapping();
				boxMapping.setValueField(period.getHyPeriodId().toString());
				boxMapping.setDisplayField(period.getHyPeriodName());
				boxMapping.setDescriptionField(DateUtils.formatShortDate(period.getHyPeriodDate()));
				boxMapping.setValueBigDecimal1(period.getHyPeriodPrice2());
				boxMapping.setValueBigDecimal2(period.getHyPeriodPrice3());
				comboBoxMapping.add(boxMapping);
			}
			String  json = gson.toJson(comboBoxMapping);
			response.getWriter().write("{records:"+json+", total:"+totalRecord+"}");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@RequestMapping(params =  "method=period2" , method=RequestMethod.POST)
    public void search(HttpServletRequest request, HttpServletResponse response, @ModelAttribute PeriodMapping periodMapping) throws Throwable{
	 Gson gson = new Gson();
	 String  json = gson.toJson(periodService.findPeriod(periodMapping));
	 response.getWriter().write("{records:"+json+"}");
	}
	
	@RequestMapping(params = "method=roomtype", method = RequestMethod.POST)
	public void province(HttpServletRequest request, HttpServletResponse response) {
		ArrayList<RoomType> provinceList = roomtypeService.getRoomType();
		Gson gson = new Gson();
		String json = gson.toJson(provinceList);
		try {
			response.getWriter().write("{records:" + json + "}");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@RequestMapping(params = "method=room", method = RequestMethod.POST)
	public void Room(HttpServletRequest request, HttpServletResponse response) {
		ArrayList<RoomDetail> provinceList = roomDetailService.getRoom();
		Gson gson = new Gson();
		String json = gson.toJson(provinceList);
		try {
			response.getWriter().write("{records:" + json + "}");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	
	
	
	
//	@RequestMapping(params = "method=meetingRoom", method = RequestMethod.POST)
//	public void meetingRoom(HttpServletRequest request, HttpServletResponse response) {
//		List<Map<String, Object>> provinceList = roomdetailService.meetingRoom(request.getParameter("roomdate"));
//		Gson gson = new Gson();
//		String json = gson.toJson(provinceList);
//		try {
//			response.getWriter().write("{records:" + json + "}");
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//	}
	
//	@RequestMapping(params = "method=meetingroom", method = RequestMethod.POST)
//	public void meetingroom(HttpServletRequest request, HttpServletResponse response) {
//		List<Map<String, Object>> provinceList = roomdetailService.meetingroom(request.getParameter("roomdate"));
//		Gson gson = new Gson();
//		String json = gson.toJson(provinceList);
//		try {
//			response.getWriter().write("{records:" + json + "}");
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//	}
	


	
	
	
	@RequestMapping(params = "method=orderListUser", method = RequestMethod.POST)
	public void orderListUser(HttpServletRequest request, HttpServletResponse response) {
		List<Map<String, Object>> provinceList = reservationService.getreportUser();
		Gson gson = new Gson();
		String json = gson.toJson(provinceList);
		try {
			response.getWriter().write("{records:" + json + "}");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/*@RequestMapping(params =  "method=orderList" , method=RequestMethod.POST)
    public void orderList(@ModelAttribute RoomWasteMapping roomWasteMapping, HttpServletRequest request, HttpServletResponse response){
		try {
			 Gson gson = new Gson();
			 String  json = gson.toJson(roomWasteService.search(roomWasteMapping));
			 Integer totalRecord = roomWasteService.pagingTotalRecord(roomWasteMapping);
			response.getWriter().write("{records:"+json+", total:"+totalRecord+"}");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}*/
	
}
