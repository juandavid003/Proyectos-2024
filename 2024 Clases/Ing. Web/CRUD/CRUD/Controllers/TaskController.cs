using DB;
using Microsoft.AspNetCore.Cors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Configuration;


namespace CRUD.Controllers
{


    public class TaskController : ApiController
    {
        string connectionString = ConfigurationManager.ConnectionStrings["MyConnString"].ConnectionString;


        // GET: api/Task
        public IEnumerable<tarea> Get()
        {
            using (DB_CrudLogInEntities db = new DB_CrudLogInEntities(connectionString))
            {
                return db.tareas.ToList();
            }
        }

        // GET: api/Task/5
        public IHttpActionResult Get(int id)
        {
            using (DB_CrudLogInEntities db = new DB_CrudLogInEntities(connectionString))
            {
                var task = db.tareas.FirstOrDefault(t => t.task_id == id);
                if (task == null)
                {
                    return NotFound();
                }
                return Ok(task);
            }
        }

        // POST: api/Task
        public IHttpActionResult Post([FromBody] tarea newTask)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            using (DB_CrudLogInEntities db = new DB_CrudLogInEntities(connectionString))
            {
                db.tareas.Add(newTask);
                db.SaveChanges();
            }

            return CreatedAtRoute("DefaultApi", new { id = newTask.task_id }, newTask);
        }

        // PUT: api/Task/5
        public IHttpActionResult Put(int id, [FromBody] tarea updatedTask)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            using (DB_CrudLogInEntities db = new DB_CrudLogInEntities(connectionString))
            {
                var existingTask = db.tareas.FirstOrDefault(t => t.task_id == id);
                if (existingTask == null)
                {
                    return NotFound();
                }

                existingTask.taskname = updatedTask.taskname;
                existingTask.start_date = updatedTask.start_date;
                existingTask.estimated_time = updatedTask.estimated_time;
                existingTask.employee = updatedTask.employee;
                existingTask.project = updatedTask.project;

                db.SaveChanges();
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // DELETE: api/Task/5
        public IHttpActionResult Delete(int id)
        {
            using (DB_CrudLogInEntities db = new DB_CrudLogInEntities(connectionString))
            {
                var task = db.tareas.FirstOrDefault(t => t.task_id == id);
                if (task == null)
                {
                    return NotFound();
                }

                db.tareas.Remove(task);
                db.SaveChanges();
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        [HttpGet]
        [Route("api/task/searchByDate")]
        public IHttpActionResult GetTasksByDate([FromUri] DateTime startDate, [FromUri] DateTime endDate)
        {
            using (DB_CrudLogInEntities db = new DB_CrudLogInEntities(connectionString))
            {
                var tasks = db.tareas
                    .Where(t => t.start_date >= startDate && t.start_date <= endDate)
                    .ToList();

                if (!tasks.Any())
                {
                    return NotFound();
                }

                return Ok(tasks);
            }
        }


    }
}
