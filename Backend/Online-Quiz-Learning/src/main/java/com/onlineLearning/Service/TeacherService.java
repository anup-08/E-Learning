package com.onlineLearning.Service;

import com.onlineLearning.DTO.QuestionDTO;
import com.onlineLearning.DTO.TeacherUpdateDto;
import com.onlineLearning.Entity.*;
import com.onlineLearning.Exception.UserAlreadyExist;
import com.onlineLearning.Exception.UserNotExist;
import com.onlineLearning.RefreshToken.TeacherRTokenService;
import com.onlineLearning.RefreshToken.TeacherRefreshToken;
import com.onlineLearning.Repository.*;
import com.onlineLearning.utility.JwtUtility;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class TeacherService {

    private final TeacherRepository teacherRepo ;
    private final StudentRepository studentRepo ;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtility jwtUtility;
    private final TeacherRTokenService teacherRTokenService;
    private final ExamRepo examRepo;
    private final QuestionBankRepo questionBankRepo;
    private final ResultRepo resultRepo;


    public void saveDetails(String name , String password ,String email , String teacherId,String mobile){
        if(teacherRepo.findByTeacherId(teacherId).isPresent()) throw new UserAlreadyExist("Already register with this Id -"+teacherId);

        Teacher teacher = new Teacher();
        teacher.setTeacherId(teacherId);
        teacher.setEmail(email);
        teacher.setRole("TEACHER");
        teacher.setName(name);
        teacher.setPassword(passwordEncoder.encode(password));
        teacher.setMobile(mobile);

        teacherRepo.save(teacher);
    }

    public List<Student> getAllStudentDetails(){
        return studentRepo.findAll();
    }

    public void updateDetails(TeacherUpdateDto updateDto , String teacherId){
        Teacher teacher = teacherRepo.findByTeacherId(teacherId).get();

        if(updateDto.getName() != null){
            teacher.setName(updateDto.getName());
        }
        if(updateDto.getIdNo() != null){
            teacher.setTeacherId(updateDto.getIdNo());
        }
        if(updateDto.getEmail() != null){
            teacher.setEmail(updateDto.getEmail());
        }
        if(updateDto.getPassword() != null){
            teacher.setPassword(passwordEncoder.encode(updateDto.getPassword()));
        }
        if(updateDto.getMobile() != null){
            teacher.setMobile(updateDto.getMobile());
        }

        teacherRepo.save(teacher);
    }

    public Teacher getDetail(String teacherId){
        return teacherRepo.findByTeacherId(teacherId).get();
    }

    public Student getDetailOfStudent(String enroll){
        return studentRepo.findByEnrollment(enroll).orElseThrow(()->new UserNotExist("Student Doesn't exist.."));
    }

    @Transactional
    public void addQuestions(String teacherId ,String examName, List<QuestionDTO> questionDTOList){

        Exam exam = examRepo.findByExamNameAndTeacherId(examName, teacherId).orElse(null);
        if(exam == null) {
            exam = new Exam();
            exam.setTeacherId(teacherId);
            exam.setExamName(examName);
            examRepo.save(exam);
        }else{
            throw new UserAlreadyExist("Exam already Exist...!");
        }

        List<QuestionBank> questionBanks = new ArrayList<>();

        for(QuestionDTO question : questionDTOList){
            QuestionBank qb = new QuestionBank();
            qb.setExamName(examName);
            qb.setQuestion(question.getQuestion());
            qb.setOption1(question.getOption1());
            qb.setOption2(question.getOption2());
            qb.setOption3(question.getOption3());
            qb.setOption4(question.getOption4());
            qb.setAns(question.getAns());
            questionBanks.add(qb);
        }
        questionBankRepo.saveAll(questionBanks);
    }

    public List<Result> getAllResult(){
        return resultRepo.findAll();
    }

    public Result getResult(String enroll){
        Result result = resultRepo.findByEnrollment(enroll).orElseThrow(()->new UserNotExist("Student doesn't Exist..!"));
        return result;
    }

    @Transactional
    public void removeQuestion(){
        resultRepo.deleteAllInBatch();
        questionBankRepo.deleteAllInBatch();
    }

    public List<QuestionBank> getAllQuestion(){
        return questionBankRepo.findAll();
    }



    // Tokens ---------------------->

    public String generateToken(String teacherId){
        Teacher teacher = teacherRepo.findByTeacherId(teacherId).orElseThrow(()->new UserNotExist("User Doesn't Exist"));
        return jwtUtility.generateToken(teacherId , List.of(teacher.getRole()));
    }

    public String generateRefreshToken(String teacherID){
        return teacherRTokenService.generateRefreshToken(teacherID);
    }

    public String generateTokFromRef(String rToken){
        TeacherRefreshToken refreshToken = teacherRTokenService.validate(rToken);
        Teacher teacher = teacherRepo.findByTeacherId(refreshToken.getTeacherId()).get();
        return jwtUtility.generateToken(refreshToken.getTeacherId() , List.of(teacher.getRole()));
    }
}
