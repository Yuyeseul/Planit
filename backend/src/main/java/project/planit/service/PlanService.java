package project.planit.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.planit.domain.Member;
import project.planit.domain.Plan;
import project.planit.domain.Schedule;
import project.planit.repository.MemberRepository;
import project.planit.repository.PlanRepository;
import project.planit.repository.ScheduleRepository;

import java.time.LocalDate;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PlanService {

    private final PlanRepository planRepository;
    private final MemberRepository memberRepository;
    private final ScheduleRepository scheduleRepository;

    /**
     * 여행 계획 생성
     */
    @Transactional
    public Long createPlan(String memberId, String planTitle, LocalDate startDate, LocalDate endDate) {

        // 엔티티 조회
        Member member = memberRepository.findById(memberId);

        // 계획 생성 및 저장
        Plan plan = new Plan();
        plan.setMember(member);
        plan.setTitle(planTitle);
        plan.setStartDate(startDate);
        plan.setEndDate(endDate);

        planRepository.save(plan);

        // 날짜별 일정 생성 및 저장
        LocalDate date = startDate;
        while (!date.isAfter(endDate)) {
            Schedule schedule = new Schedule();
            schedule.setPlan(plan);
            schedule.setDate(date);

            plan.getSchedules().add(schedule);
            date = date.plusDays(1);
        }
        planRepository.save(plan);
        return plan.getId();
    }

    /**
     * 여행 계획 삭제
     */
    @Transactional
    public void deletePlan(Long planId) {
        Plan plan = planRepository.findById(planId);
        if (plan == null) {
            throw new IllegalArgumentException("존재하지 않는 계획입니다.");
        }
        planRepository.delete(plan);
    }
}
