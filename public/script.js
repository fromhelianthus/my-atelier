// public/script.js
document.addEventListener("DOMContentLoaded", function () {
    fetch("/images") // 서버에서 '/images' 엔드포인트로 데이터를 가져옴
        .then((response) => response.json()) // JSON으로 응답 받기
        .then((data) => {
            const gallery = document.getElementById("gallery"); // 이미지가 추가될 곳
            data.forEach((image) => {
                const imgElement = document.createElement("img");
                imgElement.src = image.image_path; // S3 이미지 경로 사용
                imgElement.alt = image.image_name; // 이미지 이름
                imgElement.style.width = "640px"; // 이미지 크기 조정 (필요 시 조정 가능)
                gallery.appendChild(imgElement); // 이미지를 갤러리에 추가
            });
        })
        .catch((err) => console.error("Error fetching images:", err));
});
