import React from 'react';
import { useState, useEffect } from 'react';

import SortSlider from '../../components/SortSlider';
import Popup from '../../components/Popup'
import WarningPopup from '../../components/WarningPopup'
import InforPopup from '../../components/InfoPopup'
import Question from '../../components/Question'
import './style.scss'

const Forum = () => {

    const [categories, setCategories] = useState(null)
    const [sort, setSort] = useState("newest")
    const [questions, setQuestions] = useState(null)
    const [admin, setAdmin] = useState(true)

    //Async funtion to fetch the data from the api
    async function getQuestionData() {
        fetch('https://boss-info.herokuapp.com/api/questions', {
        headers: {
            'api-key': 'nSY1oe7pw05ViSEapg09D4gHG87yJCTX67uDa1OO',
        }})
        .then((response) => response.json() )
        .then((data) => setQuestions(data))
    }

    //function wrapped in use effect
    useEffect(() => {
        getQuestionData()
    },[])


    //get request for the categories
    useEffect(() => {
        fetch('https://boss-info.herokuapp.com/api/categories', {
        headers: {
            'api-key': 'nSY1oe7pw05ViSEapg09D4gHG87yJCTX67uDa1OO',
        }})
        .then((response) => response.json() )
        .then((data) => setCategories(data))
    },[])



    let [filterQuestions, setFilteredQuestions] = useState([])
    let [modal, setModal] = useState(false)
    let [filter, setFilter] = useState(false)


    //Filtering the posts
    const showFilter = (cat, fil_q) => {
        filterQuestion(fil_q, cat.category);
    }
    
    const filterQuestion = (fil_q, filter) => {
        if (fil_q.includes(filter)) {
            setFilteredQuestions(fil_q.filter(item => item !== filter))
        } else {
            setFilteredQuestions([...fil_q, filter]);
        }
    }

   
    const resetCategories = () => {
        setFilteredQuestions([])
        document.querySelectorAll(".category_checkbox").forEach(checkbox =>{
            checkbox.checked = false;
        })
    }
      
    //toggle the modal
    const toggleModal = () => {
        document.body.classList.add('no-scroll');
        setModal(true)
    }

    //toggle filter on mobile
    const toggleFilter = () => {
        if(filter == false) {
        setFilter(true)
        document.body.classList.add('no-scroll');
        } else{
            setFilter(false)
            document.body.classList.remove('no-scroll');
        }
    }

    const handleChange = () => {

    }


    if (categories) {
        if (admin == true) {
            return (
                <>
                <Popup modal={modal} setModal={setModal} getQuestionData={getQuestionData}/>
                <WarningPopup header='Er du sikker på du vil slette' warning='Slettede spørgsmål er ikke længere synlige for brugere på siden' primButton='Slet' secButton='Cancel' ></WarningPopup>
                    <div id='top-section'>
                        <SortSlider setSort={setSort}/>
                        <img onClick={toggleFilter} id="filter_icon" src='./filter_icon-25.svg'></img>
    
                        <button onClick={toggleModal} className='new-question-button'>Nyt spørgsmål</button>
                    </div>
                    
                
                    <div className={filter == true ? 'side-menu active' : 'side-menu unactive'}>
                        <button onClick={toggleFilter}></button>
                        <div id='categories'>
                            <SortSlider setSort={setSort}/>
                            <div className='delete-check-wrapper'>
                                <input type='checkbox' id='delete-check' className="delete-check" name='delete-check' value='deleted' onChange={handleChange}></input>
                                <label className="delete-check-label" for='delete-check'>Vis slettede</label>
                            </div>
                            <h3>Filtrer</h3>
                            {categories.categories.map((cat) => {
                                // console.log("categories here", categories)
                                return (
                                    <div className="category_wrapper">
                                        <input type="checkbox" onClick={() => showFilter(cat, filterQuestions)} id={cat.id} className="category_checkbox" value={cat.category}/>
                                        <label className="category_label" for={cat.id}>{cat.category}</label>
                                    </div>
    
                                )
                            })}
                            <p onClick={resetCategories} id='reset_button'>Nulstil</p>
                        </div>
                    </div>
                    <Question questions={questions} sort={sort} filterQuestions={filterQuestions} admin={admin}></Question>
                </>
            )
        } else {
            return (
                <>
                <Popup modal={modal} setModal={setModal} getQuestionData={getQuestionData}/>
                
                
                    <div id='top-section'>
                        <SortSlider setSort={setSort}/>
                        <img onClick={toggleFilter} id="filter_icon" src='./filter_icon-25.svg'></img>
    
                        <button onClick={toggleModal} className='new-question-button'>Nyt spørgsmål</button>
                    </div>
                    
                
                    <div className={filter == true ? 'side-menu active' : 'side-menu unactive'}>
                        <button onClick={toggleFilter}></button>
                        <div id='categories'>
                            <SortSlider setSort={setSort}/>
                            <h3>Filtrer</h3>
                            {categories.categories.map((cat) => {
                                // console.log("categories here", categories)
                                return (
                                    <div className="category_wrapper">
                                        <input type="checkbox" onClick={() => showFilter(cat, filterQuestions)} id={cat.id} className="category_checkbox" value={cat.category}/>
                                        <label className="category_label" for={cat.id}>{cat.category}</label>
                                    </div>
    
                                )
                            })}
                            <p onClick={resetCategories} id='reset_button'>Nulstil</p>
                        </div>
                    </div>
                    <Question questions={questions} sort={sort} filterQuestions={filterQuestions} admin={admin}></Question>
                </>
            ) 
        }
    } else {
        return <span>Loading</span>
    }
      
    
}

export default Forum