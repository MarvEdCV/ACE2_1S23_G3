async function myFunction(){
    var datos;
    try {
        const response = await fetch('http://35.172.236.7:4010/api/graficas');
        const data = await response.json();
        datos = data.result.pomodoro;
        console.log("==funca==", datos);

        const alturaRect = 250;

        var cantidadP1 = 0;
        var cantidadP2 = 0;
        var cantidadP3 = 0;
        var cantidadP4 = 0;
        var maxvalpenalizacion1 =0
        var maxvalpenalizacion2 =0
        var maxvalpenalizacion3 =0
        var maxvalpenalizacion4 =0
        var cantidadSesiones = 0;
        var maxsesiones = 0;
        for (var key in datos) {
            if (datos.hasOwnProperty(key)) {
            const valor = datos[key];
            cantidadSesiones++;
            
            valor.ciclos.map((item) => {
                maxsesiones = parseInt(item.tiempo) > maxsesiones ? item.tiempo : maxsesiones;
            })

            valor.penalizaciones.map((item) => {
                if(item.nombre==='Esta parado cuando deberia estar sentado'){
                    cantidadP1++;
                    maxvalpenalizacion1 = parseInt(item.tiempo) > maxvalpenalizacion1 ? item.tiempo : maxvalpenalizacion1;
                }
                if(item.nombre === 'Esta sentado cuando deberia estar parado'){
                    cantidadP2++;
                    maxvalpenalizacion2 = parseInt(item.tiempo) > maxvalpenalizacion2 ? item.tiempo : maxvalpenalizacion2;
                }
                if(item.nombre === 'Esta parado cuando deberia estar parado'){
                    cantidadP3++;
                    maxvalpenalizacion3 = parseInt(item.tiempo) > maxvalpenalizacion3 ? item.tiempo : maxvalpenalizacion3;
                }
                if(item.nombre === 'Esta sentado cuando deberia estar sentado'){
                    cantidadP4++;
                    maxvalpenalizacion4 = parseInt(item.tiempo) > maxvalpenalizacion4 ? item.tiempo : maxvalpenalizacion4;
                }
            })
            }
        }

        svg_1.innerHTML = svg1(datos,maxvalpenalizacion1,cantidadP1,alturaRect,'Esta parado cuando deberia estar sentado',"#65B0FF","Penalización por no sentarse a tiempo a lo largo del tiempo","dd/mm/yyyy hh:mm:ss","dd/mm/yyyy hh:mm:ss")
        svg_2.innerHTML = svg1(datos,maxvalpenalizacion2,cantidadP2,alturaRect,'Esta sentado cuando deberia estar parado',"#FF8F65","Penalización por no pararse a tiempo a lo largo del tiempo","dd/mm/yyyy hh:mm:ss","dd/mm/yyyy hh:mm:ss")
        svg_3.innerHTML = svg1(datos,maxvalpenalizacion3,cantidadP3,alturaRect,'Esta parado cuando deberia estar parado',"#A965FF","Validación de que el usuario no esté sentado en el tiempo de descanso","dd/mm/yyyy hh:mm:ss","dd/mm/yyyy hh:mm:ss")
        svg_4.innerHTML = svg1(datos,maxvalpenalizacion4,cantidadP4,alturaRect,'Esta sentado cuando deberia estar sentado',"#7FFF65","Validación de que el usuario esté sentado a lo largo del tiempo ","dd/mm/yyyy hh:mm:ss","dd/mm/yyyy hh:mm:ss")
        svg_5.innerHTML = svg2(datos,100,cantidadSesiones,alturaRect,"Porcentajes de cumplimiento","dd/mm/yyyy hh:mm:ss","dd/mm/yyyy hh:mm:ss")
        svg_6.innerHTML = svg3(datos,maxsesiones,cantidadSesiones,alturaRect,"total de pomodoros ","dd/mm/yyyy hh:mm:ss","dd/mm/yyyy hh:mm:ss")
        svg_7.innerHTML = svg4(datos,100,1,alturaRect,"Cumplimiento")
        svg_8.innerHTML = svg5(datos,100,1,alturaRect,"Penalizaciones")

    } catch(error) {
        console.error(error);
    }
}

