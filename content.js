var loadTimes = window.chrome.loadTimes();
// send spdy info for current page
chrome.runtime.sendMessage({
  spdy: loadTimes.wasFetchedViaSpdy,
  info: loadTimes.npnNegotiatedProtocol || loadTimes.connectionInfo
});
