if (!document.getElementById("ai-safety-overlay")) {
    const overlay = document.createElement("div");
    overlay.id = "ai-safety-overlay";

    overlay.innerHTML = `
        <div id="ai-safety-overlay-popup">
            <div class="banner-content">
                <div style="font-size: 30px; margin-bottom: 10px;">⚠️</div>
                <strong style="font-size: 18px;">Caution: AI Interaction Detected</strong>
                <p id="statusMsg" style="margin-top: 10px; font-size: 14px; color: #ccc;">Checking registration status...</p>
                <div class="button-group" style="display: flex; flex-direction: column; gap: 12px; margin-top: 20px;">
                    <button id="continueBtnClose" disabled style="opacity: 0.5; cursor: not-allowed;">Wait (<span id="timerSlot">5</span>s)</button>
                    <button id="leaveBtn" style="background: white; color: black; font-weight: 700; border: none; padding: 14px; cursor: pointer;">View Approved AI</button>
                </div>
                <a id="approvedAIlink" href="${chrome.runtime.getURL("approvedAi.html")}" style="display: inline-block; margin-top: 20px; font-size: 12px; color: #D67062; text-decoration: none; text-transform: uppercase; letter-spacing: 1px;">
                        Go to Secure Environment
                </a>
            </div>
        </div>
    `;

    document.body.prepend(overlay);

    const continueBtn = document.getElementById("continueBtnClose");
    const statusMsg = document.getElementById("statusMsg");
    const timerSlot = document.getElementById("timerSlot");

    chrome.storage.local.get(['registeredName'], (result) => {
        if (!result.registeredName) {
            statusMsg.textContent = "Registration Required. Please click the extension icon to verify your identity.";
            statusMsg.style.color = "#D64D54"; 
            continueBtn.textContent = "Identity Unverified";
            return;
        }

        statusMsg.textContent = `Hello ${result.registeredName}. This session is being logged for security compliance.`;
        
        let timeLeft = 5;
        const countdown = setInterval(() => {
            timeLeft--;
            if (timeLeft <= 0) {
                clearInterval(countdown);
                continueBtn.disabled = false;
                continueBtn.textContent = "Continue (Logged)";
                continueBtn.style.opacity = "1";
                continueBtn.style.cursor = "pointer";
                continueBtn.style.border = "1px solid white";
                continueBtn.style.color = "white";
            } else {
                timerSlot.textContent = timeLeft;
            }
        }, 1000);
    });

    continueBtn.onclick = () => { if (!continueBtn.disabled) overlay.remove(); };
    document.getElementById("leaveBtn").onclick = () => { window.location.href = chrome.runtime.getURL("approvedAi.html"); };
}