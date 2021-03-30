const mongoose = require('mongoose');

const credentials = process.env.MONGO_DB_CNN;


const DBConnection = async () => {

    try {
        
        await mongoose.connect( credentials, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log( 'Base de datos online' );

    } catch (error) {

        console.log( error );
        throw new Error( 'Error al levantar la base de datos' );

    }

};


module.exports = {
    DBConnection
};