import { History } from 'cell-router/source';

import { WordModel } from './Word';

export const history = new History();
export * from './Word';
export const word = new WordModel();
