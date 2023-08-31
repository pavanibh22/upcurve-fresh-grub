package com.example.demo.jwt;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.example.demo.jwt.JwtTokenFilter;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;

@Configuration
public class FilterConfig {
	
	

	@Bean
    public FilterRegistrationBean<JwtTokenFilter> jwtFilter() {
        FilterRegistrationBean<JwtTokenFilter> filter= new FilterRegistrationBean();
        filter.setFilter(new JwtTokenFilter());
        // provide endpoints which needs to be restricted.
        // All Endpoints would be restricted if unspecified
       filter.addUrlPatterns("/api/v1/blog/");
       filter.addUrlPatterns("/foodStall/**");
       filter.addUrlPatterns("/cart/**");
       filter.addUrlPatterns("/menu/**");
       return filter;
    }
}
