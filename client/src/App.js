import {Component} from 'inferno';
import './registerServiceWorker';
import Logo from './logo';
import './App.css';
import {initDevTools} from 'inferno-devtools';
import algoliasearch from 'algoliasearch';
import algoliasearchHelper from 'algoliasearch-helper';
import * as $ from 'jquery';
var client = algoliasearch('72IDPMKWKA', 'bbedffb18bcdaf7ea43a1db0bcbc7868');
var helper = algoliasearchHelper(client, 'apps');
initDevTools();

function renderHits(content) {
  $('#container').html(function() {
    return $.map(content.hits, function(hit) {
      return '<li>' + hit.name + '</li>';
    });
  });
}

class App extends Component {

  componentDidMount() {    
    helper.on('result', function(content) {
      renderHits(content);
    });

    $('#search-box').on('keyup', function() {
      helper.setQuery($(this).val())
            .search();
    });

    helper.search();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Logo width="80" height="80" />
          <h1>Quick Search</h1>
        </header>
        <p className="App-intro">
          <input type="text" autocomplete="off" id="search-box"/>
          <div id="container"></div>
        </p>
      </div>
    );
  }
}

export default App;
