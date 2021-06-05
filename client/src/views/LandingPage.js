import Carousel from 'react-bootstrap/Carousel'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'
import Logo from '../assets/online-education.png'
import Learn from '../assets/open-book.png'
import Exercise from '../assets/exam.png'
import Ranking from '../assets/rank.png'
import LP1 from '../assets/landing-page1.jpg'
import LP2 from '../assets/landing-page2.jpg'
import LP3 from '../assets/landing-page3.jpg'

const LandingPage = () => {
    return (
        <>
            <Navbar expand='lg' bg='primary' variant='dark' className='shadow'>
            <Navbar.Brand className='font-weight-bolder text-white'>
                <Nav.Link className='font-weight-bolder text-white' to='/dashboard' as={Link}>
                    <img src={Logo} alt="logo" width='32' height='32' className='mr-2'/>
                    EzEnglish
                </Nav.Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='mr-auto'>
                    <Nav.Link className='font-weight-bolder text-white' to='/learn' as={Link} style={{paddingLeft : '30px'}}>
                        <img src={Learn} alt="logo" width='32' height='32' className='mr-2'/>
                        Học
                    </Nav.Link>
                    <Nav.Link className='font-weight-bolder text-white' to='/exercise' as={Link} style={{paddingLeft : '30px'}}>
                        <img src={Exercise} alt="logo" width='32' height='32' className='mr-2'/>
                        Luyện đề
                    </Nav.Link>
                    <Nav.Link className='font-weight-bolder text-white' to='/ranking' as={Link} style={{paddingLeft : '30px'}}>
                        <img src={Ranking} alt="logo" width='32' height='32' className='mr-2'/>
                        Xếp hạng
                    </Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Carousel style={{zIndex : -1}}>
                <Carousel.Item interval={1000}>
                    <img
                    width={900}
                    height={500}
                    className="d-block w-100"
                    src={LP1}
                    alt="First slide"
                    />
                    <Carousel.Caption>
                    
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={500}>
                    <img
                    width={900}
                    height={500}
                    className="d-block w-100"
                    src={LP2}
                    alt="Second slide"
                    />
                    <Carousel.Caption>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    width={900}
                    height={500}
                    className="d-block w-100"
                    src={LP3}
                    alt="Third slide"
                    />
                    <Carousel.Caption>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <Button style={{marginTop : '-200px', marginLeft : '100px', zIndex: 1}} variant='danger' href='/login' size='lg'>Bắt đầu</Button>

        </>
    )
}

export default LandingPage
