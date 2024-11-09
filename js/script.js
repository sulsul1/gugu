
var color = 9;
var colorName = ["빨강", "주황", "노랑", "초록", "파랑", "남색", "보라", "핑크", "검정", "흰색"];
var colorList = ["#ff0000", "#ff7f00", "#ffff00", "#00ff00", "#0000ff", "#000080", "#800080", "#ff69b4", "#000000", "#ffffff"];
var 전갈데이터 = "9\n2,9,8\n6,9,8\n3,8,8\n5,8,8\n3,7,0\n4,7,8\n5,7,0\n3,6,8\n4,6,8\n5,6,8\n3,5,8\n4,5,8\n5,5,8\n3,4,8\n4,4,8\n5,4,8\n3,3,8\n4,3,8\n5,3,8\n7,3,8\n4,2,8\n7,2,8\n4,1,8\n5,1,8\n6,1,8\n7,1,8"
var 소방차데이터 = "9\n4,6,1\n5,6,4\n4,5,1\n4,4,1\n2,3,0\n3,3,0\n4,3,1\n5,3,0\n2,2,0\n3,2,5\n4,2,0\n5,2,0\n6,2,0\n7,2,0\n2,1,0\n3,1,8\n4,1,0\n5,1,0\n6,1,8\n7,1,0"
var 꽃데이터 = "9\n4,10,7\n3,9,7\n4,9,2\n5,9,7\n10,9,0\n1,8,0\n4,8,7\n9,8,0\n10,8,2\n7,7,7\n10,7,0\n2,6,6\n6,6,7\n7,6,0\n8,6,7\n1,5,6\n2,5,7\n3,5,6\n7,5,7\n2,4,6\n6,3,1\n10,3,0\n1,2,0\n5,2,1\n6,2,0\n7,2,1\n9,2,0\n10,2,2\n6,1,1\n10,1,0"
var 딸기데이터 = "9\n4,9,3\n7,9,3\n5,8,3\n6,8,3\n4,7,0\n5,7,0\n6,7,0\n7,7,0\n3,6,0\n4,6,8\n5,6,0\n6,6,0\n7,6,8\n8,6,0\n3,5,0\n4,5,0\n5,5,0\n6,5,8\n7,5,0\n8,5,0\n3,4,0\n4,4,8\n5,4,0\n6,4,0\n7,4,0\n8,4,0\n4,3,0\n5,3,0\n6,3,8\n7,3,0\n4,2,0\n5,2,8\n6,2,0\n7,2,0\n5,1,0\n6,1,0"
var pixelBox = document.getElementById("pixelDiv")
var selectBox = document.getElementById("selectColorBox")
var colorBox = document.getElementById("colorList")
let xOffset = 0;
const canvasWidth = 10; // 캔버스 너비


function 픽셀초기화(n) {
    const pixels = pixelBox.querySelectorAll('div.boxes');
    pixels.forEach((pixel) => {
        pixel.style.backgroundColor = colorList[n]; // 첫 줄에 해당하는 색상으로 초기화
        pixel.dataset.color = n.toString()
    })
}


function drawFromCoordinates(coordinates) { //좌표를 그림으로 그리기
    const backgroundColorIndex = parseInt(coordinates[0], 10);
    if (isNaN(backgroundColorIndex) || backgroundColorIndex < 0 || backgroundColorIndex >= colorList.length) {
        console.error('잘못된 배경색 인덱스입니다:', coordinates[0]);
        return;
    }
    픽셀초기화(backgroundColorIndex);
    coordinates.slice(1).forEach((coordinate) => {
        const [x, y, colorIndex] = coordinate.split(',').map(Number);
        if (x >= 1 && x <= 10 && y >= 1 && y <= 10 && colorIndex >= 0 && colorIndex < colorList.length) {
            const pixelIndex = (10 - y) * 10 + (x - 1); // 인덱스 계산
            if (pixelIndex < pixels.length) {
                const pixel = pixels[pixelIndex];
                pixel.style.backgroundColor = colorList[colorIndex];
                pixel.dataset.color = colorIndex;
            } else {
                console.error(`좌표값이 벗어 남: ${pixelIndex}`);
            }
        } else {
            console.error('범위를 벗어남:', coordinate);
        }
    });
}


function movePixels(dx, dy) {

    const pixels = pixelBox.querySelectorAll('div.boxes');
    const currentColors = Array.from(pixels).map(pixel => pixel.dataset.color);
    const newColors = Array(100).fill(9); 
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            const newX = (x + dx + 10) % 10; 
            const newY = (y + dy + 10) % 10; 
            const oldIndex = y * 10 + x; 
            const newIndex = newY * 10 + newX; 
            newColors[newIndex] = currentColors[oldIndex]; 
        }
    }
    pixels.forEach((pixel, index) => {
        pixel.dataset.color = newColors[index];
        pixel.style.backgroundColor = colorList[newColors[index]];
    });
}


