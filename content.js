// send spdy bool for current page
chrome.extension.sendRequest({ spdy: window.chrome.loadTimes().wasFetchedViaSpdy });