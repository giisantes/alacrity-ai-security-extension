// prevent duplicate banner
if (!document.getElementById("surveillance-banner")) {

    const banner = document.createElement("div");
    banner.id = "surveillance-banner";

    banner.innerHTML = `
        <div class="banner-content">
            ⚠️ This page may monitor or analyze your prompts.
            <button id="continueBtn">Continue</button>
            <button id="leaveBtn">Leave Page</button>
        </div>
    `;

    document.body.prepend(banner);

    // continue browsing
    document.getElementById("continueBtn").onclick = () => {
        banner.remove();
    };

    // redirect user
    document.getElementById("leaveBtn").onclick = () => {
        window.location.href = chrome.runtime.getURL("warning.html");
    };
}
