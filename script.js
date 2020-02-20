 let container = document.querySelector(".data-container");
 const template = document.querySelector("template");
 const endpoint = "https://spreadsheets.google.com/feeds/list/14zgpcaQEX7A3CRcGnQX5rMbImw_OoG_9FypgNzZ4kh4/od6/public/values?alt=json";
 let alleSkrifttyper = [];
 let filter = "alle";
 let filterOverskrift = "overskrift"
 document.addEventListener("DOMContentLoaded", start);

 function start() {
     loadData();
     addEventListenersToButtons();
 }




 async function loadData() {
     const response = await fetch(endpoint);
     alleSkrifttyper = await response.json();
     console.log(alleSkrifttyper);
     visSkrifttyper();
 }

 function filtrering() {
     filter = this.dataset.kategori;
     console.log(filter);



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

     alleSkrifttyper.feed.entry.forEach(skrifttype => {
         /* if ((filter == "alle" || filter == skrifttype.gsx$type.$t) || ((filter == "overskrift" || filter == skrifttype.gsx$overskriftbrodtekst.$t) && (filter == "serif" || filter == skrifttype.gsx$type.$t))) {*/

         if (filter == "alle" || skrifttype.gsx$overskriftbrodtekst.$t == "overskrift" && filter == skrifttype.gsx$type.$t)

         {


             let klon = template.cloneNode(true).content;
             klon.querySelector("h3").textContent = skrifttype.gsx$navn.$t;
             klon.querySelector("img").src = `img/${skrifttype.gsx$imgs.$t}.svg`;
             klon.querySelector("#style").textContent = skrifttype.gsx$style.$t;
             klon.querySelector("#classic").textContent = skrifttype.gsx$classic.$t;
             //             klon.querySelector("#overskriftbrodtekst").textContent = skrifttype.gsx$overskriftbrodtekst.$t;
             //             klon.querySelector(".skrifttyper").addEventListener("click", () => {
             //                 location.href = "detalje.html?id=" + skrifttype.gsx$id.$t;
             //             });


             container.appendChild(klon);

         }


     })


 }

 function addEventListenersToButtons() {
     console.log("Button clicked");
     document.querySelectorAll(".filter").forEach(elm => {
         elm.addEventListener("click", filtrering);
     })
 }
