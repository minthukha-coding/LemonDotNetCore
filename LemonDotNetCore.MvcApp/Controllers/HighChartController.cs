﻿using LemonDotNetCore.MvcApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace LemonDotNetCore.MvcApp.Controllers
{
    public class HighChartController : Controller
    {
        public IActionResult PieChart()
        {
            return View();
        }
        public IActionResult AudioBoxplotChart()
        {
            var model = new AudioBoxplotChartModel()
            {
                Title = new List<string> { "Exam scores per class" },
                Subtitle = new List<string> { "Click each box to sonify on its own" },
            };
            return View(model);
        }
        public IActionResult BulletGraphChart()
        {
            var model = new BulletGraphChartModel()
            {
                Title = new List<string> { "2017 YTD" },
            };
            return View(model);
        }
    }
}
