import {Button, ProgressBar, Spinner} from 'react-bootstrap'
import {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import { apiUrl } from '../contexts/constants'

const ExStudy = (props) => {
    const [pageNum, setPageNum] = useState(0)
    const [finalPage, setFinalPage] = useState(false)
    const [isBusy, setBusy] = useState(true)
    const [datas, setDatas] = useState([])
    const [selectedOption, setSelectedOption] = useState()
    const [checkResult, setCheckResult] = useState(true)
    const [showResult, setShowResult] = useState(false)
    const [isCorrect, setIsCorrect] = useState(false)
    const score = useRef(0)
    const audio = useRef()

    const handleChange = event => {
        setSelectedOption(event.target.value)
    }

    const nextPage = () => {
        setPageNum(pageNum + 1)
        setShowResult(false)
        setCheckResult(true)
        setSelectedOption()
        if(datas[pageNum].type == "listeningNoImg" || datas[pageNum].type == "listeningImg") {
            audio.current.pause();
            audio.current.load();
        }
        
    }

    const checkAnswer = () => {
        if (selectedOption === datas[pageNum].content[0].answer){
            score.current = score.current + 10;
            setIsCorrect(true)
            setShowResult(true)
        } else {
            setIsCorrect(false)
            setShowResult(true)
        }
        setCheckResult(false);
    }

    const finish = () => {

    }

    useEffect(() => {
        const getSlide = async () => {
            try {
                const res = await axios.post(`${apiUrl}/api/auth/getLessonSlide`, {exTopicId : props.location.state.exTopicId, exLessonId : props.location.state.exLessonId})
                setDatas(res.data)

                setBusy(false)
            } catch (error) {
                console.log(error.message)
            }
        }

        getSlide();
    }, [])

    if (isBusy) 
    return (
        <div className='spinner-container'>
            <Spinner animation='border' variant='info'/>
        </div>
    ); else return (
        <div>
            <div style={{width : 1000, marginRight : 'auto', marginLeft : 'auto'}}>
                <br/>
                <ProgressBar animated min={0} max={datas.length} now={datas[pageNum].exSlideId}/>
                <br/>
            </div>
            <div style={{width : 1000, height : 450, margin : 'auto', justifyContent: 'center', alignContent : 'center'}}>
                {(datas[pageNum].type === 'listeningImg' || datas[pageNum].type === 'listeningNoImg') && datas[pageNum].content.map(contents => (
                    <div>
                        <h3 style={{textAlign : 'center'}}>{contents.question}</h3>
                        <div style={{border : '1px solid black'}}>
                            {(datas[pageNum].type === 'listeningImg') ? <img style={{width : '400px', height : '250px', marginLeft : 'auto', marginRight : 'auto', display : 'block'}} src={contents.img}/> : null}
                            <audio ref={audio} controls style={{marginRight : 'auto', marginLeft : 'auto', display : 'block'}} >
                                <source src={contents.audio} type="audio/mpeg"/>
                            </audio>
                        </div>
                        <form style={{border : '1px solid black'}}>
                            <div className="form-check" style={{marginRight : 'auto', marginLeft : 'auto'}}>
                                <label>
                                    <input className="form-check-input" type="radio" value={contents.choice1} name={contents.choice1} checked={selectedOption === contents.choice1} onChange={handleChange} disabled={!checkResult}/>{contents.choice1}
                                </label>
                                <br/>
                                <label>
                                    <input className="form-check-input" type="radio" value={contents.choice2} name={contents.choice2} checked={selectedOption === contents.choice2} onChange={handleChange} disabled={!checkResult}/>{contents.choice2}
                                </label>
                                <br/>
                                <label>
                                    <input className="form-check-input" type="radio" value={contents.choice3} name={contents.choice3} checked={selectedOption === contents.choice3} onChange={handleChange} disabled={!checkResult}/>{contents.choice3}
                                </label>
                                <br/>
                                {
                                    (datas[pageNum].type === 'listeningImg')
                                    ?
                                    <label>
                                        <input className="form-check-input" type="radio" value={contents.choice4} name={contents.choice4} checked={selectedOption === contents.choice4} onChange={handleChange} disabled={!checkResult}/>{contents.choice4}
                                    </label>
                                    : null
                                }
                                
                            </div>
                        </form>
                    </div>
                ))}
                {(datas[pageNum].type === 'readingImg' || datas[pageNum].type === 'readingNoImg') && datas[pageNum].content.map(contents => (
                    <div>
                        <h3 style={{textAlign : 'center'}}>{contents.title}</h3>
                        <div style={{border : '1px solid black'}}>
                            {(datas[pageNum].type === 'listeningImg') ? <img style={{width : '400px', height : '250px', marginLeft : 'auto', marginRight : 'auto', display : 'block'}} src={contents.img}/> : null}
                        </div>
                        <p style={{textAlign : 'center'}}>{contents.question}</p>
                        <form style={{border : '1px solid black'}}>
                            <div className="form-check" style={{marginRight : 'auto', marginLeft : 'auto'}}>
                                <label>
                                    <input className="form-check-input" type="radio" value={contents.choice1} name={contents.choice1} checked={selectedOption === contents.choice1} onChange={handleChange} disabled={!checkResult}/>{contents.choice1}
                                </label>
                                <br/>
                                <label>
                                    <input className="form-check-input" type="radio" value={contents.choice2} name={contents.choice2} checked={selectedOption === contents.choice2} onChange={handleChange} disabled={!checkResult}/>{contents.choice2}
                                </label>
                                <br/>
                                <label>
                                    <input className="form-check-input" type="radio" value={contents.choice3} name={contents.choice3} checked={selectedOption === contents.choice3} onChange={handleChange} disabled={!checkResult}/>{contents.choice3}
                                </label>
                                <br/>
                                <label>
                                    <input className="form-check-input" type="radio" value={contents.choice4} name={contents.choice4} checked={selectedOption === contents.choice4} onChange={handleChange} disabled={!checkResult}/>{contents.choice4}
                                </label>                                
                            </div>
                        </form>
                    </div>
                ))}
            </div>
            <br/>
            <div style={{width : '300px', marginLeft : 'auto', marginRight : '100px'}}>
                {
                    (checkResult === true)
                    ? <div><Button size='lg' variant='info' onClick={checkAnswer}>Kiểm tra</Button></div>
                    : (
                        (pageNum === datas.length -1) 
                        ? <div><Button size='lg' variant='info' onClick={finish}>Kết thúc</Button></div>
                        : <div><Button size='lg' variant='info' onClick={nextPage}>Tiếp tục</Button></div>
                    )   
                }
            </div>
            <div>
                { 
                    showResult
                    ? (
                        isCorrect
                        ? <div style={{backgroundColor : 'green'}}>Chính xác</div>
                        : <div style={{backgroundColor : 'blue'}}>Đáp án đúng là {datas[pageNum].content[0].answer}</div>
                    ) 
                    : null
                }
            </div>
        </div>
    )

}

export default ExStudy