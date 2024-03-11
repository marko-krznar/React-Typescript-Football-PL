interface CompetitionProps {
	logo: string;
	name: string;
}
const Competition = ({ logo, name }: CompetitionProps) => {
	return (
		<div className="competition-img-wrapper">
			<img src={logo} alt={name} title={name} />
		</div>
	);
};

export default Competition;
