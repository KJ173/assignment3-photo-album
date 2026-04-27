async function searchPhotos() {
    const query = document.getElementById("searchBox").value;

    try {
        const response = await fetch(
            "https://73dxjqadpi.execute-api.us-east-2.amazonaws.com/prod/search?q=" + query
        );

        const data = await response.json();

        console.log(data);

        document.getElementById("results").innerHTML =
            "<pre>" + JSON.stringify(data, null, 2) + "</pre>";

    } catch (error) {
        console.error("Error:", error);
    }
}