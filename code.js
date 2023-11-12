var evidencaDatumov = [];

var id 
function avg(){
    stevila2 = JSON.parse(localStorage.getItem("stevila")) || [];
    var sum = 0
    stevila2.forEach(element => {
        sum += parseFloat(element)
    });


    return sum/stevila2.length
}
var stevila = JSON.parse(localStorage.getItem("stevila")) || [];

function min(){
    stevila21 = JSON.parse(localStorage.getItem("stevila")) || [];
    var max = Math.max
    stevila21.forEach(element => {
        if(max > element)
            max = element
    });


    return max

}
function max(){
    stevila22 = JSON.parse(localStorage.getItem("stevila")) || [];
    var max = 0
    stevila22.forEach(element => {
        if(max < element)
        max = element
    });


    return max

}

function update(){
    document.getElementById("povprecje").innerHTML = "Povprečje: " + avg()
    document.getElementById("max").innerHTML = "Maks. vrednost : " + max()
    document.getElementById("min").innerHTML = "Min vrednost: " + min()

}


pocisti.onclick = function(){
    document.getElementById("datum").value = ""
    document.getElementById("opombe").value = ""
    document.getElementById("vsota").value = ""
    document.getElementById("trgovec").value = ""

}    



document.getElementById("datum").value ="2023-03-22"
document.getElementById("vsota").value = ""

poslji.onclick = function(){ 

    datum  = (document.getElementById("datum").value).split("-")
    //console.log(datum)
   /* console.log(datum.length)*/

    if(datum.length != "3"){
        alert("vnesi pravilen datum")
    }
    else{
        leto = datum[0]
        mesec = datum[1]
        trgovec  = document.getElementById("trgovec").value
        vsota  = document.getElementById("vsota").value
        opombe  = document.getElementById("opombe").value
        const re = new RegExp("/^[0-9]+(\.)?[0-9]*$/");
       // console.log(vsota)
        if(vsota.length == 0){
            alert("vnesi pravilno vsoto")
        }
        else{
            var vsa = JSON.parse(localStorage.getItem("stevila")) || [];

            if(opombe.length == 0)
                opombe = "/"
            if(!NaN){
                vsa.push(vsota)
            }
            vnosVTabelo()
            localStorage.setItem(("stevila"), JSON.stringify(vsa));
            update()

        }
//PORPAVI DA SE POBRISE
        document.getElementById("opombe").value = ""
        //document.getElementById("datum").value = ""
    }

}   

function vnosVTabelo(){
    var tabele = document.getElementById("tabele")
    var tabela = document.createElement("table")
    var vrstica = document.createElement("tr")
    var vrsticaNaslov = document.createElement("tr")

    var brisanje = document.createElement("button")
    var bris = document.createElement("td")
    bris.appendChild(brisanje)
    brisanje.class = "gumbZaDelete"
    brisanje.innerText = "delete";
    brisanje.onclick = brisanjeVrstice



    if(evidencaDatumov.includes(mesec+" "+leto) ){
       // console.log( document.getElementById(mesec +" "+ leto))
        var obstojecaTabela = document.getElementById(mesec +" "+ leto)
    }
    /*else{
        var DatumNaslov = document.createElement("th")
        var TrgovecNaslov = document.createElement("th")
        var VsotaNaslov = document.createElement("th")
        var OpombeNaslov = document.createElement("th")

        DatumNaslov.innerHTML = "Datum"
        TrgovecNaslov.innerHTML = "Trgovec"
        VsotaNaslov.innerHTML ="Vsota"
        OpombeNaslov.innerHTML = "Opombe"
        vrsticaNaslov.appendChild(DatumNaslov)
        vrsticaNaslov.appendChild(TrgovecNaslov)
        vrsticaNaslov.appendChild(VsotaNaslov)
        vrsticaNaslov.appendChild(OpombeNaslov)
        tabela.appendChild(vrsticaNaslov)
       

    }*/

    
   

    var podatekTrgovec = document.createElement("td")
    var podatekVsota = document.createElement("td")
    var podatekOpombe = document.createElement("td")
    var podatekDatum = document.createElement("td")
    podatekDatum.innerHTML = document.getElementById("datum").value
    podatekTrgovec.innerHTML = trgovec
    podatekVsota.innerHTML = vsota
    podatekOpombe.innerHTML = opombe
    vrstica.appendChild(podatekDatum)
    vrstica.appendChild(podatekTrgovec)
    vrstica.appendChild(podatekVsota)
    vrstica.appendChild(podatekOpombe)
    vrstica.appendChild(bris)


    if(evidencaDatumov.includes(mesec +" "+ leto)){
        obstojecaTabela.appendChild(vrstica)
        tabele.appendChild(obstojecaTabela) 
    }
    else{
        tabela.appendChild(vrstica)
        tabela.id = mesec +" "+ leto
        tabele.appendChild(tabela)
        evidencaDatumov.push(mesec +" "+ leto)

    }

    saveToLocalStorage()
} 


var brisanjeVrstice = function(){
    let todoLi = this.parentNode.parentNode;
    todoLi.remove();
    console.log(todoLi)
};



var verzija = JSON.parse(localStorage.getItem('verzija'));; 
var idi =  0

function saveToLocalStorage() {

    var stroski = JSON.parse(localStorage.getItem("stroski")) || [];

    for (let index = 0; index < evidencaDatumov.length ; index++){
        let table = document.getElementById(evidencaDatumov[index]).rows;
        for (let i = 0; i < table.length; i++) {
            const element = table[i];
            const participant = {
                id: idi,
                datum: element.cells[0].innerHTML,
                trgovec: element.cells[1].innerHTML,
                vsota: element.cells[2].innerHTML,
                opombe: element.cells[3].innerHTML,
            };
            //console.log(participant)
            stroski.push(participant);     
        }



        
    }

    localStorage.setItem(("stroski"), JSON.stringify(stroski));
    //localStorage.setItem("verzija", JSON.parse(verzija));

    

}


