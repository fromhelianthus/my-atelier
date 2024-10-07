require("dotenv").config(); // dotenv로 환경 변수 불러오기
const express = require("express");
const mysql = require("mysql2/promise"); // promise를 사용하여 비동기 처리
const path = require("path");

const app = express();

// RDS 연결 설정 (환경 변수 사용)
const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// 정적 파일 서빙 (public 폴더에서 HTML/CSS/JS 파일 서빙)
app.use(express.static(path.join(__dirname, "public")));

// 이미지 데이터를 반환하는 API 엔드포인트
app.get("/images", async (req, res) => {
    try {
        const [results] = await connection.query("SELECT * FROM resources");
        // 결과를 JSON 형태로 반환
        res.status(200).json(results);
    } catch (error) {
        console.error(error);
        res.status(500).send("Database error");
    }
});

// 기본 라우트 (정적 파일이 없을 경우 404 처리)
app.use((req, res) => {
    res.status(404).send("Not Found");
});

// 서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
