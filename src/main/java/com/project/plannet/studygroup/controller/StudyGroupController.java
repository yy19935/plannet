package com.project.plannet.studygroup.controller;

import com.project.plannet.studygroup.service.StudyGroupService;
import com.project.plannet.studygroup.vo.StudyGroup;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
}
