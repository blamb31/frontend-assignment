import logo from '../images/logo.svg';
import axios from 'axios'
const { REACT_APP_MOVIE_DB_API_KEY, REACT_APP_API_DOMAIN, REACT_APP_API_BASE_IMAGE_URL } = process.env
let recentMovies;

let state = {
	searchedMovies : []
}

const getMovies = () => {
	// console.log({REACT_APP_API_DOMAIN, REACT_APP_MOVIE_DB_API_KEY})
	// axios.get(`https://pokeapi.co/api/v2/pokemon/ditto`).then(result => console.log({result}))
	axios.get(`${REACT_APP_API_DOMAIN}/discover/movie?sort_by?primary_release_date.asc&api_key=${REACT_APP_MOVIE_DB_API_KEY}`).then(result => {
		recentMovies = result.data.results
		console.log({ data: result.data, recentMovies })
	})

}

const searchMovies = (e) => {
	axios.get(`${REACT_APP_API_DOMAIN}/search/movie?query=${e.target.value}&api_key=${REACT_APP_MOVIE_DB_API_KEY}`).then(result => {
		state.searchedMovies = result.data.results
		console.log({ data: result.data, sm: state.searchedMovies })
	})

}

getMovies()



const App = () => (

	<div className="app-container">

		{state.searchedMovies}
		<nav id="navbar">
			<img src={logo} alt="Timescale" />
			<input type="text" placeholder="&#x1f50d; Search for a movie" onChange={searchMovies}/>
		</nav>

		<div id="most-recent">
			<h2>Most Recent Movies</h2>

			<div id="all-posters-container">
				{
					state.searchedMovies.length ?
						
					state.searchedMovies?.map(movie => {
						const backgroundString = `url(${REACT_APP_API_BASE_IMAGE_URL}${movie.poster_path})`
						const styleObj = {
							backgroundImage: backgroundString,
							backgroundPosition: 'center',
							backgroundSize: 'cover',
							backgroundRepeat: 'no-repeat',
							width: '20%',
							margin: '2%',
							height: '500px',
							
						}
						console.log({backgroundString})
						return (
							<div className="movie-poster" key={movie.id} style={styleObj}>
								
								<div className="vote-bar">
									<h4 className='avg-text'>
										{movie.vote_average}
	
									</h4>
									
								</div>
								<div className="title-bar">
									<h4 className='title-text'>
										{movie.title}
	
									</h4>
									
								</div>
	
							</div>
						)
					}
						
						:
					
					recentMovies?.map(movie => {
					const backgroundString = `url(${REACT_APP_API_BASE_IMAGE_URL}${movie.poster_path})`
					const styleObj = {
						backgroundImage: backgroundString,
						backgroundPosition: 'center',
						backgroundSize: 'cover',
						backgroundRepeat: 'no-repeat',
						width: '20%',
						margin: '2%',
						height: '500px',
						
					}
					console.log({backgroundString})
					return (
						<div className="movie-poster" key={movie.id} style={styleObj}>
							
							<div className="vote-bar">
								<h4 className='avg-text'>
									{movie.vote_average}

								</h4>
								
							</div>
							<div className="title-bar">
								<h4 className='title-text'>
									{movie.title}

								</h4>
								
							</div>

						</div>
					)
				})
				
			}
			</div>

		</div>
		
	</div>
)

export default App;
