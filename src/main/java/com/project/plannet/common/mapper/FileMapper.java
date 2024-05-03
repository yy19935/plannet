package com.project.plannet.common.mapper;

import com.project.plannet.common.vo.PlanNetFile;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface FileMapper {

    PlanNetFile selectFile(Map<String, Object> fileParams);
    int insertFile(PlanNetFile file);
    int insertFiles(List<PlanNetFile> files);
    int updateFile(PlanNetFile file);
    int deleteFile(int fNo);
}
