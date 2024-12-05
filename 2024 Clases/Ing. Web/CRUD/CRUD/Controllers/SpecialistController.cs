using DB;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Web.Http;

namespace CRUD.Controllers
{
    public class SpecialistController : ApiController
    {
        string connectionString = ConfigurationManager.ConnectionStrings["MyConnString"].ConnectionString;

        // GET: api/specialist
        public IEnumerable<SpecialistWithSpeciality> Get()
        {
            using (DB_CrudLogInEntities db = new DB_CrudLogInEntities(connectionString))
            {
                var specialistWithSpeciality = from specialist in db.specialists
                                               join especiality in db.especialities on specialist.especialityId equals especiality.id
                                               select new SpecialistWithSpeciality
                                               {
                                                   Id = specialist.id,
                                                   Code = specialist.code,
                                                   FirstName = specialist.firstName,
                                                   LastName = specialist.lastName,
                                                   Password = specialist.password,
                                                   BirthDate = specialist.birthDate,
                                                   Especiality = especiality.name,
                                                   Efficiency = specialist.efficiency,
                                               };

                return specialistWithSpeciality.ToList();
            }
        }

        // GET: api/specialist/{id}
        public IHttpActionResult Get(int id)
        {
            if (id <= 0)
                return BadRequest("ID de especialista inválido.");

            using (DB_CrudLogInEntities db = new DB_CrudLogInEntities(connectionString))
            {
                var specialistWithSpeciality = (from specialist in db.specialists
                                                join especiality in db.especialities on specialist.especialityId equals especiality.id
                                                where specialist.id == id
                                                select new SpecialistWithSpeciality
                                                {
                                                    Id = specialist.id,
                                                    Code = specialist.code,
                                                    FirstName = specialist.firstName,
                                                    LastName = specialist.lastName,
                                                    Password = specialist.password,
                                                    BirthDate = specialist.birthDate,
                                                    Especiality = especiality.name,
                                                    Efficiency = specialist.efficiency,
                                                }).FirstOrDefault();

                if (specialistWithSpeciality == null)
                    return NotFound();

                return Ok(specialistWithSpeciality);
            }
        }

        // Método para validar la contraseña
        private bool IsValidPassword(string password)
        {
            var passwordRegex = new Regex(@"^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$");
            return passwordRegex.IsMatch(password);
        }

        // Método para validar que el especialista sea mayor de 18 años
        private bool IsOfLegalAge(DateTime birthDate)
        {
            var age = DateTime.Today.Year - birthDate.Year;
            if (birthDate > DateTime.Today.AddYears(-age)) age--;
            return age >= 18;
        }

        // POST: api/specialist
        public IHttpActionResult Post([FromBody] specialist newSpecialist)
        {
            if (!ModelState.IsValid || newSpecialist == null)
                return BadRequest("Datos de especialista inválidos.");

            if (!IsValidPassword(newSpecialist.password))
                return BadRequest("La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número.");

            if (!IsOfLegalAge(newSpecialist.birthDate))
                return BadRequest("El especialista debe ser mayor de 18 años.");

            using (DB_CrudLogInEntities db = new DB_CrudLogInEntities(connectionString))
            {
                if (db.specialists.Any(s => s.code == newSpecialist.code))
                    return BadRequest("Ya existe un especialista con el mismo código.");

                db.specialists.Add(newSpecialist);
                db.SaveChanges();
            }

            return CreatedAtRoute("DefaultApi", new { id = newSpecialist.id }, newSpecialist);
        }

        // PUT: api/specialist/{id}
        public IHttpActionResult Put(int id, [FromBody] SpecialistWithSpeciality specialist)
        {
            if (!ModelState.IsValid || specialist == null)
                return BadRequest("Datos de especialista inválidos.");

            if (!IsValidPassword(specialist.Password))
                return BadRequest("La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número.");

            if (!IsOfLegalAge(specialist.BirthDate))
                return BadRequest("El especialista debe ser mayor de 18 años.");

            using (DB_CrudLogInEntities db = new DB_CrudLogInEntities(connectionString))
            {
                var existingSpecialist = db.specialists.Find(id);
                if (existingSpecialist == null)
                    return NotFound();

                existingSpecialist.code = specialist.Code;
                existingSpecialist.firstName = specialist.FirstName;
                existingSpecialist.lastName = specialist.LastName;
                existingSpecialist.password = specialist.Password;
                existingSpecialist.birthDate = specialist.BirthDate;
                existingSpecialist.efficiency = specialist.Efficiency;

                var especialidad = db.especialities.FirstOrDefault(e => e.name == specialist.Especiality);
                if (especialidad == null)
                    return NotFound();

                existingSpecialist.especialityId = especialidad.id;

                db.SaveChanges();

                return StatusCode(HttpStatusCode.NoContent);
            }
        }

        // DELETE: api/specialist/{id}
        public IHttpActionResult Delete(int id)
        {
            if (id <= 0)
                return BadRequest("ID de especialista inválido.");

            using (DB_CrudLogInEntities db = new DB_CrudLogInEntities(connectionString))
            {
                var existingSpecialist = db.specialists.Find(id);
                if (existingSpecialist == null)
                    return NotFound();

                db.specialists.Remove(existingSpecialist);
                db.SaveChanges();

                return Ok(existingSpecialist);
            }
        }




        [HttpGet]
        [Route("api/specialist/GetSpecialistsOfEspeciality/{id}")]
        public IHttpActionResult GetSpecialistsOfEspeciality(int id)
        {
            using (DB_CrudLogInEntities db = new DB_CrudLogInEntities(connectionString))
            {
                // Obtener especialistas filtrados por especialidad
                var specialists = db.specialists
                    .Where(s => s.especialityId == id)
                    .Select(s => new
                    {
                        s.id,
                        s.firstName,
                        s.lastName,
                        s.especialityId,
                        SpecialityName = s.especiality.name
                    })
                    .ToList();

                // Verificar si hay resultados
                if (specialists == null || !specialists.Any())
                    return NotFound();

                return Ok(specialists);
            }
        }



        [HttpGet]
        [Route("api/specialist/GetSpecialistsOfEspecialityByName/{name}")]
        public IHttpActionResult GetSpecialistsOfEspecialityByName(string name)
        {
            using (DB_CrudLogInEntities db = new DB_CrudLogInEntities(connectionString))
            {
                var speciality = db.especialities.FirstOrDefault(s => s.name.Equals(name, StringComparison.OrdinalIgnoreCase));

                if (speciality == null)
                {
                    return NotFound();  
                }

                var specialists = db.specialists
                    .Where(s => s.especialityId == speciality.id)
                    .Select(s => new
                    {
                        s.id,
                        s.firstName,
                        s.lastName,
                        s.especialityId,
                        SpecialityName = speciality.name
                    })
                    .ToList();

                if (specialists == null || !specialists.Any())
                    return NotFound();  

                return Ok(specialists); 
            }
        }




    }
}
