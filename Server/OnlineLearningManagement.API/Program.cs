using OnlineLearningManagement.API.Middleware;
using OnlineLearningManagement.BL;
using OnlineLearningManagement.DAL.Interfaces;
using OnlineLearningManagement.DAL.Repositories;
using OnlineLearningManagement.Model;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
//In real world, not in-memory repositories would be used, but for simplicity and demonstration purposes, we use in-memory repositories.
//and also transient lifetime for repositories is used.
builder.Services.AddSingleton<IRepository<Student>, InMemoryDictionaryRepository<Student>>();
builder.Services.AddSingleton<IRepository<Course>, InMemoryDictionaryRepository<Course>>();
builder.Services.AddSingleton<IRepository<Enrolment>, InMemoryDictionaryRepository<Enrolment>>();
builder.Services.AddSingleton<CourseService>();
builder.Services.AddSingleton<StudentService>();
builder.Services.AddSingleton<EnrolmentService>();
builder.Services.AddSingleton<ReportService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseMiddleware<ExceptionHandlingMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
