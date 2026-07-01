import { Outlet } from 'react-router';
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import UserProvider from './context/UserProvider';
import Collapse from './components/Collapse/Collapse';


const App = () => {

  return (
    <div className='font-body'>
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