// Get DOM elements
const actionBtn = document.getElementById('actionBtn');
const actionBtnTest = document.getElementById('actionBtnTest');
const viewDataBtn = document.getElementById('viewDataBtn');
const messageDiv = document.getElementById('message');

// Counter for demo purposes
let clickCount = 0;


// Add event listener for Check URL button
actionBtnTest.addEventListener('click', async () => {
  try {
    // Check if chrome.scripting API is available
    if (!chrome.scripting) {
      throw new Error('Scripting API not available. Please reload the extension.');
    }
    
    // Get the active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (!tab) {
      messageDiv.textContent = 'No active tab found!';
      messageDiv.classList.add('show');
      return;
    }
    
    // Check if we can inject into this page
    if (tab.url.startsWith('chrome://') || tab.url.startsWith('edge://') || tab.url.startsWith('about:')) {
      messageDiv.innerHTML = `
        <strong>⚠️ Cannot access this page</strong><br>
        <small>Chrome internal pages are protected</small>
      `;
      messageDiv.classList.add('show');
      return;
    }
      messageDiv.innerHTML = `<strong>⏳ Extracting metadata...</strong>`;
    messageDiv.classList.add('show');
    
    // Execute the extract.js script in the current tab
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['scripts/extract.js']
    });
      // Show success message with URL
    const url = new URL(tab.url);
    messageDiv.innerHTML = `
      <strong>✓ Metadata Extracted & Saved!</strong><br>
      <small>🌐 Domain: ${url.hostname}</small><br>
      <small>📝 Data stored in browser storage</small><br>
      <small style="color: #4CAF50;">💡 Click "View & Export Data" to download files</small>
    `;
    messageDiv.classList.add('show');
    
    // Log the result to popup console
    console.log('Extraction complete for:', tab.url);
    console.log('Results:', results);
    
  } catch (error) {
    messageDiv.innerHTML = `
      <strong>❌ Error:</strong><br>
      <small>${error.message}</small>
    `;
    messageDiv.classList.add('show');
    console.error('Error extracting metadata:', error);
  }
});

// Add event listener for View Data button
viewDataBtn.addEventListener('click', () => {
  chrome.tabs.create({
    url: chrome.runtime.getURL('data-viewer.html')
  });
});

// Optional: Get current tab info
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  if (tabs[0]) {
    console.log('Current tab:', tabs[0].url);
  }
});

// Optional: Add keyboard support
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    actionBtn.click();
  }
});
