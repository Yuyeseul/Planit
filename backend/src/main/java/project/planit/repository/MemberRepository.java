package project.planit.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import project.planit.domain.Member;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class MemberRepository {

    private final EntityManager em;

    public void save(Member member) {
        em.persist(member);
    }

    public List<Member> findAll() {
        return em.createQuery("select m from Member m", Member.class).getResultList();
    }

    public Member findById(String id) {
        return em.find(Member.class, id);
    }

    public Member findByNickname(String nickname) {
        try{
            return em.createQuery("select m from Member m where m.nickname = :nickname", Member.class)
                    .setParameter("nickname", nickname)
                    .getSingleResult();
        } catch (NoResultException e){
            return null;
        }
    }

    public Member findByNameAndEmail(String username, String email) {
        try {
            return em.createQuery("select m from Member m where m.username = :username and m.email = :email", Member.class)
                    .setParameter("username", username)
                    .setParameter("email", email)
                    .getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }

    public void delete(Member member) {
        em.remove(em.contains(member) ? member : em.merge(member));
    }
}
