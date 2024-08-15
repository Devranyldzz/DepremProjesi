document.addEventListener('DOMContentLoaded', async () => {
    const tableBody = document.getElementById('dataTable').querySelector('tbody');
    try {
        const response = await fetch('https://localhost:7113/Earthquake');
        if (!response.ok) {
            throw new Error('Failed to fetch');
        }
        const data = await response.json();
        // data.sort((a, b) => new Date(b.date) - new Date(a.date));
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

        // Add event listeners to the buttons
        tableBody.addEventListener('click', (event) => {
            if (event.target && event.target.classList.contains('button')) {
                const index = event.target.getAttribute('data-index');
                window.location.href = `Anasayfa2.html?index=${index}`;
            }
        });
    
    } catch (error) {
        console.error('Error fetching earthquake data:', error);
        document.getElementById('error').innerText = `Unable to load earthquake data. Error: ${error.message}`;
    }
});
