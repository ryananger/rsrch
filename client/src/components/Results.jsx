import React, {useEffect, useState} from 'react';
import {IoArrowForwardCircle as NextIcon,
        IoArrowBackCircle as BackIcon} from 'react-icons/io5';

import st from 'ryscott-st';
import {ax} from 'util';
import q from './questions2.js';

const Results = function(props) {
  const results = props.results;
  const totals = function() {
    var totals = {
      all: 0
    };

    for (var key in results) {
      results[key].map(function(entry, i) {
        if (!totals[key]) {
          totals[key] = 0;
        }

        if (negatives[key].includes(i)) {
          totals.all += 6 - entry;
          totals[key] += 6 - entry;
        } else {
          totals.all += entry;
          totals[key] += entry;
        }
      })
    }

    return totals;
  }();

  var renderResults = function() {
    var rendered = [];

    for (var key in results) {
      rendered.push(
        <div key={key} className='result h'><div><b>{key.toUpperCase()}.</b> {labels[key]}</div><b>{totals[key]}</b></div>
      )
    }

    rendered.push(
      <div key={'total'} className='result total h'><b></b><b>{totals.all}</b></div>
    )

    return rendered;
  };

  var renderScores = function() {
    var y = st.testData ? getAverage(st.testData.yAutism) : '';
    var n = st.testData ? getAverage(st.testData.nAutism) : '';
    var r = st.testData ? st.testData.resultCount : 0;

    return (
      <div className='averageScores v'>
        <div className='averageScore h'>Average* for autistic people: <b>{y}</b></div>
        <div className='averageScore h'>Average* for non-autistic people: <b>{n}</b></div>
        <small className='averageScore h' style={{marginTop: '1vh'}}>*based on {r} submissions.</small>
      </div>
    )
  };

  var getAverage = function(info) {
    return Math.round(info.scoreTotals/info.count) || 0;
  };

  useEffect(()=>{
    if (!st.submitted) {
      ax.addResult({
        answers: st.answers,
        totals: totals,
        selfID: st.selfID
      })

      st.setSubmitted(true);
    }
  }, []);

  return (
    <div className='resultsContainer v'>
      <h2>RESULTS</h2>
      <div className='results v'>
        {renderResults()}
      </div>
      {renderScores()}
      <small className='info v'>
        This test is still in development. These results should not be considered evidence for or against an autism diagnosis.
        <br/><br/>
        If you are interested in a proven test, please take the RAADS-R test.
        <a href='https://embrace-autism.com/raads-r/' style={{marginTop: '2vh'}}>RAADS-R at Embrace Autism</a>
      </small>
      <div className='buttons h'>
        <BackIcon className='button' size={40} onClick={()=>{st.setView('question')}}/>
      </div>
    </div>
  );
};

const labels = {
  a1: 'Social-Emotional Reciprocity',
  a2: 'Non-Verbal Communication',
  a3: 'Relationship Maintenance',
  b1: 'Repetitive Physical Behavior',
  b2: 'Insistence on Routine',
  b3: 'Restricted Interests',
  b4: 'Atypical Physical Sensitivity'
};

const negatives = {
  a1: [0, 2],
  a2: [1, 2],
  a3: [1],
  b1: [],
  b2: [0, 1],
  b3: [],
  b4: []
};

export default Results;

