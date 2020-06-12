(function () {

    mapboxgl.accessToken = 'pk.eyJ1IjoiZ2FsbG93YXlldmFuIiwiYSI6ImNqanJlendzeTJ2MGIza3M0bzdzaGx5ZW8ifQ.Baz1Ju09q2mNHqw1gUbbSQ';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10',
        center: [-80.1, 35.4],
        minZoom: 6,
        zoom: 6,
        maxZoom: 10
    });
    map.on('load', function () {

        map.addSource('id_md', {
            type: 'geojson',
            data:
                'infectious_disease_md_points.json',
            cluster: true,
            clusterMaxZoom: 14, // Max zoom to cluster points on
            clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
        });

        map.addLayer({
            id: 'clusters',
            type: 'circle',
            source: 'id_md',
            filter: ['has', 'point_count'],
            paint: {

                'circle-color': [
                    "interpolate-hcl",
                    ["linear"],
                    ['get', 'point_count'],
                    0, "HSL(240, 30%, 89%)",
                    82, "HSL(258, 34%, 48%)"
                ],
                "circle-radius": [
                    "sqrt", ["*", ["get", "point_count"], 32]
                ]

            }
        });

        map.addLayer({
            id: 'cluster-count',
            type: 'symbol',
            source: 'id_md',
            filter: ['has', 'point_count'],
            layout: {
                'text-field': '{point_count_abbreviated}',
                'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                'text-size': 12
            }
        });

        map.addLayer({
            id: 'unclustered-point',
            type: 'circle',
            source: 'id_md',
            filter: ['!', ['has', 'point_count']],
            paint: {
                'circle-color': '#dadaeb',
                'circle-radius': 4,
                'circle-stroke-width': 1,
                'circle-stroke-color': '#4a1486'
            }
        });

    });

})();