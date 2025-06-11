package project.planit.repository;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import project.planit.domain.Member;
import project.planit.domain.Plan;
import project.planit.domain.Schedule;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class ScheduleRepository {

    private final EntityManager em;

    public void save(Schedule schedule) {
        em.persist(schedule);
    }

    public Schedule findById(Long id) {
        return em.find(Schedule.class, id);
    }

    public List<Schedule> findByPlan(Plan plan) {
        return em.createQuery("SELECT s FROM Schedule s WHERE s.plan = :plan", Schedule.class)
                .setParameter("plan", plan)
                .getResultList();
    }
}
