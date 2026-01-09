const getCategories = async () => {
    const params = new URLSearchParams(location.search);
    const slug = params.get("CategorieSlug");
    const response = await axios.get(`https://dummyjson.com/products/category/${slug}`);
    if(response.status ==200){
return response.data ;
}};
const displayCategories = async () => {
    const response = await getCategories();
const result = response.products.map((product) => {
        return `
            <div class="col-md-3">
                <div class="card">
                    <h5>${product.title}</h5>
                    <p>Price: $${product.price}</p>
                    <img src="${product.thumbnail}">
                </div>
            </div>
        `;
    }).join(" ");
document.querySelector(".categories .row").innerHTML = result;}
displayCategories();