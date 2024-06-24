package com.project.plannet.studygroup.controller;

import com.project.plannet.member.vo.Member;
import com.project.plannet.studygroup.service.StudyGroupService;
import com.project.plannet.studygroup.vo.StudyGroup;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
public class StudyGroupController {

    private final StudyGroupService service;

    @GetMapping("/studyGroup/list")
    public List<StudyGroup> getStudyGroupList(@RequestParam Map<String, String> param){
        int page = 1;

        Map<String, String> searchMap = new HashMap<String, String>();
        try {
            String searchValue = param.get("searchValue");
            if(searchValue != null && searchValue.length() > 0){
                String searchType = param.get("searchType");
                searchMap.put(searchType, searchValue);
            }else {
                param.put("searchType", "all");
            }
            page = Integer.parseInt(param.get("page"));
        } catch (Exception e){}
        return service.getStudyGroupList(param);
    }

    @PostMapping("/studyGroup/write")
    public Map<String, Object> writeStudyGroup(@ModelAttribute StudyGroup studyGroup){
        Map<String, Object> response = new HashMap<>();

        if (studyGroup.getMemberNo() == 0) {
            response.put("result", false);
            response.put("message", "로그인이 필요합니다.");
        }else {
            response = service.saveStudyGroup(studyGroup);
            response.put("result", true);
            response.put("message", "스터디그룹이 성공적으로 등록되었습니다.");
        }
         return response;
    }
}