function svg1(datos,Max_svg1,cantidadP1,alturaRect,condicional,color,titulo,f1,f2){
    console.log("cantidadP1",cantidadP1)
    svg1str = `<div><h1>${titulo}</h1>`
        svg1str += `
        <svg width="${150 + 60*(cantidadP1-1)}" height="500">
        <line x1="40" y1="50" x2="40" y2="300" stroke="black" stroke-width="2" />
        <line x1="40" y1="299" x2="${110 + 60*(cantidadP1-1)}" y2="299" stroke="black" stroke-width="2" />
        `
        svg1str += ` <text x="310" y="${-30}" fill="black"  transform="rotate(90)" >dd/mm/yyyy hh:mm:ss</text>`
        svg1str += ` <text x="310" y="${-110 - 60*(cantidadP1-1)}" fill="black"  transform="rotate(90)" >dd/mm/yyyy hh:mm:ss</text>`

        svg1str+= `<text x="35" y="45" fill="black"  >Min</text>`
        svg1str+= `<text x="${112 + 60*(cantidadP1-1)}" y="300" fill="black">Fecha</text>`

        for(var j=0;j<=10;j++){
            svg1str+= `<text x="0" y="${50 + j *25}" fill="black"  >${(Max_svg1*((10-j)/10)).toFixed(2)}</text>`
            svg1str+= `<line x1="35" y1="${50 + j *25}" x2="41" y2="${50+ j *25}" stroke="black" stroke-width="2" />`
            svg1str+= `<line x1="40" y1="${50 + j *25}" x2="${112 + 60*(cantidadP1-1)}" y2="${50+ j *25}" stroke="black" stroke-width="0.5" />`
        }
      
        var i = 0;
        for (var key in datos) {
            if (datos.hasOwnProperty(key)) {
            const valor = datos[key];
            valor.penalizaciones.map((item) => {       
                if(item.nombre===condicional){
                    const crr_val_svg1 = item.tiempo;
                    const val_real_svg1 = crr_val_svg1/Max_svg1
                    svg1str +=` <rect x="${50+60*i}" y="${300-250*val_real_svg1}" width="50" height="${alturaRect*val_real_svg1}" fill="${color}" />`
                    svg1str += ` <text x="310" y="${-70-60*i}" fill="black"  transform="rotate(90)" >${item.fecha_creacion}</text>`
                    i++;
                }
            })
            }
        }
        svg1str += `</svg></div>`  
    return svg1str;
}

