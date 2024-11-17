import { Button} from 'antd';
import { Link } from 'react-router-dom';
function Zookeep() {

    const handleLogout = () => {
        localStorage.removeItem('isLogin');
        localStorage.removeItem('userRole');
        window.location.href = "/login"; 
    };

    return (
      <div>
          <h1 style={{fontSize: "60px"}}>User</h1>  
          <Link to = "/" onClick={handleLogout}>
            <Button type="primary" htmlType="submit" shape="default" style={{ marginLeft: '0px', backgroundColor: '#f7b22c', width: '500px', height: '55px' }}>
                <p style={{ color: 'black', fontSize: '40px', margin: 0 }}>LOG OUT</p>
            </Button> 
          </Link> 
      </div>
    );
  }
  
  export default Zookeep;
  