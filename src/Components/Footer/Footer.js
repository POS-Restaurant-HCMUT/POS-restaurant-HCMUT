import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Footer.css"

function Footer () {
    return (
        <footer>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-4 col-md-12 col-12">
                        <h4><span>POS</span> Restaurant</h4>
                        <p>Copyright 2021 POS Restaurant</p>
                        <p>Alright Reserved</p>
                        <div className="d-flex social">
                            <p><i class="fab fa-facebook"></i></p>
                            <p><i class="fab fa-youtube"></i></p>
                            <p><i class="fab fa-twitter"></i></p>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 col-12">
                          <h4>Group Members</h4>
                          <div className="d-flex">
                              <div>
                                <p>Nguyen Hoai Thuong</p>
                                <p>Nguyen Hong Dan</p>
                                <p>Nguyen Duy Uyen</p>
                              </div>
                              <div className="member">
                                <p>Truong Viet Hoang</p>
                                <p>Truong Gia Thinh</p>
                                <p>Tran Van Thai</p>
                                <p>Le Manh Hung</p>
                              </div>
                          </div>
                    </div>
                    <div class="col-lg-4 col-md-6 col-12">
                        <h4>Contact</h4>
                        <p><i class="fas fa-phone-alt"></i> +(84)999 888 xxx</p>
                        <p><i class="fas fa-map-marker-alt"></i> Khu phố 6, Linh Trung, Thủ Đức, TPHCM</p>
                        <p><i class="far fa-envelope"></i> assignment@hcmut.edu.vn</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;