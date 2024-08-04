package com.project.plannet.scrap.controller;

import com.project.plannet.scrap.service.ScrapStudyGroupService;
import com.project.plannet.scrap.vo.ScrapStudyGroup;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/scrapStudyGroup")
public class ScrapStudyGroupController {
    private final ScrapStudyGroupService service;

    @PostMapping("/add") // 스크랩 추가
    public ResponseEntity<String> addScrap(ScrapStudyGroup scrapStudyGroup) {
        int result = service.insertStudyGroupScrap(scrapStudyGroup);
        if (result > 0) {
            return ResponseEntity.ok("Scrap added successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add scrap.");
        }
    }

    @GetMapping("/list/{M_NO}") // 특정 회원의 스크랩 조회
    public ResponseEntity<List<ScrapStudyGroup>> getScrapList(@PathVariable("M_NO") int M_NO){
        List<ScrapStudyGroup> scrapList = service.getStudyGroupScrap(M_NO);
        if(scrapList != null && !scrapList.isEmpty()) {
            return ResponseEntity.ok(scrapList);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    @GetMapping("/detailList/{M_NO}")
    public ResponseEntity<List<Map<String, Object>>> getDetailScrapList(@PathVariable("M_NO") int M_NO){
        List<Map<String, Object>> detailScrapList = service.getStudyGroupScrapList(M_NO);
        if (detailScrapList != null && !detailScrapList.isEmpty()) {
            return ResponseEntity.ok(detailScrapList);
        } else {
            return ResponseEntity.noContent().build();

        }
    }

}
