package project.planit.service;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import project.planit.domain.Member;
import project.planit.repository.MemberRepository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@Transactional
public class MemberServiceTest {

    @Autowired MemberService memberService;
    @Autowired MemberRepository memberRepository;

    @Test
    public void 회원가입() throws Exception {
        //given
        Member member = new Member();
        member.setId("memberId");

        //when
        String savedId = memberService.join(member);

        //then
        assertEquals(member, memberRepository.findOne(savedId));
    }

    @Test
    public void 중복_아이디_예외() throws Exception {
        Member member1 = new Member();
        member1.setId("memberId");
        member1.setNickname("nick1");

        Member member2 = new Member();
        member2.setId("memberId"); // 같은 ID
        member2.setNickname("nick2");

        memberService.join(member1);

        assertThrows(IllegalStateException.class, () -> memberService.join(member2));
    }

    @Test
    public void 중복_닉네임_예외() throws Exception {
        Member member1 = new Member();
        member1.setId("id1");
        member1.setNickname("memberNickName");

        Member member2 = new Member();
        member2.setId("id2");
        member2.setNickname("memberNickName"); // 같은 닉네임

        memberService.join(member1);

        assertThrows(IllegalStateException.class, () -> memberService.join(member2));
    }

}
