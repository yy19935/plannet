-- 스키마 생성
CREATE SCHEMA plannet;
-- 스키마 사용
USE plannet;

-- 회원
CREATE TABLE MEMBER (
	M_NO int auto_increment,
	SNS_ID varchar(20) NOT NULL,
	NICkNAME varchar(16),
	STATUS_MSG varchar(100),
	JOIN_DATE datetime NOT NULL default current_timestamp,
	WITHD_DATE datetime	NULL,
    constraint PK_M_NO primary key (M_NO)
);

-- 카테고리
CREATE TABLE CATEGORY (
	C_NO int auto_increment,
	M_NO int,
	CATEGORY_NM varchar(50)	NOT NULL,
    constraint PK_C_NO primary key (C_NO),
    constraint FK_M_NO foreign key (M_NO) references member (M_NO) on delete set null
);

-- 블로그
CREATE TABLE BLOG (
	B_NO int auto_increment,
	M_NO int,
	C_NO int,
	TITLE varchar(100)	NOT NULL,
	CONTENTS varchar(2000)	NOT NULL,
	REG_DATE datetime NOT NULL default current_timestamp,
	MOD_DATE datetime NOT NULL default current_timestamp,
    constraint PK_B_NO primary key (B_NO),
    constraint FK_B_M_NO foreign key (M_NO) references member (M_NO) on delete set null,
    constraint FK_B_C_NO foreign key (C_NO) references category (C_NO) on delete set null
);

-- 스케줄
CREATE TABLE SCHEDULE (
	SD_NO int auto_increment,
	M_NO int NOT NULL,
	SD_START_DATE datetime NOT NULL,
	SD_END_DATE datetime NOT NULL,
	REG_DATE datetime NOT NULL default current_timestamp,
	MOD_DATE datetime NOT NULL default current_timestamp,
 constraint PK_SD_NO primary key (SD_NO),
 constraint FK_SD_M_NO foreign key (M_NO) references member (M_NO) on delete cascade
);

-- 스케줄 상세
CREATE TABLE SCHEDULE_DETAIL (
	SDD_NO int auto_increment,
	SD_NO int NOT NULL,
	C_NO int NOT NULL,
	MEMO varchar(100)	NOT NULL,
	TIME_RECORD_STATUS varchar(8) NOT NULL,
	STUDY_TIME int NULL,
	SD_SUCCESS_STATUS varchar(8) NULL,
	REG_DATE datetime NOT NULL default current_timestamp,
	MOD_DATE datetime NOT NULL default current_timestamp,
   constraint PK_SDD_NO primary key (SDD_NO),
   constraint FK_SDD_SD_NO foreign key (SD_NO) references schedule (SD_NO) on delete cascade,
   constraint FK_SDD_C_NO foreign key (C_NO) references category (C_NO) on delete cascade
);

-- 스터디그룹
CREATE TABLE STUDY_GROUP (
	SG_NO int auto_increment,
	M_NO int,
	GROUP_NM varchar(20) NOT NULL,
	GROUP_DESC varchar(100)	NOT NULL,
	SG_CATEGORY varchar(8)	NOT NULL,
	MEMBER_CNT int	NOT NULL,
	READ_CNT int NULL,
	CREATE_DATE datetime NOT NULL default current_timestamp,
	MOD_DATE datetime NOT NULL default current_timestamp,
	DELETE_DATE datetime NULL,
    constraint PK_SG_NO primary key (SG_NO),
    constraint FK_SG_M_NO foreign key (M_NO) references member (M_NO) on delete set null
);

-- 스터디그룹 스크랩
CREATE TABLE STUDY_GROUP_SCRAP (
	SG_NO int,
	M_NO int,
    constraint PK_SGC_NO primary key (SG_NO, M_NO),
    constraint FK_SGC_SG_NO foreign key (SG_NO) references study_group (SG_NO) on delete cascade,
    constraint FK_SGC_M_NO foreign key (M_NO) references member (M_NO) on delete cascade
);

-- 스터디그룹 가입신청 내역
CREATE TABLE STUDY_GROUP_JOIN_REQ (
	SG_NO int,
	M_NO int,
	JOIN_STATUS varchar(8) NOT NULL,
 constraint PK_SGJ_NO primary key (SG_NO, M_NO),
 constraint FK_SGJ_SG_NO foreign key (SG_NO) references study_group (SG_NO) on delete cascade,
 constraint FK_SGJ_M_NO foreign key (M_NO) references member (M_NO) on delete cascade
);

