import { useEffect, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames';

import StandingsTable from './components/StandingsTable';
import Fixture from './components/Fixture';
import test from './local-json/PL-Last-Round-response.json';
import testOne from './local-json/PL-Next-Round-response.json';
import './scss/style.scss';

function App() {
	const [standings, setStandings] = useState<any>(null);
	const [lastFixture, setLastFixture] = useState<any>(null);
	const [nextFixture, setNextFixture] = useState<any>(null);
	// State for UCL data
	const [standingsUcl, setStandingsUcl] = useState<any>(null);
	const [lastFixtureUcl, setLastFixtureUcl] = useState<any>(null);
	const [nextFixtureUcl, setNextFixtureUcl] = useState<any>(null);
	// State for active button
	const [activeButton, setActiveButton] = useState<string>('arsenal');
	const [collapsible, setCollapsible] = useState<boolean>(true);

	useEffect(() => {
		const fetchData = async () => {
			// Define headers for the API calls
			const headers = {
				'x-rapidapi-host': 'v3.football.api-sports.io',
				'x-rapidapi-key': '73d29a59228a9218095f7d1560ddb711',
			};

			try {
				// Use Promise.all to make multiple API calls concurrently
				const [
					standingsResponse,
					lastFixtureResponse,
					nextFixtureResponse,
					standingsUclResponse,
					lastFixtureUclResponse,
					nextFixtureUclResponse,
				] = await Promise.all([
					// Make the first API call for standings
					axios.get('https://v3.football.api-sports.io/standings?league=39&season=2023', { headers }),

					// Make the second API call for the last fixture
					axios.get('https://v3.football.api-sports.io/fixtures?league=39&season=2023&team=42&last=1', {
						headers,
					}),

					// Make the third API call for the next fixture
					axios.get('https://v3.football.api-sports.io/fixtures?league=39&season=2023&team=42&next=1', {
						headers,
					}),

					// Make the fourth API call for UCL standings
					axios.get('https://v3.football.api-sports.io/standings?league=2&season=2023', { headers }),

					// Make the fifth API call for the last UCL fixture
					axios.get('https://v3.football.api-sports.io/fixtures?league=2&season=2023&team=42&last=1', {
						headers,
					}),

					// Make the sixth API call for the next UCL fixture
					axios.get('https://v3.football.api-sports.io/fixtures?league=2&season=2023&team=42&next=1', {
						headers,
					}),
				]);

				// Set the state with the data received from API responses
				setStandings(standingsResponse.data);
				setLastFixture(lastFixtureResponse.data);
				setNextFixture(nextFixtureResponse.data);
				setStandingsUcl(standingsUclResponse.data);
				setLastFixtureUcl(lastFixtureUclResponse.data);
				setNextFixtureUcl(nextFixtureUclResponse.data);
			} catch (error) {
				// Handle errors if any of the API calls fail
				console.error('Error:', error);
			}
		};

		// Call the fetchData function when the component mounts
		void fetchData();

		// Optionally, add cleanup code if needed
	}, []);

	if (standings?.results > 0 && lastFixture?.results > 0 && nextFixture?.results > 0) {
		localStorage.setItem(
			'eplData',
			JSON.stringify({
				eplStandings: standings,
				eplLastFixture: lastFixture,
				eplNextFixture: nextFixture,
			}),
		);
	}

	const savedData: any = localStorage.getItem('eplData');

	if (standingsUcl?.results > 0 && lastFixtureUcl?.results > 0 && nextFixtureUcl?.results > 0) {
		localStorage.setItem(
			'uclData',
			JSON.stringify({
				uclStandings: standingsUcl,
				uclLastFixture: lastFixtureUcl,
				uclNextFixture: nextFixtureUcl,
			}),
		);
	}

	const getButtonClassnames = (buttonName: string) => {
		return classNames('button', {
			'button-active': activeButton === buttonName,
		});
	};

	const colapsibilityClassnames = classNames('fixtures-list', {
		collapsed: collapsible,
	});

	const findArsenalFixture = (elements: Array<any>) => {
		return elements.find((element) => {
			return element.teams.away.name === 'Arsenal' || element.teams.home.name === 'Arsenal';
		});
	};

	const filterNonArsenalFixtures = (elements: Array<any>) => {
		return elements.filter((element) => {
			if (element.teams.away.name === 'Arsenal' || element.teams.home.name === 'Arsenal') {
				return;
			}

			return element;
		});
	};

	const arsenalPreviousFixture = findArsenalFixture(test.response);
	const arsenalFutureFixture = findArsenalFixture(testOne.response);

	const nonArsenalPreviousFixtures = filterNonArsenalFixtures(test.response);
	const nonArsenalFutureFixtures = filterNonArsenalFixtures(testOne.response);

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
					{JSON.parse(savedData)?.eplLastFixture?.response[0]?.fixture.date &&
						JSON.parse(savedData)?.eplNextFixture?.response[0]?.fixture.date && (
							<div className="content-block">
								<div className="content-block-fixtures">
									<h2 className="heading">Premier League</h2>
									<button className="button" onClick={() => setCollapsible((prev) => !prev)}>
										<span>Show the rest of the games</span>
									</button>
									<div className="fixtures-wrapper">
										<div className="previous-fixtures">
											{/* TODO make fixture-gameweek component */}
											<span className="fixture-gameweek">Previous fixture</span>
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
											<div className="fixtures-collapsable-wrapper">
												<div className={colapsibilityClassnames}>
													{nonArsenalPreviousFixtures.map((fixture: any, index: number) => {
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
											<span className="fixture-gameweek">Next fixture</span>
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
											<div className="fixtures-collapsable-wrapper">
												<div className={colapsibilityClassnames}>
													{nonArsenalFutureFixtures.map((fixture: any, index: number) => {
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
								</div>
								{/* TODO Refactor when new design is created */}
								{/* {
									JSON.parse(savedDataUcl)?.uclLastFixture?.response[0]?.fixture?.date &&
									JSON.parse(savedDataUcl)?.uclNextFixture?.response[0]?.fixture?.date && (
										<div className="content-block-fixtures">
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
									)
								} */}
							</div>
						)}
				</div>
			</div>

			<div className="content-block content-block-standings-table">
				<StandingsTable data={JSON.parse(savedData)?.eplStandings?.response[0]?.league.standings[0]} />
			</div>
		</div>
	);
}

export default App;
