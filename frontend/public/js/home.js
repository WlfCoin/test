const API_URL = "/api/home";
let timerInterval;

// دریافت داده‌های کاربر هنگام بارگذاری صفحه
window.addEventListener("load", async () => {
    try {
        const response = await fetch(`${API_URL}/get-user-data`);
        const { miner, user } = await response.json();

        // اگر کاربر اطلاعاتی نداشت، مقدار پیش‌فرض تنظیم شود
        document.getElementById("user-name").textContent = user?.username || "Guest";
        document.getElementById("user-points").textContent = `${miner?.accumulatedPoints || 0} Points`;
        document.getElementById("mining-rate").textContent = `${miner?.rate || 0.5} /h`;

        // اگر تایمر فعال بود، ادامه‌ی تایمر
        const savedTime = localStorage.getItem("remainingTime");
        if (savedTime && parseInt(savedTime) > 0) {
            startMining(parseInt(savedTime));
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Failed to load user data. Please try again.");
    }
});

// مدیریت کلیک دکمه Hunt
document.getElementById("hunt-button").addEventListener("click", () => {
    const button = document.getElementById("hunt-button");
    if (button.textContent === "Claim") {
        claimRewards();
    } else {
        startMining();
    }
});

// شروع ماینینگ
function startMining(remainingTime = 4 * 60 * 60) {
    clearInterval(timerInterval);
    localStorage.setItem("remainingTime", remainingTime);

    document.getElementById("hunt-button").textContent = "Mining...";
    document.getElementById("hunt-button").disabled = true;

    timerInterval = setInterval(() => {
        remainingTime--;
        document.getElementById("timer-display").textContent = formatTime(remainingTime);
        localStorage.setItem("remainingTime", remainingTime);

        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            localStorage.removeItem("remainingTime");

            document.getElementById("hunt-button").textContent = "Claim";
            document.getElementById("hunt-button").disabled = false;
        }
    }, 1000);
}

// فرمت زمان برای تایمر
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// ثبت جوایز پس از Claim
async function claimRewards() {
    try {
        const response = await fetch(`${API_URL}/update-points`, { method: "POST" });
        if (!response.ok) throw new Error("Failed to claim rewards.");

        const { updatedPoints } = await response.json();
        document.getElementById("user-points").textContent = `${updatedPoints} Points`;

        alert("🎉 Your points have been updated!");
        document.getElementById("hunt-button").textContent = "Hunt";
    } catch (error) {
        console.error("Error claiming rewards:", error);
        alert("Failed to claim rewards. Please try again.");
    }
}
