// prevent duplicate banner
if (!document.getElementById("ai-safety-overlay")) {
    // 1. Create the full-screen overlay (the blur and centering layer)
    const overlay = document.createElement("div");
    overlay.id = "ai-safety-overlay";

    // 2. Put the popup box INSIDE the overlay
    overlay.innerHTML = `
        <div id="ai-safety-overlay-popup">
            <div class="banner-content">
                <div style="font-size: 30px; margin-bottom: 10px;">⚠️</div>
                <strong style="font-size: 18px;">Caution: AI Interaction Detected</strong>
                <p style="margin-top: 10px; font-size: 14px;">    
                    This page may monitor or analyze your prompts. Please be cautious about sharing sensitive information.
                </p>
                <div class="button-group">
                    <button id="continueBtnClose">Continue</button>
                    <button id="leaveBtn">Leave Page</button>
                </div>
                <a target="_self" href="https://www.google.com" style="margin-top: 15px; font-size: 12px;color: #007bff; text-decoration: none;" target="_blank">
                        Approved AI.
                </a>
            </div>
        </div>
    `;

    document.body.prepend(overlay);

    // 3. Update the click handler to remove the whole overlay
    document.getElementById("continueBtnClose").onclick = () => {
        overlay.remove();
    };

    document.getElementById("leaveBtn").onclick = () => {
        window.location.href = chrome.runtime.getURL("warning.html");
    };
}