export interface Article {
  id: string;
  title: string;
  url: string;
  tags: ArticleTag[];
  description: string;
  content: string;
  url_image: string;
  category: ArticleCategory;
  updatedAt: string;
  created_date: string;
  published_date: string;
}

export interface ArticleTag {
  id: string;
  name: string;
  code: string;
}

export interface ArticleCategory {
  id: string;
  name: string;
  code: string;
}
