// API Endpoints
const INVITE_API = "/api/invite";
const USER_ID = sessionStorage.getItem("userId") || "guest"; // دریافت شناسه کاربر از نشست

// Load Invite Data
window.addEventListener("load", async () => {
    const inviteLinkInput = document.getElementById("invite-link");
    const totalInvitesDisplay = document.getElementById("total-invites");
    const totalRewardsDisplay = document.getElementById("total-rewards");

    try {
        const response = await fetch(`${INVITE_API}/data/${USER_ID}`);
        const data = await response.json();

        // Set Invite Link
        if (data && data.inviteLink) {
            inviteLinkInput.value = data.inviteLink;
        } else {
            inviteLinkInput.value = "Error: Unable to fetch link";
        }

        // Update Invite Stats
        totalInvitesDisplay.textContent = data.totalInvites || 0;
        totalRewardsDisplay.textContent = data.totalRewards || 0;
    } catch (error) {
        console.error("Error loading invite data:", error);
    }
});

// Copy Invite Link
function copyInviteLink() {
    const inviteLinkInput = document.getElementById("invite-link");
    inviteLinkInput.select();
    document.execCommand("copy");

    const copyStatus = document.getElementById("copy-status");
    copyStatus.classList.remove("hidden");

    setTimeout(() => {
        copyStatus.classList.add("hidden");
    }, 2000);
}

// Navigate to Pages
function navigateTo(page) {
    window.location.href = `./${page}.html`;
}
