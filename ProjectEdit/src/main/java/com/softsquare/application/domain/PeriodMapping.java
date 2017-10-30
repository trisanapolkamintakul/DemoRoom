package com.softsquare.application.domain;

import java.math.BigDecimal;
import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.softsquare.application.domain.grid.GridRecord;


public class PeriodMapping extends GridRecord {
	
	private Integer periodId;
	private String periodName;
	@DateTimeFormat(pattern = "dd/MM/yyyy")
	private Date periodDate;
	private BigDecimal periodPrice2Digit;
	private BigDecimal periodPrice3Digit;
	
	public Integer getPeriodId() {
		return periodId;
	}
	public void setPeriodId(Integer periodId) {
		this.periodId = periodId;
	}
	public String getPeriodName() {
		return periodName;
	}
	public void setPeriodName(String periodName) {
		this.periodName = periodName;
	}
	public Date getPeriodDate() {
		return periodDate;
	}
	public void setPeriodDate(Date periodDate) {
		this.periodDate = periodDate;
	}
	public BigDecimal getPeriodPrice2Digit() {
		return periodPrice2Digit;
	}
	public void setPeriodPrice2Digit(BigDecimal periodPrice2Digit) {
		this.periodPrice2Digit = periodPrice2Digit;
	}
	public BigDecimal getPeriodPrice3Digit() {
		return periodPrice3Digit;
	}
	public void setPeriodPrice3Digit(BigDecimal periodPrice3Digit) {
		this.periodPrice3Digit = periodPrice3Digit;
	}
	
}
