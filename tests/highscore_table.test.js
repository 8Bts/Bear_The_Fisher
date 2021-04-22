import { expect, it } from '@jest/globals';
import Table from '../src/helpers/highscore_table';
import 'regenerator-runtime/runtime';

it('Should have { renderTable } property', () => {
  expect(Table).toHaveProperty('renderTable');
});