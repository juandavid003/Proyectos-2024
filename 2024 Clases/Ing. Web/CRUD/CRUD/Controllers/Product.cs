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
    public class ProductController : ApiController
    {
        string connectionString = ConfigurationManager.ConnectionStrings["MyConnString"].ConnectionString;

        // GET: api/consumption
        public IEnumerable<Product> Get()
        {
            using (DB_CrudLogInEntities db = new DB_CrudLogInEntities(connectionString))
            {
                var consumptions = from product in db.products
                                   select new Product
                                   {
                                       ProductId = product.product_id,
                                       Name = product.name,
                                       Description = product.description,
                                       Price = product.price,
                                       Provider = product.provider,
                                       State = product.state,
                                       AvailableQuantity = product.availableQuantity
                                   };

                return consumptions.ToList();
            }
        }
    }
}


