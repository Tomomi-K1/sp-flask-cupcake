

async function allCupcakes(){
    const response = await axios.get('/api/cupcakes');
    const cupcakes=response.data.cupcakes
    for (let i = 0; i <cupcakes.length; i ++){
       let $cupcake= $("<li/>", {text: `Flavor: ${cupcakes[i].flavor} Size: ${cupcakes[i].size} rating: ${cupcakes[i].rating}`,
                    class: `${cupcakes[i].id}`})
       let deleteBtn = $('<button/>', {class:"delete-button", text: "X"})
        if(cupcakes[i].image){
            let $img = $("<img/>", {src: cupcakes[i].image, class:"col-9"});
            
            $($cupcake).append(deleteBtn)
            $($cupcake).append($img)

        }
        $("ul").append($cupcake)
    }
}

async function newCupcake(e){
    e.preventDefault();
    const $flavor = $('input[name=flavor]').val()
    const $size=$('input[name=size]').val()
    const $rating=$('input[name=rating]').val()
    const $image=$('input[name=image]').val()? $('input[name=image]').val() : null;
    const newCupcake = {
        flavor: $flavor,
        size: $size,
        rating: $rating,
        image: $image
    }

    const response = await axios.post('/api/cupcakes', newCupcake);
    console.log(response.data.cupcake)
    
    let $cupcake= $("<li/>", {text: `Flavor: ${$flavor} Size: ${$size} rating: ${$rating}`,
    class: `${response.data.cupcake.id}`})
    let deleteBtn = $('<button/>', {class:"delete-button", text: "X"})
    if(response.data.cupcake.image){
    let $img = $("<img/>", {src:response.data.cupcake.image, class:"col-9"});
    $($cupcake).append(deleteBtn)
    $($cupcake).append($img);
    
    }
    $("ul").append($cupcake);

    $('input').val("")
}

async function deleteCupcake(){
    const id = $(this).parent().attr('class');
     await axios.delete(`/api/cupcakes/${id}`)
    $(this).parent().remove()
}



$('button').on('click', newCupcake);

$("ul").on("click", ".delete-button", deleteCupcake);

$(allCupcakes);

// ===============springboard solution==================
// const BASE_URL = "http://localhost:5000/api";


// /** given data about a cupcake, generate html */

// function generateCupcakeHTML(cupcake) {
//   return `
//     <div data-cupcake-id=${cupcake.id}>
//       <li>
//         ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}
//         <button class="delete-button">X</button>
//       </li>
//       <img class="Cupcake-img"
//             src="${cupcake.image}"
//             alt="(no image provided)">
//     </div>
//   `;
// }


/** put initial cupcakes on page. */

// async function showInitialCupcakes() {
//   const response = await axios.get(`${BASE_URL}/cupcakes`);

//   for (let cupcakeData of response.data.cupcakes) {
//     let newCupcake = $(generateCupcakeHTML(cupcakeData));
//     $("#cupcakes-list").append(newCupcake);
//   }
// }


// /** handle form for adding of new cupcakes */

// $("#new-cupcake-form").on("submit", async function (evt) {
//   evt.preventDefault();

//   let flavor = $("#form-flavor").val();
//   let rating = $("#form-rating").val();
//   let size = $("#form-size").val();
//   let image = $("#form-image").val();

//   const newCupcakeResponse = await axios.post(`${BASE_URL}/cupcakes`, {
//     flavor,
//     rating,
//     size,
//     image
//   });

//   let newCupcake = $(generateCupcakeHTML(newCupcakeResponse.data.cupcake));
//   $("#cupcakes-list").append(newCupcake);
//   $("#new-cupcake-form").trigger("reset");
// });


// /** handle clicking delete: delete cupcake */

// $("#cupcakes-list").on("click", ".delete-button", async function (evt) {
//   evt.preventDefault();
//   let $cupcake = $(evt.target).closest("div");
//   let cupcakeId = $cupcake.attr("data-cupcake-id");

//   await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`);
//   $cupcake.remove();
// });


// $(showInitialCupcakes);