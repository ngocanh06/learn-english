-- ======================================================================================
-- DATABASE: EnglishMasteryDB
-- SYSTEM: HỆ THỐNG CƠ SỞ DỮ LIỆU TOÀN DIỆN (MICROSOFT SQL SERVER)
-- NỘI DUNG: NGỮ PHÁP 115 BÀI, TỪ VỰNG PART 1-7, VIDEO SHADOWING, LỘ TRÌNH 4 KỸ NĂNG & TOEIC
-- TƯƠNG THÍCH: SQL Server 2016 / 2017 / 2019 / 2022 / Azure SQL Database
-- CREATED AT: 2026-08-27T04:21:13.844Z
-- ======================================================================================

IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'EnglishMasteryDB')
BEGIN
    CREATE DATABASE [EnglishMasteryDB];
END
GO

USE [EnglishMasteryDB];
GO

-- --------------------------------------------------------------------------------------
-- 1. BẢNG NGƯỜI DÙNG & TIẾN ĐỘ TỔNG QUAN (Users)
-- --------------------------------------------------------------------------------------
IF OBJECT_ID('dbo.UserGrammarProgress', 'U') IS NOT NULL DROP TABLE dbo.UserGrammarProgress;
IF OBJECT_ID('dbo.UserVocabProgress', 'U') IS NOT NULL DROP TABLE dbo.UserVocabProgress;
IF OBJECT_ID('dbo.Users', 'U') IS NOT NULL DROP TABLE dbo.Users;

CREATE TABLE dbo.Users (
    UserID INT IDENTITY(1,1) PRIMARY KEY,
    Username NVARCHAR(100) NOT NULL,
    Email NVARCHAR(255) NULL,
    DailyDictationUID NVARCHAR(50) NULL,
    TargetScore NVARCHAR(50) DEFAULT N'650-800',
    DailyMinutesGoal INT DEFAULT 45,
    TargetWeeks INT DEFAULT 8,
    CurrentStreak INT DEFAULT 1,
    TotalMinutesStudied INT DEFAULT 0,
    CreatedAt DATETIME2 DEFAULT SYSUTCDATETIME()
);
GO

-- --------------------------------------------------------------------------------------
-- 2. BẢNG 16 CHUYÊN ĐỀ NGỮ PHÁP LỚN (GrammarClusters)
-- --------------------------------------------------------------------------------------
IF OBJECT_ID('dbo.GrammarQuizzes', 'U') IS NOT NULL DROP TABLE dbo.GrammarQuizzes;
IF OBJECT_ID('dbo.GrammarLessons', 'U') IS NOT NULL DROP TABLE dbo.GrammarLessons;
IF OBJECT_ID('dbo.GrammarClusters', 'U') IS NOT NULL DROP TABLE dbo.GrammarClusters;

CREATE TABLE dbo.GrammarClusters (
    ClusterID INT IDENTITY(1,1) PRIMARY KEY,
    ClusterCode NVARCHAR(50) NOT NULL UNIQUE,
    Title NVARCHAR(255) NOT NULL,
    Icon NVARCHAR(50) NULL,
    Description NVARCHAR(500) NULL,
    DisplayOrder INT DEFAULT 1
);
GO

-- --------------------------------------------------------------------------------------
-- 3. BẢNG 115 BÀI HỌC NGỮ PHÁP CON (GrammarLessons)
-- --------------------------------------------------------------------------------------
CREATE TABLE dbo.GrammarLessons (
    LessonID INT IDENTITY(1,1) PRIMARY KEY,
    ClusterCode NVARCHAR(50) NULL,
    CatalogID NVARCHAR(20) NOT NULL UNIQUE,
    Title NVARCHAR(255) NOT NULL,
    Subtitle NVARCHAR(255) NULL,
    Category NVARCHAR(100) NULL,
    DisplayOrder INT DEFAULT 1,
    FOREIGN KEY (ClusterCode) REFERENCES dbo.GrammarClusters(ClusterCode)
);
GO

-- --------------------------------------------------------------------------------------
-- 4. BẢNG CÂU HỎI TRẮC NGHIỆM NGỮ PHÁP (GrammarQuizzes)
-- --------------------------------------------------------------------------------------
CREATE TABLE dbo.GrammarQuizzes (
    QuizID INT IDENTITY(1,1) PRIMARY KEY,
    CatalogID NVARCHAR(20) NOT NULL,
    Question NVARCHAR(MAX) NOT NULL,
    OptionA NVARCHAR(500) NOT NULL,
    OptionB NVARCHAR(500) NOT NULL,
    OptionC NVARCHAR(500) NULL,
    OptionD NVARCHAR(500) NULL,
    CorrectIndex INT NOT NULL,
    Explanation NVARCHAR(MAX) NULL,
    FOREIGN KEY (CatalogID) REFERENCES dbo.GrammarLessons(CatalogID)
);
GO

-- --------------------------------------------------------------------------------------
-- 5. BẢNG TỪ VỰNG TOEIC THEO PART & CHỦ ĐỀ (Vocabulary)
-- --------------------------------------------------------------------------------------
IF OBJECT_ID('dbo.Vocabulary', 'U') IS NOT NULL DROP TABLE dbo.Vocabulary;
CREATE TABLE dbo.Vocabulary (
    VocabID INT IDENTITY(1,1) PRIMARY KEY,
    Word NVARCHAR(150) NOT NULL,
    WordType NVARCHAR(50) NULL,
    IPA NVARCHAR(150) NULL,
    MeaningVI NVARCHAR(500) NOT NULL,
    ExampleEN NVARCHAR(MAX) NULL,
    ExampleVI NVARCHAR(MAX) NULL,
    PartCode NVARCHAR(50) NOT NULL,
    LevelTag NVARCHAR(50) DEFAULT 'B1',
    SourceTag NVARCHAR(100) DEFAULT 'TOEIC-Study4'
);
GO

-- --------------------------------------------------------------------------------------
-- 6. BẢNG VIDEO & PHỤ ĐỀ SONG NGỮ (VideoLessons & VideoSubtitles)
-- --------------------------------------------------------------------------------------
IF OBJECT_ID('dbo.VideoSubtitles', 'U') IS NOT NULL DROP TABLE dbo.VideoSubtitles;
IF OBJECT_ID('dbo.VideoLessons', 'U') IS NOT NULL DROP TABLE dbo.VideoLessons;
IF OBJECT_ID('dbo.VideoChannels', 'U') IS NOT NULL DROP TABLE dbo.VideoChannels;

CREATE TABLE dbo.VideoChannels (
    ChannelCode NVARCHAR(50) PRIMARY KEY,
    ChannelName NVARCHAR(150) NOT NULL,
    Badge NVARCHAR(50) NULL,
    Subscribers NVARCHAR(50) NULL,
    Description NVARCHAR(500) NULL
);
GO

CREATE TABLE dbo.VideoLessons (
    VideoCode NVARCHAR(50) PRIMARY KEY,
    ChannelCode NVARCHAR(50) NOT NULL,
    YouTubeID NVARCHAR(50) NOT NULL,
    Title NVARCHAR(255) NOT NULL,
    Category NVARCHAR(100) NULL,
    LevelTag NVARCHAR(50) DEFAULT 'B2',
    Duration NVARCHAR(20) NULL,
    Description NVARCHAR(MAX) NULL,
    FOREIGN KEY (ChannelCode) REFERENCES dbo.VideoChannels(ChannelCode)
);
GO

CREATE TABLE dbo.VideoSubtitles (
    SubtitleID INT IDENTITY(1,1) PRIMARY KEY,
    VideoCode NVARCHAR(50) NOT NULL,
    SentenceOrder INT NOT NULL,
    StartTimeSec FLOAT NOT NULL,
    EndTimeSec FLOAT NOT NULL,
    EnglishText NVARCHAR(MAX) NOT NULL,
    VietnameseText NVARCHAR(MAX) NOT NULL,
    IPAPhonetics NVARCHAR(MAX) NULL,
    FOREIGN KEY (VideoCode) REFERENCES dbo.VideoLessons(VideoCode)
);
GO

-- --------------------------------------------------------------------------------------
-- 7. BẢNG LỘ TRÌNH HỌC XEN KẼ ĐA NGUỒN (MultiSkillRoadmap)
-- --------------------------------------------------------------------------------------
IF OBJECT_ID('dbo.MultiSkillRoadmap', 'U') IS NOT NULL DROP TABLE dbo.MultiSkillRoadmap;
CREATE TABLE dbo.MultiSkillRoadmap (
    TaskID INT IDENTITY(1,1) PRIMARY KEY,
    TrackCode NVARCHAR(50) NOT NULL,
    DayNumber INT NULL,
    Skill NVARCHAR(50) NOT NULL,
    TaskTitle NVARCHAR(500) NOT NULL,
    SourcePlatform NVARCHAR(150) NULL,
    EstDurationMinutes INT DEFAULT 20,
    LevelTag NVARCHAR(50) DEFAULT 'B1'
);
GO

-- --------------------------------------------------------------------------------------
-- 8. BẢNG THEO DÕI TIẾN ĐỘ HỌC CỦA NGƯỜI DÙNG (UserStudyProgress)
-- --------------------------------------------------------------------------------------
CREATE TABLE dbo.UserGrammarProgress (
    ProgressID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT NOT NULL,
    CatalogID NVARCHAR(20) NOT NULL,
    IsRemembered BIT DEFAULT 0,
    IsFavorite BIT DEFAULT 0,
    BestScore INT DEFAULT 0,
    UpdatedAt DATETIME2 DEFAULT SYSUTCDATETIME(),
    FOREIGN KEY (UserID) REFERENCES dbo.Users(UserID),
    FOREIGN KEY (CatalogID) REFERENCES dbo.GrammarLessons(CatalogID)
);
GO

CREATE TABLE dbo.UserVocabProgress (
    ProgressID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT NOT NULL,
    Word NVARCHAR(150) NOT NULL,
    IsMastered BIT DEFAULT 0,
    IsStarred BIT DEFAULT 0,
    UpdatedAt DATETIME2 DEFAULT SYSUTCDATETIME(),
    FOREIGN KEY (UserID) REFERENCES dbo.Users(UserID)
);
GO

-- ======================================================================================
-- 9. NẠP DỮ LIỆU BAN ĐẦU (SEED DATA TOÀN BỘ HỆ THỐNG)
-- ======================================================================================

-- 9.1 Thông tin tài khoản người dùng
INSERT INTO dbo.Users (Username, Email, DailyDictationUID, TargetScore, DailyMinutesGoal, CurrentStreak)
VALUES (N'Trần Thị Ngọc Anh', N'ngocanh@example.com', N'#262700', N'650-800', 45, 3);
GO

-- 9.2 Nạp 16 Chuyên Đề Ngữ Pháp Lớn
INSERT INTO dbo.GrammarClusters (ClusterCode, Title, Icon, Description, DisplayOrder) VALUES (N'c1-tobe', N'1. Động Từ To Be & Chủ Ngữ Giả', N'fa-cube', N'Am/is/are, Was/were, There is/are và cấu trúc chủ ngữ giả It/There', 1);
INSERT INTO dbo.GrammarClusters (ClusterCode, Title, Icon, Description, DisplayOrder) VALUES (N'c2-nouns', N'2. Danh Từ, Đại Từ & Danh Động Từ', N'fa-shapes', N'Phân loại danh từ, đếm được/không đếm được, số nhiều bất quy tắc, đại từ & V-ing', 2);
INSERT INTO dbo.GrammarClusters (ClusterCode, Title, Icon, Description, DisplayOrder) VALUES (N'c3-verbs', N'3. Hệ Thống Động Từ & Hòa Hợp S-V', N'fa-bolt', N'Động từ nguyên mẫu (To-V/V-bare), phân từ, trợ động từ, nội/ngoại động từ & quy tắc S-V', 3);
INSERT INTO dbo.GrammarClusters (ClusterCode, Title, Icon, Description, DisplayOrder) VALUES (N'c4-modal', N'4. Động Từ Khuyết Thiếu (Modal Verbs)', N'fa-key', N'Can, could, may, might, must, should, have to & các dạng suy đoán nâng cao', 4);
INSERT INTO dbo.GrammarClusters (ClusterCode, Title, Icon, Description, DisplayOrder) VALUES (N'c5-tenses', N'5. Trọn Bộ 12 Thì Tiếng Anh & So Sánh Thì', N'fa-clock-rotate-left', N'Hệ thống toàn diện từ Hiện tại đơn, Tiếp diễn, Hoàn thành đến Quá khứ & Tương lai', 5);
INSERT INTO dbo.GrammarClusters (ClusterCode, Title, Icon, Description, DisplayOrder) VALUES (N'c6-passive', N'6. Câu Bị Động Toàn Diện (Passive Voice)', N'fa-shield-halved', N'Cấu trúc bị động chuẩn 12 thì, bị động với Modal Verbs & các trường hợp đặc biệt', 6);
INSERT INTO dbo.GrammarClusters (ClusterCode, Title, Icon, Description, DisplayOrder) VALUES (N'c7-wishes', N'7. Trọn Bộ Câu Điều Ước (Wishes Master)', N'fa-wand-magic-sparkles', N'Câu ước loại 1 (Tương lai), loại 2 (Hiện tại) và loại 3 (Quá khứ / Nuối tiếc)', 7);
INSERT INTO dbo.GrammarClusters (ClusterCode, Title, Icon, Description, DisplayOrder) VALUES (N'c8-conditionals', N'8. Câu Điều Kiện & Đảo Ngữ Điều Kiện', N'fa-code-branch', N'Câu điều kiện loại 1, 2, 3, hỗn hợp, đảo ngữ điều kiện & các cấu trúc đặc biệt', 8);
INSERT INTO dbo.GrammarClusters (ClusterCode, Title, Icon, Description, DisplayOrder) VALUES (N'c9-comparisons', N'9. Toàn Bộ Cấu Trúc So Sánh', N'fa-chart-simple', N'So sánh bằng, hơn, hơn nhất, so sánh kép (Càng... Càng), bội số & tính từ bất quy tắc', 9);
INSERT INTO dbo.GrammarClusters (ClusterCode, Title, Icon, Description, DisplayOrder) VALUES (N'c10-relative', N'10. Mệnh Đề Quan Hệ & Rút Gọn Mệnh Đề', N'fa-link', N'Đại từ/Trạng từ quan hệ (Who/Whom/Which/Where...) & kỹ thuật rút gọn mệnh đề', 10);
INSERT INTO dbo.GrammarClusters (ClusterCode, Title, Icon, Description, DisplayOrder) VALUES (N'c11-reported', N'11. Câu Tường Thuật / Gián Tiếp (Reported Speech)', N'fa-comments', N'Quy tắc lùi thì, đổi ngôi, câu trần thuật gián tiếp, câu hỏi và câu mệnh lệnh gián tiếp', 11);
INSERT INTO dbo.GrammarClusters (ClusterCode, Title, Icon, Description, DisplayOrder) VALUES (N'c12-sentence-types', N'12. Câu Hỏi Đuôi, Câu Mệnh Lệnh & Cảm Thán', N'fa-circle-question', N'Câu hỏi đuôi (công thức & trường hợp đặc biệt), câu cảm thán, câu nhấn mạnh & đảo ngữ', 12);
INSERT INTO dbo.GrammarClusters (ClusterCode, Title, Icon, Description, DisplayOrder) VALUES (N'c13-rewriting', N'13. Trọn Bộ Công Thức Viết Lại Câu (Part 1 - 4)', N'fa-pen-to-square', N'4 phần công thức viết lại câu kinh điển trong các đề thi tiếng Anh & TOEIC', 13);
INSERT INTO dbo.GrammarClusters (ClusterCode, Title, Icon, Description, DisplayOrder) VALUES (N'c14-adj-adv', N'14. Tính Từ, Trạng Từ & Trật Tự OpSASCOMP', N'fa-arrow-down-a-z', N'Vị trí tính/trạng từ, tính từ đuôi -ing/-ed, tính từ ghép & trật tự tính từ trước danh từ', 14);
INSERT INTO dbo.GrammarClusters (ClusterCode, Title, Icon, Description, DisplayOrder) VALUES (N'c15-preps-connectors', N'15. Giới Từ, Liên Từ, Cụm Động Từ & Thành Ngữ', N'fa-signs-post', N'Giới từ in/at/on, liên từ đẳng lập/phụ thuộc, phrasal verbs, collocations & câu đồng tình', 15);
INSERT INTO dbo.GrammarClusters (ClusterCode, Title, Icon, Description, DisplayOrder) VALUES (N'c16-pronunciation', N'16. Ngữ Âm, Trọng Âm & Quy Tắc Phát Âm', N'fa-volume-high', N'Quy tắc đánh trọng âm từ 2-3 âm tiết, cách phát âm đuôi "s/es" và đuôi "ed" chuẩn bản ngữ', 16);
GO

