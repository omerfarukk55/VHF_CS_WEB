
const currentPage = window.location.pathname.split('/').pop().split('.').shift();

  // Navbar'daki tüm linkleri seç
  const navLinks = document.querySelectorAll('.navbar-right a');

  navLinks.forEach(link => {
    const page = link.getAttribute('data-page');
    if (page === currentPage) {
      link.classList.add('active');
    }
  });
  // Sayfa Yüklendiğinde Çalışacak Fonksiyonlar
document.addEventListener("DOMContentLoaded", () => {
  // Kazanç ve Squelch Slider'larını Oluşturma
  for (let i = 1; i <= 8; i++) {
    // Kazanç Slider'ı
    const gainSlider = document.getElementById(`gain-slider${i}`);
    const gainValue = document.getElementById(`gain-value${i}`);

    noUiSlider.create(gainSlider, {
      start: 75, // Başlangıç değeri
      connect: [true, false],
      range: {
        min: 60,
        max: 90,
      },
      step: 1, // Değer adımı
    });

      gainSlider.noUiSlider.on("update", function (values, handle) {
      gainValue.textContent = values[handle];
    });

    // Squelch Slider'ı
    const squelchSlider = document.getElementById(`squelch-slider${i}`);
    const squelchValue = document.getElementById(`squelch-value${i}`);

    noUiSlider.create(squelchSlider, {
      start: -114, // Başlangıç değeri
      connect: [true, false],
      range: {
        min: -120,
        max: -108,
      },
      step: 1, // Değer adımı
    });

    squelchSlider.noUiSlider.on("update", function (values, handle) {
      squelchValue.textContent = values[handle];
    });
  }

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
    // Kazanç ve Squelch değerlerini noUiSlider'dan alın
    const gainSlider = document.getElementById(`gain-slider${i}`);
    const squelchSlider = document.getElementById(`squelch-slider${i}`);

    settings[`channel${i}`] = {
      frequency: document.querySelector(`input[name="frequency${i}"]`).value,
      isOn: document.querySelector(`input[name="toggle${i}"]`).checked,
      filter:
        document.querySelector(`input[name="filter${i}"]:checked`)?.value ||
        null,
      gain: gainSlider.noUiSlider.get(),
      squelch: squelchSlider.noUiSlider.get(),
    };
  }
  return settings;
}
for (let i = 1; i <= 8; i++) {
  const toggleElement = document.querySelector(`input[name="toggle${i}"]`);
  if (toggleElement) {
    toggleElement.addEventListener('change', function() {
      if (this.checked) {
        console.log(`Toggle${i} açıldı.`);
        // Açıkken yapılacak işlemler
      } else {
        console.log(`Toggle${i} kapandı.`);
        // Kapalıyken yapılacak işlemler
      }
    });
  } else {
    console.error(`Toggle${i} bulunamadı.`);
  }
}
for (let i = 1; i <= 8; i++) {
  const radioElements = document.querySelectorAll(`input[name="filter${i}"]`);
  radioElements.forEach(radio => {
    radio.addEventListener('change', () => {
      console.log(`filter${i} için seçilen eleman: ${radio.value}`);
      // Seçilen değer ile ilgili işlemleri burada yapabilirsiniz
    });
  });
}
document.addEventListener("DOMContentLoaded", () => {
  // Uplink Slider'ları Oluşturma (mevcut kodunuz)

  // Downlink Slider'larını Oluşturma
  for (let i = 1; i <= 8; i++) {
    // Downlink Kazanç Slider'ı
    const gainSlider = document.getElementById(`downlink-gain-slider${i}`);
    const gainValue = document.getElementById(`downlink-gain-value${i}`);

    if (gainSlider) {
      noUiSlider.create(gainSlider, {
        start: 75,
        connect: [true, false],
        range: {
          min: 60,
          max: 90,
        },
        step: 1,
      });

      gainSlider.noUiSlider.on("update", function (values, handle) {
        gainValue.textContent = values[handle];
      });
    }

    // Downlink Squelch Slider'ı
    const squelchSlider = document.getElementById(`downlink-squelch-slider${i}`);
    const squelchValue = document.getElementById(`downlink-squelch-value${i}`);

    if (squelchSlider) {
      noUiSlider.create(squelchSlider, {
        start: -114,
        connect: [true, false],
        range: {
          min: -120,
          max: -108,
        },
        step: 1,
      });

      squelchSlider.noUiSlider.on("update", function (values, handle) {
        squelchValue.textContent = values[handle];
      });
    }
  }
});
