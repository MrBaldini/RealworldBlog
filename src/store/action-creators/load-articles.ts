import { Dispatch } from 'redux';
import { ArticlesAction, ArticlesActionTypes } from '../../types/load-articles';
import { AnArticleAction, AnArticleActionTypes } from '../../types/load-an-article';
import { blogService } from '../../services/functions';

export const fetchArticles = (offset = 0) => {
  return async (dispatch: Dispatch<ArticlesAction>) => {
    try {
      dispatch({ type: ArticlesActionTypes.FETCH_ARTICLES });

      const localStorageOffset = localStorage.getItem('blogKataOffset');
      const actualOffset = localStorageOffset ? localStorageOffset : offset;

      const { articles, articlesCount, page } = await blogService.getArticlesGlobally(+actualOffset);

      localStorage.setItem('blogKataPage', String(page));

      dispatch({
        type: ArticlesActionTypes.FETCH_ARTICLES_SUCCESS,
        payload: {
          articles,
          articlesCount,
          page,
        },
      });
    } catch (e) {
      dispatch({
        type: ArticlesActionTypes.FETCH_ARTICLES_ERROR,
        payload: 'Произошла ошибка при загрузке статей.',
      });
      throw e;
    }
  };
};

export const fetchAnArticle = (slug: string | undefined | null) => {
  return async (dispatch: Dispatch<AnArticleAction>) => {
    try {
      dispatch({ type: AnArticleActionTypes.FETCH_ARTICLE });

      const article = await blogService.getAnArticle(slug);

      dispatch({
        type: AnArticleActionTypes.FETCH_ARTICLE_SUCCESS,
        payload: { ...article },
      });
    } catch (e) {
      dispatch({
        type: AnArticleActionTypes.FETCH_ARTICLE_ERROR,
        payload: 'Произошла ошибка при загрузке статьи.',
      });
    }
  };
};
