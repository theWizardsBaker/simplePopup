# simplePopup
Simple jQuery popup window

![Alt text](/example.png?raw=true "Example")

````javascript
$('div').popupWindow({
	windowCSS: {
		height: '500px',
		width: '900px'
	},
	title : {
		show : true,
		text : 'Popup Window'
	},
	onOpen : function(options){
		console.log("open")
	},	
	onClose : function(options){
		console.log("close")
	},
	windowContent : function(){
		return $('<iframe>').attr({
					src: 'page',
					id: 'popup-frame'
				}).one('load', function(){
					// do something onload
				})
	}
});
````