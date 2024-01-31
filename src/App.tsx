import { useEffect, useState } from 'react';
import './scss/style.scss';

import axios from 'axios';
import classNames from 'classnames';

import StandingsTable from './components/StandingsTable';
import Fixture from './components/Fixture';
import FixtureGameweekNumber from './components/FixtureGameweekNumber';

function App() {
	const [standingsPremierLeague, setStandingsPremierLeague] = useState<any>(null);
	const [roundPremierLeague, setRoundPremierLeague] = useState<any>(null);
	const [lastPremierLeagueFixtures, setLastPremierLeagueFixtures] = useState<any>(null);
	const [nextPremierLeagueFixtures, setNextPremierLeagueFixtures] = useState<any>(null);
	const [activeButton, setActiveButton] = useState<string>('arsenal');
	const [collapsible, setCollapsible] = useState<boolean>(false);

	// TODO check if api gets data for 2024
	// const currentSeason = new Date().getFullYear();

	useEffect(() => {
		const fetchData = async () => {
			// Define headers for the API calls
			const headers = {
				'x-rapidapi-host': 'v3.football.api-sports.io',
				'x-rapidapi-key': '73d29a59228a9218095f7d1560ddb711',
			};

			try {
				// Make the first API call for standings
				const standingsPremierLeagueResponse = await axios.get(
					`https://v3.football.api-sports.io/standings?season=2023&league=39`,
					{
						headers,
					},
				);

				// Make the second API call for the current round
				const roundPremierLeagueResponse = await axios.get(
					'https://v3.football.api-sports.io/fixtures/rounds?season=2023&league=39&current=true',
					{
						headers,
					},
				);

				// Save current round
				const currentRound = roundPremierLeagueResponse.data.response[0];

				// Make the third API call for the last fixtures
				const lastPremierLeagueFixturesResponse = await axios.get(
					`https://v3.football.api-sports.io/fixtures?season=2023&league=39&round=${currentRound}`,
					{
						headers,
					},
				);

				// Get round number and for future fixtures
				const currentRoundArray = currentRound.split(' ');
				const lastRoundNumber = Number(currentRoundArray.slice(-1)) + 1;

				// Make the fourth API call for the next fixtures
				const nextPremierLeagueFixturesResponse = await axios.get(
					`https://v3.football.api-sports.io/fixtures?season=2023&league=39&round=Regular Season - ${lastRoundNumber}`,
					{ headers },
				);

				// Set the state with the data received from API responses
				setStandingsPremierLeague(standingsPremierLeagueResponse.data);
				setRoundPremierLeague(roundPremierLeagueResponse.data);
				setLastPremierLeagueFixtures(lastPremierLeagueFixturesResponse.data);
				setNextPremierLeagueFixtures(nextPremierLeagueFixturesResponse.data);
			} catch (error) {
				// Handle errors if any of the API calls fail
				// console.error('Error:', error);
			}
		};

		// Call the fetchData function when the component mounts
		fetchData();

		// Optionally, add cleanup code if needed
	}, []);

	if (
		standingsPremierLeague?.results > 0 &&
		roundPremierLeague?.results > 0 &&
		lastPremierLeagueFixtures?.results > 0 &&
		nextPremierLeagueFixtures?.results > 0
	) {
		localStorage.setItem(
			'premierLeagueData',
			JSON.stringify({
				eplStandings: standingsPremierLeague,
				eplCurrentRound: roundPremierLeague,
				eplLastFixtures: lastPremierLeagueFixtures,
				eplNextFixtures: nextPremierLeagueFixtures,
			}),
		);
	}

	const getPremierLeagueData: any = localStorage.getItem('premierLeagueData');

	// const getLastRoundNumber = (currentRound: any) => {
	// 	const currentRoundSplit = currentRound.split(' ');

	// 	return currentRoundSplit.slice(-1) - 1;
	// };

	const getButtonClassnames = (buttonName: string) => {
		return classNames('button', {
			'button-active': activeButton === buttonName,
		});
	};

	const findArsenalFixture = (arsenalFixtures: Array<any>) =>
		arsenalFixtures?.find((arsenalFixture) => {
			return arsenalFixture.teams.away.name === 'Arsenal' || arsenalFixture.teams.home.name === 'Arsenal';
		});

	const filterNonArsenalFixtures = (arsenalNoneFixtures: Array<any>) =>
		arsenalNoneFixtures?.filter((arsenalNoneFixture) => {
			if (arsenalNoneFixture.teams.away.name === 'Arsenal' || arsenalNoneFixture.teams.home.name === 'Arsenal') {
				return;
			}

			return arsenalNoneFixture;
		});

	const arsenalPreviousFixture = findArsenalFixture(JSON.parse(getPremierLeagueData)?.eplLastFixtures?.response);
	const arsenalFutureFixture = findArsenalFixture(JSON.parse(getPremierLeagueData)?.eplNextFixtures?.response);

	const nonArsenalPreviousFixtures = filterNonArsenalFixtures(
		JSON.parse(getPremierLeagueData)?.eplLastFixtures?.response,
	);
	const nonArsenalFutureFixtures = filterNonArsenalFixtures(
		JSON.parse(getPremierLeagueData)?.eplNextFixtures?.response,
	);

	// todo remove when different gameweeks will be in local storage
	// console.log('standingsPremierLeague', standingsPremierLeague);
	// console.log('roundPremierLeague', roundPremierLeague);
	// console.log('lastPremierLeagueFixtures', lastPremierLeagueFixtures);
	// console.log('nextPremierLeagueFixtures', nextPremierLeagueFixtures);
	// console.log('getPremierLeagueData', JSON.parse(getPremierLeagueData));

	return (
		<div className="container">
			<div className="section-grid">
				<div className="content-block-intro">
					<h1 className="heading">Football Results</h1>
					<p className="text">
						Stay updated with the latest match results, upcoming games and position. This app has been
						meticulously crafted as a learning project to enhance my skills and knowledge in app development
						and data presentation.
					</p>
					<div className="choose-team-wrapper">
						<p className="text">Show fixtures and standings for:</p>
						<button className={getButtonClassnames('arsenal')} onClick={() => setActiveButton('arsenal')}>
							Arsenal
						</button>
						{/* TODO enable Dinamo button when APIs will get that data */}
						{/* <button>Dinamo</button> */}
					</div>
				</div>
				<div className="section-two-col">
					<div className="content-block">
						<div className="content-block-fixtures">
							<h2 className="heading">Premier League</h2>
							<div className="fixtures-wrapper">
								<div className="previous-fixtures">
									<FixtureGameweekNumber
										roundResponse={JSON.parse(getPremierLeagueData)?.eplCurrentRound?.response[0]}
									/>
									{arsenalPreviousFixture && (
										<Fixture
											date={arsenalPreviousFixture.fixture.date}
											homeTeamName={arsenalPreviousFixture.teams.home.name}
											homeTeamLogo={arsenalPreviousFixture.teams.home.logo}
											homeTeamGoals={(arsenalPreviousFixture.goals.home === null
												? 0
												: arsenalPreviousFixture.goals.home
											).toString()}
											awayTeamName={arsenalPreviousFixture.teams.away.name}
											awayTeamLogo={arsenalPreviousFixture.teams.away.logo}
											awayTeamGoals={(arsenalPreviousFixture.goals.away === null
												? 0
												: arsenalPreviousFixture.goals.away
											).toString()}
										/>
									)}
								</div>
								<div className="future-fixtures">
									<FixtureGameweekNumber
										roundResponse={JSON.parse(getPremierLeagueData)?.eplCurrentRound?.response[0]}
										nextRoundResponse
									/>
									{arsenalFutureFixture && (
										<Fixture
											date={arsenalFutureFixture.fixture.date}
											homeTeamName={arsenalFutureFixture.teams.home.name}
											homeTeamLogo={arsenalFutureFixture.teams.home.logo}
											homeTeamGoals={(arsenalFutureFixture.goals.home === null
												? 0
												: arsenalFutureFixture.goals.home
											).toString()}
											awayTeamName={arsenalFutureFixture.teams.away.name}
											awayTeamLogo={arsenalFutureFixture.teams.away.logo}
											awayTeamGoals={(arsenalFutureFixture.goals.away === null
												? 0
												: arsenalFutureFixture.goals.away
											).toString()}
										/>
									)}
								</div>
							</div>
							<button className="button" onClick={() => setCollapsible((prev) => !prev)}>
								<span>{collapsible ? 'Hide' : 'Show'}</span> the rest of the games
							</button>
							{collapsible && (
								<div className="fixtures-wrapper">
									<div className="previous-fixtures">
										<FixtureGameweekNumber
											roundResponse={
												JSON.parse(getPremierLeagueData)?.eplCurrentRound?.response[0]
											}
										/>
										<div className="fixtures-collapsable-wrapper">
											<div className="fixtures-list">
												{nonArsenalPreviousFixtures?.map((fixture: any, index: number) => {
													return (
														<Fixture
															key={index}
															date={fixture.fixture.date}
															homeTeamName={fixture.teams.home.name}
															homeTeamLogo={fixture.teams.home.logo}
															homeTeamGoals={(fixture.goals.home === null
																? 0
																: fixture.goals.home
															).toString()}
															awayTeamName={fixture.teams.away.name}
															awayTeamLogo={fixture.teams.away.logo}
															awayTeamGoals={(fixture.goals.away === null
																? 0
																: fixture.goals.away
															).toString()}
														/>
													);
												})}
											</div>
										</div>
									</div>
									<div className="future-fixtures">
										<FixtureGameweekNumber
											roundResponse={
												JSON.parse(getPremierLeagueData)?.eplCurrentRound?.response[0]
											}
											nextRoundResponse
										/>
										<div className="fixtures-collapsable-wrapper">
											<div className="fixtures-list">
												{nonArsenalFutureFixtures?.map((fixture: any, index: number) => {
													return (
														<Fixture
															key={index}
															date={fixture.fixture.date}
															homeTeamName={fixture.teams.home.name}
															homeTeamLogo={fixture.teams.home.logo}
															homeTeamGoals={(fixture.goals.home === null
																? 0
																: fixture.goals.home
															).toString()}
															awayTeamName={fixture.teams.away.name}
															awayTeamLogo={fixture.teams.away.logo}
															awayTeamGoals={(fixture.goals.away === null
																? 0
																: fixture.goals.away
															).toString()}
														/>
													);
												})}
											</div>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
			<div className="content-block content-block-standings-table">
				<StandingsTable
					data={JSON.parse(getPremierLeagueData)?.eplStandings?.response[0]?.league.standings[0]}
				/>
			</div>
		</div>
	);
}

export default App;
