async function searchPhotos() {
    const query = document.getElementById("searchBox").value;
    const resultsDiv = document.getElementById("results");

    resultsDiv.innerHTML = "<p>Searching...</p>";

    try {
        const response = await fetch(
            "https://73dxjqadpi.execute-api.us-east-2.amazonaws.com/prod/search?q=" + encodeURIComponent(query)
        );

        const data = await response.json();
        console.log(data);

        if (!data.results || data.results.length === 0) {
            resultsDiv.innerHTML = `
                <p class="empty">
                    No results found yet for "<strong>${query}</strong>".
                    This is expected until OpenSearch indexing is connected.
                </p>
            `;
            return;
        }

        resultsDiv.innerHTML = data.results.map(item => `
            <div class="result-item">
                <img src="${item.url}" alt="Photo result">
                <p>${item.labels ? item.labels.join(", ") : ""}</p>
            </div>
        `).join("");

    } catch (error) {
        console.error("Error:", error);
        resultsDiv.innerHTML = "<p>Error fetching results.</p>";
    }
}

function uploadPhoto() {
    console.log("Uploading photo...");
    alert("Upload workflow placeholder. S3/Lambda backend trigger is already working.");
}