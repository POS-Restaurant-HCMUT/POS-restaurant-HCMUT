import React, { useState, useContext } from "react";
import "./signin.css";
import axios from "axios";
import isEmpty from "validator/lib/isEmpty";
import { useHistory } from "react-router-dom";
import { AccountContext } from "../../../context/accountContext";

function Demo() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [validationMsg, setValidationMsg] = useState('')
  const history = useHistory();

  const { accountLogin } = useContext(AccountContext);

  function requireLogin() {
    

    axios
      .post("api/account/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        accountLogin(res.data["username"], res.data["password"]);
        alert("Sign In successfully");
        history.push("/");
        window.location.reload(false);
      })
      .catch((err) => {
        alert("Incorrect username or password");
      });
  }

  const onChangeUserName = (event) => {
    const value = event.target.value;
    setUserName(value);
  };

  const onChangePassWord = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const validateAll = () => {
    const msg = {};

    if (isEmpty(username)) {
      msg.username = "Tên đăng nhập trống!";
    }

    if (isEmpty(password)) {
      msg.password = "Mật khẩu trống!";
    }

    setValidationMsg(msg);
    if (Object.keys(msg).length > 0) return false;

    requireLogin();
    return true;
  };

  const onSubmitLogin = () => {
    const isValid = validateAll();
    if (!isValid) return;
  };
  return (
    <div className="login d-flex justify-content-center container">
      <div className="card p-1">
        <div className="card-body shadow-lg">
          <h3 className="card-title mb-4">Đăng nhập</h3>
          <form>
            <div className="form-group">
              <label for="validationCustomUsername" className="form-label">
                Tên đăng nhập
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  onChange={onChangeUserName}
                />
              </div>
              <p className="fst-italic text-danger">{validationMsg.username}</p>
            </div>

            <div className="form-group mt-2 mb-2">
              <label className="d-flex justify-content-between" for="password">
                Mật khẩu
                <a href="forgot.html" className="float-right">
                  Quên mật khẩu?
                </a>
              </label>
              <input
                className="form-control mt-2"
                name="password"
                type="password"
                onChange={onChangePassWord}
                data-eye
              />
              <p className="fst-italic text-danger">{validationMsg.password}</p>
            </div>

            <div className="form-check">
              <input
                type="checkbox"
                name="remember"
                id="remember"
                className="custom-control-input"
              />
              <label for="remember" className="custom-control-label mt-2">
                <div className="ms-2">Ghi nhớ tài khoản</div>
              </label>
            </div>

            <div className="mt-4">
              <button
                type="button"
                className="btn btn-warning w-100"
                onClick={onSubmitLogin}
              >
                Đăng nhập
              </button>
            </div>
            <div className="mt-4 text-center">
              Bạn chưa có tài khoản? <a href="SignUp">Đăng kí thành viên</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className="login d-flex justify-content-center container">
  //     <div className="card p-1">
  //       <div className="card-body shadow-lg">
  //         <h3 className="card-title mb-4">Đăng nhập</h3>
  //         <form className="my-login-validation" novalidate="" onSubmit={(e) => requireLogin(e)}>
  //           <div className="form-group">
  //             <label for="validationCustomUsername" className="form-label">
  //               Tên đăng nhập
  //             </label>
  //             <div className="input-group has-validation">
  //               <input
  //                 type="text"
  //                 className="form-control"
  //                 id="validationCustomUsername"
  //                 value={username} onChange={(e) => setUserName(e.target.value)}
  //                 required
  //               />
  //               <div className="invalid-feedback">Tên đăng nhập trống.</div>
  //             </div>
  //           </div>

  //           <div className="form-group mt-2 mb-2">
  //             <label className="d-flex justify-content-between" for="password">
  //               Mật khẩu
  //               <a href="forgot.html" className="float-right">
  //                 Quên mật khẩu?
  //               </a>
  //             </label>
  //             <input
  //               id="password"
  //               type="password"
  //               className="form-control mt-2"
  //               name="password"
  //               value={password} onChange={(e) => setPassword(e.target.value)}
  //               required
  //               data-eye
  //             />
  //             <div className="invalid-feedback">Mật khẩu trống</div>
  //           </div>

  //           <div className="form-check">
  //             <input
  //               type="checkbox"
  //               name="remember"
  //               id="remember"
  //               className="custom-control-input"
  //             />
  //             <label for="remember" className="custom-control-label mt-2">
  //               <div className="ms-2">Ghi nhớ tài khoản</div>
  //             </label>
  //           </div>

  //           <div className="mt-4">
  //             <button className="btn btn-warning w-100">
  //               Đăng nhập
  //             </button>
  //           </div>
  //           <div className="mt-4 text-center">
  //             Bạn chưa có tài khoản?{" "}
  //             <a href="SignUp">Đăng kí thành viên</a>
  //           </div>
  //         </form>
  //       </div>
  //     </div>
  //   </div>
  // );
}

export default Demo;
