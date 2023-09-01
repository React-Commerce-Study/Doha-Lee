import { RecoilRoot } from 'recoil';
import GlobalStyle from './GlobalStyle';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/products/:id' element={<ProductDetail />} />
      </Routes>
    </RecoilRoot>
  );
}
export default App;
