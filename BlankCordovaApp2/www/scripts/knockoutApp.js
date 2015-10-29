(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind(this), false);
    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        console.log('deviceready');
        bootstrap();
    };
   
    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };



    function bootstrap() {
        window.unicode = window.global_data;
        ko.applyBindings(new unicodeMapViewModel());
        console.log('window loaded');
        
        var title = document.getElementById('title');
        title.textContent = "UnicodeMap";

        var lv = document.getElementById('content');
        lv.addEventListener('iteminvoked', handleListViewItemInvoked);
    };

    function showDialog(data) {
        var heading = document.querySelector(".win-contentdialog .heading");
        var body = document.querySelector(".win-contentdialog .body");
        heading.innerHTML = data.preview;
        body.textContent = data.name;
        document.querySelector(".win-contentdialog").winControl.show().then(function (e) {
            if(e.result === "primary") { // favorite
              //  unicodeMapViewModel.favorites.push(data);
            }
        });
    }

    function cancelDismissal(evenObject) {
        if (evenObject.detail.result === WinJS.UI.ContentDialog.DismissalResult.none) {
            evenObject.preventDefault();
        }
    }

    function handleListViewItemInvoked (ev) {
        ev.detail.itemPromise.then(function (item) {
            showDialog(item.data);
        })
    }
})();