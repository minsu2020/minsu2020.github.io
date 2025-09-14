let score = 0; // 현재 점수
let level = 1; // 현재 레벨
let experience = 0; // 경험치
let experienceToLevelUp = 100; // 레벨업에 필요한 경험치
let autoClickerCount = 0; // 자동 클릭기 개수
let autoClickerCost = 100; // 자동 클릭기 가격

// 지역 해방 시스템
let regions = ['지역 1: 시작 지역']; // 기본 지역
let regionUnlockLevel = 5; // 지역 해방에 필요한 레벨

// HTML 요소들
const scoreDisplay = document.getElementById('score');
const levelDisplay = document.getElementById('level');
const experienceDisplay = document.getElementById('experience');
const clickButton = document.getElementById('clickButton');
const unlockRegionButton = document.getElementById('unlockRegion');
const autoClickerButton = document.getElementById('buyAutoClicker');
const autoClickerStatus = document.getElementById('autoClickerStatus');
const regionsList = document.getElementById('regionsList');

// 클릭 시 점수와 경험치 증가
clickButton.addEventListener('click', () => {
    score++;
    experience += 10; // 클릭당 10 경험치 추가
    checkLevelUp();
    updateUI();
});

// 지역 해방
unlockRegionButton.addEventListener('click', () => {
    if (level >= regionUnlockLevel) {
        regions.push(`지역 ${regions.length + 1}: 새로운 지역`);
        updateRegions();
        alert('새로운 지역이 해방되었습니다!');
    } else {
        alert(`레벨 ${regionUnlockLevel} 이상이어야 지역을 해방할 수 있습니다.`);
    }
});

// 자동 클릭기 구매
autoClickerButton.addEventListener('click', () => {
    if (score >= autoClickerCost) {
        score -= autoClickerCost;
        autoClickerCount++;
        autoClickerCost = Math.floor(autoClickerCost * 1.5); // 가격 증가
        updateUI();
    } else {
        alert('점수가 부족합니다!');
    }
});

// 자동 클릭기 작동 (1초마다 점수 증가)
setInterval(() => {
    if (autoClickerCount > 0) {
        score += autoClickerCount; // 자동 클릭기 개수만큼 점수 증가
        updateUI();
    }
}, 1000);

// 레벨업 체크
function checkLevelUp() {
    if (experience >= experienceToLevelUp) {
        experience -= experienceToLevelUp;
        level++;
        experienceToLevelUp = Math.floor(experienceToLevelUp * 1.2); // 레벨업 필요 경험치 증가
    }
}

// UI 업데이트 함수
function updateUI() {
    scoreDisplay.textContent = `점수: ${score}`;
    levelDisplay.textContent = `레벨: ${level}`;
    experienceDisplay.textContent = `경험치: ${experience} / ${experienceToLevelUp}`;
    autoClickerStatus.textContent = `자동 클릭기: ${autoClickerCount}개`;
}

// 지역 목록 업데이트
function updateRegions() {
    regionsList.innerHTML = '';
    regions.forEach(region => {
        const li = document.createElement('li');
        li.textContent = region;
        regionsList.appendChild(li);
    });
}

// 초기 UI 업데이트
updateUI();
