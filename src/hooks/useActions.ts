import { bindActionCreators } from 'redux';

import ActionCreators from '../store/action-creators';

import { useTypedDispatch } from './useTypedDispatch';

export const useActions = () => {
  const dispatch = useTypedDispatch();
  return bindActionCreators(ActionCreators, dispatch);
};
