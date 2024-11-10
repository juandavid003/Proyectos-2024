using DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Configuration;

namespace CRUD.Controllers
{
    public class EspecialityController : ApiController
    {
        string connectionString = ConfigurationManager.ConnectionStrings["MyConnString"].ConnectionString;

        // GET: api/consumption
        public IEnumerable<Especiality> Get()
        {
            using (DB_CrudLogInEntities db = new DB_CrudLogInEntities(connectionString))
            {
                var especialities = from especiality in db.especialities
                                   select new Especiality
                                   {
                                       Id = especiality.id,
                                       Name = especiality.name,
                                       Procedures = especiality.procedures
                                   };

                return especialities.ToList();
            }
        }
    }
}


