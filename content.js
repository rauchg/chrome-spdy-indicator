var loadTimes = null;
function getLoadTimes() {
  return loadTimes || (loadTimes = window.chrome.loadTimes());
}

function wasFetchedViaSpdy() {
  // SPDY is deprecated in favor of HTTP/2, but this implementation returns
  // true for HTTP/2 or HTTP2+QUIC/39 as well.
  if (window.PerformanceNavigationTiming) {
    const ntEntry = performance.getEntriesByType('navigation')[0];
    return ['h2', 'hq'].includes(ntEntry.nextHopProtocol);
  }
  return getLoadTimes().wasFetchedViaSpdy;
}

function connectionInfo() {
  if (window.PerformanceNavigationTiming) {
    // NPN is deprecated in favor of ALPN, but this implementation returns true
    // for HTTP/2 or HTTP2+QUIC/39 requests negotiated via ALPN.
    const ntEntry = performance.getEntriesByType('navigation')[0]
    return ['h2', 'hq'].includes(ntEntry.nextHopProtocol) || ntEntry.nextHopProtocol
  }
  var loadTimes = getLoadTimes();
  return loadTimes.wasNegotiatedProtocol || loadTimes.connectionInfo;
}

function sendInfo() {
  chrome.runtime.sendMessage({
    spdy: wasFetchedViaSpdy(),
    info: connectionInfo()
  });
}

// send spdy info for current page
sendInfo();

chrome.runtime.onMessage.addListener(function (res, sender, sendResponse) {
  sendInfo();
});
