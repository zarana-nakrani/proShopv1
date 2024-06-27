import { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
// import products from '../products'
import Ratings from '../components/Ratings'
import { Row, Col, Image, ListGroup, Card, ListGroupItem, Button, Form} from 'react-bootstrap'
import axios from 'axios'
import { useGetProductsDetailsQuery } from '../slices/productsApiSlice'

import { addToCart } from '../slices/cartSlice'

import React from 'react'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProductScreen = () => {
    // const [product, setProduct] = useState([]);
    const { id: productId } = useParams();
    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const addToCartHandler = () => {
      dispatch(addToCart({...product, qty}))
      navigate('/cart');
    }
    // useEffect(() => {
    //   const fetchProduct = async () => {
    //     const { data } = await axios.get(`/api/products/${productId}`);
    //     setProduct(data);
    //   }
    //   fetchProduct();
    // }, [productId])
    const {data: product, isLoading, isError} = useGetProductsDetailsQuery(productId);
  return (
    <>
    <Link className='btn bth-light my-3' to='/'>
        Go Back
    </Link>
    {/* <Message variant='success'>Info</Message> */}
    {isLoading ? (<Loader/>) : isError ? (
      <Message variant='danger'>{isError?.data?.message}</Message> ) : (
      <>
      <Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Ratings value={product.rating} text={`${product.numReviews} reviews`} />
            </ListGroup.Item>
            <ListGroup.Item>
              <Card.Text>
                {product.description}
              </Card.Text>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    <strong>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong>
                  </Col>
                </Row>
              </ListGroupItem>
              {product.countInStock > 0 && (
              <ListGroupItem>
                <Row>
                  <Col>Qty</Col>
                  <Col>
                  <Form.Control as='select' value={qty} onChange={(e) => setQty(Number(e.target.value))}>
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </Form.Control>
                  </Col>
                </Row>
              </ListGroupItem>
              ) }
              <ListGroup.Item>
                <Button 
                className='btn-block' 
                type='button' 
                disabled={product.countInStock === 0}
                onClick={addToCartHandler}
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row></>
    )}
      
    </>
  )
}

export default ProductScreen