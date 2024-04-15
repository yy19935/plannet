package com.project.plannet.common.mapper;

import com.project.plannet.common.vo.PlanNetFile;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FileMapper {

    int insertFile(PlanNetFile file);
    int updateFile(PlanNetFile file);
    int deleteFile(int fNo);
}
