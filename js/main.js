
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



/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
async function initMap() {
  // Request needed libraries.
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  const center = { lat: 37.43238031167444, lng: -122.16795397128632 };
  const map = new Map(document.getElementById("map"), {
    zoom: 11,
    center,
    mapId: "4504f8b37365c3d0",
  });

  for (const property of properties) {
    const AdvancedMarkerElement = new google.maps.marker.AdvancedMarkerElement({
      map,
      content: buildContent(property),
      position: property.position,
      title: property.description,
    });

    AdvancedMarkerElement.addListener("click", () => {
      toggleHighlight(AdvancedMarkerElement, property);
    });
  }
}

function toggleHighlight(markerView, property) {
  if (markerView.content.classList.contains("highlight")) {
    markerView.content.classList.remove("highlight");
    markerView.zIndex = null;
  } else {
    markerView.content.classList.add("highlight");
    markerView.zIndex = 1;
  }
}

function buildContent(property) {
  const content = document.createElement("div");

  content.classList.add("property");
  content.innerHTML = `
    <div class="icon">
        <i aria-hidden="true" class="fa fa-icon fa-${property.type}" title="${property.type}"></i>
        <span class="fa-sr-only">${property.type}</span>
    </div>
    <div class="details">
        <div class="price">${property.price}</div>
        <div class="address">${property.address}</div>
        <div class="features">
        <div>
            <i aria-hidden="true" class="fa fa-bed fa-lg bed" title="bedroom"></i>
            <span class="fa-sr-only">bedroom</span>
            <span>${property.bed}</span>
        </div>
        <div>
            <i aria-hidden="true" class="fa fa-bath fa-lg bath" title="bathroom"></i>
            <span class="fa-sr-only">bathroom</span>
            <span>${property.bath}</span>
        </div>
        <div>
            <i aria-hidden="true" class="fa fa-ruler fa-lg size" title="size"></i>
            <span class="fa-sr-only">size</span>
            <span>${property.size} ft<sup>2</sup></span>
        </div>
        </div>
    </div>
    `;
  return content;
}

const properties = [
  {
    address: "215 Emily St, MountainView, CA",
    description: "Single family house with modern design",
    price: "$ 3,889,000",
    type: "home",
    bed: 5,
    bath: 4.5,
    size: 300,
    position: {
      lat: 37.50024109655184,
      lng: -122.28528451834352,
    },
  },
  {
    address: "108 Squirrel Ln &#128063;, Menlo Park, CA",
    description: "Townhouse with friendly neighbors",
    price: "$ 3,050,000",
    type: "building",
    bed: 4,
    bath: 3,
    size: 200,
    position: {
      lat: 37.44440882321596,
      lng: -122.2160620727,
    },
  },
  {
    address: "100 Chris St, Portola Valley, CA",
    description: "Spacious warehouse great for small business",
    price: "$ 3,125,000",
    type: "warehouse",
    bed: 4,
    bath: 4,
    size: 800,
    position: {
      lat: 37.39561833718522,
      lng: -122.21855116258479,
    },
  },
  {
    address: "98 Aleh Ave, Palo Alto, CA",
    description: "A lovely store on busy road",
    price: "$ 4,225,000",
    type: "store-alt",
    bed: 2,
    bath: 1,
    size: 210,
    position: {
      lat: 37.423928529779644,
      lng: -122.1087629822001,
    },
  },
  {
    address: "2117 Su St, MountainView, CA",
    description: "Single family house near golf club",
    price: "$ 1,700,000",
    type: "home",
    bed: 4,
    bath: 3,
    size: 200,
    position: {
      lat: 37.40578635332598,
      lng: -122.15043378466069,
    },
  },
  {
    address: "197 Alicia Dr, Santa Clara, CA",
    description: "Multifloor large warehouse",
    price: "$ 5,000,000",
    type: "warehouse",
    bed: 5,
    bath: 4,
    size: 700,
    position: {
      lat: 37.36399747905774,
      lng: -122.10465384268522,
    },
  },
  {
    address: "700 Jose Ave, Sunnyvale, CA",
    description: "3 storey townhouse with 2 car garage",
    price: "$ 3,850,000",
    type: "building",
    bed: 4,
    bath: 4,
    size: 600,
    position: {
      lat: 37.38343706184458,
      lng: -122.02340436985183,
    },
  },
  {
    address: "868 Will Ct, Cupertino, CA",
    description: "Single family house in great school zone",
    price: "$ 2,500,000",
    type: "home",
    bed: 3,
    bath: 2,
    size: 100,
    position: {
      lat: 37.34576403052,
      lng: -122.04455090047453,
    },
  },
  {
    address: "655 Haylee St, Santa Clara, CA",
    description: "2 storey store with large storage room",
    price: "$ 2,500,000",
    type: "store-alt",
    bed: 3,
    bath: 2,
    size: 450,
    position: {
      lat: 37.362863347890716,
      lng: -121.97802139023555,
    },
  },
  {
    address: "2019 Natasha Dr, San Jose, CA",
    description: "Single family house",
    price: "$ 2,325,000",
    type: "home",
    bed: 4,
    bath: 3.5,
    size: 500,
    position: {
      lat: 37.41391636421949,
      lng: -121.94592071575907,
    },
  },
];

initMap();
