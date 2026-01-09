const getProducts = async () => {
    const params = new URLSearchParams(location.search);
    const id = params.get("productId");
    const response = await axios.get(`https://dummyjson.com/products/${id}`);
    return response.data;

};
const displayProducts = async () => {
    const response = await getProducts();
    const images = response.images.map((img) => {
        return `<img src="${img}">`;
    }).join(" ");
    const reviews = response.reviews.map((review) => {
        return `  <p>Rating : ${review.rating}</p>
                    <p>Comment : ${review.comment}</p>
                    <p>Date : ${review.date}</p>
                    <p>Name : ${review.reviewerName}</p>
                    <p>Email : ${review.reviewerEmail}</p>`;
    }).join(" ");
    const result = `
                <div class="card p-5 d-flex justify-content-center align-items-center">
                    <h2>${response.title}</h2>
                    <p>${images}</p>
                    <p>description : ${response.description}</p>
                    <div class="card w-50 bg-body-secondary">
                    <p>reviews : ${reviews}</p>
                    </div>
                    <p>Stock :  ${response.stock}</p>

                </div>
        `;
    document.querySelector(".products").innerHTML = result;
}
displayProducts();