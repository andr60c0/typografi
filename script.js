 let container = document.querySelector(".data-container");
 const template = document.querySelector("template");
 const endpoint = "https://spreadsheets.google.com/feeds/list/14zgpcaQEX7A3CRcGnQX5rMbImw_OoG_9FypgNzZ4kh4/od6/public/values?alt=json";
 let alleSkrifttyper = [];
 let filter = "alle";
 document.addEventListener("DOMContentLoaded", start);

 function start() {
     loadData();
     addEventListenersToButtons();
 }




 async function loadData() {
     const response = await fetch(endpoint);
     alleSkrifttyper = await response.json();
     //console.log(alleSkrifttyper);
     visSkrifttyper();
 }

 function filtrering() {
     filter = this.dataset.kategori;
     console.log("filtrering", filter);



     //document.querySelector(".valgt").classList.remove("valgt");
     document.querySelectorAll(".filter").forEach(elm => {
         elm.classList.remove("valgt");
     })

     this.classList.add("valgt");
     visSkrifttyper();
     //     document.querySelector(".skrifttyper_kategori").textContent = this.textContent;
 }

 function visSkrifttyper() {

     container.textContent = "";

     alleSkrifttyper.feed.entry.forEach((skrifttype, i) => {


         if (filter == "alle" || (filter == skrifttype.gsx$type.$t && skrifttype.gsx$overskriftbrodtekst.$t == "overskrift") || (filter == "alleO" && skrifttype.gsx$overskriftbrodtekst.$t == "overskrift") || (filter == "alleB" && skrifttype.gsx$overskriftbrodtekst.$t == "brødtekst")) {


             let klon = template.cloneNode(true).content;
             klon.querySelector("h3").textContent = skrifttype.gsx$navn.$t;
             klon.querySelector("img").src = `img/${skrifttype.gsx$imgs.$t}.svg`;
             klon.querySelector("img").id = "id" + i;
             klon.querySelector(".style span").textContent = skrifttype.gsx$style.$t;
             klon.querySelector(".classic span").textContent = skrifttype.gsx$classic.$t;

             //             klon.querySelector("#skrifttyperPop").classList.add(skrifttype.gsx$class.$t);
             klon.querySelector(".skrifttyper").addEventListener("click", () => {
                 location.href = "detaljeView.html?id=" + skrifttype.gsx$id.$t;
             });

             container.appendChild(klon);

         }


     });


 }

 function addEventListenersToButtons() {
     //console.log("Button clicked");
     document.querySelectorAll(".filter").forEach(elm => {
         elm.addEventListener("click", filtrering);
     })
 }
