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

    // 비밀번호 암호화 예정

    //회원가입
    @Transactional
    public String join(Member member) {
        validateDuplicateMember(member); //중복 아이디 및 닉네임 검증
        memberRepository.save(member);
        return member.getId();
    }

    // 로그인 - 아이디, 비밀번호 검증
    public Member login(String id, String password) {
        Member member = memberRepository.findById(id);
        if (member == null) {
            throw new IllegalArgumentException("존재하지 않는 아이디입니다.");
        }
        if (!member.getPassword().equals(password)) {
            throw new IllegalArgumentException("비밀번호가 틀렸습니다.");
        }
        return member;
    }

    // 아이디 찾기
    public String findId(String username, String email) {
        Member member = memberRepository.findByNameAndEmail(username, email);
        if (member == null) {
            throw new IllegalArgumentException("이름과 이메일이 일치하는 회원이 없습니다.");
        }
        return member.getId();
    }

    // 비밀번호 찾기
    public String findPassword(String id, String email) {
        Member member = memberRepository.findById(id);
        if (member == null) {
            throw new IllegalArgumentException("존재하지 않는 아이디입니다.");
        }
        if (!member.getEmail().equals(email)) {
            throw new IllegalArgumentException("이메일이 일치하지 않습니다.");
        }
        return member.getPassword(); // 실제 서비스는 임시비밀번호 발급이나 이메일 발송 권장
    }

    // 회원 탈퇴
    public void deleteMember(String id) {
        Member member = memberRepository.findById(id);
        if (member == null) {
            throw new IllegalArgumentException("존재하지 않는 회원입니다.");
        }
        memberRepository.delete(member);
    }

    /**
     * 아이디랑 닉네임 둘 다 중복되면 안돼서 두개 다 만들었는데 이렇게 하는게 맞는지 모르겠음.
     */
    //중복 아이디 및 닉네임 검증
    private void validateDuplicateMember(Member member) {
        Member existingById = memberRepository.findById(member.getId());
        Member existingByNickname = memberRepository.findByNickname(member.getNickname());

        if (existingById != null) {
            throw new IllegalStateException("이미 존재하는 아이디입니다.");
        }
        if (existingByNickname != null) {
            throw new IllegalStateException("이미 존재하는 닉네임입니다.");
        }
    }

}
