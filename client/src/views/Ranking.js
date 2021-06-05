import {Container, Row, Col} from 'react-bootstrap'
import NavbarMenu from "../components/layout/NavbarMenu"
import QuotesContainer from '../components/layout/QuotesContainer'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Leaderboard from 'react-leaderboard'
import { AuthContext } from '../contexts/AuthContext'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { apiUrl } from '../contexts/constants'

const Ranking = () => {
    const id = 0;
    const [tops, setTops] = useState([])

    useEffect(() => {
        const getScoreboard = async () => {
            try {
                const res = await axios.post(`${apiUrl}/api/auth/getScoreboard`)
                setTops(res.data)
            } catch (error) {
                console.log(error.message)
            }
        }
        
        getScoreboard();
    }, [])

    return (
        <div>
            <NavbarMenu/>
            <br/>
            <Container show={false}>
                <Row>
                    <Col md={{span: 6, offset: 3}}>
                        <QuotesContainer/>
                    </Col>
                </Row>
            </Container>
            <h1 style={{textAlign : 'center'}}>Leaderboard</h1>
            <table className="table center" style={{marginLeft : 'auto', marginRight: 'auto', width: 600}}>
                <thead>
                    <tr>
                        <th scope="col">Username</th>
                        <th style={{textAlign : 'right'}}>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {tops.map(top =>(
                        <tr>
                            <td>{top.name}</td>
                            <td>{top.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Ranking
