function extractPageMetadata() {
    // Generate or retrieve unique user ID from chrome storage
    let userId = null;
    
    // Try to get from chrome storage (synchronous attempt)
    try {
        // First check if we have it in localStorage as fallback
        userId = localStorage.getItem('extension_user_id');
    } catch (e) {
        console.log('localStorage not accessible, will use chrome.storage');
    }
    
    
    if (!userId) {
        // Generate unique user ID using timestamp + random string
        userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        try {
            localStorage.setItem('extension_user_id', userId);
        } catch (e) {
            // Ignore if localStorage not accessible
        }
    }
    
    const metadata = {
        userId: userId,
        url: window.location.href,
        captureTimestamp: new Date().toISOString(),
        captureTimestampUnix: Date.now(),
        captureTimestampParsed: {
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            day: new Date().getDate(),
            hour: new Date().getHours(),
            minute: new Date().getMinutes(),
            second: new Date().getSeconds()
        },
        
        // Standard meta tags
        metaTags: {},
        
        // Open Graph protocol
        openGraph: {},
        
        // Twitter Cards
        twitterCard: {},
        
        // JSON-LD structured data
        jsonLD: [],
        
        // Basic page info
        pageInfo: {
            title: document.title,
            description: document.querySelector('meta[name="description"]')?.content || '',
            keywords: document.querySelector('meta[name="keywords"]')?.content || '',
            author: document.querySelector('meta[name="author"]')?.content || '',
            lastModified: document.lastModified
        }
    };
    
    // Extract all standard meta tags
    document.querySelectorAll('meta').forEach(meta => {
        const name = meta.getAttribute('name') || meta.getAttribute('property');
        const content = meta.getAttribute('content');
        if (name && content) {
            metadata.metaTags[name] = content;
        }
    });
    
    // Extract Open Graph data (og:* properties)
    document.querySelectorAll('meta[property^="og:"]').forEach(meta => {
        const property = meta.getAttribute('property').replace('og:', '');
        metadata.openGraph[property] = meta.getAttribute('content');
    });
    
    // Extract Twitter Card data
    document.querySelectorAll('meta[name^="twitter:"]').forEach(meta => {
        const name = meta.getAttribute('name').replace('twitter:', '');
        metadata.twitterCard[name] = meta.getAttribute('content');
    });
    
    // Extract JSON-LD structured data
    document.querySelectorAll('script[type="application/ld+json"]').forEach(script => {
        try {
            const jsonData = JSON.parse(script.textContent);
            metadata.jsonLD.push(jsonData);
        } catch (error) {
            console.error('Error parsing JSON-LD:', error);
        }
    });
      return metadata;
}

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
