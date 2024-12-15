
/* Unchanged Section */
function toggleAccordion(id) {
    const content = document.getElementById(id);
    content.classList.toggle('show'); // تغییر کلاس نمایش محتوا
}

function purchaseMiningRateBoost(optionId) {
    alert(`Mining Rate Boost Option ${optionId} purchased!`);
    // ارسال درخواست به سرور
    fetch('/api/boosts/mining-rate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ optionId, userId: CURRENT_USER_ID }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                alert(data.error);
            } else {
                alert('Mining Rate Boost Purchased Successfully!');
            }
        })
        .catch((error) => console.error('Error:', error));
}

/* Edited Section */
function purchaseOfflineDurationBoost(optionId) {
    // Validate optionId before proceeding
    if (!optionId || typeof optionId !== 'number' || optionId < 1 || optionId > 6) {
        alert('Invalid boost option selected. Please try again.');
        return;
    }

    fetch('/api/boosts/offline-duration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ optionId, userId: CURRENT_USER_ID }),
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.error) {
            alert(`Error: ${data.error}`);
        } else {
            alert(`Offline Duration Boost Purchased Successfully! Duration: ${data.offlineDuration} hours.`);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while processing your request.');
    });
}
