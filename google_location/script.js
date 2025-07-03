let latitude,
  longitude = "";

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(onSuccess, onError);
} else {
  alert("tarayıcısınız konum bilgisi alamıyor...");
}

function onSuccess(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;

  console.log("Latitude:", latitude);
  console.log("Longitude:", longitude);

  const api_key = "2bddee2c9344473595c9018e96a9f7f5";
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${api_key}`;

  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      let details = result.results[0].components;

      let { country, postcode, province } = details;

      document.getElementById("results").innerHTML = `
        <p>Ülke: ${country}</p>
        <p>Posta Kodu: ${postcode}</p>
        <p>Bölge: ${province}</p>
      `;
    })
    .catch((error) => {
      console.error("API Hatası:", error);
      document.getElementById(
        "results"
      ).innerHTML = `<p style="color: red;">API'den veri alınırken hata oluştu</p>`;
    });
}

function onError(error) {
  let errorMessage = "";
  if (error.code == 1) {
    errorMessage = "Kullanıcı erişim iznini reddetti";
  } else if (error.code == 2) {
    errorMessage = "Konum alınamadı";
  } else {
    errorMessage = "Bilinmeyen bir hata oluştu";
  }

  document.getElementById(
    "results"
  ).innerHTML = `<p style="color: red;">Hata: ${errorMessage}</p>`;
}
