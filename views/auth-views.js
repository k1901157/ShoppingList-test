const login_view = () => {
    let html = `
    <html>
    <head><title>Shoping Lists App</title>
    <h1>Shopping list application</h1>
    <body>
        <form action="/login" method="POST">
            <input type="text" name="user_name">
            <button type="submit">Log in</button>
        </form>
        <form action="/register" method="POST">
            <input type="text" name="user_name">
            <button type="submit">Register</button>
        </form>
    </body>
    <html>
    `;

    return html;
}

module.exports.login_view = login_view;