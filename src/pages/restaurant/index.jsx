import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import { Container } from "react-bootstrap";
import "./style.css";
import bg1 from "../assets/temp/bg1.jpg";
import { Link } from "react-router-dom";
// import requestsService from "../../services/requests";

function Restaurant() {

    const [pageData, setPageData] = useState({});



    useEffect(() => {
        // requestsService.getAllProducts()
        //     .then((res) => {
        //         console.log(res);
        //     })

        // FIXME: corrigir essa forma de realizar a chamada posteriormente
        axiosInstance.get('produtos/')
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


    }, []);

    return (

        <Container fluid className="containerRestaurant">
            {pageData.dadosDaLoja && (
                // TODO: aqui é necessário pegar a url da imagem que vem no endpoint
                // mas a api não está buscando a URL da imagem do estabelecimento, então ficou assim...
                <>
                    <header className="headerRestaurant" style={{ backgroundImage: `url(${bg1})` }} >
                        <h1 className="restaurantTitle" >
                            {pageData.dadosDaLoja.titulo}
                        </h1>
                    </header>
                    <main className="mainRestaurant">
                        <div className="selectCategory" >
                            <form action="">
                                <select>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                            </form>
                        </div>
                        <div className="listOfProducts">
                            {pageData.produtos.map(catProduct => {
                                return (
                                    <div key={`cat#${catProduct.id}`} className="category">
                                        <h2  >{catProduct.titulo}</h2>
                                        <hr />
                                        {catProduct.produtos.map(product => {
                                            return (
                                                <Link to={`product/${product.id}`} key={`cat#${catProduct.id}-product#${product.id}`}>
                                                    <div key={`cat#${catProduct.id}-product#${product.id}`} className="product">
                                                        <img src={product.fotos[0]} alt="" />
                                                        
                                                        <div className="productInfo">
                                                            <h4>{product.titulo}</h4>
                                                            <p>{product.descricao}</p>
                                                            <h3>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(product.preco)}</h3>
                                                        </div>
                                                    </div>
                                                </Link>
                                            )
                                        })}
                                    </div>
                                )
                            })}
                        </div>
                    </main>
                </>
            )}
        </Container>

    )
}

export default Restaurant;