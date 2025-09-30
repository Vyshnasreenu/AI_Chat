import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AIChatUploadform from './components/AIChatUploadform';
import JwtAuthenticationForm from './components/JWTAuth/JwtAuthenticationForm';
import HomePage from './components/JWTAuth/HomePage';

function App() {
  return (
    <div className="App">
      {/* <h2>AI Chat Assistant </h2>
      <i>--For Interview Question Generation ...</i> */}
      {/* <AIChatUploadform /> */}

      {/* <JwtAuthenticationForm /> */}
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    </div>
  );
}

export default App;
