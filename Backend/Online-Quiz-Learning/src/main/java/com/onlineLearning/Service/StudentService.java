package com.onlineLearning.Service;

import com.onlineLearning.DTO.QuestionResponseDTO;
import com.onlineLearning.DTO.StudentUpdateDto;
import com.onlineLearning.Entity.QuestionBank;
import com.onlineLearning.Entity.Result;
import com.onlineLearning.Entity.Student;
import com.onlineLearning.Exception.UserAlreadyExist;
import com.onlineLearning.Exception.UserNotExist;
import com.onlineLearning.RefreshToken.StRefreshTokenService;
import com.onlineLearning.RefreshToken.StudentRefreshToken;
import com.onlineLearning.Repository.QuestionBankRepo;
import com.onlineLearning.Repository.ResultRepo;
import com.onlineLearning.Repository.StudentRepository;
import com.onlineLearning.utility.JwtUtility;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class StudentService {
    private final StudentRepository stdRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtility jwtUtility;
    private final StRefreshTokenService rService;
    private final QuestionBankRepo questionBankRepo;
    private final ResultRepo resultRepo;

    public void saveStudentDetails(String name , String enroll , String email , String pswd , String phone){
        if(stdRepo.findByEnrollment(enroll).isPresent()) throw new UserAlreadyExist("You are already register");
        Student student = new Student();
        student.setEmail(email);
        student.setName(name);
        student.setEnrollment(enroll);
        student.setRole("USER");
        student.setPhoneNo(phone);
        student.setPassword(passwordEncoder.encode(pswd));

        stdRepo.save(student);
    }

    public void updateUser(StudentUpdateDto student , String enroll ){

        Student st = stdRepo.findByEnrollment(enroll).get();

        if(student.getPhone_no() != null){
            st.setPhoneNo(student.getPhone_no());
        }
        if(student.getName() != null){
            st.setName(student.getName());
        }
        if(student.getIdNo() != null){
            st.setEnrollment(student.getIdNo());
        }
        if(student.getEmail() != null){
            st.setEmail(student.getEmail());
        }
        if(student.getPassword() != null){
            st.setPassword(passwordEncoder.encode(student.getPassword()));
        }

        stdRepo.save(st);
    }

    public Student getDetails(String enroll){
        return stdRepo.findByEnrollment(enroll).get();
    }


    public List<QuestionResponseDTO> getQuestionForExam(){
        List<QuestionBank> questions =  questionBankRepo.findAll();

        if(questions.isEmpty()) throw new IllegalArgumentException("No Exam is Live Currently...!!");

        List<QuestionResponseDTO> questionList = new ArrayList<>();

        for(QuestionBank q : questions){
            QuestionResponseDTO dto = new QuestionResponseDTO();
            dto.setQuestionId(q.getId());
            dto.setQuestionText(q.getQuestion());
            dto.setOption1(q.getOption1());
            dto.setOption2(q.getOption2());
            dto.setOption3(q.getOption3());
            dto.setOption4(q.getOption4());
            questionList.add(dto);
        }
        return questionList;
    }

    public int calculateScore(Map<Long , String> studentAnswer){
        int score = 0;

        for(Map.Entry<Long , String> entry : studentAnswer.entrySet()){
            QuestionBank question = questionBankRepo.findById(entry.getKey()).orElse(null);

            if(question != null && question.getAns().equalsIgnoreCase(entry.getValue())) {
                score++;
            }
        }
        return score;
    }

    public void saveResult(String enrollment , String examName , int score){
        Result result = new Result();
        result.setEnrollment(enrollment);
        result.setExamName(examName);
        result.setScore(score);

        resultRepo.save(result);
    }

    @Transactional
    public void submitExamForm(String enroll , String examName , Map<Long,String> studentAns){
        int score = calculateScore(studentAns);
        saveResult(enroll,examName,score);
    }

    public int score(String enroll){
       return resultRepo.findByEnrollment(enroll).get().getScore();
    }

    public boolean isGivenExam(String enroll){
        Result result =  resultRepo.findByEnrollment(enroll).orElse(null);
        if(result == null) return false;
        return true;
    }






    public String generateToken(String enroll){
        Student student = stdRepo.findByEnrollment(enroll).orElseThrow(()->new UserNotExist("User Doesn't Exist"));
        return jwtUtility.generateToken(enroll , List.of(student.getRole()));
    }

    public String generateRefreshToken(String enroll){
        return rService.generateStudentRefreshToken(enroll);
    }

    public String generateTokenFromRefreshToken(String rToken){
        StudentRefreshToken studentRefreshToken = rService.validateRToken(rToken);
        Student student = stdRepo.findByEnrollment(studentRefreshToken.getEnrollment()).get();
        return jwtUtility.generateToken(studentRefreshToken.getEnrollment() , List.of(student.getRole()));
    }
}
