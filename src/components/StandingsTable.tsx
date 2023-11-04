export interface TeamProp {
	rank?: string;
	points?: string;
	team?: {
		id?: string;
		name?: string;
	};
	all?: {
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
					<th>Name</th>
					<th>GP</th>
					<th>Points</th>
				</tr>
				{data &&
					data.map((teamItem: TeamProp) => {
						const { rank, team, points, all } = teamItem;

						return (
							<tr
								key={team?.id}
								className={team?.name === 'Arsenal' ? 'row-arsenal' : ''}
							>
								<td>{rank}</td>
								<td>{team?.name}</td>
								<td>{all?.played}</td>
								<td>{points}</td>
							</tr>
						);
					})}
			</tbody>
		</table>
	);
}

export default StandingsTable;
