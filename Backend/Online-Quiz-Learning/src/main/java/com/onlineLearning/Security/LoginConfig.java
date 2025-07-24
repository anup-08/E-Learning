package com.onlineLearning.Security;

import com.onlineLearning.JwtException.AccessDeniedEntryPoint;
import com.onlineLearning.JwtException.AuthEntryPoint;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@AllArgsConstructor
public class LoginConfig {
    private final JwtFilterChain jwtFilterChain;
    private final AccessDeniedEntryPoint accessDeniedEntryPoint;
    private final AuthEntryPoint authEntryPoint;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests((response) -> {
                    response.requestMatchers("/student/getDetail" , "/student/update" , "/student/getQuestions" ,"/student/submit" ,"/student/getResult" , "/student/isGivenExam").hasRole("USER")
                    .requestMatchers("/teacher/getDetail","/teacher/getStudentDetails" , "/teacher/update" ,"/teacher/getAllResult" ,"/teacher/getResult" ,"/teacher/addQuestion",
                        "/teacher/getDetailOfStudent" , "/teacher/removeQuestion" , "/teacher/getAllQuestion").hasRole("TEACHER")
                    .requestMatchers("/home" , "/contact" ,"/about" ,"/student/**" ,"/teacher/**" ).permitAll();
        }).exceptionHandling((ex) ->
                ex.accessDeniedHandler(accessDeniedEntryPoint).authenticationEntryPoint(authEntryPoint));

        http.csrf((csrf) -> csrf.disable());

        http.sessionManagement((session) -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        http.addFilterBefore(jwtFilterChain , UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173"));
        configuration.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    PasswordEncoder passwordEncoder(){
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
