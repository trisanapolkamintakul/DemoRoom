package com.softsquare.application.domain;

import java.util.Date;
import java.util.Random;

import com.softsquare.application.common.util.BeanUtils;

public class CalendarMapping {
 
	private Integer id;
	private String title;
	private Date startDate;
	private String startTime;
	private Date endDate;
	private String endTime;
	private final String constraint = "availableForMeeting";
	private String start;
	private String end;
	private String color = this.generateColor();
	private String selectDate;
	private String TOPIC;
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTitle() {
		if(BeanUtils.isEmpty(this.title)){
			return "Meeting";
		}else{
			return title;
		}
	}
	
	public void setTitle(String title) {
		this.title = title;
	}
	
	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public Date getEndDate() {
		return endDate;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public String getColor() {
		return color;
	}
	
	public String getConstraint() {
		return constraint;
	}
	
	public String getStart() {
		return start;
	}

	public String getEnd() {
		return end;
	}

	public void setStart(String start) {
		this.start = start;
	}

	public void setEnd(String end) {
		this.end = end;
	}

	public void setColor(String color) {
		this.color = color;
	}
	
	public String getSelectDate() {
		return selectDate;
	}

	public void setSelectDate(String selectDate) {
		this.selectDate = selectDate;
	}

	private String generateColor() {
		Random r = new Random();
	    final char [] hex = { '0', '1', '2', '3', '4', '5', '6', '7',
	                          '8', '9', 'a', 'b', 'c', 'd', 'e', 'f' };
	    char [] s = new char[7];
	    int     n = r.nextInt(0x1000000);

	    s[0] = '#';
	    for (int i=1;i<7;i++) {
	        s[i] = hex[n & 0xf];
	        n >>= 4;
	    }
	    return new String(s);
	}

	public String getTOPIC() {
		return TOPIC;
	}

	public void setTOPIC(String tOPIC) {
		TOPIC = tOPIC;
	}
	
}
