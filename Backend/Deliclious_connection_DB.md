DB명 Deliclioius_connection
로그인 테이블 users
게시판 테이블 posts

CREATE TABLE users (
id INT AUTO_INCREMENT PRIMARY KEY,
email VARCHAR(255) NOT NULL,
password VARCHAR(255) NOT NULL
);

CREATE TABLE posts (
id INT AUTO_INCREMENT PRIMARY KEY, // 게시물의 id를 자동으로 증가시킨다.
title VARCHAR(255) NOT NULL,
content TEXT NOT NULL,
createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

커뮤니티 기능은 크게 4가지

1. 게시글 작성
2. 게시글 조회
3. 게시글 수정
4. 게시글 삭제
