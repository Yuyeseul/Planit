package project.planit.service;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import project.planit.repository.PlanRepository;

@SpringBootTest
@Transactional
public class PlanServiceTest {

    @Autowired EntityManager em;
    @Autowired PlanService planService;
    @Autowired PlanRepository planRepository;

    @Test
    public void 여행계획_생성() throws Exception {
        //given

        //when

        //then
    }

    @Test
    public void 여행계획_삭제() throws Exception {
        //given

        //when

        //then
    }
}
