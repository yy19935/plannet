package com.project.plannet.studygroup.mapper;

import com.project.plannet.studygroup.vo.StudyGroup;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface StudyGroupMapper {
    List<StudyGroup> selectStudyGroupList(Map<String, String> map);
    int insertStudyGroup(StudyGroup studyGroup);
    int updateStudyGroup(StudyGroup studyGroup);
}
