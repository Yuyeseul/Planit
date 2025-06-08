package project.planit.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.planit.domain.Member;
import project.planit.repository.MemberRepository;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    //회원가입
    @Transactional
    public String join(Member member) {
        validateDuplicateMember(member); //중복 아이디 및 닉네임 검증
        memberRepository.save(member);
        return member.getId();
    }

    /**
     * 아이디랑 닉네임 둘 다 중복되면 안돼서 두개 다 만들었는데 이렇게 하는게 맞는지 모르겠음.
     */
    //중복 아이디 및 닉네임 검증
    private void validateDuplicateMember(Member member) {
        boolean duplicateId = !memberRepository.findById(member.getId()).isEmpty();
        boolean duplicateNickname = !memberRepository.findByNickName(member.getNickname()).isEmpty();

        if (duplicateId) {
            throw new IllegalStateException("이미 존재하는 아이디입니다.");
        }
        if (duplicateNickname) {
            throw new IllegalStateException("이미 존재하는 닉네임입니다.");
        }
    }

    //회원 전체 조회
    public List<Member> findMembers() {
        return memberRepository.findAll();
    }
}
