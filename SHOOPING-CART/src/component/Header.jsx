import React from "react";
import {
  Container,
  Navbar,
  Form,
  Col,
  Row,
  Dropdown,
  Badge,
  Button
} from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartState } from "../context/Context";
import { AiFillDelete } from "react-icons/ai";

function Header() {
  const {
    state: { cart }, dispatch
  } = CartState();
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <Link to="/">ShopingCart</Link>{" "}
          </Navbar.Brand>

          <Form inline>
            <Row>
              <Col ms="auto">
                <Form.Control
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                />
              </Col>
            </Row>
          </Form>
          <Dropdown align="end">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              <FaShoppingCart size="20" />
              <Badge bg="green">{cart.length}</Badge>
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ width: 370 }}>
              {cart.length > 0 ? (
                <>
                  {cart.map( prod => (
                    <span className="cartitem" key={prod.id}>
                    <img
                      src={prod.image}
                      className="cartItemImg"
                      alt={prod.name}
                    />
                    <div className="cartItemDetail">
                      <span>{prod.name}</span>
                      <span>₹ {prod.price.split(".")[0]}</span>
                    </div>
                    <AiFillDelete
                      fontSize="20px"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        dispatch({
                          type: "REMOVE_FROM_CART",
                          payload: prod,
                        })
                      }
                    />
                  </span>
                  ))}
                  <Link to='cart'>
                    <Button style={{width: "95%", margin: "0 10"}}>GO TO CART</Button>
                  </Link>
                </>
              ) : (
                <Dropdown.Item href="#/action-1">Cart is empty</Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
