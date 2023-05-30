
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

function CalculateSolar(solarForm, output, output_dotace) {
    console.log('recalculating');
    let totalPrice = 0;

    const panelCount = solarForm[0].value;
    const vyriditDotaci = solarForm[1].checked;
    const chceteWallbox = solarForm[2].checked;
    const chceteOptimizer = solarForm[3].checked;

    if (vyriditDotaci) {
        totalPrice += 20000;
    }

    if (chceteWallbox) {
        totalPrice -= 20000; 
    }

    if (chceteOptimizer) {
        totalPrice += 1200 * panelCount;
    }

    // baterie 
    // totalPrice += 450 * 5500;

    // naklady na panely
    totalPrice += panelCount * 13200;

    if (panelCount < 23) {
        // Stridac mensi price
        totalPrice += 65000;
    } else {
        // Price for vetsi stridac
        totalPrice += 455 * panelCount / 15000 * 75000;
    } 

    // elektroprace
    if (700 * panelCount < 15000) {
        totalPrice += 15000;
    } else {
        totalPrice += 700 * panelCount;
    }

    // dalsi ceny
    totalPrice += 5000 + 3000 + 3000 + 5000 + 200;
    dotace = (totalPrice / 2) > 200000 ? 200000 : totalPrice /  2;

    console.log("Cena bez dph bude: ", totalPrice);
    console.log("Dotace bude: ", dotace);
    console.log(output);

    output.innerText = numberWithCommas(totalPrice - dotace) + " Kč";
    output_dotace.innerText = "Bez dotace: " + numberWithCommas(totalPrice) + " Kč";
}