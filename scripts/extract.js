function extractPageMetadata() {
    return new Promise((resolve) => {
        chrome.storage.local.get(['registeredName', 'extension_user_id'], (result) => {
            const metadata = {
                employeeName: result.registeredName || "Unregistered User",
                userId: result.extension_user_id || "N/A",
                url: window.location.href,
                captureTimestamp: new Date().toISOString(),
                captureTimestampUnix: Date.now(),
                captureTimestampParsed: {
                    date: new Date().toLocaleDateString(),
                    time: new Date().toLocaleTimeString()
                },
                pageTitle: document.title
            };

            chrome.storage.local.get(['allMetadata'], (res) => {
                const allMetadata = res.allMetadata || [];
                allMetadata.push(metadata);
                chrome.storage.local.set({ allMetadata: allMetadata }, () => {
                    resolve(metadata);
                });
            });
        });
    });
}
extractPageMetadata();

// Helper function to convert object to CSV format
function convertToCSV(data) {
    const csvRows = [];
    
    // CSV Headers
    csvRows.push('User ID,URL,Capture Timestamp,Date,Time');
    
    // CSV Data Row
    const row = [
        data.userId,
        `"${data.url}"`,
        data.captureTimestamp,
        data.captureTimestampParsed.date,
        data.captureTimestampParsed.time
    ].join(',');
    
    csvRows.push(row);
    
    return csvRows.join('\n');
}

// Helper function to save/download file
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

// Execute and log the metadata
const pageMetadata = extractPageMetadata();
console.log('=== Extracted Metadata ===');
console.log(JSON.stringify(pageMetadata, null, 2));

// Save to Chrome storage API (accessible across extension)
chrome.storage.local.get(['allMetadata'], function(result) {
    const allMetadata = result.allMetadata || [];
    allMetadata.push(pageMetadata);
    
    chrome.storage.local.set({ allMetadata: allMetadata }, function() {
        console.log('✓ Metadata saved to extension storage');
        console.log('📊 Click "View & Export Data" button to download files');
    });
});

// Also save user ID to chrome storage
chrome.storage.local.set({ extension_user_id: pageMetadata.userId });

// Return the metadata so it can be accessed by the popup
pageMetadata;
