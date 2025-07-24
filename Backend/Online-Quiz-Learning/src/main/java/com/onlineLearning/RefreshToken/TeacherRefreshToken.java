package com.onlineLearning.RefreshToken;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "teacher_refresh_token")
public class TeacherRefreshToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "teacher_id")
    private String teacherId;

    @Column(name = "refresh_token")
    private String refreshToken;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "expire_time")
    private Date expireTime;
}
