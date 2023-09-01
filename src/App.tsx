import { Outlet } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import GlobalStyle from './GlobalStyle';

function App() {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <Outlet />
    </RecoilRoot>
  );
}
export default App;
