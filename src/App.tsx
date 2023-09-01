import { Outlet } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import GlobalStyle from './GlobalStyle';
<<<<<<< HEAD
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import ProductDetail from './pages/ProductDetail';
=======
>>>>>>> 3344bb3d4af5c00a9e75ee012695b9f2ed154a04

function App() {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <Outlet />
    </RecoilRoot>
  );
}
export default App;
