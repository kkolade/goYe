import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../services/firebase';
import { loginSuccess, logout, setLoading, setError } from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading, error } = useSelector((state) => state.auth);
  const [isProcessing, setIsProcessing] = useState(false);

  // Handle auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userAuth) => {
      if (userAuth) {
        // User is signed in
        dispatch(
          loginSuccess({
            user: {
              uid: userAuth.uid,
              email: userAuth.email,
              displayName: userAuth.displayName,
              photoURL: userAuth.photoURL,
              emailVerified: userAuth.emailVerified,
            },
            token: await userAuth.getIdToken(),
          })
        );
      } else {
        // User is signed out
        dispatch(logout());
      }
      dispatch(setLoading(false));
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [dispatch]);

  // Login with email and password
  const login = async (email, password) => {
    try {
      setIsProcessing(true);
      dispatch(setError(null));
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      dispatch(setError(error.message));
      return { success: false, error: error.message };
    } finally {
      setIsProcessing(false);
    }
  };

  // Sign up with email and password
  const signUp = async (email, password) => {
    try {
      setIsProcessing(true);
      dispatch(setError(null));
      await createUserWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      dispatch(setError(error.message));
      return { success: false, error: error.message };
    } finally {
      setIsProcessing(false);
    }
  };

  // Request password reset
  const requestPasswordReset = async (email) => {
    try {
      setIsProcessing(true);
      dispatch(setError(null));
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error) {
      dispatch(setError(error.message));
      return { success: false, error: error.message };
    } finally {
      setIsProcessing(false);
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      await auth.signOut();
      return { success: true };
    } catch (error) {
      dispatch(setError(error.message));
      return { success: false, error: error.message };
    }
  };

  return {
    user,
    isAuthenticated,
    loading: loading || isProcessing,
    error,
    login,
    signUp,
    signOut,
    requestPasswordReset,
  };
};

export default useAuth;
