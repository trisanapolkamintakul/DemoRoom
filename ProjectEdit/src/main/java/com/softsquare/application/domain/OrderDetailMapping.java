package com.softsquare.application.domain;

import java.math.BigDecimal;

import com.softsquare.application.domain.grid.GridRecord;

public class OrderDetailMapping extends GridRecord {

	//Order Dtail
	private Integer hyOrddId;
	private Integer hyOrdhId;
	public Integer hyPeriodDate;
	private BigDecimal hyOrddTop;
	private BigDecimal hyOrddReverse;
	private BigDecimal hyOrddUnder;
	private BigDecimal hyOrddTopSum;
	private BigDecimal hyOrddReverseSum;
	private BigDecimal hyOrddUnderSum;
	
	public Integer getHyOrddId() {
		return hyOrddId;
	}
	public void setHyOrddId(Integer hyOrddId) {
		this.hyOrddId = hyOrddId;
	}
	public Integer getHyOrdhId() {
		return hyOrdhId;
	}
	public void setHyOrdhId(Integer hyOrdhId) {
		this.hyOrdhId = hyOrdhId;
	}
	public Integer getHyPeriodDate() {
		return hyPeriodDate;
	}
	public void setHyPeriodDate(Integer hyPeriodDate) {
		this.hyPeriodDate = hyPeriodDate;
	}
	public BigDecimal getHyOrddTop() {
		return hyOrddTop;
	}
	public void setHyOrddTop(BigDecimal hyOrddTop) {
		this.hyOrddTop = hyOrddTop;
	}
	public BigDecimal getHyOrddReverse() {
		return hyOrddReverse;
	}
	public void setHyOrddReverse(BigDecimal hyOrddReverse) {
		this.hyOrddReverse = hyOrddReverse;
	}
	public BigDecimal getHyOrddUnder() {
		return hyOrddUnder;
	}
	public void setHyOrddUnder(BigDecimal hyOrddUnder) {
		this.hyOrddUnder = hyOrddUnder;
	}
	public BigDecimal getHyOrddTopSum() {
		return hyOrddTopSum;
	}
	public void setHyOrddTopSum(BigDecimal hyOrddTopSum) {
		this.hyOrddTopSum = hyOrddTopSum;
	}
	public BigDecimal getHyOrddReverseSum() {
		return hyOrddReverseSum;
	}
	public void setHyOrddReverseSum(BigDecimal hyOrddReverseSum) {
		this.hyOrddReverseSum = hyOrddReverseSum;
	}
	public BigDecimal getHyOrddUnderSum() {
		return hyOrddUnderSum;
	}
	public void setHyOrddUnderSum(BigDecimal hyOrddUnderSum) {
		this.hyOrddUnderSum = hyOrddUnderSum;
	}
	
}
