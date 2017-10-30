package com.softsquare.application.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "HYPERIOD")
public class Period implements Serializable{
	
	private static final long serialVersionUID = 4176091912641392349L;

	@Id
	@GeneratedValue
	@Column(name = "HYPERIODID")
    private Integer hyPeriodId;
	
	@NotEmpty
	@Column(name = "HYPERIODNAME", nullable = false)
    private String hyPeriodName;
	
	@NotNull
	@Column(name = "HYPERIODDATE", unique=true, nullable = false)
	public Date hyPeriodDate;
	
	@Column(name = "HYPERIODPRICE2")
    private BigDecimal hyPeriodPrice2;
	
	@Column(name = "HYPERIODPRICE3")
    private BigDecimal hyPeriodPrice3;

	public Integer getHyPeriodId() {
		return hyPeriodId;
	}

	public void setHyPeriodId(Integer hyPeriodId) {
		this.hyPeriodId = hyPeriodId;
	}

	public String getHyPeriodName() {
		return hyPeriodName;
	}

	public void setHyPeriodName(String hyPeriodName) {
		this.hyPeriodName = hyPeriodName;
	}

	public Date getHyPeriodDate() {
		return hyPeriodDate;
	}

	public void setHyPeriodDate(Date hyPeriodDate) {
		this.hyPeriodDate = hyPeriodDate;
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
