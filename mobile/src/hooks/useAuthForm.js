import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../store/slices/authSlice';
import { auth } from '../services/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export const useAuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const dispatch = useDispatch();
  const authState = useSelector(state => state.auth);

  const handleSubmit = useCallback(async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');
    dispatch(loginStart());

    try {
      let userCredential;
      
      if (isSignUp) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }
      
      const { user } = userCredential;
      
      dispatch(loginSuccess({
        user: {
          uid: user.uid,
          email: user.email,
          // Add any additional user info here
        },
        token: user.accessToken,
      }));
      
    } catch (err) {
      setError(err.message);
      dispatch(loginFailure(err.message));
    } finally {
      setIsLoading(false);
    }
  }, [email, password, isSignUp, dispatch]);

  const toggleAuthMode = useCallback(() => {
    setIsSignUp(prevState => !prevState);
    setError('');
  }, []);

  return {
    email,
    setEmail,
    password,
    setPassword,
    isSignUp,
    error: error || authState.error,
    isLoading: isLoading || authState.loading,
    handleSubmit,
    toggleAuthMode,
  };
};

export default useAuthForm;
