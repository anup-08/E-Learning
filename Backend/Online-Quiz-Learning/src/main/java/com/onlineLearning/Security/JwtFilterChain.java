package com.onlineLearning.Security;

import com.onlineLearning.utility.JwtUtility;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
@AllArgsConstructor
public class JwtFilterChain extends OncePerRequestFilter {
    private final JwtUtility jwtUtility;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        //for bypassing the register or login
        String uri = request.getRequestURI();

        if (uri.startsWith("/student/register") || uri.startsWith("/student/login") || uri.startsWith("/student/getToken") || uri.startsWith("/home") || uri.startsWith("/contact") || uri.startsWith("/about")) {
            filterChain.doFilter(request, response);
            return;
        }


        String userName = null;
        String token = null;

        String authorizationHeader = request.getHeader("Authorization");

        if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")){
            token = authorizationHeader.substring(7);
            userName = jwtUtility.extractUserName(token);
        }

        if(userName != null && SecurityContextHolder.getContext().getAuthentication() == null){
            if(jwtUtility.validateToken(token, userName)){

                List<String> roles = jwtUtility.extractRoles(token);
                List<SimpleGrantedAuthority> gAuth = roles.stream().map((role)-> new SimpleGrantedAuthority("ROLE_"+role)).toList();

                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userName, null , gAuth);
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request,response);
    }
}
