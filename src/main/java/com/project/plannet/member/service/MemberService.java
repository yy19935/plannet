package com.project.plannet.member.service;


import com.project.plannet.common.service.FileService;
import com.project.plannet.common.vo.PlanNetFile;
import com.project.plannet.member.mapper.MemberMapper;
import com.project.plannet.member.vo.Member;
import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

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
    private final FileService fileService;

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

    public Map<String, Object> selectMember(int memberNo) {
        Map<String, Object> resultMap = new HashMap<>();

        Member member = mapper.selectMemberByMNo(memberNo);
        PlanNetFile file = fileService.selectFile(memberNo, "MB");

        if(member != null && file != null) {
            resultMap.put("result", "success");
            resultMap.put("member", member);
            resultMap.put("file", file);
        } else {
            resultMap.put("result", "fail");
            if (member == null) {
                resultMap.put("message", "member select fail");
            } else {
                resultMap.put("message", "file select fail");
            }
        }
        return resultMap;
    }

    // 회원 정보 수정
    public Map<String, Object> update(Member member, MultipartFile file){
        Map<String, Object> resultMap = new HashMap<>();

        int cnt = mapper.updateMember(member);

        if (cnt > 0 && !file.isEmpty()) {
            PlanNetFile fileInfo = fileService.selectFile(member.getMemberNo(), "MB");
            PlanNetFile fileRes;

            if (fileInfo != null) {
                fileRes = fileService.updateFile(file, fileInfo, "MB", member.getMemberNo());
            } else {
                fileRes = fileService.insertFile(file, "MB", member.getMemberNo());
            }

            if (fileRes != null) {
                resultMap.put("result", "success");
            } else {
                resultMap.put("result", "fail");
                resultMap.put("message", "file upload fail");
            }

        } else {
            resultMap.put("result", "fail");
            if (cnt <= 0) {
                resultMap.put("message", "member update fail");
            } else if (file.isEmpty()) {
                resultMap.put("message", "file is empty");
            }
        }
        return resultMap;
    }
}
