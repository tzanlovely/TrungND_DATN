import NavbarMenu from "../components/layout/NavbarMenu"
import QuotesContainer from '../components/layout/QuotesContainer'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import {Container, Row, Col} from 'react-bootstrap'
import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import ReactDOM from 'react-dom'
import { apiUrl } from "../contexts/constants"
import {AuthContext} from '../contexts/AuthContext'

const Learn = (props) => {
    const [topics, setTopics] = useState([])
    const [process, setProcess] = useState()
    const [isBusy, setBusy] = useState(true)
    const [defaultKey, setDefaultKey] = useState(0)
    const [learnProcess, setLearnProcess] = useState()

    const {
        authState: {
            user: {username}
        }
    } = useContext(AuthContext)

    useEffect(() => {
        const getLearnPage = async () => {
            try {
                const res = await axios.post(`${apiUrl}/api/auth/getLearnPage`)
                setTopics(res.data)
                if (props.location.state === undefined){
                    
                } else {
                    setDefaultKey(props.location.state.topicId)
                }
                const score = await axios.post(`${apiUrl}/api/auth/getLearnProcess`, {username : username})
                setLearnProcess(score.data)
                console.log(learnProcess)
                setBusy(false)           
                const titleElement = document.getElementById(props.location.state.topicId + '/' + props.location.state.lessonId)
                titleElement.scrollIntoView({
                    behavior : 'smooth',
                    block : 'start'
                })
                

            } catch (error) {
                console.log(error.message)
            }
        }
        
        getLearnPage();
    }, [])


    const style = {
        borderRadius : 30
    }

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
            <Container >
                <Row>
                    <Col md={{span: 6, offset: 3}}>
                        <QuotesContainer/>
                    </Col>
                </Row>
            </Container>
            <br/>
            {
                topics.map(topic => (
                    <Accordion defaultActiveKey={defaultKey}>
                        <Card>
                            {/* <Card.Header style={{backgroundColor : '#7ae0f5', alignItems : 'left'}}> */}
                                <Accordion.Toggle as={Card.Header} variant="link" eventKey={topic.topicId} style={{backgroundColor : '#7ae0f5', alignItems : 'left'}}>
                                    <div>
                                        <Button variant='info' style={{width : '200px'}}>{topic.topicNameEn}</Button>
                                        {/* <span style={{marginLeft : 'auto', marginRight : 'auto', border : '1px solid black', fontSize : '10px', fontFamily : ''}}>{topic.topicNameVn}</span> */}
                                    </div>
                                </Accordion.Toggle>
                            {/* </Card.Header> */}
                            <Accordion.Collapse eventKey={topic.topicId}>
                                <Card.Body>
                                        <table className="table table-hover" style={{border : '1px solid black'}}>
                                            <tbody>
                                            {topic.listLesson.map(lesson =>(
                                                <tr className="table table-primary" style={{border : '1px solid black'}} id={lesson.topicId + '/' + lesson.lessonId}>
                                                    <td>{lesson.lessonNameVn}</td>
                                                    <td>{(learnProcess[topic.topicId-1][lesson.lessonId-1] ? learnProcess[topic.topicId-1][lesson.lessonId-1] : 0) + "/" + lesson.maxScore}</td>
                                                    <td>
                                                        {/* không direct đến /study được vì thiếu style của lesson, phải direct đến trang /learn và lesson*/}
                                                        <Link to={{pathname: '/study', state : {topicId : lesson.topicId, lessonId : lesson.lessonId, type : lesson.type, currentScore : learnProcess[topic.topicId-1][lesson.lessonId-1], minScore : lesson.minScore, username : username}}}>
                                                        <Button variant='secondary'>Bắt đầu</Button>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}   
                                            </tbody>
                                        </table>                                             
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                    
                ))
            }
        </div>
    )
}

export default Learn
