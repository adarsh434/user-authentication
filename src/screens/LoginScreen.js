import {useState} from 'react';
import {Alert} from 'react-native';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import {login} from '../util/auth';

import {useDispatch} from 'react-redux';
import {authenticate} from '../store/AuthToken';

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const dispatch = useDispatch();

  async function loginHandler({email, password}) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      dispatch(authenticate({token: token}));
    } catch (error) {
      Alert.alert(
        'Authentication Failed',
        'Please check your credentials or try again later',
      );
    }
    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging in you..." />;
  }
  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
