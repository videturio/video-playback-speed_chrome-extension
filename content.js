setTimeout(function() {
    var video = document.getElementsByTagName("video")[0];
    // video.playbackRate="3";

    function getSavedPlaybackSpeed() {
      chrome.storage.sync.get('ps', function(items) {
        if (!chrome.runtime.error) {
            // console.log(items.ps); // Current speed
            changePlaybackSpeed(items.ps);
        }
      });
    }

    function changePlaybackSpeed(ps) {
      document.getElementsByTagName("video")[0].playbackRate=ps;
    }

    video.onloadeddata = function() {
        getSavedPlaybackSpeed();
    };
}, 2000);
