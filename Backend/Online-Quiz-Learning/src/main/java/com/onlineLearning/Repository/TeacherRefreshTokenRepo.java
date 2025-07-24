package com.onlineLearning.Repository;

import com.onlineLearning.RefreshToken.TeacherRefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TeacherRefreshTokenRepo extends JpaRepository<TeacherRefreshToken ,Long> {
    Optional<TeacherRefreshToken> findByRefreshToken(String rToken);
    void deleteByTeacherId(String teacherId);
}
