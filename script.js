var port = chrome.runtime.connect();
var combinationKey = 'alt';

function post( msg ) {

	port.postMessage( msg );

}

window.addEventListener( 'click', e => {

	var link = null;
	if( e.target.nodeName === 'A' ) link = e.target;
	else {
		link = e.target.closest( 'a' );
	}

	if( link  ) {
		if( ( combinationKey === 'alt' && e.altKey === true ) ||
		   	( combinationKey === 'cmd' && e.metaKey === true ) ||
		   	( combinationKey === 'shift' && e.shiftKey === true ) ) {
			post( { url: link.href } );
			e.preventDefault();
		}
	}

})

port.onMessage.addListener( msg => {

	if( msg.key ) {
		combinationKey = msg.key;
	}

});
