function onPageActionClicked (tab) {
  chrome.tabs.create({
    index: tab.index + 1,
    url: 'chrome://net-internals/#spdy',
    openerTabId: tab.id
  });
}

chrome.runtime.onMessage.addListener(function (res, sender) {
  var tab = sender.tab
    , showNoSpdy = !Number(localStorage.hideNoSPDY)

  if (res.spdy || showNoSpdy) {
    // show page action
    chrome.pageAction.show(tab.id);

    // change icon
    var icon;
    if (res.spdy) {
      if (res.info.match(/^spdy\/2/)) {
        icon = 'spdy2';
      } else if (res.info.match(/^spdy\/3/)) {
        icon = 'spdy3';
      } else if (res.info.match(/^spdy\/4/)) {
        icon = 'spdy4';
      } else if (res.info.match(/^quic\//)) {
        icon = 'quic';
      } else {
        icon = 'spdy';
      }
    } else {
      icon = 'no-spdy';
    }
    chrome.pageAction.setIcon({
        path: 'icon-' + icon + '.png'
      , tabId: tab.id
    });

    // change icon tooltip
    chrome.pageAction.setTitle({
        title: tab.url + (res.spdy ? ' is SPDY-enabled(' + res.info + ')' : ' is NOT SPDY-enabled')
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
