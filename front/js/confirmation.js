// Get orderId from localStorage and display it to the user
function displayOrderId() {
    const orderId = document.getElementById('orderId');
    let params = new URLSearchParams(document.location.search)
    let order = params.get('orderId')
    orderId.innerHTML = order
    console.log(order)
}

displayOrderId()