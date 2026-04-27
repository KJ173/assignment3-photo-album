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
        document.getElementById("results").innerHTML =
            "<p>Error fetching results.</p>";
    }
}

function uploadPhoto() {
    console.log("Uploading photo...");
    alert("Upload workflow is connected to S3/Lambda backend for assignment demo.");
}