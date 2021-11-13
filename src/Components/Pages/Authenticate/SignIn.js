import React from "react";
import './signin.css';

function Demo() {
  return (
    <div className="login d-flex justify-content-center container">
      <div className="card p-1">
        <div className="card-body shadow-lg">
          <h3 className="card-title mb-4">Đăng nhập</h3>
          <form method="POST" className="my-login-validation" novalidate="">
            <div className="form-group">
              <label for="validationCustomUsername" className="form-label">
                Tên đăng nhập
              </label>
              <div className="input-group has-validation">
                <input
                  type="text"
                  className="form-control"
                  id="validationCustomUsername"
                  required
                />
                <div className="invalid-feedback">Tên đăng nhập trống.</div>
              </div>
            </div>

            <div className="form-group mt-2 mb-2">
              <label className="d-flex justify-content-between" for="password">
                Mật khẩu
                <a href="forgot.html" className="float-right">
                  Quên mật khẩu?
                </a>
              </label>
              <input
                id="password"
                type="password"
                className="form-control mt-2"
                name="password"
                required
                data-eye
              />
              <div className="invalid-feedback">Mật khẩu trống</div>
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
              <button type="submit" className="btn btn-warning w-100">
                Đăng nhập
              </button>
            </div>
            <div className="mt-4 text-center">
              Bạn chưa có tài khoản?{" "}
              <a href="SignUp">Đăng kí thành viên</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Demo;
