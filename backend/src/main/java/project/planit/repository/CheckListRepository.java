package project.planit.repository;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import project.planit.domain.CheckList;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class CheckListRepository {

    private final EntityManager em;

    // checklist 저장
    public CheckList save(CheckList checkList) {
        if (checkList.getId() == null) {
            em.persist(checkList);
            return checkList;
        } else {
            return em.merge(checkList);
        }
    }

    // checklist 상세 조회
    public Optional<CheckList> findById(Long id) {
        return Optional.ofNullable(em.find(CheckList.class, id));
    }

    // checklist 목록 조회
    public List<CheckList> findByMemberId(String memberId) {
        return em.createQuery("select c from CheckList c where c.member.id = :memberId", CheckList.class)
                .setParameter("memberId", memberId)
                .getResultList();
    }

    /**
     *
     * 삭제 부분 수정 예정
     */
        // checklist 삭제
    public void delete(CheckList checkList) {
        em.remove(em.contains(checkList) ? checkList : em.merge(checkList));
    }

    // checklist item? 삭제 (delete 재사용)
    public void deleteById(Long id) {
        findById(id).ifPresent(this::delete);
    }
}
