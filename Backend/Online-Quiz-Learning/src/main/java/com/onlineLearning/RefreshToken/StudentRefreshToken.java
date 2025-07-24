package com.onlineLearning.RefreshToken;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "student_refresh_table")
public class StudentRefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String enrollment;

    @Column(name = "refresh_token")
    private String refreshToken;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "token_date")
    private Date expireDate;
}
