function onPageActionClicked (tab) {
  chrome.tabs.create({
    index: tab.index + 1,
    url: 'chrome://net-internals/#spdy',
    openerTabId: tab.id
  });
}

chrome.extension.onRequest.addListener(function (res, sender) {
  var tab = sender.tab
    , showNoSpdy = !Number(localStorage.hideNoSPDY)

  if (res.spdy || showNoSpdy) {
    // show page action
    chrome.pageAction.show(tab.id);

    // change icon
    chrome.pageAction.setIcon({
        path: 'icon-' + (res.spdy ? '' : 'no-') + 'spdy.png'
      , tabId: tab.id
    });

    // change icon tooltip
    chrome.pageAction.setTitle({
        title: tab.url + (res.spdy ? ' is SPDY-enabled' : ' is NOT SPDY-enabled')
      , tabId: tab.id
    });

    // set click destination
    if (!chrome.pageAction.onClicked.hasListener(onPageActionClicked)) {
      chrome.pageAction.onClicked.addListener(onPageActionClicked);
    }
  } else {
    chrome.pageAction.hide(tab.id);
  }
});
