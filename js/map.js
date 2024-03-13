
async function initMap() {
    // Request needed libraries.
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const center = { lat: 49.61424626956194, lng: 14.552326085413861 };
    const map = new Map(document.getElementById("map"), {
        zoom: 9.4,
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
        <div class="property_base" style="background-image: url('${property.imgSrc}') !important;">
            <div class="details carded">
                <p class="card-title">${property.nazev}<p>
            </div>
        </div>
      `;
    return content;
}

const properties = [
    {
        nazev: "FVE Smrkovice",
        imgSrc: "./img/references/panely.jpg",
        position: {
            lat: 49.280943827855914, 
            lng: 14.15541410817076
        },
    },
    {
        nazev: "FVE Olešná",
        imgSrc: "./img/references/hradiste.jpg",
        position: {
            lat: 49.444545490522, 
            lng: 15.26523714202351
        },
    },
    {
        nazev: "FVE Malé Nepodřice",
        imgSrc: "./img/references/panely1.jpg",
        position: {
            lat: 49.30397590374699, 
            lng: 14.091418819949741
        },
    },
    {
        nazev: "FVE Ražice",
        imgSrc: "./img/references/panely2.jpg",
        position: {
            lat: 49.24252262394634, 
            lng: 14.099493826557135
        },
    },
    {
        nazev: "FVE Semice",
        imgSrc: "./img/references/semice.png",
        position: {
            lat: 49.28658814376823, 
            lng: 14.176138380051448
        },
    },
    {
        nazev: "FVE Okružní",
        imgSrc: "./img/references/okruznii.png",
        position: {
            lat: 49.99304198841903, 
            lng: 14.408417052048355
        },
    },
    {
        nazev: "FVE Jihlava",
        imgSrc: "./img/references/jihlava.jpg",
        position: {
            lat: 49.40162817696042, 
            lng: 15.569273592003913
        },
    },
    {
        nazev: "FVE Kluky",
        imgSrc: "./img/references/kluky.jpeg",
        position: {
            lat: 49.905022519841985, 
            lng: 15.323096832800978
        },
    },
    {
        nazev: "FVE Semice",
        imgSrc: "./img/references/semice1.jpg",
        position: {
            lat: 49.28658814376823,  
            lng: 14.890468841730007,
        },
    },
    {
        nazev: "FVE Vlašim",
        imgSrc: "./img/references/vlasim.jpg",
        position: {
            lat: 49.69325286556854, 
            lng: 14.914820859838647
        },
    },
];

initMap();