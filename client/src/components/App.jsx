import React, {useEffect, useState} from 'react';
import {IoArrowForwardCircle as NextIcon,
        IoArrowBackCircle as BackIcon} from 'react-icons/io5';

import 'styles';
import st from 'ryscott-st';
import {ax} from 'util';

import Intro from './Intro.jsx';
import Question from './Question.jsx';
import Results from './Results.jsx';
import Data from './Data.jsx';
import q from './questions2.js';

const route = window.location.href.split('/')[3];

const App = function() {
  const [view, setView]           = st.newState('view', useState('intro'));
  const [answers, setAnswers]     = st.newState('answers', useState({}));
  const [selfID, setSelfID]       = st.newState('selfID', useState(null));
  const [questions, setQuestions] = st.newState('questions', useState([]));
  const [index, setIndex]         = st.newState('index', useState(0));
  const [submitted, setSubmitted] = st.newState('submitted', useState(false));

  const [testData, setTestData]   = st.newState('testData', useState(null));

  var handleQuestions = function() {
    var newAnswers = {};
    var allQuestions = [];
    var newQuestions = [];

    for (var key in q) {
      newAnswers[key] = [-1, -1, -1];

      q[key].map(function(entry, i) {
        allQuestions.push({section: key, num: i, text: entry});
      })
    }

    while (newQuestions.length < 21) {
      var num = rand(allQuestions.length);

      var front = allQuestions.slice(0, num);
      var back  = allQuestions.slice(num + 1);
      var entry = allQuestions[num];

      allQuestions = front.concat(back);

      newQuestions.push(entry);
    }

    setQuestions(newQuestions);
    setAnswers(newAnswers);
  };

  var handleRoute = function() {
    if (route === 'data') {
      return <Data />;
    } else {
      return (
        <>
          {view === 'intro' && <Intro />}
          {view === 'question' && questions[0] && <Question question={questions[index]} index={index} answer={answers[questions[index].section][questions[index].num]}/>}
          {view === 'results' && <Results results={answers}/>}
        </>
      )
    }
  };

  useEffect(handleQuestions, []);
  useEffect(()=>{}, [answers]);

  return (
    <div className='app v'>
      {handleRoute()}
    </div>
  );
};

var rand = function(num) {
  return Math.floor(Math.random()*num);
};

export default App;

