package repository

import (
	"database/sql"
	"errors"
	"log"

	"github.com/freeeakn/DB_Microservices/auth_service/models"

	"golang.org/x/crypto/bcrypt"
)

type UserRepository struct {
	db *sql.DB
}

func NewUserRepository(db *sql.DB) *UserRepository {
	return &UserRepository{db: db}
}

func (r *UserRepository) GetUserByUsername(username string) (*models.User, error) {
	var user models.User
	err := r.db.QueryRow("SELECT id, username, password FROM users WHERE username = @username",
		sql.Named("username", username)).Scan(&user.ID, &user.Username, &user.Password)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, errors.New("пользователь не найден")
		}
		return nil, err
	}
	return &user, nil
}

func (r *UserRepository) CreateUser(user *models.User) error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	_, err = r.db.Exec("INSERT INTO users (username, password) VALUES (@username, @password)",
		sql.Named("username", user.Username), sql.Named("password", hashedPassword))
	if err != nil {
		log.Printf("SQL error: %v", err)
		return err
	}
	return err
}
