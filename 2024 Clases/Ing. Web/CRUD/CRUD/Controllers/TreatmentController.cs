using DB;
using System;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Web.Http;
using Newtonsoft.Json;

namespace CRUD.Controllers
{
    public class TreatmentController : ApiController
    {
        // Constructor para configurar el serializador
        public TreatmentController()
        {
            var jsonFormatter = GlobalConfiguration.Configuration.Formatters.JsonFormatter;
            jsonFormatter.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
        }

        // Cadena de conexión
        private readonly string connectionString = ConfigurationManager.ConnectionStrings["MyConnString"].ConnectionString;

        // GET: api/treatment
        [HttpGet]
        [Route("api/treatment")]
        public IHttpActionResult GetTreatments()
        {
            try
            {
                using (var db = new DB_CrudLogInEntities(connectionString))
                {
                    // Proyección a un modelo anónimo o DTO para evitar problemas de serialización
                    var treatments = db.treatments
                        .Select(t => new
                        {
                            t.id,
                            t.description,
                            t.startDate,
                            t.endDate,
                            t.standardCost,
                            t.standardConsumption,
                            patientName = t.patient.firstName + " " + t.patient.lastName,
                            specialistName = t.specialist.firstName + " " + t.specialist.lastName,
                            t.adminId
                        }).ToList();

                    return Ok(treatments);
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // GET: api/treatment/{id}
        [HttpGet]
        [Route("api/treatment/{id}")]
        public IHttpActionResult GetTreatment(int id)
        {
            try
            {
                using (var db = new DB_CrudLogInEntities(connectionString))
                {
                    var treatment = db.treatments
                        .Where(t => t.id == id)
                        .Select(t => new
                        {
                            t.id,
                            t.description,
                            t.startDate,
                            t.endDate,
                            t.standardCost,
                            t.standardConsumption,
                            patientName = t.patient.firstName + " " + t.patient.lastName,
                            specialistName = t.specialist.firstName + " " + t.specialist.lastName,
                            specialty = db.especialities
                                .Where(s => s.id == t.specialist.especialityId)
                                .Select(s => s.name)
                                .FirstOrDefault(),
                            t.adminId                          
                        })
                        .FirstOrDefault();

                    if (treatment == null)
                    {
                        return NotFound();
                    }

                    return Ok(treatment);
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }


        // POST: api/treatment
        [HttpPost]
        [Route("api/treatment")]
        public IHttpActionResult CreateTreatment([FromBody] treatment treatment)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                using (var db = new DB_CrudLogInEntities(connectionString))
                {
                    db.treatments.Add(treatment);
                    db.SaveChanges();

                    return CreatedAtRoute("DefaultApi", new { id = treatment.id }, treatment);
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // PUT: api/treatment/{id}
        [HttpPut]
        [Route("api/treatment/{id}")]
        public IHttpActionResult UpdateTreatment(int id, [FromBody] treatment treatment)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                using (var db = new DB_CrudLogInEntities(connectionString))
                {
                    var existingTreatment = db.treatments.FirstOrDefault(t => t.id == id);
                    if (existingTreatment == null)
                    {
                        return NotFound();
                    }

                    // Actualizar propiedades
                    existingTreatment.description = treatment.description;
                    existingTreatment.startDate = treatment.startDate;
                    existingTreatment.endDate = treatment.endDate;
                    existingTreatment.standardCost = treatment.standardCost;
                    existingTreatment.standardConsumption = treatment.standardConsumption;
                    existingTreatment.patientId = treatment.patientId;
                    existingTreatment.specialistId = treatment.specialistId;
                    existingTreatment.adminId = treatment.adminId;

                    db.SaveChanges();

                    return Ok(existingTreatment);
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // DELETE: api/treatment/{id}
        [HttpDelete]
        [Route("api/treatment/{id}")]
        public IHttpActionResult DeleteTreatment(int id)
        {
            try
            {
                using (var db = new DB_CrudLogInEntities(connectionString))
                {
                    var treatment = db.treatments.FirstOrDefault(t => t.id == id);
                    if (treatment == null)
                    {
                        return NotFound();
                    }

                    var consumptions = db.consumptions.Where(c => c.treatment_id == id).ToList();

                    foreach (var consumption in consumptions)
                    {
                        var product = db.products.FirstOrDefault(p => p.product_id == consumption.product_id);
                        if (product != null)
                        {
                            product.availableQuantity += consumption.usedQuantity;
                        }

                        db.consumptions.Remove(consumption);
                    }

                    db.SaveChanges();

                    db.treatments.Remove(treatment);
                    db.SaveChanges();

                    return Ok($"Treatment with ID {id} and its related consumptions were deleted successfully.");
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}
