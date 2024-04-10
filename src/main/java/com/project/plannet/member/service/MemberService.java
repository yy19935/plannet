package com.project.plannet.member.service;

import com.project.plannet.member.mapper.MemberMapper;
import com.project.plannet.member.vo.Member;
import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    /*
    * Autowired 어노테이션은 권장되지 않음.
    * 주입할 객체를 final 로 선언한 뒤 RequiredArgsConstructor 어노테이션으로
    * 해당 객체를 파라미터로 받는 생성자 생성하여 사용
    *
    * @Autowired
    * private MemberMapper mapper;
    * */

    private final MemberMapper mapper;

    public Member checkKakaoMember(String snsId){
        Member member = mapper.selectMemberBySnsId(snsId);
        if(member != null){
            member.setIsMember(true);
            return member;
        }else{
            return joinKakaoMember(snsId);
        }
    }

    private Member joinKakaoMember(String snsId){
        Member member = new Member();
        member.setSnsId(snsId);
        int cnt = mapper.insertMemberByKakao(member);

        if (cnt > 0) {
            member.setIsMember(false);
        }

        return member;
    }
}
