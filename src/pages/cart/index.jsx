import { Container } from "react-bootstrap";
import "./style.css"

function Cart() {
  return (
    <Container fluid className="containerCart">
      <header className="headerOrder">
        <h2>Resumo do meu pedido</h2>
        <p>Valor total do pedido: R$ 0,00</p>

        {/* Esse valor mínimo não existe na api, então ficou fixo aqui... */}
        <p>Valor mínimo: R$ 10,00</p>
      </header>
      <main className="contentOrder">
        {/* TODO: fazer a listagem aqui... */}

        <div className="itemOrder">
          <div className="headerItemOrder">
            <img src="https://apiprodutosutalk.herokuapp.com/images/produtos/2.jpg" alt="" />
            <div className="baseInfo">
              <div>
                <div>
                  <h2>Bolo de morango</h2>
                  <h2 className="priceItem"> R$ 79,97 </h2>
                </div>
                <input type="number" name="" id="" />
                <button>
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                    <path fill="#757575" d="M6.667 26.667a2.67 2.67 0 0 0 2.667 2.667h13.333a2.67 2.67 0 0 0 2.667-2.667v-16H6.667v16zm2.666-13.334h13.333l.001 13.333H9.332V13.333zM20 6.667V4h-8v2.667H4v2.667h24V6.667z" />
                    <path fill="#757575" d="M12 16h2.667v8H12v-8zM17.333 16H20v8h-2.667v-8z" />
                  </svg>
                </button>
              </div>
              
              <p>obs: feito com chocolate e recheio de baunilha, caramelo, morango, avelã, leite condensado e leite ninho </p>
            </div>
          </div>

          <div className="additionalContent">
            {/* TODO: listagem aqui dentro também */}
            <div className="additionalItem">
              <h3 className="additionalTitle">Adicional 1</h3>
              <div className="additionalOption">
                <ul className="listAdditional">
                  <li>
                    <p> <button /> 1x Adicional 01</p>
                    <p className="priceOption">R$ 2,00</p>
                  </li>
                  <li>
                    <p> <button /> 1x Adicional 02</p>
                    <p className="priceOption">R$ 2,00</p>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="additionalItem">
              <h3 className="additionalTitle">Adicional 1</h3>
              <div className="additionalOption">
                <ul className="listAdditional">
                  <li>
                    <p> <button /> 1x Adicional 01</p>
                    <p className="priceOption">R$ 2,00</p>
                  </li>
                  <li>
                    <p> <button /> 1x Adicional 02</p>
                    <p className="priceOption">R$ 2,00</p>
                  </li>
                </ul>
              </div>
            </div>
            {/* termina aqui a listagem */}
          </div>
        </div>
        {/* e aqui a outra */}
        <div className="itemOrder">
          <div className="headerItemOrder">
          <img src="https://apiprodutosutalk.herokuapp.com/images/produtos/2.jpg" alt="" />
          <div className="baseInfo">
              <div>
                <div>
                  <h2>Bolo de morango</h2>
                  <h2 className="priceItem"> R$ 79,97 </h2>
                </div>
                <input type="number" name="" id="" />
                <button>
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                    <path fill="#757575" d="M6.667 26.667a2.67 2.67 0 0 0 2.667 2.667h13.333a2.67 2.67 0 0 0 2.667-2.667v-16H6.667v16zm2.666-13.334h13.333l.001 13.333H9.332V13.333zM20 6.667V4h-8v2.667H4v2.667h24V6.667z" />
                    <path fill="#757575" d="M12 16h2.667v8H12v-8zM17.333 16H20v8h-2.667v-8z" />
                  </svg>
                </button>
              </div>
              
              <p>obs: feito com chocolate e recheio de baunilha, caramelo, morango, avelã, leite condensado e leite ninho </p>
            </div>
          </div>

          <div className="additionalContent">
            {/* TODO: listagem aqui dentro também */}
            <div className="additionalItem">
              <h3 className="additionalTitle">Adicional 1</h3>
              <div className="additionalOption">
                <ul className="listAdditional">
                  <li>
                    <p> <button /> 1x Adicional 01</p>
                    <p className="priceOption">R$ 2,00</p>
                  </li>
                  <li>
                    <p> <button /> 1x Adicional 01</p>
                    <p className="priceOption">R$ 2,00</p>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="additionalItem">
              <h3 className="additionalTitle">Adicional 1</h3>
              <div className="additionalOption">
                <ul className="listAdditional">
                  <li>
                    <p> <button /> 1x Adicional 01</p>
                    <p className="priceOption">R$ 2,00</p>
                  </li>
                  <li>
                    <p> <button /> 1x Adicional 01</p>
                    <p className="priceOption">R$ 2,00</p>
                  </li>
                </ul>
              </div>
            </div>
            {/* termina aqui a listagem */}
          </div>
        </div>
      </main>

      <footer className="footerOrder">
        <button className="btn-success">Concluir Pedido</button>
      </footer>
    </Container>
  )
}

export default Cart;