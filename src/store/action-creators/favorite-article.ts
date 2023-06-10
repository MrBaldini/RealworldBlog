import { Dispatch } from 'redux';
import { FavoriteActionTypes, LikeArticleAction } from '../../types/favorite-article';
import { blogService } from '../../services/functions';

export const fetchFavoriteArticle = (slug: string | undefined) => {
  return async (dispatch: Dispatch<LikeArticleAction>) => {
    try {
      dispatch({ type: FavoriteActionTypes.FETCH_FAVORITE_ARTICLE });

      await blogService.postFavoriteArticle(slug);

      dispatch({
        type: FavoriteActionTypes.FETCH_FAVORITE_ARTICLE_SUCCESS,
      });
    } catch (e) {
      dispatch({
        type: FavoriteActionTypes.FETCH_FAVORITE_ARTICLE_ERROR,
        payload: 'Произошла ошибка при удалении статьи.',
      });
      throw e;
    }
  };
};
