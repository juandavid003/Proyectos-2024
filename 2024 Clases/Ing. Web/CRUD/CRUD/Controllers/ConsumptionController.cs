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
    public class ConsumptionController : ApiController
    {
        string connectionString = ConfigurationManager.ConnectionStrings["MyConnString"].ConnectionString;

        // GET: api/consumption
        public IEnumerable<ConsumptionWithProduct> Get()
        {
            using (DB_CrudLogInEntities db = new DB_CrudLogInEntities(connectionString))
            {
                var consumptions = from consumption in db.consumptions
                                   join product in db.products on consumption.product_id equals product.product_id
                                   join treatment in db.treatments on consumption.treatment_id equals treatment.id 
                                   select new ConsumptionWithProduct
                                   {
                                       Id = consumption.id,
                                       UsedDate = consumption.usedDate,
                                       ProductName = product.name,
                                       TreatmentId = treatment.id,
                                       UsedQuantity = consumption.usedQuantity
                                   };

                return consumptions.ToList();
            }
        }

        // GET: api/consumption/{id}
        public IHttpActionResult Get(int id)
        {
            using (DB_CrudLogInEntities db = new DB_CrudLogInEntities(connectionString))
            {
                var consumption = (from c in db.consumptions
                                   join p in db.products on c.product_id equals p.product_id
                                   join t in db.treatments on c.treatment_id equals t.id
                                   where c.id == id
                                   select new ConsumptionWithProduct
                                   {
                                       Id = c.id,
                                       UsedDate = c.usedDate,
                                       ProductName = p.name,
                                       TreatmentId = t.id,
                                       UsedQuantity = c.usedQuantity
                                   }).FirstOrDefault();

                if (consumption == null)
                    return NotFound();

                return Ok(consumption);
            }
        }

        // POST: api/consumption
        public IHttpActionResult Post([FromBody] ConsumptionWithProduct consumptionDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid data.");

            using (DB_CrudLogInEntities db = new DB_CrudLogInEntities(connectionString))
            {
                // Verificar si el producto existe
                var product = db.products.FirstOrDefault(p => p.product_id == consumptionDTO.ProductId);
                if (product == null)
                    return NotFound();  // Si no se encuentra el producto, devolver 404

                // Validación de disponibilidad de producto
                if (product.availableQuantity <= 0 || product.availableQuantity < consumptionDTO.UsedQuantity)
                    return BadRequest("Product is not available for the requested consumption quantity.");

                // Verificar si ya existe un consumo con el mismo tratamiento y producto
                var existingConsumption = db.consumptions
                    .FirstOrDefault(c => c.treatment_id == consumptionDTO.TreatmentId && c.product_id == consumptionDTO.ProductId);

                if (existingConsumption != null)
                {
                    // Si existe, actualizar la cantidad utilizada
                    existingConsumption.usedQuantity += consumptionDTO.UsedQuantity;
                    existingConsumption.usedDate = DateTime.Now;
                }
                else
                {
                    // Si no existe, crear un nuevo consumo
                    var newConsumption = new consumption
                    {
                        usedDate = DateTime.Now,
                        product_id = consumptionDTO.ProductId,
                        treatment_id = consumptionDTO.TreatmentId,
                        usedQuantity = consumptionDTO.UsedQuantity
                    };
                    db.consumptions.Add(newConsumption);
                }

                // Reducir la cantidad disponible del producto
                product.availableQuantity -= consumptionDTO.UsedQuantity;
                db.SaveChanges();

                return Ok();
            }
        }


        // PUT: api/consumption/{id}
        public IHttpActionResult Put(int id, [FromBody] ConsumptionWithProduct consumptionDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid data.");

            using (DB_CrudLogInEntities db = new DB_CrudLogInEntities(connectionString))
            {
                var existingConsumption = db.consumptions.FirstOrDefault(c => c.id == id);

                if (existingConsumption == null)
                    return NotFound();

                // Buscar el producto que coincide con el nombre
                var product = db.products.FirstOrDefault(p => p.name == consumptionDTO.ProductName);
                if (product == null)
                    return NotFound();

                // Asignar el ID del producto al consumo
                consumptionDTO.ProductId = product.product_id;

                // Validación de disponibilidad de producto
                if (product.availableQuantity + (existingConsumption.usedQuantity ?? 0) < (consumptionDTO.UsedQuantity ?? 0))
                    return BadRequest("Insufficient product quantity available.");

                // Calcular la diferencia en la cantidad utilizada
                int quantityDifference = (existingConsumption.usedQuantity ?? 0) - (consumptionDTO.UsedQuantity ?? 0);

                // Actualizar el consumo
                existingConsumption.usedDate = DateTime.Now;
                existingConsumption.product_id = consumptionDTO.ProductId;
                existingConsumption.treatment_id = consumptionDTO.TreatmentId;
                existingConsumption.usedQuantity = consumptionDTO.UsedQuantity;

                // Actualizar la cantidad disponible del producto
                product.availableQuantity += quantityDifference;

                db.SaveChanges();

                return Ok();
            }
        }


        // DELETE: api/consumption/{id}
        public IHttpActionResult Delete(int id)
        {
            using (DB_CrudLogInEntities db = new DB_CrudLogInEntities(connectionString))
            {
                var consumption = db.consumptions.FirstOrDefault(c => c.id == id);

                if (consumption == null)
                    return NotFound();

                // Restaurar la cantidad disponible del producto antes de eliminar el consumo
                var product = db.products.FirstOrDefault(p => p.product_id == consumption.product_id);
                if (product != null)
                {
                    product.availableQuantity += consumption.usedQuantity;
                    db.SaveChanges();
                }

                db.consumptions.Remove(consumption);
                db.SaveChanges();

                return Ok();
            }
        }
    }
}
