var loadTimes = window.chrome.loadTimes();
// send spdy bool for current page
chrome.extension.sendRequest({
  spdy: loadTimes.wasFetchedViaSpdy,
  info: loadTimes.connectionInfo || loadTimes.npnNegotiatedProtocol
});
