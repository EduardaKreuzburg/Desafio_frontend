import { useContext } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { OrderContext } from "../../common/providers/orderContext";
import "./style.css"

function Cart() {
  const navigate = useNavigate();
  const { orders, setOrders } = useContext(OrderContext);

  const onRemoveProduct = (indexToRemove) => {
    let newOrders = Array.from(orders);
    newOrders.splice(indexToRemove, 1)
    setOrders(newOrders);
  }

  return (
    <Container fluid className="containerCart">
      {orders.length > 0 && (
        <>
          <header className="headerOrder">
            <h2>Resumo do meu pedido</h2>
            <p>Valor total do pedido:
              {
                Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                  orders.reduce((acc, product) => {
                    return acc + product.precoTotal;
                  }, 0))
              }
            </p>

            {/* Esse valor mínimo não existe na api, então ficou fixo aqui... */}
            <p>Valor mínimo: R$ 10,00</p>
          </header>
          <main className="contentOrder">

            {orders.map((product, indexProduct) => (
              <>
                <div className="itemOrder">
                  <div className="headerItemOrder">

                    <img src={product.imageUrl} alt="" />
                    <div className="baseInfo">
                      <div>
                        <div>

                          <h2>{product.titulo}</h2>

                          <h2 className="priceItem">{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.precoTotal)}</h2>
                        </div>
                        <input type="number" name="" id="" defaultValue={product.qtProduto} disabled />

                        <button onClick={() => onRemoveProduct(indexProduct)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                            <path fill="#757575" d="M6.667 26.667a2.67 2.67 0 0 0 2.667 2.667h13.333a2.67 2.67 0 0 0 2.667-2.667v-16H6.667v16zm2.666-13.334h13.333l.001 13.333H9.332V13.333zM20 6.667V4h-8v2.667H4v2.667h24V6.667z" />
                            <path fill="#757575" d="M12 16h2.667v8H12v-8zM17.333 16H20v8h-2.667v-8z" />
                          </svg>
                        </button>
                      </div>

                      <p>obs: {product.observacao} </p>
                    </div>
                  </div>

                  <div className="additionalContent">
                    {product.adicionais.map(adicional => (
                      <div className="additionalItem">
                        <h3 className="additionalTitle">{adicional.titulo}</h3>
                        <div className="additionalOption">
                          <ul className="listAdditional">
                            {adicional.opcoes.map(opcao => (
                              <li>
                                <p> <button /> {`${opcao.qtAdicional}x ${opcao.titulo}`}</p>
                                <p className="priceOption">{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(opcao.qtAdicional * opcao.preco)}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ))}

          </main>

          <footer className="footerOrder">
            <button className="btn-success" onClick={() => {navigate('/finalize', { replace: true })}} >Concluir Pedido</button>
          </footer>
        </>
      )}
    </Container>
  )
}

export default Cart;