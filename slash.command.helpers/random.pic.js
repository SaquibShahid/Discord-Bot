let data = null;
exports.getData = async () => {
    const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_API_KEY}`)
    data = await response.json();
    return data.urls.regular;
}