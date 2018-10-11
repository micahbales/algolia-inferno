import {Component} from 'inferno';
import './registerServiceWorker';
import Logo from './logo';
import './App.css';
import {initDevTools} from 'inferno-devtools';
import algoliasearch from 'algoliasearch';
import algoliasearchHelper from 'algoliasearch-helper';
import FacetList from './FacetList';
import SearchItem from './SearchItem';
var client = algoliasearch('72IDPMKWKA', 'bbedffb18bcdaf7ea43a1db0bcbc7868');
var helper = algoliasearchHelper(client, 'apps', {
  facets: ['category']
});
initDevTools();


class App extends Component {

  componentDidMount() {    
    helper.on('result', (content) => {
      this.setState({
        content: content,
        hits: content.hits
      });
    });
    helper.search();
  }

  constructor(props) {
    super(props);
    this.state = {
      content: {},
      hits: []
    };
  }

  handleSearchInput(e) {
    helper.setQuery(e.target.value)
            .search();
  }

  handleFacetClick(e) {
    const facetValue = e.currentTarget.value;
    helper.toggleFacetRefinement('category', facetValue)
        .search();
  }

  render() {
    return (
      <div className="App">
        <header className="app-header">
        <Logo width="100" height="100" />
          <input type="text" autocomplete="off" id="search-box" 
              placeholder="Search for apps" onKeyUp={this.handleSearchInput} className="search-box" />
        </header>
        <div className="row">
          
          <div className="facet-list col-12 col-sm-4">
            <FacetList 
              content={this.state.content}
              hits={this.state.hits}
              handleFacetClick={this.handleFacetClick}
            />
          </div>

          <div className="col-12 col-sm-8 items-container">
            {
              this.state.hits ? this.state.hits.map((app) => (
                  <div className="col-4">
                    <SearchItem 
                      name={app.name}
                      image={app.image}
                      link={app.link}
                      rank={app.rank}
                    />
                  </div>
                )
              ) : ''
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
