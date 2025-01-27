// location.js

async function userLocation() {
    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return; // Add return to prevent further execution
    }

    // Processing the geolocation:
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            // Extract the lat lng coords
            const longitude = position.coords.longitude;
            const latitude = position.coords.latitude;

            console.log("User's Location: ", { latitude, longitude });

            // Send location to backend.
            try {
                // "/api/gyms/nearby is the backend endpoint where the fetch request is made"
                const response = await fetch("/api/gyms/nearby", {
                    method: 'POST',   // Post because we are sending data to the server.
                    headers: {
                        "Content-Type": "application/json",  // Data being sent in JSON format.
                    },
                    body: JSON.stringify({ latitude, longitude }),
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch nearby gyms");
                }

                const data = await response.json();
                console.log('Response from backend:', data);

                // Display the response:
                document.getElementById("response").innerHTML = `
                <pre>${JSON.stringify(data, null, 2)}</pre>`;
            } catch (error) {
                console.error("Error sending location to backend:", error);
                alert("Something went wrong while fetching gyms.");
            }
        },
        (error) => {
            console.error("Error getting location:", error);
            alert("Error fetching location. Please enable location services.");
        }
    );
}

document.getElementById("locationbtn").addEventListener("click", userLocation);
