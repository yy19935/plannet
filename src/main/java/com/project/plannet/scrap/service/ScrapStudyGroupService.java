package com.project.plannet.scrap.service;

import com.project.plannet.scrap.mapper.ScrapStudyGroupMapper;
import com.project.plannet.scrap.vo.ScrapStudyGroup;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ScrapStudyGroupService {
    private final ScrapStudyGroupMapper mapper;

    public int insertStudyGroupScrap(ScrapStudyGroup scrapStudyGroup){
        return mapper.insertStudyGroupScrap(scrapStudyGroup);
    }

    public List<ScrapStudyGroup> getStudyGroupScrap(int M_NO){
        return mapper.selectStudyGroupScrap(M_NO);
    }

    public List<Map<String, String>> getStudyGroupScrapList(int M_NO){
        return mapper.selectStudyGroupScrapList(M_NO);
    }

}
