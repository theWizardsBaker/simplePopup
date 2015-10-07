# simplePopup
Simple jQuery popup window.

The popup fires on the Click event by default.

![Alt text](Example.png?raw=true "Example")

````html
	<button id="test">Popup!</button>
````


````javascript
$('button#test').popupWindow({
	//sizing
    windowCSS: {
        height: '300px',
        width: '50%'
    },
    title: {
        show: true,
        text: 'Popup Window'
    },
    //open event
    onOpen: function (options) {
        console.log("open");
    },
    //close event
    onClose: function (options) {
        console.log("close");
    },
    //adding an iframe to the content of the window
    windowContent: function () {
        return $('<iframe>').attr({
            src: 'page',
            id: 'popup-frame'
        }).one('load', function () {
            // do something onload
        });
    }
});
````