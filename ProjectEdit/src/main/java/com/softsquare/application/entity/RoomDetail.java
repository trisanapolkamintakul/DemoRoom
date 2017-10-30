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
@Table(name = "ROOM")
public class RoomDetail extends BaseEntity implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 3243145478200240487L;

	@Id
	@GeneratedValue
	@Column(name = "RMID")
    private Integer id;
	
	//@Column(name = "UDLOGINNAME", unique=true, nullable = false)
   // private String udloginName;
	
	@Column(name = "RMCode")
    private String rmCode;
	
	@Column(name = "RMType")
    private String rmType;
	
	@Column(name = "RMName")
    private String rmName;
	
	@Column(name = "RMDetail")
    private String rmDetail;
	
	@Column(name = "RMLocation")
    private String rmLocation;
	
	@Column(name = "RMAmountAttend")
    private String rmAmount;
	
	@Column(name = "RMActive")
    private Integer rmActive;
	
	
	public Integer getId() {
		return id;
	}



	public void setId(Integer id) {
		this.id = id;
	}



	public String getRmCode() {
		return rmCode;
	}



	public void setRmCode(String rmCode) {
		this.rmCode = rmCode;
	}



	public String getRmType() {
		return rmType;
	}



	public void setRmType(String rmType) {
		this.rmType = rmType;
	}



	public String getRmName() {
		return rmName;
	}



	public void setRmName(String rmName) {
		this.rmName = rmName;
	}



	public String getRmDetail() {
		return rmDetail;
	}



	public void setRmDetail(String rmDetail) {
		this.rmDetail = rmDetail;
	}



	public String getRmLocation() {
		return rmLocation;
	}



	public void setRmLocation(String rmLocation) {
		this.rmLocation = rmLocation;
	}



	public String getRmAmount() {
		return rmAmount;
	}



	public void setRmAmount(String rmAmount) {
		this.rmAmount = rmAmount;
	}



	public Integer getRmActive() {
		return rmActive;
	}



	public void setRmActive(Integer rmActive) {
		this.rmActive = rmActive;
	}



	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	}


		

