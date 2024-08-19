// Haritayı başlatan fonksiyon
function initMap(latitude = 0, longitude = 0,magnitude=0) {
    const mapOptions = {
        center: { lat: latitude, lng: longitude },
        zoom: 10,
        mapId: "EarthQuake_Map",
    };


    const map = new google.maps.Map(document.getElementById('map'), mapOptions);
    const depremTag = document.createElement("div");

    depremTag.className = "deprem-tag";
    var size;
    var back;
    var text="center";

    if (magnitude >= 1 && magnitude < 3) {
        size = 40;
        back = "green";
    } else if (magnitude >= 3 && magnitude < 5) {
        size = 60;
        back = "blue";
        
    } else if (magnitude >= 5 && magnitude < 7) {
        size = 80;
        back = "yellow";
    } else if (magnitude >= 7) {
        size = 100;
        back = "red";
    } else {
        size = 40;
        back = "white";
    }
        depremTag.style.width=`${size}px`;
        depremTag.style.height=`${size}px`;
        depremTag.style.textAlign=text;
        depremTag.style.backgroundColor=back;
    depremTag.textContent = magnitude;
    console.log(depremTag);
    new google.maps.marker.AdvancedMarkerElement({
        position: { lat: latitude, lng: longitude },
        map: map,
        // title: 'Deprem Noktası',
        content: depremTag
        

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
            initMap(event.latitude, event.longitude,event.magnitude);
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
