import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './store';
import Dashboard from './pages/Dashboard';
import ToastContainer from './components/ToastContainer';
import LoadingSpinner from './components/LoadingSpinner';
import Login from './pages/Login';
import { fetchCurrentUser } from './store/slices/authSlice';
import './App.css';

const AppContent = () => {
  const dispatch = useDispatch();
  const { user, token, status } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && !user && status === 'idle') {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, token, user, status]);

  const restoringSession = Boolean(token) && !user && status === 'loading';

  return (
    <div className="relative min-h-screen">
      {restoringSession ? (
        <LoadingSpinner fullScreen />
      ) : user ? (
        <Dashboard />
      ) : (
        <Login />
      )}
      <ToastContainer />
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
