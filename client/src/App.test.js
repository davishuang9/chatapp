import React from 'react';
import { render } from '@testing-library/react';
import App from 'src/App';

test('app renders', () => {
  const app = render(<App />);
  expect(app.baseElement.nodeName).toEqual('BODY');
});
