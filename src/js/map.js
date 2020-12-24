import L from './leaflet.js'
export const createMapMarkup = (parent = document.querySelector('.graphics_map')) => {
  const mapContainer = document.createElement("div"),
    mapPopup = document.createElement("div"),
    popupCountry = document.createElement("h3"),
    popupTotal = document.createElement("h3"),
    popupDeaths = document.createElement("h3"),
    popupRecovered = document.createElement("h3");

  mapContainer.id = "map";
  mapPopup.className = "map__popup --hide";
  popupCountry.className = "popup__country";
  popupTotal.className = "popup__total";
  popupDeaths.className = "popup__deaths";
  popupRecovered.className = "popup__recovered";

  mapPopup.append(popupCountry);
  mapPopup.append(popupTotal);
  mapPopup.append(popupDeaths);
  mapPopup.append(popupRecovered);

  mapContainer.prepend(mapPopup);
  parent.append(mapContainer);
};

const createMapOptions = () => {
  return {
    center: [27, 30],
    zoom: 2,
  };
};

export const createMapObj = () => {
  return new L.map("map", createMapOptions());
};

export const createMapLayer = () => {
  return new L.TileLayer(
    "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
  );
};

const createMarker = (x, y) => {
  return new L.Marker([x, y]);
};

const createCircle = (coordinates, rad) => {
  const circleOptions = {
    color: "red",
    fillColor: "#f03",
    fillOpacity: 0.6,
  };
  return L.circle(coordinates, rad, circleOptions);
};

export const createCirclesLayer = (countries,coordinatesOfCountries, stats, scale,map) => {
  const circles = [];
  countries.Countries.forEach((country) => {
   const coordinates = coordinatesOfCountries.find(
      (coords) => coords.alpha2Code === country.CountryCode
    );
    if (coordinates !== undefined) {
      if (country.TotalConfirmed > 10) {
        const circle = createCircle(coordinates.latlng, country[stats] * scale);
        circle.bindPopup(
          "Country: " +
            country.Country +
            "<br>" +
            "Statistics: " +
            country[stats]
        );
        circles.push(circle);
      }
    }
  });
  return L.layerGroup(circles);
};

const createBoundary = (latlng) => {
  return L.multiPolygon(latlng, {
    color: "red",
    fillColor: "black",
    fillOpacity: 0,
    weight: 1,
  });
};

export const createBoundariesLayer = (geo, parent, stats) => {
  const popup = document.querySelector(".map__popup");
  geo.features.forEach((coordinates) => {
    const name = getCountryName(coordinates);
    const statsOfCountry = stats.Countries.find(el=>el.CountryCode===name);
    const currentBoundary = createBoundary(fixCoordinates(coordinates));
    currentBoundary.on("mouseover", () => {
      currentBoundary.setStyle({
        color: "white",
        fillColor: "white",
        fillOpacity: 0.2,
        weight: 1,
      });
      popup.classList.toggle("--hide");
      addStatsToPopup(statsOfCountry);
    });
    currentBoundary.on("mouseout", () => {
      currentBoundary.setStyle({
        color: "red",
        fillColor: "black",
        fillOpacity: 0,
        weight: 1,
      });
      clearStatsOfPopup();
      popup.classList.toggle("--hide");
    });
    currentBoundary.addTo(parent);
  });
};

const addStatsToPopup = (stats) => {
  console.log(stats);
  document.querySelector(
    ".popup__country"
  ).innerText = `Country: ${stats.Country}`;
  document.querySelector(
    ".popup__total"
  ).innerText = `Total confirmed: ${stats.TotalConfirmed}`;
  document.querySelector(
    ".popup__deaths"
  ).innerText = `Total deaths: ${stats.TotalDeaths}`;
  document.querySelector(
    ".popup__recovered"
  ).innerText = `Total recovered: ${stats.TotalRecovered}`;
};

const clearStatsOfPopup = () => {
  document.querySelector(".popup__country").innerText = "";
  document.querySelector(".popup__total").innerText = "";
  document.querySelector(".popup__deaths").innerText = "";
  document.querySelector(".popup__recovered").innerText = "";
};

const fixCoordinates = (coords) => {
  return coords.geometry.rings.map((el) => el.map((alt) => alt.reverse()));
};

const getCountryName = (coords)=>{
  return coords.attributes.ISO;
}




