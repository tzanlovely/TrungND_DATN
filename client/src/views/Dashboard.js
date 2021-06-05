import {useContext, useState, useEffect} from 'react'
import {AuthContext} from '../contexts/AuthContext'
import {Container, Row, Col, Button, Spinner, Accordion} from 'react-bootstrap'
import Graph from '../components/layout/Graph'
import NavbarMenu from '../components/layout/NavbarMenu'
import QuotesContainer from '../components/layout/QuotesContainer'
import axios from 'axios'
import ReactApexChart from 'react-apexcharts'
import {Link} from 'react-router-dom'
import { apiUrl } from '../contexts/constants'

const Dashboard = () => {
    const {
        authState: {
            user: {username}
        }
    } = useContext(AuthContext)

    //Data graph
    const [series, setSeries] = useState([{
        name: "Streak",
        data: []
    }])
    const [isBusy, setBusy] = useState(true)
    const [currentLesson, setCurrentLesson] = useState({})
    const [totalScore, setTotalScore] = useState()

    const [options, setOptions] = useState({
        chart: {
            height: 350,
            type: 'line',
            zoom: {
            enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            text: 'Learning streak last 4 days',
            align: 'left'
        },
        grid: {
            row: {
            colors: ['#f3f3f3', 'red'], // takes an array which will be repeated on columns
            opacity: 0.5
            },
        },
        xaxis: {
            categories: ['4 days ago', '3 days ago', '2 days ago', 'Yesterday', 'Today'],
        }
    })

    useEffect(() => {
        const getDashboard = async () => {
            try {
                const res = await axios.post(`${apiUrl}/api/auth/getDashboard`, {username : username})
                setSeries([{name : "Streak", data : res.data.lastStreak}])
                setCurrentLesson(res.data.currentLesson)
                setTotalScore(res.data.totalScore)
                setBusy(false)
            } catch (error) {
                console.log(error.message)
            }
        }

        getDashboard();
        
    }, [])
    if (isBusy) 
    return (
        <div className='spinner-container'>
            <Spinner animation='border' variant='info'/>
        </div>
    ); else 
    return (
        <div>
            <NavbarMenu/>
            <br/>
            <Container>
                <Row>
                    <Col md={{span: 6, offset: 3}}>
                        <QuotesContainer/>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col lg={4}>
                        <Row>
                            <h1>Điểm hiện tại của bạn là {totalScore}</h1>
                        </Row>
                        <Link to={{pathname : '/learn', state : {topicId : currentLesson.topicId, lessonId : currentLesson.lessonId}}}>
                                <Button variant='info'>
                                 Go to current task
                                </Button>                                
                        </Link>
                        
                    </Col>
                    <Col lg={{span: 3, offset: 3}} className='justify-content-md-center'>
                        <div className='col-8'>
                            <ReactApexChart options={options} series={series} type="line" height={300} width={400}/>
                        </div>
                    </Col>
                </Row>
                
            </Container>
        </div>

    )
}

export default Dashboard
