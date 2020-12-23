/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/controller.js":
/*!******************************!*\
  !*** ./src/js/controller.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _list_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./list.js */ \"./src/js/list.js\");\n/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./map.js */ \"./src/js/map.js\");\n\n\n\nlet countriesData, covidData, geoData, map;\n\nconst fetchGeoData = async () => {\n  geoData = await fetch(\n    \"https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Countries_%28Generalized%29/FeatureServer/0/query?where=1%3D1&outFields=FID,COUNTRY,ISO,COUNTRYAFF,AFF_ISO&outSR=4326&f=json\"\n  ).then((data) => data.json());\n};\n\nconst fetchCovidData = async () => {\n  covidData = await fetch(\"https://api.covid19api.com/summary\").then((data) =>\n    data.json()\n  );\n};\n\nconst fetchCountriesData = async () => {\n  countriesData = await fetch(\n    \"https://restcountries.eu/rest/v2/all?fields=name;latlng;alpha2Code;flag;\"\n  ).then((data) => data.json());\n};\n\nconst makeMap = async () => {\n  await fetchCovidData();\n  await fetchCountriesData();\n  map = await _map_js__WEBPACK_IMPORTED_MODULE_1__.createMapObj();\n  map.addLayer(_map_js__WEBPACK_IMPORTED_MODULE_1__.createMapLayer());\n  await fetchGeoData();\n  _map_js__WEBPACK_IMPORTED_MODULE_1__.createBoundariesLayer(geoData, map, covidData);\n  let circlesLayer = _map_js__WEBPACK_IMPORTED_MODULE_1__.createCirclesLayer(\n    covidData,\n    countriesData,\n    \"TotalConfirmed\",\n    0.1,\n    map\n  );\n  circlesLayer.addTo(map);\n\n  _list_js__WEBPACK_IMPORTED_MODULE_0__.putUlElements(\n    countriesData,\n    _list_js__WEBPACK_IMPORTED_MODULE_0__.sortByStats(covidData.Countries, _list_js__WEBPACK_IMPORTED_MODULE_0__.getSelectedStat()),\n    _list_js__WEBPACK_IMPORTED_MODULE_0__.getSelectedStat()\n  );\n  _list_js__WEBPACK_IMPORTED_MODULE_0__.inputEvent(() => reloadSortedList(countriesData, covidData));\n  _list_js__WEBPACK_IMPORTED_MODULE_0__.radioChangeEvent(() => {\n    _list_js__WEBPACK_IMPORTED_MODULE_0__.reloadSortedList(countriesData, covidData);\n    map.removeLayer(circlesLayer);\n    circlesLayer =  _map_js__WEBPACK_IMPORTED_MODULE_1__.createCirclesLayer(\n      covidData,\n      countriesData,\n      _list_js__WEBPACK_IMPORTED_MODULE_0__.getSelectedStat(),\n      0.1,\n      map\n    );\n    circlesLayer.addTo(map);\n  });\n  console.log(map)\n  _list_js__WEBPACK_IMPORTED_MODULE_0__.settingsClickEvent();\n};\n\n// List.createListMarkup();\n// List.writeData();\n_list_js__WEBPACK_IMPORTED_MODULE_0__.createListMarkup();\n_map_js__WEBPACK_IMPORTED_MODULE_1__.createMapMarkup();\nmakeMap();\n\n\n//# sourceURL=webpack://covid/./src/js/controller.js?");

/***/ }),