-- 사용자별 스터디그룹
CREATE TABLE USER_STUDY_GROUP (
	SG_NO int,
	M_NO int,
   constraint PK_USG_NO primary key (SG_NO, M_NO),
   constraint FK_USG_SG_NO foreign key (SG_NO) references study_group (SG_NO) on delete cascade,
   constraint FK_USG_M_NO foreign key (M_NO) references member (m_NO) on delete cascade
);

-- 미션
CREATE TABLE MISSION (
	MS_NO int auto_increment,
	SG_NO int NOT NULL,
	MS_TITLE varchar(100) NOT NULL,
	MS_CONTENTS varchar(2000) NOT NULL,
	MS_START_DATE datetime NOT NULL default current_timestamp,
	MS_END_DATE datetime NOT NULL default current_timestamp,
	MS_STATUS varchar(8) NOT NULL,
    constraint PK_MS_NO primary key (MS_NO),
    constraint FK_MS_SG_NO foreign key (SG_NO) references study_group (SG_NO) on delete cascade
);

-- 미션인증
CREATE TABLE MISSION_CONFIRM (
	MSC_NO int auto_increment,
    MS_NO int NOT NULL,
    M_NO int NOT NULL,
	MC_CONTENTS varchar(2000) NULL,
	STAR_RATING int	NULL,
	CON_STATUS varchar(8) NOT NULL,
	constraint PK_MSC_NO primary key (MSC_NO),
	constraint FK_MC_MS_NO foreign key (MS_NO) references mission (MS_NO) on delete cascade,
 constraint FK_MC_M_NO foreign key (M_NO) references member (M_NO) on delete cascade
);

-- 미션인증 파일
CREATE TABLE MISSION_CONFIRM_FILE (
	MSC_NO int,
	ORIGINAL_FILE_NM varchar(200) NOT NULL,
	FILE_NM varchar(200) NOT NULL,
	FILE_PATH text NOT NULL,
	FILE_SIZE int NOT NULL,
    constraint PK_MSC_F_NO primary key (MSC_NO),
    constraint FK_MSC_F_NO foreign key (MSC_NO) references mission_confirm (MSC_NO) on delete cascade
);

-- 파일
CREATE TABLE FILE (
	F_NO int auto_increment,
	P_NO int NOT NULL,
	ORIGINAL_FILE_NM varchar(200) NOT NULL,
	FILE_NM varchar(200) NOT NULL,
	FILE_PATH text NOT NULL,
	FILE_SIZE int NOT NULL,
  constraint PK_F_NO primary key (F_NO)
);
alter TABLE FILE ADD COLUMN P_TYPE varchar(2) NOT NULL;

-- 공통 코드
CREATE TABLE COMMON_CODE (
	PN_CODE varchar(8) NOT NULL,
	PN_TEXT varchar(20) NOT NULL,
 constraint PK_CODE primary key (PN_CODE)
);

-- 공통 코드 값 !쿼리를 돌려서 값을 넣어주세요!
insert into common_code (pn_code, pn_text) values ('REQ', '신청');
insert into common_code (pn_code, pn_text) values ('REJ', '거절');
insert into common_code (pn_code, pn_text) values ('WITHD', '탈퇴');
insert into common_code (pn_code, pn_text) values ('EXPULS', '추방');
insert into common_code (pn_code, pn_text) values ('EMP', '취업');
insert into common_code (pn_code, pn_text) values ('ENT_EX', '입시');
insert into common_code (pn_code, pn_text) values ('STA_EX', '국가고시');
insert into common_code (pn_code, pn_text) values ('CERTIFI', '자격증');
insert into common_code (pn_code, pn_text) values ('IT', 'it');
insert into common_code (pn_code, pn_text) values ('END', '종료');
insert into common_code (pn_code, pn_text) values ('APPR', '승인');
insert into common_code (pn_code, pn_text) values ('NOT_APPR', '미승인');
insert into common_code (pn_code, pn_text) values ('BEF_REC', '기록전');
insert into common_code (pn_code, pn_text) values ('PAUSE', '일시정지');
insert into common_code (pn_code, pn_text) values ('END_REC', '종료');
insert into common_code (pn_code, pn_text) values ('SUCCESS', '성공');
insert into common_code (pn_code, pn_text) values ('FAIL', '실패');

