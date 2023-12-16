import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";

// const avPlaces = localStorage.get("places");

export default function AvailablePlaces({ onSelectPlace }) {
	const [availablePlaces, setAvailablePlaces] = useState([]);
	const [isFetching, setIsFetching] = useState(false);
	const [error, setError] = useState();

	// modern async/await - try/catch :
	const fetchPlaces = async () => {
		try {
			const result = await fetch("http://localhost:3000/places");
			const data = await result.json();
			if (!result.ok) {
				throw new Error("Error while fetching data...");
			}
			// console.log(data);
			navigator.geolocation.getCurrentPosition((location) => {
				const sortedPlaces = sortPlacesByDistance(data.places, location.coords.latitude, location.coords.longitude);
				setAvailablePlaces(sortedPlaces);
				setIsFetching(false);
			});
		} catch (error) {
			console.log("There was an error...");
			setError({ message: error.message || "Could not fetch. Try later." });
			setIsFetching(false);
		}
	};

	useEffect(() => {
		setIsFetching(true);
		fetchPlaces();
	}, []);

	// Promise style written :
	// useEffect(() => {
	// 	fetch("http://localhost:3000/places")
	// 		.then((response) => {
	// 			return response.json();
	// 		})
	// 		.then((data) => {
	// 			setAvailablePlaces(data.places);
	// 		})
	// 		.catch(() => {});
	// }, []);

	if (error) {
		return <Error title="An error occurred" message={error.message} />;
	}

	return (
		<Places
			title="Available Places"
			places={availablePlaces}
			fallbackText="No places available."
			loadingText={"Fetching information..."}
			isLoading={isFetching}
			onSelectPlace={onSelectPlace}
		/>
	);
}
