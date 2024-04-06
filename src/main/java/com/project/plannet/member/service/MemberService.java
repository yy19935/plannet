package com.project.plannet.member.service;

import com.project.plannet.member.mapper.MemberMapper;
import com.project.plannet.member.vo.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberService {

    @Autowired
    private MemberMapper mapper;

    public Member loginKakao(String kakaoToken){
        Member member = mapper.selectMemberByKakaoToken(kakaoToken);
        if(member != null){
            return member;
        }else{
            return null;
        }
    }
}
