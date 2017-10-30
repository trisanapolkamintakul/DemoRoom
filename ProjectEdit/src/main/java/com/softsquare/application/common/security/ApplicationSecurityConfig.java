package com.softsquare.application.common.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.servlet.configuration.EnableWebMvcSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@EnableWebMvcSecurity
@EnableGlobalMethodSecurity(securedEnabled = true)
public class ApplicationSecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	CustomUserDetailsService customUserDetailsService;
	
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
        	.csrf().disable()
        	.authorizeRequests()
        	.antMatchers("/", "/login.html").permitAll()
        	.antMatchers("/**/*.js").permitAll()
        	.antMatchers("/**/*.jsp").permitAll()
        	.antMatchers("/**/*.css").permitAll()
        	.antMatchers("/**/*.ico").permitAll()
        	.antMatchers("/**/*.jpg").permitAll()
        	.antMatchers("/**/*.png").permitAll()
        	.antMatchers("/**/*.gif").permitAll()
        	.antMatchers("/**/*.html").permitAll()
        	.antMatchers("/**/*.ttf").permitAll()
        	.antMatchers("/images/**").permitAll()
        	.antMatchers("/webjars/**").permitAll()
        	.antMatchers("/webapp/**").permitAll()
            .anyRequest().fullyAuthenticated().and()
            .formLogin().loginPage("/login.html")
            .defaultSuccessUrl("/home.html")
            .failureUrl("/loginfail.html")
            .permitAll().and()
        	.logout().logoutUrl("/logout.html").deleteCookies("remember-me").logoutSuccessUrl("/logout.html?logout").permitAll()
        	.and().rememberMe();
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
    	auth.userDetailsService(customUserDetailsService).passwordEncoder(new BCryptPasswordEncoder());
    }
    
}