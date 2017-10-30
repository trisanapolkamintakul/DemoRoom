package com.softsquare.application.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.validator.constraints.NotEmpty;

@Entity
@Table(name = "ROLE")
public class Role  implements Serializable {
	
	private static final long serialVersionUID = 6019490232774665003L;

	@Id
    @GeneratedValue
    @Column(name = "ROLEID")
	private Integer roleId;
	
	@NotEmpty
	@Column(name = "ROLECODE", unique=true, nullable = false)
	private String roleCode;
	
	@Column(name = "ROLENAME", unique=true, nullable = false)
	private String roleName;

	public Integer getRoleId() {
		return roleId;
	}

	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}

	public String getRoleCode() {
		return roleCode;
	}

	public void setRoleCode(String roleCode) {
		this.roleCode = roleCode;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	
}
