import './scss/style.scss';
import placeholder from './assets/placeholder.svg';

function App() {
	return (
		<div className="container">
			<div className="content-block content-block-intro">
				<h1 className="heading">Premier League Results</h1>
				<p className="text">
					Welcome to the Premier League Results app, meticulously
					crafted to enhance your knowledge and understanding of one
					of the most prestigious football leagues in the world.
					Designed with a focus on expanding your horizons, this app
					offers a wealth of information, from match outcomes and
					insightful player analyses to captivating historical data
				</p>
				<p className="text">
					Embrace the opportunity to delve deeper into the intricacies
					of the Premier League, empowering yourself with a
					comprehensive understanding of the game and its captivating
					evolution. Get ready to embark on a journey of knowledge and
					discovery with our immersive app experience.
				</p>
			</div>
			<div className="content-block content-block-result">
				<div className="team">
					<img src={placeholder} alt="placeholder" />
					<span className="text">Arsenal</span>
				</div>
				<div className="result">
					<span className="text">5</span>
					<span className="text">:</span>
					<span className="text">0</span>
				</div>
				<div className="team">
					<img src={placeholder} alt="placeholder" />
					<span className="text">Someone</span>
				</div>
			</div>
			<div className="content-block">
				<table>
					<tbody>
						<tr>
							<th>Position</th>
							<th>Name</th>
							<th>Points</th>
						</tr>
						<tr>
							<td>1</td>
							<td>Arsenal</td>
							<td>90</td>
						</tr>
						<tr>
							<td>1</td>
							<td>Arsenal</td>
							<td>90</td>
						</tr>
						<tr>
							<td>1</td>
							<td>Arsenal</td>
							<td>90</td>
						</tr>
						<tr>
							<td>1</td>
							<td>Arsenal</td>
							<td>90</td>
						</tr>
						<tr>
							<td>1</td>
							<td>Arsenal</td>
							<td>90</td>
						</tr>
						<tr>
							<td>1</td>
							<td>Arsenal</td>
							<td>90</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default App;
