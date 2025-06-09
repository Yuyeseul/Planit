package project.planit.repository;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import project.planit.domain.Schedule;

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
}
