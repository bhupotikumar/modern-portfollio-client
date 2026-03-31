import { Outlet } from 'react-router';
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import UserProvider from './context/UserProvider';
import { useEffect } from 'react';
import auth from './firebase/firebase.auth';
import { initSocket } from './ai/socket';
import Collapse from './components/Collapse/Collapse';


const App = () => {

  useEffect(() => {
    const setupSocket = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      const token = await currentUser.getIdToken();

      const userData = {
        token,
        userId: currentUser.uid,
        name: currentUser.displayName || "Anonymous",
      };

      initSocket(userData);
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) setupSocket();
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className='secondary-font'>
      <UserProvider>
        <Header />
        <Outlet />
        <div className="fixed bottom-4 right-4 z-50">
          <Collapse />
        </div>
        <Footer />
      </UserProvider>
    </div>
  );
};

export default App;