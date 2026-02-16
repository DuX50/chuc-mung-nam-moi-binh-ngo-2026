// Mốc thời gian Giao thừa Tết Bính Ngọ: 00:00:00 ngày 17/02/2026
const targetDate = new Date("Feb 17, 2026 00:00:00").getTime();

const music = document.getElementById('bg-music');
const startBtn = document.getElementById('start-btn');
const overlay = document.getElementById('overlay');

// 1. Xử lý khi bấm nút bắt đầu
startBtn.addEventListener('click', () => {
    music.play().catch(e => console.log("Lỗi nhạc:", e));
    overlay.style.opacity = '0';
    setTimeout(() => overlay.style.display = 'none', 500);
});

// 2. Cập nhật đồng hồ
function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
        // ĐÃ ĐẾN GIAO THỪA
        document.getElementById("countdown").classList.add("hidden");
        document.getElementById("title").classList.add("hidden");
        document.getElementById("wish-container").classList.remove("hidden");
        
        launchFireworks(); // Bắn pháo hoa
        return;
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = d < 10 ? '0' + d : d;
    document.getElementById("hours").innerText = h < 10 ? '0' + h : h;
    document.getElementById("minutes").innerText = m < 10 ? '0' + m : m;
    document.getElementById("seconds").innerText = s < 10 ? '0' + s : s;
}

// 3. Hiệu ứng pháo hoa
function launchFireworks() {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
            // Sau 5s vẫn tiếp tục bắn rải rác cho đẹp
            return confetti({ ...defaults, particleCount: 20, origin: { x: Math.random(), y: Math.random() - 0.2 } });
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
}

// Chạy vòng lặp
setInterval(updateCountdown, 1000);
updateCountdown();