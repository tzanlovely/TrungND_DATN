import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Logo from '../../assets/online-education.png'
import Learn from '../../assets/open-book.png'
import Exercise from '../../assets/exam.png'
import Ranking from '../../assets/rank.png'
import logoutIcon from '../../assets/logout.svg'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'
import {AuthContext} from '../../contexts/AuthContext'
import {useContext} from 'react'

const NavbarMenu = () => {
    const {
        authState: {
            user: {username}
        },
        logoutUser
    } = useContext(AuthContext)

    const logout = () => logoutUser()
    
    return (
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

                <Nav>
                    <Nav.Link className='font-weight-bolder text-white' disabled>
                        Welcome {username}
                    </Nav.Link>
                    <Button variant='secondary' className='font-weight-bolder text-white' onClick={logout}>
                        <img src={logoutIcon} alt="logoutIcon" width='32' height='32' className='mr-2'/>
                        Logout
                    </Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavbarMenu
