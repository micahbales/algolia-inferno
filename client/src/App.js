import {Component} from 'inferno';
import './registerServiceWorker';
import Logo from './Logo';
import './App.css';
import {initDevTools} from 'inferno-devtools';
import algoliasearch from 'algoliasearch';
import algoliasearchHelper from 'algoliasearch-helper';
import * as $ from 'jquery';
var client = algoliasearch('72IDPMKWKA', 'bbedffb18bcdaf7ea43a1db0bcbc7868');
var helper = algoliasearchHelper(client, 'apps', {
  facets: ['category']
});
initDevTools();

function renderHits(content) {
  renderFacetList(content);
  $('#container').html(function() {
    return $.map(content.hits, function(hit) {
      return '<li>' + hit.name + '</li>';
    });
  });
}

function renderFacetList(content) {
  $('#facet-list').html(function() {
    return $.map(content.getFacetValues('category'), function(facet) {
      var checkbox = $('<input type=checkbox>')
        .data('facet', facet.name)
        .attr('id', 'fl-' + facet.name);
      if(facet.isRefined) checkbox.attr('checked', 'checked');
      var label = $('<label>').html(facet.name + ' (' + facet.count + ')')
                              .attr('for', 'fl-' + facet.name);
      return $('<li>').append(checkbox).append(label);
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

    $('#facet-list').on('click', 'input[type=checkbox]', function(e) {
      var facetValue = $(this).data('facet');
      helper.toggleFacetRefinement('category', facetValue)
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
          <input type="text" autocomplete="off" id="search-box" 
              placeholder="Enter your query here"/>
        </header>
        <div className="App-intro row">
          <div className="col-12 col-sm-5 offset-sm-1">
            <div id="facet-list"></div>
          </div>

          <div className="col-12 col-sm-5 ">
            <div id="container"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
