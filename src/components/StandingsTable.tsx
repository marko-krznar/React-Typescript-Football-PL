function StandingsTable(standings: any) {
	return (
		<table>
			<tbody>
				<tr>
					<th>Position</th>
					<th>Name</th>
					<th>Points</th>
				</tr>
				{standings.data &&
					standings.data.map((team: any) => {
						return (
							<tr key={team.team.id}>
								<td>{team.rank}</td>
								<td>{team.team.name}</td>
								<td>{team.points}</td>
							</tr>
						);
					})}
			</tbody>
		</table>
	);
}

export default StandingsTable;
