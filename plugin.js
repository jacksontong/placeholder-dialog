'use strict';

(function() {
    CKEDITOR.plugins.add('placeholder_dialog', {
        requires: ['widget', 'dialog'],
        icons: 'placeholderdialog',
        hipdi: true,

        onLoad: function() {
            // Register styles for placeholder widget frame.
            CKEDITOR.addCss( '.cke_placeholder{background-color:#ff0}' );
        },
        init: function(editor) {

            // Register dialog.
            CKEDITOR.dialog.add( 'placeholderdialog', this.path + 'dialogs/placeholderdialog.js' );

            editor.widgets.add('PlaceholderDialog', {
                button: 'Insert A Placeholder',
                template: '<span class="cke_placeholder">[[]]</span>',
                dialog: 'placeholderdialog',
                downcast: function() {
                    return new CKEDITOR.htmlParser.text( '[[' + this.data.name + ']]' );
                },
                init: function() {
                    // Note that placeholder markup characters are stripped for the name.
                    this.setData( 'name', this.element.getText().slice( 2, -2 ) );
                },
                data: function() {
                    this.element.setText( '[[' + this.data.name + ']]' );
                }
            });

        },
        afterInit: function( editor ) {
            var placeholderReplaceRegex = /\[\[([^\[\]])+\]\]/g;

            editor.dataProcessor.dataFilter.addRules( {
                text: function( text, node ) {
                    var dtd = node.parent && CKEDITOR.dtd[ node.parent.name ];

                    // Skip the case when placeholder is in elements like <title> or <textarea>
                    // but upcast placeholder in custom elements (no DTD).
                    if ( dtd && !dtd.span )
                        return;

                    return text.replace( placeholderReplaceRegex, function( match ) {
                        // Creating widget code.
                        var widgetWrapper = null,
                            innerElement = new CKEDITOR.htmlParser.element( 'span', {
                                'class': 'cke_placeholder'
                            } );

                        // Adds placeholder identifier as innertext.
                        innerElement.add( new CKEDITOR.htmlParser.text( match ) );
                        widgetWrapper = editor.widgets.wrapElement( innerElement, 'placeholder_dialog' );

                        // Return outerhtml of widget wrapper so it will be placed
                        // as replacement.
                        return widgetWrapper.getOuterHtml();
                    } );
                }
            } );
        }
    });
})();