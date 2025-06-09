package project.planit.service;

import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.annotation.Rollback;
import project.planit.domain.Member;
import project.planit.repository.MemberRepository;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
public class MemberServiceTest {

    @Autowired MemberService memberService;
    @Autowired MemberRepository memberRepository;
    @Autowired PasswordEncoder passwordEncoder;

    @Test
    public void 회원가입() throws Exception {
        //given
        Member member = new Member();
        member.setId("memberId");
        member.setPassword("pass");
        member.setNickname("nick");

        //when
        String savedId = memberService.join(member);

        //then
        Member found = memberRepository.findById(savedId);
        assertNotNull(found);
        assertTrue(passwordEncoder.matches("pass", found.getPassword())); // 암호화된 비밀번호 확인
    }

    @Test
    public void 중복_아이디_예외() throws Exception {
        Member member1 = new Member();
        member1.setId("memberId");
        member1.setPassword("pass1");
        member1.setNickname("nick1");

        Member member2 = new Member();
        member2.setId("memberId"); // 같은 ID
        member2.setPassword("pass2");
        member2.setNickname("nick2");

        memberService.join(member1);

        assertThrows(IllegalStateException.class, () -> memberService.join(member2));
    }

    @Test
    public void 중복_닉네임_예외() throws Exception {
        Member member1 = new Member();
        member1.setId("id1");
        member1.setPassword("pass");
        member1.setNickname("memberNickName");

        Member member2 = new Member();
        member2.setId("id2");
        member2.setPassword("pass");
        member2.setNickname("memberNickName"); // 같은 닉네임

        memberService.join(member1);

        assertThrows(IllegalStateException.class, () -> memberService.join(member2));
    }

    @Test
    public void 로그인_성공() {
        // given
        Member member = new Member();
        member.setId("userId");
        member.setUsername("userA");
        member.setNickname("userA");
        member.setEmail("userA");
        member.setPassword("userPw");

        memberService.join(member);

        // when
        Member loginMember = memberService.login("userId", "userPw");

        // then
        assertNotNull(loginMember);
        assertEquals("userA", loginMember.getUsername());
    }

    @Test
    public void 로그인_실패_아이디_없음() {
        // given
        Member member = new Member();
        member.setId("userId");
        member.setUsername("userA");
        member.setNickname("userA");
        member.setEmail("userA");
        member.setPassword("userPw");

        memberService.join(member);

        // when & then
        IllegalArgumentException thrown = assertThrows(IllegalArgumentException.class, () -> {
            memberService.login("userId2", "userPw");
        });
        assertEquals("존재하지 않는 아이디입니다.", thrown.getMessage());
    }

    @Test
    public void 로그인_실패_비밀번호_불일치() {
        // given
        Member member = new Member();
        member.setId("userId");
        member.setUsername("userA");
        member.setNickname("userA");
        member.setEmail("userA");
        member.setPassword("userPw");

        memberService.join(member);

        // when & then
        IllegalArgumentException thrown = assertThrows(IllegalArgumentException.class, () -> {
            memberService.login("userId", "userPw2");
        });
        assertEquals("비밀번호가 틀렸습니다.", thrown.getMessage());
    }

    @Test
    public void 아이디_찾기_성공() {
        // given
        Member member = new Member();
        member.setId("userId");
        member.setUsername("userA");
        member.setNickname("userA");
        member.setEmail("userMail");
        member.setPassword("userPw");

        memberService.join(member);

        // when
        String findId = memberService.findId("userA", "userMail");

        // then
        assertEquals("userId", findId);
    }

    @Test
    public void 아이디_찾기_실패() {
        // when & then
        IllegalArgumentException thrown = assertThrows(IllegalArgumentException.class, () -> {
            memberService.findId("noname", "noemail@example.com");
        });
        assertEquals("이름과 이메일이 일치하는 회원이 없습니다.", thrown.getMessage());
    }

    @Test
    public void 비밀번호_찾기_성공() {
        // given
        Member member = new Member();
        member.setId("userId");
        member.setUsername("userA");
        member.setNickname("userA");
        member.setEmail("userMail");
        member.setPassword("userPw");

        memberService.join(member);

        // when
        String password = memberService.findPassword("userId", "userMail");

        // then
        assertNotNull(password); // 비밀번호가 null이 아닌지만 확인
        assertNotEquals("userPw", password); // 암호화되어 있어야 함
    }

    @Test
    public void 비밀번호_찾기_실패_아이디없음() {
        // when & then
        IllegalArgumentException thrown = assertThrows(IllegalArgumentException.class, () -> {
            memberService.findPassword("noUser", "userMail");
        });
        assertEquals("존재하지 않는 아이디입니다.", thrown.getMessage());
    }

    @Test
    public void 비밀번호_찾기_실패_이메일불일치() {
        // given
        Member member = new Member();
        member.setId("userId");
        member.setUsername("userA");
        member.setNickname("userA");
        member.setEmail("userMail");
        member.setPassword("userPw");

        memberService.join(member);

        // when & then
        IllegalArgumentException thrown = assertThrows(IllegalArgumentException.class, () -> {
            memberService.findPassword("userId", "userMail2");
        });
        assertEquals("이메일이 일치하지 않습니다.", thrown.getMessage());
    }

    @Test
    public void 회원정보_수정() throws Exception {
        // given
        Member member = new Member();
        member.setId("userId");
        member.setUsername("userA");
        member.setNickname("nickA");
        member.setEmail("mail@a.com");
        member.setPassword("userPw");
        memberService.join(member);

        // when
        memberService.updateMember("userId", "userB", "newPw", "nickB", "mail@b.com", "010-0000-0000", "newImg.jpg");

        // then
        Member updated = memberRepository.findById("userId");
        assertEquals("userB", updated.getUsername());
        assertEquals("nickB", updated.getNickname());
        assertEquals("mail@b.com", updated.getEmail());
        assertEquals("010-0000-0000", updated.getPhone());
        assertEquals("newImg.jpg", updated.getProfileImage());

        assertTrue(memberService.login("userId", "newPw") != null); // 암호화된 비밀번호인지 확인
    }

    @Test
    public void 회원정보_수정_중복_닉네임_예외() throws Exception {
        // given
        Member member1 = new Member();
        member1.setId("id1");
        member1.setUsername("userA");
        member1.setNickname("nickA");
        member1.setEmail("mail@a.com");
        member1.setPassword("pw");
        memberService.join(member1);

        Member member2 = new Member();
        member2.setId("id2");
        member2.setUsername("userB");
        member2.setNickname("nickB");
        member2.setEmail("mail@b.com");
        member2.setPassword("pw");
        memberService.join(member2);

        // when & then - id2가 nickA로 바꾸려 하면 예외 발생
        IllegalStateException ex = assertThrows(IllegalStateException.class, () -> {
            memberService.updateMember("id2", "userB", "newPw", "nickA", "mail@b.com", "010", "img.jpg");
        });
        assertEquals("이미 존재하는 닉네임입니다.", ex.getMessage());
    }

    @Test
    public void 회원_탈퇴_성공() {
        // given
        Member member = new Member();
        member.setId("userId");
        member.setUsername("userA");
        member.setNickname("userA");
        member.setEmail("userMail");
        member.setPassword("userPw");

        memberService.join(member);

        // when
        memberService.deleteMember("userId");

        // then
        Member deletedMember = memberRepository.findById("userId");
        assertNull(deletedMember);
    }
}
