// Get DOM elements
const actionBtn = document.getElementById('actionBtn');
const messageDiv = document.getElementById('message');

// Counter for demo purposes
let clickCount = 0;

// Add click event listener
actionBtn.addEventListener('click', () => {
  clickCount++;
  
  // Display message
  messageDiv.textContent = `Button clicked ${clickCount} time${clickCount !== 1 ? 's' : ''}!`;
  messageDiv.classList.add('show');
  
  // Add a fun animation
  actionBtn.style.transform = 'scale(0.95)';
  setTimeout(() => {
    actionBtn.style.transform = 'scale(1)';
  }, 100);
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
