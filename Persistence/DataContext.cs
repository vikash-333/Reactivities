using Microsoft.EntityFrameworkCore;
using Domain;


namespace Persistence
{
    public class DataContext : DbContext
    {
        private readonly DbContextOptions _options;

        public DataContext(DbContextOptions options) : base(options)
        {
            _options = options;
        }

        public DbSet<Activity> Activities { get; set; }
    }
}