function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var piece = document.getElementById(data);
    ev.target.appendChild(piece);
    piece.style.position = 'static'; // 퍼즐 조각의 위치를 고정시킵니다.
    checkPuzzleCompletion(); // 드롭 이벤트 후 완성 여부 체크
}


document.addEventListener("DOMContentLoaded", function() {
    const pieces = document.querySelectorAll('.puzzle-piece');
    pieces.forEach(piece => {
        // 뷰포트 크기에 맞춰 무작위 위치 결정
        const maxX = window.innerWidth - 100; // 조각 너비를 고려
        const maxY = window.innerHeight - 100; // 조각 높이를 고려
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        
        piece.style.left = `${randomX}px`;
        piece.style.top = `${randomY}px`;
    });
});

// 퍼즐 조각의 수
const pieceCount = 9;

// 퍼즐 조각을 무작위 위치로 배치하는 함수
function shufflePieces() {
    const pieces = document.querySelectorAll('.puzzle-piece');
    const used = new Set(); // 이미 사용한 위치를 기록하기 위한 Set

    // used.add()

    pieces.forEach(piece => {
        let validPosition = false;
        let left, top;

        // 겹치지 않는 유효한 위치를 찾을 때까지 반복
        while (!validPosition) {
            left = Math.floor(Math.random() * (window.innerWidth - 300));
            top = Math.floor(Math.random() * (window.innerHeight - 200));

            // 새로운 위치와 모든 사용된 위치를 비교하여 겹치는지 확인
            validPosition = !Array.from(used).some(pos => {
                const [usedLeft, usedTop] = pos;
                return Math.abs(left - usedLeft) < 300 && Math.abs(top - usedTop) < 200;
            });
        }

        // 해당 위치를 사용한 것으로 기록
        used.add([left, top]);

        // 퍼즐 조각의 위치를 설정
        piece.style.left = `${left}px`;
        piece.style.top = `${top}px`;
    });
}

// 페이지 로드 시 퍼즐 조각 배치
window.onload = shufflePieces;



function checkPuzzleCompletion() {
    let allFilled = true;
    const puzzlePieces = document.querySelectorAll('#text div');
    puzzlePieces.forEach(div => {
        if (!div.hasChildNodes()) {
            allFilled = false;
        }
    });

    if (allFilled) {
        document.getElementById('congratulations').style.display = 'block';
    }
}


