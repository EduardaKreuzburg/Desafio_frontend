import { useParams } from "react-router-dom";

function Product() {
  const { id } = useParams();

  return (
    <h1>Tela de produto específico de código {id}</h1>
  )
}

export default Product;