
 
(function($){
	// popup window
	$.fn.popupWindow = function(winOptions){

		var windowOptions = winOptions || {};

		var options = {
			openEvent : 'click',
			windowContent : function() { return 'Popup!'; },
			onOpen : function() {  },
			onClose : function() {  },
			windowCSS: {
				height: document.documentElement.clientHeight * 0.75,
				width: document.documentElement.clientWidth * 0.75
			},
			title : {
				show : false,
				text : ''
			},
			closeText : true,
			closeOnBackgroundClick : true,
			closeOnEscape: true,
			context : $(this)
		};

		//run command or default to init method
		if(windowOptions && typeof windowOptions == 'string' && windowOptions == 'close'){
			_closeWindow($(this));
			return false;
		} else {
			$.extend(options, windowOptions);
		}

		function _init(){
			// if the popu div doesn't exit, build it
			if($('div.popup-position').length === 0){

				var popup = $('<div>').addClass('popup')
									  .append(
									  	$('<div>').addClass('popup-title'), 
									  	$('<div>').addClass('popup-content'),
									  	$('<div>').addClass('popup-actions')
									  );

				// append the HTML to the document body
				$(document.body).append(
					$('<div>').addClass('popup-position').append(popup)
				).append(
					$('<div id="overlay">').addClass('popup-overlay')
				);				

				if(options.title.show){				
					//show title
					$('div.popup-title').text(options.title.text).css('display', 'block');
				}

				// add close text to the popup
				if(options.closeText){	
					var text = options.closeOnEscape ? 'Close [esc]' : 'Close';
					$('div.popup').append(
						$('<div>').text(text).addClass('popup-overlay-close')
					);
				}
				// clicking the close text closes the window
				$('div.popup-overlay-close').on('click', function(event) {
					_closeWindow($(options.context));
				});

			}
		}

		function _openPopup(item){
			$.when(options.onOpen.call(item, options)).then(function(){

				// display the popup
				$('div#overlay').addClass('popup-overlay-visible');
				$('div.popup-position').addClass('popup-position-visible');
				$('div.popup div.popup-content').empty()
							  					.css(options.windowCSS)
							  					.html(options.windowContent.call(item));
				$('div.popup').addClass('popup-visible');
					
				//clicking the grey overlay will close the window
				if(options.closeOnBackgroundClick){
					$(document).on('click.popupWindow', '.popup-overlay', function(){
						console.log("HELLO!");
						_closeWindow($(options.context));
					});
				}
				
				//set buttons to close window
				if(options.closeOnEscape){
					$(document).on('keyup.popupWindow', function(event) {
						if(event.keyCode == 27){
							_closeWindow(item);
						}
					});
				}
			});
		}

		// remove popup window
		function _closeWindow(item){
			$.when(options.onClose.call(item, options)).then(function(){
				$(document).find('div.popup-overlay').removeClass('popup-overlay-visible');
				$(document).find('div.popup-position').removeClass('popup-position-visible');
				$(document).find('div#popup').removeClass('popup-visible');
				$(document).unbind('keyup.popupWindow');

				//set unbinds for the window if already in place
				$(document).unbind('keyup.popupWindow').unbind('click.popupWindow');
			});
		}

		// set open and close window events
		$(this).each(function(ind, elm){
			$(this).on(options.openEvent + '.popupWindow', function(action) {
				action.preventDefault();
				//initialize 
				_init();
				//open the popup
				_openPopup(elm);
			});
		});
	};
})( jQuery );