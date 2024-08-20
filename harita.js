
    
    async function initMap() {
        const { Map,InfoWindow } = await google.maps.importLibrary("maps");
        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker"); // "marker" kütüphanesi

        map = new Map(document.getElementById('map'), {
            center: { lat: 39.9334, lng: 32.8597 },
            zoom: 6,
            mapId: "EarthQuake_Map",
        });
        const infoWindow = new InfoWindow();


        await vericagır(infoWindow);
    }

    async function vericagır(infoWindow) {
        try {
            const response = await fetch('https://localhost:7113/Earthquake');
            if (!response.ok) {
                throw new Error(`HTTP hata kodu: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            data.forEach(element => {
                const depremTag = document.createElement("div");

                depremTag.className = "deprem-tag";
                var size=40;
                var back;
                var color;
                var text="center";
                var magnitude=element.magnitude;
            
                if (magnitude <=3) {
                    size;
                    back = "#00FF00";
                } else if (magnitude >= 3 && magnitude <=3.9) {
                    size;
                    back = "#00FFFF";
                    
                } else if (magnitude >=4 && magnitude <=4.9) {
                    size ;
                    back = "#006400";
                } 
                else if (magnitude >= 5 && magnitude <=5.9) {
                    size;
                    back = "#DEB887";
                }else if (magnitude >= 6 && magnitude <=6.9) {
                    size;
                    back = "#FF8C00";
                }else if (magnitude >=7) {
                    size;
                    back = "red";
                }
                    depremTag.style.width=`${size}px`;
                    depremTag.style.height=`${size}px`;
                    depremTag.style.textAlign=text;
                    depremTag.style.color=color;
                    depremTag.style.backgroundColor=back;
                depremTag.textContent = magnitude;
                var marker = new google.maps.marker.AdvancedMarkerElement({
                    position: { lat: element.latitude, lng: element.longitude },
                    map: map,
                    gmpClickable: true,

                    title: 'Deprem Noktası',
                    content: depremTag
                });
                marker.addListener("click", ({ domEvent, latLng }) => {
                    const { target } = domEvent;
                    const infoContent = document.createElement("span");
                    infoContent.className="info-content";
                    const locationElement = document.createElement("p");
                    locationElement.innerHTML=`<b>Yer:</b>${element.location}`
                    const dateElement = document.createElement("p");
                    dateElement.innerHTML=`<b>Tarih:</b>${element.date}`
                    const magnitudesElement = document.createElement("p");
                    magnitudesElement.innerHTML=`<b>Büyüklük:</b>${element.magnitude}`
                    infoContent.appendChild(locationElement);
                    infoContent.appendChild(dateElement);
                    infoContent.appendChild(magnitudesElement);
                    infoWindow.close();
                    infoWindow.setContent(infoContent);
                    infoWindow.open(marker.map, marker);
                  });
        });

        
            
        } catch (error) {
            console.error('Veri çekme hatası:', error);
        }
    }

    window.initMap = initMap;
