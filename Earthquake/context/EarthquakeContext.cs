using Earthquake.Classlar;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

public class EarthquakeContext : DbContext
{
    public EarthquakeContext(DbContextOptions<EarthquakeContext> options) : base(options)
    {
    }

    public DbSet<EarthquakeEvent> EarthquakeEvents { get; set; }
}
