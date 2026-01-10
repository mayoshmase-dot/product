const getCategories = async () => {
    const response = await axios.get('https://dummyjson.com/products/categories');
    return response.data;
}
const displayCategories = async () => {
    try{
        const result = await getCategories();
    const Categories = result.map((Categorie) => {
        return `
            <div class="col-md-3">
            <div class="card">
            <a href="./categoriesDetails.html?CategorieSlug=${Categorie.slug}">${Categorie.name}</a>
            </div></div>
`
    }).join(' ');
    document.querySelector(".categories .row").innerHTML = Categories;
    }
   catch(error){
document.querySelector(".errorCategories").classList.remove('d-none');

   }
}
displayCategories();
const getProducts = async (page) => {
    const skip = (page-1)*10;
   const response = await axios.get(`https://dummyjson.com/products?limit=10&skip=${skip}`);
   return response.data;
}
const displayProducts = async (page = 1) => {
    try{    const result = await getProducts(page);
    const numberOfPage = Math.ceil(result.total / 10);
    const products = result.products.map((product) => {
        return `
            <tr>
                 <td>${product.title}</td>
                 <td>${product.price}</td>
                 <td>${product.rating}</td>
                 <td><img src="${product.thumbnail}"</td>
                <td><a href="./details.html?productId=${product.id}"/>Details</a></td>
            </tr>
            `
    }).join(' ');
    document.querySelector(".productsData").innerHTML = products;
        let pagination = ``;
        if(page>1){
 pagination = `<li class="page-item"><button class="page-link" onclick=displayProducts(${page-1})>Previous</button></li>`;
        }   
        else{
pagination = `<li class="page-item"><button class="page-link" disabled>Previous</button></li>`;

        } 
        for (let i = 1; i <= numberOfPage; i++) {
        pagination += `<li class="page-item"><button class="page-link" onclick=displayProducts(${i})>${i}</button></li>`
    }
    pagination += `<li class="page-item"><button class="page-link" disabled >Next</button></li>`;

document.querySelector(".pagination").innerHTML = pagination;}

catch(error){
document.querySelector(".errorProducts").classList.remove('d-none');
}
}

displayProducts();
