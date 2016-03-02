const test = require('tape');
const babel = require('babel-core');

/**
 * es6 import tests
 **/

test('Should update simple ImportDeclarations', (assert) => {
  const input = "import React from 'react';";
  const expected = "import React from 'react/lib/ReactIsomorphic';";
  const actual = babel.transform(input, {plugins: '.'})

  assert.equal(expected, actual.code,
    'Expected ImportDeclaration node to be transformed.'
  );
  assert.end();
});

test('Should update ImportDeclarations with ImportSpecifiers', (assert) => {
  const input = "import { Component } from 'react';";
  const expected = "import { Component } from 'react/lib/ReactIsomorphic';";
  const actual = babel.transform(input, {plugins: '.'})

  assert.equal(expected, actual.code,
    'Expected ImportDeclaration with only ImportSpecifier nodes to be transformed.'
  );
  assert.end();
});

test('Should update ImportDeclarations with Default and ImportSpecifiers', (assert) => {
  const input = "import React, { Component } from 'react';";
  const expected = "import React, { Component } from 'react/lib/ReactIsomorphic';";
  const actual = babel.transform(input, {plugins: '.'})

  assert.equal(expected, actual.code,
    'Expected ImportDeclarations with both Default and ImportSpecifier nodes to be transformed.'
  );
  assert.end();
});

test('Should update ImportDeclarations with named and ImportSpecifiers', (assert) => {
  const input = "import { Component as ReactComponent } from 'react';";
  const expected = "import { Component as ReactComponent } from 'react/lib/ReactIsomorphic';";
  const actual = babel.transform(input, {plugins: '.'})

  assert.equal(expected, actual.code,
    'Expected ImportDeclarations with both Default and ImportSpecifier nodes to be transformed.'
  );
  assert.end();
});

/**
 * commonjs require tests
 **/

test('Should update simple require statements', (assert) => {
  const input = "require('react')";
  const expected = "require('react/lib/ReactIsomorphic');";
  const actual = babel.transform(input, {plugins: '.'})

  assert.equal(expected, actual.code,
    'Expected require CallExpression node to be transformed.'
  );
  assert.end();
});

test('Should update assigned require statements', (assert) => {
  const input = "const React = require('react');";
  const expected = "const React = require('react/lib/ReactIsomorphic');";
  const actual = babel.transform(input, {plugins: '.'})

  assert.equal(expected, actual.code,
    'Expected VariableDeclaration CallExpression nodes to be transformed.'
  );
  assert.end();
});

test('Should update destructured assignment require statements', (assert) => {
  const input = "const { Component } = require('react');";
  const expected = "const { Component } = require('react/lib/ReactIsomorphic');";
  const actual = babel.transform(input, {plugins: '.'})

  assert.equal(expected, actual.code,
    'Expected destructured assignment require CallExpression nodes to be transformed.'
  );
  assert.end();
});

test('Should update MemberExpression requires', (assert) => {
  const input = "const ReactComponent = require('react').Component;";
  const expected = "const ReactComponent = require('react/lib/ReactIsomorphic').Component;";
  const actual = babel.transform(input, {plugins: '.'})

  assert.equal(expected, actual.code,
    'Expected MemberExpression require nodes to be transformed.'
  );
  assert.end();
});

/**
 * Miscellaneous tests
 */

test('Should update capitalized React', (assert) => {
  const cjsInput = "const React = require('React');";
  const cjsExpected = "const React = require('react/lib/ReactIsomorphic');";
  const cjsActual = babel.transform(cjsInput, {plugins: '.'})

  assert.equal(cjsExpected, cjsActual.code,
    'Expected capitalized commonjs React to be to be transformed.'
  );

  const es6Input = "import React from 'React';";
  const es6Expected = "import React from 'react/lib/ReactIsomorphic';";
  const es6Actual = babel.transform(es6Input, {plugins: '.'})

  assert.equal(es6Expected, es6Actual.code,
    'Expected capitalized es6 React to be to be transformed.'
  );
  assert.end();
});

test('Should ignore non-react', (assert) => {
  const cjsInput = "const React = require('react/lib/private');";
  const cjsExpected = "const React = require('react/lib/private');";
  const cjsActual = babel.transform(cjsInput, {plugins: '.'})

  assert.equal(cjsExpected, cjsActual.code,
    'Expected capitalized commonjs React to be to be transformed.'
  );

  const es6Input = "import React from 'react/lib/private';";
  const es6Expected = "import React from 'react/lib/private';";
  const es6Actual = babel.transform(es6Input, {plugins: '.'})

  assert.equal(es6Expected, es6Actual.code,
    'Expected capitalized es6 React to be to be transformed.'
  );
  assert.end();
});

