package com.softsquare.application.common.util;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import com.softsquare.application.entity.CustomEmployee;

public class LoginUtils {
	
	private static UserDetails getUserDetails() {
		CustomEmployee userDetails = null;
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if(authentication != null) {
			if(authentication.getPrincipal() instanceof UserDetails) {
				userDetails = (CustomEmployee)authentication.getPrincipal();
			}
		}
		return userDetails;
	}
	
	public static String getUsername() {
		UserDetails userDetails = getUserDetails();
		if(userDetails != null) {
			return userDetails.getUsername();
		}
		return null;
	}
	
	public static String getPassword() {
		UserDetails userDetails = getUserDetails();
		if(userDetails != null) {
			return userDetails.getPassword();
		}
		return null;
	}
	
	public static String getRole() {
		UserDetails userDetails = getUserDetails();
		if(userDetails != null) {
			return userDetails.getAuthorities().toArray()[0].toString();
		}
		return null;
	}
	
}