-- 9.3 Nạp 115 Bài Học Ngữ Pháp Chi Tiết
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c1-tobe', N'1', N'Articles (A, An, The)', N'Mạo từ (A, An, The)', N'Mạo từ', 1);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c1-tobe', N'2', N'Am, is, are', N'Động từ to be ở hiện tại', N'Động từ To Be', 2);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c1-tobe', N'3', N'Were, Was', N'Động từ to be ở quá khứ', N'Động từ To Be', 3);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c1-tobe', N'4', N'There is/are, There was/were', N'Cấu trúc tồn tại Có... / Đã có...', N'Cấu trúc câu', 4);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c1-tobe', N'5', N'Pseudo-subject "It/There"', N'Chủ ngữ giả "It/There"', N'Chủ ngữ giả', 5);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c2-nouns', N'6', N'Nouns', N'Tổng quan danh từ trong tiếng Anh', N'Danh từ', 6);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c2-nouns', N'7', N'Plural Nouns', N'Quy tắc chuyển danh từ số nhiều', N'Danh từ', 7);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c2-nouns', N'8', N'Gerunds', N'Danh động từ (V-ing) & vị trí đứng', N'Danh động từ', 8);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c2-nouns', N'9', N'Pronouns', N'Đại từ nhân xưng, tân ngữ & sở hữu', N'Đại từ', 9);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c3-verbs', N'10', N'Verbs', N'Tổng quan động từ & các dạng', N'Động từ', 10);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c3-verbs', N'11', N'Infinitives', N'Động từ nguyên mẫu To-V & V-bare', N'Động từ nguyên mẫu', 11);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c4-modal', N'12', N'Modal Verbs', N'Động từ khuyết thiếu cơ bản', N'Động từ khuyết thiếu', 12);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c15-preps-connectors', N'13', N'Commonly used prepositions In, At, On', N'Giới từ hay dùng In, At, On', N'Giới từ', 13);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c12-sentence-types', N'14', N'Imperative Sentences', N'Câu mệnh lệnh & yêu cầu', N'Câu mệnh lệnh', 14);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c12-sentence-types', N'15', N'Question Tag', N'Quy tắc thành lập câu hỏi đuôi', N'Câu hỏi đuôi', 15);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c5-tenses', N'16', N'Simple present tense with the verb to be', N'Thì hiện tại đơn với động từ to be', N'Các Thì', 16);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c5-tenses', N'17', N'Simple present tense with regular verbs', N'Thì hiện tại đơn với động từ thường', N'Các Thì', 17);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c5-tenses', N'18', N'Present continuous', N'Thì hiện tại tiếp diễn', N'Các Thì', 18);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c5-tenses', N'19', N'Compare the present simple and the present continuous', N'Phân biệt Hiện tại đơn & Tiếp diễn', N'So sánh thì', 19);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c5-tenses', N'20', N'Simple past', N'Thì quá khứ đơn', N'Các Thì', 20);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c5-tenses', N'21', N'Past continuous', N'Thì quá khứ tiếp diễn', N'Các Thì', 21);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c5-tenses', N'22', N'Compare the past simple and past continuous', N'Phân biệt Quá khứ đơn & Quá khứ tiếp diễn', N'So sánh thì', 22);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c5-tenses', N'23', N'Simple future tense', N'Thì tương lai đơn (Will + V)', N'Các Thì', 23);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c5-tenses', N'24', N'Future expressions', N'Các cách diễn đạt tương lai (Be going to...)', N'Các Thì', 24);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c12-sentence-types', N'25', N'Emphatic words', N'Từ nhấn mạnh trong câu', N'Cấu trúc câu', 25);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c3-verbs', N'26', N'Auxiliary verbs', N'Trợ động từ Do/Does/Did/Have/Be', N'Trợ động từ', 26);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c3-verbs', N'27', N'Subject and Verb Agreement', N'Quy tắc hòa hợp Chủ ngữ & Động từ', N'Hòa hợp S-V', 27);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c3-verbs', N'28', N'Regular and Irregular Verbs', N'Động từ có quy tắc và bất quy tắc', N'Động từ', 28);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c14-adj-adv', N'29', N'Adjectives', N'Tính từ & vị trí trong câu', N'Tính từ', 29);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c14-adj-adv', N'30', N'Adverbs', N'Trạng từ & cách thành lập', N'Trạng từ', 30);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c14-adj-adv', N'31', N'Adjectives and Adverbs', N'Phân biệt Tính từ và Trạng từ', N'Tính & Trạng từ', 31);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c2-nouns', N'32', N'Interrogative Pronouns', N'Đại từ nghi vấn (Who, Whom, Whose, Which...)', N'Đại từ nghi vấn', 32);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c10-relative', N'33', N'Relative Pronoun', N'Đại từ quan hệ Who, Whom, Which, That', N'Mệnh đề quan hệ', 33);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c14-adj-adv', N'34', N'Adjectives as Nouns', N'Tính từ dùng như danh từ (The + Adj)', N'Tính từ đặc biệt', 34);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c1-tobe', N'35', N'Sentence Patterns', N'5 Mẫu câu cơ bản trong tiếng Anh', N'Cấu trúc câu', 35);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c11-reported', N'36', N'Reported Speech', N'Câu gián tiếp & quy tắc lùi thì', N'Câu gián tiếp', 36);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c8-conditionals', N'37', N'Conditional Sentences', N'Tổng quan câu điều kiện If', N'Câu điều kiện', 37);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c6-passive', N'38', N'Passive Voice', N'Tổng quan câu bị động', N'Câu bị động', 38);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c11-reported', N'39', N'Narration', N'Tường thuật lại lời nói & sự việc', N'Tường thuật', 39);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c9-comparisons', N'40', N'Mixed Comparisons', N'So sánh hỗn hợp & tổng hợp', N'So sánh', 40);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c10-relative', N'41', N'Relative Clauses', N'Mệnh đề quan hệ xác định & không xác định', N'Mệnh đề quan hệ', 41);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c15-preps-connectors', N'42', N'Conjunctions', N'Liên từ đẳng lập & phụ thuộc', N'Liên từ', 42);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c15-preps-connectors', N'43', N'Phrasal verbs', N'Cụm động từ thông dụng', N'Cụm động từ', 43);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c3-verbs', N'44', N'Participle Phrases', N'Cụm phân từ hiện tại (V-ing) & quá khứ (V-ed)', N'Phân từ', 44);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c15-preps-connectors', N'45', N'Measures', N'Từ chỉ số lượng & đo lường', N'Đo lường', 45);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c3-verbs', N'46', N'Verbal', N'Các dạng biến đổi của động từ', N'Dạng động từ', 46);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c5-tenses', N'47', N'Present simple', N'Thì hiện tại đơn (Tổng kết)', N'Các Thì', 47);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c5-tenses', N'48', N'Present continuous', N'Thì hiện tại tiếp diễn (Tổng kết)', N'Các Thì', 48);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c5-tenses', N'49', N'Present perfect', N'Thì hiện tại hoàn thành (Have/Has + V3)', N'Các Thì', 49);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c5-tenses', N'50', N'Present perfect continuous', N'Thì hiện tại hoàn thành tiếp diễn', N'Các Thì', 50);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c5-tenses', N'51', N'Simple past', N'Thì quá khứ đơn (Tổng kết)', N'Các Thì', 51);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c5-tenses', N'52', N'Past continuous', N'Thì quá khứ tiếp diễn (Tổng kết)', N'Các Thì', 52);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c5-tenses', N'53', N'Past perfect', N'Thì quá khứ hoàn thành (Had + V3)', N'Các Thì', 53);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c5-tenses', N'54', N'Past perfect continuous', N'Thì quá khứ hoàn thành tiếp diễn', N'Các Thì', 54);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c5-tenses', N'55', N'Simple future', N'Thì tương lai đơn (Tổng kết)', N'Các Thì', 55);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c5-tenses', N'56', N'Future continuous', N'Thì tương lai tiếp diễn (Will be + V-ing)', N'Các Thì', 56);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c5-tenses', N'57', N'Future perfect', N'Thì tương lai hoàn thành (Will have + V3)', N'Các Thì', 57);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c5-tenses', N'58', N'Future perfect continuous', N'Thì tương lai hoàn thành tiếp diễn', N'Các Thì', 58);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c6-passive', N'59', N'Passive Voice (Grammar Structure)', N'Cấu trúc câu bị động chuẩn 12 thì', N'Câu bị động', 59);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c6-passive', N'60', N'Passive Voice (Special Cases)', N'Các trường hợp câu bị động đặc biệt', N'Câu bị động', 60);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c7-wishes', N'61', N'Wishes Type 1 (Future)', N'Câu ước loại 1 (Tương lai)', N'Câu điều ước', 61);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c7-wishes', N'62', N'Wishes Type 2 (Present)', N'Câu ước loại 2 (Hiện tại)', N'Câu điều ước', 62);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c7-wishes', N'63', N'Wishes Type 3 (Past)', N'Câu ước loại 3 (Quá khứ / Nuối tiếc)', N'Câu điều ước', 63);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c11-reported', N'64', N'Indirect sentence', N'Câu gián tiếp (câu hỏi, câu cầu khiến)', N'Câu gián tiếp', 64);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c8-conditionals', N'65', N'Conditional sentence Type 1', N'Câu điều kiện loại 1 (Có thật ở hiện tại)', N'Câu điều kiện', 65);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c8-conditionals', N'66', N'Conditional sentence Type 2', N'Câu điều kiện loại 2 (Giả định hiện tại)', N'Câu điều kiện', 66);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c8-conditionals', N'67', N'Conditional sentence Type 3', N'Câu điều kiện loại 3 (Giả định quá khứ)', N'Câu điều kiện', 67);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c8-conditionals', N'68', N'Conditional sentences in inverted form', N'Đảo ngữ câu điều kiện loại 1, 2, 3', N'Đảo ngữ điều kiện', 68);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c8-conditionals', N'69', N'Special form of conditional sentences', N'Câu điều kiện dạng đặc biệt (Unless, In case...)', N'Câu điều kiện đặc biệt', 69);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c9-comparisons', N'70', N'Compare equals, compare multiples', N'So sánh bằng & so sánh bội số', N'So sánh', 70);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c9-comparisons', N'71', N'Compare more', N'Cấu trúc so sánh hơn (Tính từ ngắn/dài)', N'So sánh', 71);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c9-comparisons', N'72', N'Comparative superlative', N'Cấu trúc so sánh hơn nhất', N'So sánh', 72);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c9-comparisons', N'73', N'Double comparison', N'So sánh kép (Càng... Càng...)', N'So sánh', 73);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c9-comparisons', N'74', N'Compare many times more', N'So sánh hơn gấp nhiều lần', N'So sánh', 74);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c9-comparisons', N'75', N'Comparison table of irregular adjectives and adverbs', N'Bảng so sánh tính/trạng từ bất quy tắc', N'So sánh', 75);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c10-relative', N'76', N'Relative Pronouns, Relative Adverbs', N'Đại từ & Trạng từ quan hệ (Where, When, Why)', N'Mệnh đề quan hệ', 76);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c10-relative', N'77', N'Reducing Clauses, Omitting Relative Pronouns', N'Rút gọn mệnh đề & lược bỏ đại từ quan hệ', N'Mệnh đề quan hệ', 77);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c12-sentence-types', N'78', N'Exclamations', N'Cấu trúc câu cảm thán (What/How)', N'Câu cảm thán', 78);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c12-sentence-types', N'79', N'Tag Questions (Formula)', N'Công thức câu hỏi đuôi cơ bản', N'Câu hỏi đuôi', 79);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c12-sentence-types', N'80', N'Tag Questions (Special Forms)', N'Các dạng câu hỏi đuôi đặc biệt', N'Câu hỏi đuôi', 80);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c12-sentence-types', N'81', N'Anagram sentence', N'Cấu trúc câu đảo ngữ tổng hợp', N'Đảo ngữ', 81);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c12-sentence-types', N'82', N'Imperative Sentences', N'Câu mệnh lệnh khẳng định & phủ định', N'Câu mệnh lệnh', 82);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c12-sentence-types', N'83', N'Emphatic sentence', N'Câu nhấn mạnh (It is... that)', N'Câu nhấn mạnh', 83);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c13-rewriting', N'84', N'Rewriting Sentence Formula (Part 1)', N'Công thức viết lại câu (Phần 1 - So sánh, Thì)', N'Viết lại câu', 84);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c13-rewriting', N'85', N'Rewriting Sentence Formula (Part 2)', N'Công thức viết lại câu (Phần 2 - Too, Enough, So)', N'Viết lại câu', 85);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c13-rewriting', N'86', N'Rewriting Sentence Formula (Part 3)', N'Công thức viết lại câu (Phần 3 - Because, Although)', N'Viết lại câu', 86);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c13-rewriting', N'87', N'Rewriting Sentence Formula (Part 4)', N'Công thức viết lại câu (Phần 4 - Điều kiện, Bị động)', N'Viết lại câu', 87);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c15-preps-connectors', N'88', N'Idioms and proverbs', N'Thành ngữ & tục ngữ tiếng Anh thông dụng', N'Thành ngữ', 88);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c15-preps-connectors', N'89', N'Sentence agrees', N'Câu đồng tình (So, Too, Either, Neither)', N'Cấu trúc câu', 89);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c3-verbs', N'90', N'Table of irregular verbs', N'Bảng 360 động từ bất quy tắc tra cứu nhanh', N'Động từ', 90);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c2-nouns', N'91', N'Types of nouns', N'Phân loại các loại danh từ trong tiếng Anh', N'Danh từ', 91);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c2-nouns', N'92', N'Countable and uncountable nouns', N'Danh từ đếm được & không đếm được', N'Danh từ', 92);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c2-nouns', N'93', N'Singular and plural nouns', N'Quy tắc chuyển danh từ số ít sang số nhiều', N'Danh từ', 93);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c2-nouns', N'94', N'Synthesis of irregular nouns', N'Tổng hợp danh từ số nhiều bất quy tắc', N'Danh từ', 94);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c4-modal', N'95', N'Modal verbs', N'Động từ khuyết thiếu nâng cao & suy đoán', N'Động từ khuyết thiếu', 95);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c3-verbs', N'96', N'Intransitive verbs and transitive verbs', N'Nội động từ và ngoại động từ', N'Động từ', 96);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c14-adj-adv', N'97', N'Adjective position', N'Vị trí của tính từ trong câu', N'Tính từ', 97);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c14-adj-adv', N'98', N'Adjectives ending in -ing and -ed', N'Phân biệt tính từ đuôi -ing và -ed', N'Tính từ', 98);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c14-adj-adv', N'99', N'Compound adjectives', N'Cấu tạo tính từ ghép trong tiếng Anh', N'Tính từ', 99);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c14-adj-adv', N'100', N'Adjective order structure', N'Cấu trúc trật tự tính từ (OpSASCOMP)', N'Tính từ', 100);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c14-adj-adv', N'p2-1', N'Common adjectives', N'Các tính từ thông dụng nhất', N'Tính từ mở rộng', 101);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c14-adj-adv', N'p2-2', N'Adverb position', N'Vị trí của trạng từ trong câu', N'Trạng từ mở rộng', 102);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c14-adj-adv', N'p2-3', N'Types of adverbs', N'Các loại trạng từ trong tiếng Anh', N'Trạng từ mở rộng', 103);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c14-adj-adv', N'p2-4', N'Classification of adverbs', N'Phân loại chi tiết trạng từ', N'Trạng từ mở rộng', 104);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c14-adj-adv', N'p2-5', N'Common adverbs', N'Các trạng từ thường gặp nhất', N'Trạng từ mở rộng', 105);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c15-preps-connectors', N'p2-6', N'Definition, usage of prepositions', N'Định nghĩa & cách dùng giới từ', N'Giới từ mở rộng', 106);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c15-preps-connectors', N'p2-7', N'Types of prepositions', N'Phân loại giới từ (Thời gian, Nơi chốn)', N'Giới từ mở rộng', 107);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c16-pronunciation', N'p2-8', N'Accent rules', N'Quy tắc đánh trọng âm từ 2-3 âm tiết', N'Quy tắc trọng âm', 108);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c16-pronunciation', N'p2-9', N'How to pronounce "s/es"', N'Quy tắc phát âm đuôi "s/es" (/s/, /z/, /iz/)', N'Phát âm đuôi', 109);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c16-pronunciation', N'p2-10', N'How to pronounce "ed"', N'Quy tắc phát âm đuôi "ed" (/t/, /d/, /id/)', N'Phát âm đuôi', 110);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c14-adj-adv', N'p2-11', N'Position of Adjective - Noun - Verb - Adverb', N'Vị trí của Tính từ - Danh từ - Động từ - Trạng từ', N'Vị trí từ loại', 111);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c15-preps-connectors', N'p2-12', N'Collocations in TOEIC', N'Các cụm từ cố định hay gặp trong đề thi TOEIC', N'Cụm từ cố định', 112);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c15-preps-connectors', N'p2-13', N'Common Phrasal Verbs', N'Tổng hợp cụm động từ thường gặp trong giao tiếp', N'Cụm động từ', 113);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c15-preps-connectors', N'p2-14', N'Advanced Conjunctions', N'Liên từ nâng cao (Notwithstanding, Whereas...)', N'Liên từ mở rộng', 114);
INSERT INTO dbo.GrammarLessons (ClusterCode, CatalogID, Title, Subtitle, Category, DisplayOrder) VALUES (N'c15-preps-connectors', N'p2-15', N'Inversion with Negative Adverbs', N'Đảo ngữ với phó từ phủ định (Never, Hardly...)', N'Đảo ngữ nâng cao', 115);
GO

