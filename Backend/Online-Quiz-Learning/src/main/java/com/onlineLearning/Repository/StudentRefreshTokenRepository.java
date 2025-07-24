package com.onlineLearning.Repository;

import com.onlineLearning.RefreshToken.StudentRefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRefreshTokenRepository extends JpaRepository<StudentRefreshToken , Long> {

    Optional<StudentRefreshToken> findByRefreshToken(String refreshToken);
    void deleteByEnrollment(String enroll);
}
