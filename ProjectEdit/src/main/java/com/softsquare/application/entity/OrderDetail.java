package com.softsquare.application.entity;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotEmpty;

@Entity
@Table(name = "HYORDERDETAIL")
public class OrderDetail  implements Serializable{
	
	private static final long serialVersionUID = 1869318731287220258L;

	@Id
	@GeneratedValue
	@Column(name = "HYORDDID")
    private Integer hyOrddId;
	
	@NotNull
	@Column(name = "HYORDHID", nullable = false)
    private Integer hyOrdhId;
	
	@NotEmpty
	@Column(name = "HYORDDLOTTERY", nullable = false)
	public String hyOrddLottery;
	
	@Column(name = "HYORDDTOP")
    private BigDecimal hyOrddTop;
	
	@Column(name = "HYORDDREVERSE")
    private BigDecimal hyOrddReverse;

	@Column(name = "HYORDDUNDER")
    private BigDecimal hyOrddUnder;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hyOrdhId", referencedColumnName = "hyOrdhId", insertable=false, updatable=false)
    private OrderHeader orderHeader;

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

	public String getHyOrddLottery() {
		return hyOrddLottery;
	}

	public void setHyOrddLottery(String hyOrddLottery) {
		this.hyOrddLottery = hyOrddLottery;
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

	public OrderHeader getOrderHeader() {
		return orderHeader;
	}

	public void setOrderHeader(OrderHeader orderHeader) {
		this.orderHeader = orderHeader;
	}
	
}
