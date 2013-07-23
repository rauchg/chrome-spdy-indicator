chrome.runtime.onMessage.addListener(function (res, sender, sendResponse) {
  var loadTimes = window.chrome.loadTimes();
  // send spdy info for current page
  chrome.runtime.sendMessage({
    spdy: loadTimes.wasFetchedViaSpdy,
    info: loadTimes.connectionInfo || loadTimes.npnNegotiatedProtocol
  });
});
