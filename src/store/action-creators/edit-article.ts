import { Dispatch } from 'redux';
import { blogService } from '../../services/functions';
import { EditArticleActionTypes, IPutArticle, UpdateArticleAction } from '../../types/edit-article';

export const fetchEditArticle = (putArticle: IPutArticle, slug: string | undefined) => {
  return async (dispatch: Dispatch<UpdateArticleAction>) => {
    try {
      dispatch({ type: EditArticleActionTypes.FETCH_EDIT_ARTICLE });

      const { article } = await blogService.putEditArticle(putArticle, slug);

      dispatch({
        type: EditArticleActionTypes.FETCH_EDIT_ARTICLE_SUCCESS,
        payload: article,
      });
    } catch (e) {
      dispatch({
        type: EditArticleActionTypes.FETCH_EDIT_ARTICLE_ERROR,
        payload: 'Произошла ошибка при редактировании статьи.',
      });
      throw e;
    }
  };
};
