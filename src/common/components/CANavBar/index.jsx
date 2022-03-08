import { useContext, useState } from "react";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import { OrderContext } from "../../providers/orderContext";
import "./style.css";

function CANavBar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { orders } = useContext(OrderContext);
  return (
    <Navbar bg="light" expand={false} className="navbarCA">
      <Container className="navbarContent">
        <Navbar.Brand>
          <Link to="/">
            <div className="brandBox">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 22" style={{ width: "32px" }}>
                <path fill="#fff" d="M23.49 4.49c-.7.3-1.3.5-2.1.8s-.6 1.29-.6 1.59a5.65 5.65 0 0 1 .1 1.29c0 5.07-3.8 9.15-8.39 9.15s-8.39-4.07-8.39-9.15a9.57 9.57 0 0 1 1.1-4.47c.2-.5.7-.9.5-1.49s-.8-1-1.9-1.89A1.11 1.11 0 0 0 2 .71a15.69 15.69 0 0 0-2 7.46C-.29 15.93 5.7 22 12.5 22S25 15.83 25 8.17a8.55 8.55 0 0 0-.2-2.78 1.08 1.08 0 0 0-1.31-.9z" />
                <path fill="#f26b7a" d="M17.89 9.77a5.59 5.59 0 0 0-.89-.12c-1.1 0-1.09-.08-1.39.51A3.44 3.44 0 0 1 12 12.25a3.41 3.41 0 0 1-2.7-3.08c-.1-.4-.19-.83-1.3-1-.2 0-.35-.06-.8-.1-1.1-.1-1.1.6-1.1.8a6.73 6.73 0 0 0 5.49 6.47 6.6 6.6 0 0 0 7.09-4.48c.11-.3.32-.86-.79-1.09z" />
              </svg>
              <h2>
                CatálogoApp
              </h2>

            </div>
          </Link>
        </Navbar.Brand>
        <div className="actionsMenuBox" style={{ position: "absolute", top: 10, right: 20 }}>
          <Link to="cart">
            <div className="cartBox position-relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32">
                <path fill="#F7FFFC" d="M24 2.667c-.621 0-1.159.429-1.3 1.033l-1.299 5.633H4a1.33 1.33 0 0 0-1.051.513 1.339 1.339 0 0 0-.244 1.144l2.667 10.667a1.335 1.335 0 0 0 1.295 1.009H20c.621 0 1.159-.428 1.3-1.033l3.76-16.3h4.273V2.666H24zM18.94 20H7.708l-2-8h15.077l-1.845 8zM10.667 26.667a2.667 2.667 0 1 1-5.334 0 2.667 2.667 0 0 1 5.334 0zM21.333 26.667a2.667 2.667 0 1 1-5.334 0 2.667 2.667 0 0 1 5.334 0z" />
              </svg>
              {orders.length > 0 && (
                <span className="position-absolute top-0 start-0 translate-middle badge rounded-pill bg-danger badgeOrder">
                  {orders.length}
                  <span className="visually-hidden">unread messages</span>
                </span>
              )}
            </div>

          </Link>
          <Navbar.Toggle aria-controls="offcanvasNavbar" className="menuBarButton" onClick={handleShow}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#fff" className="bi bi-list" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
            </svg>
          </Navbar.Toggle>
        </div>
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
          show={show}
          onHide={handleClose}
        >
          <Offcanvas.Body className="drawerMenuBody">
            <Nav className="justify-content-end flex-grow-1 pe-3 drawerMenuBodyNav">
              <Link to="/cart"><button onClick={handleClose}>Abrir carrinho</button></Link>
              <Nav.Link>Informações e Endereço</Nav.Link>
              <Nav.Link>Horário de atendimento</Nav.Link>
              <Nav.Link>Ligar para a empresa</Nav.Link>
              <Nav.Link>Enviar mensagem</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default CANavBar;
