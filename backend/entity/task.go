package entity

import(
	"time"
	"gorm.io/gorm"
)

type Tasks struct{
	gorm.Model
	TaskName	string
	TaskStert	time.Time
	TaskEnd		time.Time
}