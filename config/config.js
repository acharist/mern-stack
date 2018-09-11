module.exports = {
    app: {
        adress: '127.0.0.1',
        port: process.env.PORT || 3000 
    },
    db: (adress = 'localhost', port = 27017, collectionName = 'mernApp') => {
        return `mongodb://${adress}:${port}/${collectionName}`;
    }
}