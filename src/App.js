import  {BrowserRouter, Reactoutes, Route, Routes} from 'react-router-dom';
import ShowBanks from './components/ShowBanks';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<ShowBanks></ShowBanks>}></Route>
    </Routes>
    </BrowserRouter>
   
  );
}

export default App;
