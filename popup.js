function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, (tabs) => {
    var tab = tabs[0];

    var url = tab.url;

    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });
}


function changePlaybackSpeed(ps) {
  var script = 'document.getElementsByTagName("video")[0].playbackRate="' + ps + '";';

  chrome.tabs.executeScript({
    code: script
  });
}

function getSavedPlaybackSpeed(url, callback) {
  chrome.storage.sync.get(url, (items) => {
    callback(chrome.runtime.lastError ? null : items[url]);
  });
}

function savePlaybackSpeed(url, ps) {
  var items = {};
  items[url] = ps;
  chrome.storage.sync.set(items);
}



document.addEventListener('DOMContentLoaded', () => {
  getCurrentTabUrl((url) => {
    var playbackSpeed = document.getElementById('playbackSpeed');
    console.log('Breakpoint');

    getSavedPlaybackSpeed(url, (savedSpeed) => {
      if (savedSpeed) {
        changePlaybackSpeed(savedSpeed);
        playbackSpeed.value = savedSpeed;
      }
    });

    playbackSpeed.addEventListener('change', () => {
      changePlaybackSpeed(playbackSpeed.value);
      savePlaybackSpeed(url, playbackSpeed.value);
      console.log('Saved');
    });
  });
});
