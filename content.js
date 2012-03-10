
// send spdy bool for current page
if ('undefined' != typeof window && window.chrome) {
  chrome.extension.sendRequest({ spdy: window.chrome.loadTimes().wasFetchedViaSpdy });
} else {
  chrome.extension.sendRequest({ spdy: null });
}