function makePixel(n, m, pixelSize, t) { // 픽셀만들기 
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexWrap = 'wrap';
    container.style.width = pixelSize * n * 2.5 + 'px';
    for (let i = 0; i < n * m; i++) {
        const pixel = document.createElement('div');
        pixel.className = 'boxes'
        pixel.style.width = pixelSize + 'px';
        pixel.style.height = pixelSize + 'px';
        pixel.dataset.color = color
        pixel.style.backgroundColor = colorList[color]
        pixel.addEventListener("click", (e) => {
            e.target.style.backgroundColor = colorList[color];
            e.target.dataset.color = color;
        })
        pixel.addEventListener("dblclick", (e) => {
            e.target.style.backgroundColor = '#ffffff'
            e.target.dataset.color = color
        })
        container.appendChild(pixel);
    }
    t.appendChild(container);
}


function getCoodinated(n) { // 그림에서 좌표 가져오기 
    let result = "";
    const pixels = pixelBox.querySelectorAll('div.boxes'); // 모든 픽셀 선택
    pixels.forEach((pixel, index) => {
        colorIndex = pixel.dataset.color
        const x = index % 10 + 1;
        const y = 10 - Math.floor(index / 10);
        if (colorIndex != n) {
            result += `${x},${y},${colorIndex}\n`
        }

    });
    return result.trim();
}


function makeColorList() { // 컬러 팔레트 만들기 

    var colorName = ["빨강", "주황", "노랑", "초록", "파랑", "남색", "보라", "핑크", "검정", "흰색"];
    var colorList = ["#ff0000", "#ff7f00", "#ffff00", "#00ff00", "#0000ff", "#000080", "#800080", "#ff69b4", "#000000", "#ffffff"];

    for (var i = 0; i < 10; i++) {
        var div = document.createElement("div");
        div.className = 'color-item'
        div.style.backgroundColor = colorList[i];
        div.textContent = i
        div.addEventListener("click", (e) => {
            color = e.target.textContent;
            selectBox.style.backgroundColor = colorList[color]
        })
        colorBox.appendChild(div);
    }
}


function getMostFrequentColor() { // 가장 많이 쓰는 컬러 찾기 
    let count = Array(10).fill(0).map((v, i) => [i, 0])
    const pixels = pixelBox.querySelectorAll('div.boxes')
    pixels.forEach((v) => {
        count[parseInt(v.dataset.color)][1]++;
    })
    return count.sort((a, b) => b[1] - a[1])[0][0] 
}


function savePixelArt() {
    const studentId = prompt("그림 제목를 입력해 주세요.");
    if (!studentId) return;

    const pixels = pixelBox.querySelectorAll('div.boxes');
    const artData = Array.from(pixels).map(pixel => pixel.dataset.color);
    localStorage.setItem(studentId, JSON.stringify(artData));
    // const savePixel = document.createElement('div');
    // savePixel.className = 'sample'
    // savePixel.textContent = studentId;
    // document.getElementById('저장고').appendChild(savePixel);
    alert('픽셀 아트 저장 성공');
}

function loadPixelArt() {
    const studentId = prompt("그림 제목을 입력해 주세요.");
    if (!studentId) return;

    // Load data from localStorage
    const artData = localStorage.getItem(studentId);

    if (artData) {
        // Parse and apply pixel colors
        const pixels = pixelBox.querySelectorAll('div.boxes');
        JSON.parse(artData).forEach((colorIndex, i) => {
            pixels[i].dataset.color = colorIndex;
            pixels[i].style.backgroundColor = colorList[colorIndex];
        });
        alert("픽셀 아트 로딩 성공");
    } else {
        alert("데이터가 없습니다.");
    }
}








function 지우기() {
    const pixels = pixelBox.querySelectorAll('div.boxes');
    pixels.forEach((pixel) => {
        pixel.style.backgroundColor = colorList[9];
        pixel.dataset.color = 9;
        color = 9
        selectBox.style.backgroundColor = colorList[color]
    });
    document.getElementById('txtArea').textContent = ""
};



function getPoint() {
    let data = getMostFrequentColor()
    document.getElementById('txtArea').textContent = data + "\n" + getCoodinated(data)
}

function saveCoodinated(data) {
    localStorage.setItem('coodinate', JSON.stringify(data))
}

function loadCoodinated() { 
    var result = localStorage.getItem('coodinate')
    return result;
}

