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
    const fileInput = document.getElementById("photoUpload");
    const labelsInput = document.getElementById("customLabels");
    const resultsDiv = document.getElementById("results");

    const file = fileInput.files[0];

    if (!file) {
        alert("Please choose a photo first.");
        return;
    }

    const customLabels = labelsInput.value.trim();

    console.log("Uploading photo...");
    console.log("Selected file:", file.name);
    console.log("Custom labels:", customLabels);

    resultsDiv.innerHTML = `
        <p class="empty">
            Upload successful. Custom labels sent:
            <strong>${customLabels || "none"}</strong>.
            Wait 5-10 seconds, then search one of the labels.
        </p>
    `;

    alert("Upload successful!");
}