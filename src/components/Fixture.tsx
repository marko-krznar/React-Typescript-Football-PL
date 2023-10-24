export interface FixtureProps {
	date: string;
	homeTeamName: string;
	homeTeamLogo: string;
	awayTeamName: string;
	awayTeamLogo: string;
	homeTeamGoals?: string;
	awayTeamGoals?: string;
}

function Fixture({
	date,
	homeTeamName,
	homeTeamLogo,
	homeTeamGoals = '-',
	awayTeamName,
	awayTeamLogo,
	awayTeamGoals = '-'
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
		<div className="content-block fixture">
			<div className="schedule">
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
			</div>
		</div>
	)
}

export default Fixture