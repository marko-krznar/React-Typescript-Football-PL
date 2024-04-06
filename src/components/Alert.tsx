interface AlertProps {
	title: string;
}

function Alert({ title }: AlertProps) {
	const adjustedRequestError =
		title.split(',')[0] +
		'. Unfortunately, this is a free plan and it has restrictions to 100 Requests/day. To make sure the app works, all fetched data is saved and pulled from local storage. So if you are seeing this message your local data was erased and there are more than 100 requests made today. Please come back tomorrow when you will be able to pull fresh data.';

	return <div className="alert-wrapper alert-wrapper-error">{adjustedRequestError}</div>;
}

export default Alert;