function svg2(datos,Max_svg1,cantidadP1,alturaRect,titulo,f1,f2){

    svg1str = `<div><h1>${titulo}</h1>`
    svg1str += `<h5> Amarillo Esta parado cuando deberia estar sentado</h5>`
    svg1str += `<h5> Rojo Esta sentado cuando deberia estar parado</h5>`

    svg1str += `
    <svg width="${150 + 60*(cantidadP1-1)}" height="500">
    <line x1="40" y1="50" x2="40" y2="300" stroke="black" stroke-width="2" />
    <line x1="40" y1="299" x2="${110 + 60*(cantidadP1-1)}" y2="299" stroke="black" stroke-width="2" />
    `
    svg1str += ` <text x="310" y="${-30}" fill="black"  transform="rotate(90)" >${f1}</text>`
    svg1str += ` <text x="310" y="${-110 - 60*(cantidadP1-1)}" fill="black"  transform="rotate(90)" >${f2}</text>`

    svg1str+= `<text x="35" y="45" fill="black"  >%</text>`
    svg1str+= `<text x="${112 + 60*(cantidadP1-1)}" y="300" fill="black">Fecha</text>`

    for(var j=0;j<=10;j++){
        svg1str+= `<text x="5" y="${50 + j *25}" fill="black" font-size="15" >${(Max_svg1*((10-j)/10))}</text>`
        svg1str+= `<line x1="35" y1="${50 + j *25}" x2="41" y2="${50+ j *25}" stroke="black" stroke-width="2" />`
        svg1str+= `<line x1="40" y1="${50 + j *25}" x2="${110 + 60*(cantidadP1-1)}" y2="${50+ j *25}" stroke="black" stroke-width="0.5" />`
    }
    
    var i = 0;
    for (var key in datos) {
        if (datos.hasOwnProperty(key)) {
        const valor = datos[key];
        const ciclos = valor.ciclos;
        const penalizaciones = valor.penalizaciones;

        var timepoTotal = 0;
        var fecha = "";
        ciclos.map((item) => {
            if(fecha == ""){
                fecha = item.fecha_creacion;
            }
            timepoTotal += parseFloat(item.tiempo);
        })

        var penalizacion1 =0;
        var penalizacion2 =0;
        penalizaciones.map((item) => {
            penalizacion1 += item.nombre == 'Esta parado cuando deberia estar sentado' ? parseFloat(item.tiempo) : 0;
            penalizacion2 += item.nombre == 'Esta sentado cuando deberia estar parado' ? parseFloat(item.tiempo) : 0;
        })

        var timepoRestado = timepoTotal - penalizacion1 - penalizacion2;
        const val_real_svg1 = timepoRestado/timepoTotal;
        const val_real_svg2 = penalizacion1/timepoTotal;
        const val_real_svg3 = penalizacion2/timepoTotal;

        svg1str +=`<rect x="${50+60*i}" y="${300-250*val_real_svg1}" width="50" height="${alturaRect*val_real_svg1}" fill="#8665FF" />`
        svg1str +=`<rect x="${50+60*i}" y="${300-250*val_real_svg1-250*val_real_svg2}" (300-250*val_real_svg1)}" width="50" height="${alturaRect*val_real_svg2}" fill="#FFB965" />`
        svg1str +=`<rect x="${50+60*i}" y="${300-250*val_real_svg1-250*val_real_svg2-250*val_real_svg3}" (300-250*val_real_svg1)}" width="50" height="${alturaRect*val_real_svg3}" fill="#FF6565" />`
        svg1str +=`<text x="310" y="${-70-60*i}" fill="black"  transform="rotate(90)" >${fecha}</text>`
        i++;
        }
    }

    // svg1str += `
  
    // <line x1="40" y1="299" x2="${110}" y2="299" stroke="black" stroke-width="2" />
    // `
    svg1str += `</svg></div>`  
    return svg1str;
}

