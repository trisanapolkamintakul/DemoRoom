package com.softsquare.application.entity;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "ROOM_TYPE")
public class RoomType extends BaseEntity implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 3243145478200240487L;

	@Id
	@GeneratedValue
	@Column(name = "RTID")
    private Integer RTID;
	
	@Column(name = "RTNAME")
    private String RTNAME;

	public Integer getRTID() {
		return RTID;
	}

	public void setRTID(Integer rTID) {
		RTID = rTID;
	}

	public String getRTNAME() {
		return RTNAME;
	}

	public void setRTNAME(String rTNAME) {
		RTNAME = rTNAME;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
