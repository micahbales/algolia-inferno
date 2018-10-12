import {Component} from 'inferno';
import './registerServiceWorker';
import './App.css';
import {initDevTools} from 'inferno-devtools';
import algoliasearch from 'algoliasearch';
import algoliasearchHelper from 'algoliasearch-helper';
import FacetList from './components/FacetList';
import SearchItem from './components/SearchItem';
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
      hits: [],
      orderButton: {
        text: 'ASC',
        status: 'desc'
      }
    };

    this.handleOrderButtonClick = this.handleOrderButtonClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
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

  handleOrderButtonClick() {
    let state = Object.assign({}, this.state);
    if (state.orderButton.status === 'desc') {
      state.orderButton.status = 'asc';
      state.orderButton.text = 'DESC';
    } else {
      state.orderButton.status = 'desc';
      state.orderButton.text = 'ASC';
    }
    state.hits.reverse();
    this.setState(state);
  }

  handleDeleteClick(e) {
    const id = e.currentTarget.parentElement.id;
    // Send delete request to API
    fetch(`/api/1/apps/${id}`, {
      method: 'delete'
    }).then((res) => {
      // Update client state
      let state = Object.assign({}, this.state);
      state.hits = this.state.hits.filter((app) => app._id !== id);
      this.setState(state);
    });
  }

  render() {
    return (
      <div className="app">
        <header className="app-header">
          <input type="text" autocomplete="off" id="search-box" 
              placeholder="Search for apps" onKeyUp={this.handleSearchInput} 
              className="search-box" />
        </header>
        <div className="app-body">
          
          <div className="facet-list">
            <FacetList 
              content={this.state.content}
              hits={this.state.hits}
              handleFacetClick={this.handleFacetClick}
              handleDeleteClick={this.handleDeleteClick}
            />
            <button className="order-button" onClick={this.handleOrderButtonClick}>
                Results Order: {this.state.orderButton.text}
            </button>
          </div>

          <div className="items-container">
            {
              this.state.hits ? this.state.hits.map((app) => (
                  <SearchItem 
                    app={app}
                    handleDeleteClick={this.handleDeleteClick}
                  />
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
