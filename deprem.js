document.addEventListener('DOMContentLoaded', async () => {
    const tableBody = document.getElementById('dataTable').querySelector('tbody');
    const loadingIndicator = document.getElementById('loading'); // Yükleniyor göstergesi
    const errorDiv = document.getElementById('error');

    try {
        // Yükleniyor göstergesini göster
        loadingIndicator.classList.remove('hidden');

        const response = await fetch('https://localhost:7113/Earthquake');
        if (!response.ok) {
            throw new Error('Failed to fetch');
        }
        const data = await response.json();
        
        // Tarihe göre sıralama: En güncel olaylar en üstte olacak
        data.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Tabloyu güncelle
        tableBody.innerHTML = data.map((event, index) => `
            <tr>
                <td>${new Date(event.date).toLocaleString()}</td>
                <td>${event.latitude}</td>
                <td>${event.longitude}</td>
                <td>${event.depth}</td>
                <td>${event.type}</td>
                <td>${event.magnitude}</td>
                <td>${event.location}</td>
                <td><button type="button" class="button" data-index="${index}">Detay</button></td>
            </tr>
        `).join('');

        // Yükleniyor göstergesini gizle
        loadingIndicator.classList.add('hidden');

        // Tabloyu görünür yap
        document.getElementById('dataTable').classList.remove('hidden');
        
        // Butonlara tıklama olay dinleyicisi ekle
        tableBody.addEventListener('click', (event) => {
            if (event.target && event.target.classList.contains('button')) {
                const index = event.target.getAttribute('data-index');
                window.location.href = `Anasayfa2.html?index=${index}`;
            }
        });
    
    } catch (error) {
        console.error('Error fetching earthquake data:', error);
        loadingIndicator.classList.add('hidden');
        errorDiv.innerText = `Unable to load earthquake data. Error: ${error.message}`;
        errorDiv.classList.remove('hidden');
    }
});

