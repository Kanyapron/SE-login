package config

import (
	"fmt"
	"log"
	"os"
	"time"
	"zooproject/entity"

	"github.com/joho/godotenv"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func ConnectionDB() {
	database, err := gorm.Open(sqlite.Open("thezoo.db?cache=shared"), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	fmt.Println("connected database")
	db = database
}

func getSecretKey() string{
	// โหลดไฟล์ .env
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	// คืนค่าคีย์ที่เข้ารหัส
	return os.Getenv("MY_SECRET_KEY")
}

func SetupDatabase() error{
	db.AutoMigrate(
		&entity.Users{},
		&entity.Genders{},
		&entity.UserRoles{},
	)

	GenderMale := entity.Genders{Gender: "Male"}
	GenderFemale := entity.Genders{Gender: "Female"}

	db.FirstOrCreate(&GenderMale, &entity.Genders{Gender: "Male"})
	db.FirstOrCreate(&GenderFemale, &entity.Genders{Gender: "Female"})

	AdminRole := entity.UserRoles{RoleName: "Admin"}
	ZookeeperRole := entity.UserRoles{RoleName: "Zookeeper"}
	VeterinarianRole := entity.UserRoles{RoleName: "Veterinarian"}

	db.FirstOrCreate(&AdminRole, &entity.UserRoles{RoleName: "Admin"})
	db.FirstOrCreate(&ZookeeperRole, &entity.UserRoles{RoleName: "Zookeeper"})
	db.FirstOrCreate(&VeterinarianRole, &entity.UserRoles{RoleName: "Veterinarian"})

	birthDayStr,_ := time.Parse("1999-01-01","1999-01-01")

	AdminUser := &entity.Users{
		Username:	"AdminKanny",
		FirstName:	"Kanny",
		LastName:	"Kd",	
		Email:		"admin@thezoo.com",
		Password:	"123456",	
		BirthDay:	birthDayStr,	
		Profilepic:	"",
		UserRoleID: 1,
		GenderID: 	2,		
	}
	db.FirstOrCreate(AdminUser, &entity.Users{Email: "admin@thezoo.com"})

	ZookeeperUser := &entity.Users{
		Username:	"ZookeeperMax",
		FirstName:	"Max",
		LastName:	"Verstappen",	
		Email:		"zookeeper@thezoo.com",
		Password:	"123456",	
		BirthDay:	birthDayStr,	
		Profilepic:	"",
		UserRoleID: 2,
		GenderID: 	1,	
	}
	db.FirstOrCreate(ZookeeperUser, &entity.Users{Email: "zookeeper@thezoo.com"})

	VeterinarianUser := &entity.Users{
		Username:	"VeterinarianOliver",
		FirstName:	"Oliver",
		LastName:	"Berman",	
		Email:		"veterinarian@thezoo.com",
		Password:	"123456",	
		BirthDay:	birthDayStr,	
		Profilepic:	"",
		UserRoleID: 3,
		GenderID: 	1,
	}
	db.FirstOrCreate(VeterinarianUser, &entity.Users{Email: "veterinarian@thezoo.com"})
	return nil
}