package com.project.plannet.studygroup.service;

import com.project.plannet.studygroup.mapper.StudyGroupMapper;
import com.project.plannet.studygroup.vo.StudyGroup;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class StudyGroupService {

    private final StudyGroupMapper mapper;

    public List<StudyGroup> getStudyGroupList(Map<String, String> param){
        return mapper.selectStudyGroupList(param);
    }
}
