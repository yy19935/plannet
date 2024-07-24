package com.project.plannet.scrap.mapper;

import com.project.plannet.scrap.vo.ScrapStudyGroup;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ScrapStudyGroupMapper {
    int insertStudyGroupScrap(ScrapStudyGroup scrapStudyGroup);
    List<ScrapStudyGroup> selectStudyGroupScrap(int M_NO);
    List<Map<String, Object>> selectStudyGroupScrapList(int M_NO);
}
