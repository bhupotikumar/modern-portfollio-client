import { Outlet } from 'react-router';
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'

const App = () => {
  return (
    <div className='secondary-font'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;