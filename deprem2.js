// Haritayı başlatan fonksiyon
function initMap(latitude = 0, longitude = 0) {
    const mapOptions = {
        center: { lat: latitude, lng: longitude },
        zoom: 10
    };

    const map = new google.maps.Map(document.getElementById('map'), mapOptions);

    new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map,
        title: 'Deprem Noktası'
    });
}

// Sayfa yüklendiğinde çalışacak kod
document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const index = urlParams.get('index');

    if (index === null) {
        console.error('Index not provided');
        document.getElementById('error-message').innerText = 'Deprem bilgisi bulunamadı.';
        document.getElementById('error-message').style.display = 'block';
        return;
    }

    try {
        const response = await fetch('https://localhost:7113/Earthquake');
        if (!response.ok) {
            throw new Error('Failed to fetch');
        }
        const data = await response.json();
        
        // Tarihe göre sıralama
        data.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        if (index >= 0 && index < data.length) {
            const event = data[index];
            document.getElementById('detail-date').innerText = new Date(event.date).toLocaleString();
            document.getElementById('detail-latitude').innerText = event.latitude;
            document.getElementById('detail-longitude').innerText = event.longitude;
            document.getElementById('detail-depth').innerText = event.depth;
            document.getElementById('detail-type').innerText = event.type;
            document.getElementById('detail-magnitude').innerText = event.magnitude;
            document.getElementById('detail-location').innerText = event.location;

            // Haritayı başlat
            initMap(event.latitude, event.longitude);
        } else {
            console.error('Index out of range');
            document.getElementById('error-message').innerText = 'Geçersiz deprem bilgisi.';
            document.getElementById('error-message').style.display = 'block';
        }
    } catch (error) {
        console.error('Error fetching earthquake data:', error);
        document.getElementById('error-message').innerText = `Deprem bilgileri yüklenemedi. Hata: ${error.message}`;
        document.getElementById('error-message').style.display = 'block';
    }
});
