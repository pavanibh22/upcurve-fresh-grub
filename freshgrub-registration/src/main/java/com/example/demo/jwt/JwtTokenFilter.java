package com.example.demo.jwt;

import java.io.IOException;
import java.util.Enumeration;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.web.filter.GenericFilterBean;
import org.springframework.web.filter.OncePerRequestFilter;
import com.example.demo.entities.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


@Component
public class JwtTokenFilter extends OncePerRequestFilter {
	@Autowired
	private JwtTokenUtil jwtUtil;

//	private void setAuthenticationContext(String token, HttpServletRequest request) {
//		UserDetails userDetails = getUserDetails(token);
//
//		UsernamePasswordAuthenticationToken 
//			authentication = new UsernamePasswordAuthenticationToken(userDetails, null, null);
//
//		authentication.setDetails(
//				new WebAuthenticationDetailsSource().buildDetails(request));
//
//		SecurityContextHolder.getContext().setAuthentication(authentication);
//	}

//	private UserDetails getUserDetails(String token) {
//		User userDetails = new User();
//		String[] jwtSubject = jwtUtil.getSubject(token).split(",");
//
////		userDetails.setId(Integer.parseInt(jwtSubject[0]));
////		userDetails.setEmail(jwtSubject[1]);
//
//		return userDetails;
//	}

//	@Override
//	public void doFilter(ServletRequest request, ServletResponse response, jakarta.servlet.FilterChain chain)
//			throws IOException, jakarta.servlet.ServletException {
//		// TODO Auto-generated method stub
////		if (!hasAuthorizationBearer(request)) {
////			filterChain.doFilter(request, response);
////			return;
////		}
////
////		String token = getAccessToken(request);
////
////		if (!jwtUtil.validateAccessToken(token)) {
////			filterChain.doFilter(request, response);
////			return;
////		}
////
////		setAuthenticationContext(token, request);
////		filterChain.doFilter(request, response);
//		 final HttpServletRequest httpRequest = (HttpServletRequest) request;
//         final HttpServletResponse httpResponse = (HttpServletResponse) response;
//         final String authHeader = httpRequest.getHeader("authorization");
//         if ("OPTIONS".equals(httpRequest.getMethod())) {
//             httpResponse.setStatus(HttpServletResponse.SC_OK);
//             chain.doFilter(request, response);
//         } else {
//             if(authHeader == null || !authHeader.startsWith("Bearer ")){
//                 throw new ServletException("An exception occurred");
//             }  
//         }
//         final String token = authHeader.substring(7);
//         System.out.println("token: " + token);
//         Claims claims = Jwts.parser().setSigningKey("secret").parseClaimsJws(token).getBody();
//         httpRequest.setAttribute("claims", claims);
////         httpRequest.setAttribute("blog", request.getParameter("id"));
//         chain.doFilter(request, response);
//		
//	}
	
	@Override
	protected boolean shouldNotFilter(HttpServletRequest request)
			  throws ServletException {
			    String path = request.getRequestURI();
			    System.out.println("path: " + path);
			    
			    Pattern pattern = Pattern.compile("/api/v1/users/", Pattern.CASE_INSENSITIVE);
			    Matcher matcher = pattern.matcher(path);
			    
			    return matcher.find();
			}

@Override
protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
		throws ServletException, IOException {
	// TODO Auto-generated method stub
//	 final HttpServletRequest httpRequest = (HttpServletRequest) request;
//     final HttpServletResponse httpResponse = (HttpServletResponse) response;
	Enumeration<String> headerNames = request.getHeaderNames();

    if (headerNames != null) {
            while (headerNames.hasMoreElements()) {
                    System.out.println("Header: " + request.getHeader(headerNames.nextElement()));
            }
    } 
	final String authHeader = request.getHeader("authorization");
     if ("OPTIONS".equals(request.getMethod())) {
    	 System.out.println("coming here: ");
         response.setStatus(HttpServletResponse.SC_OK);
         chain.doFilter(request, response);
     } else {
         if(authHeader == null || !authHeader.startsWith("Bearer ")){
             throw new ServletException("An exception occurred");
         }  
     }
     final String token = authHeader.substring(7);
     System.out.println("token: " + token);
     Claims claims = Jwts.parser().setSigningKey("TARGET").parseClaimsJws(token).getBody();
     request.setAttribute("claims", claims);
//     httpRequest.setAttribute("blog", request.getParameter("id"));
     chain.doFilter(request, response);
}
}
