import { Dispatch } from 'redux';
import { CreateArticleActionTypes, IPostArticle, NewArticleAction } from '../../types/create-article';
import { blogService } from '../../services/functions';

export const fetchCreateArticle = (postArticle: IPostArticle) => {
  return async (dispatch: Dispatch<NewArticleAction>) => {
    try {
      dispatch({ type: CreateArticleActionTypes.FETCH_CREATE_ARTICLE });

      const { article } = await blogService.postNewArticle(postArticle);

      dispatch({
        type: CreateArticleActionTypes.FETCH_CREATE_ARTICLE_SUCCESS,
        payload: {
          article: article,
        },
      });
    } catch (e) {
      dispatch({
        type: CreateArticleActionTypes.FETCH_CREATE_ARTICLE_ERROR,
        payload: 'Произошла ошибка при создании статьи.',
      });
      throw e;
    }
  };
};
