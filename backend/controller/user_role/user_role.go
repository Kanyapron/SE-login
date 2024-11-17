package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"zooproject/config"
	"zooproject/entity"
	
)

// GET /UserRole
func ListUserRoles(c *gin.Context) {

	var user_role []entity.UserRoles

	db := config.DB()

	db.Find(&user_role)

	c.JSON(http.StatusOK, &user_role)
}