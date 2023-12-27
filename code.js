let title = document.getElementById("title");
let total = document.getElementById("total");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = 'create';
let tmp;
//total function
function getTotal() {
    if (price.value != '') {
        let result = +price.value + +taxes.value + +ads.value - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040'
    } else {
        total.innerHTML = '';
        total.style.background = 'rgb(99, 32, 32)'
    }

}
//create product
let datapro;
if (localStorage.product != null) {
    datapro = JSON.parse(localStorage.product)
}
else {
    datapro = [];
}
submit.onclick = function () {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        count: count.value,
        category: category.value.toLowerCase(),
        total: total.innerHTML,
    }
    if(title.value!=''&&price.value!=''&&category.value!=''){
        if (mood === 'create') {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    datapro.push(newPro);
                }

            } else { datapro.push(newPro); }
        } else {
            datapro[tmp] = newPro;
            mood = 'create';
            submit.innerHTML = 'create';
            count.style.display = 'block';


        }
        ClearData()
    }
    localStorage.setItem('product', JSON.stringify(datapro))
    console.log(datapro)
   
    showData()
}


// clear data
function ClearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    count.value = '';
    category.value = '';
    total.innerHTML = '';
}

//show data

function showData() {
    getTotal();
    let tabel = '';
    for (let i = 0; i < datapro.length; ++i) {
        tabel += `
        <tr> 
                        <td>${i+1}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td><button onclick="updateData( ${i} )" id="update">update</button></td>
                        <td> <button onclick="deleteData( ${i} )"  id="delete">delete</button></td>
                        
                    </tr>
        `

        document.getElementById('tbody').innerHTML = tabel;
        let btnDelete = document.getElementById('deleteall');
        if (datapro.length > 0) {
            btnDelete.innerHTML =
                '<button onclick="deleteAll()" >delete all  </button>'
        } else {
            btnDelete.innerHTML = ""
        }
    }


}

showData()


//delete


function deleteData(i) {
    datapro.splice(i, 1);
    localStorage.product = JSON.stringify(datapro);
    showData()
}
//delet all
function deleteAll() {
    localStorage.clear()
    datapro.splice(1)
    showData()

}
//up date
function updateData(i) {
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;

    category.value = datapro[i].category;
    count.style.display = 'none';
    submit.innerHTML = 'update';
    mood = 'update';
    tmp = i
    scroll({
        top: 0,
        behavior: "smooth"

    })
}

//search function
let searchmood = 'title';
function getsearchmood(id) {
    let search = document.getElementById('search');

    if (id == 'searchtitle') {
        searchmood = 'title';

    }
    else {
        searchmood = 'category';
    }

    search.placeholder = 'search by' + ' ' + searchmood;
    search.focus()
    search.value='';
    showData()

}

function searchData(value) {
    let tabel = '';
    if (searchmood == 'title') 
    {
        for (let i = 0; i < datapro.lenght; i++) {
            if (datapro[i].title.includes(value.toLowerCase())) {
                tabel += `
                        <tr> 
                        <td>${i}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td><button onclick="updateData( ${i} )" id="update">update</button></td>
                        <td> <button onclick="deleteData( ${i} )"  id="delete">delete</button></td>
                        
                        </tr>
                         `;

            }
        }
    } else {

        for (let i = 0; i < datapro.lenght; i++) {
            if (datapro[i].category.includes(value.toLowerCase())) {
                tabel += `
                        <tr> 
                        <td>${i}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td><button onclick="updateData( ${i} )" id="update">update</button></td>
                        <td> <button onclick="deleteData( ${i} )"  id="delete">delete</button></td>
                        
                        </tr>
                         `;
                         

            }
        }

    }

document.getElementById('tbody').innerHTML = tabel;

}
 //clean data

