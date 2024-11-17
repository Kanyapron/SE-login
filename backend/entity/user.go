package entity

import (
	"time"
	"gorm.io/gorm"
)

type Users struct{
	gorm.Model
	Username	string
	FirstName	string
	LastName	string
	Email		string
	Password	string
	BirthDay	time.Time 
	Profilepic	string	`gorm:"type:longtext"`

	GenderID	uint	`json:"gender_id"`	
	Gender		*Genders `gorm:"foreignKey: gender_id" json:"gender"`
	
	UserRoleID	uint	`gorm:"userrole_id"`
	UserRole	*UserRoles	`gorm:"foreignKey: userrole_id" `

	

}
