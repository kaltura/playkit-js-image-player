import 'promise-polyfill/src/polyfill';
// eslint-disable-next-line no-undef
const testsContext = require.context('./e2e', true);
testsContext.keys().forEach(testsContext);
