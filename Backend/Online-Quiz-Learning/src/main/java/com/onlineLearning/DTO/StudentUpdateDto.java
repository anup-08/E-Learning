package com.onlineLearning.DTO;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class StudentUpdateDto {
    private String name;
    private String idNo;
    private String phone_no;
    private String email;
    private String password;
}
