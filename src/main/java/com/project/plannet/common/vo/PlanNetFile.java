package com.project.plannet.common.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlanNetFile {
    private int fNO;
    private int pNo;
    private String originalFileName;
    private String fileName;
    private String filePath;
    private int fileSize;
    private String pType;
}
