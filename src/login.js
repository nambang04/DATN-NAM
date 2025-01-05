import React, { useState } from "react";
import axios from "axios";
import { API_KEY } from "./config/firebase";
import "./login.css";
import "bootstrap/dist/css/bootstrap.css";
import imgLogin from "./image/logo1.png";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const submit = async () => {
    try {
      const res = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      );
      localStorage.setItem("isLoggedIn", true); // Lưu trạng thái đăng nhập
      navigate("/");
    } catch (error) {
      // Đăng nhập thất bại
      setShowError(true);
    }
  };
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Quên mật khẩu?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Nội dung của modal */}
          <h5>Vui lòng liên hệ Quản trị viên để lấy lại mật khẩu!</h5>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} style={{
            backgroundColor: "#5883c3",
          }}>
            Đóng
          </Button>

        </Modal.Footer>
      </Modal>

      <>

      
  <section className="vh-100 vw-100 d-flex justify-content-center align-items-center">
  <div className="container-fluid h-100 w-100">
    <div className="top-0">
      <div
        className="text-center bg-gradient text-white p-2"
        style={{ backgroundColor: "#6D929B" }}
      >
        <div className="header-text">
          <h3>HỆ THỐNG PHÁT HIỆN</h3>
          <h3>VÀ CẢNH BÁO CHÁY SỚM</h3>
        </div>
      </div>

      <div className="text-center size-lg" style={{ marginTop: "40px" }}>
        <h3>Học Viện Kỹ Thuật Mật Mã </h3>
        
      </div>
      <div className="text-center size-sm" style={{ marginTop: "60px" }}>
        <h4>KMA</h4>
        <h4>Học Viện</h4>
        <h5>Kỹ Thuật Mật Mã</h5>
       
      </div>
    </div>

    <div
      className="row d-flex justify-content-center align-items-center"
      style={{ marginTop: "50px" }}
    >
      <div className="col-6 col-sm-5 col-md-5 col-lg-4 col-xl-3">
        <img src={imgLogin} className="img-fluid" alt="Sample image" />
      </div>
      <div className="col-sm-6 col-lg-6 col-xl-4 offset-xl-1 login-content">
        <h4 className="text-center mb-4"> Đăng nhập vào hệ thống</h4>
        <form id="login-form">
          <div className="form-outline mb-4">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control form-control-lg"
              placeholder="Nhập địa chỉ email hợp lệ"
            />
          </div>

          <div className="form-outline mb-3">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control form-control-lg"
              placeholder="Nhập mật khẩu"
            />
          </div>
          {showError ? (
            <div className="text-error-login">
              Thông tin đăng nhập không chính xác!
            </div>
          ) : (
            ""
          )}

          <div className="d-flex justify-content-between align-items-center">
            <div className="form-check mb-0">
              <input
                className="form-check-input me-2"
                type="checkbox"
                value=""
                id="rememberMe"
              />
              <label className="form-check-label" htmlFor="form2Example3">
                Ghi nhớ
              </label>
            </div>
            <div
              className="text-body"
              onClick={handleShow}
              style={{ cursor: "pointer" }}
            >
              Quên mật khẩu?
            </div>
          </div>

          <div className="text-center text-lg-start mt-4 pt-2">
            <button
              type="button"
              className="btn btn-lg bg-gradient"
              style={{
                paddingLeft: "2.5rem",
                paddingRight: "2.5rem",
                width: "100%",
                backgroundColor: "#6D929B",
                color: "white",
              }}
              id="login-button"
              onClick={() => submit()}
            >
              Đăng nhập
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
      </>
    </div>
  );
}
