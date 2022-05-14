import './App.css';
import Header from './components/header/header';
import { useAppSelector } from './components/hooks/hooks';
import Preloader from './components/preloader/preloader';
import StartPage from './pages/startPage';

function App() {
  const {isLoading} = useAppSelector((state)=>state.user);
  return (
    <div className="App">
     <Header />
     {isLoading ? <Preloader/> : <StartPage />}
    </div>
  );
}

export default App;