/***/ "./src/js/list.js":
/*!************************!*\
  !*** ./src/js/list.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createListMarkup\": () => /* binding */ createListMarkup,\n/* harmony export */   \"putUlElements\": () => /* binding */ putUlElements,\n/* harmony export */   \"inputEvent\": () => /* binding */ inputEvent,\n/* harmony export */   \"radioChangeEvent\": () => /* binding */ radioChangeEvent,\n/* harmony export */   \"sortByStats\": () => /* binding */ sortByStats,\n/* harmony export */   \"getSelectedStat\": () => /* binding */ getSelectedStat,\n/* harmony export */   \"reloadSortedList\": () => /* binding */ reloadSortedList,\n/* harmony export */   \"settingsClickEvent\": () => /* binding */ settingsClickEvent\n/* harmony export */ });\nconst createListMarkup = (parent = document.body) => {\n  const list = document.createElement(\"div\"),\n    listSearch = document.createElement(\"input\"),\n    listHeader = document.createElement(\"div\"),\n    listSettings = document.createElement(\"button\"),\n    listUl = document.createElement(\"ul\");\n\n  list.className = \"list\";\n  listSearch.className = \"list__search\";\n  listHeader.className = \"list__header\";\n  listSettings.className = \"list__settings\";\n  listUl.className = \"list__ul\";\n\n  listSearch.setAttribute(\"type\", \"text\");\n\n  listHeader.append(listSearch);\n  listHeader.append(listSettings);\n  list.append(listHeader);\n  list.append(listUl);\n  parent.append(list);\n\n  createSettings();\n};\n\nconst createULElement = (countryName, countryFlag, stats) => {\n  const listUl = document.querySelector(\".list__ul\");\n\n  const liElement = document.createElement(\"li\"),\n    liImage = document.createElement(\"img\"),\n    liName = document.createElement(\"div\"),\n    liStats = document.createElement(\"div\");\n\n  liElement.className = \"list__li\";\n  liImage.className = \"list__li-image\";\n  liName.className = \"list__li-name\";\n  liStats.className = \"list__li-stats\";\n\n  liName.innerText = countryName;\n  liStats.innerText = stats;\n  liImage.setAttribute(\"src\", countryFlag);\n\n  liElement.append(liImage);\n  liElement.append(liName);\n  liElement.append(liStats);\n  listUl.append(liElement);\n};\n\nconst createSettings = () => {\n  const list = document.querySelector(\".list\");\n  const settings = document.createElement(\"div\"),\n    radios = document.createElement(\"div\"),\n    radioTotal = document.createElement(\"input\"),\n    radioDeaths = document.createElement(\"input\"),\n    radioRecovered = document.createElement(\"input\"),\n    radioTextTotal = document.createElement(\"label\"),\n    radioTextDeaths = document.createElement(\"label\"),\n    radioTextRecovered = document.createElement(\"label\");\n\n  settings.className = \"list-settings --hide\";\n  radios.className = \"list-settings__radios\";\n  radioTotal.className = \"list-settings__radios-total\";\n  radioDeaths.className = \"list-settings__radios-deaths\";\n  radioRecovered.className = \"list-settings__radios-recovered\";\n\n  radioTotal.setAttribute(\"type\", \"radio\");\n  radioDeaths.setAttribute(\"type\", \"radio\");\n  radioRecovered.setAttribute(\"type\", \"radio\");\n\n  radioTotal.setAttribute(\"name\", \"list-radio\");\n  radioDeaths.setAttribute(\"name\", \"list-radio\");\n  radioRecovered.setAttribute(\"name\", \"list-radio\");\n\n  radioTotal.setAttribute(\"value\", \"TotalConfirmed\");\n  radioDeaths.setAttribute(\"value\", \"TotalDeaths\");\n  radioRecovered.setAttribute(\"value\", \"TotalRecovered\");\n  radioTotal.checked = true;\n\n  // radioTotal.innerHTML = \"Total confirmed<br>\"\n  // radioDeaths.innerHTML = \"Total deaths<br>\"\n  // radioRecovered.innerHTML = \"Total recovered<br>\"\n\n  radios.append(radioTotal);\n  radioTextTotal.innerHTML = \"Total confirmed<br>\";\n  radios.append(radioTextTotal);\n\n  radios.append(radioDeaths);\n  radioTextDeaths.innerHTML = \"Total deaths<br>\";\n  radios.append(radioTextDeaths);\n\n  radios.append(radioRecovered);\n  radioTextRecovered.innerHTML = \"Total recovered<br>\";\n  radios.append(radioTextRecovered);\n\n  settings.append(radios);\n  list.append(settings);\n};\n\nconst putUlElements = (flags, countries, stat) => {\n  countries.forEach((el) => {\n    let flagOfCountry = flags.find(\n      (flag) => flag.alpha2Code === el.CountryCode\n    );\n    if (flagOfCountry !== undefined) {\n      createULElement(el.Country, flagOfCountry.flag, el[stat]);\n    } else {\n      createULElement(\n        el.Country,\n        \"https://img.icons8.com/flat_round/2x/error.png\",\n        el[stat]\n      );\n    }\n  });\n};\n\nconst inputEvent = (func) => {\n  const listInput = document.querySelector(\".list__search\");\n  listInput.addEventListener(\"input\", func);\n};\n\nconst radioChangeEvent = (func) => {\n  const radios = document.querySelectorAll('[name=\"list-radio\"]');\n  radios.forEach((radio) => radio.addEventListener(\"change\", func));\n};\n\nconst sortByStats = (countries, stat) => {\n  return countries.sort((a, b) => b[stat] - a[stat]);\n};\n\nconst getSelectedStat = () => {\n  const radios = document.querySelectorAll('[name=\"list-radio\"]');\n  return Array.from(radios).find((el) => el.checked).value;\n};\n\nconst reloadSortedList = (flags, countries) => {\n  const reg = new RegExp(\n    `^${document.querySelector(\".list__search\").value.toLowerCase()}`\n  );\n  document.querySelector(\".list__ul\").innerHTML = \"\";\n  putUlElements(\n    flags,\n    sortByStats(\n      countries.Countries.filter((country) =>\n        reg.test(country.Country.toLowerCase())\n      ),\n      getSelectedStat()\n    ),\n    getSelectedStat()\n  );\n};\n\nconst settingsClickEvent = () => {\n  const settings = document.querySelector(\".list__settings\");\n  const settingsWindow = document.querySelector(\".list-settings\");\n  settings.addEventListener(\"click\", () => {\n    settingsWindow.classList.toggle(\"--hide\");\n  });\n};\n\n\n\n//# sourceURL=webpack://covid/./src/js/list.js?");

