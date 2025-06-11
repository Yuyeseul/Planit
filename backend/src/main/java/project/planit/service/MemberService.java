package project.planit.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.planit.domain.Member;
import project.planit.repository.MemberRepository;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder; // 비밀번호 암호화

    // 회원가입
    @Transactional
    public String join(Member member) {
        validateDuplicateMember(member); // 중복 아이디 및 닉네임 검증
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword); // 비밀번호 암호화
        memberRepository.save(member);
        return member.getId();
    }

    // 로그인 - 아이디, 비밀번호 검증
    public Member login(String id, String password) {
        Member member = memberRepository.findById(id);
        if (member == null) {
            throw new IllegalArgumentException("존재하지 않는 아이디입니다.");
        }
        if (!passwordEncoder.matches(password, member.getPassword())) {
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

    // 회원정보 수정
    @Transactional
    public void updateMember(String id, String username, String password, String nickname, String email, String phone, String profileImage) {
        Member member = memberRepository.findById(id);
        if (member == null) {
            throw new IllegalArgumentException("존재하지 않는 회원입니다.");
        }

        // 닉네임 중복 검사 (자기 자신 제외)
        Member existingNickname = memberRepository.findByNickname(nickname);
        if (existingNickname != null && !existingNickname.getId().equals(id)) {
            throw new IllegalStateException("이미 존재하는 닉네임입니다.");
        }

        member.setUsername(username);
        member.setPassword(passwordEncoder.encode(password));
        member.setNickname(nickname);
        member.setEmail(email);
        member.setPhone(phone);
        member.setProfileImage(profileImage);
    }


    // 회원 탈퇴
    public void deleteMember(String id) {
        Member member = memberRepository.findById(id);
        if (member == null) {
            throw new IllegalArgumentException("존재하지 않는 회원입니다.");
        }
        memberRepository.delete(member);
    }

    // 중복 아이디 및 닉네임 검증
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
