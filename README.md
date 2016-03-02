# babel-plugin-react-isomorphic

[![Build Status](https://travis-ci.org/iamdustan/babel-plugin-react-isomorphic.svg?branch=master)](https://travis-ci.org/iamdustan/babel-plugin-react-isomorphic)

Babel plugin to transform react->react/lib/ReactIsomorphic.

ReactIsomorphic is the internal package that is the “pure” React dependency
without the `SECRET_DOM_DO_NOT_TOUCH_OR_YOU_WILL_BE_FIRED`. This means that is
also does not include the ReactDOM default injection.

This is intended to be used for custom React renderers like
[react-hardware](https://github.com/iamdustan/react-hardware)

An alternative solutions would be to use FB’s [haste](https://github.com/facebook/node-haste/)
module loader to use the shim [React.native.js](https://github.com/facebook/react/blob/master/packages/react/lib/React.native.js)
and/or [ReactDOM.native.js](https://github.com/facebook/react/blob/master/packages/react/lib/ReactDOM.native.js)
files.

## License

MIT License. Copyright 2016-present Dustan Kasten

