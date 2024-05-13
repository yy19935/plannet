package com.project.plannet.common.service;

import com.project.plannet.common.mapper.FileMapper;
import com.project.plannet.common.vo.PlanNetFile;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@RequiredArgsConstructor
public class FileService {

    private final FileMapper mapper;

//    final static private String filePath = "C:\\planNetFile";
    final static private String filePath = "/Users/kimjoohwan/Desktop/etc/";

    // 실제 파일 저장
    private PlanNetFile saveFile(MultipartFile upFile){
        File folder = new File(filePath);

        if(!folder.exists()){
            // 폴더 생성
            folder.mkdir();
        }
        System.out.println("savePath : " + filePath);

        String originalFileName = upFile.getOriginalFilename();
        String fileName = makeUUID(originalFileName);
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

    // 파일 조회
    public PlanNetFile selectFile(int pNo, String pType) {
        Map<String, Object> fileParams = new HashMap<String, Object>();

        fileParams.put("pNo", pNo);
        fileParams.put("pType", pType);

        return mapper.selectFile(fileParams);
    }

    // 파일 저장
    public int insertFile(MultipartFile upFile, String pType, int pNo){
        // 실제 파일 저장
        PlanNetFile planNetFile = saveFile(upFile);
        int upFileRes = 0;

        if (planNetFile != null) {
            planNetFile.setPType(pType);
            planNetFile.setPNo(pNo);

            // 파일 정보 DB 저장
            upFileRes = mapper.insertFile(planNetFile);
        }
        return upFileRes;
    }

    // 다중 파일 저장
    public int insertFiles(List<MultipartFile> upFiles, String pType, int pNo) {
        List<PlanNetFile> files = new ArrayList<>();
        int upFilesRes = 0;

        for (MultipartFile upFile : upFiles) {
            // 실제 파일 저장
            PlanNetFile uploadRes = saveFile(upFile);
            assert uploadRes != null;
            uploadRes.setPType(pType);
            uploadRes.setPNo(pNo);

            files.add(uploadRes);
        }

        if (upFiles.size() == files.size()) {
            // 파일 정보 DB 저장
            upFilesRes = mapper.insertFiles(files);
        }

        return upFilesRes;
    }

    // 파일 수정
    public int updateFile(MultipartFile upFile, PlanNetFile planNetFile, String pType, int pNo){
        // 실제 파일 삭제
        boolean delRes = deleteFile(filePath + "/" + planNetFile.getFileName());
        int updateFileCnt = 0;

        if (delRes){
            // 파일 정보 DB 삭제
            int updateFileRes = mapper.deleteFile(planNetFile.getFNo());
            if (updateFileRes > 0) {
                // 파일 저장
                updateFileCnt = insertFile(upFile, pType, pNo);
            }
        }

        return updateFileCnt;
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
        planNetFile.setFilePath(filePath);

        return planNetFile;
    }

    private String makeUUID(String fileNm){
        String uuid = UUID.randomUUID().toString().replaceAll("-", "");
        String extension = StringUtils.getFilenameExtension(fileNm);
        return uuid + "." + extension;
    }
}
