let map;

function initMap() {
    const params = new URLSearchParams(window.location.search);
    const index = params.get('index');

    fetch('https://localhost:7113/Earthquake')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (index !== null && index >= 0 && index < data.length) {
                const event = data[index];
                const position = { lat: parseFloat(event.latitude), lng: parseFloat(event.longitude) };

                // Haritayı başlat
                map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 8,
                    center: position
                });

                // Konum işaretleyici ekle
                new google.maps.Marker({
                    position: position,
                    map: map,
                    title: event.location
                });

                // Detayları güncelle
                document.getElementById('detail-date').innerText = new Date(event.date).toLocaleString();
                document.getElementById('detail-latitude').innerText = event.latitude;
                document.getElementById('detail-longitude').innerText = event.longitude;
                document.getElementById('detail-depth').innerText = event.depth;
                document.getElementById('detail-type').innerText = event.type;
                document.getElementById('detail-magnitude').innerText = event.magnitude;
                document.getElementById('detail-location').innerText = event.location;
            } else {
                displayError('Geçersiz depremin indexi.');
            }
        })
        .catch(error => {
            console.error('Deprem verilerini alırken bir hata oluştu:', error);
            displayError('Deprem verilerini alırken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
        });
}

function displayError(message) {
    const errorElement = document.getElementById('error-message');
    if (errorElement) {
        errorElement.innerText = message;
        errorElement.style.display = 'block';
    } else {
        console.error(message);
    }
}

// Google Maps API'nin initMap fonksiyonunu çağırmasına izin ver
window.initMap = initMap;
