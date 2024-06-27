import {Container, Row, Col} from 'react-bootstrap'

const Footer = () => {
    const currentYear = new Date().getFullYear()
  return (
    <footer>
        <Container>
            <Row>
                <Col className='text-content py-3'>
                    <p>travelShop &copy; {currentYear}</p>
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer