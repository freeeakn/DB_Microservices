package main

import (
	"net/http"

	"github.com/freeeakn/DB_Microservices/auth_service/config"
	"github.com/freeeakn/DB_Microservices/auth_service/handlers"
	"github.com/freeeakn/DB_Microservices/auth_service/middleware"
	"github.com/freeeakn/DB_Microservices/auth_service/repository"
)

func main() {
	config.InitDB()
	defer config.DB.Close()

	userRepo := repository.NewUserRepository(config.DB)
	authHandler := handlers.NewAuthHandler(userRepo)

	http.HandleFunc("/register", authHandler.Register)
	http.HandleFunc("/login", authHandler.Login)
	// Защищенный эндпоинт
	http.HandleFunc("/protected", middleware.AuthMiddleware(func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Добро пожаловать в защищенную зону!"))
	}))

	http.ListenAndServe(":8080", nil)
}
