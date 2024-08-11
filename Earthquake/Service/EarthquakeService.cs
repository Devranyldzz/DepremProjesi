using Earthquake.Classlar;
using Newtonsoft.Json;

public class EarthquakeService
{
    private readonly HttpClient _httpClient;
    private readonly EarthquakeContext _context;

    public EarthquakeService(HttpClient httpClient, EarthquakeContext context)
    {
        _httpClient = httpClient;
        _context = context;
    }

    public async Task<List<EarthquakeEvent>> GetEarthquakesAsync()
    {
        var endDateTime = DateTime.UtcNow;
        var startDateTime = endDateTime.AddHours(-27);

        var startFormatted = startDateTime.ToString("yyyy-MM-ddTHH:mm:ssZ");
        var endFormatted = endDateTime.ToString("yyyy-MM-ddTHH:mm:ssZ");

        var url = $"https://deprem.afad.gov.tr/apiv2/event/filter?start={Uri.EscapeDataString(startFormatted)}&end={Uri.EscapeDataString(endFormatted)}";

        try
        {
            var response = await _httpClient.GetStringAsync(url);
            var events = JsonConvert.DeserializeObject<List<EarthquakeEvent>>(response);

            if (events != null && events.Count > 0)
            {
                // Tarihleri UTC+3'e çevir
                foreach (var earthquakeEvent in events)
                {
                    earthquakeEvent.Date = earthquakeEvent.Date.ToUniversalTime().AddHours(3);
                }

                // Aynı verinin tekrar eklenmesini engellemek için kontrol ekle
                foreach (var earthquakeEvent in events)
                {
                    if (!_context.EarthquakeEvents.Any(e => e.Id == earthquakeEvent.Id))
                    {
                        _context.EarthquakeEvents.Add(earthquakeEvent);
                    }
                }

                await _context.SaveChangesAsync();
            }

            return events;
        }
        catch (HttpRequestException httpEx)
        {
            throw new ApplicationException($"HTTP Error retrieving earthquakes: {httpEx.Message}", httpEx);
        }
        catch (JsonSerializationException jsonEx)
        {
            throw new ApplicationException($"JSON Error deserializing earthquakes: {jsonEx.Message}", jsonEx);
        }
        catch (Exception ex)
        {
            var innerException = ex.InnerException?.Message ?? "No inner exception";
            throw new ApplicationException($"General Error retrieving earthquakes: {ex.Message}. Inner Exception: {innerException}", ex);
        }
    }
}
