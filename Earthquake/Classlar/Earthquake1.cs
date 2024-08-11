namespace Earthquake.Classlar
{
    public class EarthquakeEvent
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public float Depth { get; set; }
        public string Type { get; set; }
        public double Magnitude { get; set; }
        public string Location { get; set; }
    }
}
