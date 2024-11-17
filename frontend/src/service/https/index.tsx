import { LoginInterface } from "../../interface/Login";
import axios from "axios";
//import { Task } from "../../interfaces/task";

const apiUrl = "http://localhost:8000";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  const tokenType = localStorage.getItem("token_type");
  return {
    "Authorization": `${tokenType} ${token}`,
    "Content-Type": "application/json",
  };
}

const requestOptions = {
  headers: getAuthHeaders(),
};
async function SignIn(data: LoginInterface) {
  return await axios
    .post(`${apiUrl}/login`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

// Export ฟังก์ชันทั้งหมด
export { SignIn };
