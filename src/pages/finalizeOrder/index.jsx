import { useContext, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { OrderContext } from "../../common/providers/orderContext";
import "./style.css"

function FinalizeOrder() {
  const navigate = useNavigate();
  const { orders, setOrders } = useContext(OrderContext);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const submitOrder = () => {
    if (!name || !phone) {
      alert("Por favor preencha todos os campos!");
      return;
    }
    setOrders([]);
    navigate('/', {replace: true});
  }

  return (
    <Container fluid className="containerFinalize">
      {orders.length > 0 && (
        <>
          <header className="headerOrder">
            <h2>Resumo do meu pedido</h2>
            <p>Valor total do pedido: R$ 0,00</p>

            {/* Esse valor de entrega não existe na api, então ficou fixo aqui... */}
            <p>Taxa de entrega: R$ 5,00</p>
          </header>

          <main className="contentFinalize">
            <div className="deliveryBox">
              <div>
                <label htmlFor="deliveryRadio">Receber em casa</label>
                <input type="radio" name="delivery" id="deliveryRadio" defaultChecked />
              </div>
              <div>
                <label htmlFor="deliveryRadio">Retirar no local</label>
                <input type="radio" name="delivery" id="deliveryRadio" />
              </div>
            </div>

            <div className="contactInfosBox">
              <label htmlFor="customerName">Nome</label>
              <input type="text" name="customerName" id="customerName" value={name} onChange={(e) => setName(e.target.value)} />
              <label htmlFor="numberPhone">Número de WhatsApp</label>
              <input type="tel" maxLength={11} name="numberPhone" id="numberPhone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
            </div>

            <div className="paymentModeBox">
              <h2>Forma de Pagamento</h2>
              <select name="paymentMode" id="paymentMode">
                <option value="dinheiro">Dinheiro</option>  
              </select>
            </div>

          </main>

          <footer className="footerOrder">
            <button className="btn-success" onClick={submitOrder}>Finalizar Pedido</button>
          </footer>
        </>
      )}
    </Container>
  )
}

export default FinalizeOrder;