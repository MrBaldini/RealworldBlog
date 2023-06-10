import { UserPut } from '../components/edit-profile-form';
import { IPostArticle } from '../types/create-article';
import { IPutArticle } from '../types/edit-article';
import { IArticle } from '../types/load-an-article';
import { IUserPost } from '../types/sign-user';

import { getCookie, getDataFromResponses } from './functions';

const user = {
  username: '',
  email: '',
  token: '',
  bio: '',
  image: '',
  updated: false,
};

let newObj: IArticle = {
  slug: '',
  title: '',
  favoritesCount: 0,
  tagList: [],
  author: {
    following: false,
    image: '',
    username: '',
  },
  createdAt: '',
  description: '',
  body: '',
};

export default class BlogService {
  url = process.env.REACT_APP_UNSPLASH_URL;

  getArticlesGlobally = async (offset = 0) => {
    const token = getCookie('kataBlogToken');

    const response = await fetch(`https://blog.kata.academy/api/articles?limit=5&offset=${offset}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
    });

    const newObj = { articles: [], articlesCount: 0, page: 1 };
    await response.json().then((obj) => {
      newObj.articles = obj.articles;
      newObj.articlesCount = obj.articlesCount;
    });
    if (offset !== 0) newObj.page = (offset + 5) / 5;

    return newObj;
  };

  getAnArticle = async (slug: string | undefined | null) => {
    const token = getCookie('kataBlogToken');

    const response = await fetch(`${this.url}/articles/${slug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
    });

    await response.json().then((obj) => {
      newObj = { ...obj.article };
    });

    return newObj;
  };

  postNewArticle = async (article: IPostArticle) => {
    const token = getCookie('kataBlogToken');

    const storeObj = {
      article: { ...newObj },
    };

    const response = await fetch(`${this.url}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(article),
    });

    await response.json().then((obj) => {
      storeObj.article = obj.article;
    });

    return storeObj;
  };

  putEditArticle = async (article: IPutArticle, slug: string | undefined) => {
    const token = getCookie('kataBlogToken');

    const storeObj = {
      article: { ...newObj },
    };

    const response = await fetch(`${this.url}/articles/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(article),
    });

    await response.json().then((obj) => {
      storeObj.article = obj.article;
    });

    return storeObj;
  };

  deleteArticle = async (slug: string | undefined) => {
    const token = getCookie('kataBlogToken');

    await fetch(`${this.url}/articles/${slug}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
    });
  };

  postFavoriteArticle = async (slug: string | undefined) => {
    const token = getCookie('kataBlogToken');

    await fetch(`${this.url}/articles/${slug}/favorite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
    });
  };

  deleteFavoriteOnArticle = async (slug: string | undefined) => {
    const token = getCookie('kataBlogToken');

    await fetch(`${this.url}/articles/${slug}/favorite`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
    });
  };

  postSignUpUser = async (userPost: IUserPost) => {
    const newObj = {
      user,
      errors: {},
    };

    const responseSignUp = await fetch(`${this.url}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(userPost),
    });

    return getDataFromResponses(responseSignUp, newObj, this.url);
  };

  postSignInUser = async (userPost: IUserPost) => {
    const newObj = {
      user,
      errors: {},
    };

    const responseSignIn = await fetch(`${this.url}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(userPost),
    });

    return getDataFromResponses(responseSignIn, newObj, this.url);
  };

  putEditProfile = async (userPut: UserPut) => {
    const token = getCookie('kataBlogToken');
    const newObj = {
      user,
      errors: {},
    };

    const response = await fetch(`${this.url}/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(userPut),
    });

    if (response.status === 422) {
      await response.json().then((obj) => {
        newObj.errors = obj.errors;
      });

      return newObj;
    }

    await response.json().then((obj) => {
      newObj.user = obj.user;
      newObj.user.updated = true;
      newObj.errors = {};
    });

    localStorage.setItem('blogKataUsername', newObj.user.username);
    localStorage.setItem('blogKataImage', newObj.user.image);

    return newObj;
  };
}
