import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

const Component = React.Component

class App extends Component {
  constructor(props) {
    super(props)
    console.log('ReactDOM',ReactDOM)
    this.state = {
      username: 'maninder-saroye',
      realName: '',
      avatar: '',
      location: '',
      repos: '',
      followers: '',
      url: '',
      notFound: ''
    }
  }
  componentDidMount(){
    console.log('ReactDOM')
  }
  render() {
    return (
      <div className="Search GitHub Users">
        <div className="title">Search GitHub Users</div>
        <SearchBox fetchUser={this.fetchUser.bind(this)}/>
        <Card data={this.state} />
      </div>
    )
  }
  
  // the api request function
  fetchApi(url) { 
    
    fetch(url)
      .then((res) => res.json() )
      .then((data) => {
        
        // update state with API data
        this.setState({
          username: data.login,
          realName: data.name,
          avatar: data.avatar_url,
          location: data.location,
          repos: data.public_repos,
          followers: data.followers,
          url: data.html_url,
          notFound: data.message
        })
      })
      .catch(() => console.log('oh no!') )
  }
  
  fetchUser(username) {
    let url = `https://api.github.com/users/${username}`
    this.fetchApi(url)
  }
  
  componentDidMount() {
    let url = `https://api.github.com/users/${this.state.username}`
    this.fetchApi(url)
  }
}

class SearchBox extends Component {
  render() {
    return (
      <form 
        className="searchbox" 
        onSubmit={this.handleClick.bind(this)}>
        <input
          ref= "search"
          className="searchbox__input" 
          type="text" 
          placeholder="type username..."/>
        
        <input
          type="submit"
          className="searchbox__button"
          value="Search GitHub User" />
      </form>
    )
  }
  
  handleClick(e) { 
    e.preventDefault(); 
    let username = this.refs.search.value; 
    this.props.fetchUser(username); 
    this.refs.search.value = ''; 
   } 
}

class Card extends Component {
  render() {
    let data = this.props.data
    
    if (data.notFound === 'Not Found') {
      // when username is not found...
      return <h3 className="card__notfound">User not found. Try again!</h3>
    } else {
      // if username found, then...
      return (
        <div className="card">
          <a href={data.url} target="_blank">
            <img className="card__avatar" src={data.avatar} />             
          </a>
          <h2 className="card__username">
            <a className="card__link" href={data.url} target="_blank">{data.username}</a></h2>
          <dl>
            <dt>Real name</dt>
            <dd>{data.realName}</dd>

            <dt>Location</dt>
            <dd>{data.location}</dd>

            <dt>Number of public repos</dt>
            <dd>{data.repos}</dd>

            <dt>Number of followers</dt>
            <dd>{data.followers}</dd>
          </dl>
        </div>
      )
    }
  }
}

/*React.render(<App />, document.getElementById('app'))*/

export default App;
