import React from "react";
import "./signin.css";

function SignUp() {
  return (
    <div className="login d-flex justify-content-center container">
      <div className="card p-1">
        <div className="card-body shadow-lg">
          <h3 className="card-title mb-4">Đăng Ký</h3>
          <form method="POST" className="my-login-validation" novalidate="">
            <div className="form-group">
              <div className="mb-2">
                  <label class="form-label">Họ và tên</label>
                  <input name="fname" type="text" class="form-control" />
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
                      id="validationCustomUsername"
                      required
                    />
                    <div className="invalid-feedback">Tên đăng nhập trống.</div>
                  </div>
                </div>
                <div className="col-md-6">
                  <label for="validationCustomSDT" className="form-label">
                    Số điện thoại
                  </label>
                  <div className="input-group has-validation">
                    <input
                      type="text"
                      className="form-control"
                      id="validationCustomSDT"
                      required
                    />
                    <div className="invalid-feedback">SDT trống.</div>
                  </div>
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
                  required
                  data-eye
                />
                <div className="invalid-feedback">Mật khẩu trống</div>
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
                  required
                  data-eye
                />
                <div className="invalid-feedback">Mật khẩu trống</div>
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
                name="password"
                required
                data-eye
              />
              <div className="invalid-feedback">email trống</div>
            </div>

            <div className="mt-4">
              <button type="submit" className="btn btn-warning w-100">
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
}

export default SignUp;
