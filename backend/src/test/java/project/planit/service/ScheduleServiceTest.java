package project.planit.service;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import project.planit.domain.Member;
import project.planit.domain.Plan;
import project.planit.domain.Schedule;
import project.planit.repository.ScheduleRepository;

import java.time.LocalDate;
import java.util.ArrayList;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
public class ScheduleServiceTest {

    @Autowired
    EntityManager em;
    @Autowired
    PlanService planService;
    @Autowired
    ScheduleService scheduleService;
    @Autowired
    ScheduleRepository scheduleRepository;

    @Test
    @Rollback(false)
    public void 일정_수정() throws Exception {
        // given
        Member member = new Member();
        member.setId("userId");
        member.setUsername("userA");
        member.setNickname("userA");
        member.setEmail("userMail");
        member.setPassword("userPw");
        em.persist(member);

        String planTitle = "여행 테스트";
        LocalDate startDate = LocalDate.of(2025, 6, 10);
        LocalDate endDate = LocalDate.of(2025, 6, 12);

        // 여행 계획 생성 → 일정도 함께 생성됨
        Long planId = planService.createPlan(member.getId(), planTitle, startDate, endDate);
        Plan plan = em.find(Plan.class, planId);
        Schedule schedule = plan.getSchedules().get(0);

        // when
        schedule.setDescription("수정된 일정 설명3");
        schedule.setMaps(new ArrayList<>());  // 빈 리스트로 테스트

        scheduleService.updateSchedule(schedule);

        // then
        Schedule updatedSchedule = scheduleRepository.findById(schedule.getId());

    }

    @Test
    public void 일정_조회() throws Exception {
        //given
        Member member = new Member();
        member.setId("userId");
        member.setUsername("userA");
        member.setNickname("userA");
        member.setEmail("userMail");
        member.setPassword("userPw");
        em.persist(member);

        String planTitle = "일정 조회 테스트";
        LocalDate startDate = LocalDate.of(2025, 6, 15);
        LocalDate endDate = LocalDate.of(2025, 6, 17);

        Long planId = planService.createPlan(member.getId(), planTitle, startDate, endDate);

        //when
        var schedules = scheduleService.findByPlan(planId);

        //then
        assertThat(schedules).isNotNull();
        assertThat(schedules).hasSize(3);  // 6/15, 6/16, 6/17
        assertThat(schedules)
                .extracting(Schedule::getDate)
                .containsExactlyInAnyOrder(
                        LocalDate.of(2025, 6, 15),
                        LocalDate.of(2025, 6, 16),
                        LocalDate.of(2025, 6, 17)
                );
    }
}
