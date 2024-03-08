import axios from 'axios';
import st    from 'ryscott-st';
import {helpers} from 'util';

var urlBase = process.env.URL;

var ax = {
  addResult: function(result) {
    axios.post(process.env.URL + 'api/results', result)
      .then(function(response) {
        console.log(response.data);

        st.setTestData(response.data.info);
      })
  },
  getData: function(set) {
    axios.get(process.env.URL + 'api/data')
      .then(function(response) {
        set(response.data);
      })
  }
};

export default ax;
