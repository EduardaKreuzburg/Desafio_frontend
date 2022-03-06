import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "./style.css";
import { useParams } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";

function Product() {
  const { id } = useParams();
  const [pageData, setPageData] = useState();
  // const [productToOrder, setProductToOrder] = useState();

  // ESTRUTURA QUE IMAGINEI PARA PRODUTO NO PEDIDO...
  //   {
  //     idProduto: Number,
  //     precoBase: Number,
  //     precoTotal: Number,
  //     cod: String,
  //     qtProduto: Number,
  //     adicionais: [
  //       {
  //         idAdicional: Number,
  //         titulo: String,
  //         comportamento: String,
  //         tipo: String,
  //         opcoes: [
  //           {
  //             idOpcao: Number,
  //             titulo: String,
  //             preco: Number,
  //             qtAdicional: Number
  //           }
  //         ]
  //       },
  //     ],
  //   }

  useEffect(() => {
    // FIXME: corrigir essa forma de realizar a chamada posteriormente
    axiosInstance.get(`produto/${id}`)
      .then((res) => {
        console.log(res);
        setPageData(res.data);
      })
      .catch((error) => {
        if (error.response) {
          // A requisição foi feita e o servidor respondeu com um código de status
          // que sai do alcance de 2xx
          console.error(error.response.data);
          console.error(error.response.status);
          console.error(error.response.headers);
        } else if (error.request) {
          // A requisição foi feita mas nenhuma resposta foi recebida
          // `error.request` é uma instância do XMLHttpRequest no navegador e uma instância de
          // http.ClientRequest no node.js
          console.error(error.request);
        } else {
          // Alguma coisa acontenceu ao configurar a requisição que acionou este erro.
          console.error('Error', error.message);
        }
        console.error(error.config);
      })
      .finally((end) => {
        console.log(end);
      });
  }, [id])

  return (
    <Container fluid className="containerProduct">
      {pageData && (
        <>
          <img src={pageData.fotos[0]} alt="imagem_produto" />
          <main>
            <h2>{pageData.titulo}</h2>
            <p>{pageData.descricao}</p>
            <h3>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(pageData.preco)}</h3>

            {/* acompanhamentos aqui */}
            <hr />

            {pageData.adicionais.map(adicional => (
              <div className="additional" >
                <h2>{adicional.titulo}</h2>

                {adicional.opcoes.map(opcao => {
                  console.log("opcaooo", opcao);
                  return (
                    <div className="additionalOption">
                      <div className="OptionTextBox">
                        <p>{opcao.titulo}</p>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(opcao.preco)}</p>
                      </div>

                      {adicional.tipo === 'incremento' ? (
                        <div>
                          <button>-</button>
                          <input type="number" name="" id="" />
                          <button>+</button>
                        </div>
                      ) : (
                        // TODO: fazer mudança para ficar com layout previsto
                        <div className="checkContainer" >
                          <label htmlFor="optionRadio">
                            <input type="radio" name="checkBoxAdicional" id="optionRadio" />
                          </label>
                        </div>
                      )}



                    </div>
                  )
                })}
              </div>
            ))}

            <div className="observationBox">
              <h2>Alguma observação?</h2>
              <input type="text" placeholder="Ex: usar produtos sem lactose" />
            </div>
          </main>
          <footer className="productFooter">
            <div>
              <input type="number" name="" id="" />
              <h1>R$ 00,00</h1>
            </div>
            <button className="btn-success">Adicionar ao carrinho</button>
          </footer>
        </>
      )}
    </Container>
  )
}

export default Product;