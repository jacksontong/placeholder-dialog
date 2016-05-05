'use strict';

function validateGroups(original_group, msg) {
	return function() {
		var value = this.getValue();
		var pass = original_group.indexOf(value) !== -1;

		if (!pass) {
			return msg;
		}
	};
}

CKEDITOR.dialog.add( 'placeholderdialog', function( editor ) {
	var validNameRegex = /^[^\[\]<>]+$/;
	var config = editor.config.placeholder_dialog.placeholders;
	var groups = config.map(function(obj) {
		return [obj.group];
	}).concat([['All']]);
	var placeholders = [];

	config.forEach(function(obj) {
		obj.placeholders.forEach(function(currentValue) {
			placeholders.push([currentValue.label, currentValue.value]);
		});
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
						type: 'select',
						id: 'placeholderGroupsList',
						label: 'Groups',
						items: groups,
						style: 'width: 150px',
						default: 'All',
						validate: validateGroups(config.map(function(obj) {
							return obj.group;
						}).concat(['All']), 'Invalid placeholder group member')
					},
					{
						type: 'select',
						id: 'placeholderListAll',
						label: 'Placeholders',
						style: 'width: 595px; height: 300px;',
						size: 10,
						items: placeholders,
						validate: CKEDITOR.dialog.validate.regex( validNameRegex, 'The placeholder can not be empty and can not contain any of following characters: [, ], <, >' ),
						setup: function( widget ) {
							this.setValue( widget.data.name );
						},
						commit: function( widget ) {
							widget.setData( 'name', this.getValue() );
						}
					}
				]
			}
		]
	};
} );
