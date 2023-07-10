
document.addEventListener("scroll", NavbarScroll);
function NavbarScroll() {
    if (window.pageYOffset > document.getElementById("services").offsetTop + 20) {
        document.getElementById("navbar").classList.remove("navbar-dark");
        document.getElementById("navbar").classList.add("navbar-light");
        document.getElementById("navbar").classList.add("navbar-white");
    } else {
        document.getElementById("navbar").classList.remove("navbar-light");
        document.getElementById("navbar").classList.remove("navbar-white");
        document.getElementById("navbar").classList.add("navbar-dark");
    }
}

function Toggle(toggleDiv) {
    const p = toggleDiv.querySelector(".options");
    console.log(p);
    p.firstElementChild.setAttribute("class", "dark");
    p.lastElementChild.setAttribute("class", "light");    
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function StridacChoose(clicked) {
    let deye = document.querySelector("#deye-check");
    if (document.querySelector('label[for="deye-check"]').classList.contains("btn-dark")) {
        let deyeLabel = document.querySelector('label[for="deye-check"]');
        deyeLabel.classList.remove("btn-dark");
        deyeLabel.classList.add("btn-outline-dark");
    } 

    let solax = document.querySelector("#solax-check");
    if (document.querySelector('label[for="solax-check"]').classList.contains("btn-dark")) {
        let solaxLabel = document.querySelector('label[for="solax-check"]');
        solaxLabel.classList.remove("btn-dark");
        solaxLabel.classList.add("btn-outline-dark");
    } 

    let solaredge = document.querySelector("#solaredge-check");
    if (document.querySelector('label[for="solaredge-check"]').classList.contains("btn-dark")) {
        let solaredgeLabel = document.querySelector('label[for="solaredge-check"]');
        solaredgeLabel.classList.remove("btn-dark");
        solaredgeLabel.classList.add("btn-outline-dark");
    } 

    clicked.classList.remove("btn-outline-dark");
    clicked.classList.add("btn-dark");
}

function PanelChoose(clicked) {
    let deye = document.querySelector("#solaris-check");
    if (document.querySelector('label[for="solaris-check"]').classList.contains("btn-dark")) {
        let solarisLabel = document.querySelector('label[for="solaris-check"]');
        solarisLabel.classList.remove("btn-dark");
        solarisLabel.classList.add("btn-outline-dark");
    } 

    let solax = document.querySelector("#lipnic-check");
    if (document.querySelector('label[for="lipnic-check"]').classList.contains("btn-dark")) {
        let lipnicLabel = document.querySelector('label[for="lipnic-check"]');
        lipnicLabel.classList.remove("btn-dark");
        lipnicLabel.classList.add("btn-outline-dark");
    } 

    clicked.classList.remove("btn-outline-dark");
    clicked.classList.add("btn-dark");
}

function WriteSolarForm() {
    let form = document.querySelector("#calculator-form");

    let stridac = "";
    if (form[3])
        stridac = form[3].value;
    if (form[4])
        stridac = form[4].value;
    if (form[5])
        stridac = form[5].value; 

    let panely = "";
    if (form[1])
        panely = form[1].value;
    if (form[2])
        panely = form[2].value;

    let message = "Mám zájem o " + form[0].value + " " + panely + " panelů, střídač značky " + stridac  + ", baterii s kapacitou " + form[4].value + " kWh. Vyřízení dotace: " + (form[5].checked ? "Ano" : "Ne") + ". Zajištění wallboxu: " + (form[6].checked ? "Ano" : "Ne") + ". Montáž optimizéru: " + (form[7].checked ? "Ano" : "Ne") + ".";
    
    let msgInput = document.querySelector("#message");
    msgInput.value = message;
    msgInput.classList.add("not-empty");
}

function CalculateSolar(solarForm, output, output_dotace) {
    console.log('recalculating');
    let totalPrice = 0;

    const panelCount = solarForm[0].value;

    const solaris = solarForm[1].checked;
    const lipnic = solarForm[2].checked;

    const deye = solarForm[3].checked;
    const solax = solarForm[4].checked;
    const solaredge = solarForm[5].checked;

    const kwhBaterie = solarForm[6].value;

    const vyriditDotaci = solarForm[7].checked;
    const chceteWallbox = solarForm[8].checked;
    const chceteOptimizer = solarForm[9].checked;


    if (vyriditDotaci) {
        totalPrice += 20000;
    }

    if (chceteWallbox) {
        totalPrice -= 20000; 
    }

    if (chceteOptimizer) {
        totalPrice += 1200 * panelCount;
    }

    // BATERIE 
    totalPrice += kwhBaterie * 12000;

    // PANELY
    totalPrice += panelCount * 13200;

    if (solaris)
        totalPrice += 10000;
    
    if (lipnic)
        totalPrice += 20000;


    // STRIDACE
    if (deye)
        totalPrice += 150000;
    
    if (solax)
        totalPrice += 75000;

    if (solaredge)
        totalPrice += 100000;

    if (panelCount < 23) {
        // Stridac mensi price
        totalPrice += 65000;
    } else {
        // Price for vetsi stridac
        totalPrice += 455 * panelCount / 15000 * 75000;
    } 


    // ELEKTROPRACE
    if (700 * panelCount < 15000) {
        totalPrice += 15000;
    } else {
        totalPrice += 700 * panelCount;
    }

    // OSTATNI (distributor, upravy, doprava, revize)
    totalPrice += 5000 + 3000 + 3000 + 5000 + 200;
    dotace = (totalPrice / 2) > 200000 ? 200000 : totalPrice /  2;

    console.log("Cena bez dph bude: ", totalPrice);
    console.log("Dotace bude: ", dotace);
    console.log(output);

    output.innerText = numberWithCommas(totalPrice - dotace) + " Kč";
    output_dotace.innerText = "Bez dotace: " + numberWithCommas(totalPrice) + " Kč";
}