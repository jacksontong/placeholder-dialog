# CKEditor Placeholder Dialog Plugin

[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE)

This is a [CKEditor](http://ckeditor.com/) plugin that adds support for predefined placeholder elements.

## Requirements

This plugins requires CKEditor 4.3+ and the following plugins:

* [Dialog](http://ckeditor.com/addon/dialog)
* [Widget](http://ckeditor.com/addon/widget)

## How to use?

### Installation

You can either

* clone or download and unpack the repository into `ckeditor/plugins/placeholder2/`
* use [Bower](http://bower.io)

If you can't install the plugin directly in the CKEditor plugin folder, use 
[`CKEDITOR.plugins.addExternal()`](http://docs.ckeditor.com/#!/api/CKEDITOR.resourceManager-method-addExternal) to 
point the editor to the directory where you've placed the plugin.

### Configuration

Include the name of the plugin in the ckeditor `extraPlugins` option:

```js
config.extraPlugins = 'placeholder2';
```

By default the UI element is appended to the [`insert` toolbar](http://docs.ckeditor.com/#!/guide/dev_toolbar).

The following options are available for configuration:

```js
config.placeholder2 = [
    {label: 'Placeholder 1', value: 'Placeholder 1'},
    {label: 'Placeholder 2', value: 'Placeholder 2'}
];
```

## Issues

Please use the [issue tracker](https://github.com/tongtoanbs/placeholder-dialog/issues) to report problems.

## License

Licensed under [The MIT License](http://www.opensource.org/licenses/mit-license.php).