package project.planit.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.planit.domain.Member;
import project.planit.service.MemberService;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    // 회원 생성
    @PostMapping("/signup")
    public ResponseEntity<String> createMember(@RequestBody Member member) {
        String memberId = memberService.join(member);
        return ResponseEntity.ok(memberId);
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<Member> login(@RequestParam String id, @RequestParam String password) {
        Member member = memberService.login(id, password);
        return ResponseEntity.ok(member);
    }

    // 아이디 찾기
    @GetMapping("/find-id")
    public ResponseEntity<String> findId(@RequestParam String username, @RequestParam String email) {
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