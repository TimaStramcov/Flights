import './App.scss';
import { BrowserRouter } from 'react-router-dom'
import AppRouter from '../appRouter/AppRouter';

function App() {
  return (
    <BrowserRouter>
        <AppRouter/>
    </BrowserRouter>
  );
}

export default App;
