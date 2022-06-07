import { useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

import './single.scss'
import Response from "../../components/response";
import ChangeTimestamp from "../../components/Timestamp";


const Singleview = () => {

    const id = useParams().questionId

    const [question, setQuestion] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [answerContent, setAnswerContent] = useState("")

    //post request for answers
    const handleSubmit = (event) => {
        event.preventDefault()
        
        const user = searchParams.get("id")

        //json object to post as body in the request
        const answer = {
            content: answerContent,
            verified: 0,
            question_id: id,
            account_id: user
        }

        console.log('json answer', answer)

        fetch("https://boss-info.herokuapp.com/api/answers", {
            method: "post",
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              "api-key": "nSY1oe7pw05ViSEapg09D4gHG87yJCTX67uDa1OO",
              "cache-control": "no-cache"
            },
            body: JSON.stringify(answer),
          })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setAnswerContent("")
                document.querySelector('#answer-input').value = ""
                getData()
            });   
    }

    //Get request for a single question with answers and comments
    async function getData() {
        fetch(`https://boss-info.herokuapp.com/api/questions/${id}`, {
        headers: {
            'api-key': 'nSY1oe7pw05ViSEapg09D4gHG87yJCTX67uDa1OO',
        }})
        .then((response) => response.json() )
        .then((data) => setQuestion(data))
    }

    useEffect(() => {
        getData()
    },[])

    const scrollToInput = () => {
        document.querySelector("#respond-wrapper").scrollIntoView({ behavior: 'smooth' })
        document.querySelector("#respond-wrapper input").focus({preventScroll: true})
    }

    if(question) {
        return (
            <>
            <div id="single-view-container">
            <button className="go_back_single"  onClick={() => history.back()}></button>
            <div id="single-content">
                <h1>{question.questions[0].title}</h1>
                <div id="profile-wrapper">
                <div className='circle-name'> <span>{question.questions[0].account.firstname.substring(0,1) + question.questions[0].account.lastname.substring(0,1)}</span></div>
                    <div>
                        <span className="profile-name">{`${question.questions[0].account.firstname} ${question.questions[0].account.lastname}`}</span>
                        <span className="time-stamp">{<ChangeTimestamp timestamp={question.questions[0].createdAt}></ChangeTimestamp>}</span>
                    </div>
                </div>
                <p id="question-content">{question.questions[0].content}</p>
                <div id="category-wrapper">
                    {question.questions[0].categories.map((cat) => {
                        return (
                            <span className='cat'>{cat.category}</span>
                        )
                    })}
                </div>
                <div id="flex-wrapper">
                    <span id="comment-amount">{question.questions[0].answers.length} svar</span>
                    <button className="secondaryButton" onClick={scrollToInput}>Besvar spørgsmål</button>
                </div>
                <hr className="devider"></hr>
                
                <div id="response-wrapper">
                    {question.questions[0].answers.map((answer) => {
                        console.log('what is answer', answer)
                        return (
                            <Response answer={answer} getData={getData}></Response>
                        )
                    })}
                </div>
                <form id="respond-wrapper" onSubmit={handleSubmit}>
                    <input id="answer-input" placeholder={`Skriv et svar til ${question.questions[0].account.firstname} ${question.questions[0].account.lastname}`} type="text" required onChange={event => setAnswerContent(event.target.value)}></input>
                    <div id="input_border"></div>
                    <button type="submit">➤</button>
                </form>
                

            </div>
            </div>
            </>
        )
    } else {
        return <p>loading</p>
    }
    

}

export default Singleview