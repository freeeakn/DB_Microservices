IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'auth_db')
BEGIN
    CREATE DATABASE auth_db;
END
GO

USE auth_db;
GO

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'users')
BEGIN
    CREATE TABLE users (
        id INT IDENTITY(1,1) PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
    );
END
GO