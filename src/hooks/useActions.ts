import { bindActionCreators } from 'redux';
import { useTypedDispatch } from './useTypedDispatch';
import ActionCreators from '../store/action-creators';

export const useActions = () => {
  const dispatch = useTypedDispatch();
  return bindActionCreators(ActionCreators, dispatch);
};
