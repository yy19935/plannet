package com.project.plannet.studygroup.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudyGroup {
    private int studyGroupNo;
    private int memberNo;
    private String nickname;
    private String groupName;
    private String groupDesc;
    private String groupCategory;
    private int memberCnt;
    private int readCnt;
    private Date createDate;
    private Date modDate;
    private Date deleteDate;
}
