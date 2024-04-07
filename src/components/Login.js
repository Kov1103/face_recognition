import React from "react"
import styles from "../styles/Login.module.css"
import logo from "../images/logo.png"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

function Login() {
    const history = useNavigate()
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')

    async function submit(e) {
        e.preventDefault()
        try {
            console.log(username + " " + password)
            await axios.post("http://localhost:4000/nowlogin", {
                username: username, password: password
            })
            .then(req => {
                console.log(req.data)
                if (req.data === "logged in") {
                    history("/homeadmin")
                }
                else if (req.data === "Incorrect password") {
                    alert("Incorrect password")
                }
                else if (req.data === "not exist") {
                    alert("No record in the database")
                }
                else {
                    alert("Unknown")
                }
            })
            .catch(e => {
                alert("wrong info")
                console.log(e)
            })
        }
        catch(e) {
            console.log(e)
        }
    }


    return (
        <body>
            <nav>
                <div className={styles.nav}>
                    <div><Link to='/'><img src={logo} alt="logo" width={'150px'}/></Link></div>
                </div>
            </nav>

            <div className={styles.login_content}>
                <form action="POST" className={styles.form}>
                    <div><p>Đăng nhập</p></div>
                    <div><label>Tên đăng nhập</label></div>
                    <div><input type="text" name="username" onChange={(e) => {setUsername(e.target.value)}}></input></div>
                    <div><label>Mật khẩu</label></div>
                    <div><input type="password" name="password" onChange={(e) => {setPassword(e.target.value)}}></input></div>
                    <div><input id="submit" type="submit" name="submit" value="Xác nhận" onClick={submit}></input></div>
                </form>
            </div>
        </body>
    );
}

export default Login;