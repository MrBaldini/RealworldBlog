import { Dispatch } from 'redux';
import { UnfavoriteActionTypes, UnlikeArticleAction } from '../../types/unfavorite-article';
import { blogService } from '../../services/functions';

export const fetchUnfavoriteArticle = (slug: string | undefined) => {
  return async (dispatch: Dispatch<UnlikeArticleAction>) => {
    try {
      dispatch({ type: UnfavoriteActionTypes.FETCH_UNFAVORITE_ARTICLE });

      await blogService.deleteFavoriteOnArticle(slug);

      dispatch({
        type: UnfavoriteActionTypes.FETCH_UNFAVORITE_ARTICLE_SUCCESS,
      });
    } catch (e) {
      dispatch({
        type: UnfavoriteActionTypes.FETCH_UNFAVORITE_ARTICLE_ERROR,
        payload: 'Произошла ошибка при удалении статьи.',
      });
      throw e;
    }
  };
};
