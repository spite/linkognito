var connections = new Set();

chrome.runtime.onConnect.addListener( function( port ) {

	connections.add( port )

	function listener( msg, sender, reply ) {

		if( msg.url ) {
			chrome.windows.create( { url: msg.url, incognito: true })
		}

	}

	port.onMessage.addListener( listener );

	port.onDisconnect.addListener( function() {

		port.onMessage.removeListener( listener );
		connections.delete( port );

	} );

	chrome.storage.sync.get({
		combinationKey: 'alt'
	}, function(items) {
		port.postMessage( { key: items.combinationKey } );
	});

});

chrome.runtime.onMessage.addListener( e => {

	chrome.storage.sync.get({
		combinationKey: 'alt'
	}, function(items) {
		connections.forEach( port => port.postMessage( { key: items.combinationKey } ) );
	});

})
