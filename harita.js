// Haritayı başlatan fonksiyon
function initMap(latitude = 0, longitude = 0,magnitude=0) {
    const mapOptions = {
        center: { lat: 39.9334, lng: 32.8597 }, // Türkiye'nin merkezi
        zoom: 6,
        mapId: "EarthQuake_Map",
    };
    const map = new google.maps.Map(document.getElementById('map'), mapOptions);
    new google.maps.marker.AdvancedMarkerElement({
        position: { lat: latitude, lng: longitude },
        map: map,
        

    });
    window.initMap = initMap;
}
async function vericagır(){
        const response = await fetch('https://localhost:7113/Earthquake');
        if (!response.ok) {
            throw new Error('Failed to fetch');
        }
        const data = await response.json();
        vericagır(data);
}
function veridondur(data,maxOptions){
    data.array.forEach(element => {
        const mapOptions = new google.maps.Marker({
            center: { lat: element.latitude, lng: element.longitude,mgn:element.magnitude},
            zoom: 10,
            mapId: "EarthQuake_Map",
        });

        
    });
        

}