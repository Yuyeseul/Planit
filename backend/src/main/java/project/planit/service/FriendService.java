package project.planit.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.planit.domain.Friend;
import project.planit.domain.Member;
import project.planit.domain.Plan;
import project.planit.repository.FriendRepository;
import project.planit.repository.MemberRepository;
import project.planit.repository.PlanRepository;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FriendService {

    private final FriendRepository friendRepository;
    private final MemberRepository memberRepository;
    private final PlanRepository planRepository;

    // 친구 추가
    @Transactional
    public void addFriend(String memberId, Long planId) {
        Member member = memberRepository.findById(memberId);
        Plan plan = planRepository.findById(planId);

        Friend friend = new Friend();
        friend.setMember(member);
        friend.setPlan(plan);

        friendRepository.save(friend);
    }

    // 친구 초대
    public List<Friend> getFriendsByMember(String memberId) {
        return friendRepository.findByMemberId(memberId);
    }

    // 친구 삭제
    @Transactional
    public void deleteFriend(Long friendId) {
        Friend friend = friendRepository.findById(friendId);
        if (friend == null) {
            throw new IllegalArgumentException("존재하지 않는 친구입니다.");
        }
        friendRepository.delete(friend);
    }
}
