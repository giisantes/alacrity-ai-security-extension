// Load and display user ID
chrome.storage.local.get(['extension_user_id'], function(result) {
    const userId = result.extension_user_id || 'Not yet assigned';
    document.getElementById('userId').textContent = userId;
    window.currentUserId = userId; // Store globally for export functions
});

// Function to load all stored metadata from chrome storage
function loadAllData() {
    return new Promise((resolve) => {
        chrome.storage.local.get(['allMetadata'], function(result) {
            const allData = result.allMetadata || [];
            
            // Sort by timestamp (newest first)
            allData.sort((a, b) => b.captureTimestampUnix - a.captureTimestampUnix);
            
            resolve(allData);
        });
    });
}

// Display data in table
async function displayData() {
  const data = await loadAllData();
  const tbody = document.getElementById('tableBody');
  document.getElementById('totalRecords').textContent = data.length;
  
  if (data.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">No data captured yet</td></tr>';
    return;
  }
  
  tbody.innerHTML = data.map(item => `
    <tr>
      <td>${item.userId || 'N/A'}</td>
      <td><a href="${item.url}" target="_blank">${item.url.substring(0, 50)}${item.url.length > 50 ? '...' : ''}</a></td>
      <td>${item.captureTimestamp}</td>
      <td>${item.captureTimestampParsed?.date || 'N/A'}</td>
      <td>${item.captureTimestampParsed?.time || 'N/A'}</td>
    </tr>
  `).join('');
}

// Export all data as JSON
async function exportAllAsJSON() {
  const data = await loadAllData();
  
  if (data.length === 0) {
    alert('⚠️ No data to export! Please extract some URL metadata first.');
    return;
  }
    const jsonContent = JSON.stringify(data, null, 2);
  const timestamp = Date.now();
  const userId = window.currentUserId || 'user';
  const filename = `all_metadata_${userId}_${timestamp}.json`;
  
  downloadFile(jsonContent, filename, 'application/json');
  alert(`✅ JSON file downloaded successfully!\nFilename: ${filename}\nRecords: ${data.length}`);
}

// Export all data as CSV
async function exportAllAsCSV() {
  const data = await loadAllData();
  
  if (data.length === 0) {
    alert('⚠️ No data to export! Please extract some URL metadata first.');
    return;
  }
  
  const csvRows = [];
  
  // CSV Headers
  csvRows.push('User ID,URL,Capture Timestamp,Date,Time');
  
  // CSV Data Rows
  data.forEach(item => {
    const row = [
      item.userId || 'N/A',
      `"${item.url}"`,
      item.captureTimestamp,
      item.captureTimestampParsed?.date || 'N/A',
      item.captureTimestampParsed?.time || 'N/A'
    ].join(',');
    csvRows.push(row);  });
    const csvContent = csvRows.join('\n');
  const timestamp = Date.now();
  const userId = window.currentUserId || 'user';
  const filename = `all_metadata_${userId}_${timestamp}.csv`;
  
  downloadFile(csvContent, filename, 'text/csv');
  alert(`✅ CSV file downloaded successfully!\nFilename: ${filename}\nRecords: ${data.length}`);
}

// Clear all data
async function clearAllData() {
  if (!confirm('⚠️ Are you sure you want to delete all captured data?\n\nThis action cannot be undone and will permanently remove all stored URL metadata.')) {
    return;
  }
  
  const data = await loadAllData();
  const recordCount = data.length;
  
  chrome.storage.local.set({ allMetadata: [] }, function() {
    displayData();
    alert(`✅ All data has been cleared!\n\n${recordCount} record(s) deleted successfully.`);
  });
}

// Helper function to download file
function downloadFile(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Load data on page load
displayData();

// Refresh data every 2 seconds
setInterval(displayData, 2000);
