package com.onlineLearning.Security;

import com.onlineLearning.Entity.Student;
import com.onlineLearning.Entity.Teacher;
import com.onlineLearning.Exception.UserNotExist;
import com.onlineLearning.Repository.StudentRepository;
import com.onlineLearning.Repository.TeacherRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class SecurityService implements UserDetailsService {
    private final StudentRepository repo;
    private final TeacherRepository repository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Student student = repo.findByEnrollment(username).orElse(null);
        if(student != null){
            return User.withUsername(student.getEnrollment()).password(student.getPassword()).roles(student.getRole()).build();
        }

        Teacher teacher = repository.findByTeacherId(username).orElse(null);
        if(teacher != null){
            return User.withUsername(teacher.getTeacherId()).password(teacher.getPassword()).roles(teacher.getRole()).build();
        }

        throw new UserNotExist("User Doesn't Exist");
    }
    
}
