package project.planit.repository;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import project.planit.domain.Friend;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class FriendRepository {

    private final EntityManager em;

    public void save(Friend friend) {
        em.persist(friend);
    }

    public Friend findById(Long id) {
        return em.find(Friend.class, id);
    }

    public List<Friend> findByMemberId(String memberId) {
        return em.createQuery("select f from Friend f where f.member.id = :memberId", Friend.class)
                .setParameter("memberId", memberId)
                .getResultList();
    }

    public void delete(Friend friend) {
        em.remove(em.contains(friend) ? friend : em.merge(friend));
    }
}
