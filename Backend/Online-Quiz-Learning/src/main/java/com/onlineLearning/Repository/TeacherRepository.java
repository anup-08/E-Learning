package com.onlineLearning.Repository;

import com.onlineLearning.Entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher,Long> {
    Optional<Teacher> findByTeacherId(String teacherId);
}
