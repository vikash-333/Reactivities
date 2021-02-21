using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Application.Activities;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetAllActivities()
        {
            return await Mediator.Send(new List.Query());
        }

        /*     [HttpGet("{id}")]
            public async Task<ActionResult<Activity>> GetActivity(Guid id)
            {
               // return await _context.Activities.FindAsync(id);
            } */
    }
}