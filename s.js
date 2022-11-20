import Storage from "./Storage.js";

const addNewProductBtn = document.getElementById("add-new-product");
const searchInput = document.querySelector("#search-input");
const selectedSort = document.querySelector("#sort-products");


class productView{
    constructor(){
        this.productes = []
addNewProductBtn.addEventListener("click",(e)=>{this.addnewpro(e)})
    }



}
setApp(){
    this.productes=Storage.getAllCategories()
}
creatPro(products){
    let result = "";
    products.forEach(item => {
    const selectedCategory = Storage.getAllCategories().find((c)=>{c.id==item.category})
      console.log(selectedCategory)  
      result += `<div class="flex items-center justify-between mb-2 w-full min-w-[400px]">
      <span class="text-slate-400">${item.title}</span>
      <div class="flex items-center gap-x-3">
        <span class="text-slate-400">${new Date().toLocaleDateString("fa-IR")}</span>
        <span class="block px-3 py-0.5 text-slate-400 border border-slate-400 text-sm rounded-2xl">${
          selectedCategory.title
        }</span>
        <span
          class="flex items-center justify-center w-7 h-7 rounded-full bg-slate-500 border-2 border-slate-300 text-slate-300">${
            item.quantity
          }</span>
        <button class="delete-product border px-2 py-o.5 rounded-2xl border-red-400 text-red-400 delete-product" 
        data-product-id=${item.id}>delete</button>
      </div>
    </div>`;
    });
    const productsDOM = document.getElementById("products-list");
    productsDOM.innerHTML = result;


}
}

export default new productView()