async function downloadVideo() {

  const url = document.getElementById("url").value;
  const format = document.getElementById("format").value;
  const status = document.getElementById("status");

  status.innerText = "Processing...";

  const formData = new FormData();
  formData.append("url", url);
  formData.append("format_type", format);

  try {
    const response = await fetch("https://YOUR_RENDER_BACKEND_URL/download", {
      method: "POST",
      body: formData
    });

    const result = await response.json();

    if (response.ok) {
      status.innerText = "Download started successfully!";
    } else {
      status.innerText = "Error: " + result.error;
    }

  } catch (error) {
    status.innerText = "Server error.";
  }
}
