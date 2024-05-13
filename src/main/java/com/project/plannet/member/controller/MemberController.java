package com.project.plannet.member.controller;

import com.project.plannet.member.service.KakaoService;
import com.project.plannet.member.service.MemberService;
import com.project.plannet.member.vo.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Slf4j
@SessionAttributes("loginMember")
@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final KakaoService kakaoService;

    @GetMapping("/kakaoLogin")
    public Member kakaoLogin(String code){
        log.info("로그인 요청");
        if(code != null){
            try{
                String loginUrl = "http://localhost:8080/kakaoLogin";
                String token = kakaoService.getToken(code, loginUrl);
                Map<String, Object> map = kakaoService.getUserInfo(token);
                String snsId = (String) map.get("id");
                Member loginMember = memberService.checkKakaoMember(snsId);

                if(loginMember != null){
                    return loginMember;
                }
            } catch(IOException e){
                e.printStackTrace();
            }
        }

        return null;
    }

    @GetMapping("/myPage/{memberNo}")
    public Map<String, Object> selectMember(@PathVariable("memberNo") int memberNo) {
        return memberService.selectMember(memberNo);
    }

    @PostMapping("/myPage/update")
    public Map<String, Object> update(@ModelAttribute Member member, @RequestParam MultipartFile file){
        return memberService.update(member, file);
    }
}