-- 9.4 Nạp Danh Sách Kênh Video Học
INSERT INTO dbo.VideoChannels (ChannelCode, ChannelName, Badge, Subscribers, Description) VALUES (N'ted-ed', N'TED-Ed', N'TED', N'19.5M', N'Các bài học hoạt hình lôi cuốn, giải thích kiến thức khoa học và tâm lý sâu sắc.');
INSERT INTO dbo.VideoChannels (ChannelCode, ChannelName, Badge, Subscribers, Description) VALUES (N'kurzgesagt', N'Kurzgesagt – In a Nutshell', N'K', N'22.1M', N'Đồ họa hoạt hình đỉnh cao phân tích tương lai loài người, khoa học và vũ trụ.');
INSERT INTO dbo.VideoChannels (ChannelCode, ChannelName, Badge, Subscribers, Description) VALUES (N'bbc-learning', N'BBC Learning English', N'BBC', N'6.2M', N'Nguồn học tiếng Anh chuẩn Anh-Anh hàng đầu với chuỗi bài 6 Minute English.');
INSERT INTO dbo.VideoChannels (ChannelCode, ChannelName, Badge, Subscribers, Description) VALUES (N'veritasium', N'Veritasium', N'V', N'15.8M', N'Kênh khoa học thực nghiệm hàng đầu với các thí nghiệm và bí ẩn hấp dẫn.');
INSERT INTO dbo.VideoChannels (ChannelCode, ChannelName, Badge, Subscribers, Description) VALUES (N'speeches', N'Inspiring Speeches & Talks', N'🎤', N'8.4M', N'Những bài diễn thuyết truyền cảm hứng bất hủ của Steve Jobs, Barack Obama, J.K. Rowling.');
INSERT INTO dbo.VideoChannels (ChannelCode, ChannelName, Badge, Subscribers, Description) VALUES (N'daily-english', N'Daily English & TOEIC', N'TOEIC', N'4.8M', N'Tình huống giao tiếp thực tế nơi công sở, phỏng vấn xin việc và hội thoại hàng ngày.');
GO

