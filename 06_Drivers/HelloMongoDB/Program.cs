using MongoDB.Driver;

var mongoUrl = new MongoUrl("mongodb+srv://myAtlasDBUser:myatlas-001@myatlasclusteredu.akxkn.mongodb.net/?retryWrites=true&w=majority&appName=myAtlasClusterEDU");
var client = new MongoClient(mongoUrl);

var dbList = client.ListDatabaseNames().ToList();
// var database = client.GetDatabase("sample_training");

Console.WriteLine("The list of databases are:");
foreach (var item in dbList)
{
    Console.WriteLine(item);
}

// See https://aka.ms/new-console-template for more information
// Console.WriteLine("Hello, World!");

