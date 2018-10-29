var loadTimes = window.chrome.loadTimes();

function sendInfo() {
  chrome.runtime.sendMessage({
    spdy: loadTimes.wasFetchedViaSpdy,
    info: loadTimes.npnNegotiatedProtocol || loadTimes.connectionInfo
  });
}

// send spdy info for current page
sendInfo();

chrome.runtime.onMessage.addListener(function (res, sender, sendResponse) {
  sendInfo();
});
