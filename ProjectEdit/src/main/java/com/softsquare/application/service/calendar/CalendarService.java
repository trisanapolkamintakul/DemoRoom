package com.softsquare.application.service.calendar;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;

import com.softsquare.application.domain.CalendarMapping;
import com.softsquare.application.entity.Reservation;

public interface CalendarService {
	
	public ArrayList<CalendarMapping> calendarQuery();
	public ArrayList<CalendarMapping> calendarEdit(CalendarMapping calendarMapping);
	void SaveCalendar(Reservation reservation) throws NoSuchMethodException, SecurityException, IllegalAccessException,
			IllegalArgumentException, InvocationTargetException, Exception;

}
