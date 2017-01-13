var port = chrome.runtime.connect();
var combinationKey = 'alt';

function post( msg ) {

	port.postMessage( msg );

}

window.addEventListener( 'click', e => {

	console.log( combinationKey );
	if( e.target.nodeName === 'A' ) {
		if( ( combinationKey === 'alt' && e.altKey === true ) ||
		   	( combinationKey === 'cmd' && e.metaKey === true ) ||
		   	( combinationKey === 'shift' && e.shiftKey === true ) ) {
			post( { url: e.target.href } );
			e.preventDefault();
		}
	}

})

port.onMessage.addListener( msg => {

	if( msg.key ) {
		combinationKey = msg.key;
		console.log( combinationKey );
	}

});
