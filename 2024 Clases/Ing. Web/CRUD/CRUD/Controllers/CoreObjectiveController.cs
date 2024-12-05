using DB;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.Linq;
using System.Web.Http;

namespace CRUD.Controllers
{
    public class CoreObjectiveController : ApiController
    {
        string connectionString = ConfigurationManager.ConnectionStrings["MyConnString"].ConnectionString;

        [HttpGet]
        [Route("api/efficiency")]
        public IHttpActionResult GetEfficiencyBySpecialty()
        {
            try
            {
                using (var db = new DB_CrudLogInEntities(connectionString))
                {
                    var results = new List<object>();

                    foreach (var specialty in db.especialities)
                    {
                        decimal? budget = specialty.budget;

                        decimal? totalConsumption = 0;
                        foreach (var treatment in db.treatments)
                        {
                            foreach (var consumption in db.consumptions)
                            {
                                if (consumption.treatment_id == treatment.id && db.specialists.Any(s => s.id == treatment.specialistId && s.especialityId == specialty.id))
                                {
                                    var product = db.products.FirstOrDefault(p => p.product_id == consumption.product_id);
                                    if (product != null)
                                    {
                                        decimal? consumptionValue = (consumption.usedQuantity * product.price) / budget;
                                        totalConsumption += consumptionValue;
                                    }
                                }
                            }
                        }

                        bool exceededBudget = totalConsumption > budget;

                        var specialists = db.specialists.Where(s => s.especialityId == specialty.id).ToList();
                        string mostEfficientSpecialistName = "N/A";
                        decimal? highestEfficiency = 0;

                        foreach (var specialist in specialists)
                        {
                            decimal? totalEfficiency = 0;
                            int treatmentCount = 0;

                            foreach (var treatment in db.treatments.Where(t => t.specialistId == specialist.id))
                            {
                                decimal? treatmentEfficiency = 0;
                                foreach (var consumption in db.consumptions.Where(c => c.treatment_id == treatment.id))
                                {
                                    var product = db.products.FirstOrDefault(p => p.product_id == consumption.product_id);
                                    if (product != null)
                                    {
                                        if (treatment.startDate.HasValue && treatment.endDate.HasValue && treatment.startDate.Value < treatment.endDate.Value)
                                        {
                                            var treatmentDuration = (decimal)(treatment.endDate.Value - treatment.startDate.Value).TotalHours;
                                            treatmentEfficiency += (product.price * consumption.usedQuantity) / treatmentDuration;
                                        }
                                    }
                                }

                                if (treatmentEfficiency > 0)
                                {
                                    totalEfficiency += treatmentEfficiency;
                                    treatmentCount++;
                                }
                            }

                            decimal? averageEfficiency = treatmentCount > 0 ? totalEfficiency / treatmentCount : 0;

                            if (averageEfficiency > highestEfficiency)
                            {
                                highestEfficiency = averageEfficiency;
                                mostEfficientSpecialistName = $"{specialist.firstName} {specialist.lastName}";
                            }
                        }


                        results.Add(new
                        {
                            SpecialtyId = specialty.id,
                            SpecialtyName = specialty.name,
                            TotalConsumption = totalConsumption,
                            Budget = budget,
                            ExceededBudget = exceededBudget,
                            MostEfficientSpecialist = mostEfficientSpecialistName,
                            EfficiencyScore = highestEfficiency
                        });
                    }

                    return Ok(results);
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }


        [HttpGet]
        [Route("api/specialties/consumptions")]
        public IHttpActionResult GetSpecialistsConsumptionsBySpecialty(DateTime startDate, DateTime endDate)
        {
            try
            {
                using (var db = new DB_CrudLogInEntities(connectionString))
                {
                    var results = new List<object>();

                    foreach (var specialty in db.especialities)
                    {
                        decimal? monthlyBudget = specialty.budget;

                        // Calcular el número de días del mes de startDate
                        var daysInMonth = DateTime.DaysInMonth(startDate.Year, startDate.Month);
                        var validStartDate = startDate < new DateTime(startDate.Year, startDate.Month, 1)
                                            ? new DateTime(startDate.Year, startDate.Month, 1)
                                            : startDate;
                        var validEndDate = endDate > new DateTime(startDate.Year, startDate.Month, daysInMonth)
                                          ? new DateTime(startDate.Year, startDate.Month, daysInMonth)
                                          : endDate;

                        var daysInRange = (validEndDate - validStartDate).TotalDays + 1; // +1 para incluir ambos días
                        decimal? adjustedBudget = (monthlyBudget * (decimal)daysInRange) / daysInMonth;

                        var specialistsData = new List<object>();

                        var specialists = db.specialists.Where(s => s.especialityId == specialty.id).ToList();
                        foreach (var specialist in specialists)
                        {
                            decimal? totalConsumption = 0;

                            foreach (var treatment in db.treatments.Where(t => t.specialistId == specialist.id))
                            {
                                foreach (var consumption in db.consumptions
                                    .Where(c => c.treatment_id == treatment.id &&
                                                c.usedDate >= startDate && c.usedDate <= endDate)) // Filtrar por rango de fechas
                                {
                                    var product = db.products.FirstOrDefault(p => p.product_id == consumption.product_id);
                                    if (product != null && product.availableQuantity > 0)
                                    {
                                        decimal? consumptionValue = (consumption.usedQuantity * product.price) / adjustedBudget;

                                        totalConsumption += consumptionValue;
                                    }
                                }
                            }

                            specialistsData.Add(new
                            {
                                SpecialistId = specialist.id,
                                SpecialistName = $"{specialist.firstName} {specialist.lastName}",
                                TotalConsumption = totalConsumption
                            });
                        }

                        results.Add(new
                        {
                            SpecialtyId = specialty.id,
                            SpecialtyName = specialty.name,
                            AdjustedBudget = adjustedBudget,
                            Specialists = specialistsData
                        });
                    }

                    return Ok(results);
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }

    }
