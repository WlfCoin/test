const API_URL = "/api/bonus";

window.addEventListener("load", async () => {
    try {
        const response = await fetch(`${API_URL}/get-status`);
        const { activeDays, totalDays } = await response.json();

        // Update UI
        for (let i = 1; i <= totalDays; i++) {
            const button = document.getElementById(`day-${i}`);
            if (i <= activeDays) {
                button.classList.remove("inactive");
                button.classList.add("active");
                button.disabled = false;
                button.onclick = () => claimBonus(i);
            }
        }
    } catch (error) {
        console.error("Error loading bonus status:", error);
    }
});

async function claimBonus(day) {
    try {
        const response = await fetch(`${API_URL}/claim`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ day })
        });

        const result = await response.json();
        if (result.success) {
            alert(`You claimed your Day ${day} bonus!`);
            window.location.reload();
        } else {
            alert(result.message || "Failed to claim bonus.");
        }
    } catch (error) {
        console.error("Error claiming bonus:", error);
        alert("An error occurred. Please try again.");
    }
}

function navigateTo(page) {
    window.location.href = `./${page}.html`;
}
