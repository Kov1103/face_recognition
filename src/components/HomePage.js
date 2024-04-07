import React, { useState } from "react";
import styles from "../styles/HomePage.module.css"
import logo from "../images/logo.png"
import content_1 from "../images/content_1.png"
import secondContent from "../images/secondContent.jpg"
import participant from "../images/participant.jpg"
import frVideo from "../video/Face Recognition Guide.mp4"
import CodeRunner from "../components/CodeRunner"
import { Link } from "react-router-dom"

function HomePage() {
    const [isDialogOpenbuttom, setIsDialogOpenbuttom] = useState(false);
    const handleCloseDialog = () => {
        setIsDialogOpenbuttom(false);
    };
    
    return (
        <body>
            <nav>
                <div className={styles.nav}>
                    <div>
                        <button className={styles.buttonClass} onClick={() => setIsDialogOpenbuttom(true)}>XÁC THỰC</button>
                    </div>
                    <div><Link to='/'><img src={logo} alt="logo"/></Link></div>
                    <div><Link to='/login'>ĐĂNG NHẬP</Link></div>
                </div>
            </nav>

            <div className={styles.content}>
                <div className={styles.firstContent}><img src={content_1} alt="content_1" style={{width: '1519px'}}/></div>
                <div className={styles.secondContent}>
                    <div><img src={secondContent} alt="Second Content" style={{width: '500px'}} /></div>
                    <div>
                        <p style={{fontSize: '60px', fontWeight: 'bold'}}>Về chúng tôi</p>
                        <br></br>
                        <p>Nhóm chúng tôi bao gồm 3 thành viên: Văn Đạt, Anh Khôi và Mai Lâm</p>
                        <br></br>
                        <p>Sau một thời gian tìm hiểu và khảo sát, nhóm chúng tôi nhận thấy 
                            nhu cầu sử dụng cửa tự động khá cao nên chúng tôi đã thực hiện 
                            đề tài "Hệ thống mở cửa tự động bằng nhận diện khuôn mặt".</p>
                    </div>
                </div>
                <div className={styles.thirdContent}>
                    <div className={styles.parLabel}><h1>Những thành viên đầy nhiệt huyết</h1></div>
                    <div className={styles.parImage}>
                        <div id={styles.par1}>
                            <img src={participant} alt="participant_1"/>
                            <p>Nguyễn Văn Đạt</p>
                        </div>
                        <div id={styles.par2}>
                            <img src={participant} alt="participant_2"/>
                            <p>Hồ Chí Anh Khôi</p>
                        </div>
                        <div id={styles.par3}>
                            <img src={participant} alt="participant_3"/>
                            <p>Mai Lâm</p>
                        </div>
                    </div>
                </div>
                <div className={styles.fourthContent}>
                    <div><h1>Face Recognition Guide</h1></div>
                    <div><video controls style={{width: '1000px'}}><source src={frVideo} type="video/mp4"></source></video></div>
                </div>
            </div>

            <div className={styles.footer}>
                <div id={styles.footerLogo}><img src={logo} alt="footerLogo" width={'200px'}/></div>
                <div id={styles.footerContact}>
                    <p>Liên hệ</p>
                    <br></br>
                    <i class="fa-solid fa-envelope"></i><p>Email: dat.nguyen2011@hcmut.edu.vn</p>
                    <i class="fa-solid fa-phone"></i><p>Số điện thoại: 0818093520</p>
                    <i class="fa-brands fa-github"></i><p>Github: <Link id={styles.link}><span>https://github.com/DacNguyen99/DATKLL---Group-7</span></Link></p>
                </div>
            </div>
            <CodeRunner
            isOpen={isDialogOpenbuttom}
            handleClose={handleCloseDialog}
            />
        </body>
    );
}

export default HomePage;