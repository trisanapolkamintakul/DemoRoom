package com.softsquare.application.service.calendar;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.softsquare.application.common.util.DateUtils;
import com.softsquare.application.dao.calendar.CalendarDao;
import com.softsquare.application.domain.CalendarMapping;
import com.softsquare.application.domain.RoomDetailMapping;
import com.softsquare.application.entity.Calendar;
import com.softsquare.application.entity.Reservation;
import com.softsquare.application.entity.RoomDetail;

@Service
public class CalendarServiceImp implements CalendarService {

	@Autowired
	private CalendarDao calendarDao;
	
	@Override
	public ArrayList<CalendarMapping> calendarQuery() {
		ArrayList<CalendarMapping> calendarList = calendarDao.calendarQuery();
		for (CalendarMapping mapping : calendarList) {
			mapping.setStart(DateUtils.formatShortDateCalendar(mapping.getStartDate())+"T"+mapping.getStartTime());
			mapping.setEnd(DateUtils.formatShortDateCalendar(mapping.getEndDate())+"T"+mapping.getEndTime());
			mapping.setStartDate(null);
			mapping.setStartTime(null);
			mapping.setEndDate(null);
			mapping.setEndTime(null);
		}
		return calendarList;
	}

	@Override
	public ArrayList<CalendarMapping> calendarEdit(CalendarMapping calendarMapping) {
		return calendarDao.calendarEdit(calendarMapping);
	}
	
	@Override
	public void SaveCalendar(Reservation reservation) throws Exception {
		Calendar detail = new Calendar();
		
		System.out.println(reservation.getRsvDateAvailable());
		String result = reservation.getRsvDateAvailable().substring(0, 6)+"20"+reservation.getRsvDateAvailable().substring(6, 8);
		System.out.println(result+" Format Date");
		detail.setcStartDate(DateUtils.parseShortDate(result));
		detail.setcEndDate(DateUtils.parseShortDate(result));
		detail.setcStartTime(reservation.getRsvStartID());
		detail.setcEndTime(reservation.getRsvEndTime());
		detail.setcTitle(reservation.getRsvRoom());
		detail.setTOPIC(reservation.getRSVTOPIC());
		calendarDao.SaveCalendar(detail);
	}

}
