package com.softsquare.application.entity;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotEmpty;

@Entity
@Table(name = "HYORDERHEADER")
public class OrderHeader  implements Serializable{
	
	private static final long serialVersionUID = 4077780046586546592L;

	@Id
	@GeneratedValue
	@Column(name = "HYORDHID")
    private Integer hyOrdhId;
	
	@NotNull
	@Column(name = "HYPERIODID", nullable = false)
    private Integer hyPeriodId;
	
	@NotEmpty
	@Column(name = "HYORDHNAME", nullable = false)
	public String hyOrdhName;
	
	@Column(name = "HYORDHTOTALPRICE")
    private BigDecimal HyOrdhToltalPrice;
	
	@OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hyPeriodId", referencedColumnName = "hyPeriodId", insertable=false, updatable=false)
    private Period period;

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
		return HyOrdhToltalPrice;
	}

	public void setHyOrdhToltalPrice(BigDecimal hyOrdhToltalPrice) {
		HyOrdhToltalPrice = hyOrdhToltalPrice;
	}

	public Period getPeriod() {
		return period;
	}

	public void setPeriod(Period period) {
		this.period = period;
	}

}
