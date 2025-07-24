package com.onlineLearning.Controller;

import com.onlineLearning.DTO.BulkQuestionRequest;
import com.onlineLearning.DTO.TeacherDTO;
import com.onlineLearning.DTO.TeacherUpdateDto;
import com.onlineLearning.Entity.QuestionBank;
import com.onlineLearning.Entity.Result;
import com.onlineLearning.Entity.Student;
import com.onlineLearning.Entity.Teacher;
import com.onlineLearning.Service.TeacherService;
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
import java.util.Optional;
@CrossOrigin
@RestController
@RequestMapping("/teacher")
@AllArgsConstructor
public class TeacherController {

    private final TeacherService teacherService;
    private final AuthenticationManager authenticationManager;


    @PostMapping("/register")
    public ResponseEntity<?> saveTeacherDetails(@Valid @RequestBody TeacherDTO dto){

        teacherService.saveDetails(dto.getName(),dto.getPassword(), dto.getEmail(), dto.getIdNo() , dto.getPhoneNo());

        String token = teacherService.generateToken(dto.getIdNo());
        String rToken = teacherService.generateRefreshToken(dto.getIdNo());
        return ResponseEntity.ok(Map.of("accessToken" , token , "refreshToken" , rToken));
    }

    @GetMapping("/getDetail")
    public ResponseEntity<Teacher> getDetail(Principal principal){
        String teacherId = principal.getName();
        return new ResponseEntity<>(teacherService.getDetail(teacherId) , HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login (@RequestBody Map<String , String> loginInfo){
        if(loginInfo.get("idNo") == null || loginInfo.get("password") == null){
            throw new IllegalArgumentException("UserName or Password is required ...!");
        }
        String teacherId = loginInfo.get("idNo");
        String passsword = loginInfo.get("password");

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(teacherId,passsword));

        String token = teacherService.generateToken(teacherId);
        String rToken = teacherService.generateRefreshToken(teacherId);
        return ResponseEntity.ok(Map.of("accessToken",token,"refreshToken" , rToken));
    }

    @GetMapping("/getStudentDetails")
    public ResponseEntity<List<Student>> getStudentDetails(){

        return ResponseEntity.of(Optional.ofNullable(teacherService.getAllStudentDetails()));
    }

    @PutMapping("/update")
    public ResponseEntity<String> updates( @Valid @RequestBody TeacherUpdateDto updateDto ,Principal principal){
        teacherService.updateDetails(updateDto,principal.getName());
        return ResponseEntity.ok("Updation successfully Done :)");
    }

    @PostMapping("/getToken")
    public ResponseEntity<Map<String,String>> getNewToken(@RequestBody Map<String ,String> refreshToken){
        String token = refreshToken.get("refreshToken");
        String newToken = teacherService.generateTokFromRef(token);
        return ResponseEntity.ok(Map.of("accessToken" , newToken));
    }

    @GetMapping("/getAllResult")
    public ResponseEntity<List<Result>> getAllResult(){
        return new ResponseEntity<>(teacherService.getAllResult() ,HttpStatus.OK);
    }

    @GetMapping("/getResult")
    public ResponseEntity<Result> getResult(@RequestParam String enroll){
        return new ResponseEntity<>(teacherService.getResult(enroll) , HttpStatus.OK);
    }

    @PostMapping("/addQuestion")
    public ResponseEntity<String> addQuestion(@Valid @RequestBody BulkQuestionRequest questionRequest , Principal principal){
        String examName = questionRequest.getExamName();
        teacherService.addQuestions(principal.getName(), examName , questionRequest.getQuestions());
        return ResponseEntity.ok("Question Added Successfully...!");
    }

    @GetMapping("/getDetailOfStudent")
    public ResponseEntity<Student> getDetailOfStudent(@RequestParam String enroll){
        return new ResponseEntity<>(teacherService.getDetailOfStudent(enroll) , HttpStatus.OK);
    }

    @GetMapping("/removeQuestion")
    public ResponseEntity<String> removeAllQuestion(){
        teacherService.removeQuestion();
        return ResponseEntity.ok("Successfully Deleted..!");
    }

    @GetMapping("/getAllQuestion")
    public ResponseEntity<List<QuestionBank>> getAllQuestion(){
        return new ResponseEntity<>(teacherService.getAllQuestion() , HttpStatus.OK);
    }

}
