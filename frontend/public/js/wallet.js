const API_URL = "/api/wallet";

document.getElementById("connect-wallet").addEventListener("click", async () => {
    const walletAddress = document.getElementById("wallet-address").value;

    try {
        const response = await fetch(`${API_URL}/connect`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ walletAddress })
        });

        const result = await response.json();
        if (result.success) {
            alert("Wallet connected successfully!");
        } else {
            alert(result.error || "Failed to connect wallet.");
        }
    } catch (error) {
        console.error("Error connecting wallet:", error);
    }
});
