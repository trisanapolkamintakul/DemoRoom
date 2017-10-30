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
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotEmpty;

@Entity
@Table(name = "LOGIN")
public class Login extends BaseEntity implements Serializable{

	private static final long serialVersionUID = -117259679410559094L;

	@Id
	@GeneratedValue
	@Column(name = "LGID")
    private Integer id;
	
	@NotEmpty
	@Column(name = "LGUSERNAME", unique=true, nullable = false)
    private String username;
	
	@NotEmpty
	@Column(name = "LGPASSWORD", nullable = false)
    private String password;
    
	@NotNull 
	@Column(name = "LGROLEID", nullable = false)
    private Integer roleId;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "LGROLEID", referencedColumnName = "ROLEID", insertable=false, updatable=false)
    private Role role;
	
	@Column(name = "USFNAME")
	private String usfname;
	
	@Column(name = "USLNAME")
	private String uslname;
	
	@Column(name = "USEMAIL")
	private String usemail;
	
	@Column(name = "USPHONE")
	private String usphone;
	
	@Column(name = "USORGANIZATION")
	private String usorganization;
		
	@Column(name = "USADDRESS")
	private String usaddress;
	
	public String getUsfname() {
		return usfname;
	}

	public void setUsfname(String usfname) {
		this.usfname = usfname;
	}

	public String getUslname() {
		return uslname;
	}

	public void setUslname(String uslname) {
		this.uslname = uslname;
	}

	public String getUsemail() {
		return usemail;
	}

	public void setUsemail(String usemail) {
		this.usemail = usemail;
	}

	public String getUsphone() {
		return usphone;
	}

	public void setUsphone(String usphone) {
		this.usphone = usphone;
	}

	public String getUsorganization() {
		return usorganization;
	}

	public void setUsorganization(String usorganization) {
		this.usorganization = usorganization;
	}

	public String getUsaddress() {
		return usaddress;
	}

	public void setUsaddress(String usaddress) {
		this.usaddress = usaddress;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Integer getRoleId() {
		return roleId;
	}

	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

}