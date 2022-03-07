import { Container } from "react-bootstrap";
import "./style.css"

function FinalizeOrder() {
  return (
    <Container fluid className="containerFinalize">
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
            <input type="radio" name="delivery" id="deliveryRadio" />
          </div>
          <div>
            <label htmlFor="deliveryRadio">Retirar no local</label>
            <input type="radio" name="delivery" id="deliveryRadio" />
          </div>
        </div>

        <div className="contactInfosBox">
          <label htmlFor="customerName">Nome</label>
          <input type="text" name="customerName" id="customerName" />
          <label htmlFor="numberPhone">Número de WhatsApp</label>
          <input type="tel" maxLength={11} name="numberPhone" id="numberPhone" />
        </div>

        <div className="paymentModeBox">
          <h2>Forma de Pagamento</h2>
          <select name="paymentMode" id="paymentMode">
            <option value="dinheiro">Dinheiro</option>  
          </select>
        </div>

      </main>

      <footer className="footerOrder">
        <button className="btn-success">Finalizar Pedido</button>
      </footer>
    </Container>
  )
}

export default FinalizeOrder;