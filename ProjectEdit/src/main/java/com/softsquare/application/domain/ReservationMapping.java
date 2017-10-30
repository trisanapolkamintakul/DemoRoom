package com.softsquare.application.domain;

public class ReservationMapping {
	private String room;
	private String roomavailable;
	private String dateavailable;
	private String startID;
	private String endtime;
	private String search;
	private Integer id;
	private String userName;
	private String RSVTOPIC;
	private String RSVSTATUS;

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getRoom() {
		return room;
	}

	public void setRoom(String room) {
		this.room = room;
	}

	public String getRoomavailable() {
		return roomavailable;
	}

	public void setRoomavailable(String roomavailable) {
		this.roomavailable = roomavailable;
	}


	public String getDateavailable() {
		return dateavailable;
	}

	public void setDateavailable(String dateavailable) {
		this.dateavailable = dateavailable;
	}

	public String getStartID() {
		return startID;
	}

	public void setStartID(String startID) {
		this.startID = startID;
	}

	public String getEndtime() {
		return endtime;
	}

	public void setEndtime(String endtime) {
		this.endtime = endtime;
	}

	public String getSearch() {
		return search;
	}

	public void setSearch(String search) {
		this.search = search;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getRSVTOPIC() {
		return RSVTOPIC;
	}

	public void setRSVTOPIC(String rSVTOPIC) {
		RSVTOPIC = rSVTOPIC;
	}

	public String getRSVSTATUS() {
		return RSVSTATUS;
	}

	public void setRSVSTATUS(String rSVSTATUS) {
		RSVSTATUS = rSVSTATUS;
	}

}
