require(["esri/config", "esri/Map", "esri/views/MapView", "esri/widgets/BasemapToggle", "esri/widgets/BasemapGallery", "esri/layers/FeatureLayer"], function (esriConfig, Map, MapView, BasemapToggle, BasemapGallery, FeatureLayer) {


    esriConfig.apiKey = "AAPTxy8BH1VEsoebNVZXo8HurGzaVX84y0gnQrzOsoa5XiQ-JsGtCnEBLMNN9H5DVjP2wh-bnv-hOt5VbphcP4IUXlFNDV3qVO2etTKHogYwCBSa2VOACsQwGaEaLTWBzlVQ_Ajiat4BImzNL8w5IG1i4nKIOhtKD-dcLdvAMDVxAaXei_7KhoNy2JdYq43KoIHmI54FBrDUTBmA5Pf5elbwnaljbM4_bH2cn2aQmsAJpOk.AT1_1tr0X9F6";
    const map = new Map({
        basemap: "arcgis-topographic" // Basemap layer service
    });
    const view = new MapView({
        map: map,
        center: [-7.62, 33.59], // Longitude, latitude
        zoom: 10, // Zoom level
        container: "viewDiv" // Div element
    });

    // let basemapToggle = new BasemapToggle({
    //     view: view,
    //     nextBasemap: "hybrid"
    // });

    // view.ui.add(basemapToggle, "bottom-right");

    document.getElementById("myButton").addEventListener("click", showBasemapGallery);

    let isMapShown = false;
    let basemapGallery;

    function showBasemapGallery() {

        if (!isMapShown) {

            basemapGallery = new BasemapGallery({
                view: view
            });

            // Add widget to the top right corner of the view
            view.ui.add(basemapGallery, {
                position: "top-right"
            });
            document.getElementById("myButton").textContent = "Hide Basemap Gallery";
            isMapShown = true;
        }

        

        else {
            view.ui.remove(basemapGallery);
            document.getElementById("myButton").textContent = "Basemap Gallery";
            isMapShown = false;
        }
    }


    const commRenderer = {
        type: "class-breaks",
        // attribute of interest
        field: "Shape_Area",
        classBreakInfos: [
            {
                minValue: 0,
                maxValue: 8000000,
                symbol: {
                    type: "simple-fill", // autocasts as new SimpleFillSymbol()
                    color: [255, 255, 212],
                    style: "solid",
                    outline: { // autocasts as new SimpleLineSymbol()
                        color: "white",
                        width: 1
                    },
                }
            },
            {
                minValue: 8000001,
                maxValue: 16000000,
                symbol: {
                    type: "simple-fill", // autocasts as new SimpleFillSymbol()
                    color: [254, 227, 145],
                    style: "solid",
                    outline: { // autocasts as new SimpleLineSymbol()
                        color: "white",
                        width: 1
                    }
                }
            },
            {
                minValue: 16000001,
                maxValue: 26000000,
                symbol: {
                    type: "simple-fill", // autocasts as new SimpleFillSymbol()
                    color: [254, 196, 79],
                    style: "solid",
                    outline: { // autocasts as new SimpleLineSymbol()
                        color: "white",
                        width: 1
                    }
                }
            },
            {
                minValue: 26000001,
                maxValue: 48000000,
                symbol: {
                    type: "simple-fill", // autocasts as new SimpleFillSymbol()
                    color: [254, 153, 41],
                    style: "solid",
                    outline: { // autocasts as new SimpleLineSymbol()
                        color: "white",
                        width: 1
                    }
                }
            },
            {
                minValue: 48000001,
                maxValue: 78000000,
                symbol: {
                    type: "simple-fill", // autocasts as new SimpleFillSymbol()
                    color: [217, 95, 14],
                    style: "solid",
                    outline: { // autocasts as new SimpleLineSymbol()
                        color: "white",
                        width: 1
                    }
                }
            },
            {
                minValue: 78000001,
                maxValue: 135000000,
                symbol: {
                    type: "simple-fill", // autocasts as new SimpleFillSymbol()
                    color: [153, 52, 4],
                    style: "solid",
                    outline: { // autocasts as new SimpleLineSymbol()
                        color: "white",
                        width: 1
                    }
                }
            },
        ]
    };




    const communeLayer = new FeatureLayer({
        url: "https://services5.arcgis.com/D6UE8F2zye9hxeWo/arcgis/rest/services/Communes/FeatureServer",
        renderer: commRenderer
    });

    const roadLayer = new FeatureLayer({
        url: "https://services5.arcgis.com/D6UE8F2zye9hxeWo/arcgis/rest/services/voirie_casa_1/FeatureServer",
        renderer: {
            type: "simple",
            symbol: {
                type: "simple-line", // Utilisation d'un symbole de ligne pour mieux représenter les routes
                color: [255, 165, 0, 1], // Orange (RGB)
                width: 2 // Augmente la visibilité des routes
            }
        }
    });


    const sizeVisualVariable = {
        type: "size",
        field: "TOTAL2004",
        minDataValue: 3365,
        maxDataValue: 323944,
        minSize: 8,
        maxSize: 30
    };

    let popRenderer = {
        type: "simple", // autocasts as new SimpleRenderer()
        symbol: {
            type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
            size: 6,
            color: "red",
            outline: { // autocasts as new SimpleLineSymbol()
                width: 0.5,
                color: "white"
            }
        },
        visualVariables: [sizeVisualVariable]
    };

    const populationLayer = new FeatureLayer({
        url: "https://services5.arcgis.com/D6UE8F2zye9hxeWo/arcgis/rest/services/casa_population1/FeatureServer",
        renderer: popRenderer
    });

    const quartierLayer = new FeatureLayer({
        url: "https://services5.arcgis.com/D6UE8F2zye9hxeWo/arcgis/rest/services/Quartier/FeatureServer",
        renderer: {
            type: "simple",
            symbol: {
                type: "simple-fill",
                color: [144, 238, 144, 0.6], // Vert clair
                outline: { color: [34, 139, 34], width: 1 }
            }
        }
    });

    const bidonvillesLayer = new FeatureLayer({
        url: "https://services5.arcgis.com/D6UE8F2zye9hxeWo/arcgis/rest/services/Bidonvilles/FeatureServer",
        renderer: {
            type: "simple",
            symbol: {
                type: "simple-fill",
                color: [105, 105, 105, 0.6], // Gris foncé
                outline: { color: [169, 169, 169], width: 1 }
            }
        }
    });

    const sitesLayer = new FeatureLayer({
        url: "https://services5.arcgis.com/D6UE8F2zye9hxeWo/arcgis/rest/services/sites/FeatureServer",
        renderer: {
            type: "simple",
            symbol: {
                type: "simple-fill",
                color: [138, 43, 226, 0.6], // Violet (BlueViolet)
                outline: { color: [75, 0, 130], width: 1 } // Contour violet foncé
            }
        }
    });


    // Ajout des couches à la carte
    map.add(communeLayer);
    map.add(roadLayer);
    map.add(populationLayer);
    map.add(quartierLayer);
    map.add(bidonvillesLayer);
    map.add(sitesLayer);



});




