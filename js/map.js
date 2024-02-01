async function initMap() {
    // Request needed libraries.
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const center = { lat: 49.31424626956194, lng: 14.152326085413861 };
    const map = new Map(document.getElementById("map"), {
        zoom: 10,
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
        <div class="property_base">
            <img class="rounded" style="height: 2rem; width: auto; " src="${property.imgSrc}" alt="Card image cap">
        </div>
        <div class="details card">
          <img class="card-img-top" src="${property.imgSrc}" alt="Card image cap">
          <div class="card-body">
              <h5 class="card-title">${property.nazev}</h5>
              <div class="card-text">
                  <ul>
                      <li><i>${property.description}</i></li>
                      <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                              fill="#3acf87" class="bi bi-file-break m-2" viewBox="0 0 16 16">
                              <path
                                  d="M0 10.5a.5.5 0 0 1 .5-.5h15a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zM12 0H4a2 2 0 0 0-2 2v7h1V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v7h1V2a2 2 0 0 0-2-2zm2 12h-1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-2H2v2a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2z" />
                          </svg>
                          ${property.panely} panelů
                      </li>
                      <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                              fill="#3acf87" class="bi bi-battery m-2" viewBox="0 0 16 16">
                              <path
                                  d="M0 6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6zm2-1a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H2zm14 3a1.5 1.5 0 0 1-1.5 1.5v-3A1.5 1.5 0 0 1 16 8z" />
                          </svg>
                          ${property.vykon} kWp výkon
                      </li>
                  </ul>
              </div>
          </div>
      `;
    return content;
}

const properties = [
    {
        nazev: "Fotovoltaika Smrkovice",
        description: "FVE v Písku obsahuje 82ks střídačů SolarEdge SE25K a SE16K",
        imgSrc: "./img/references/panely.jpg",
        vykon: 5.3,
        panely: 12,
        position: {
            lat: 49.31424626956194,
            lng: 14.152326085413861,
        },
    },
    {
        nazev: "Fotovoltaika Písek",
        description: "FVE v Písku obsahuje 82ks střídačů SolarEdge SE25K a SE16K",
        imgSrc: "./img/references/hradiste.jpg",
        vykon: 5.3,
        panely: 12,
        position: {
            lat: 49.41424626956194,
            lng: 13.832326085413861,
        },
    },
    {
        nazev: "Fotovoltaika Lýska",
        description: "FVE v Písku obsahuje 82ks střídačů SolarEdge SE25K a SE16K",
        imgSrc: "./img/references/panely2.jpg",
        vykon: 5.3,
        panely: 12,
        position: {
            lat: 49.21338206154829, 
            lng: 14.189628372059293
        },
    },
    {
        nazev: "Fotovoltaika Marek",
        description: "FVE v Písku obsahuje 82ks střídačů SolarEdge SE25K a SE16K",
        imgSrc: "./img/references/panely.jpg",
        vykon: 5.3,
        panely: 12,
        position: {
            lat: 49.41338206154829, 
            lng: 14.189628372059293
        },
    },
    {
        nazev: "Fotovoltaika Valek",
        description: "FVE v Písku obsahuje 82ks střídačů SolarEdge SE25K a SE16K",
        imgSrc: "./img/references/semice.png",
        vykon: 5.3,
        panely: 12,
        position: {
            lat: 49.21338206154829, 
            lng: 14.229628372059293
        },
    },
];

initMap();