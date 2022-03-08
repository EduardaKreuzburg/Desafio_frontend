import { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosInstance";
import { Container } from "react-bootstrap";
import "./style.css";
import bg1 from "../assets/temp/bg1.jpg";
import { Link } from "react-router-dom";
import Select from 'react-select';

function Restaurant() {
    const [pageData, setPageData] = useState({});
    const [options, setOptions] = useState([]);
    const [optionsToFilter, setOptionsToFilter] = useState([]);

    const selectStyles = {
        control: ( styles ) => {
            return {
                ...styles,
                backgroundColor: '#FFF',
                border: '2pt solid #DFE4F2 !important',
                borderRadius: '5pt',
                padding: '8px 10px !important',
            }
        },
        multiValue: ( styles ) => {
            return {
                ...styles,
                backgroundColor: '#557CF2',
                borderRadius: '19pt',
                paddingTop: '3px !important',
                paddingBottom: '3px !important',
                paddingLeft: '24px !important',
                paddingRight: '13px !important',
                marginLeft: '3px !important'
            }
        },
        multiValueLabel: ( styles ) => {
            return {
                ...styles,
                color: '#FFF',
                fontSize: '16px'
            }
        },
        multiValueRemove: ( styles ) => {
            return {
                ...styles,
                color: '#FFF',
                width: '16px',
                svg: {
                    width: '20px !important',
                    height: '20px !important'
                },
                ':hover': {
                    color: '#FFF',
                    backgroundColor: '#3B59B2'
                }
            }
        },
    }

    useEffect(() => {
        axiosInstance.get('produtos/')
            .then((res) => {
                const toOptionSelect = res.data.produtos.map(produto => ({ value: produto.id, label: produto.titulo }));
                setOptions(toOptionSelect);
                setOptionsToFilter(toOptionSelect);
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
                            <Select
                                defaultValue={options}
                                onChange={(values) => {
                                    console.log(values);
                                    setOptionsToFilter(values);
                                }}
                                isMulti
                                name="categories"
                                options={options}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                placeholder="Filtrar Categorias..."
                                styles={selectStyles}
                            />
                        </div>
                        <div className="listOfProducts">
                            {optionsToFilter.map((catProduct) => {
                                return (
                                    <div key={`cat#${pageData.produtos.find(cat => cat.id === catProduct.value).id}`} className="category">
                                        <h2  >{pageData.produtos.find(cat => cat.id === catProduct.value).titulo}</h2>
                                        <hr />
                                        {pageData.produtos.find(cat => cat.id === catProduct.value).produtos.map(product => {
                                            return (
                                                <Link to={`product/${product.id}`} key={`cat#${pageData.produtos.find(cat => cat.id === catProduct.value).id}-product#${product.id}`}>
                                                    <div key={`cat#${pageData.produtos.find(cat => cat.id === catProduct.value).id}-product#${product.id}`} className="product">
                                                        <img src={product.fotos[0]} alt="" />

                                                        <div className="productInfo">
                                                            <h4>{product.titulo}</h4>
                                                            <p>{product.descricao}</p>
                                                            <h3>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.preco)}</h3>
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