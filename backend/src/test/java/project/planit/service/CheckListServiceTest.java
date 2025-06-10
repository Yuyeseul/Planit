package project.planit.service;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import project.planit.domain.CheckList;
import project.planit.domain.Member;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
public class CheckListServiceTest {

    @Autowired
    EntityManager em;

    @Autowired
    CheckListService checkListService;

    @Test
    @Rollback(false)
    public void 체크리스트_추가() throws Exception {
        // given
        Member member = new Member();
        member.setId("userId");
        member.setUsername("userA");
        member.setNickname("userA");
        member.setEmail("userA");
        member.setPassword("userPw");
        em.persist(member);

        String checkListName = "테스트 체크리스트";

        // when
        // checklist 생성
        CheckList checkList = checkListService.addCheckList(member, checkListName);

        // then
        assertThat(checkList).isNotNull();
        assertThat(checkList.getId()).isNotNull();
        assertThat(checkList.getName()).isEqualTo(checkListName);
        assertThat(checkList.isChecked()).isFalse();
        assertThat(checkList.getMember()).isEqualTo(member);
    }

    @Test
    @Rollback(false)
    public void 체크리스트_수정() throws Exception {
        // given
        Member member = new Member();
        member.setId("userId");
        member.setUsername("userA");
        member.setNickname("userA");
        member.setEmail("userA");
        member.setPassword("userPw");
        em.persist(member);

        CheckList checkList = checkListService.addCheckList(member, "기존 이름");

        // when
        Optional<CheckList> updated = checkListService.updateCheckList(checkList.getId(), "수정된 이름", true);

        // then
        assertThat(updated).isPresent();
        assertThat(updated.get().getName()).isEqualTo("수정된 이름");
        assertThat(updated.get().isChecked()).isTrue();
    }

    @Test
    @Rollback(false)
    public void 체크리스트_삭제() throws Exception {
        // given
        Member member = new Member();
        member.setId("userId");
        member.setUsername("userA");
        member.setNickname("userA");
        member.setEmail("userA");
        member.setPassword("userPw");
        em.persist(member);

        CheckList checkList = checkListService.addCheckList(member, "삭제할 체크리스트");
        Long checkListId = checkList.getId();

        // when
        checkListService.deleteCheckList(checkListId);

        // then
        Optional<CheckList> findCheckList = checkListService.findById(checkListId);
        assertThat(findCheckList).isEmpty();
    }

    @Test
    @Rollback(false)
    public void 멤버별_체크리스트_조회() throws Exception {
        // given
        Member member = new Member();
        member.setId("userId");
        member.setUsername("userA");
        member.setNickname("userA");
        member.setEmail("userA");
        member.setPassword("userPw");
        em.persist(member);

        checkListService.addCheckList(member, "체크리스트 1");
        checkListService.addCheckList(member, "체크리스트 2");

        // when
        List<CheckList> checkLists = checkListService.findByMemberId(member.getId());

        // then
        assertThat(checkLists).hasSize(2);
        assertThat(checkLists).extracting(CheckList::getName)
                .containsExactlyInAnyOrder("체크리스트 1", "체크리스트 2");
    }
}
