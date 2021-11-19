import axios from "axios";
import React, { useState } from "react";
import "./signin.css";
import isEmpty from "validator/lib/isEmpty"
import isEmail from "validator/lib/isEmail";
import isMobilePhone from "validator/lib/isMobilePhone";
import { useHistory } from "react-router-dom";

function SignUp() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pwd1, setPwd1] = useState("");
  const [validationMsg, setValidationMsg] = useState('')
  const history = useHistory();

  function addCustomerInfo() {
    
    axios
      .post("http://127.0.0.1:8000/api/account/signup", {
        username: username,
        password: password,
        fullName: fullName,
        email: email,
        phone: phone,
      })
      .then((res) => {
        alert("Sign Up successfully");
        return history.push("/demo");
      })
      .catch((err) => {
        alert(err);
      });
  }

  const onChangeName = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const onChangeUserName = (event) => {
    const value = event.target.value;
    setUserName(value);
  };

  const onChangePassWord = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const onChangeRePassWord = (event) => {
    const value = event.target.value;
    setPwd1(value);
  };

  const onChangePhone = (event) => {
    const value = event.target.value;
    setPhone(value);
  };

  const onChangeEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const validateAll = () => {
    const msg = {};
    if (isEmpty(fullName)) {
      msg.name = "Tên trống!";
    }

    if (isEmpty(username)) {
      msg.username = "Tên đăng nhập trống!";
    }
    if (!isEmpty(username)) {
      if (!username.match(/^[a-zA-Z]+$/)) {
        msg.username = "Tên đăng nhập chứa kí tự đặc biệt!";
      }
    }

    if (!isMobilePhone(phone)) {
      msg.phone = "Số điện thoại không hợp lệ!";
    }

    if (!isEmail(email)) {
      msg.email = "Email không hợp lệ!";
    }

    if (isEmpty(password)) {
      msg.password = "Mật khẩu trống!";
    }

    if (pwd1 !== password || isEmpty(pwd1)) {
      msg.repassword = "Mật khẩu nhập lại không đúng!";
    }

    setValidationMsg(msg);
    if (Object.keys(msg).length > 0) return false;

    addCustomerInfo()
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
          <h3 className="card-title mb-4">Đăng Ký</h3>
          <form>
            <div className="form-group has-error">
              <div className="mb-2">
                <label class="form-label">Họ và tên</label>
                <input
                  name="name"
                  type="text"
                  class="form-control bd-danger"
                  onChange={onChangeName}
                />
                <p className="fst-italic text-danger">{validationMsg.name}</p>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label for="validationCustomUsername" className="form-label">
                    Tên đăng nhập
                  </label>
                  <div className="input-group has-validation">
                    <input
                      type="text"
                      className="form-control"
                      onChange={onChangeUserName}
                    />
                  </div>
                  <p className="fs-6 fst-italic text-danger">
                    {validationMsg.username}
                  </p>
                </div>
                <div className="col-md-6">
                  <label for="validationCustomSDT" className="form-label">
                    Số điện thoại
                  </label>
                  <div className="input-group has-validation">
                    <input
                      type="text"
                      className="form-control"
                      onChange={onChangePhone}
                    />
                  </div>
                  <p className="fs-6 fst-italic text-danger">
                    {validationMsg.phone}
                  </p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="form-group mt-2 mb-2 col-md-6">
                <label
                  className="d-flex justify-content-between"
                  for="password"
                >
                  Mật khẩu
                </label>
                <input
                  id="password"
                  type="password"
                  className="form-control mt-2"
                  name="password"
                  onChange={onChangePassWord}
                  data-eye
                />
                <p className="fs-6 fst-italic text-danger">
                  {validationMsg.password}
                </p>
              </div>

              <div className="form-group mt-2 mb-2 col-md-6">
                <label
                  className="d-flex justify-content-between"
                  for="re-password"
                >
                  Nhập lại mật khẩu
                </label>
                <input
                  id="re-password"
                  type="password"
                  className="form-control mt-2"
                  name="password"
                  onChange={onChangeRePassWord}
                  data-eye
                />
                <p className="fs-6 fst-italic text-danger">
                  {validationMsg.repassword}
                </p>
              </div>
            </div>

            <div className="form-group mb-2">
              <label
                className="d-flex justify-content-between"
                for="Customer-email"
              >
                Email
              </label>
              <input
                id="Customer-email"
                type="email"
                className="form-control mt-2"
                name="email"
                onChange={onChangeEmail}
                data-eye
              />
              <p className="fs-6 fst-italic text-danger">
                {validationMsg.email}
              </p>
            </div>

            <div className="mt-4">
              <button
                type="button"
                className="btn btn-warning w-100"
                name="login"
                onClick={onSubmitLogin}
              >
                Đăng ký
              </button>
            </div>
            <div className="mt-4 text-center">
              Đã có tài khoản? <a href="Demo">Đăng nhập</a>
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
  //         <h3 className="card-title mb-4">Đăng Ký</h3>
  //         <form className="my-login-validation" novalidate="" onSubmit={(e) => addCustomerInfo(e)}>
  //           <div className="form-group">
  //             <div className="mb-2">
  //                 <label class="form-label">Họ và tên</label>
  //                 <input name="fname" type="text" class="form-control" value={fullName} onChange={(e) => setName(e.target.value)}/>
  //             </div>
  //             <div className="row">
  //               <div className="col-md-6">
  //                 <label for="validationCustomUsername" className="form-label">
  //                   Tên đăng nhập
  //                 </label>
  //                 <div className="input-group has-validation">
  //                   <input
  //                     type="text"
  //                     className="form-control"
  //                     id="validationCustomUsername"
  //                     value={username} onChange={(e) => setUserName(e.target.value)}
  //                     required
  //                   />
  //                   <div className="invalid-feedback">Tên đăng nhập trống.</div>
  //                 </div>
  //               </div>
  //               <div className="col-md-6">
  //                 <label for="validationCustomSDT" className="form-label">
  //                   Số điện thoại
  //                 </label>
  //                 <div className="input-group has-validation">
  //                   <input
  //                     type="text"
  //                     className="form-control"
  //                     id="validationCustomSDT"
  //                     value={phone} onChange={(e) => setPhone(e.target.value)}
  //                     required
  //                   />
  //                   <div className="invalid-feedback">SDT trống.</div>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>

  //           <div className="row">
  //             <div className="form-group mt-2 mb-2 col-md-6">
  //               <label
  //                 className="d-flex justify-content-between"
  //                 for="password"
  //               >
  //                 Mật khẩu
  //               </label>
  //               <input
  //                 id="password"
  //                 type="password"
  //                 className="form-control mt-2"
  //                 name="password"
  //                 value={password} onChange={(e) => setPassword(e.target.value)}
  //                 required
  //                 data-eye
  //               />
  //               <div className="invalid-feedback">Mật khẩu trống</div>
  //             </div>

  //             <div className="form-group mt-2 mb-2 col-md-6">
  //               <label
  //                 className="d-flex justify-content-between"
  //                 for="re-password"
  //               >
  //                 Nhập lại mật khẩu
  //               </label>
  //               <input
  //                 id="re-password"
  //                 type="password"
  //                 className="form-control mt-2"
  //                 name="password"
  //                 value={pwd1} onChange={(e) => setPwd1(e.target.value)}
  //                 required
  //                 data-eye
  //               />
  //               <div className="invalid-feedback">Mật khẩu trống</div>
  //             </div>
  //           </div>

  //           <div className="form-group mb-2">
  //             <label
  //               className="d-flex justify-content-between"
  //               for="Customer-email"
  //             >
  //               Email
  //             </label>
  //             <input
  //               id="Customer-email"
  //               type="email"
  //               className="form-control mt-2"
  //               name="password"
  //               value={email} onChange={(e) => setEmail(e.target.value)}
  //               required
  //               data-eye
  //             />
  //             <div className="invalid-feedback">email trống</div>
  //           </div>

  //           <div className="mt-4">
  //             <button className="btn btn-warning w-100">
  //               Đăng ký
  //             </button>
  //           </div>
  //           <div className="mt-4 text-center">
  //             Đã có tài khoản? <a href="Demo">Đăng nhập</a>
  //           </div>
  //         </form>
  //       </div>
  //     </div>
  //   </div>
  // );
}

export default SignUp;
