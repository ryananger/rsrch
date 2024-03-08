import React, {useEffect, useState} from 'react';
import {IoArrowForwardCircle as NextIcon,
        IoArrowBackCircle as BackIcon} from 'react-icons/io5';

import st from 'ryscott-st';
import q from './questions2.js';

const Intro = function() {
  const [option, setOption] = useState(null);
  const [view, setView] = useState('autism');
  const [cms, setCms] = useState({
    'OCD': false,
    'BPD': false,
    'NPD': false,
    'ADHD': false,
    'Bipolar Disorder': false,
    'Eating Disorder': false,
    'Anxiety/Depression': false
  });

  var renderComorbid = function() {
    var rendered = [];

    for (let key in cms) {
      let value = cms[key];
      let tag = value === true ? 'comorbidOn' : '';

      let onClick = function(entry) {
        var updated = {...cms};

        updated[key] = !value;

        setCms(updated);
      }

      rendered.push(
        <div key={key} className={'comorbid ' + tag} onClick={onClick}>{key}</div>
      )
    }

    return rendered;
  };

  const views = {
    autism: (
      <div className='selfIDButtons v'>
        <div className='selfIDoption h' onClick={()=>{handleOption(1)}}><div className={`radialButton v grow ${option === 1 ? 'radialOn' : ''}`}/><small>I am autistic.</small></div>
        <div className='selfIDoption h' onClick={()=>{handleOption(2)}}><div className={`radialButton v grow ${option === 2 ? 'radialOn' : ''}`}/><small>I am not autistic.</small></div>
        <div className='selfIDoption h' onClick={()=>{handleOption(3)}}><div className={`radialButton v grow ${option === 3 ? 'radialOn' : ''}`}/><small>I don't know if I'm autistic.</small></div>
      </div>
    ),
    comorbid: (
      <div className='comorbids v'>
        <small>I have received a diagnosis for:</small>
        <div className='comorbidButtons h'>
          {renderComorbid()}
        </div>

        <small style={{fontSize: '12px'}}>(select all that apply)</small>
      </div>
    )
  };

  var handleOption = function(num) {
    setOption(num);
  };

  var handleComorbids = function() {
    var str = '';

    switch (option) {
      case 1:
        str = 'yes';
        break;
      case 2:
        str = 'no';
        break;
      case 3:
        str = 'unknown';
        break;
    }

    st.setSelfID({autism: str, comorbid: cms});
    st.setView('question');
  };

  return (
    <div className='question v'>
      <div className='buttons'/>
      {views[view]}
      <div className='buttons h'>
        {view === 'comorbid' ? <BackIcon className='button' size={40} onClick={()=>{setView('autism')}}/> : <div/>}
        {view === 'autism' && option && <NextIcon className='button' size={40} onClick={()=>{setView('comorbid')}}/>}
        {view === 'autism' && !option && <NextIcon className='button disabled' size={40}/>}
        {view === 'comorbid' && <NextIcon className='button' size={40} onClick={handleComorbids}/>}
      </div>
    </div>
  );
};

export default Intro;

