// modern async/await - try/catch :
const fetchPlaces = async () => {
	const result = await fetch("http://localhost:3000/places");
	const data = await result.json();
	if (!result.ok) {
		throw new Error("Error while fetching data...");
	}
	return data.places;
};

const updateUserPlaces = async (places) => {
	const response = await fetch("http://localhost:3000/user-places", {
		method: "PUT",
		body: JSON.stringify({ places }),
		headers: {
			"Content-Type": "application/json",
		},
	});
	const resData = await response.json();
	if (!response.ok) {
		throw new Error("Failed to load data...");
	}
	return resData.message;
};

export { fetchPlaces, updateUserPlaces };