function svg3(datos,Max_svg1,cantidadP1,alturaRect,titulo,f1,f2){

    svg1str = `<div><h1>${titulo}</h1>`

    svg1str += `<h5> Azul Esta parado cuando deberia estar sentado</h5>`
    svg1str += `<h5> Verde Esta sentado cuando deberia estar parado</h5>`

    svg1str += `
    <svg width="${270 + 180*(cantidadP1-1)}" height="500">
    <line x1="40" y1="50" x2="40" y2="300" stroke="black" stroke-width="2" />
    <line x1="40" y1="299" x2="${230 + 180*(cantidadP1-1)}" y2="299" stroke="black" stroke-width="2" />
    `
    svg1str += ` <text x="310" y="${-30}" fill="black"  transform="rotate(90)" >${f1}</text>`
    svg1str += ` <text x="310" y="${-230 - 180*(cantidadP1-1)}" fill="black"  transform="rotate(90)" >${f2}</text>`

    svg1str+= `<text x="35" y="45" fill="black"> Min </text>`
    svg1str+= `<text x="${230 + 180*(cantidadP1-1)}" y="300" fill="black">Fecha</text>`

    for(var j=0;j<=10;j++){
        svg1str+= `<text x="5" y="${50 + j *25}" fill="black" font-size="15" >${(Max_svg1*((10-j)/10))}</text>`
        svg1str+= `<line x1="35" y1="${50 + j *25}" x2="41" y2="${50+ j *25}" stroke="black" stroke-width="2" />`
        svg1str+= `<line x1="40" y1="${50 + j *25}" x2="${230 + 180*(cantidadP1-1)}" y2="${50+ j *25}" stroke="black" stroke-width="0.5" />`
    }
    
    var i = 0;
    for (var key in datos) {
        if (datos.hasOwnProperty(key)) {
        const valor = datos[key];
        const ciclos = valor.ciclos;
        const penalizaciones = valor.penalizaciones;

        var timepoTotal = 0;
        var fecha = "";
        ciclos.map((item) => {
            if(fecha == ""){
                fecha = item.fecha_creacion;
            }
            timepoTotal += parseFloat(item.tiempo);
        })

        var penalizacion1 =0;
        var penalizacion2 =0;
        penalizaciones.map((item) => {
            penalizacion1 += item.nombre == 'Esta parado cuando deberia estar sentado' ? parseFloat(item.tiempo) : 0;
            penalizacion2 += item.nombre == 'Esta sentado cuando deberia estar parado' ? parseFloat(item.tiempo) : 0;
        })

        var timepoRestado = timepoTotal - penalizacion1 - penalizacion2;
        const val_real_svg1 = timepoRestado/timepoTotal;
        const val_real_svg2 = penalizacion1/timepoTotal;
        const val_real_svg3 = penalizacion2/timepoTotal;

        svg1str +=`<rect x="${50+60*i}" y="${300-250*val_real_svg1}" width="50" height="${alturaRect*val_real_svg1}" fill="#FF65E1" />`
        i++;
        svg1str +=`<rect x="${50+60*i}" y="${300-250*val_real_svg2}" (300-250*val_real_svg1)}" width="50" height="${alturaRect*val_real_svg2}" fill="#65C9FF" />`
        svg1str += ` <text x="310" y="${-70-60*i}" fill="black"  transform="rotate(90)" >${fecha}</text>`
        i++;
        svg1str +=`<rect x="${50+60*i}" y="${300-250*val_real_svg3}" (300-250*val_real_svg1)}" width="50" height="${alturaRect*val_real_svg3}" fill="#71FF65" />`
        const start = 105;
        const end = start + 60 * i;
        svg1str += `<line x1="${end}" y1="45" x2="${end}" y2="300" stroke="red" stroke-width="2" />`
        i++;
        
        }
    }
    svg1str += `</svg></div>`  
    return svg1str;
}

function svg4(datos,Max_svg1,cantidadP1,alturaRect,titulo){
    svg1str = `<div><h1>${titulo}</h1>`
    svg1str += `
    <svg width="${170*cantidadP1}" height="500">
    <line x1="40" y1="50" x2="40" y2="300" stroke="black" stroke-width="2" />
    <line x1="40" y1="299" x2="${120*cantidadP1}" y2="299" stroke="black" stroke-width="2" />
    `
    svg1str+= `<text x="35" y="45" fill="black"  >%</text>`
    svg1str+= `<text x="${120*cantidadP1}" y="320" fill="black">Fecha</text>`

    for(var j=0;j<=10;j++){
        svg1str+= `<text x="5" y="${50 + j *25}" fill="black" font-size="15" >${(Max_svg1*((10-j)/10))}</text>`
        svg1str+= `<line x1="35" y1="${50 + j *25}" x2="41" y2="${50+ j *25}" stroke="black" stroke-width="2" />`
        svg1str+= `<line x1="40" y1="${50 + j *25}" x2="${120*cantidadP1}" y2="${50+ j *25}" stroke="black" stroke-width="0.5" />`
    }
    
    var i = 0;
    var max = 0;
    for (var key in datos) {
        if (datos.hasOwnProperty(key)) {
        max = key > max ? key : max;
        }
    }

    const valor_ccr = datos[max]

    const ciclos = valor_ccr.ciclos;
    const penalizaciones = valor_ccr.penalizaciones;

    var timepoTotal = 0;
    var fecha = "";
    ciclos.map((item) => {
        if(fecha == ""){
            fecha = item.fecha_creacion;
        }
        timepoTotal += parseFloat(item.tiempo);
    })

    var penalizacion1 =0;
    var penalizacion2 =0;
    penalizaciones.map((item) => {
        penalizacion1 += item.nombre == 'Esta parado cuando deberia estar sentado' ? parseFloat(item.tiempo) : 0;
        penalizacion2 += item.nombre == 'Esta sentado cuando deberia estar parado' ? parseFloat(item.tiempo) : 0;
    })

    var timepoRestado = timepoTotal - penalizacion1 - penalizacion2;
    const val_real_svg1 = timepoRestado/timepoTotal;

    svg1str +=`<rect x="${50+60*i}" y="${300-250*val_real_svg1}" width="50" height="${alturaRect*val_real_svg1}" fill="#9FFF65" />`
    svg1str +=`<text x="310" y="${-70-60*i}" fill="black"  transform="rotate(90)" >${fecha}</text>`
    svg1str += `</svg></div>`  
    return svg1str;
}

