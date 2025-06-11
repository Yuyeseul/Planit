package project.planit.service;

import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import project.planit.domain.Friend;
import project.planit.domain.Member;
import project.planit.domain.Plan;
import project.planit.repository.FriendRepository;
import project.planit.repository.MemberRepository;
import project.planit.repository.PlanRepository;

import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
public class FriendServiceTest {

    @Autowired
    FriendService friendService;
    @Autowired
    FriendRepository friendRepository;
    @Autowired
    MemberRepository memberRepository;
    @Autowired
    PlanRepository planRepository;
    @Autowired
    PlanService planService;

    @Test
    @Rollback(false)
    public void 친구_추가() throws Exception {
        // given
        Member member = new Member();
        member.setId("userId");
        member.setUsername("userA");
        member.setNickname("userA");
        member.setEmail("userMail");
        member.setPassword("userPw");
        memberRepository.save(member);


        String planTitle = "여행 테스트";
        LocalDate startDate = LocalDate.of(2025, 6, 10);
        LocalDate endDate = LocalDate.of(2025, 6, 12);
        Long planId1 = planService.createPlan(member.getId(), planTitle, startDate, endDate);
        Plan plan = planRepository.findById(planId1);

        // when
        // 친구 추가 서비스 호출
        friendService.addFriend(member.getId(), plan.getId());

        // then
        List<Friend> friends = friendRepository.findByMemberId(member.getId());
        assertThat(friends).hasSize(1);  // 친구 목록 개수 검증 = 1명
    }

    @Test
    @Rollback(false)
    public void 친구_초대() throws Exception {
        // given
        Member member = new Member();
        member.setId("userId");
        member.setUsername("userA");
        member.setNickname("userA");
        member.setEmail("userMail");
        member.setPassword("userPw");
        memberRepository.save(member);

        String planTitle = "여행 테스트";
        LocalDate startDate = LocalDate.of(2025, 6, 10);
        LocalDate endDate = LocalDate.of(2025, 6, 12);
        Long planId1 = planService.createPlan(member.getId(), planTitle, startDate, endDate);
        Plan plan1 = planRepository.findById(planId1);

        Plan plan2 = new Plan();
        planRepository.save(plan2);

        Friend friend1 = new Friend();
        friend1.setMember(member);
        friend1.setPlan(plan1);
        friendRepository.save(friend1);

        Friend friend2 = new Friend();
        friend2.setMember(member);
        friend2.setPlan(plan2);
        friendRepository.save(friend2);

        // when
        // memberId(userId)로 친구 목록 조회
        List<Friend> friends = friendService.getFriendsByMember(member.getId());

        // then
        // 친구 목록 개수 검증 = 2명
        assertThat(friends).hasSize(2);
    }

    @Test
    @Rollback(false)
    public void 친구_삭제() throws Exception {
        // given
        Member member = new Member();
        member.setId("userId");
        member.setUsername("userA");
        member.setNickname("userA");
        member.setEmail("userMail");
        member.setPassword("userPw");
        memberRepository.save(member);

        String planTitle = "여행 테스트";
        LocalDate startDate = LocalDate.of(2025, 6, 10);
        LocalDate endDate = LocalDate.of(2025, 6, 12);
        Long planId1 = planService.createPlan(member.getId(), planTitle, startDate, endDate);
        Plan plan = planRepository.findById(planId1);

        Friend friend1 = new Friend();
        friend1.setMember(member);
        friend1.setPlan(plan);
        friendRepository.save(friend1);

        Friend friend2 = new Friend();
        friend2.setMember(member);
        friend2.setPlan(plan);
        friendRepository.save(friend2);

        Long friendId = friend1.getId();

        // when
        // 친구 삭제 서비스 호출
        friendService.deleteFriend(friendId);

        // then
        // 삭제 후 DB 에서 조회 시 null 인지 확인
        Friend deletedFriend = friendRepository.findById(friendId);
        assertThat(deletedFriend).isNull();
    }
}
