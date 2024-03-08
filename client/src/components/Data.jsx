import React, {useEffect, useState} from 'react';

import st from 'ryscott-st';
import {ax} from 'util';

const Data = function() {
  const [data, setData] = useState(null);
  const [averages, setAverages] = useState({});
  const [mounted, setMounted] = useState(false);

  var handleData = function() {
    if (!data) {
      ax.getData(setData);
    } else {
      var avgs = {};

      data.results.map(function(entry) {
        for (var key in entry.totals) {
          if (key !== 'all') {
            if (!avgs[key]) {
              avgs[key] = {yes: 0, no: 0, unknown: 0};
            }

            avgs[key][entry.selfID.autism] += entry.totals[key];
          }
        }
      })

      for (var key in avgs) {
        for (var aut in avgs[key]) {
          var chk;

          switch(aut) {
            case 'yes':
              chk = data.infos[0].yAutism.count;
              break;
            case 'no':
              chk = data.infos[0].nAutism.count;
              break;
            case 'unknown':
              chk = data.infos[0].uAutism.count;
              break;
          }

          avgs[key][aut] = Math.floor(100*(avgs[key][aut]/chk))/100;
        }
      }

      setAverages(avgs);
      setMounted(true);
    }
  };

  var renderData = function() {
    return (
      <div className='data v'>
        <div className='dataInfo h'>version     <b>{data.infos[0].version}</b></div>
        <br/>
        <div className='dataInfo h'>submissions <b>{data.infos[0].resultCount}</b></div>
        <br/>
        <table>
          <tr>
            <th></th>
            <th className='tableRight'>#</th>
            <th className='tableRight'>avg.</th>
          </tr>
          <tr/>
          <tr className='tableRight'>
            <td style={{textAlign: 'left'}}>autism</td>
            <td>{data.infos[0].yAutism.count}</td>
            <td>{getAverage(data.infos[0].yAutism)}</td>
          </tr>
          <tr className='tableRight'>
            <td style={{textAlign: 'left'}}>no autism</td>
            <td>{data.infos[0].nAutism.count}</td>
            <td>{getAverage(data.infos[0].nAutism)}</td>
          </tr>
          <tr className='tableRight'>
            <td style={{textAlign: 'left'}}>unknown</td>
            <td>{data.infos[0].uAutism.count}</td>
            <td>{getAverage(data.infos[0].uAutism)}</td>
          </tr>
        </table>
        <br/>
        <table>
          <tr>
            <th></th>
            <th className='tableRight'>y</th>
            <th className='tableRight'>n</th>
            <th className='tableRight'>u</th>
          </tr>
          <tr/>
          {renderAverages()}
        </table>
      </div>
    )
  };

  var renderAverages = function() {
    var rendered = [];

    var renderRow = function(key) {
      let r = [];

      for (var aut in averages[key]) {
        r.push(
          <td key={key + aut} className='tableRight'>{averages[key][aut]}</td>
        )
      }

      return r;
    };

    for (var key in averages) {
      rendered.push(
        <tr key={key}>
          <td style={{textAlign: 'left'}}>{key}</td>
          {renderRow(key)}
        </tr>
      )

      if (key === 'a3') {
        rendered.push(<br key={'br'}/>);
      }
    }

    return rendered;
  };

  useEffect(handleData, [data]);

  if (!mounted) {return};

  return (
    <div className='dataContainer v'>
      <h2>data</h2>
      {data && renderData()}
    </div>
  );
};

var getAverage = function(info) {
  return Math.round(info.scoreTotals/info.count) || 0;
};

export default Data;

