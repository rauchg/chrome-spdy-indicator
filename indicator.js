function onPageActionClicked (tab) {
  chrome.pageAction.getTitle({tabId: tab.id}, function(result) {
    chrome.tabs.create({
      index: tab.index + 1,
      url: 'chrome://net-internals/#' + (result.match(/QUIC/) ? 'quic' : 'spdy'),
      openerTabId: tab.id
    });
  });
}

chrome.runtime.onMessage.addListener(function (res, sender) {
  var tab = sender.tab
    , showNoSpdy = !Number(localStorage.hideNoSPDY)

  if (res.spdy || showNoSpdy) {
    // show page action
    chrome.pageAction.show(tab.id);

    var icon, tooltip;
    if (res.spdy) {
      tooltip = 'SPDY';
      if (res.info.match(/^spdy\/2/)) {
        icon = 'spdy2';
      } else if (res.info.match(/^spdy\/3\.1/)) {
        icon = 'spdy3.1';
      } else if (res.info.match(/^spdy\/3/)) {
        icon = 'spdy3';
      } else if (res.info.match(/^spdy\/4/)) {
        icon = 'spdy4';
      } else if (res.info.match(/^spdy\/5/)) {
        icon = 'spdy5';
      } else if (res.info.match(/^quic\//)) {
        icon = 'quic';
        tooltip = 'QUIC';
      } else if (res.info.match(/^h2/)) {
        icon = 'http2';
        tooltip = 'HTTP/2';
      } else {
        icon = 'spdy';
      }
    } else {
      icon = 'no-spdy';
      tooltip = 'NOT SPDY';
    }

    // change icon
    chrome.pageAction.setIcon({
        path: {
          '19': 'icon-' + icon + '.png'
        , '38': 'icon-' + icon + '-scale2.png'
        }
      , tabId: tab.id
    });

    // change icon tooltip
    chrome.pageAction.setTitle({
        title: tooltip + '-enabled' + (res.spdy ? '(' + res.info + ')' : '')
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

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if(changeInfo.status == "complete") {
    chrome.tabs.sendMessage(tabId, {});
  }
});
