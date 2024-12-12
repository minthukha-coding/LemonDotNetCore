﻿using minthukhaDotNetCore.RestAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace minthukhaDotNetCore.RestAPI
{
    public class AppDbContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            SqlConnectionStringBuilder sqlConnectionStringBuilder = new SqlConnectionStringBuilder()
            {
                DataSource = ".",
                InitialCatalog = "LemonDotNetCore",
                UserID = "sa",
                Password = "sasa@123",
                TrustServerCertificate = true,
            };

            optionsBuilder.UseSqlServer(sqlConnectionStringBuilder.ConnectionString);
        }
        public DbSet<BlogDataModel> Blogs { get; set; }
    }
}