using Earthquake.Classlar;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class EarthquakeController : ControllerBase
{
    private readonly EarthquakeService _earthquakeService;

    public EarthquakeController(EarthquakeService earthquakeService)
    {
        _earthquakeService = earthquakeService;
    }

    [HttpGet]
    public async Task<ActionResult<List<EarthquakeEvent>>> GetEarthquakesAsync()
    {
        try
        {
            var earthquakes = await _earthquakeService.GetEarthquakesAsync();
            return Ok(earthquakes);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }
}
