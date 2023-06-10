import { useContext } from 'react';

import { AuthContext } from '../hoc/auth-provider';

export function useAuth() {
  return useContext(AuthContext);
}
