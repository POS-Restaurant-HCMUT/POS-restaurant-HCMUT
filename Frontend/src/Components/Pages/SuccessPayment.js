export default function SuccessPayment() {
    return(
        <div class="container mt-5" style={{backgroundColor:'rgba(0, 0, 0, 0.6)', color:'white', width:'fit-content', padding:'20px', borderRadius:'3%'}}>
            <div class="d-flex justify-content-center h-25">
                <img style={{backgroundColor:'white', borderRadius:'50%'}} src="https://icon-library.com/images/successful-icon/successful-icon-10.jpg"></img>
            </div>
            <h2 class="text-center block p-4" style={{color:'red'}}>THÀNH CÔNG!</h2>
            <h4 class="text-center block pb-4">Đơn đặt hàng của bạn đã được thanh toán qua PayPal</h4>
            <div class="row justify-content-center">
                <button class="btn btn-dark col-auto" style={{backgroundColor:'tomato'}}
                onClick={() => window.location.href = "/view-menu"}>Tiếp tục mua sắm</button>
            </div>
        </div>
    )
}