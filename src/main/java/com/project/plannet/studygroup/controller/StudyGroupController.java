package com.project.plannet.studygroup.controller;

import com.project.plannet.member.vo.Member;
import com.project.plannet.studygroup.service.StudyGroupService;
import com.project.plannet.studygroup.vo.StudyGroup;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
public class StudyGroupController {

    private final StudyGroupService service;

    @GetMapping("/studyGroup/list")
    public List<StudyGroup> getStudyGroupList(@RequestParam Map<String, String> param){
        return service.getStudyGroupList(param);
    }

    @PostMapping("/studyGroup/write")
    public Map<String, Object> writeStudyGroup(@SessionAttribute(name = "loginMember", required = false) Member loginMember, @ModelAttribute StudyGroup studyGroup){
        studyGroup.setMemberNo(loginMember.getMemberNo());
        return service.saveStudyGroup(studyGroup);
    }
}
