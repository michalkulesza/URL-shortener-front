const urlButton = document.querySelector(".url-button");
const input = document.querySelector(".url-input");
const output = document.querySelector(".output");

urlButton.addEventListener("click", shortenUrl);

function shortenUrl() {
  if (urlButton.innerHTML == "Shorten") {
    if (input.value != "") {
      if (checkForHttp()) {
        urlButton.innerHTML = `<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>`;

        axios({
          method: "post",
          url: "https://frozen-plains-00754.herokuapp.com/api/url/shorten",
          data: {
            longUrl: `${document.querySelector(".url-input").value}`
          }
        })
          .then(res => {
            document.querySelector(".rows").style.height = "103px";
            output.style.visibility = "visible";
            document.querySelector(".main").style.height = "259px";
            input.value = `${res.data.shortUrl}`;
            urlButton.innerHTML = "Copy";
            output.querySelector("span").innerHTML = `${res.data.longUrl}`;
            console.log(res);
          })
          .catch(err => console.log(err));
      }
    }
  } else if (urlButton.innerHTML == "Copy") {
    input.select();
    document.execCommand("copy");
    urlButton.style.backgroundColor = "#a0e248";
    urlButton.style.color = "#fff";
    urlButton.innerHTML = "Copied!";
  }
}

function checkForHttp() {
  if (input.value.startsWith("http://") || input.value.startsWith("https://")) {
    return true;
  } else {
    input.value = `http://${input.value}`;
    return true;
  }
}