/***/ }),

/***/ "./src/js/map.js":
/*!***********************!*\
  !*** ./src/js/map.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createMapMarkup\": () => /* binding */ createMapMarkup,\n/* harmony export */   \"createMapObj\": () => /* binding */ createMapObj,\n/* harmony export */   \"createMapLayer\": () => /* binding */ createMapLayer,\n/* harmony export */   \"createCirclesLayer\": () => /* binding */ createCirclesLayer,\n/* harmony export */   \"createBoundariesLayer\": () => /* binding */ createBoundariesLayer\n/* harmony export */ });\nconst createMapMarkup = (parent = document.body) => {\n  const mapContainer = document.createElement(\"div\"),\n    mapPopup = document.createElement(\"div\"),\n    popupCountry = document.createElement(\"h3\"),\n    popupTotal = document.createElement(\"h3\"),\n    popupDeaths = document.createElement(\"h3\"),\n    popupRecovered = document.createElement(\"h3\");\n\n  mapContainer.id = \"map\";\n  mapPopup.className = \"map__popup --hide\";\n  popupCountry.className = \"popup__country\";\n  popupTotal.className = \"popup__total\";\n  popupDeaths.className = \"popup__deaths\";\n  popupRecovered.className = \"popup__recovered\";\n\n  mapPopup.append(popupCountry);\n  mapPopup.append(popupTotal);\n  mapPopup.append(popupDeaths);\n  mapPopup.append(popupRecovered);\n\n  mapContainer.prepend(mapPopup);\n  parent.append(mapContainer);\n};\n\nconst createMapOptions = () => {\n  return {\n    center: [27, 30],\n    zoom: 2,\n  };\n};\n\nconst createMapObj = () => {\n  return new L.map(\"map\", createMapOptions());\n};\n\nconst createMapLayer = () => {\n  return new L.TileLayer(\n    \"https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png\"\n  );\n};\n\nconst createMarker = (x, y) => {\n  return new L.Marker([x, y]);\n};\n\nconst createCircle = (coordinates, rad) => {\n  const circleOptions = {\n    color: \"red\",\n    fillColor: \"#f03\",\n    fillOpacity: 0.6,\n  };\n  return L.circle(coordinates, rad, circleOptions);\n};\n\nconst createCirclesLayer = (countries,coordinatesOfCountries, stats, scale,map) => {\n  const circles = [];\n  countries.Countries.forEach((country) => {\n   const coordinates = coordinatesOfCountries.find(\n      (coords) => coords.alpha2Code === country.CountryCode\n    );\n    if (coordinates !== undefined) {\n      if (country.TotalConfirmed > 10) {\n        const circle = createCircle(coordinates.latlng, country[stats] * scale);\n        circle.bindPopup(\n          \"Country: \" +\n            country.Country +\n            \"<br>\" +\n            \"Statistics: \" +\n            country[stats]\n        );\n        circles.push(circle);\n      }\n    }\n  });\n  return L.layerGroup(circles);\n};\n\nconst createBoundary = (latlng) => {\n  return L.multiPolygon(latlng, {\n    color: \"red\",\n    fillColor: \"black\",\n    fillOpacity: 0,\n    weight: 1,\n  });\n};\n\nconst createBoundariesLayer = (geo, parent, stats) => {\n  const popup = document.querySelector(\".map__popup\");\n  geo.features.forEach((coordinates) => {\n    const name = getCountryName(coordinates);\n    const statsOfCountry = stats.Countries.find(el=>el.CountryCode===name);\n    const currentBoundary = createBoundary(fixCoordinates(coordinates));\n    currentBoundary.on(\"mouseover\", () => {\n      currentBoundary.setStyle({\n        color: \"white\",\n        fillColor: \"white\",\n        fillOpacity: 0.2,\n        weight: 1,\n      });\n      popup.classList.toggle(\"--hide\");\n      addStatsToPopup(statsOfCountry);\n    });\n    currentBoundary.on(\"mouseout\", () => {\n      currentBoundary.setStyle({\n        color: \"red\",\n        fillColor: \"black\",\n        fillOpacity: 0,\n        weight: 1,\n      });\n      clearStatsOfPopup();\n      popup.classList.toggle(\"--hide\");\n    });\n    currentBoundary.addTo(parent);\n  });\n};\n\nconst addStatsToPopup = (stats) => {\n  console.log(stats);\n  document.querySelector(\n    \".popup__country\"\n  ).innerText = `Country: ${stats.Country}`;\n  document.querySelector(\n    \".popup__total\"\n  ).innerText = `Total confirmed: ${stats.TotalConfirmed}`;\n  document.querySelector(\n    \".popup__deaths\"\n  ).innerText = `Total deaths: ${stats.TotalDeaths}`;\n  document.querySelector(\n    \".popup__recovered\"\n  ).innerText = `Total recovered: ${stats.TotalRecovered}`;\n};\n\nconst clearStatsOfPopup = () => {\n  document.querySelector(\".popup__country\").innerText = \"\";\n  document.querySelector(\".popup__total\").innerText = \"\";\n  document.querySelector(\".popup__deaths\").innerText = \"\";\n  document.querySelector(\".popup__recovered\").innerText = \"\";\n};\n\nconst fixCoordinates = (coords) => {\n  return coords.geometry.rings.map((el) => el.map((alt) => alt.reverse()));\n};\n\nconst getCountryName = (coords)=>{\n  return coords.attributes.ISO;\n}\n\n\n\n\n\n\n//# sourceURL=webpack://covid/./src/js/map.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/js/controller.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;