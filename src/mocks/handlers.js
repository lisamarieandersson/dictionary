import { rest } from 'msw';
import mockWords from './mockWords.json';

export const handlers = [
  rest.get(
    'https://api.dictionaryapi.dev/api/v2/entries/en/:word',
    (req, res, ctx) => {
      const word = req.params.word;

      if (word === 'coffee') {
        return res(ctx.json(mockWords)); // Mock response for 'coffee'
      }

      if (word === 'kaffe') {
        // Simulate a 404 response for the nonexistent word
        return res(ctx.status(404), ctx.json({ message: 'Word not found' }));
      }

      // Might add other handlers as needed...
    }
  ),
];
