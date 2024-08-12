document.addEventListener('DOMContentLoaded', async () => {
    const tableBody = document.getElementById('dataTable').querySelector('tbody');

    try {
        const response = await fetch('https://localhost:7113/Earthquake');
        if (!response.ok) {
            throw new Error('Failed to fetch');
        }
        const data = await response.json();
        data.sort((a, b) => new Date(b.date) - new Date(a.date));
        tableBody.innerHTML = data.map(event => `
            <tr>
                <td>${new Date(event.date).toLocaleString()}</td>
                <td>${event.latitude}</td>
                <td>${event.longitude}</td>
                <td>${event.depth}</td>
                <td>${event.type}</td>
                <td>${event.magnitude}</td> <!-- type ekledik -->
                <td>${event.location}</td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error fetching earthquake data:', error);
        document.getElementById('error').innerText = `Unable to load earthquake data. Error: ${error.message}`;
    }
});
