function save_options() {
	var key = document.getElementById('key').value;
	chrome.storage.sync.set({
		combinationKey: key
	}, function() {
		chrome.runtime.sendMessage( { action: 'settings' } );
		var status = document.getElementById('status');
		status.textContent = 'Options saved.';
		setTimeout(function() {
			status.textContent = '';
		}, 750);
	});
}

function restore_options() {
	chrome.storage.sync.get({
		combinationKey: 'alt'
	}, function(items) {
		chrome.runtime.sendMessage( { action: 'settings' } );
		document.getElementById('key').value = items.combinationKey;
	});
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
