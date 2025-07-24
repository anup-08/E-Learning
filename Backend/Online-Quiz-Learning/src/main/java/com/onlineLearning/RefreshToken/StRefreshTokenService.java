package com.onlineLearning.RefreshToken;

import com.onlineLearning.Repository.StudentRefreshTokenRepository;
import com.onlineLearning.utility.JwtUtility;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.UUID;

@Service
@AllArgsConstructor
@Transactional
public class StRefreshTokenService {
    private final StudentRefreshTokenRepository studentRefreshTokenRepository;
    private final JwtUtility jwtUtility;

    public String generateStudentRefreshToken(String enroll){
        studentRefreshTokenRepository.deleteByEnrollment(enroll);

        String rToken = UUID.randomUUID().toString();

        StudentRefreshToken studentRefreshToken = new StudentRefreshToken();
        studentRefreshToken.setRefreshToken(rToken);
        studentRefreshToken.setEnrollment(enroll);
        studentRefreshToken.setExpireDate(new Date(System.currentTimeMillis()+5*24*60*60*1000));

        studentRefreshTokenRepository.save(studentRefreshToken);
        return rToken;
    }

    public StudentRefreshToken validateRToken(String rToken){
        StudentRefreshToken studentRefreshToken = studentRefreshTokenRepository.findByRefreshToken(rToken).orElseThrow(()->new IllegalArgumentException("Re-Login missing or Invalid token"));

        if(studentRefreshToken.getExpireDate().before(new Date())){
            throw  new IllegalArgumentException("Refresh Token Expired");
        }
        return studentRefreshToken;
    }
}
