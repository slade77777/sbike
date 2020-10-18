import React, {useState} from 'react';
import {Article} from 'shared-logic';
import Pagination from '../../../components/Pagination';
import ArticlesList from './ArticlesList';

type Props = {
  articles: Article[];
  articlesPerPage: number;
};

const PaginatedArticlesList: React.FC<Props> = ({
  articles,
  articlesPerPage,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const articlesSubset = articles.slice(
    currentPage * articlesPerPage - articlesPerPage,
    currentPage * articlesPerPage,
  );

  return (
    <>
      <ArticlesList articles={articlesSubset} />
      {articles.length > articlesPerPage ? (
        <Pagination
          currentPage={currentPage}
          itemsAmount={articles.length}
          itemsPerPage={articlesPerPage}
          onPageChange={setCurrentPage}
        />
      ) : null}
    </>
  );
};

export default PaginatedArticlesList;