// mysql 사용시 
// function savePixelArt() {
//     const student_id = prompt("학생 아이디를 입력해 주세요.");
//     if (!student_id) return;

//     // Collect pixel data
//     const pixels = pixelBox.querySelectorAll('div.boxes');
//     const artData = Array.from(pixels).map(pixel => pixel.dataset.color);

//     // Send data to PHP for saving
//     fetch('save_pixel_art.php', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             },
//             body: new URLSearchParams({
//                 'student_id': student_id,
//                 'art_data': JSON.stringify(artData)
//             })
//         })
//         .then(response => response.text())
//         .then(data => alert(data))
//         .catch(error => console.error('Error:', error));
// }

// function loadPixelArt() {
//     const student_id = prompt("학생 아이디를 입력해 주세요.");
//     if (!student_id) return;

//     // Request pixel data from PHP
//     fetch(`load_pixel_art.php?student_id=${student_id}`)
//         .then(response => response.json())
//         .then(artData => {
//             if (artData) {
//                 // Parse and apply pixel colors
//                 const pixels = pixelBox.querySelectorAll('div.boxes');
//                 JSON.parse(artData).forEach((colorIndex, i) => {
//                     pixels[i].dataset.color = colorIndex;
//                     pixels[i].style.backgroundColor = colorList[colorIndex];
//                 });
//                 alert("픽셀 아트 로딩 성공");
//             } else {
//                 alert("데이터가 없습니다. ");
//             }
//         })
//         .catch(error => console.error('Error:', error));
// }

// Bind to save/load buttons


document.getElementById('txtArea').addEventListener('keydown', (event) => {

    if (event.key === 'Enter') {
        //event.preventDefault(); // 기본 엔터 키 동작(줄바꿈) 방지
        const coordinatesText = document.getElementById('txtArea').value;
        const coordinates = coordinatesText.split('\n').map(line => line.trim()).filter(line => line);
        if (coordinates.length > 0) {
            drawFromCoordinates(coordinates);
        } else {
            console.error('좌표 입력이 잘못되었습니다.');
        }
    }
});

document.addEventListener('keydown', (event) => {
    const key = event.key;
    const number = parseInt(key);

    if (key === 'w') {
        movePixels(0, -1);
        getPoint()
    } else if (key === 's') {
        movePixels(0, 1);
        getPoint()
    } else if (key === 'a') {
        movePixels(-1, 0);
        getPoint()
    } else if (key === 'd') {
        movePixels(1, 0);
        getPoint()
    }
});

document.getElementById('좌표표시').addEventListener('click', () => {
    const coordinatesText = document.getElementById('txtArea').value;
    const coordinates = coordinatesText.split('\n').map(line => line.trim()).filter(line => line);

    if (coordinates.length > 0) {
        drawFromCoordinates(coordinates);
    } else {
        console.error('좌표 입력이 잘못되었습니다.');
    }
});


document.getElementById('저장하기').addEventListener('click', savePixelArt);
document.getElementById('불러오기').addEventListener('click', loadPixelArt);

document.getElementById('전갈').addEventListener('click', (e) => {
    document.getElementById('txtArea').textContent = 전갈데이터
    document.getElementById('좌표표시').click()
});

document.getElementById('소방차').addEventListener('click', (e) => {
    document.getElementById('txtArea').textContent = 소방차데이터;
    document.getElementById('좌표표시').click()
});

document.getElementById('꽃').addEventListener('click', (e) => {
    document.getElementById('txtArea').textContent = 꽃데이터;
    document.getElementById('좌표표시').click()
});

document.getElementById('딸기').addEventListener('click', (e) => {
    document.getElementById('txtArea').textContent = 딸기데이터;
    document.getElementById('좌표표시').click()
});

document.getElementById('좌표가져오기').addEventListener('click', (e) => {
    let data = getMostFrequentColor()
    document.getElementById('txtArea').textContent = data + "\n" + getCoodinated(data)
})

document.getElementById('전부지우기').addEventListener('click', () => 지우기())

document.getElementById('지우기').addEventListener('click', () => 지우기())

document.getElementById('팔레트').addEventListener('click', () => {
    const palettes = document.getElementById('propert')
    palettes.style.display = palettes.style.display === 'none' ? 'block' : 'none';
})

document.getElementById('칠하기').addEventListener('click', (e) => {
    const pixels = pixelBox.querySelectorAll('div')
    pixels.forEach((v, i) => {
        if (i != 0) {
            v.style.backgroundColor = colorList[color];
            v.dataset.color = color
        }
    })})



makeColorList()
makePixel(10, 10, 20, pixelBox)