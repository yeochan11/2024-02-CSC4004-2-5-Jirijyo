import React, { useState } from "react";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [rotatedImage, setRotatedImage] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("이미지를 선택하세요.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch("/rotate-image", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setRotatedImage(imageUrl);
      } else {
        alert("이미지 처리 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (

    

      <main class="upload-container">
         <header>
    <h1>객체 인식 AI</h1>
    <p>저조도 환경에서 객체 인식을 해보세요</p>
  </header>
        <div class="upload-box" id="uploadBox">
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <p>여기에 파일을 드래드하거나 클릭하여 업로드하세요</p>
        {rotatedImage && (
          <div>
            <img src={rotatedImage} alt="Rotated" style={{ maxWidth: "100%" }} />
          </div>
        )}
        </div>
        <footer>
        <button class="convert-button" onClick={handleUpload}>이미지 업로드</button>
        </footer>
      </main>
      
    
  );
}

export default App;
