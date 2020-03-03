const products_view = ((data) => {
    let html = `

    

    <html>
   

    <head><title>MemoApp</title> </head>
    <body>
    <h1>Shopping list application</h1>
    <a href='/'>Home</a><br>
    <h2>Shopping list Name: ${data.shoppingList.text} </h2>
    
    <div></div>
    <div></div> `;


    data.products.forEach((product) => {
        html += product.text;
        html += `

            <a href= "/shopping_list/${product._id}">${product.text}</a>
            
            <form action="delete-product" method="POST">
                <input type="hidden" name="product_id" value="${product._id}">
                <button type="submit" class="delete_button">Delete product</button>
            </form>
            <div></div>
            `;
    });

    html += `
        <form action="/add-product" method="POST">
            <input type="text" name="product">
            <button type="submit" class="add_button">Add product</button>
        </form>
        <div></div>

        <div></div>
        Logged in as user: ${data.user_name}
        <form action="/logout" method="POST">
            <button type="submit">Log out</button>
        </form>

    </html>
    </body>
    `;
    return html;
});


const product_view = (data) => {
    let html = `
    <html>
    <body>
        product text: ${data.text}
    </body>
    </html>
    `;
    return html;
};

module.exports.products_view = products_view;
module.exports.product_view = product_view;