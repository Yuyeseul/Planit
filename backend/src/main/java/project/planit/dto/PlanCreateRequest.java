package project.planit.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class PlanCreateRequest {
    private String memberId;
    private String title;
    private LocalDate startDate;
    private LocalDate endDate;
}