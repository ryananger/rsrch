import React, {useEffect, useState} from 'react';
import {IoArrowForwardCircle as NextIcon,
        IoArrowBackCircle as BackIcon} from 'react-icons/io5';

import st from 'ryscott-st';

const Question = function({question, answer, index}) {
  const [option, setOption] = useState(answer);

  var mountOption = function() {
    setOption(answer);
  };

  var handleOption = function(num) {
    var newAnswers = {...st.answers};

    newAnswers[question.section][question.num] = num;

    st.setAnswers(newAnswers);
    setOption(num);

    if (index < st.questions.length - 1) {
      setTimeout(handleNext, 500);
    }
  };

  var handleNext = function() {
    st.setIndex(index + 1);
  };

  var handleSubmit = function() {
    st.setView('results');
  };

  var answersComplete = function() {
    var done = true;

    for (var key in st.answers) {
      st.answers[key].map(function(entry) {
        if (entry === -1) {
          done = false;
        }
      })
    }

    return done;
  };

  var renderProgress = function() {
    var rendered = [];

    for (var i = 0; i < st.questions.length; i++) {
      var cur = i === index;
      var answered = st.answers[st.questions[i].section][st.questions[i].num] !== -1;
      let style;
      let num = i;

      if (answered && !cur) {
        style = {backgroundColor: '#3b5f8038'};
      } else if (cur) {
        style = {backgroundColor: 'var(--color1)'};
      }

      rendered.push(<div key={'progress_' + i} className='h c' style={{width: '4%', cursor: 'pointer'}} onClick={()=>{st.setIndex(num)}}><div className='progressCircle grow' style={style}/></div>);
    }

    return rendered;
  };

  var renderButton = function() {
    if (index < st.questions.length - 1) {
      return <NextIcon className='button' size={40} onClick={handleNext}/>;
    }

    if (st.submitted) {
      return <NextIcon className='button' size={40} onClick={()=>{st.setView('results')}}/>;
    }

    if (answersComplete()) {
      return <div className='submitButton v' onClick={handleSubmit}>SUBMIT!</div>;
    }

    return <div/>;
  };

  useEffect(mountOption, [index]);

  return (
    <div className='question v'>
      <div className='progress h'>{renderProgress()}</div>
      <div className='questionBody v'>
        <div className='questionText v'>
          {question.text}
        </div>
        <div className='radialButtons h'>
          <div className='anchor h c'><div className={`radialButton v grow ${option === 1 ? 'radialOn' : ''}`} onClick={()=>{handleOption(1)}}/><small className='optionTag'>disagree</small></div>
          <div className={`radialButton v rSmall grow ${option === 2 ? 'radialOn' : ''}`} onClick={()=>{handleOption(2)}}/>
          <div className='anchor h c'><div className={`radialButton v grow ${option === 3 ? 'radialOn' : ''}`} onClick={()=>{handleOption(3)}}/><small className='optionTag'>neutral</small></div>
          <div className={`radialButton v rSmall grow ${option === 4 ? 'radialOn' : ''}`} onClick={()=>{handleOption(4)}}/>
          <div className='anchor h c'><div className={`radialButton v grow ${option === 5 ? 'radialOn' : ''}`} onClick={()=>{handleOption(5)}}/><small className='optionTag'>agree</small></div>
        </div>
      </div>
      <div className='buttons h'>
        {index > 0 ? <BackIcon className='button' size={40} onClick={()=>{st.setIndex(index - 1)}}/> : <div/>}
        {renderButton()}
      </div>
    </div>
  );
};

export default Question;

