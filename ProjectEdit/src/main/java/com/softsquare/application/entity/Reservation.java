package com.softsquare.application.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


	@Entity
	@Table(name = "RESERVATION")
	public class Reservation extends BaseEntity implements Serializable{


	/**
	 * 
	 */
	private static final long serialVersionUID = 3243145478200240487L;

	@Id
	@GeneratedValue
	@Column(name = "RSVID")
    private Integer id;

	@Column(name = "RSVROOM")
    private String rsvRoom;
	
	
	
	@Column(name = "RSVROMMAVAILABLE")
    private String rsvRoomAvailable;
	
	@Column(name = "RSVDATEAVAILABLE")
    private String rsvDateAvailable;
	
	@Column(name = "RSVSTARTID")
    private String rsvStartID;
	
	@Column(name = "RSVENDTime")
    private String rsvEndTime;
	
	@Column(name = "LGUSERNAME")
    private String username;
	
	@Column(name = "RSVTOPIC")
    private String RSVTOPIC;
	
	@Column(name = "RSVSTATUS")
    private String RSVSTATUS;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "RSVID", referencedColumnName = "RMID", insertable=false, updatable=false)
    private RoomDetail roomdetail;
	
	
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "RSVID", referencedColumnName = "LGUSERNAME", insertable=false, updatable=false)
	private Login login;
	
	//@Column(name = "UDLOGINNAME", unique=true, nullable = false)
   // private String udloginName;
	
	public Login getLogin() {
		return login;
	}

	public void setLogin(Login login) {
		this.login = login;
	}


	public RoomDetail getRoomdetail() {
		return roomdetail;
	}

	public void setRoomdetail(RoomDetail roomdetail) {
		this.roomdetail = roomdetail;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	
	public String getRsvRoom() {
		return rsvRoom;
	}

	public void setRsvRoom(String rsvRoom) {
		this.rsvRoom = rsvRoom;
	}

	

	public String getRsvRoomAvailable() {
		return rsvRoomAvailable;
	}

	public void setRsvRoomAvailable(String rsvRoomAvailable) {
		this.rsvRoomAvailable = rsvRoomAvailable;
	}


	public String getRsvDateAvailable() {
		return rsvDateAvailable;
	}

	public void setRsvDateAvailable(String rsvDateAvailable) {
		this.rsvDateAvailable = rsvDateAvailable;
	}

	public String getRsvStartID() {
		return rsvStartID;
	}

	public void setRsvStartID(String rsvStartID) {
		this.rsvStartID = rsvStartID;
	}

	public String getRsvEndTime() {
		return rsvEndTime;
	}

	public void setRsvEndTime(String rsvEndTime) {
		this.rsvEndTime = rsvEndTime;
	}
	
	
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
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

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	}
