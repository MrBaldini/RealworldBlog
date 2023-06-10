import { combineReducers } from 'redux';

import { loadArticlesReducer } from './load-articles-reducer';
import { loadAnArticleReducer } from './load-an-article-reducer';
import { signUserReducer } from './sign-user-reducer';
import { editProfileReducer } from './edit-profile-reducer';
import { createArticleReducer } from './create-article-reducer';
import { editArticleReducer } from './edit-article-reducer';
import { deleteArticleReducer } from './delete-article-reducer';
import { favoriteArticleReducer } from './favorite-article-reducer';
import { unfavoriteArticleReducer } from './unfavorite-article-reducer';

export const rootReducer = combineReducers({
  articles: loadArticlesReducer,
  anArticle: loadAnArticleReducer,
  userData: signUserReducer,
  editProfile: editProfileReducer,
  createArticle: createArticleReducer,
  editArticle: editArticleReducer,
  deleteArticle: deleteArticleReducer,
  favoriteArticle: favoriteArticleReducer,
  unfavoriteArticle: unfavoriteArticleReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
