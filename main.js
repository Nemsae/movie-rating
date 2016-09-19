let App = React.createClass({
  getInitialState() {
    return {
      movies: [],
      img: '',
      name: undefined,
    }
  },

  addMovie(movie) {
    let { movies, img, } = this.state;

    this.setState({
      movies: [...movies,movie]
    })
  },

  editVotes(currid, updatedMovie) {
    let { movies } = this.state;

    let updatedMovies = movies.map(movie => {
      if (movie.id === currid) {
        return updatedMovie;
      } else {
        return movie;
      }
    })

    updatedMovies.sort((a, b) => {
      return b.votes - a.votes;
    })

    this.setState({
      movies: updatedMovies,
    })
  },

  render() {
    let { movies, editVotes } = this.state;

    return (
      <div className="container">
        <h1>Movie Ratings</h1>
        <MovieForm addMovie={this.addMovie}/>
        <MovieTable movies={movies} editVotes={this.editVotes}/>
      </div>
    )
  }
})

let MovieForm = React.createClass({
  getInitialState() {
    return {
      type: '',
    }
  },

  submitForm(e) {
    e.preventDefault();
    let { name, img } = this.refs;
    let { addMovie } = this.props;
    // let { name, votes, credit, debit } = this.refs;

    let movie = {
      name: name.value,
      votes: 0,
      img: img.value,
      id: uuid(),
    };

    // console.log('Name: ', name.value)
    // console.log('Img: ', img.value)
    addMovie(movie);
  },

  render() {
    return(
      <form onSubmit={this.submitForm}>
        <div className="form-group">
          <label htmlFor="newName">Movie:</label>
          <input ref='name' type="text" className="form-control" id="newName" required/>
        </div>
        <div className="form-group">
          <label htmlFor="newPrice">Img URL:</label>
          <input ref='img' type="text" className="form-control" id="newImg"/>
        </div>
        <div>
          <button onClick={this.submitForm} className="btn btn-default">Add</button>
        </div>
      </form>
    )
  }
})

let MovieTable = React.createClass ({
  getInitialState() {
    return {
    }
  },

  plusVote(id) {
    let { movies } = this.props;
    let currMovie = movies.filter(movie => movie.id == id)

    let myVotes = currMovie[0].votes += 1;

    this.repackageMovie(id, myVotes);
  },

  repackageMovie(id, myVotes) {
    let { currVotes } = this.state;
    let { movies, editVotes } = this.props;

    let currMovie = movies.filter(movie => movie.id == id)

    console.log('currMovie: ', currMovie)
    console.log('votes of currMovie: ',currMovie[0].votes)

    let updatedMovie = {
      name: currMovie[0].name,
      img: currMovie[0].img,
      votes: myVotes,
      id: currMovie[0].id,
    }
    console.log('updatedMovie: ', updatedMovie)

    editVotes(id, updatedMovie);
  },

  minusVote(id) {
    let { movies } = this.props;
    let currMovie = movies.filter(movie => movie.id == id)

    let myVotes = currMovie[0].votes -= 1;

    this.repackageMovie(id, myVotes);
  },

  render() {
    let { movies }= this.props;
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Total Votes</th>
              <th>Upvote</th>
              <th>Downvote</th>
            </tr>
          </thead>

          <tbody>
            {movies.map(movie => (
              <tr key={movie.id}>
                <td>{movie.name}</td>
                <td>
                  <img src={movie.img}></img>
                </td>
                <td>{movie.votes}</td>
                {/* <td>Votes Here</td> */}
                <td>
                  <button onClick={this.plusVote.bind(null, movie.id)} className="btn btn-sm btn-default">Upvote</button>
                  {/* <button onClick={.bind(null, movie.id)} className="btn btn-sm btn-danger">Upvote</button> */}
                </td>
                <td>
                  <button onClick={this.minusVote.bind(null, movie.id)} className="btn btn-sm btn-danger">Downvote</button>
                  {/* <button onClick={.bind(null, movie.id)} className="btn btn-sm btn-danger">Downvote</button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
})

ReactDOM.render(
  <App/>,
  document.getElementById('root')
)
