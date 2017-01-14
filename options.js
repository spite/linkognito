'use strict';

function save_options() {
	const key = document.getElementById('key').value;
	chrome.storage.sync.set({
		combinationKey: key
	}, () => {
		chrome.runtime.sendMessage( { action: 'settings' } );
		const status = document.getElementById('status');
		status.textContent = 'Options saved.';
		setTimeout(() => {
			status.textContent = '';
		}, 750);
	});
}

function restore_options() {
	chrome.storage.sync.get({
		combinationKey: 'alt'
	}, items => {
		chrome.runtime.sendMessage( { action: 'settings' } );
		document.getElementById('key').value = items.combinationKey;
	});
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
