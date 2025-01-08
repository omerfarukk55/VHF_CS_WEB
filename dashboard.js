// Kazanç Değerlerini Güncelleme Fonksiyonu
import noUiSlider from "nouislider";
// Or the namespace:
import "nouislider/dist/nouislider.css";

// Kanal Sayısını Almak
function updateGainValue(channel) {
  var nonLinearSlider = document.getElementById(`input[name="gain${channel}"]`);

  noUiSlider.create(nonLinearSlider, {
    start: [4000],
    range: {
      min: [2000],
      "30%": [4000],
      "70%": [8000],
      max: [10000],
    },
  });
  var stepSliderValueElement = document.getElementById(`gain-value${channel}`);
  stepSlider.noUiSlider.on("update", function (values, handle) {
    gainValue.textContent = values[handle];
  });
}

// Squelch Değerlerini Güncelleme Fonksiyonu
function updateSquelchValue(channel) {
  const squelchSlider = document.querySelector(
    `input[name="squelch${channel}"]`
  );
  const squelchValue = document.getElementById(`squelch-value${channel}`);
  squelchValue.textContent = squelchSlider.value;
  var nonLinearSlider = document.getElementById(
    `input[name="squelch${channel}"]`
  );

  noUiSlider.create(nonLinearSlider, {
    start: [4000],
    range: {
      min: [2000],
      "30%": [4000],
      "70%": [8000],
      max: [10000],
    },
  });
}

// Sayfa Yüklendiğinde Çalışacak Fonksiyonlar
document.addEventListener("DOMContentLoaded", () => {
  // Kanal Giriş Gücü Değerlerini Sunucudan Alma (Örnek)
  for (let i = 1; i <= 8; i++) {
    fetch(`api/getInputPower?channel=${i}`)
      .then((response) => response.json())
      .then((data) => {
        document.getElementById(`input-power${i}`).textContent =
          data.inputPower || "--";
      })
      .catch((error) => console.error("Error:", error));
  }

  // Ayarla Butonu İşlevselliği
  document.getElementById("apply-settings").addEventListener("click", () => {
    const settings = gatherSettings();
    // Ayarları sunucuya gönderin (Örnek)
    fetch("/api/setSettings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Ayarlar başarıyla güncellendi.");
      })
      .catch((error) => console.error("Error:", error));
  });
});

// Ayarları Toplama Fonksiyonu
function gatherSettings() {
  const settings = {};
  for (let i = 1; i <= 8; i++) {
    settings[`channel${i}`] = {
      frequency: document.querySelector(`input[name="frequency${i}"]`).value,
      isOn: document.querySelector(`input[name="toggle${i}"]`).checked,
      filter:
        document.querySelector(`input[name="filter${i}"]:checked`)?.value ||
        null,
      gain: document.querySelector(`input[name="gain${i}"]`).value,
      squelch: document.querySelector(`input[name="squelch${i}"]`).value,
    };
  }
  return settings;
}
