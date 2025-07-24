package com.onlineLearning.DTO;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class QuestionDTO {
    @NotNull(message = "Question field can't be empty..!")
    private String question;
    @NotNull(message = "At least you have to give 2 option")
    private String option1;
    @NotNull(message = "Options field cant be Empty..!")
    private String option2;

    private String option3;
    private String option4;

    @NotNull(message = "Answer field cant be Empty...!")
    private String ans;
}
