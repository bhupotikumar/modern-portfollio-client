import { Outlet } from 'react-router';
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import UserProvider from './context/userProvider';


const App = () => {

  return (
    <div className='secondary-font'>
      <UserProvider>
        <Header />
        <Outlet />
        <Footer />
      </UserProvider>
    </div>
  );
};

export default App;