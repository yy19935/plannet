package com.project.plannet.member.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Member {
    private int memberNo;
    private String snsId;
    private String nickname;
    private String statusMsg;
    private Date joinDate;
    private Date withdDate;
    private Boolean isMember; // true - 회원, false - 비회원 (가입)
}
