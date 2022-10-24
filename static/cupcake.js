

async function allCupcakes(){
    const response = await axios.get('/api/cupcakes');
    const cupcakes=response.data.cupcakes
    for (let i = 0; i <cupcakes.length; i ++){
       let $cupcake= $("<li/>", {text: `Flavor: ${cupcakes[i].flavor} Size: ${cupcakes[i].size} rating: ${cupcakes[i].rating}`,
                    class: `${cupcakes[i].id}`})
        if(cupcakes[i].image){
            let $img = $("<img/>", {src: cupcakes[i].image, class:"col-9"});
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
    if(response.data.cupcake.image){
    let $img = $("<img/>", {src:response.data.cupcake.image, class:"col-9"});
    $($cupcake).append($img);
    
    }
    $("ul").append($cupcake);

    $('input').val("")
}

$('button').on('click', newCupcake);

$(allCupcakes);