-- 9.5 Nạp Video & Phụ Đề Song Ngữ
INSERT INTO dbo.VideoLessons (VideoCode, ChannelCode, YouTubeID, Title, Category, LevelTag, Duration, Description) VALUES (N'vid-ted-01', N'ted-ed', N'R0JKCYZ8hng', N'How playing an instrument benefits your brain', N'science', N'B2', N'4:45', N'Chơi nhạc cụ kích hoạt toàn bộ các vùng não bộ cùng một lúc như một buổi tập thể dục toàn diện.');
INSERT INTO dbo.VideoSubtitles (VideoCode, SentenceOrder, StartTimeSec, EndTimeSec, EnglishText, VietnameseText, IPAPhonetics) VALUES (N'vid-ted-01', 1, 4, 9, N'Did you know that every time musicians pick up their instruments, there are fireworks going off all over their brain?', N'Bạn có biết rằng mỗi khi các nhạc công cầm nhạc cụ lên, có những chùm pháo hoa bùng nổ khắp não bộ của họ?', N'/dɪd juː noʊ ðæt ˈɛvri taɪm mjuːˈzɪʃnz pɪk ʌp ðɛər ˈɪnstrəmənts/');
INSERT INTO dbo.VideoSubtitles (VideoCode, SentenceOrder, StartTimeSec, EndTimeSec, EnglishText, VietnameseText, IPAPhonetics) VALUES (N'vid-ted-01', 2, 9, 14, N'On the outside, they may look calm and focused, reading music and making precise movements.', N'Nhìn từ bên ngoài, họ có vẻ bình tĩnh và tập trung, đọc bản nhạc và thực hiện các chuyển động chuẩn xác.', N'/ɒn ðə ˈaʊtsaɪd, ðeɪ meɪ lʊk kɑːm ænd ˈfoʊkəst/');
INSERT INTO dbo.VideoSubtitles (VideoCode, SentenceOrder, StartTimeSec, EndTimeSec, EnglishText, VietnameseText, IPAPhonetics) VALUES (N'vid-ted-01', 3, 14, 19, N'But inside their brains, there''s a party going on across multiple sensory systems.', N'Nhưng bên trong não họ, một bữa tiệc đang diễn ra xuyên suốt nhiều hệ thống cảm giác.', N'/bʌt ɪnˈsaɪd ðɛər breɪnz, ðɛərz ə ˈpɑːrti ˈɡoʊɪŋ ɒn əˈkrɒs ˈmʌltɪpl ˈsɛnsəri ˈsɪstəmz/');
INSERT INTO dbo.VideoSubtitles (VideoCode, SentenceOrder, StartTimeSec, EndTimeSec, EnglishText, VietnameseText, IPAPhonetics) VALUES (N'vid-ted-01', 4, 19, 24, N'Playing music is the brain''s equivalent of a full-body workout.', N'Chơi âm nhạc tương đương với một bài tập thể dục toàn thân cho não bộ.', N'/ˈpleɪɪŋ ˈmjuːzɪk ɪz ðə breɪnz ɪˈkwɪvələnt ɒv ə fʊl ˈbɒdi ˈwɜːrkaʊt/');
INSERT INTO dbo.VideoSubtitles (VideoCode, SentenceOrder, StartTimeSec, EndTimeSec, EnglishText, VietnameseText, IPAPhonetics) VALUES (N'vid-ted-01', 5, 24, 29, N'It strengthens neural connections and improves long-term memory retrieval.', N'Nó củng cố các liên kết nơ-ron thần kinh và cải thiện khả năng truy xuất trí nhớ dài hạn.', N'/ɪt ˈstrɛŋkθənz ˈnjʊərəl kəˈnɛkʃnz ænd ɪmˈpruːvz lɒŋ tɜːrm ˈmɛməri rɪˈtriːvl/');
INSERT INTO dbo.VideoLessons (VideoCode, ChannelCode, YouTubeID, Title, Category, LevelTag, Duration, Description) VALUES (N'vid-ted-02', N'ted-ed', N'z-IR48Mb3W0', N'What is depression? - Helen M. Farrell', N'life', N'B1', N'4:28', N'Hiểu đúng về căn bệnh trầm cảm từ góc nhìn y khoa và khoa học thần kinh.');
INSERT INTO dbo.VideoSubtitles (VideoCode, SentenceOrder, StartTimeSec, EndTimeSec, EnglishText, VietnameseText, IPAPhonetics) VALUES (N'vid-ted-02', 1, 5, 9, N'Depression is the leading cause of disability worldwide.', N'Trầm cảm là nguyên nhân hàng đầu gây ra tình trạng mất khả năng lao động trên toàn thế giới.', N'/dɪˈprɛʃn ɪz ðə ˈliːdɪŋ kɔːz ɒv ˌdɪsəˈbɪləti ˌwɜːrldˈwaɪd/');
INSERT INTO dbo.VideoSubtitles (VideoCode, SentenceOrder, StartTimeSec, EndTimeSec, EnglishText, VietnameseText, IPAPhonetics) VALUES (N'vid-ted-02', 2, 9, 14, N'It affects more than 300 million people across all ages and backgrounds.', N'Nó ảnh hưởng đến hơn 300 triệu người thuộc mọi lứa tuổi và hoàn cảnh sống.', N'/ɪt əˈfɛkts mɔːr ðæn θriː ˈhʌndrəd ˈmɪljən ˈpiːpl əˈkrɒs ɔːl ˈeɪdʒɪz/');
INSERT INTO dbo.VideoSubtitles (VideoCode, SentenceOrder, StartTimeSec, EndTimeSec, EnglishText, VietnameseText, IPAPhonetics) VALUES (N'vid-ted-02', 3, 14, 19, N'It is not just feeling sad; it is a complex medical condition with physical symptoms.', N'Nó không chỉ đơn thuần là cảm giác buồn bã; đó là một bệnh lý y khoa phức tạp với các triệu chứng thể chất.', N'/ɪt ɪz nɒt dʒʌst ˈfiːlɪŋ sæd ɪt ɪz ə ˈkɒmplɛks ˈmɛdɪkl kənˈdɪʃn/');
INSERT INTO dbo.VideoSubtitles (VideoCode, SentenceOrder, StartTimeSec, EndTimeSec, EnglishText, VietnameseText, IPAPhonetics) VALUES (N'vid-ted-02', 4, 19, 24, N'Understanding its biological roots helps eliminate stigma and encourages treatment.', N'Hiểu được căn nguyên sinh học của nó giúp xóa bỏ định kiến và khuyến khích điều trị.', N'/ˌʌndərˈstændɪŋ ɪts ˌbaɪəˈlɒdʒɪkl ruːts hɛlps ɪˈlɪmɪneɪt ˈstɪɡmə/');
INSERT INTO dbo.VideoLessons (VideoCode, ChannelCode, YouTubeID, Title, Category, LevelTag, Duration, Description) VALUES (N'vid-ted-03', N'ted-ed', N'WuyPuH9ojCE', N'How stress affects your brain - Madhumita Murgia', N'science', N'B2', N'4:15', N'Căng thẳng mãn tính tác động như thế nào đến kích thước, cấu trúc và chức năng của não.');
INSERT INTO dbo.VideoSubtitles (VideoCode, SentenceOrder, StartTimeSec, EndTimeSec, EnglishText, VietnameseText, IPAPhonetics) VALUES (N'vid-ted-03', 1, 4, 8, N'Stress isn''t always a bad thing; it can be handy for a burst of extra energy and focus.', N'Căng thẳng không phải lúc nào cũng xấu; nó có thể hữu ích để bộc phát thêm năng lượng và sự tập trung.', N'/strɛs ˈɪznt ˈɔːlweɪz ə bæd θɪŋ ɪt kæn biː ˈhændi fɔːr ə bɜːrst ɒv ˈɛkstrə ˈɛnərdʒi/');
INSERT INTO dbo.VideoSubtitles (VideoCode, SentenceOrder, StartTimeSec, EndTimeSec, EnglishText, VietnameseText, IPAPhonetics) VALUES (N'vid-ted-03', 2, 8, 13, N'However, when stress is continuous and chronic, it changes the brain''s circuitry.', N'Tuy nhiên, khi căng thẳng kéo dài và mãn tính, nó sẽ thay đổi các mạch liên kết của não bộ.', N'/haʊˈɛvər wɛn strɛs ɪz kənˈtɪnjuəs ænd ˈkrɒnɪk ɪt ˈtʃeɪndʒɪz ðə breɪnz ˈsɜːrkɪtri/');
INSERT INTO dbo.VideoSubtitles (VideoCode, SentenceOrder, StartTimeSec, EndTimeSec, EnglishText, VietnameseText, IPAPhonetics) VALUES (N'vid-ted-03', 3, 13, 18, N'Cortisol levels remain elevated, damaging the hippocampus which controls learning and memory.', N'Hàm lượng cortisol duy trì ở mức cao, gây tổn thương vùng hồi hải mã - nơi kiểm soát học tập và trí nhớ.', N'/ˈkɔːrtɪzɒl ˈlɛvlz rɪˈmeɪn ˈɛlɪveɪtɪd ˈdæmɪdʒɪŋ ðə ˌhɪpəˈkæmpəs/');
INSERT INTO dbo.VideoSubtitles (VideoCode, SentenceOrder, StartTimeSec, EndTimeSec, EnglishText, VietnameseText, IPAPhonetics) VALUES (N'vid-ted-03', 4, 18, 23, N'Regular exercise and meditation are proven ways to reverse these neurological effects.', N'Tập thể dục đều đặn và thiền định là những cách đã được chứng minh để đảo ngược các tác động thần kinh này.', N'/ˈrɛɡjələr ˈɛksərsaɪz ænd ˌmɛdɪˈteɪʃn ɑːr ˈpruːvn weɪz tuː rɪˈvɜːrs ðiːz/');
INSERT INTO dbo.VideoLessons (VideoCode, ChannelCode, YouTubeID, Title, Category, LevelTag, Duration, Description) VALUES (N'vid-ted-04', N'ted-ed', N'gedoSfZvBgE', N'The benefits of a good night''s sleep - Shai Marcu', N'life', N'A2', N'5:45', N'Giấc ngủ ngon giúp não bộ tái cấu trúc ký ức và dọn dẹp các chất độc thần kinh tích tụ trong ngày.');
INSERT INTO dbo.VideoSubtitles (VideoCode, SentenceOrder, StartTimeSec, EndTimeSec, EnglishText, VietnameseText, IPAPhonetics) VALUES (N'vid-ted-04', 1, 5, 9, N'It is 2 AM and you have a big exam in the morning.', N'Đã 2 giờ sáng và bạn có một bài thi quan trọng vào buổi sáng.', N'/ɪt ɪz tuː eɪ-ɛm ænd juː hæv ə bɪɡ ɪɡˈzæm ɪn ðə ˈmɔːrnɪŋ/');
INSERT INTO dbo.VideoSubtitles (VideoCode, SentenceOrder, StartTimeSec, EndTimeSec, EnglishText, VietnameseText, IPAPhonetics) VALUES (N'vid-ted-04', 2, 9, 14, N'Should you keep studying all night, or is it better to go to bed?', N'Bạn nên tiếp tục thức học suốt đêm, hay đi ngủ sẽ tốt hơn?', N'/ʃʊd juː kiːp ˈstʌdiɪŋ ɔːl naɪt ɔːr ɪz ɪt ˈbɛtər tuː ɡoʊ tuː bɛd/');
INSERT INTO dbo.VideoSubtitles (VideoCode, SentenceOrder, StartTimeSec, EndTimeSec, EnglishText, VietnameseText, IPAPhonetics) VALUES (N'vid-ted-04', 3, 14, 19, N'Sleep helps consolidate memories, transferring information from short-term to long-term storage.', N'Giấc ngủ giúp củng cố ký ức, chuyển thông tin từ bộ nhớ ngắn hạn sang bộ nhớ dài hạn.', N'/sliːp hɛlps kənˈsɒlɪdeɪt ˈmɛməriz trænsˈfɜːrɪŋ ˌɪnfərˈmeɪʃn/');
INSERT INTO dbo.VideoSubtitles (VideoCode, SentenceOrder, StartTimeSec, EndTimeSec, EnglishText, VietnameseText, IPAPhonetics) VALUES (N'vid-ted-04', 4, 19, 24, N'A well-rested brain performs with higher accuracy and creative problem solving.', N'Một bộ não được nghỉ ngơi đầy đủ sẽ hoạt động với độ chính xác cao hơn và giải quyết vấn đề sáng tạo hơn.', N'/ə wɛl ˈrɛstɪd breɪn pərˈfɔːrmz wɪð ˈhaɪər ˈækjərəsi/');
INSERT INTO dbo.VideoLessons (VideoCode, ChannelCode, YouTubeID, Title, Category, LevelTag, Duration, Description) VALUES (N'vid-speech-01', N'speeches', N'UF8uR6Z6KLc', N'Steve Jobs: How to live before you die (Stanford 2005)', N'speeches', N'B1', N'15:04', N'Bài phát biểu huyền thoại của Steve Jobs về việc theo đuổi đam mê, vượt qua thất bại và sống trọn vẹn từng ngày.');
INSERT INTO dbo.VideoSubtitles (VideoCode, SentenceOrder, StartTimeSec, EndTimeSec, EnglishText, VietnameseText, IPAPhonetics) VALUES (N'vid-speech-01', 1, 10, 15, N'I am honored to be with you today at your commencement from one of the finest universities in the world.', N'Tôi rất vinh dự được có mặt cùng các bạn hôm nay tại lễ tốt nghiệp của một trong những trường đại học xuất sắc nhất thế giới.', N'/aɪ æm ˈɒnərd tuː biː wɪð juː təˈdeɪ æt jɔːr kəˈmɛnsmənt/');
INSERT INTO dbo.VideoSubtitles (VideoCode, SentenceOrder, StartTimeSec, EndTimeSec, EnglishText, VietnameseText, IPAPhonetics) VALUES (N'vid-speech-01', 2, 15, 19, N'I never graduated from college. Truth be told, this is the closest I''ve ever gotten to a college graduation.', N'Tôi chưa từng tốt nghiệp đại học. Thú thật, đây là lần gần nhất tôi được tham dự một buổi lễ tốt nghiệp đại học.', N'/aɪ ˈnɛvər ˈɡrædʒueɪtɪd frɒm ˈkɒlɪdʒ truːθ biː toʊld/');
INSERT INTO dbo.VideoSubtitles (VideoCode, SentenceOrder, StartTimeSec, EndTimeSec, EnglishText, VietnameseText, IPAPhonetics) VALUES (N'vid-speech-01', 3, 19, 24, N'Today I want to tell you three stories from my life. That''s it. No big deal. Just three stories.', N'Hôm nay tôi muốn kể cho các bạn nghe ba câu chuyện từ cuộc đời tôi. Chỉ có vậy thôi. Không có gì to tát. Chỉ ba câu chuyện.', N'/təˈdeɪ aɪ wɒnt tuː tɛl juː θriː ˈstɔːriz frɒm maɪ laɪf/');
INSERT INTO dbo.VideoSubtitles (VideoCode, SentenceOrder, StartTimeSec, EndTimeSec, EnglishText, VietnameseText, IPAPhonetics) VALUES (N'vid-speech-01', 4, 24, 30, N'Your time is limited, so don''t waste it living someone else''s life.', N'Thời gian của bạn là hữu hạn, vì vậy đừng lãng phí nó để sống cuộc đời của người khác.', N'/jɔːr taɪm ɪz ˈlɪmɪtɪd soʊ doʊnt weɪst ɪt ˈlɪvɪŋ ˈsʌmwʌn ɛlsɪz laɪf/');
INSERT INTO dbo.VideoSubtitles (VideoCode, SentenceOrder, StartTimeSec, EndTimeSec, EnglishText, VietnameseText, IPAPhonetics) VALUES (N'vid-speech-01', 5, 30, 36, N'Stay Hungry. Stay Foolish. Thank you all very much.', N'Hãy luôn khao khát. Hãy luôn dại khờ. Cảm ơn các bạn rất nhiều.', N'/steɪ ˈhʌŋɡri steɪ ˈfuːlɪʃ θæŋk juː ɔːl ˈvɛri mʌtʃ/');
INSERT INTO dbo.VideoLessons (VideoCode, ChannelCode, YouTubeID, Title, Category, LevelTag, Duration, Description) VALUES (N'vid-speech-02', N'speeches', N'ueMNZz0vP9g', N'Barack Obama: The Audacity of Hope (2004 Keynote Speech)', N'speeches', N'B2', N'17:15', N'Bài diễn thuyết lịch sử đưa Barack Obama bước lên vũ đài chính trị thế giới với ngữ điệu và phát âm chuẩn mẫu.');
INSERT INTO dbo.VideoSubtitles (VideoCode, SentenceOrder, StartTimeSec, EndTimeSec, EnglishText, VietnameseText, IPAPhonetics) VALUES (N'vid-speech-02', 1, 12, 17, N'On behalf of the great state of Illinois, crossroads of a nation, Land of Lincoln, let me express my gratitude.', N'Thay mặt tiểu bang Illinois vĩ đại, ngã tư của một quốc gia, Vùng đất của Lincoln, cho phép tôi bày tỏ lòng biết ơn sâu sắc.', N'/ɒn bɪˈhæf ɒv ðə ɡreɪt steɪt ɒv ˌɪlɪˈnɔɪ ˈkrɒsroʊdz ɒv ə ˈneɪʃn/');
INSERT INTO dbo.VideoSubtitles (VideoCode, SentenceOrder, StartTimeSec, EndTimeSec, EnglishText, VietnameseText, IPAPhonetics) VALUES (N'vid-speech-02', 2, 17, 22, N'My presence on this stage is pretty unlikely, considering my father was a foreign student born in a small village in Kenya.', N'Sự hiện diện của tôi trên sân khấu này là điều khó tin, khi cha tôi từng là một du học sinh sinh ra tại một ngôi làng nhỏ ở Kenya.', N'/maɪ ˈprɛzns ɒn ðɪs steɪdʒ ɪz ˈprɪti ʌnˈlaɪkli kənˈsɪdərɪŋ maɪ ˈfɑːðər/');
INSERT INTO dbo.VideoSubtitles (VideoCode, SentenceOrder, StartTimeSec, EndTimeSec, EnglishText, VietnameseText, IPAPhonetics) VALUES (N'vid-speech-02', 3, 22, 28, N'He grew up herding goats, but he knew that in America, anything is possible.', N'Ông lớn lên bằng nghề chăn dê, nhưng ông biết rằng ở nước Mỹ, mọi điều đều có thể thành hiện thực.', N'/hiː ɡruː ʌp ˈhɜːrdɪŋ ɡoʊts bʌt hiː njuː ðæt ɪn əˈmɛrɪkə ˈɛniθɪŋ ɪz ˈpɒsəbl/');
INSERT INTO dbo.VideoSubtitles (VideoCode, SentenceOrder, StartTimeSec, EndTimeSec, EnglishText, VietnameseText, IPAPhonetics) VALUES (N'vid-speech-02', 4, 28, 34, N'Hope in the face of difficulty. Hope in the face of uncertainty. The audacity of hope!', N'Hy vọng trước mọi khó khăn. Hy vọng trước những bất định. Đó chính là sự táo bạo của niềm hy vọng!', N'/hoʊp ɪn ðə feɪs ɒv ˈdɪfɪkəlti hoʊp ɪn ðə feɪs ɒv ʌnˈsɜːrtnti/');
INSERT INTO dbo.VideoLessons (VideoCode, ChannelCode, YouTubeID, Title, Category, LevelTag, Duration, Description) VALUES (N'vid-kurz-01', N'kurzgesagt', N'5iPH-br_SO4', N'What If We Nuke A City? Nuclear Weapons Explained', N'science', N'B2', N'11:15', N'Phân tích khoa học chi tiết về hậu quả tức thì và lâu dài nếu một quả bom hạt nhân phát nổ.');
INSERT INTO dbo.VideoSubtitles (VideoCode, SentenceOrder, StartTimeSec, EndTimeSec, EnglishText, VietnameseText, IPAPhonetics) VALUES (N'vid-kurz-01', 1, 4, 9, N'A nuclear weapon is unlike any other destructive force ever created by humanity.', N'Vũ khí hạt nhân không giống bất kỳ lực lượng tàn phá nào khác mà nhân loại từng tạo ra.', N'/ə ˈnjuːkliər ˈwɛpən ɪz ʌnˈlaɪk ˈɛni ˈʌðər dɪˈstrʌktɪv fɔːrs ˈɛvər kriˈeɪtɪd/');
INSERT INTO dbo.VideoSubtitles (VideoCode, SentenceOrder, StartTimeSec, EndTimeSec, EnglishText, VietnameseText, IPAPhonetics) VALUES (N'vid-kurz-01', 2, 9, 14, N'In the first fraction of a second, the temperature reaches millions of degrees Celsius.', N'Trong một phần giây đầu tiên, nhiệt độ đạt tới hàng triệu độ C.', N'/ɪn ðə fɜːrst ˈfrækʃn ɒv ə ˈsɛkənd ðə ˈtɛmprətʃər ˈriːtʃɪz ˈmɪljənz ɒv dɪˈɡriːz/');
INSERT INTO dbo.VideoSubtitles (VideoCode, SentenceOrder, StartTimeSec, EndTimeSec, EnglishText, VietnameseText, IPAPhonetics) VALUES (N'vid-kurz-01', 3, 14, 19, N'The shockwave expands outward, leveling structures for kilometers in every direction.', N'Sóng xung kích lan rộng ra ngoài, san phẳng các công trình hàng km theo mọi hướng.', N'/ðə ˈʃɒkweɪv ɪkˈspændz ˈaʊtwərd ˈlɛvlɪŋ ˈstrʌktʃərz fɔːr kɪˈlɒmɪtərz/');
INSERT INTO dbo.VideoSubtitles (VideoCode, SentenceOrder, StartTimeSec, EndTimeSec, EnglishText, VietnameseText, IPAPhonetics) VALUES (N'vid-kurz-01', 4, 19, 24, N'Understanding these risks is essential for preserving peace and international security.', N'Hiểu được những rủi ro này là điều thiết yếu để giữ gìn hòa bình và an ninh quốc tế.', N'/ˌʌndərˈstændɪŋ ðiːz rɪsks ɪz ɪˈsɛnʃl fɔːr prɪˈzɜːrvɪŋ piːs/');
INSERT INTO dbo.VideoLessons (VideoCode, ChannelCode, YouTubeID, Title, Category, LevelTag, Duration, Description) VALUES (N'vid-kurz-02', N'kurzgesagt', N'h6fcK_fRYaI', N'The Egg - A Short Story by Andy Weir', N'life', N'B1', N'7:55', N'Câu chuyện ngắn triết học nổi tiếng về ý nghĩa cuộc đời, vũ trụ và lòng trắc ẩn.');
INSERT INTO dbo.VideoSubtitles (VideoCode, SentenceOrder, StartTimeSec, EndTimeSec, EnglishText, VietnameseText, IPAPhonetics) VALUES (N'vid-kurz-02', 1, 6, 11, N'You were on your way home when you died. It was a car accident. Nothing particularly remarkable, but fatal nonetheless.', N'Bạn đang trên đường về nhà thì bạn qua đời. Đó là một vụ tai nạn xe hơi. Không có gì quá đặc biệt, nhưng lại cướp đi sinh mạng.', N'/juː wɜːr ɒn jɔːr weɪ hoʊm wɛn juː daɪd ɪt wɒz ə kɑːr ˈæksɪdənt/');
INSERT INTO dbo.VideoSubtitles (VideoCode, SentenceOrder, StartTimeSec, EndTimeSec, EnglishText, VietnameseText, IPAPhonetics) VALUES (N'vid-kurz-02', 2, 11, 16, N'You left behind a wife and two children. It was a painless death. The EMTs tried their best to save you.', N'Bạn để lại người vợ và hai đứa con. Đó là một cái chết không đau đớn. Các nhân viên cứu thương đã cố gắng hết sức để cứu bạn.', N'/juː lɛft bɪˈhaɪnd ə waɪf ænd tuː ˈtʃɪldrən ɪt wɒz ə ˈpeɪnlɪs dɛθ/');
INSERT INTO dbo.VideoSubtitles (VideoCode, SentenceOrder, StartTimeSec, EndTimeSec, EnglishText, VietnameseText, IPAPhonetics) VALUES (N'vid-kurz-02', 3, 16, 21, N'And that''s when you met me. ''What... where am I?'' you asked. ''Is this the afterlife?''', N'Và đó là lúc bạn gặp tôi. ''Cái gì... tôi đang ở đâu đây?'' bạn hỏi. ''Đây là thế giới bên kia sao?''', N'/ænd ðæts wɛn juː mɛt miː wɒt wɛər æm aɪ juː ɑːskt/');
INSERT INTO dbo.VideoSubtitles (VideoCode, SentenceOrder, StartTimeSec, EndTimeSec, EnglishText, VietnameseText, IPAPhonetics) VALUES (N'vid-kurz-02', 4, 21, 27, N'''More or less,'' I said. ''Every time you victimized someone, you were victimizing yourself.''', N'''Đại loại là vậy,'' tôi nói. ''Mỗi lần bạn làm tổn thương ai đó, bạn đang tự làm tổn thương chính mình.''', N'/mɔːr ɔːr lɛs aɪ sɛd ˈɛvri taɪm juː ˈvɪktɪmaɪzd ˈsʌmwʌn/');
INSERT INTO dbo.VideoLessons (VideoCode, ChannelCode, YouTubeID, Title, Category, LevelTag, Duration, Description) VALUES (N'vid-bbc-01', N'bbc-learning', N'-nK4w7D5l0c', N'6 Minute English: The power of music and memory', N'language', N'A2', N'6:15', N'Chương trình luyện nghe tiếng Anh chuẩn Anh-Anh hàng đầu, khám phá sức mạnh của âm nhạc đối với cảm xúc.');
INSERT INTO dbo.VideoSubtitles (VideoCode, SentenceOrder, StartTimeSec, EndTimeSec, EnglishText, VietnameseText, IPAPhonetics) VALUES (N'vid-bbc-01', 1, 5, 10, N'Hello and welcome to 6 Minute English from BBC Learning English. I''m Neil.', N'Xin chào và chào mừng các bạn đến với 6 Minute English của BBC Learning English. Tôi là Neil.', N'/hɛˈloʊ ænd ˈwɛlkəm tuː sɪks ˈmɪnɪt ˈɪŋɡlɪʃ frɒm biː-biː-siː/');
INSERT INTO dbo.VideoSubtitles (VideoCode, SentenceOrder, StartTimeSec, EndTimeSec, EnglishText, VietnameseText, IPAPhonetics) VALUES (N'vid-bbc-01', 2, 10, 15, N'And I''m Sam. Today we''re talking about the emotional connection between songs and memories.', N'Và tôi là Sam. Hôm nay chúng ta sẽ trò chuyện về mối liên hệ cảm xúc giữa những bài hát và kỷ niệm.', N'/ænd aɪm sæm təˈdeɪ wɪər ˈtɔːkɪŋ əˈbaʊt ðə ɪˈmoʊʃənl kəˈnɛkʃn/');
INSERT INTO dbo.VideoSubtitles (VideoCode, SentenceOrder, StartTimeSec, EndTimeSec, EnglishText, VietnameseText, IPAPhonetics) VALUES (N'vid-bbc-01', 3, 15, 20, N'Have you ever heard a track that instantly took you back to your childhood school days?', N'Bạn đã bao giờ nghe một giai điệu mà ngay lập tức đưa bạn trở về những ngày còn đi học thời thơ ấu chưa?', N'/hæv juː ˈɛvər hɜːrd ə træk ðæt ˈɪnstəntli tʊk juː bæk tuː jɔːr ˈtʃaɪldhʊd/');
INSERT INTO dbo.VideoSubtitles (VideoCode, SentenceOrder, StartTimeSec, EndTimeSec, EnglishText, VietnameseText, IPAPhonetics) VALUES (N'vid-bbc-01', 4, 20, 26, N'Music stimulates the release of dopamine in our brains, creating strong associative memory pathways.', N'Âm nhạc kích thích sản sinh dopamine trong não bộ chúng ta, tạo ra các đường dẫn ký ức liên tưởng mạnh mẽ.', N'/ˈmjuːzɪk ˈstɪmjuleɪts ðə rɪˈliːs ɒv ˈdoʊpəmiːn ɪn ˈaʊər breɪnz/');
INSERT INTO dbo.VideoLessons (VideoCode, ChannelCode, YouTubeID, Title, Category, LevelTag, Duration, Description) VALUES (N'vid-bbc-02', N'bbc-learning', N'Z5G3B-G6a8o', N'6 Minute English: Can Artificial Intelligence be truly creative?', N'language', N'B1', N'6:12', N'Bàn luận về khả năng sáng tạo nghệ thuật và viết thơ của trí tuệ nhân tạo (AI) so với con người.');
INSERT INTO dbo.VideoSubtitles (VideoCode, SentenceOrder, StartTimeSec, EndTimeSec, EnglishText, VietnameseText, IPAPhonetics) VALUES (N'vid-bbc-02', 1, 6, 11, N'Can a machine paint a masterpiece or write a moving poem like Shakespeare?', N'Liệu một cỗ máy có thể vẽ nên một kiệt tác hay viết một bài thơ xúc động như Shakespeare?', N'/kæn ə məˈʃiːn peɪnt ə ˈmæstərpiːs ɔːr raɪt ə ˈmuːvɪŋ ˈpoʊɪm/');
INSERT INTO dbo.VideoSubtitles (VideoCode, SentenceOrder, StartTimeSec, EndTimeSec, EnglishText, VietnameseText, IPAPhonetics) VALUES (N'vid-bbc-02', 2, 11, 16, N'Generative AI models are analyzing millions of artistic patterns to generate novel works.', N'Các mô hình AI tạo sinh đang phân tích hàng triệu mẫu nghệ thuật để tạo ra những tác phẩm mới lạ.', N'/ˈdʒɛnərətɪv eɪ-aɪ ˈmɒdlz ɑːr ˈænəlaɪzɪŋ ˈmɪljənz ɒv ɑːrˈtɪstɪk ˈpætərnz/');
INSERT INTO dbo.VideoSubtitles (VideoCode, SentenceOrder, StartTimeSec, EndTimeSec, EnglishText, VietnameseText, IPAPhonetics) VALUES (N'vid-bbc-02', 3, 16, 21, N'But does combining existing data count as genuine human imagination and consciousness?', N'Nhưng liệu việc kết hợp dữ liệu có sẵn có được coi là trí tưởng tượng và ý thức thực sự của con người không?', N'/bʌt dʌz kəmˈbaɪnɪŋ ɪɡˈzɪstɪŋ ˈdeɪtə kaʊnt æz ˈdʒɛnjuɪn ˈhjuːmən ɪˌmædʒɪˈneɪʃn/');
INSERT INTO dbo.VideoSubtitles (VideoCode, SentenceOrder, StartTimeSec, EndTimeSec, EnglishText, VietnameseText, IPAPhonetics) VALUES (N'vid-bbc-02', 4, 21, 27, N'Let''s explore key vocabulary and grammar structures used when talking about cutting-edge technology.', N'Hãy cùng khám phá các từ vựng và cấu trúc ngữ pháp then chốt được dùng khi nói về công nghệ tiên tiến.', N'/lɛts ɪkˈsplɔːr kiː vəʊˈkæbjʊləri ænd ˈɡræmər ˈstrʌktʃərz/');
INSERT INTO dbo.VideoLessons (VideoCode, ChannelCode, YouTubeID, Title, Category, LevelTag, Duration, Description) VALUES (N'vid-veri-01', N'veritasium', N'bHIhgxav9LY', N'Total Solar Eclipse from Space & Edge of Earth', N'science', N'B2', N'11:20', N'Trải nghiệm nhật thực toàn phần từ tầng bình lưu bằng khinh khí cầu nghiên cứu vũ trụ.');
INSERT INTO dbo.VideoSubtitles (VideoCode, SentenceOrder, StartTimeSec, EndTimeSec, EnglishText, VietnameseText, IPAPhonetics) VALUES (N'vid-veri-01', 1, 5, 9, N'We launched a high-altitude weather balloon directly into the path of totality.', N'Chúng tôi đã phóng một khinh khí cầu thời tiết tầng cao thẳng vào quỹ đạo nhật thực toàn phần.', N'/wiː lɔːntʃt ə haɪ ˈæltɪtjuːd ˈwɛðər bəˈluːn dɪˈrɛktli ˈɪntuː ðə pɑːθ ɒv toʊˈtæləti/');
INSERT INTO dbo.VideoSubtitles (VideoCode, SentenceOrder, StartTimeSec, EndTimeSec, EnglishText, VietnameseText, IPAPhonetics) VALUES (N'vid-veri-01', 2, 9, 14, N'As the moon''s shadow raced across the continent at twice the speed of sound,', N'Khi bóng của mặt trăng lướt qua lục địa với tốc độ gấp đôi vận tốc âm thanh,', N'/æz ðə muːnz ˈʃædoʊ reɪst əˈkrɒs ðə ˈkɒntɪnənt æt twaɪs ðə spiːd ɒv saʊnd/');
INSERT INTO dbo.VideoSubtitles (VideoCode, SentenceOrder, StartTimeSec, EndTimeSec, EnglishText, VietnameseText, IPAPhonetics) VALUES (N'vid-veri-01', 3, 14, 18, N'the sky darkened and the temperature dropped dramatically.', N'bầu trời tối sầm lại và nhiệt độ giảm xuống một cách đáng kể.', N'/ðə skaɪ ˈdɑːrkənd ænd ðə ˈtɛmprətʃər drɒpt drəˈmætɪkli/');
INSERT INTO dbo.VideoSubtitles (VideoCode, SentenceOrder, StartTimeSec, EndTimeSec, EnglishText, VietnameseText, IPAPhonetics) VALUES (N'vid-veri-01', 4, 18, 23, N'Seeing the solar corona from thirty thousand meters above the ground was breathtaking.', N'Nhìn thấy vành nhật hoa từ độ cao 30.000 mét so với mặt đất quả là một trải nghiệm ngoạn mục.', N'/ˈsiːɪŋ ðə ˈsoʊlər kəˈroʊnə frɒm ˈθɜːrti ˈθaʊznd ˈmiːtərz əˈbʌv ðə ɡraʊnd/');
INSERT INTO dbo.VideoLessons (VideoCode, ChannelCode, YouTubeID, Title, Category, LevelTag, Duration, Description) VALUES (N'vid-toeic-01', N'daily-english', N'7_aA8hpKGNc', N'Top Job Interview Questions & High-Score Model Answers', N'business', N'B1', N'8:40', N'Cách trả lời tự tin câu hỏi "Tell me about yourself" và đàm phán công việc chuyên nghiệp bằng tiếng Anh.');
INSERT INTO dbo.VideoSubtitles (VideoCode, SentenceOrder, StartTimeSec, EndTimeSec, EnglishText, VietnameseText, IPAPhonetics) VALUES (N'vid-toeic-01', 1, 5, 10, N'When an interviewer says ''Tell me about yourself'', they are testing your communication skills and career focus.', N'Khi người phỏng vấn nói ''Hãy giới thiệu về bản thân bạn'', họ đang kiểm tra kỹ năng giao tiếp và định hướng sự nghiệp của bạn.', N'/wɛn ən ˈɪntərvjuːər sɛz tɛl miː əˈbaʊt jɔːrˈsɛlf ðeɪ ɑːr ˈtɛstɪŋ jɔːr kəˌmjuːnɪˈkeɪʃn/');
INSERT INTO dbo.VideoSubtitles (VideoCode, SentenceOrder, StartTimeSec, EndTimeSec, EnglishText, VietnameseText, IPAPhonetics) VALUES (N'vid-toeic-01', 2, 10, 16, N'Structure your answer using the Present, Past, and Future framework to make a compelling impression.', N'Hãy cấu trúc câu trả lời theo khung Hiện tại, Quá khứ và Tương lai để tạo ấn tượng thuyết phục.', N'/ˈstrʌktʃər jɔːr ˈɑːnsər ˈjuːzɪŋ ðə ˈprɛznt pɑːst ænd ˈfjuːtʃər ˈfreɪmwɜːrk/');
INSERT INTO dbo.VideoSubtitles (VideoCode, SentenceOrder, StartTimeSec, EndTimeSec, EnglishText, VietnameseText, IPAPhonetics) VALUES (N'vid-toeic-01', 3, 16, 22, N'Highlight measurable accomplishments that demonstrate how you add value to the organization.', N'Nhấn mạnh những thành tựu có thể đo lường được để chứng minh giá trị bạn mang lại cho tổ chức.', N'/ˈhaɪlaɪt ˈmɛʒərəbl əˈkʌmplɪʃmənts ðæt ˈdɛmənstreɪt haʊ juː æd ˈvæljuː/');
INSERT INTO dbo.VideoSubtitles (VideoCode, SentenceOrder, StartTimeSec, EndTimeSec, EnglishText, VietnameseText, IPAPhonetics) VALUES (N'vid-toeic-01', 4, 22, 28, N'Keep your response concise, professional, and directly relevant to the target role.', N'Giữ câu trả lời súc tích, chuyên nghiệp và bám sát vào vị trí bạn đang ứng tuyển.', N'/kiːp jɔːr rɪˈspɒns kənˈsaɪs prəˈfɛʃənl ænd dɪˈrɛktli ˈrɛləvənt/');
GO

