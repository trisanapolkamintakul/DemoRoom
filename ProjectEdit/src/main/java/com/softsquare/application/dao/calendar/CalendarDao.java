package com.softsquare.application.dao.calendar;

import java.util.ArrayList;

import com.softsquare.application.domain.CalendarMapping;
import com.softsquare.application.entity.Calendar;

public interface CalendarDao {
	public ArrayList<CalendarMapping> calendarQuery();
	public ArrayList<CalendarMapping> calendarEdit(CalendarMapping calendarMapping);
	public void SaveCalendar(Calendar detail) throws Exception;
}
