package com.onlineLearning.Repository;

import com.onlineLearning.Entity.Result;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ResultRepo extends JpaRepository<Result,Long> {
    Optional<Result> findByEnrollment(String enroll);
}