-- 9.6 Nạp Nhiệm Vụ Lộ Trình Học Đa Nguồn (DailyDictation & Study4)
INSERT INTO dbo.MultiSkillRoadmap (TrackCode, DayNumber, Skill, TaskTitle, SourcePlatform, EstDurationMinutes, LevelTag) VALUES (N'listening', 1, N'Luyện Nghe & Chép Chính Tả (Daily Dictation & TOEIC)', N'Chép chính tả: TOEIC Section 1 (Tranh ảnh & Câu hỏi ngắn)', N'DailyDictation & Study4 LC', 20, N'A2-B1');
INSERT INTO dbo.MultiSkillRoadmap (TrackCode, DayNumber, Skill, TaskTitle, SourcePlatform, EstDurationMinutes, LevelTag) VALUES (N'listening', 2, N'Luyện Nghe & Chép Chính Tả (Daily Dictation & TOEIC)', N'Chép chính tả: TOEIC Section 2 (Hỏi - Đáp Part 2)', N'DailyDictation & Study4 LC', 20, N'B1');
INSERT INTO dbo.MultiSkillRoadmap (TrackCode, DayNumber, Skill, TaskTitle, SourcePlatform, EstDurationMinutes, LevelTag) VALUES (N'listening', 3, N'Luyện Nghe & Chép Chính Tả (Daily Dictation & TOEIC)', N'Chép chính tả: Daily Conversations (Short dialogues)', N'DailyDictation & Study4 LC', 20, N'A2');
INSERT INTO dbo.MultiSkillRoadmap (TrackCode, DayNumber, Skill, TaskTitle, SourcePlatform, EstDurationMinutes, LevelTag) VALUES (N'listening', 4, N'Luyện Nghe & Chép Chính Tả (Daily Dictation & TOEIC)', N'Chép chính tả: Short Stories (Chép 5 bài Section 1)', N'DailyDictation & Study4 LC', 20, N'B1');
INSERT INTO dbo.MultiSkillRoadmap (TrackCode, DayNumber, Skill, TaskTitle, SourcePlatform, EstDurationMinutes, LevelTag) VALUES (N'listening', 5, N'Luyện Nghe & Chép Chính Tả (Daily Dictation & TOEIC)', N'Chép chính tả: TOEIC Section 3 (Hội thoại Part 3)', N'DailyDictation & Study4 LC', 20, N'B2');
INSERT INTO dbo.MultiSkillRoadmap (TrackCode, DayNumber, Skill, TaskTitle, SourcePlatform, EstDurationMinutes, LevelTag) VALUES (N'listening', 6, N'Luyện Nghe & Chép Chính Tả (Daily Dictation & TOEIC)', N'Chép chính tả: TED-Ed & BBC 6 Minute English', N'DailyDictation & Study4 LC', 20, N'B2');
INSERT INTO dbo.MultiSkillRoadmap (TrackCode, DayNumber, Skill, TaskTitle, SourcePlatform, EstDurationMinutes, LevelTag) VALUES (N'speaking', 1, N'Luyện Nói & Phản Xạ (English Everyday Activities & Shadowing)', N'Chủ đề 1: Starting the day (Bắt đầu ngày mới)', N'English Everyday Activities & Video Studio', 20, N'A2');
INSERT INTO dbo.MultiSkillRoadmap (TrackCode, DayNumber, Skill, TaskTitle, SourcePlatform, EstDurationMinutes, LevelTag) VALUES (N'speaking', 2, N'Luyện Nói & Phản Xạ (English Everyday Activities & Shadowing)', N'Chủ đề 2: Brushing your teeth & Flossing (Vệ sinh cá nhân)', N'English Everyday Activities & Video Studio', 20, N'A2');
INSERT INTO dbo.MultiSkillRoadmap (TrackCode, DayNumber, Skill, TaskTitle, SourcePlatform, EstDurationMinutes, LevelTag) VALUES (N'speaking', 3, N'Luyện Nói & Phản Xạ (English Everyday Activities & Shadowing)', N'Chủ đề 6: Making a bed & Tidying room (Dọn dẹp phòng)', N'English Everyday Activities & Video Studio', 20, N'A2');
INSERT INTO dbo.MultiSkillRoadmap (TrackCode, DayNumber, Skill, TaskTitle, SourcePlatform, EstDurationMinutes, LevelTag) VALUES (N'speaking', 4, N'Luyện Nói & Phản Xạ (English Everyday Activities & Shadowing)', N'Chủ đề 10: Eating breakfast & Making coffee (Ăn sáng)', N'English Everyday Activities & Video Studio', 20, N'A2');
INSERT INTO dbo.MultiSkillRoadmap (TrackCode, DayNumber, Skill, TaskTitle, SourcePlatform, EstDurationMinutes, LevelTag) VALUES (N'speaking', 5, N'Luyện Nói & Phản Xạ (English Everyday Activities & Shadowing)', N'Chủ đề 14: Driving along & Commuting (Đi lại trên đường)', N'English Everyday Activities & Video Studio', 20, N'B1');
INSERT INTO dbo.MultiSkillRoadmap (TrackCode, DayNumber, Skill, TaskTitle, SourcePlatform, EstDurationMinutes, LevelTag) VALUES (N'speaking', 6, N'Luyện Nói & Phản Xạ (English Everyday Activities & Shadowing)', N'Chủ đề 17: Taking taxi & Public transport (Bắt taxi)', N'English Everyday Activities & Video Studio', 20, N'B1');
INSERT INTO dbo.MultiSkillRoadmap (TrackCode, DayNumber, Skill, TaskTitle, SourcePlatform, EstDurationMinutes, LevelTag) VALUES (N'speaking', 7, N'Luyện Nói & Phản Xạ (English Everyday Activities & Shadowing)', N'Chủ đề 20: Returning Home & Evening routines (Về nhà)', N'English Everyday Activities & Video Studio', 20, N'B1');
INSERT INTO dbo.MultiSkillRoadmap (TrackCode, DayNumber, Skill, TaskTitle, SourcePlatform, EstDurationMinutes, LevelTag) VALUES (N'reading', 1, N'Đọc Hiểu & Ngữ Pháp Ứng Dụng (B1/B2 Articles & Grammar)', N'Bài đọc: Three experiences I have had (Kỷ niệm & Trải nghiệm)', N'B1 Reading Series & 16 Chuyên Đề', 20, N'B1');
INSERT INTO dbo.MultiSkillRoadmap (TrackCode, DayNumber, Skill, TaskTitle, SourcePlatform, EstDurationMinutes, LevelTag) VALUES (N'reading', 2, N'Đọc Hiểu & Ngữ Pháp Ứng Dụng (B1/B2 Articles & Grammar)', N'Bài đọc: Travel around Europe in 5 stops (Du lịch châu Âu)', N'B1 Reading Series & 16 Chuyên Đề', 20, N'B1');
INSERT INTO dbo.MultiSkillRoadmap (TrackCode, DayNumber, Skill, TaskTitle, SourcePlatform, EstDurationMinutes, LevelTag) VALUES (N'reading', 3, N'Đọc Hiểu & Ngữ Pháp Ứng Dụng (B1/B2 Articles & Grammar)', N'Ngữ pháp ứng dụng: First conditional & future time clauses', N'B1 Reading Series & 16 Chuyên Đề', 20, N'B1');
INSERT INTO dbo.MultiSkillRoadmap (TrackCode, DayNumber, Skill, TaskTitle, SourcePlatform, EstDurationMinutes, LevelTag) VALUES (N'reading', 4, N'Đọc Hiểu & Ngữ Pháp Ứng Dụng (B1/B2 Articles & Grammar)', N'Ngữ pháp ứng dụng: Expressing purpose with To and For', N'B1 Reading Series & 16 Chuyên Đề', 20, N'B1');
INSERT INTO dbo.MultiSkillRoadmap (TrackCode, DayNumber, Skill, TaskTitle, SourcePlatform, EstDurationMinutes, LevelTag) VALUES (N'reading', 5, N'Đọc Hiểu & Ngữ Pháp Ứng Dụng (B1/B2 Articles & Grammar)', N'Bài đọc: Future of AI and Automation in Workplace', N'B1 Reading Series & 16 Chuyên Đề', 20, N'B2');
INSERT INTO dbo.MultiSkillRoadmap (TrackCode, DayNumber, Skill, TaskTitle, SourcePlatform, EstDurationMinutes, LevelTag) VALUES (N'writing-toeic', 1, N'Viết Collocations & Luyện Đề TOEIC (Study4 49 Buổi)', N'Học từ vựng Test 1 Listening (Chắt lọc Part 1 & 2)', N'Study4 Sheet (49 Buổi) & Collocations', 20, N'B1');
INSERT INTO dbo.MultiSkillRoadmap (TrackCode, DayNumber, Skill, TaskTitle, SourcePlatform, EstDurationMinutes, LevelTag) VALUES (N'writing-toeic', 2, N'Viết Collocations & Luyện Đề TOEIC (Study4 49 Buổi)', N'Học từ vựng Test 1 Reading (Chắt lọc Part 5 & 6)', N'Study4 Sheet (49 Buổi) & Collocations', 20, N'B1');
INSERT INTO dbo.MultiSkillRoadmap (TrackCode, DayNumber, Skill, TaskTitle, SourcePlatform, EstDurationMinutes, LevelTag) VALUES (N'writing-toeic', 3, N'Viết Collocations & Luyện Đề TOEIC (Study4 49 Buổi)', N'Luyện viết Collocations: Chủ đề Công việc & Sự nghiệp', N'Study4 Sheet (49 Buổi) & Collocations', 20, N'B1');
INSERT INTO dbo.MultiSkillRoadmap (TrackCode, DayNumber, Skill, TaskTitle, SourcePlatform, EstDurationMinutes, LevelTag) VALUES (N'writing-toeic', 4, N'Viết Collocations & Luyện Đề TOEIC (Study4 49 Buổi)', N'Giải & Chữa đề chi tiết Listening Test 2 (Study4)', N'Study4 Sheet (49 Buổi) & Collocations', 20, N'B2');
INSERT INTO dbo.MultiSkillRoadmap (TrackCode, DayNumber, Skill, TaskTitle, SourcePlatform, EstDurationMinutes, LevelTag) VALUES (N'writing-toeic', 5, N'Viết Collocations & Luyện Đề TOEIC (Study4 49 Buổi)', N'Luyện viết Collocations: Chủ đề Sở thích & Đời sống', N'Study4 Sheet (49 Buổi) & Collocations', 20, N'B1');
INSERT INTO dbo.MultiSkillRoadmap (TrackCode, DayNumber, Skill, TaskTitle, SourcePlatform, EstDurationMinutes, LevelTag) VALUES (N'writing-toeic', 6, N'Viết Collocations & Luyện Đề TOEIC (Study4 49 Buổi)', N'Giải & Chữa đề chi tiết Reading Test 2 (Study4)', N'Study4 Sheet (49 Buổi) & Collocations', 20, N'B2');
GO

