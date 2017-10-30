package com.softsquare.application.common.base;

import org.springframework.beans.factory.config.MethodInvokingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

import com.softsquare.application.aspect.BaseEntityAspect;
import com.softsquare.application.common.util.DateUtils;
import com.softsquare.application.common.util.configurer.DateUtilsConfigurer;
import com.softsquare.application.dao.RoleDao;
import com.softsquare.application.dao.RoleDaolmp;
 
@Configuration
@EnableAspectJAutoProxy
public class AppConfig {
	
//	@Bean
//	public MessageSource messageSource() {
//	    ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
//	    messageSource.setBasename("messages");
//	    return messageSource;
//	}
	
	public AppConfig() {
		setDateUtilsConfigurer();
	}
	
	private void setDateUtilsConfigurer(){
		MethodInvokingBean mBean = new MethodInvokingBean();
		DateUtilsConfigurer dateUtilsConfigurer = new DateUtilsConfigurer();
		mBean.setTargetClass(DateUtils.class);
		mBean.setTargetMethod("setDateUtilsConfigurer");
		Object[] args = new Object[] {dateUtilsConfigurer};
		mBean.setArguments(args);
		try {
			mBean.prepare();
			mBean.invoke();
		} catch (Exception e) {
			e.printStackTrace();
		}	
	}

	@Bean
	public BaseEntityAspect loggingAspect(){
		return new BaseEntityAspect();
	}
	
//	@Bean
//	public LoginDao LoginDao(){
//		return new LoginDaoImp();
//	}
	
	@Bean
	public RoleDao RoleDao(){
		return new RoleDaolmp();
	}
	
	
}
