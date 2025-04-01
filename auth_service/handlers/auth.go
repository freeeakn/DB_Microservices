package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/freeeakn/DB_Microservices/auth_service/config"
	"github.com/freeeakn/DB_Microservices/auth_service/models"
	"github.com/freeeakn/DB_Microservices/auth_service/repository"
	"github.com/go-playground/validator/v10"
	"golang.org/x/crypto/bcrypt"
)

type AuthHandler struct {
	userRepo  *repository.UserRepository
	validator *validator.Validate
}

func NewAuthHandler(userRepo *repository.UserRepository) *AuthHandler {
	return &AuthHandler{
		userRepo:  userRepo,
		validator: validator.New(),
	}
}

func (h *AuthHandler) Register(w http.ResponseWriter, r *http.Request) {
	var user models.User
	log.Printf("Received register request: %v", r.Body)
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		log.Printf("Error decoding request body: %v", err)
		http.Error(w, "Некорректный запрос", http.StatusBadRequest)
		return
	}
	log.Printf("Decoded user: %+v", user)

	// Валидация входных данных
	if err := h.validator.Struct(user); err != nil {
		log.Printf("Error creating user: %v", err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if err := h.userRepo.CreateUser(&user); err != nil {
		log.Printf("Error creating user: %v", err)
		http.Error(w, "Ошибка создания пользователя", http.StatusInternalServerError)
		return
	}

	log.Printf("User created successfully: %+v", user)

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(user)
}

func (h *AuthHandler) Login(w http.ResponseWriter, r *http.Request) {
	var creds models.LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&creds); err != nil {
		http.Error(w, "Некорректный запрос", http.StatusBadRequest)
		return
	}

	// Валидация входных данных
	if err := h.validator.Struct(creds); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	user, err := h.userRepo.GetUserByUsername(creds.Username)
	if err != nil {
		http.Error(w, "Неверные учетные данные", http.StatusUnauthorized)
		return
	}

	// Проверка пароля
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(creds.Password)); err != nil {
		http.Error(w, "Неверные учетные данные", http.StatusUnauthorized)
		return
	}

	// Генерация JWT
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": user.Username,
		"exp":      time.Now().Add(time.Hour * 24).Unix(),
	})
	tokenString, err := token.SignedString([]byte(config.JWTSecret))
	if err != nil {
		http.Error(w, "Ошибка генерации токена", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"token": tokenString})
}
