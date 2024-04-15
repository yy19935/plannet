package com.project.plannet.common.mapper;

import com.project.plannet.common.vo.PlanNetFile;
import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface FileMapper {

    int insertFile(PlanNetFile file);
    int updateFile(PlanNetFile file);
    int deleteFile(int fNo);
    PlanNetFile selectFile(Map<String, Object> fileParams);
}
