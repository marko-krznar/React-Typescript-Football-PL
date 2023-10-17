import { useEffect, useState } from 'react';
import './scss/style.scss';

// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import StandingsTable from './components/StandingsTable';
import Fixture from './components/Fixture';

function App() {
	const [data, setData] = useState<any>(null);
	const [lastFixture, setLastFixture] = useState<any>(null);
	const [nextFixture, setNextFixture] = useState<any>(null);

	useEffect(() => {
		const headers = {
			'x-rapidapi-host': 'v3.football.api-sports.io',
			'x-rapidapi-key': '7ba7477f0c4de0f9fe92bc247995d041',
		};

		axios
			// eslint-disable-next-line prettier/prettier
			.get('https://v3.football.api-sports.io/standings?league=39&season=2023', { headers })
			.then((response) => {
				setData(response.data);
			})
			.catch((error) => {
				// eslint-disable-next-line no-console
				console.error('Error:', error);
			});
	}, []);

	useEffect(() => {
		const headers = {
			'x-rapidapi-host': 'v3.football.api-sports.io',
			'x-rapidapi-key': '7ba7477f0c4de0f9fe92bc247995d041',
		};

		axios
			// eslint-disable-next-line prettier/prettier
			.get('https://v3.football.api-sports.io/fixtures?league=39&season=2023&team=42&last=1', { headers })
			.then((response) => {
				setLastFixture(response.data);
			})
			.catch((error) => {
				// eslint-disable-next-line no-console
				console.error('Error:', error);
			});
	}, []);

	useEffect(() => {
		const headers = {
			'x-rapidapi-host': 'v3.football.api-sports.io',
			'x-rapidapi-key': '7ba7477f0c4de0f9fe92bc247995d041',
		};

		axios
			// eslint-disable-next-line prettier/prettier
			.get('https://v3.football.api-sports.io/fixtures?league=39&season=2023&team=42&next=1', { headers })
			.then((response) => {
				setNextFixture(response.data);
			})
			.catch((error) => {
				// eslint-disable-next-line no-console
				console.error('Error:', error);
			});
	}, []);

	return (
		<div className="container">
			<div className="section-dude">
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
				{lastFixture?.response[0] && (
				<div className="content-block-result">
					<Fixture
						date={lastFixture.response[0].fixture.date}
						homeTeamName={lastFixture.response[0].teams.home.name}
						homeTeamLogo={lastFixture.response[0].teams.home.logo}
						homeTeamGoals={lastFixture.response[0].goals.home}
						awayTeamName={lastFixture.response[0].teams.away.name}
						awayTeamLogo={lastFixture.response[0].teams.away.logo}
						awayTeamGoals={lastFixture.response[0].goals.away}
						/>
					<Fixture
						date={nextFixture.response[0].fixture.date}
						homeTeamName={nextFixture.response[0].teams.home.name}
						homeTeamLogo={nextFixture.response[0].teams.home.logo}
						awayTeamName={nextFixture.response[0].teams.away.name}
						awayTeamLogo={nextFixture.response[0].teams.away.logo}
					/>
				</div>
			)}
			</div>
			<div className="content-block content-block-standings-table">
				{data && <StandingsTable data={data?.response[0].league.standings[0]} />}
			</div>
		</div>
	);
}

export default App;
