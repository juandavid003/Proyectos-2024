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
    public class PatientController : ApiController
    {
        string connectionString = ConfigurationManager.ConnectionStrings["MyConnString"].ConnectionString;

        // GET: api/patient
        public IEnumerable<Patient> Get()
        {
            using (DB_CrudLogInEntities db = new DB_CrudLogInEntities(connectionString))
            {
                var patients = from patient in db.patients
                               select new Patient
                               {
                                   id = patient.id,
                                   code = patient.code,
                                   firstName = patient.firstName,
                                   lastName = patient.lastName,
                                   birthDate = patient.birthDate,
                                   CI = patient.CI,
                                   medicalHistory = patient.medicalHistory
                               };

                return patients.ToList();
            }
        }

        // GET: api/patient/{id}
        public IHttpActionResult Get(int id)
        {
            using (DB_CrudLogInEntities db = new DB_CrudLogInEntities(connectionString))
            {
                var patient = db.patients.FirstOrDefault(p => p.id == id);
                if (patient == null)
                {
                    return NotFound();
                }

                return Ok(new Patient
                {
                    id = patient.id,
                    code = patient.code,
                    firstName = patient.firstName,
                    lastName = patient.lastName,
                    birthDate = patient.birthDate,
                    CI = patient.CI,
                    medicalHistory = patient.medicalHistory
                });
            }
        }

        // POST: api/patient
        public IHttpActionResult Post([FromBody] Patient newPatient)
        {
            if (newPatient == null)
            {
                return BadRequest("Invalid patient data.");
            }

            // Validar que la cédula sea válida
            if (!IsValidEcuadorianCI(newPatient.CI?.ToString()))
            {
                return BadRequest("Invalid Ecuadorian ID (CI).");
            }

            using (DB_CrudLogInEntities db = new DB_CrudLogInEntities(connectionString))
            {
                var patient = new patient
                {
                    code = newPatient.code,
                    firstName = newPatient.firstName,
                    lastName = newPatient.lastName,
                    birthDate = newPatient.birthDate,
                    CI = newPatient.CI,
                    medicalHistory = newPatient.medicalHistory
                };

                db.patients.Add(patient);
                db.SaveChanges();

                return Created($"api/patient/{patient.id}", patient);
            }
        }

        // Método para validar cédula ecuatoriana
        private bool IsValidEcuadorianCI(string ci)
        {
            if (string.IsNullOrEmpty(ci) || ci.Length != 10)
                return false;

            // Verificar que sean solo números
            if (!ci.All(char.IsDigit))
                return false;

            int provinceCode = int.Parse(ci.Substring(0, 2));
            int thirdDigit = int.Parse(ci.Substring(2, 1));

            // Validar provincia y tercer dígito
            if (provinceCode < 1 || provinceCode > 24 && provinceCode != 30)
                return false;
            if (thirdDigit >= 6)
                return false;

            // Calcular el dígito verificador
            int[] coeficients = { 2, 1, 2, 1, 2, 1, 2, 1, 2 }; // Coeficientes para el cálculo
            int total = 0;

            for (int i = 0; i < 9; i++)
            {
                int digit = int.Parse(ci[i].ToString()) * coeficients[i];
                total += digit >= 10 ? digit - 9 : digit;
            }

            int verifier = 10 - (total % 10);
            if (verifier == 10)
                verifier = 0;

            return verifier == int.Parse(ci[9].ToString());
        }

        // PUT: api/patient/{id}
        // PUT: api/patient/{id}
        public IHttpActionResult Put(int id, [FromBody] Patient updatedPatient)
        {
            if (updatedPatient == null)
            {
                return BadRequest("Invalid patient data.");
            }

            if (!IsValidEcuadorianCI(updatedPatient.CI?.ToString()))
            {
                return BadRequest("Invalid Ecuadorian ID (CI).");
            }

            using (DB_CrudLogInEntities db = new DB_CrudLogInEntities(connectionString))
            {
                var existingPatient = db.patients.FirstOrDefault(p => p.id == id);
                if (existingPatient == null)
                {
                    return NotFound();
                }

                existingPatient.code = updatedPatient.code;
                existingPatient.firstName = updatedPatient.firstName;
                existingPatient.lastName = updatedPatient.lastName;
                existingPatient.birthDate = updatedPatient.birthDate;
                existingPatient.CI = updatedPatient.CI;
                existingPatient.medicalHistory = updatedPatient.medicalHistory;

                db.SaveChanges();
                return Ok(existingPatient);
            }
        }

        // DELETE: api/patient/{id}
        public IHttpActionResult Delete(int id)
        {
            using (DB_CrudLogInEntities db = new DB_CrudLogInEntities(connectionString))
            {
                var patient = db.patients.FirstOrDefault(p => p.id == id);
                if (patient == null)
                {
                    return NotFound();
                }

                db.patients.Remove(patient);
                db.SaveChanges();
                return Ok();
            }
        }
    }
}
