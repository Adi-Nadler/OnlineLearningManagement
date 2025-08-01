using OnlineLearningManagement.API.Middleware;
using OnlineLearningManagement.BL;
using OnlineLearningManagement.DAL.DataSeed;
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
builder.Services.AddCors(options =>
{
	options.AddPolicy("AllowAngular", policy =>
	{
		policy
			.WithOrigins("http://localhost:4200")
			.AllowAnyHeader()
			.AllowAnyMethod();
	});
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseMiddleware<ExceptionHandlingMiddleware>();

// Seed data
using (var scope = app.Services.CreateScope())
{
	var studentRepo = scope.ServiceProvider.GetRequiredService<IRepository<Student>>();
	var courseRepo = scope.ServiceProvider.GetRequiredService<IRepository<Course>>();
	var enrolmentRepo = scope.ServiceProvider.GetRequiredService<IRepository<Enrolment>>();
	InMemoryDataSeeder.Seed(studentRepo, courseRepo, enrolmentRepo);
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAngular");

app.UseAuthorization();

app.MapControllers();

app.Run();
