const fileInput = document.getElementById('fileInput');
const preview = document.getElementById('preview');

fileInput.addEventListener('change', () => {
    preview.innerHTML = '';  // 이전 미리보기 지우기
    const files = fileInput.files;

    Array.from(files).forEach(file => {
        const fileReader = new FileReader();

        fileReader.onload = (e) => {
            let element;
            if (file.type.startsWith('image/')) {
                element = document.createElement('img');
                element.src = e.target.result;
            } else if (file.type.startsWith('video/')) {
                element = document.createElement('video');
                element.src = e.target.result;
                element.controls = true;
            }
            element.style.width = '200px';
            preview.appendChild(element);
        };
        fileReader.readAsDataURL(file);
    });
});

// 파일 업로드 함수
function uploadFiles() {
    const formData = new FormData();
    Array.from(fileInput.files).forEach(file => {
        formData.append('files[]', file);
    });

    fetch('/upload', {
        method: 'POST',
        body: formData,
    })
        .then(response => response.json())
        .then(data => console.log('Success:', data))
        .catch(error => console.error('Error:', error));
}
