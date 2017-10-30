package com.softsquare.application.common.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.softsquare.application.domain.LoginMapping;
import com.softsquare.application.entity.CustomEmployee;
import com.softsquare.application.service.LoginService;

@Component
public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	LoginService loginService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    	LoginMapping login = loginService.getUser(username);
    	if(login == null){
    		new UsernameNotFoundException(String.format("User with email=%s was not found", username));
    	}
        return new CustomEmployee(login);
    }

}
