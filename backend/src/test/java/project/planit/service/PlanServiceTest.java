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
import project.planit.repository.PlanRepository;

import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
public class PlanServiceTest {

    @Autowired EntityManager em;
    @Autowired PlanService planService;
    @Autowired PlanRepository planRepository;

    @Test
    @Rollback(false)
    public void 여행계획_생성() throws Exception {
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

        // when
        // 여행 계획 생성 서비스 호출
        Long planId = planService.createPlan(member.getId(), planTitle, startDate, endDate);

        // then
        // plan 생성 확인
        Plan plan = planRepository.findById(planId);
        assertThat(plan).isNotNull();
        assertThat(plan.getTitle()).isEqualTo("여행 테스트");

        // Schedule 생성 확인
        List<Schedule> schedules = plan.getSchedules();
        assertThat(schedules).hasSize(3);
        assertThat(schedules)
                .extracting(Schedule::getDate)
                .containsExactlyInAnyOrder(startDate, startDate.plusDays(1), startDate.plusDays(2));
    }

    @Test
    public void 여행계획_조회() throws Exception {
        //given
        Member member = new Member();
        member.setId("userId");
        member.setUsername("userA");
        member.setNickname("userA");
        member.setEmail("userMail");
        member.setPassword("userPw");
        em.persist(member);

        String planTitle1 = "여행1";
        String planTitle2 = "여행2";
        LocalDate startDate = LocalDate.of(2025, 7, 1);
        LocalDate endDate = LocalDate.of(2025, 7, 3);

        planService.createPlan(member.getId(), planTitle1, startDate, endDate);
        planService.createPlan(member.getId(), planTitle2, startDate, endDate);

        //when
        List<Plan> plans = planService.findPlanByMember(member.getId());

        //then
        assertThat(plans).isNotNull();
        assertThat(plans).hasSize(2);
        assertThat(plans)
                .extracting(Plan::getTitle)
                .containsExactlyInAnyOrder(planTitle1, planTitle2);
    }

    @Test
    @Rollback(false)
    public void 여행계획_삭제() throws Exception {
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
        Long planId = planService.createPlan(member.getId(), planTitle, startDate, endDate);

        // when
        // plan 삭제
        planService.deletePlan(planId);

        // then
        // plan, schedule 삭제 확인
        Plan deletedPlan = planRepository.findById(planId);
        assertThat(deletedPlan).isNull();

        String scheduleQuery = "SELECT s FROM Schedule s WHERE s.plan.id = :planId";
        List<Schedule> schedules = em.createQuery(scheduleQuery, Schedule.class)
                .setParameter("planId", planId)
                .getResultList();
        assertThat(schedules).isEmpty();
    }
}
