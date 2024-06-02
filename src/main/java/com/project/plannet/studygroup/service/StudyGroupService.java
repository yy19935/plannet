package com.project.plannet.studygroup.service;

import com.project.plannet.studygroup.mapper.StudyGroupMapper;
import com.project.plannet.studygroup.vo.StudyGroup;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class StudyGroupService {

    private final StudyGroupMapper mapper;

    public List<StudyGroup> getStudyGroupList(Map<String, String> param){
        return mapper.selectStudyGroupList(param);
    }

    @Transactional(rollbackFor = Exception.class)
    public Map<String, Object> saveStudyGroup(StudyGroup studyGroup){
        Map<String, Object> resultMap = new HashMap<>();
        int result = 0;
        if(studyGroup.getStudyGroupNo() == 0){
            result = mapper.insertStudyGroup(studyGroup);
        }else {
            result = mapper.updateStudyGroup(studyGroup);
        }
        if(result > 0){
            resultMap.put("result", "success");
        }else {
            resultMap.put("result", "fail");
        }
        return resultMap;
    }
}
