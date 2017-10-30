package com.softsquare.application.dao;

import java.io.Serializable;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.ParameterizedType;
import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Projections;
import org.springframework.beans.factory.annotation.Autowired;

import com.softsquare.application.common.util.BeanUtils;
import com.softsquare.application.common.util.LoginUtils;
import com.softsquare.application.entity.Period;

@Transactional
public abstract class AbstractDao <PK extends Serializable, T>{
 
	private final Class<T> persistentClass;
	private final String saveMode = "save";
	private final String updateMode = "update";
    @Autowired
    private SessionFactory sessionFactory;
 
    @SuppressWarnings("unchecked")
    protected AbstractDao(){
		this.persistentClass =(Class<T>) ((ParameterizedType) this.getClass().getGenericSuperclass()).getActualTypeArguments()[1];
	}
	
    protected Session getSession() {
        return sessionFactory.getCurrentSession();
    }
 
    @SuppressWarnings("unchecked")
    protected T getByKey(PK key) {
		return (T) getSession().get(persistentClass, key);
	}
    
    protected void save(Object entity) throws NoSuchMethodException, SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException {
        getSession().save(setBaseEntity(entity, saveMode));
    }
    
    protected void delete(Object entity) {
        getSession().delete(entity);
    }
    
    protected Criteria createEntityCriteria(){
		return getSession().createCriteria(persistentClass);
	}
    
    protected void merge(Object entity) throws NoSuchMethodException, SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException{
    	getSession().merge(setBaseEntity(entity, updateMode));
    }
    
    private Object setBaseEntity(Object entity, String mode) throws NoSuchMethodException, SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException{
    	try{
    		Method createUser = entity.getClass().getMethod("setCreateUser", new Class[] { String.class });
        	Method updateUser = entity.getClass().getMethod("setUpdateUser", new Class[] { String.class });
        	Method createDate = entity.getClass().getMethod("setCreateDate", new Class[] { Date.class });
        	Method updateDate = entity.getClass().getMethod("setUpdateDate", new Class[] { Date.class });
        	if(BeanUtils.isNotNull(createUser) && BeanUtils.isNotNull(updateUser)
        			&& BeanUtils.isNotNull(createDate) && BeanUtils.isNotNull(updateDate)){
        		if(mode.equals(saveMode)){
        			createUser.invoke(entity, LoginUtils.getUsername());
            		updateUser.invoke(entity, LoginUtils.getUsername());
            		createDate.invoke(entity, new Date());
            		updateDate.invoke(entity, new Date());
        		}else if(mode.equals(updateMode)){
        			updateUser.invoke(entity, LoginUtils.getUsername());
        			updateDate.invoke(entity, new Date());
        		}
        	}
    	}catch(Exception e){
    		return entity;
    	}
    	return entity;
    }
    public List<?> createCriteriaList(DetachedCriteria detachedCriteria) {
        Session session = getSession();
        Criteria criteria = detachedCriteria.getExecutableCriteria(session);
           return criteria.list();
       }
    
}