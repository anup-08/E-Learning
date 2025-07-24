package com.onlineLearning.utility;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.List;

@Component
public class JwtUtility {

    @Value("${jwt.secret}")
    private String secretKey ;

    public SecretKey getSignin(){
        return Keys.hmacShaKeyFor(secretKey.getBytes());
    }

    public String generateToken(String userName, List<String> roles){
        return Jwts.builder()
                .setSubject(userName)
                .claim("role" , roles)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+ 2*60*1000))
                .signWith(getSignin())
                .compact();
    }

    public Claims extractClaims(String token){
        JwtParser parser = Jwts.parser().setSigningKey(getSignin()).build();
        Jws<Claims> claimsJwt = parser.parseClaimsJws(token);
        return  claimsJwt.getBody();
    }

    public String extractUserName(String token){
        return extractClaims(token).getSubject();
    }

    public List<String> extractRoles(String token){
        return (List<String>) extractClaims(token).get("role");
    }

    public boolean isExpired(String token){
        return (extractClaims(token).getExpiration().before(new Date()));
        // If token is expired it will true....
    }

    public boolean validateToken(String token , String userName){
        return extractUserName(token).equals(userName) && !isExpired(token);
    }
}
