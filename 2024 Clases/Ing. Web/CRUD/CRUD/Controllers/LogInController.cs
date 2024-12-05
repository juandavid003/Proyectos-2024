using DB;
using Microsoft.AspNetCore.Cors;
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
    public class LogInController : ApiController
    {
        string connectionString = ConfigurationManager.ConnectionStrings["MyConnString"].ConnectionString;

        // GET: api/LogIn
        public IEnumerable<UserWithRoleDto> Get()
        {
            using (DB_CrudLogInEntities db = new DB_CrudLogInEntities(connectionString))
            {
                var usersWithRoles = from user in db.users
                                     join role in db.roles on user.roleId equals role.id
                                     select new UserWithRoleDto
                                     {
                                         Id = user.id,
                                         FirstName = user.firstName,
                                         LastName = user.lastName,
                                         BirthDate = user.birthDate,
                                         RoleName = role.name,
                                         CreatedAt = user.createdAt,
                                         UpdatedAt = user.updatedAt,
                                         Password = user.password,
                                         Status = user.status,
                                     };

                return usersWithRoles.ToList();
            }
        }

        public IHttpActionResult Get(int id)
        {
            using (DB_CrudLogInEntities db = new DB_CrudLogInEntities(connectionString))
            {
                var usuario = (from user in db.users
                               join role in db.roles on user.roleId equals role.id
                               where user.id == id
                               select new UserWithRoleDto
                               {
                                   Id = user.id,
                                   FirstName = user.firstName,
                                   LastName = user.lastName,
                                   BirthDate = user.birthDate,
                                   RoleName = role.name,
                                   CreatedAt = user.createdAt,
                                   UpdatedAt = user.updatedAt,
                                   Password = user.password,
                                   Status = user.status,
                               }).FirstOrDefault();

                if (usuario == null)
                {
                    return NotFound();
                }
                return Ok(usuario);
            }
        }

        // Método para validar la contraseña
        private bool IsValidPassword(string password)
        {
            var passwordRegex = new Regex(@"^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$");
            return passwordRegex.IsMatch(password);
        }

        // Método para validar el estado del usuario
        private bool IsValidStatus(string status)
        {
            return status == "Active" || status == "Inactive";
        }

        // Método para validar el nombre
        private bool IsValidName(string name)
        {
            return !string.IsNullOrWhiteSpace(name) && name.Length >= 2;
        }

        // Método para verificar si el usuario es mayor de 18 años
        private bool IsAdult(DateTime birthDate)
        {
            var today = DateTime.Today;
            var age = today.Year - birthDate.Year;
            if (birthDate > today.AddYears(-age)) age--;
            return age >= 18;
        }

        public IHttpActionResult Post([FromBody] user newUser)
        {
            if (!ModelState.IsValid || newUser == null)
                return BadRequest("Datos de usuario inválidos.");

            if (!IsAdult(newUser.birthDate))
                return BadRequest("El usuario debe ser mayor de 18 años.");

            if (!IsValidPassword(newUser.password))
                return BadRequest("La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número.");

            if (!IsValidStatus(newUser.status))
                return BadRequest("El estado del usuario debe ser 'Active' o 'Inactive'.");

            if (!IsValidName(newUser.firstName) || !IsValidName(newUser.lastName))
                return BadRequest("El nombre y apellido deben tener al menos 2 caracteres.");

            using (DB_CrudLogInEntities db = new DB_CrudLogInEntities(connectionString))
            {
                db.users.Add(newUser);
                db.SaveChanges();
            }

            return CreatedAtRoute("DefaultApi", new { id = newUser.id }, newUser);
        }

        public IHttpActionResult Put(int id, [FromBody] user updatedUser)
        {
            if (!ModelState.IsValid || updatedUser == null)
                return BadRequest("Datos de usuario inválidos.");

            if (!IsAdult(updatedUser.birthDate))
                return BadRequest("El usuario debe ser mayor de 18 años.");

            if (!IsValidPassword(updatedUser.password))
                return BadRequest("La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número.");

            if (!IsValidStatus(updatedUser.status))
                return BadRequest("El estado del usuario debe ser 'Active' o 'Inactive'.");

            if (!IsValidName(updatedUser.firstName) || !IsValidName(updatedUser.lastName))
                return BadRequest("El nombre y apellido deben tener al menos 2 caracteres.");

            using (DB_CrudLogInEntities db = new DB_CrudLogInEntities(connectionString))
            {
                var existingUser = db.users.FirstOrDefault(u => u.id == id);
                if (existingUser == null)
                    return NotFound();

                existingUser.firstName = updatedUser.firstName;
                existingUser.lastName = updatedUser.lastName;
                existingUser.password = updatedUser.password;
                existingUser.birthDate = updatedUser.birthDate;
                existingUser.roleId = updatedUser.roleId;
                existingUser.updatedAt = updatedUser.updatedAt;
                existingUser.createdAt = updatedUser.createdAt;
                existingUser.status = updatedUser.status;

                db.SaveChanges();
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        public IHttpActionResult Delete(int id)
        {
            using (DB_CrudLogInEntities db = new DB_CrudLogInEntities(connectionString))
            {
                var usuario = db.users.FirstOrDefault(u => u.id == id);
                if (usuario == null)
                    return NotFound();

                db.users.Remove(usuario);
                db.SaveChanges();
            }

            return StatusCode(HttpStatusCode.NoContent);
        }
    }
}
