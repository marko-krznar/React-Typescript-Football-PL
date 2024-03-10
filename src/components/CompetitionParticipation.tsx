import React from 'react';

const CompetitionParticipation: any = (props: any) => {
	const { competitions } = props;

	return (
		<div className="competition-participation-wrapper">
			<h2 className="heading">Competitions</h2>
			<div className="competitions">
				{competitions.competitions.map((competition: any) => {
					return (
						<img
							key={competition.id}
							src={competition.league.logo}
							alt={competition.league.name}
							title={competition.league.name}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default CompetitionParticipation;
