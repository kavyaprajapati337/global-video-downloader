const backend = "https://YOUR_RENDER_URL";

async function startDownload() {

  const url = document.getElementById("url").value;
  const format = document.getElementById("format").value;
  const quality = document.getElementById("quality").value;

  const formData = new FormData();
  formData.append("url", url);
  formData.append("format_type", format);
  formData.append("quality", quality);

  const response = await fetch(`${backend}/download`, {
    method: "POST",
    body: formData
  });

  const data = await response.json();
  checkStatus(data.file_id);
}

async function checkStatus(file_id) {

  const interval = setInterval(async () => {

    const res = await fetch(`${backend}/status/${file_id}`);
    const data = await res.json();

    if (data.status === "processing") {
      document.getElementById("progress").style.width = "50%";
    }

    if (data.status === "completed") {
      document.getElementById("progress").style.width = "100%";
      document.getElementById("status").innerText = "Download Completed!";
      clearInterval(interval);
    }

    if (data.status === "failed") {
      document.getElementById("status").innerText = "Download Failed.";
      clearInterval(interval);
    }

  }, 2000);
}
