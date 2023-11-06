/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useEffect, useState } from 'react';
import axios from 'axios';

import StandingsTable from './components/StandingsTable';
import Fixture from './components/Fixture';

import './scss/style.scss';

function App() {
	const [standings, setStandings] = useState<any>(null);
	const [lastFixture, setLastFixture] = useState<any>(null);
	const [nextFixture, setNextFixture] = useState<any>(null);
	// State for UCL data
	const [standingsUcl, setStandingsUcl] = useState<any>(null);
	const [lastFixtureUcl, setLastFixtureUcl] = useState<any>(null);
	const [nextFixtureUcl, setNextFixtureUcl] = useState<any>(null);

	useEffect(() => {
		const headers = {
			'x-rapidapi-host': 'v3.football.api-sports.io',
			'x-rapidapi-key': '73d29a59228a9218095f7d1560ddb711',
		};

		axios
			.get(
				'https://v3.football.api-sports.io/standings?league=39&season=2023',
				{ headers }
			)
			.then((response) => {
				setStandings(response.data);
			})

			.catch((error) => {
				console.error('Error:', error);
			});

		axios
			.get(
				'https://v3.football.api-sports.io/fixtures?league=39&season=2023&team=42&last=1',
				{ headers }
			)
			.then((response) => {
				setLastFixture(response.data);
			})
			.catch((error) => {
				console.error('Error:', error);
			});

		axios
			.get(
				'https://v3.football.api-sports.io/fixtures?league=39&season=2023&team=42&next=1',
				{ headers }
			)
			.then((response) => {
				setNextFixture(response.data);
			})
			.catch((error) => {
				console.error('Error:', error);
			});

		// Get UCL data
		axios
			.get('https://v3.football.api-sports.io/standings?league=2&season=2023', {
				headers,
			})
			.then((response) => {
				setStandingsUcl(response.data);
			})
			.catch((error) => {
				console.error('Error:', error);
			});

		axios
			.get(
				'https://v3.football.api-sports.io/fixtures?league=2&season=2023&team=42&last=1',
				{ headers }
			)
			.then((response) => {
				setLastFixtureUcl(response.data);
			})
			.catch((error) => {
				console.error('Error:', error);
			});

		axios
			.get(
				'https://v3.football.api-sports.io/fixtures?league=2&season=2023&team=42&next=1',
				{ headers }
			)
			.then((response) => {
				setNextFixtureUcl(response.data);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	}, []);

	if (standings !== null && lastFixture !== null && nextFixture !== null) {
		localStorage.setItem(
			'eplData',
			JSON.stringify({
				eplStandings: standings,
				eplLastFixture: lastFixture,
				eplNextFixture: nextFixture,
			})
		);
	}

	const savedData: any = localStorage.getItem('eplData');

	if (
		standingsUcl !== null &&
		lastFixtureUcl !== null &&
		nextFixtureUcl !== null
	) {
		localStorage.setItem(
			'uclData',
			JSON.stringify({
				uclStandings: standingsUcl,
				uclLastFixture: lastFixtureUcl,
				uclNextFixture: nextFixtureUcl,
			})
		);
	}

	const savedDataUcl: any = localStorage.getItem('uclData');

	// console.log('savedDataUcl', JSON.parse(savedDataUcl));
	// console.log('savedData', JSON.parse(savedData));
	console.log('UCL last fixture', JSON.parse(savedDataUcl)?.uclLastFixture);

	return (
		<div className="container">
			<div className="section-grid">
				<div className="content-block content-block-intro">
					<h1 className="heading">Arsenal</h1>
					<p className="text">
						Stay updated with the latest match results, upcoming games and
						position in Premier League. This app has been meticulously crafted
						as a learning project to enhance my skills and knowledge in app
						development and data presentation.
					</p>
				</div>
				<div className="section-two-col">
					{JSON.parse(savedData).eplLastFixture.response[0]?.fixture.date &&
						JSON.parse(savedData).eplNextFixture.response[0]?.fixture.date && (
							<div className="content-block content-block-fixtures">
								<h2 className="heading">Premier League</h2>
								<Fixture
									date={
										JSON.parse(savedData).eplLastFixture.response[0].fixture
											.date
									}
									homeTeamName={
										JSON.parse(savedData).eplLastFixture.response[0].teams.home
											.name
									}
									homeTeamLogo={
										JSON.parse(savedData).eplLastFixture.response[0].teams.home
											.logo
									}
									homeTeamGoals={
										JSON.parse(savedData).eplLastFixture.response[0].goals.home
									}
									awayTeamName={
										JSON.parse(savedData).eplLastFixture.response[0].teams.away
											.name
									}
									awayTeamLogo={
										JSON.parse(savedData).eplLastFixture.response[0].teams.away
											.logo
									}
									awayTeamGoals={
										JSON.parse(savedData).eplLastFixture.response[0].goals.away
									}
								/>
								<Fixture
									date={
										JSON.parse(savedData).eplNextFixture.response[0].fixture
											.date
									}
									homeTeamName={
										JSON.parse(savedData).eplNextFixture.response[0].teams.home
											.name
									}
									homeTeamLogo={
										JSON.parse(savedData).eplNextFixture.response[0].teams.home
											.logo
									}
									awayTeamName={
										JSON.parse(savedData).eplNextFixture.response[0].teams.away
											.name
									}
									awayTeamLogo={
										JSON.parse(savedData).eplNextFixture.response[0].teams.away
											.logo
									}
								/>
							</div>
						)}
					{JSON.parse(savedDataUcl)?.uclLastFixture?.response[0]?.fixture
						?.date &&
						JSON.parse(savedDataUcl)?.uclNextFixture?.response[0]?.fixture
							?.date && (
							<div className="content-block content-block-fixtures">
								<h2 className="heading">UEFA Champions League</h2>
								<Fixture
									date={
										JSON.parse(savedDataUcl).uclLastFixture.response[0].fixture
											.date
									}
									homeTeamName={
										JSON.parse(savedDataUcl).uclLastFixture.response[0].teams
											.home.name
									}
									homeTeamLogo={
										JSON.parse(savedDataUcl).uclLastFixture.response[0].teams
											.home.logo
									}
									homeTeamGoals={
										JSON.parse(savedDataUcl).uclLastFixture.response[0].goals
											.home
									}
									awayTeamName={
										JSON.parse(savedDataUcl).uclLastFixture.response[0].teams
											.away.name
									}
									awayTeamLogo={
										JSON.parse(savedDataUcl).uclLastFixture.response[0].teams
											.away.logo
									}
									awayTeamGoals={
										JSON.parse(savedDataUcl).uclLastFixture.response[0].goals
											.away
									}
								/>
								<Fixture
									date={
										JSON.parse(savedDataUcl).uclNextFixture.response[0].fixture
											.date
									}
									homeTeamName={
										JSON.parse(savedDataUcl).uclNextFixture.response[0].teams
											.home.name
									}
									homeTeamLogo={
										JSON.parse(savedDataUcl).uclNextFixture.response[0].teams
											.home.logo
									}
									awayTeamName={
										JSON.parse(savedDataUcl).uclNextFixture.response[0].teams
											.away.name
									}
									awayTeamLogo={
										JSON.parse(savedDataUcl).uclNextFixture.response[0].teams
											.away.logo
									}
								/>
							</div>
						)}
				</div>
			</div>

			{JSON.parse(savedData).eplStandings.response[0]?.league.standings[0] && (
				<div className="content-block content-block-standings-table">
					<StandingsTable
						data={
							JSON.parse(savedData).eplStandings.response[0].league.standings[0]
						}
					/>
				</div>
			)}
		</div>
	);
}

export default App;
