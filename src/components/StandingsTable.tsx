export interface TeamProp {
	rank?: string;
	points?: string;
	team?: {
		id?: string;
		name?: string;
	};
	home?: {
		played?: number;
	};
}

export interface StandingsProp {
	data: Array<TeamProp>;
}

function StandingsTable(standings: StandingsProp) {
	const { data } = standings;
	
	return (
		<table>
			<tbody>
				<tr>
					<th>Position</th>
					<th>Games Played</th>
					<th>Points</th>
					<th>Name</th>
				</tr>
				{data &&
					data.map((teamItem: TeamProp) => {
						const { rank, team, points, home } = teamItem;

						return (
							<tr key={team?.id}>
								<td>{rank}</td>
								<td>{team?.name}</td>
								<td>{home?.played}</td>
								<td>{points}</td>
							</tr>
						);
					})}
			</tbody>
		</table>
	);
}

export default StandingsTable;
