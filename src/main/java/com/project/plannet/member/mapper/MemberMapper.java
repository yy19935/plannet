package com.project.plannet.member.mapper;

import com.project.plannet.member.vo.Member;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MemberMapper {
    Member selectMemberBySnsId(String snsId);
    int insertMemberByKakao(Member member);
    int updateMember(Member member);
    Member selectMemberByMNo(int memberNo);
}
