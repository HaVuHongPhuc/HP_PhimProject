import HomePage from './web/Homepage';
import './App.css';
import Anime from './web/Movies_category/Anime';
import Login from './web/Profile/Login';
import Register from './web/Profile/Register';
import Profile from './web/Profile/Profile';
import Hanhdong from './web/Movies_category/Hanhdong';
import Kinhdi from './web/Movies_category/Kinhdi';
import AdminHome from './Admin/AdminHome';

function App() {
  const currentPath = window.location.pathname;

  let PageComponent;
  if (currentPath.toLowerCase() === '/anime') {
    PageComponent = Anime;
  } else if (currentPath.toLowerCase() === '/hanhdong') {
    PageComponent = Hanhdong;
  } else if (currentPath.toLowerCase() === '/kinhdi') {
    PageComponent = Kinhdi;
  } else if (currentPath.toLowerCase() === '/login') {  
    PageComponent = Login;
  } else if (currentPath.toLowerCase() === '/register') {
    PageComponent = Register;
  } else if (currentPath.toLowerCase() === '/profile') {
    PageComponent = Profile;
  } else if (currentPath.toLowerCase() === '/adminhome') {
    PageComponent = AdminHome;
  }
  else {
    PageComponent = HomePage; // Mặc định là trang chủ
  }


  return (
      <PageComponent />
  );
}

export default App;
