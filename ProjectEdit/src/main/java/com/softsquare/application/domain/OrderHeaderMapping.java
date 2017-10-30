package com.softsquare.application.domain;

import java.math.BigDecimal;
import java.util.Date;

import com.softsquare.application.domain.grid.GridRecord;

public class OrderHeaderMapping extends GridRecord {

	 private Integer hyOrdhId;
	 private Integer hyPeriodId;
	 private String hyOrdhName;
	 private BigDecimal hyOrdhToltalPrice;
	 private Date hyPeriodDate;
	 private String hyPeriodDateString;
	 private String hyPeriodName;
	 private BigDecimal hyPeriodPrice2;
	 private BigDecimal hyPeriodPrice3;
	public Integer getHyOrdhId() {
		return hyOrdhId;
	}
	public void setHyOrdhId(Integer hyOrdhId) {
		this.hyOrdhId = hyOrdhId;
	}
	public Integer getHyPeriodId() {
		return hyPeriodId;
	}
	public void setHyPeriodId(Integer hyPeriodId) {
		this.hyPeriodId = hyPeriodId;
	}
	public String getHyOrdhName() {
		return hyOrdhName;
	}
	public void setHyOrdhName(String hyOrdhName) {
		this.hyOrdhName = hyOrdhName;
	}
	public BigDecimal getHyOrdhToltalPrice() {
		return hyOrdhToltalPrice;
	}
	public void setHyOrdhToltalPrice(BigDecimal hyOrdhToltalPrice) {
		this.hyOrdhToltalPrice = hyOrdhToltalPrice;
	}
	public Date getHyPeriodDate() {
		return hyPeriodDate;
	}
	public void setHyPeriodDate(Date hyPeriodDate) {
		this.hyPeriodDate = hyPeriodDate;
	}
	public String getHyPeriodDateString() {
		return hyPeriodDateString;
	}
	public void setHyPeriodDateString(String hyPeriodDateString) {
		this.hyPeriodDateString = hyPeriodDateString;
	}
	public String getHyPeriodName() {
		return hyPeriodName;
	}
	public void setHyPeriodName(String hyPeriodName) {
		this.hyPeriodName = hyPeriodName;
	}
	public BigDecimal getHyPeriodPrice2() {
		return hyPeriodPrice2;
	}
	public void setHyPeriodPrice2(BigDecimal hyPeriodPrice2) {
		this.hyPeriodPrice2 = hyPeriodPrice2;
	}
	public BigDecimal getHyPeriodPrice3() {
		return hyPeriodPrice3;
	}
	public void setHyPeriodPrice3(BigDecimal hyPeriodPrice3) {
		this.hyPeriodPrice3 = hyPeriodPrice3;
	}
	 
}
