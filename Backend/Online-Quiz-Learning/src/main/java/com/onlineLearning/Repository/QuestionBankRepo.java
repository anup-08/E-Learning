package com.onlineLearning.Repository;

import com.onlineLearning.Entity.QuestionBank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuestionBankRepo extends JpaRepository<QuestionBank,Long> {

}

