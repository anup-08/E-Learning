package com.onlineLearning.Repository;

import com.onlineLearning.Entity.Exam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ExamRepo extends JpaRepository<Exam, Long> {

    Optional<Exam> findByExamNameAndTeacherId(String examName , String teacherId);
}
