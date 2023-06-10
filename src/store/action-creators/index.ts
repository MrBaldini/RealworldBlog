import * as LoadArticlesCreators from './load-articles';
import * as SignUserCreators from './sign-user';
import * as EditProfileCreators from './edit-profile';
import * as CreateArticleCreators from './create-article';
import * as EditArticleCreators from './edit-article';
import * as DeleteArticleCreators from './delete-article';
import * as FavoriteArticleCreators from './favorite-article';
import * as UnfavoriteArticleCreators from './unfavorite-article';

export default {
  ...LoadArticlesCreators,
  ...SignUserCreators,
  ...EditProfileCreators,
  ...CreateArticleCreators,
  ...EditArticleCreators,
  ...DeleteArticleCreators,
  ...FavoriteArticleCreators,
  ...UnfavoriteArticleCreators,
};
