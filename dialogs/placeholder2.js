'use strict';

function setPlaceholder(event) {
	document.getElementsByClassName('placeholderName')[0].getElementsByTagName('input')[0].value = event.getAttribute('title');
	var placeholderList = document.getElementById('placeholder-list');
	var elements = placeholderList.getElementsByTagName('a');

	for (var i = 0; i < elements.length; i++) {
		elements[i].className = '';
	}

	event.className += 'active';
}

function search(text) {
	var placeholderList = document.getElementById('placeholder-list');
	var elements = placeholderList.getElementsByTagName('a');

	for (var i = 0; i < elements.length; i++) {
		var currentElement = elements[i];
		var title = currentElement.getAttribute('title');

		if (title && title.match(new RegExp(text, 'i')) !== null) {
			currentElement.style.display = 'block';
		} else {
			currentElement.style.display = 'none';
		}
	}
}

function initializeList() {
	var placeholderList = document.getElementById('placeholder-list');
	var elements = placeholderList.getElementsByTagName('a');

	for (var i = 0; i < elements.length; i++) {
		elements[i].className = '';
		elements[i].style.display = 'block';
	}
}

CKEDITOR.dialog.add( 'placeholder2', function( editor ) {
	var validNameRegex = /^[^\[\]<>]+$/;
	var placeholderList = editor.config.placeholder2.map(function(val) {
		return '<a href="javascript:void(0)" onclick="setPlaceholder(this); return false;" title="'+ 
			val.value +'">' + val.label + '</a>';
	});


	return {
		title: 'Placeholder Properties',
		minWidth: 600,
		minHeight: 400,
		contents: [
			{
				id: 'placeholderGroups',
				label: 'Groups',
				title: 'Groups',
				elements: [
					{
						type: 'text',
						id: 'placeholderSearch',
						className: 'placeholderSearch',
						label: 'Search',
						onKeyUp: function(e) {
							search(e.sender.$.value);
						}
					},
					{
						type: 'text',
						id: 'placeholderName',
						className: 'placeholderName',
						style: 'display: none;',
						required: true,
						'default': '',
						validate: CKEDITOR.dialog.validate.regex( validNameRegex, 'Invalid Placeholder' ),
						setup: function( widget ) {
							this.setValue( widget.data.name );
						},
						commit: function( widget ) {
							widget.setData( 'name', this.getValue() );
						}
					},
					{
						type: 'html',
						html: '<div id="placeholder-list">'+ placeholderList.join("\n") +'</div>'
					}
				]
			}
		],
		onOk: function() {
			initializeList();
		},
		onCancel: function() {
			initializeList();
		}
	};
} );
