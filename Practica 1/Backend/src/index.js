import app from "./app";
const { P1Model } = require("./models/p1.model");
const SerialPort = require("serialport").SerialPort;
const { DelimiterParser } = require("@serialport/parser-delimiter");

const save = (str) =>{
    console.log(str);
    const arrayData = str.split(',');
    switch (arrayData[0]){
        case 'humedad':
            P1Model.create(app).saveHumedad(arrayData[1],arrayData[2],arrayData[3])
                .then(data =>{
                    console.log('Humedad guardada con éxito');
                }).catch(err => console.log(err));
            break;
        case 'presion_barometrica':
            P1Model.create(app).savePresionBarometrica(arrayData[1])
                .then(data =>{
                    console.log('Presion barometrica guardada con éxito');
                }).catch(err => console.log(err));
            break;
        case 'temperatura':
            P1Model.create(app).saveTemperatura(arrayData[1])
                .then(data =>{
                    console.log('Temperatura guardada con éxito');
                }).catch(err => console.log(err));
            break;
        case 'viento':
            P1Model.create(app).saveViento(arrayData[1],arrayData[2])
                .then(data =>{
                    console.log('Viento guardado con éxito');
                }).catch(err => console.log(err));
            break;
        default:
            console.log('Tabla mal especificada');
    }
}
const dataFromPort = () => {
    // ESTAS 5 LINEAS DE CODIGO UNICAMENTE SON PARA EJEMPLIFICAR SU FUNCIONAMIENTO (Y PROBARLO TAMBIEN)
    const dataTest = 'humedad,100.25,50.0,150.25\npresion_barometrica,150\ntemperatura,50\nviento,100,150';
    const arregloData = dataTest.split('\n');
    arregloData.forEach(function (str){
        save(str);
    });
    // EL CODIGO DE ABAJO ES EL REAL A UTILIZAR
    //SE DEBE UTILIZAR LA VARIABLE str QUE SE OBTIENE en la linea 61 para enviarlo a la funcion save!!

    /*
    const port = new SerialPort({
        path: 'COM3',
        baudRate: 9600
    });

    const parser = port.pipe(new DelimiterParser({ delimiter: '\n' }));

    parser.on('open', function (){
        console.log('Open conection serial port :D');
    });

    parser.on('data', function (data) {
        var enc = new TextDecoder();
        var str = enc.decode(data);
        console.log(str);
    });

    parser.on('error', function (err) {
       console.log(err);
    });*/

};
const main = ()=>{
    app.listen(app.get("port"));
    console.log(`Server on port ${app.get("port")}`);
    dataFromPort();
};
main();