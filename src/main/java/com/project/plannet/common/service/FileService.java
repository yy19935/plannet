package com.project.plannet.common.service;

import com.project.plannet.common.mapper.FileMapper;
import com.project.plannet.common.vo.PlanNetFile;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
public class FileService {

    private FileMapper mapper;

    final static private String filePath = "/Users/kimjoohwan/Desktop/Dev/";

    // 실제 파일 저장
    private PlanNetFile saveFile(MultipartFile upFile){
        File folder = new File(filePath);

        if(folder.exists() == false){
            // 폴더 생성
            folder.mkdir();
        }
        System.out.println("savePath : " + filePath);

        String originalFileName = upFile.getOriginalFilename();
        String fileName = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmssSSS"));
        fileName += originalFileName.substring(originalFileName.lastIndexOf("."));
        String fileNamePath = filePath + "/" + fileName;
        int fileSize = (int) upFile.getSize();

        try{
            // 실제 파일 저장
            upFile.transferTo(new File(fileNamePath));
        } catch(Exception e) {
            return null;
        }

        return convertFileVo(originalFileName, fileName, fileSize);
    }

    // 파일 저장
    public PlanNetFile insertFile(MultipartFile upFile, String pType, int pNo){
        // 실제 파일 저장
        PlanNetFile planNetFile = saveFile(upFile);
        int upFileRes = 0;

        if (planNetFile != null) {
            planNetFile.setPType(pType);
            planNetFile.setPNo(pNo);

            // 파일 정보 DB 저장
            upFileRes = mapper.insertFile(planNetFile);
        }
        return upFileRes > 0 ? planNetFile : null;
    }

    // 파일 수정
    public PlanNetFile updateFile(MultipartFile upFile, PlanNetFile planNetFile, String pType, int pNo){
        // 실제 파일 삭제
        boolean delRes = deleteFile(filePath + planNetFile.getFileName());
        PlanNetFile updateFileVo = null;

        if (delRes){
            // 파일 정보 DB 삭제
            int updateFileRes = mapper.deleteFile(planNetFile.getFNO());
            if (updateFileRes > 0) {
                // 파일 저장
                updateFileVo = insertFile(upFile, pType, pNo);
            }
        }

        return updateFileVo;
    }

    // 실제 파일 삭제
    private boolean deleteFile(String filePath){
        File file = new File(filePath);
        if(file.exists()){
            return file.delete();
        }
        return false;
    }

    // 파일 객체 값 초기화 및 생성
    private PlanNetFile convertFileVo (String orgFileNm, String fileNm, int fileSize) {
        PlanNetFile planNetFile = new PlanNetFile();
        planNetFile.setOriginalFileName(orgFileNm);
        planNetFile.setFileName(fileNm);
        planNetFile.setFileSize(fileSize);

        return planNetFile;
    }
}
