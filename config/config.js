module.exports = {
    app: {
        adress: '127.0.0.1',
        port: process.env.PORT || 3000 
    },
    db: (adress, port, collectionName) => {
        return `mongodb://${adress}:${port}/${collectionName}`;
    }
}