import React, { useState, useEffect } from 'react';
import './App.css'; 

function App() {
    const [counter, setCounter] = useState(0);
    const [checkedCounter, setCheckedCounter] = useState(0);
    const [pictures, setPictures] = useState([]);

    useEffect(() => {
        createPictures();
    }, []);

    function createPictures() {
        const numbers = [...Array(9).keys()].map(x => x + 1);
        const double = numbers.concat(numbers);
        shuffleArray(double);

        const newPictures = double.map((number, index) => (
            <div key={index} className={`picture flipped-${number}`} onClick={handlePictureClick}></div>
        ));

        setPictures(newPictures);
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    
    function resetPictures() {
        setPictures(pictures.map(picture => {
            picture.props.className = picture.props.className.replace('clicked', '');
            return picture;
        }));
        setCounter(0);
    }
    
    function checkMatch() {
        const clickedPictures = pictures.filter(picture => picture.props.className.includes('clicked'));
        const first = clickedPictures[0].props.className.split(' ')[1];
        const second = clickedPictures[1].props.className.split(' ')[1];
    
        if (first === second) {
            setPictures(pictures.map(picture => {
                if (picture.props.className.includes('clicked')) {
                    picture.props.style = { opacity: 0, cursor: 'default' };
                }
                return picture;
            }));
            setCheckedCounter(prevCheckedCounter => prevCheckedCounter + clickedPictures.length);
            wonGame();
        }
    }
    
    function wonGame() {
        if (checkedCounter === 18) {
            const winMessage = <h1 className="win">You won!</h1>;
            setPictures([winMessage]);
            setCheckedCounter(0);
        }
    }

    function handlePictureClick(event) {
        const clickedPicture = event.target;
        
        if (counter < 2) {
            if (!clickedPicture.classList.contains('clicked')) {
                clickedPicture.classList.add('clicked');
                setCounter(prevCounter => prevCounter + 1);
            } else {
                clickedPicture.classList.remove('clicked');
                setCounter(prevCounter => prevCounter - 1);
            }
        } 
        
        if (counter === 2) {
            setTimeout(() => {
                checkMatch();
                resetPictures();
            }, 1500);
        }
    }

    return (
        <div className="content">
            <div className="sideBar">
                <div id="shuffleBtn">
                    <button onClick={createPictures}>Shuffle Cards</button>
                </div>
            </div>
            <div id="pictures" className="pictures">
                {pictures}
            </div>
        </div>
    );
}

export default App;
