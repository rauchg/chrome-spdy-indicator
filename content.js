function connectionInfo() {
  if (window.PerformanceNavigationTiming) {
    const ntEntry = performance.getEntriesByType('navigation')[0];
    return ntEntry.nextHopProtocol;
  }
}
function wasFetchedViaSpdy() {
  // SPDY is deprecated in favor of HTTP/2, but this implementation returns
  // true for HTTP/2 or HTTP2+QUIC/39 as well.
  if (window.PerformanceNavigationTiming) {
    const ntEntry = performance.getEntriesByType('navigation')[0];
    return ['h2', 'hq'].includes(ntEntry.nextHopProtocol);
  }
}
function npnNegotiatedProtocol() {
  // NPN is deprecated in favor of ALPN, but this implementation returns the
  // HTTP/2 or HTTP2+QUIC/39 requests negotiated via ALPN.
  if (window.PerformanceNavigationTiming) {
    const ntEntry = performance.getEntriesByType('navigation')[0];
    return ['h2', 'hq'].includes(ntEntry.nextHopProtocol) ?
        ntEntry.nextHopProtocol : 'unknown';
  }
}
chrome.runtime.sendMessage({
  spdy: wasFetchedViaSpdy(),
  info: npnNegotiatedProtocol() || connectionInfo()
});

chrome.runtime.onMessage.addListener(function (res, sender, sendResponse) {
  chrome.runtime.sendMessage({
    spdy: wasFetchedViaSpdy(),
    info: npnNegotiatedProtocol() || connectionInfo()
  });
});
