import Restaurant from './pages/restaurant';
import Product from './pages/product';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
        <Route path="/" element={<Restaurant/>} />
        <Route path="product/:id" element={<Product/>} />
    </Routes>
  );
}

export default App;
