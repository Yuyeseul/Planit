package project.planit.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.planit.domain.Member;
import project.planit.service.MemberService;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    // 회원 생성
    @PostMapping("/sign-up")
    public ResponseEntity<String> createMember(@RequestBody Member member) {
        String memberId = memberService.join(member);
        return ResponseEntity.ok(memberId);
    }

    // 로그인
    @PostMapping("/sign-in")
    public ResponseEntity<Member> login(@RequestBody Member member) {
        Member loginMember = memberService.login(member.getId(), member.getPassword());
        return ResponseEntity.ok(loginMember);
    }

    // 아이디 찾기
    @PostMapping("/find-id")
    public ResponseEntity<String> findId(@RequestBody Member member) {
        String username = member.getUsername();
        String email = member.getEmail();
        String id = memberService.findId(username, email);
        return ResponseEntity.ok(id);
    }

    // 비밀번호 찾기
    @GetMapping("/find-password")
    public ResponseEntity<String> findPassword(@RequestParam String id, @RequestParam String email) {
        String password = memberService.findPassword(id, email);
        return ResponseEntity.ok(password);
    }

    //회원정보 수정

    // 회원 탈퇴
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMember(@PathVariable String id) {
        memberService.deleteMember(id);
        return ResponseEntity.ok("회원 탈퇴 완료");
    }
}