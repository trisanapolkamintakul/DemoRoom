package com.softsquare.application.common.tiles;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.UrlBasedViewResolver;
import org.springframework.web.servlet.view.tiles3.SpringBeanPreparerFactory;
import org.springframework.web.servlet.view.tiles3.TilesConfigurer;
import org.springframework.web.servlet.view.tiles3.TilesView;

@Configuration
//@EnableWebMvc
public class TilesConfiguration extends WebMvcConfigurerAdapter {

//	@Bean
//    public ViewResolver getViewResolver(){
//	 System.out.println("----------------------------------------------ViewResolver--------------------------------------------------------");
//        InternalResourceViewResolver resolver = new InternalResourceViewResolver();
//        resolver.setPrefix("/WEB-INF/tiles/jsp/");
//        resolver.setSuffix(".jsp");
//        resolver.setOrder(1);
//        return resolver;
//    }
 
 @Bean
 public TilesConfigurer tilesConfigurer(){
        TilesConfigurer tilesConfigurer = new TilesConfigurer();
        String[] defs = {"/WEB-INF/ss-tiles.xml"
        		, "/WEB-INF/base-tiles.xml"};
        tilesConfigurer.setDefinitions(defs);
        tilesConfigurer.setCheckRefresh(true);
        tilesConfigurer.setPreparerFactoryClass(SpringBeanPreparerFactory.class);
        return tilesConfigurer;
    }

 @Bean
 public UrlBasedViewResolver viewResolver() {
     UrlBasedViewResolver viewResolver = new UrlBasedViewResolver();
     viewResolver.setViewClass(TilesView.class);
     viewResolver.setOrder(0);
     return viewResolver;
 }

 @Override
    public void configureDefaultServletHandling(
            DefaultServletHandlerConfigurer configurer) {
        configurer.enable();
    }  
 
}
