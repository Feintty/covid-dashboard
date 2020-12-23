import * as List from "./list.js";
import * as MapLeaflet from "./map.js";

let countriesData, covidData, geoData, map;

const fetchGeoData = async () => {
  geoData = await fetch(
    "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Countries_%28Generalized%29/FeatureServer/0/query?where=1%3D1&outFields=FID,COUNTRY,ISO,COUNTRYAFF,AFF_ISO&outSR=4326&f=json"
  ).then((data) => data.json());
};

const fetchCovidData = async () => {
  covidData = await fetch("https://api.covid19api.com/summary").then((data) =>
    data.json()
  );
};

const fetchCountriesData = async () => {
  countriesData = await fetch(
    "https://restcountries.eu/rest/v2/all?fields=name;latlng;alpha2Code;flag;"
  ).then((data) => data.json());
};

const makeMap = async () => {
  await fetchCovidData();
  await fetchCountriesData();
  map = await MapLeaflet.createMapObj();
  map.addLayer(MapLeaflet.createMapLayer());
  await fetchGeoData();
  MapLeaflet.createBoundariesLayer(geoData, map, covidData);
  let circlesLayer = MapLeaflet.createCirclesLayer(
    covidData,
    countriesData,
    "TotalConfirmed",
    0.1,
    map
  );
  circlesLayer.addTo(map);

  List.putUlElements(
    countriesData,
    List.sortByStats(covidData.Countries, List.getSelectedStat()),
    List.getSelectedStat()
  );
  List.inputEvent(() => reloadSortedList(countriesData, covidData));
  List.radioChangeEvent(() => {
    List.reloadSortedList(countriesData, covidData);
    map.removeLayer(circlesLayer);
    circlesLayer =  MapLeaflet.createCirclesLayer(
      covidData,
      countriesData,
      List.getSelectedStat(),
      0.1,
      map
    );
    circlesLayer.addTo(map);
  });
  console.log(map)
  List.settingsClickEvent();
};

List.createListMarkup();
MapLeaflet.createMapMarkup();
makeMap();
