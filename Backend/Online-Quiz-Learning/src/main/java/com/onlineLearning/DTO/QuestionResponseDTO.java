package com.onlineLearning.DTO;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class QuestionResponseDTO {
    //private int displayNumber;
    private Long questionId;
    private String questionText;
    private String option1;
    private String option2;
    private String option3;
    private String option4;
}