-- 9.7 Nạp Kho Từ Vựng Phân Loại Theo Part (Part 1 - Part 7)
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'sit', N'v', N'', N'ngồi', N'A man is sitting at a desk.', N'', N'1', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'stand', N'v', N'', N'đứng', N'She is standing near the window.', N'', N'1', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'walk', N'v', N'', N'đi bộ', N'People are walking on the street.', N'', N'1', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'desk', N'n', N'', N'bàn làm việc', N'Papers are on the desk.', N'', N'1', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'chair', N'n', N'', N'ghế', N'A chair is next to the table.', N'', N'1', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'table', N'n', N'', N'bàn', N'Food is on the table.', N'', N'1', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'window', N'n', N'', N'cửa sổ', N'Light comes through the window.', N'', N'1', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'door', N'n', N'', N'cửa ra vào', N'The door is open.', N'', N'1', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'car', N'n', N'', N'xe ô tô', N'A car is parked on the street.', N'', N'1', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'box', N'n', N'', N'hộp', N'Boxes are stacked on the shelf.', N'', N'1', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'shelf', N'n', N'', N'kệ', N'Books are on the shelf.', N'', N'1', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'floor', N'n', N'', N'sàn nhà', N'Luggage is on the floor.', N'', N'1', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'wall', N'n', N'', N'bức tường', N'A picture hangs on the wall.', N'', N'1', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'road', N'n', N'', N'con đường', N'Vehicles are on the road.', N'', N'1', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'tree', N'n', N'', N'cây', N'Trees line the street.', N'', N'1', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'examine', N'v', N'', N'kiểm tra, xem xét', N'A doctor is examining the patient.', N'', N'1', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'arrange', N'v', N'', N'sắp xếp', N'Flowers are arranged in a vase.', N'', N'1', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'display', N'v/n', N'', N'trưng bày', N'Products are on display.', N'', N'1', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'outdoor', N'adj', N'', N'ngoài trời', N'An outdoor market is crowded.', N'', N'1', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'uniform', N'n', N'', N'đồng phục', N'The workers are wearing uniforms.', N'', N'1', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'equipment', N'n', N'', N'thiết bị, dụng cụ', N'Construction equipment is at the site.', N'', N'1', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'vehicle', N'n', N'', N'phương tiện giao thông', N'Several vehicles are parked.', N'', N'1', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'pedestrian', N'n', N'', N'người đi bộ', N'Pedestrians cross the street.', N'', N'1', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'scaffold', N'n', N'', N'giàn giáo', N'Workers are on scaffolding.', N'', N'1', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'merchandise', N'n', N'', N'hàng hóa', N'Merchandise is neatly stacked.', N'', N'1', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'intersection', N'n', N'', N'ngã tư, giao lộ', N'Cars stop at the intersection.', N'', N'1', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'fountain', N'n', N'', N'đài phun nước', N'There is a fountain in the plaza.', N'', N'1', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'staircase', N'n', N'', N'cầu thang', N'She is walking up the staircase.', N'', N'1', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'corridor', N'n', N'', N'hành lang', N'The corridor is empty.', N'', N'1', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'harbor', N'n', N'', N'bến cảng', N'Ships are docked at the harbor.', N'', N'1', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'assemble', N'v', N'', N'lắp ráp, tập hợp', N'Workers are assembling machinery.', N'', N'1', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'unload', N'v', N'', N'dỡ hàng', N'They are unloading boxes from the truck.', N'', N'1', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'adjacent', N'adj', N'', N'kề bên, tiếp giáp', N'The store is adjacent to the bank.', N'', N'1', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'vacant', N'adj', N'', N'trống, không có người', N'The seat is vacant.', N'', N'1', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'elevated', N'adj', N'', N'cao, được nâng lên', N'An elevated walkway connects the buildings.', N'', N'1', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'cluttered', N'adj', N'', N'lộn xộn, lộn bừa bãi', N'The desk is cluttered with papers.', N'', N'1', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'pave', N'v', N'', N'lát đường', N'Workers are paving the road.', N'', N'1', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'canopy', N'n', N'', N'mái che, tán cây', N'Diners are seated under a canopy.', N'', N'1', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'awning', N'n', N'', N'mái hiên', N'An awning shades the entrance.', N'', N'1', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'cobblestone', N'n', N'', N'đá cuội lát đường', N'The cobblestone street is narrow.', N'', N'1', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'renovate', N'v', N'', N'cải tạo, tu sửa', N'The building is being renovated.', N'', N'1', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'demolish', N'v', N'', N'phá dỡ, đập bỏ', N'Workers are demolishing the old factory.', N'', N'1', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'excavate', N'v', N'', N'đào xới', N'Machines are excavating the site.', N'', N'1', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'juxtapose', N'v', N'', N'đặt cạnh nhau để so sánh', N'Old and new buildings are juxtaposed.', N'', N'1', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'silhouetted', N'adj', N'', N'hiện ra như bóng', N'A figure is silhouetted against the sunset.', N'', N'1', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'excuse me', N'phrase', N'', N'xin lỗi, làm ơn', N'Excuse me, where is the restroom?', N'', N'2', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'sure', N'adv', N'', N'chắc chắn rồi, được thôi', N'Sure, I can help you with that.', N'', N'2', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'later', N'adv', N'', N'sau này, sau đó', N'I''ll do it later.', N'', N'2', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'nearby', N'adj/adv', N'', N'gần đây, ở gần', N'Is there a café nearby?', N'', N'2', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'meeting', N'n', N'', N'cuộc họp', N'When is the meeting?', N'', N'2', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'appointment', N'n', N'', N'cuộc hẹn', N'I have an appointment at 3 PM.', N'', N'2', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'busy', N'adj', N'', N'bận', N'I''m busy right now.', N'', N'2', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'available', N'adj', N'', N'rảnh, có thể, sẵn có', N'Are you available tomorrow?', N'', N'2', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'help', N'v/n', N'', N'giúp đỡ', N'Can I help you?', N'', N'2', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'open', N'adj/v', N'', N'mở cửa, mở', N'Is the store open on Sunday?', N'', N'2', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'closed', N'adj', N'', N'đóng cửa', N'The office is closed today.', N'', N'2', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'call', N'v', N'', N'gọi điện', N'I''ll call you tomorrow.', N'', N'2', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'take', N'v', N'', N'lấy, cần (thời gian)', N'How long will it take?', N'', N'2', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'confirm', N'v', N'', N'xác nhận', N'Can you confirm the reservation?', N'', N'2', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'deadline', N'n', N'', N'hạn chót', N'What''s the deadline for this project?', N'', N'2', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'reschedule', N'v', N'', N'đổi lịch, lên lịch lại', N'We need to reschedule the meeting.', N'', N'2', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'postpone', N'v', N'', N'hoãn lại', N'The event was postponed due to rain.', N'', N'2', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'contact', N'v/n', N'', N'liên lạc', N'Please contact me by email.', N'', N'2', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'forward', N'v', N'', N'chuyển tiếp (email, hồ sơ)', N'I''ll forward the email to you.', N'', N'2', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'submit', N'v', N'', N'nộp, gửi', N'Please submit the report by Friday.', N'', N'2', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'remind', N'v', N'', N'nhắc nhở', N'Can you remind me about the meeting?', N'', N'2', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'approximately', N'adv', N'', N'khoảng, xấp xỉ', N'It takes approximately 30 minutes.', N'', N'2', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'alternatively', N'adv', N'', N'hoặc là, thay vào đó', N'Alternatively, we can meet online.', N'', N'2', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'inquire', N'v', N'', N'hỏi thăm, yêu cầu thông tin', N'I''m calling to inquire about the vacancy.', N'', N'2', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'concur', N'v', N'', N'đồng ý, tán thành', N'I concur with your suggestion.', N'', N'2', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'clarify', N'v', N'', N'làm rõ, giải thích', N'Could you clarify what you mean?', N'', N'2', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'elaborate', N'v', N'', N'giải thích chi tiết hơn', N'Could you elaborate on that point?', N'', N'2', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'tentative', N'adj', N'', N'tạm thời, chưa chắc chắn', N'The date is tentative.', N'', N'2', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'stipulate', N'v', N'', N'quy định, quy ước', N'The contract stipulates a 30-day notice.', N'', N'2', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'ascertain', N'v', N'', N'xác định, tìm hiểu', N'Please ascertain the facts before reporting.', N'', N'2', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'ambiguous', N'adj', N'', N'mơ hồ, không rõ ràng', N'The instructions were ambiguous.', N'', N'2', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'expedite', N'v', N'', N'đẩy nhanh, xúc tiến', N'Can you expedite the approval process?', N'', N'2', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'corroborate', N'v', N'', N'xác nhận (bằng bằng chứng)', N'The report corroborates our findings.', N'', N'2', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'order', N'v/n', N'', N'gọi món, đặt hàng', N'I''d like to order a coffee.', N'', N'3', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'reservation', N'n', N'', N'đặt chỗ, đặt trước', N'I have a reservation under Smith.', N'', N'3', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'receipt', N'n', N'', N'hóa đơn, biên lai', N'Can I have the receipt?', N'', N'3', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'refund', N'n/v', N'', N'hoàn tiền', N'I''d like a refund for this item.', N'', N'3', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'discount', N'n', N'', N'chiết khấu, giảm giá', N'Is there a discount for members?', N'', N'3', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'deliver', N'v', N'', N'giao hàng', N'When will my package be delivered?', N'', N'3', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'repair', N'v/n', N'', N'sửa chữa', N'My laptop needs to be repaired.', N'', N'3', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'hire', N'v', N'', N'thuê, tuyển dụng', N'We are looking to hire new staff.', N'', N'3', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'apply', N'v', N'', N'nộp đơn', N'I''d like to apply for this position.', N'', N'3', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'interview', N'n/v', N'', N'phỏng vấn', N'The interview is on Wednesday.', N'', N'3', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'complain', N'v', N'', N'phàn nàn, khiếu nại', N'She complained about the noise.', N'', N'3', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'accommodate', N'v', N'', N'đáp ứng, cung cấp chỗ ở', N'We can accommodate your request.', N'', N'3', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'subscription', N'n', N'', N'đăng ký dịch vụ', N'I want to cancel my subscription.', N'', N'3', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'negotiate', N'v', N'', N'thương lượng', N'We need to negotiate the price.', N'', N'3', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'proposal', N'n', N'', N'đề xuất, bản đề nghị', N'Have you reviewed the proposal?', N'', N'3', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'shipment', N'n', N'', N'lô hàng, chuyến hàng', N'The shipment arrived this morning.', N'', N'3', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'warranty', N'n', N'', N'bảo hành', N'Is this product still under warranty?', N'', N'3', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'workload', N'n', N'', N'khối lượng công việc', N'My workload has increased recently.', N'', N'3', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'reimburse', N'v', N'', N'hoàn lại tiền, bồi hoàn', N'The company will reimburse your expenses.', N'', N'3', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'collaborate', N'v', N'', N'hợp tác, cộng tác', N'We will collaborate with the marketing team.', N'', N'3', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'merger', N'n', N'', N'vụ sáp nhập', N'The merger will affect both companies.', N'', N'3', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'acquisition', N'n', N'', N'vụ mua lại, thâu tóm', N'The acquisition was announced last week.', N'', N'3', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'procurement', N'n', N'', N'mua sắm, cung ứng', N'The procurement team handles all purchases.', N'', N'3', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'restructure', N'v', N'', N'tái cơ cấu', N'The company plans to restructure its operations.', N'', N'3', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'liquidate', N'v', N'', N'thanh lý', N'They had to liquidate their assets.', N'', N'3', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'arbitrate', N'v', N'', N'phân xử, hòa giải', N'A third party will arbitrate the dispute.', N'', N'3', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'divulge', N'v', N'', N'tiết lộ (thông tin)', N'He refused to divulge company secrets.', N'', N'3', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'indemnify', N'v', N'', N'bồi thường, bồi hoàn', N'The clause will indemnify us against losses.', N'', N'3', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'announcement', N'n', N'', N'thông báo', N'Please listen to the announcement.', N'', N'4', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'weather', N'n', N'', N'thời tiết', N'Today''s weather forecast calls for rain.', N'', N'4', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'traffic', N'n', N'', N'giao thông', N'Heavy traffic is expected on Route 9.', N'', N'4', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'departure', N'n', N'', N'sự khởi hành, lúc cất cánh', N'The departure is at Gate 12.', N'', N'4', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'gate', N'n', N'', N'cổng (sân bay)', N'Please proceed to Gate 5.', N'', N'4', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'delayed', N'adj', N'', N'bị trễ', N'Flight 302 is delayed by one hour.', N'', N'4', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'boarding', N'n', N'', N'lên tàu/máy bay', N'Boarding will begin in 20 minutes.', N'', N'4', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'parking', N'n', N'', N'bãi đỗ xe', N'Free parking is available in Lot B.', N'', N'4', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'discount', N'n', N'', N'giảm giá', N'Get a 20% discount on all items today.', N'', N'4', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'store', N'n', N'', N'cửa hàng', N'Our store closes at 9 PM.', N'', N'4', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'facility', N'n', N'', N'cơ sở vật chất', N'Our facility has been renovated.', N'', N'4', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'itinerary', N'n', N'', N'lịch trình chuyến đi', N'Please review the itinerary.', N'', N'4', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'orientation', N'n', N'', N'định hướng, buổi hướng dẫn ban đầu', N'New employees attend an orientation.', N'', N'4', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'venue', N'n', N'', N'địa điểm tổ chức', N'The conference venue is downtown.', N'', N'4', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'keynote', N'n', N'', N'bài phát biểu chính', N'The keynote speaker is Dr. Lee.', N'', N'4', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'quarterly', N'adj', N'', N'hàng quý', N'Our quarterly report is now available.', N'', N'4', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'complimentary', N'adj', N'', N'miễn phí, tặng kèm', N'Complimentary breakfast is included.', N'', N'4', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'audit', N'n/v', N'', N'kiểm toán, thanh tra', N'An audit will be conducted next week.', N'', N'4', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'inaugurate', N'v', N'', N'khai trương, nhậm chức', N'The mayor will inaugurate the new bridge.', N'', N'4', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'consortium', N'n', N'', N'hiệp hội, liên minh', N'A consortium of banks funded the project.', N'', N'4', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'subsidize', N'v', N'', N'trợ cấp, tài trợ', N'The government subsidizes public transport.', N'', N'4', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'infrastructure', N'n', N'', N'cơ sở hạ tầng', N'The city is investing in infrastructure.', N'', N'4', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'feasibility', N'n', N'', N'tính khả thi', N'A feasibility study was conducted.', N'', N'4', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'regulatory', N'adj', N'', N'thuộc về quy định, pháp lý', N'Regulatory approval is required.', N'', N'4', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'jurisdiction', N'n', N'', N'thẩm quyền pháp lý, quyền tài phán', N'This matter falls under our jurisdiction.', N'', N'4', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'compliance', N'n', N'', N'sự tuân thủ (pháp luật, quy định)', N'Compliance with the new regulations is mandatory.', N'', N'4', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'sanction', N'n/v', N'', N'lệnh trừng phạt; phê chuẩn', N'Economic sanctions were imposed.', N'', N'4', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'ratify', N'v', N'', N'phê chuẩn (hiệp ước, hợp đồng)', N'The agreement was ratified by both parties.', N'', N'4', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'although', N'conj', N'', N'mặc dù', N'Although it was raining, we went out.', N'', N'5', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'because', N'conj', N'', N'bởi vì', N'She left because she was tired.', N'', N'5', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'however', N'adv', N'', N'tuy nhiên', N'However, the project was delayed.', N'', N'5', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'therefore', N'adv', N'', N'do đó, vì vậy', N'Therefore, we need more time.', N'', N'5', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'instead', N'adv', N'', N'thay vào đó', N'Instead, she took the bus.', N'', N'5', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'already', N'adv', N'', N'đã (rồi)', N'The report has already been sent.', N'', N'5', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'still', N'adv', N'', N'vẫn còn', N'The store is still open.', N'', N'5', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'unless', N'conj', N'', N'trừ khi', N'Unless you hurry, we''ll be late.', N'', N'5', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'whether', N'conj', N'', N'liệu... hay không', N'I wonder whether he will come.', N'', N'5', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'while', N'conj', N'', N'trong khi, mặc dù', N'While I like coffee, she prefers tea.', N'', N'5', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'despite', N'prep', N'', N'mặc dù, bất chấp', N'Despite the delay, the event was a success.', N'', N'5', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'regarding', N'prep', N'', N'liên quan đến, về', N'Regarding your inquiry, please see below.', N'', N'5', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'prior to', N'prep', N'', N'trước khi', N'Please review the document prior to the meeting.', N'', N'5', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'subsequent', N'adj', N'', N'sau đó, tiếp theo', N'Subsequent meetings will be held monthly.', N'', N'5', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'accordingly', N'adv', N'', N'theo đó, phù hợp', N'Please plan accordingly.', N'', N'5', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'primarily', N'adv', N'', N'chủ yếu', N'The product is primarily for business use.', N'', N'5', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'considerably', N'adv', N'', N'đáng kể, nhiều', N'Costs have increased considerably.', N'', N'5', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'currently', N'adv', N'', N'hiện tại, hiện nay', N'We are currently updating our system.', N'', N'5', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'notwithstanding', N'prep', N'', N'mặc dù, bất chấp (văn phong trang trọng)', N'Notwithstanding the challenges, we succeeded.', N'', N'5', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'whereas', N'conj', N'', N'trong khi đó (đối lập)', N'He prefers email, whereas she likes phone calls.', N'', N'5', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'henceforth', N'adv', N'', N'từ nay trở đi', N'Henceforth, all reports must be submitted digitally.', N'', N'5', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'contingent upon', N'phrase', N'', N'phụ thuộc vào, có điều kiện là', N'The deal is contingent upon board approval.', N'', N'5', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'inasmuch as', N'conj', N'', N'bởi vì, vì lẽ rằng (trang trọng)', N'Inasmuch as funds are limited, cuts are necessary.', N'', N'5', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'pursuant to', N'prep', N'', N'theo, căn cứ vào (luật pháp)', N'Pursuant to the agreement, payment is due.', N'', N'5', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'therein', N'adv', N'', N'trong đó (trang trọng)', N'The conditions are specified therein.', N'', N'5', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'aforementioned', N'adj', N'', N'đã đề cập ở trên', N'The aforementioned clause is now null.', N'', N'5', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'subject to', N'prep phrase', N'', N'tùy thuộc vào, chịu sự chi phối của', N'Prices are subject to change without notice.', N'', N'5', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'in lieu of', N'prep phrase', N'', N'thay vì, thay thế cho', N'Cash was accepted in lieu of a check.', N'', N'5', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'sincerely', N'adv', N'', N'chân thành (dùng để kết thúc thư)', N'Sincerely, John Smith', N'', N'6', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'attached', N'adj', N'', N'đính kèm', N'Please find the document attached.', N'', N'6', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'regarding', N'prep', N'', N'về việc, liên quan đến', N'Regarding your order, we have an update.', N'', N'6', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'enclosed', N'adj', N'', N'kèm theo, đính kèm (trong bì thư)', N'Please see the enclosed brochure.', N'', N'6', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'promptly', N'adv', N'', N'ngay lập tức, đúng giờ', N'Please reply promptly.', N'', N'6', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'schedule', N'n/v', N'', N'lịch trình; lên lịch', N'Please schedule a meeting at your convenience.', N'', N'6', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'inform', N'v', N'', N'thông báo, cho biết', N'I am writing to inform you of a change.', N'', N'6', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'inquire', N'v', N'', N'hỏi thăm', N'I am writing to inquire about your services.', N'', N'6', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'further', N'adj/adv', N'', N'thêm nữa, hơn nữa', N'For further information, please contact us.', N'', N'6', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'acknowledge', N'v', N'', N'xác nhận, thừa nhận', N'We acknowledge receipt of your application.', N'', N'6', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'herein', N'adv', N'', N'trong đây, ở đây', N'The terms herein are binding.', N'', N'6', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'pursuant', N'adj', N'', N'theo, tuân theo', N'Pursuant to our agreement, we will proceed.', N'', N'6', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'tentatively', N'adv', N'', N'tạm thời, chưa chắc chắn', N'The meeting is tentatively set for Monday.', N'', N'6', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'initiate', N'v', N'', N'khởi xướng, bắt đầu', N'We will initiate the process immediately.', N'', N'6', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'finalize', N'v', N'', N'hoàn tất, kết thúc', N'We need to finalize the contract.', N'', N'6', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'implementation', N'n', N'', N'sự thực hiện, triển khai', N'The implementation will begin next month.', N'', N'6', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'comprehensive', N'adj', N'', N'toàn diện, đầy đủ', N'A comprehensive review is needed.', N'', N'6', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'disseminate', N'v', N'', N'phổ biến, truyền bá', N'We will disseminate the information widely.', N'', N'6', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'supersede', N'v', N'', N'thay thế, thay thế cho', N'This policy supersedes the previous one.', N'', N'6', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'mitigate', N'v', N'', N'giảm nhẹ, giảm thiểu', N'Steps were taken to mitigate the risk.', N'', N'6', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'construe', N'v', N'', N'hiểu, giải thích (theo một nghĩa nào đó)', N'This should not be construed as an admission.', N'', N'6', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'commensurate', N'adj', N'', N'tương xứng, phù hợp (về mức độ)', N'Salary is commensurate with experience.', N'', N'6', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'perfunctory', N'adj', N'', N'hời hợt, qua loa', N'The review was perfunctory at best.', N'', N'6', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'unilateral', N'adj', N'', N'đơn phương', N'The decision was made unilaterally.', N'', N'6', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'reciprocal', N'adj', N'', N'có đi có lại, tương hỗ', N'The agreement is reciprocal.', N'', N'6', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'irrevocable', N'adj', N'', N'không thể hủy bỏ', N'This is an irrevocable commitment.', N'', N'6', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'advertisement', N'n', N'', N'quảng cáo', N'I saw the advertisement in the newspaper.', N'', N'7', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'article', N'n', N'', N'bài báo, mặt hàng', N'The article discusses new trends.', N'', N'7', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'brochure', N'n', N'', N'tập tài liệu, tờ rơi', N'Please read the product brochure.', N'', N'7', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'notice', N'n', N'', N'thông báo', N'A notice was posted on the bulletin board.', N'', N'7', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'memo', N'n', N'', N'bản ghi nhớ, công văn nội bộ', N'The manager sent a memo to all staff.', N'', N'7', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'newsletter', N'n', N'', N'bản tin', N'Subscribe to our monthly newsletter.', N'', N'7', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'survey', N'n', N'', N'khảo sát', N'Please complete the customer survey.', N'', N'7', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'review', N'n/v', N'', N'đánh giá, xem xét', N'The product has excellent reviews.', N'', N'7', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'policy', N'n', N'', N'chính sách', N'Please read our return policy carefully.', N'', N'7', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'guarantee', N'n/v', N'', N'bảo đảm, cam kết', N'We guarantee delivery within 3 days.', N'', N'7', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'correspondence', N'n', N'', N'thư từ, trao đổi thư tín', N'All correspondence should go through HR.', N'', N'7', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'excerpt', N'n', N'', N'đoạn trích', N'The following is an excerpt from the report.', N'', N'7', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'inference', N'n', N'', N'suy luận, kết luận', N'You can make an inference from the data.', N'', N'7', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'implication', N'n', N'', N'hàm ý, ý nghĩa (tiềm ẩn)', N'What are the implications of this decision?', N'', N'7', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'mandatory', N'adj', N'', N'bắt buộc', N'Attendance at the meeting is mandatory.', N'', N'7', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'criteria', N'n', N'', N'tiêu chí (số nhiều của criterion)', N'What are the criteria for selection?', N'', N'7', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'revenue', N'n', N'', N'doanh thu', N'Revenue has increased by 15% this year.', N'', N'7', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'expenditure', N'n', N'', N'chi tiêu, chi phí', N'Monthly expenditure must be tracked.', N'', N'7', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'demographic', N'n/adj', N'', N'nhân khẩu học', N'We need to target a younger demographic.', N'', N'7', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'proliferate', N'v', N'', N'phát triển nhanh chóng, lan rộng', N'Online services have proliferated rapidly.', N'', N'7', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'paradigm', N'n', N'', N'mô hình, hệ tư duy', N'This represents a paradigm shift.', N'', N'7', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'stakeholder', N'n', N'', N'bên liên quan, cổ đông', N'All stakeholders were informed.', N'', N'7', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'benchmark', N'n', N'', N'tiêu chuẩn tham chiếu, điểm chuẩn', N'Set a benchmark for performance.', N'', N'7', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'synergy', N'n', N'', N'sự hiệp lực, sức mạnh tổng hợp', N'The merger created positive synergies.', N'', N'7', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'unequivocal', N'adj', N'', N'rõ ràng, không mơ hồ', N'The findings are unequivocal.', N'', N'7', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'extrapolate', N'v', N'', N'suy diễn, ngoại suy', N'We can extrapolate future trends.', N'', N'7', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'corroborate', N'v', N'', N'xác nhận bằng bằng chứng', N'New data corroborates earlier findings.', N'', N'7', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'substantiate', N'v', N'', N'chứng minh, xác nhận (bằng bằng chứng)', N'Please substantiate your claims.', N'', N'7', N'B1');
INSERT INTO dbo.Vocabulary (Word, WordType, IPA, MeaningVI, ExampleEN, ExampleVI, PartCode, LevelTag) VALUES (N'equivocate', N'v', N'', N'nói mập mờ, nói nước đôi', N'Don''t equivocate — give a clear answer.', N'', N'7', N'B1');
GO
