package com.project.plannet.member.controller;

import com.project.plannet.member.service.KakaoService;
import com.project.plannet.member.service.MemberService;
import com.project.plannet.member.vo.Member;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import java.io.IOException;
import java.util.Map;

@Slf4j
@SessionAttributes("loginMember")
@Controller
public class MemberController {
    @Autowired
    private MemberService service;

    @Autowired
    private KakaoService kakaoService;

    @GetMapping("/kakaoLogin")
    public String kakaoLogin(Model model, String code){
        log.info("로그인 요청");
        if(code != null){
            try{
                String loginUrl = "http://localhost/kakaoLogin";
                String token = kakaoService.getToken(code, loginUrl);
                Map<String, Object> map = kakaoService.getUserInfo(token);
                String kakaoToken = (String) map.get("id");
                Member loginMember = service.loginKakao(kakaoToken);

                if(loginMember != null){
                    model.addAttribute("loginMember", loginMember);
                    return "redirect:/";
                }
            } catch(IOException e){
                e.printStackTrace();
            }
        }
        model.addAttribute("msg", "로그인에 실패하였습니다.");
        model.addAttribute("location", "/");

        return "common/msg";
    }
}
