import classNames from 'classnames';

export interface TeamProp {
	description?: string;
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
					<th>#</th>
					<th>Team</th>
					<th>GP</th>
					<th>PO</th>
				</tr>
				{data &&
					data.map((teamItem: TeamProp) => {
						const { description, rank, team, points, all } = teamItem;

						const getTdClassnames = classNames({
							'champions-league': description === 'Promotion - Champions League (Group Stage: )',
						});

						return (
							<tr key={team?.id} className={team?.name === 'Arsenal' ? 'row-arsenal' : ''}>
								<td className={getTdClassnames}>
									<span>{rank}</span>
								</td>
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
