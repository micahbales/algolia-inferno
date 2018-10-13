import {Component} from 'inferno';
import './registerServiceWorker';
import './App.css';
import {initDevTools} from 'inferno-devtools';
import algoliasearch from 'algoliasearch';
import algoliasearchHelper from 'algoliasearch-helper';
import FacetList from './components/FacetList';
import SearchItem from './components/SearchItem';
import CreateAppModal from './components/CreateAppModal';
var client = algoliasearch('72IDPMKWKA', 'bbedffb18bcdaf7ea43a1db0bcbc7868');
var helper = algoliasearchHelper(client, 'apps', {
  facets: ['category']
});
initDevTools();


class App extends Component {

  componentDidMount() {
    helper.on('result', (content) => {
      this.setState({
        content: content
      });
    });
    helper.search();
  }

  constructor(props) {
    super(props);
    this.state = {
      content: {},
      orderButton: {
        text: 'ASC',
        status: 'desc'
      }
    };

    this.handleOrderButtonClick = this.handleOrderButtonClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleCreateAppClick = this.handleCreateAppClick.bind(this);
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
    state.content.hits.reverse();
    this.setState(state);
  }

  handleCreateAppClick() {
    const postBody = {
        name: document.querySelector('.create-app-modal #name').value,
        image: document.querySelector('.create-app-modal #image').value,
        link: document.querySelector('.create-app-modal #link').value,
        category: document.querySelector('.create-app-modal #category').value,
        rank: Number(document.querySelector('.create-app-modal #rank').value)
    }

    fetch(`/api/1/apps`, {
        method: 'post',
        headers: {"Content-Type": "application/json; charset=utf-8"},
        body: JSON.stringify(postBody)
      }).then((res) => {
        return res.json();
      }).then((data) => {
        postBody._id = data._id;
        let state = Object.assign({}, this.state);
        // Add/update category
        const categoryFacet = state.content.facets.find((f) => f.name === 'category');
        const categoryAlreadyExists = categoryFacet.data[postBody.category];
        if (categoryAlreadyExists) {
          categoryFacet.data[postBody.category] += 1;
        } else {
          categoryFacet.data[postBody.category] = 1;
        }
        this.setState(state);
        this.handleModalClose();
      });
}

  handleDeleteClick(e) {
    const objectID = e.currentTarget.parentElement.id;
    const category = e.currentTarget.parentElement.getAttribute('category');
    console.log(category);
    // Send delete request to API
    fetch(`/api/1/apps/${objectID}`, {
      method: 'delete'
    }).then((res) => {
      // Update client state
      let state = Object.assign({}, this.state);
      // Remove/update category
      const categoryFacet = state.content.facets.find((f) => f.name === 'category');
      const categoryValue = categoryFacet.data[category];
      if (categoryValue > 1) {
        categoryFacet.data[category] -= 1;
      } else {
        helper.toggleFacetRefinement('category', category)
            .search();
        delete categoryFacet.data[category];
      }
      // Update hits
      state.content.hits = this.state.content.hits
          .filter((app) => app.objectID !== objectID);
      this.setState(state);
    });
  }

  handleModalOpen() {
    document.querySelector('.modal.create-app-modal')
        .classList.remove('hidden');
  }

  handleModalClose() {
    document.querySelector('.modal.create-app-modal')
        .classList.add('hidden');
    document.querySelectorAll('.create-app-modal input')
        .forEach((input) => {
          input.value = null;
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
          <CreateAppModal 
            handleCreateAppClick={this.handleCreateAppClick}
            handleModalClose={this.handleModalClose}
          />
          <div className="facet-list">
            <FacetList 
              content={this.state.content}
              hits={this.state.content.hits}
              handleFacetClick={this.handleFacetClick}
              handleDeleteClick={this.handleDeleteClick}
            />
            <button className="order-button" onClick={this.handleOrderButtonClick}>
                Results Order: {this.state.orderButton.text}
            </button>
            <button className="button open-modal-button" onClick={this.handleModalOpen}>
                Add New App
            </button>
          </div>

          <div className="items-container">
            {
              this.state.content.hits ? this.state.content.hits.map((app) => (
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
