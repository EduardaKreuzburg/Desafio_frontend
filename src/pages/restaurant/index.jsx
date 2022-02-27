import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import { Container } from "react-bootstrap";
import "./style.css";
// import requestsService from "../../services/requests";

function Restaurant() {

    const [pageData, setPageData] = useState({});



    useEffect(() => {
        // requestsService.getAllProducts()
        //     .then((res) => {
        //         console.log(res);
        //     })

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

        <Container fluid>
            {pageData.dadosDaLoja && (
                <header className="" tyle={{ backgroundImage: `url(${pageData.dadosDaLoja.background})` }} >
                    <p>
                        {pageData.dadosDaLoja.titulo}
                    </p>
                </header>
            )}
        </Container>

    )
}

export default Restaurant;