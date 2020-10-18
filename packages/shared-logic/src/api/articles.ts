import qs from 'qs';
import {ServerResponse} from '../types/response';
import {Article, ArticleTag, ArticleCategory} from '../types/article';
import {secureInstance} from './base';

export async function readArticle(id: string): ServerResponse<Article> {
  const res = await secureInstance.get(`/articles/${id}`);
  return res.data;
}

export async function readArticleCategories(): ServerResponse<
  ArticleCategory[]
> {
  const res = await secureInstance.get(`/articles/categories`);
  return res.data;
}

// todo this api need update, waiting BE
export async function readMostViewedArticles(): ServerResponse<Article[]> {
  const res = await secureInstance.get(`/articles/most-viewed?page=0&size=5`);
  return res.data;
}

export async function readLatestArticles(
  page: number,
): ServerResponse<Article[]> {
  const res = await secureInstance.get(`/articles/latest?page=${page}&size=30`);
  return res.data;
}

export async function readFeatureNews(): ServerResponse<Article[]> {
  const res = await secureInstance.get(
    `/articles/criteria?isFeatured=true&page=0&size=4`,
  );
  return res.data;
}

export async function readArticlesByCategory({
  categoryId,
  page,
  pageSize,
}: {
  categoryId: string;
  page: number;
  pageSize: number;
}): ServerResponse<Article[]> {
  const res = await secureInstance.get(
    `/articles/criteria?categoryId=${categoryId}&page=${page}&size=${pageSize}`,
  );
  return res.data;
}

export async function readHotTags(): ServerResponse<ArticleTag[]> {
  const res = await secureInstance.get(`/articles/tags/hot`);
  return res.data;
}

export async function readArticlesByListTag({
  tagCodes,
  page,
  pageSize,
}: {
  tagCodes: string[];
  page: number;
  pageSize: number;
}): ServerResponse<Article[]> {
  const res = await secureInstance.get(`/articles/criteria`, {
    params: {
      tag: tagCodes,
      page: page,
      size: pageSize,
    },
    paramsSerializer: function (params: any) {
      return qs.stringify(params, {indices: false});
    },
  });

  return res.data;
}
