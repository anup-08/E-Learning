package com.onlineLearning.Exception;

import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestControllerAdvice
public class GlobalException {

    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String,String>> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex){
        Map<String , String> errorMap = new HashMap<>();

        BindingResult bindingResult = ex.getBindingResult();
        List<FieldError> fieldError = bindingResult.getFieldErrors();

        for(FieldError error : fieldError){
            errorMap.put(error.getField() , error.getDefaultMessage());
        }
        return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = UserAlreadyExist.class)
    public ResponseEntity<ErrorResponse> handleUserAlreadyExist(UserAlreadyExist ex){
        ErrorResponse errorResponse = new ErrorResponse(ex.getMessage() , HttpStatus.CONFLICT.value());
        return new ResponseEntity<>(errorResponse , HttpStatus.CONFLICT);
    }

    @ExceptionHandler(value = UserNotExist.class)
    public ResponseEntity<ErrorResponse> handleUserNotExist(UserNotExist ex){
        ErrorResponse errorResponse = new ErrorResponse(ex.getMessage() , HttpStatus.CONFLICT.value());
        return new ResponseEntity<>(errorResponse , HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(value = IllegalArgumentException.class)
    public ResponseEntity<?> handleIllegalArgument(IllegalArgumentException ex) {
        Map<String, String> errorMap = new HashMap<>();
        errorMap.put("error", ex.getMessage());
        return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);
    }




}
