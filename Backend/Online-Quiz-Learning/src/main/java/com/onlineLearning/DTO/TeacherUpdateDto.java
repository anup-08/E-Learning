package com.onlineLearning.DTO;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TeacherUpdateDto {

    private String name;

    private String idNo;

    private String email;

    private String password;

    private String mobile;
}
