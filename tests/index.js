import 'promise-polyfill/src/polyfill';
const testsContext = require.context('./e2e', true);
testsContext.keys().forEach(testsContext);
