// Function for manager to save new credentials
document.getElementById('saveUserBtn').onclick = () => {
    const id = document.getElementById('newEmpID').value.trim();
    const code = document.getElementById('newEmpCode').value.trim();
    
    if (!id || !code) {
        alert("Both ID and Code are required for authorization.");
        return;
    }

    chrome.storage.local.get(['authorized_users'], (result) => {
        const users = result.authorized_users || {};
        users[id] = code;
        chrome.storage.local.set({ authorized_users: users }, () => {
            alert(`SUCCESS: Employee ${id} is now authorized.`);
            document.getElementById('newEmpID').value = '';
            document.getElementById('newEmpCode').value = '';
        });
    });
};

// Update displayData to use the employeeName from the logs
async function displayData() {
  const result = await chrome.storage.local.get(['allMetadata']);
  const data = result.allMetadata || [];
  const tbody = document.getElementById('tableBody');
  document.getElementById('totalRecords').textContent = data.length;
  
  if (data.length === 0) return;
  
  // Sort by newest first
  data.sort((a, b) => b.captureTimestampUnix - a.captureTimestampUnix);

  tbody.innerHTML = data.map(item => `
    <tr>
      <td style="font-weight: 700;">${item.employeeName || 'Anonymous'}</td>
      <td><a href="${item.url}" target="_blank">${item.url.substring(0, 60)}...</a></td>
      <td style="color: var(--muted-gray); font-size: 0.8rem;">${item.captureTimestamp}</td>
      <td>${item.captureTimestampParsed?.date || 'N/A'}</td>
      <td>${item.captureTimestampParsed?.time || 'N/A'}</td>
    </tr>
  `).join('');
}

// Ensure the ID of the current manager is shown
chrome.storage.local.get(['userRole'], (res) => {
    document.getElementById('userId').textContent = res.userRole === 'admin' ? "ADMINISTRATOR" : "UNKNOWN";
});

// Refresh loop
setInterval(displayData, 2000);
displayData();