function svg5(datos,Max_svg1,cantidadP1,alturaRect,titulo){
    svg1str = `<div><h1>${titulo}</h1>`
    svg1str += `
    <svg width="${170*cantidadP1}" height="500">
    <line x1="40" y1="50" x2="40" y2="300" stroke="black" stroke-width="2" />
    <line x1="40" y1="299" x2="${120*cantidadP1}" y2="299" stroke="black" stroke-width="2" />
    `
    svg1str+= `<text x="35" y="45" fill="black"  >%</text>`
    svg1str+= `<text x="${120*cantidadP1}" y="320" fill="black">Fecha</text>`

    for(var j=0;j<=10;j++){
        svg1str+= `<text x="5" y="${50 + j *25}" fill="black" font-size="15" >${(Max_svg1*((10-j)/10))}</text>`
        svg1str+= `<line x1="35" y1="${50 + j *25}" x2="41" y2="${50+ j *25}" stroke="black" stroke-width="2" />`
        svg1str+= `<line x1="40" y1="${50 + j *25}" x2="${120*cantidadP1}" y2="${50+ j *25}" stroke="black" stroke-width="0.5" />`
    }
    
    var i = 0;
    var max = 0;
    for (var key in datos) {
        if (datos.hasOwnProperty(key)) {
        max = key > max ? key : max;
        }
    }

    const valor_ccr = datos[max]

    const ciclos = valor_ccr.ciclos;
    const penalizaciones = valor_ccr.penalizaciones;

    var timepoTotal = 0;
    var fecha = "";
    ciclos.map((item) => {
        if(fecha == ""){
            fecha = item.fecha_creacion;
        }
        timepoTotal += parseFloat(item.tiempo);
    })

    var penalizacion1 =0;
    var penalizacion2 =0;
    penalizaciones.map((item) => {
        penalizacion1 += item.nombre == 'Esta parado cuando deberia estar sentado' ? parseFloat(item.tiempo) : 0;
        penalizacion2 += item.nombre == 'Esta sentado cuando deberia estar parado' ? parseFloat(item.tiempo) : 0;
    })

    var timepoRestado = timepoTotal - penalizacion1 - penalizacion2;

    const val_real_svg2 = penalizacion1/timepoTotal;
    const val_real_svg3 = penalizacion2/timepoTotal;

    svg1str +=`<rect x="${50+60*i}" y="${300-250*val_real_svg2}" (300-250*val_real_svg1)}" width="50" height="${alturaRect*val_real_svg2}" fill="#FFA965" />`
    svg1str +=`<rect x="${50+60*i}" y="${300-250*val_real_svg2-250*val_real_svg3}" (300-250*val_real_svg1)}" width="50" height="${alturaRect*val_real_svg3}" fill="#FF6565" />`
    svg1str +=`<text x="310" y="${-70-60*i}" fill="black"  transform="rotate(90)" >${fecha}</text>`

    svg1str += `</svg></div>`  
    return svg1str;
}