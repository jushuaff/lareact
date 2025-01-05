import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

Object.defineProperty(window, 'performance', {
  value: {
    getEntriesByType: jest.fn(() => []),
  },
});

Object.defineProperty(window, 'scrollTo', { value: jest.fn() });

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;