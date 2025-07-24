package com.onlineLearning.DTO;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class TeacherDTO {
    @NotNull(message = "Name field is required")
    @Column(name = "name")
    private String name;

    @NotNull(message = "Teacher-Id field is required")
    @Size(max = 10 , min = 2 , message = "Enter the valid Id")
    private String idNo;


    @NotNull(message = "Email is required")
    @Pattern(regexp = "^[A-Za-z0-9._%+-]+@gmail\\.com$", message = "Email must be a valid Gmail address")
    private String email;


    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters long")
    @Pattern(regexp = "^[a-zA-Z0-9]+$", message = "Password must be alphanumeric")
    private String password;

    @Column(name = "phone_no")
    @Size(min = 10 , max = 10 , message = "Enter a valid Phone no.")
    private String phoneNo;

}
