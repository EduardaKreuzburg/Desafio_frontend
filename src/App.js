import Restaurant from './pages/restaurant';
import Product from './pages/product';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import CANavBar from './common/components/CANavBar';
import Cart from './pages/cart';
import FinalizeOrder from './pages/finalizeOrder';

function App() {
  return (
    <>
      <CANavBar />
      <Routes>
        <Route path="/" element={<Restaurant />} />
        <Route path="product/:id" element={<Product />} />
        <Route path="cart/" element={<Cart />} />
        <Route path="finalize/" element={<FinalizeOrder />} />
      </Routes>
    </>
  );
}

export default App;
