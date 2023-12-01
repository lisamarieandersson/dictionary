import { rest } from 'msw';
import mockWords from './mockWords.json';

export const handlers = [
  rest.get(
    'https://api.dictionaryapi.dev/api/v2/entries/en/:word',
    (req, res, ctx) => {
      const word = req.params.word;

      // Find the mock data for the requested word
      const mockData = mockWords.find((mockWord) => mockWord.word === word);

      if (mockData) {
        return res(ctx.json([mockData])); // Return the mock data for the requested word
      }

      // If the the word isn't found in the mock data, simulate a 404 response
      return res(ctx.status(404), ctx.json({ message: 'Word not found' }));
    }
  ),
];
