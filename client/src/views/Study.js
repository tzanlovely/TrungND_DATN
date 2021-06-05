import Button from 'react-bootstrap/Button'
import ProgressBar from 'react-bootstrap/ProgressBar'
import {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner'
import { apiUrl } from '../contexts/constants'
import {Link} from 'react-router-dom'

const Study = (props) => {
    const [pageNum , setPageNum] = useState(0)
    const [prevButton, setPrevButton]= useState(false)
    const [finalPage, setFinalPage] = useState(false)
    const [checkResult, setCheckResult] = useState(true)
    const [inputAnswer, setInputAnswer] = useState({})
    const [isBusy, setBusy] = useState(true)
    const [datas, setDatas] = useState([])
    const [allPage, setAllPage] = useState([])
    let score = useRef({abc : 0})    
    let totalScore = useRef(0)


    const onChangeInputAnswer = event => {
        setInputAnswer({
            ...inputAnswer,
            [event.target.name] : event.target.value
        });
    }

    const nextPage = () => {
        setPageNum(pageNum + 1)
        setPrevButton(true)
        
        if (pageNum === 1) {
            setFinalPage(true)
            
        }
        setCheckResult(true)
    }

    const prevPage = () => {
        setPageNum(pageNum - 1)
        if (pageNum === 1) {
            setPrevButton(false)
            
        }
        setFinalPage(false)
        setCheckResult(false)
    }

    const checkAllAnswer = () => {
        let temp = allPage;
        temp[pageNum] = 0;
        setAllPage(temp)  
        setFinalPage(!finalPage)    
    }

    const checkEachAnswer = () => {

    }

    const correctAnswer = (key) => {
        if (allPage[pageNum] === 0){    
            score.current = {...score.current, [key] : 10}
            return {color : 'green'}
        }
    }

    const finishStudy = async () => {
        for (var key in score.current) {
            totalScore.current += score.current[key]
        }
        if (props.location.state.type === "theory"){
            totalScore.current += 20;
        }
        await axios.post(`${apiUrl}/api/auth/finishStudyLesson`, {topicId : props.location.state.topicId, lessonId : props.location.state.lessonId, currentScore : props.location.state.currentScore, minScore : props.location.state.minScore, newScore : totalScore.current, username : props.location.state.username})
    }

    useEffect(() => {
        const getSlide = async () => {
            try {
                if (props.location.state.type === 'theory'){
                    const res = await axios.post(`${apiUrl}/api/auth/getTheorySlide`, {topicId : props.location.state.topicId, lessonId : props.location.state.lessonId})
                    setDatas(res.data)
                    
                    for (let i = 0; i < res.data.length -1 ; i++){
                        setAllPage(oldAllPage => [...oldAllPage, 0])
                    }
                    setAllPage(oldAllPage => [...oldAllPage, 1])
                    
                    setBusy(false)
                } else if (props.location.state.type === 'practice') {
                    const res = await axios.post(`${apiUrl}/api/auth/getPracticeSlide`, {topicId : props.location.state.topicId, lessonId : props.location.state.lessonId})
                    setDatas(res.data)
                    
                    for (let i = 0; i < res.data.length  ; i++){
                        setAllPage(oldAllPage => [...oldAllPage, 1])
                    }
                    
                    setBusy(false)
                }
            } catch (error) {
                console.log(error.message)
            }
        }
        getSlide();
        console.log(score.current.abc)

    }, [])


    if (isBusy) 
    return (
        <div className='spinner-container'>
            <Spinner animation='border' variant='info'/>
        </div>
    ); else 
    return (
        <div>
            <div style={{width : 1000, marginRight : 'auto', marginLeft : 'auto'}}>
                <br/>
                <ProgressBar animated min={0} max={datas.length} now={datas[pageNum].slideId}/>
                <br/>
            </div>
            
            <br/>
            <div style={{width : 1000, height : 450, margin : 'auto', justifyContent: 'center', alignContent : 'center'}} >
                        <div>
                            {(datas[pageNum].type === 'theory') && datas[pageNum].content.map(contents => (
                                <div>
                                    <h1 style={{textAlign : 'center', fontSize : '48px'}}>{contents.title}</h1>
                                    <div>
                                        {contents.detail.map(details => (
                                            <div>
                                            <p style={{textAlign : 'center', fontSize : '18px'}}>{details.line}</p>
                                            <p style={{textAlign : 'center', fontSize : '16px'}}>{details.example}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                            }
                            {(datas[pageNum].type === 'practice' || datas[pageNum].type ==='verbForm') && datas[pageNum].content.map(contents => (
                                <div>
                                    <h1 style={{textAlign : 'center', fontSize : '36px'}}>{contents.title} </h1>
                                    <div>
                                        {contents.detail.map(details => (
                                            <div>
                                                <p style={{textAlign : 'center', fontSize : '18px'}}>{details.question}</p>
                                                <div style={{ width : '150px', margin : 'auto'}}>
                                                {
                                                    (allPage[pageNum] == 1) 
                                                    ?   <input disabled={false} style={{width : '100px', marginLeft : 'auto', marginRight : 'auto'}} type="text" name={pageNum + "." + details.id} onChange={onChangeInputAnswer} value={inputAnswer[pageNum + "." + details.id]}/>
                                                    :   <div>
                                                            <input disabled={true} style={{width : '100px', marginLeft : 'auto', marginRight : 'auto'}} type="text" name={pageNum + "." + details.id} onChange={onChangeInputAnswer} value={inputAnswer[pageNum + "." + details.id]}/>
                                                            <span hidden={false} style={inputAnswer[pageNum + "." + details.id] === details.answer ? correctAnswer(pageNum + "." + details.id) : {color : 'red'}}>{"   " + details.answer}</span>
                                                        </div>
                                                }
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
            </div>
            <div style={{width : '300px', marginLeft : 'auto', marginRight : '100px'}}>
                {
                 (props.location.state.type === "theory") 
                 ? <div><Button size='lg' variant='light' onClick={prevPage} disabled={!prevButton}>Quay lại</Button>
                 { pageNum === allPage.length - 1 ? (allPage[pageNum] === 1 ? <Button size='lg' variant='info' onClick={checkAllAnswer}>Kiểm tra</Button> : <Link to={{pathname : '/learn', state : {topicId : props.location.state.topicId, lessonId : props.location.state.lessonId}}}><Button size='lg' variant='info' onClick={finishStudy}>Kết thúc</Button></Link> )
                     : <Button size='lg' variant='info' onClick={nextPage}>Tiếp tục</Button>}</div>
                 : <div><Button size='lg' variant='light' onClick={prevPage} disabled={!prevButton}>Quay lại</Button>
                 { pageNum === allPage.length - 1 ? (allPage[pageNum] === 1 ? <Button size='lg' variant='info' onClick={checkAllAnswer}>Kiểm tra</Button> : <Link to={{pathname : '/learn', state : {topicId : props.location.state.topicId, lessonId : props.location.state.lessonId}}}><Button size='lg' variant='info' onClick={finishStudy}>Kết thúc</Button></Link> )
                     : (allPage[pageNum] === 1 ? <Button size='lg' variant='info' onClick={checkAllAnswer}>Kiểm tra</Button> :  <Button size='lg' variant='info' onClick={nextPage}>Tiếp tục</Button>)}</div>
                }
                
            </div>
        </div>
    )
}

export default Study