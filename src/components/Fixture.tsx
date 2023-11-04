import teamLogoPlaceholder from '../assets/placeholder.svg';

export interface FixtureProps {
	date: string;
	homeTeamName: string;
	awayTeamName: string;
	homeTeamGoals?: string;
	awayTeamGoals?: string;
	homeTeamLogo?: string;
	awayTeamLogo?: string;
}

function Fixture({
	date,
	homeTeamName,
	homeTeamLogo = `${teamLogoPlaceholder}`,
	homeTeamGoals = '-',
	awayTeamName,
	awayTeamLogo = `${teamLogoPlaceholder}`,
	awayTeamGoals = '-',
}: FixtureProps) {
	const formattedDate = new Intl.DateTimeFormat('hr-HR', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	}).format(new Date(date));

	const formattedTime = new Intl.DateTimeFormat('hr-HR', {
		hour: '2-digit',
		minute: '2-digit',
	}).format(new Date(date));

	return (
		<div className="fixture">
			{/* <div className="schedule">
				<span className="text date">{formattedDate}</span>
				<span className="text time">{formattedTime}</span>
			</div>
			<div className="team">
				<img className="teaml-logo" src={homeTeamLogo} alt={homeTeamName} />
				<span className="text">VS</span>
				<img className="teaml-logo" src={awayTeamLogo} alt={awayTeamName} />
			</div>
			<div className="team-results">
				<div className="team-result">
					<span className="text">{homeTeamName}</span>
					<span className="text">{homeTeamGoals}</span>
				</div>
				<div className="team-result">
					<span className="text">{awayTeamName}</span>
					<span className="text">{awayTeamGoals}</span>
				</div>
			</div> */}
			<div className="fixture-row">
				<div className="schedule">
					<span className="text date">{formattedDate}</span>
					<span className="text time">{formattedTime}</span>
				</div>
				<div className="team-wrapper">
					<div className="team">
						<img className="teaml-logo" src={homeTeamLogo} alt={homeTeamName} />
						<span className="text text-club-name">{homeTeamName}</span>
						<span className="text">{homeTeamGoals}</span>
					</div>
					<div className="team">
						<img className="teaml-logo" src={awayTeamLogo} alt={awayTeamName} />
						<span className="text text-club-name">{awayTeamName}</span>
						<span className="text">{awayTeamGoals}</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Fixture;
