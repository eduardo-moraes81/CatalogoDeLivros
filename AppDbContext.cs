using Microsoft.EntityFrameworkCore;

namespace CatalogoDeLivros
{
    public class AppDbContext : DbContext
    {
        public DbSet<Livro> Livros { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Livro>().HasData(
                new Livro { Id = 1, Titulo = "1984", Autor = "George Orwell", Ano = 1949 },
                new Livro { Id = 2, Titulo = "O Senhor dos Anéis", Autor = "J.R.R. Tolkien", Ano = 1954 }
            );
        }
    }
}
