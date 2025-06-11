package project.planit.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.planit.dto.PlanCreateRequest;
import project.planit.service.PlanService;

@RestController
@RequestMapping("/plan")
@RequiredArgsConstructor
public class PlanController {

    private final PlanService planService;

    // 회원 생성
    @PostMapping("/create")
    public ResponseEntity<Long> createPlan(@RequestBody PlanCreateRequest request) {
        Long planId = planService.createPlan(
                request.getMemberId(),
                request.getTitle(),
                request.getStartDate(),
                request.getEndDate()
        );
        return ResponseEntity.ok(planId);
    }
}