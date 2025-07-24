package com.onlineLearning.RefreshToken;

import com.onlineLearning.Repository.TeacherRefreshTokenRepo;
import com.onlineLearning.utility.JwtUtility;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.UUID;

@AllArgsConstructor
@Service
@Transactional
public class TeacherRTokenService {

    private final TeacherRefreshTokenRepo repo;

    public String generateRefreshToken(String teacherId) {
        repo.deleteByTeacherId(teacherId);

        String rToken = UUID.randomUUID().toString();

        TeacherRefreshToken refreshToken = new TeacherRefreshToken();
        refreshToken.setTeacherId(teacherId);
        refreshToken.setRefreshToken(rToken);
        refreshToken.setExpireTime(new Date(System.currentTimeMillis() + 5 * 24 * 60 * 60 * 1000));

        repo.save(refreshToken);
        return rToken;
    }

    public TeacherRefreshToken validate(String rToken){
        TeacherRefreshToken refreshToken = repo.findByRefreshToken(rToken).get();
        if (refreshToken.getExpireTime().before(new Date())) throw new IllegalArgumentException("Invalid or Token Expired");
        return refreshToken;
    }
}
