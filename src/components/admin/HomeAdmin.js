import React from "react"
import styles from "../../styles/admin/HomeAdmin.module.css"
import logo from "../../images/logo.png"
import mtcnn from "../../images/mtcnn.jpg"
import facenet from "../../images/facenet.webp"
import { Link } from "react-router-dom"

function HomeAdmin() {
    return(
        <body>
            <div className={styles.container}>
                <div className={styles.left}>
                    <div className={styles.logoLabel}>
                        <img src={logo} alt="logoLabel" width={'50px'} />
                        <p>Face RecogNition</p>
                    </div>
                    <div><i class="fa-solid fa-user-tie"></i><p style={{fontWeight: 'bold'}}>Welcome</p></div>
                    <div><i class="fa-solid fa-house"></i><Link to="/homeadmin" style={{color: "#000000"}}>Home</Link></div>
                    <div><i class="fa-solid fa-people-group"></i><Link to="/people" style={{color: "#000000"}}>People</Link></div>
                    <div><i class="fa-solid fa-users"></i><Link to="/admin" style={{color: "#000000"}}>Admin</Link></div>
                    <div><i class="fa-solid fa-clock-rotate-left"></i><Link to="/history" style={{color: "#000000"}}>History</Link></div>
                    <div><i class="fa fa-sign-out" aria-hidden="true"></i><Link to="/" style={{color: "#000000"}}>Log out</Link></div>
                </div>
                <div className={styles.right}>
                    <div>
                        <img
                            src="https://candid.technology/wp-content/uploads/2018/12/Biometric-facial-recognition.jpg"
                            alt="Biometric Facial Recognition"
                            style={{ width: '100%', margin: '10pt' }}
                        />
                    </div>
                </div>
            </div>
        </body>
    );
}

export default HomeAdmin;