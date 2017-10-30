package com.softsquare.application.aspect;

import java.util.Calendar;
import java.util.Date;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

import com.softsquare.application.entity.BaseEntity;

@Aspect
@Component
public class BaseEntityAspect {

	@Pointcut("execution (* com.softsquare.application.service..*save*(..))")
    private void executePersistPointCut() {
    }
	
	@Before("executePersistPointCut()")
    public void beforePersistData(JoinPoint joinPoint) throws Exception {
		
        // Fixme 
        String userName = "ADMIN";//AuthorizeUtil.getUserName();
        Date today = Calendar.getInstance().getTime();
        
    	for(int index = 0; index < joinPoint.getArgs().length; index++){
    		if (joinPoint.getArgs()[index] instanceof BaseEntity){
    			BaseEntity entity = (BaseEntity) joinPoint.getArgs()[index];
    			entity.setCreateUser(userName);
    	        entity.setCreateDate(today);
    	        entity.setUpdateUser(userName);
    	        entity.setUpdateDate(today);
    	        joinPoint.getArgs()[index] = entity;
        	}
        }
    }
	
	
}
