import React, { useEffect, useState } from "react"
import styles from "../../styles/admin/History.module.css"
import logo from "../../images/logo.png"
import { Link } from "react-router-dom"
import axios from "axios"

function History() {
    const [admins, setAdmins] = useState([])
    useEffect(() => {
        axios.get('http://localhost:4000/getHistory')
        .then(history => setAdmins(history.data))
        .catch(e => console.log(e))
    }, [])

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
                    <div><i class="fa-solid fa-clock-rotate-left"></i><Link style={{color: "#000000"}}>History</Link></div>
                    <div><i class="fa fa-sign-out" aria-hidden="true"></i><Link to="/" style={{color: "#000000"}}>Log out</Link></div>
                </div>
                <div className={styles.right}>
                    <div className={styles.tbl}>
                        <table class="table">
                            <thead>
                                <tr>
                                <th scope="col">Tên Người Dùng</th>
                                <th scope="col">Thời gian</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    admins.map(history => {
                                        return <tr>
                                                <td>{history.name}</td>
                                                <td>{history.time}</td>
                                            </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </body>
    );
}

export default History;