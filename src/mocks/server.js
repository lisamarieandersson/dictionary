// mocks/server.js
import { setupServer } from 'msw/node';
import { handlers } from './handlers'; // Import the handlers

export const server = setupServer(...handlers);
