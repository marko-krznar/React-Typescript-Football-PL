export interface FixtureProps {
	homeTeamName: string;
	homeTeamLogo: string;
	awayTeamName: string;
	awayTeamLogo: string;
	homeTeamGoals?: string;
	awayTeamGoals?: string;
}

function Fixture({
	homeTeamName,
	homeTeamLogo,
	homeTeamGoals = '-',
	awayTeamName,
	awayTeamLogo,
	awayTeamGoals = '-'
}: FixtureProps) {
	return (
		<>
			<div className="team">
				<img src={homeTeamLogo} alt={homeTeamName} />
				<span className="text">{homeTeamName}</span>
			</div>
			<div className="result">
				<span className="text">{homeTeamGoals}</span>
				<span className="text">:</span>
				<span className="text">{awayTeamGoals}</span>
			</div>
			<div className="team">
				<img src={awayTeamLogo} alt={awayTeamName} />
				<span className="text">{awayTeamName}</span>
			</div>
		</>
	)
}

export default Fixture