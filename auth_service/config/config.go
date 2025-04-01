package config

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/denisenkom/go-mssqldb"
)

var DB *sql.DB

var JWTSecret = os.Getenv("JWT_KEY")

func InitDB() {
	var err error
	connString := fmt.Sprintf("server=%s;user id=%s;password=%s;database=%s;port=%d",
		os.Getenv("DB_HOST"),     // "db"
		os.Getenv("DB_USER"),     // "sa"
		os.Getenv("DB_PASSWORD"), // "YourStrong@Passw0rd"
		os.Getenv("DB_NAME"),     // "auth_db"
		1433,
	)
	DB, err = sql.Open("sqlserver", connString)
	if err != nil {
		log.Fatal("Ошибка подключения к базе данных: ", err.Error())
	}
	fmt.Println("Успешное подключение к MSSQL")
}
