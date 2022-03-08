import { useEffect, useState, useContext } from "react";
import { Container } from "react-bootstrap";
import "./style.css";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance";
import { OrderContext } from "../../common/providers/orderContext";

function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pageData, setPageData] = useState();
  const [productToOrder, setProductToOrder] = useState(
    {
      idProduto: null,
      imageUrl: "",
      titulo: "",
      precoBase: null,
      precoTotal: null,
      cod: "",
      qtProduto: null,
      observacao: "",
      adicionais: [],
    }
  );
  const { setOrders, orders } = useContext(OrderContext);

  const addToCart = () => {
    setOrders([...orders, productToOrder]);
    navigate('/', { replace: true });
  }

  const addAdditionalRadio = (additional, option) => {
    let additionalAdded = productToOrder.adicionais.find(a => a.idAdicional === additional.id);
    let additionalAddedIndex = productToOrder.adicionais.findIndex(a => a.idAdicional === additional.id);
    let oldOption = productToOrder.adicionais[additionalAddedIndex].opcoes[0];

    const additionalToAdd = {
      ...additionalAdded,
      opcoes: [
        {
          idOpcao: option.id,
          titulo: option.titulo,
          preco: option.preco,
          qtAdicional: 1
        }
      ]
    }


    const { adicionais } = productToOrder;
    const newAdicionais = Array.from(adicionais)
    newAdicionais[additionalAddedIndex] = additionalToAdd;

    setProductToOrder({
      ...productToOrder,
      precoTotal: ((productToOrder.precoTotal / productToOrder.qtProduto) - oldOption.preco + option.preco) * productToOrder.qtProduto,
      adicionais: [...newAdicionais]
    });
  }

  const setQtProduct = (e) => {
    if (Number(e.target.value) <= 0) return;

    const newProductToOrder = {
      ...productToOrder,
      qtProduto: e.target.value,
      precoTotal: (productToOrder.precoTotal / productToOrder.qtProduto) * e.target.value,
    }

    setProductToOrder(newProductToOrder)
  }

  const setSumAdditional = (isSum, adicional, opcao) => {
    if (isSum) {
      const newQtAdicional = opcao.qtAdicional + 1;
      const additionalRegisteredIndex = productToOrder.adicionais.findIndex(a => a.idAdicional === adicional.idAdicional);
      const toNewAdicionais = Array.from(productToOrder.adicionais);

      toNewAdicionais[additionalRegisteredIndex].opcoes.find(o => o.idOpcao === opcao.idOpcao).qtAdicional = newQtAdicional;

      const newProductToOrder = {
        ...productToOrder,
        adicionais: toNewAdicionais,
        precoTotal: productToOrder.precoTotal + (opcao.preco * productToOrder.qtProduto)
      }

      setProductToOrder(newProductToOrder);

      return;
    } else if (Number(opcao.qtAdicional) === 0) return;

    const newQtAdicional = opcao.qtAdicional - 1;

    const additionalRegisteredIndex = productToOrder.adicionais.findIndex(a => a.idAdicional === adicional.idAdicional);
    const toNewAdicionais = Array.from(productToOrder.adicionais);

    toNewAdicionais[additionalRegisteredIndex].opcoes.find(o => o.idOpcao === opcao.idOpcao).qtAdicional = newQtAdicional;

    const newProductToOrder = {
      ...productToOrder,
      adicionais: toNewAdicionais,
      precoTotal: productToOrder.precoTotal - (opcao.preco * productToOrder.qtProduto)
    }

    setProductToOrder(newProductToOrder);

  }

  useEffect(() => {
    axiosInstance.get(`produto/${id}`)
      .then((res) => {
        let adicionais = [];

        if (res.data.adicionais.length > 0) {
          adicionais = res.data.adicionais.map(a => {
            if (a.tipo === 'checkbox') {
              return {
                idAdicional: a.id,
                titulo: a.titulo,
                comportamento: a.comportamento,
                tipo: a.tipo,
                opcoes: [
                  {
                    idOpcao: a.opcoes[0].id,
                    titulo: a.opcoes[0].titulo,
                    preco: a.opcoes[0].preco,
                    qtAdicional: 1
                  }
                ]
              }
            }

            return {
              idAdicional: a.id,
              titulo: a.titulo,
              comportamento: a.comportamento,
              tipo: a.tipo,
              opcoes: a.opcoes.map(o => {
                return {
                  idOpcao: o.id,
                  titulo: o.titulo,
                  preco: o.preco,
                  qtAdicional: 0
                }
              })
            }
          })
        }

        setProductToOrder({
          idProduto: res.data.id,
          imageUrl: res.data.fotos[0],
          titulo: res.data.titulo,
          precoBase: res.data.preco,
          precoTotal: res.data.preco,
          cod: res.data.codigo,
          qtProduto: 1,
          observacao: "",
          adicionais
        });

        setPageData(res.data);
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data);
          console.error(error.response.status);
          console.error(error.response.headers);
        } else if (error.request) {
          console.error(error.request);
        } else {
          console.error('Error', error.message);
        }
        console.error(error.config);
      })
  }, [id]);

  return (
    <Container fluid className="containerProduct">
      {pageData && (
        <>
          <img src={pageData.fotos[0]} alt="imagem_produto" />
          <main>
            <h2>{pageData.titulo}</h2>
            <p>{pageData.descricao}</p>
            <h3>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(pageData.preco)}</h3>

            <hr />

            {pageData.adicionais.map((adicional, indexAdicional) => (
              <div className="additional" key={adicional.id} >
                <h2>{adicional.titulo}</h2>

                {adicional.opcoes.map((opcao, indexOpcao) => {
                  return (
                    <div className="additionalOption" key={opcao.id}>
                      <div className="OptionTextBox">
                        <p>{opcao.titulo}</p>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(opcao.preco)}</p>
                      </div>

                      {adicional.tipo === 'incremento' ? (
                        <div>
                          <button onClick={() => { setSumAdditional(false, productToOrder.adicionais.find(a => a.idAdicional === adicional.id), productToOrder.adicionais[indexAdicional].opcoes.find(op => op.idOpcao === opcao.id)) }}>-</button>
                          <input type="number" name="" id="" min={adicional.min} max={adicional.max} value={productToOrder.adicionais[indexAdicional].opcoes.find(op => op.idOpcao === opcao.id).qtAdicional} readOnly />
                          <button onClick={() => { setSumAdditional(true, productToOrder.adicionais.find(a => a.idAdicional === adicional.id), productToOrder.adicionais[indexAdicional].opcoes.find(op => op.idOpcao === opcao.id)) }}>+</button>
                        </div>
                      ) : (
                        // TODO: fazer mudança para ficar com layout previsto
                        <div className="checkContainer" >
                          <label htmlFor="optionRadio">
                            <input
                              type="radio"
                              name="checkBoxAdicional"
                              id="optionRadio"
                              onChange={() => {
                                addAdditionalRadio(adicional, opcao, { productToOrder, indexAdicional, indexOpcao, pageData });
                              }}
                              checked={!!productToOrder.adicionais[indexAdicional].opcoes.find(op => op.idOpcao === opcao.id)}
                            />
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
              <input type="text" value={productToOrder.observacao} onChange={(e) => { setProductToOrder({ ...productToOrder, observacao: e.target.value }) }} placeholder="Ex: usar produtos sem lactose" />
            </div>
          </main>
          <footer className="productFooter">
            <div>
              <input type="number" name="" id="" value={productToOrder.qtProduto} onChange={setQtProduct} min={1} />
              <h1>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(productToOrder.precoTotal)}</h1>
            </div>
            <button className="btn-success" onClick={addToCart}>Adicionar ao carrinho</button>
          </footer>
        </>
      )}
    </Container>
  )
}

export default Product;