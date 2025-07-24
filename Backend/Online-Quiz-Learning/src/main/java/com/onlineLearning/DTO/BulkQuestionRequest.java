package com.onlineLearning.DTO;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class BulkQuestionRequest {
    @NotNull(message = "Exam Name is required..!")
    private String examName;
    private List<QuestionDTO> questions;

}
