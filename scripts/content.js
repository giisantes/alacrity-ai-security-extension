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
                <strong style="font-size: 18px;">Caution: Unapproved AI Interaction Detected</strong>
                <p style="margin-top: 10px; font-size: 14px; padding: 10px 20px; text-align: center;">    
                    This may not be safe or secure to use, chats may not be encrypted or private. <br><br> Please confirm that you will not share sensitive or confidential company data.
                                <br><br>            
                        <label>
                        <input type="checkbox" id="terms-checkbox"> 
                        I agree to the terms and conditions
                        </label>

                </p>
                <div class="button-group">
                    <button id="continueBtn" disabled>Continue</button>
                    <button id="leaveBtn">
                    Leave Page
                    </button>
                </div>
                <button target="_self" id="approvedAIlink" target="_blank">
                        Approved AI.
                </button>
            </div>
        </div>
    `;

    document.body.prepend(overlay);
    
    
const checkbox = document.getElementById('terms-checkbox');
    checkbox.addEventListener('change', function() {
        const continueBtn = document.getElementById('continueBtn');
        continueBtn.disabled = !this.checked;
        continueBtn.enabled = this.checked;
    });

    // 3. Update the click handler to remove the whole overlay
    document.getElementById("continueBtn").onclick = () => {
        overlay.remove();
    };
    
    document.getElementById("leaveBtn").onclick = () => {
        window.location.href = "https://www.google.com";
    };

    document.getElementById("approvedAIlink").onclick = () => {
        window.location.href = chrome.runtime.getURL("approvedAi.html");

    };


}