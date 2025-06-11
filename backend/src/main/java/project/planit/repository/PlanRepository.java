package project.planit.repository;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import project.planit.domain.Member;
import project.planit.domain.Plan;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class PlanRepository {

    private final EntityManager em;

    public void save(Plan plan) {
        em.persist(plan);
    }

    public Plan findById(Long id) {
        return em.find(Plan.class, id);
    }

    public List<Plan> findByMember(Member member) {
        return em.createQuery("SELECT p FROM Plan p WHERE p.member = :member", Plan.class)
                .setParameter("member", member)
                .getResultList();
    }

    public void delete(Plan plan) {
        em.remove(em.contains(plan) ? plan : em.merge(plan));
    }
}
