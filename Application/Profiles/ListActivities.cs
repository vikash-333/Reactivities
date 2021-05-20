using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class ListActivities
    {
        public class Query : IRequest<Result<List<UserActivityDto>>>
        {
            public string username { get; set; }
            public string predicate { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<UserActivityDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<UserActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.ActivityAttendees
                .Where(u => u.AppUser.UserName == request.username)
                .OrderBy(d => d.Activity.Date)
                .ProjectTo<UserActivityDto>(_mapper.ConfigurationProvider)
                .AsQueryable();

                switch (request.predicate)
                {
                    case "past":
                        query = query.Where(u => u.Date <= DateTime.Now);
                        break;
                    case "hosting":
                        query = query.Where(u => u.HostUsername == request.username);
                        break;
                    default:
                        query = query.Where(u => u.Date >= DateTime.Now);
                        break;
                }

                var activities = await query.ToListAsync();


                return Result<List<UserActivityDto>>.Success(activities);



            }
        }
    }
}