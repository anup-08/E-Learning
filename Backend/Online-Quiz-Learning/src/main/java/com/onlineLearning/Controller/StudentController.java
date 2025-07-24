package com.onlineLearning.Controller;

import com.onlineLearning.DTO.QuestionResponseDTO;
import com.onlineLearning.DTO.StudentDTO;
import com.onlineLearning.DTO.StudentUpdateDto;
import com.onlineLearning.Entity.Student;
import com.onlineLearning.Service.StudentService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@AllArgsConstructor
@RestController
@RequestMapping("/student")
public class StudentController {

    private final  StudentService studentService;
    private final AuthenticationManager authenticationManager;


    @PostMapping("/register")
    public ResponseEntity<?> studentRegister(@Valid @RequestBody StudentDTO student){
        studentService.saveStudentDetails(
                student.getName(), student.getIdNo(), student.getEmail(), student.getPassword(), student.getPhoneNo()
        );
        String token = studentService.generateToken(student.getIdNo());
        String rToken = studentService.generateRefreshToken(student.getIdNo());
        return ResponseEntity.ok(Map.of("accessToken" , token , "refreshToken" , rToken));
    }

    @GetMapping("/getDetail")
    public ResponseEntity<Student> getDetails(Principal principal){
        String enroll = principal.getName();
        Student st = studentService.getDetails(enroll);
        return ResponseEntity.ok(st);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String ,String> loginInfo){

        if (loginInfo.get("idNo") == null || loginInfo.get("password") == null) {
            return ResponseEntity.badRequest().body("Enrollment and password are required");
        }

        String enroll = loginInfo.get("idNo");
        String password = loginInfo.get("password");

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(enroll,password));

        String token = studentService.generateToken(enroll);
        String refreshToken = studentService.generateRefreshToken(enroll);

        return ResponseEntity.ok(Map.of("accessToken" , token , "refreshToken" , refreshToken));
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateStudent( @RequestBody StudentUpdateDto studentUpdateDto , Principal principal){
        String enroll = principal.getName();
        studentService.updateUser(studentUpdateDto ,enroll);
        return ResponseEntity.ok("Student update Successful...!");
    }

    @PostMapping("/getToken")
    public ResponseEntity<Map<String,String>> getNewJwtToken(@RequestBody Map<String,String> tokenInfo){

        String rToken = tokenInfo.get("refreshToken");
        String newToken = studentService.generateTokenFromRefreshToken(rToken);

        return ResponseEntity.ok(Map.of("accessToken",newToken));
    }

    @GetMapping("/getQuestions")
    public ResponseEntity<List<QuestionResponseDTO>> getQuestion(){
        return ResponseEntity.ok(studentService.getQuestionForExam());
    }

    @PostMapping("/submit")
    public ResponseEntity<String> giveExam(@RequestBody Map<String,String> studentAns , Principal principal , @RequestParam String examName){
        Map<Long, String> convertedAnswers = studentAns.entrySet().stream()
                .collect(Collectors.toMap(
                        e -> Long.parseLong(e.getKey()),
                        Map.Entry::getValue
                ));
        studentService.submitExamForm(principal.getName(), examName,convertedAnswers);
        return ResponseEntity.ok("You response is submitted");
    }

    @GetMapping("/getResult")
    public ResponseEntity<String> getResult(Principal principal){
        int score = studentService.score(principal.getName());
        return ResponseEntity.ok("Your Total Score is : "+score);
    }

    @GetMapping("/isGivenExam")
    public ResponseEntity<Boolean> isGivenExam(Principal principal){
        return ResponseEntity.ok(studentService.isGivenExam(principal.getName()));
    }
}
