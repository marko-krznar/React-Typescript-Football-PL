export interface FixtureGameweekNumberProps {
	currentRoundResponse: string;
	playedRoundResponse?: boolean;
}

function FixtureGameweekNumber({ currentRoundResponse, playedRoundResponse }: FixtureGameweekNumberProps) {
	const currentRoundSplit = currentRoundResponse?.split(' ');

	if (playedRoundResponse) {
		return <span className="fixture-gameweek">Gameweek {Number(currentRoundSplit?.slice(-1)) - 1}</span>;
	}

	return <span className="fixture-gameweek">Gameweek {currentRoundSplit?.slice(-1)}</span>;
}

export default FixtureGameweekNumber;
