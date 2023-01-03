import {useState} from 'react';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import {createUser} from '../util/auth';

import {useDispatch} from 'react-redux';
import {authenticate} from '../store/AuthToken';
import {Alert} from 'react-native';

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const dispatch = useDispatch();

  async function signupHandler({email, password}) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      dispatch(authenticate({token: token}));
    } catch (error) {
      Alert.alert(
        'Authentication Failed',
        'Could not create user, please try again later',
      );
    }
    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
