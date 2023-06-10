import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Layout } from '../layout';
import { NotFoundPage } from '../../pages/not-found-page';
import { MainPage } from '../../pages/main-page';
import { ArticlePage } from '../../pages/article-page';
import { SignUpPage } from '../../pages/sign-up-page';
import { SignInPage } from '../../pages/sign-in-page';
import { EditProfilePage } from '../../pages/edit-profile-page';
import { NewArticlePage } from '../../pages/new-article-page';
import { EditArticlePage } from '../../pages/edit-article-page';
import { RequireAuth } from '../../hoc/require-auth';
import { AuthProvider } from '../../hoc/auth-provider';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const slug = localStorage.getItem('kataBlogSlug');

    if (location.pathname === `/articles/${slug}/edit`) {
      navigate(`/articles/${slug}`);
    }
  }, []);

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="articles" element={<Navigate to="/" replace />} />
          <Route path="articles/:slug" element={<ArticlePage />} />
          <Route path="sign-up" element={<SignUpPage />} />
          <Route path="sign-in" element={<SignInPage />} />
          <Route
            path="profile"
            element={
              <RequireAuth>
                <EditProfilePage />
              </RequireAuth>
            }
          />
          <Route
            path="new-article"
            element={
              <RequireAuth>
                <NewArticlePage />
              </RequireAuth>
            }
          />
          <Route
            path="articles/:slug/edit"
            element={
              <RequireAuth>
                <EditArticlePage />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
