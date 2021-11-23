export default function PaymentFail() {
    return(
        <div class="container mt-5" style={{backgroundColor:'rgba(0, 0, 0, 0.6)', color:'white', width:'fit-content', padding:'20px', borderRadius:'3%'}}>
            <div class="d-flex justify-content-center h-25">
                <img style={{backgroundColor:'white', borderRadius:'50%', maxHeight:'360px'}} src="https://cdn.icon-icons.com/icons2/1380/PNG/512/vcsconflicting_93497.png"></img>
            </div>
            <h2 class="text-center block p-4" style={{color:'red'}}>THẤT BẠI!</h2>
            <h4 class="text-center block pb-4">Thanh toán thất bại với PayPal. Xin vui lòng thử lại</h4>
            <div class="row justify-content-center">
                <button class="btn btn-dark col-auto" style={{backgroundColor:'tomato'}}
                onClick={() => window.location.href = "/cart"}>Quay lại</button>
            </div>
        </div>
    )
}