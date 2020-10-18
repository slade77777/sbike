import {ServerResponse, Article} from './types';
import {secureInstance} from './base';

export async function getArticles(): ServerResponse<Article[]> {
  const res = await secureInstance.get('/transaction-platform/v1/articles');
  return res.data;
}
