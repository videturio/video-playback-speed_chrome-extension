function changePlaybackSpeed(ps) {
  var script = 'document.getElementsByTagName("video")[0].playbackRate="' + ps + '";';

  chrome.tabs.executeScript({
    code: script
  });
}

function getSavedPlaybackSpeed() {
  chrome.storage.sync.get('ps', function(items) {
    if (!chrome.runtime.error) {
        // console.log(items.ps); // Current speed
        changePlaybackSpeed(items.ps);
        playbackSpeed.value = items.ps;
    }
  });
}

function savePlaybackSpeed(speed) {
  chrome.storage.sync.set({'ps': speed}, function() {
  });
}

document.addEventListener('DOMContentLoaded', () => {
  var playbackSpeed = document.getElementById('playbackSpeed');

  getSavedPlaybackSpeed();

  playbackSpeed.addEventListener('change', () => {
    changePlaybackSpeed(playbackSpeed.value);
    savePlaybackSpeed(playbackSpeed.value);
  });
});
