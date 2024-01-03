export interface FixtureGameweekNumberProps {
	roundResponse: string;
	nextRoundResponse?: boolean;
}

function FixtureGameweekNumber({ roundResponse, nextRoundResponse }: FixtureGameweekNumberProps) {
	const currentRoundSplit = roundResponse?.split(' ');

	if (nextRoundResponse) {
		return <span className="fixture-gameweek">Gameweek {Number(currentRoundSplit?.slice(-1)) + 1}</span>;
	}

	return <span className="fixture-gameweek">Gameweek {currentRoundSplit?.slice(-1)}</span>;
}

export default FixtureGameweekNumber;