$(document).ready(() => {
    update()
    var tabele = document.getElementById("tabele")
    var data = JSON.parse(localStorage.getItem('stroski'));

    var identifikator = ""
    for(let i = 0; i < data.length; i++){
        var tabela = document.createElement("table")
        var vrstica = document.createElement("tr")

        
        for (const key in data[i]){
            if(key != "id"){
                const td = document.createElement("td");
                td.innerText = data[i][key];
                vrstica.appendChild(td);
            }   
            else{
                identifikator = id
            }
    }  
        var brisanje = document.createElement("button") 
        brisanje.class = "gumbZaDelete"
        brisanje.innerText = "delete";
        brisanje.onclick = brisanjeVrstice2
        vrstica.appendChild(brisanje);
        tabela.appendChild(vrstica);
        tabele.appendChild(tabela)
    }


    /*for (let index = 0; index < data.length; index++) {
        var tabela = document.createElement("table")
        var vrstica = document.createElement("tr")
        const podatek = document.createElement("td");
        podatek.innerText = data[index];
        vrstica.appendChild(podatek);




        tabela.appendChild(vrstica);
        tabele.appendChild(tabela)
        
    }*/
    
      


/*
   
    for(let st = 0; st < nazaj.length  ; st++){
        var tabela = document.createElement("table")
        var vrstica = document.createElement("tr")
        const podatek = document.createElement("td");
        podatek.innerText = nazaj[st].datum;
        vrstica.appendChild(podatek);
       const podatek1 = document.createElement("td");
        podatek1.innerText = nazaj[st].trgovec;
        vrstica.appendChild(podatek1);
        const podatek2 = document.createElement("td");
        podatek2.innerText = nazaj[st].vsota;
        vrstica.appendChild(podatek2);
        const podatek3 = document.createElement("td");
        podatek3.innerText = nazaj[st].opombe;
        vrstica.appendChild(podatek3);
       


        tabela.appendChild(vrstica);
        tabele.appendChild(tabela)
    }*/

});


var brisanjeVrstice2 = function(){
    
};
    /*
$('document').ready(function(){
        verzija += 1
        let verzijaPrikaza = JSON.parse(localStorage.getItem('verzija'));
        let data = JSON.parse(localStorage.getItem('table'+verzijaPrikaza));
        let data2 = JSON.parse(localStorage.getItem('table'+(verzijaPrikaza-1)));
        console.log("prikazujem"+verzijaPrikaza)
        var skupno = data.concat(data2)
        console.log(data)
        console.log(data2)
        console.log(skupno  )

        if(data != "null" && data2 != null){
            
        }
    
        localStorage.setItem(("table"+verzijaPrikaza), JSON.stringify(skupno));
        localStorage.setItem("verzija", JSON.parse(verzija));
    
        var razdeljenDatum
        var razvrstimo = new Set()
    
        for (let index = 0; index < skupno.length-1; index++) {
            if(skupno[index].datum == "Datum"){
            }
            else{
                razdeljenDatum = skupno[index].datum.split("-")
                razvrstimo.add((razdeljenDatum[0] +" "+ razdeljenDatum[1]))
            }        
        }
    
    
        razvrstimo.forEach(element => {
            for (let index = 0; index < skupno.length-1; index++) {
                razdeljenDatum = skupno[index].datum.split("-")
                    if((razdeljenDatum[0] +" "+ razdeljenDatum[1]) == element) {
    
                    }
            }
        });
        
        var tabele = document.getElementById("tabele")
        
    
        for(let st = 0; st < skupno.length ; st++){
            var tabela = document.createElement("table")
            var vrstica = document.createElement("tr")
           // console.log(skupno[st])
            const podatek = document.createElement("td");
            podatek.innerText = skupno[st].datum;
            vrstica.appendChild(podatek);
            const podatek1 = document.createElement("td");
            podatek1.innerText = skupno[st].trgovec;
            vrstica.appendChild(podatek1);
            const podatek2 = document.createElement("td");
            podatek2.innerText = skupno[st].vsota;
            vrstica.appendChild(podatek2);
            const podatek3 = document.createElement("td");
            podatek3.innerText = skupno[st].opombe;
            vrstica.appendChild(podatek3);
           const podatek4 = document.createElement("td");
            podatek4.innerText = skupno[st].opombe;
            vrstica.appendChild(podatek4);  


            tabela.appendChild(vrstica);
            tabele.appendChild(tabela)
    
        }
    
        
    
    

    






    
    
    
});

*/

urediMax.onclick = function(){
    var podatki = JSON.parse(localStorage.getItem('stroski'));
    var stev = 0
    var dict = {} 
    for (let index = 0; index < podatki.length; index++) {
        dict[stev++] = podatki[index]

    }

   // console.log(dict)

   podatki.sort(function(a,b) {
        return b.vsota - a.vsota
    });

    console.log(podatki)
    localStorage.setItem(("stroski"), JSON.stringify(podatki));

}
urediMin.onclick = function(){
    var podatki = JSON.parse(localStorage.getItem('stroski'));
    var stev = 0
    var dict = {} 
    for (let index = 0; index < podatki.length; index++) {
        dict[stev++] = podatki[index]

    }

   // console.log(dict)

   podatki.sort(function(a,b) {
        return a.vsota - b.vsota
    });

    console.log(podatki)
    localStorage.setItem(("stroski"), JSON.stringify(podatki));

}