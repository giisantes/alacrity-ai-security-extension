// Get DOM elements
const loginSection = document.getElementById('loginSection');
const employeeUI = document.getElementById('employeeUI');
const managerUI = document.getElementById('managerUI');
const userNameInput = document.getElementById('userName'); // New field for employee name
const accessCodeInput = document.getElementById('accessCode');
const loginBtn = document.getElementById('loginBtn');
const viewDataBtn = document.getElementById('viewDataBtn');
const actionBtnTest = document.getElementById('actionBtnTest');

// Persistent Role and Identity Check
chrome.storage.local.get(['userRole', 'registeredName'], (result) => {
    if (result.userRole === 'admin') {
        showUI('managerUI');
    } else if (result.userRole === 'employee' && result.registeredName) {
        showUI('employeeUI');
    }
});

function showUI(roleId) {
    loginSection.style.display = 'none';
    if (roleId === 'managerUI') {
        managerUI.style.display = 'block';
    } else {
        employeeUI.style.display = 'block';
    }
}

loginBtn.addEventListener('click', () => {
    const enteredID = document.getElementById('employeeID').value.trim();
    const enteredName = document.getElementById('userName').value.trim();
    const enteredCode = document.getElementById('accessCode').value;

    // Admin bypass for initial setup
    if (enteredCode === 'ADMIN123') {
        chrome.storage.local.set({ userRole: 'admin' }, () => showUI('managerUI'));
        return;
    }

    // Dynamic Employee Validation
    chrome.storage.local.get(['authorized_users'], (result) => {
        const users = result.authorized_users || {};
        
        // Logic: Check if ID exists and if the code matches the ID
        if (users[enteredID] && users[enteredID] === enteredCode) {
            chrome.storage.local.set({ 
                userRole: 'employee', 
                registeredName: enteredName,
                registeredID: enteredID 
            }, () => {
                showUI('employeeUI');
            });
        } else {
            alert('ACCESS DENIED: Employee ID or Access Code is invalid. Contact your manager.');
        }
    });
});

viewDataBtn.addEventListener('click', () => {
    chrome.tabs.create({ url: chrome.runtime.getURL('data-viewer.html') });
});

actionBtnTest.addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab && !tab.url.startsWith('chrome://')) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['scripts/extract.js']
        });
        alert('Compliance scan force-initiated.');
    }
});