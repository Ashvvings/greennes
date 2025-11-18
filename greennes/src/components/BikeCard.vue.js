import { ref, onMounted, defineProps, defineEmits, computed } from 'vue';
import { calculateDistance, formatDistance } from '../utils/geoLocation';
const props = defineProps({
    location: String,
    userLat: Number,
    userLon: Number
});
const emit = defineEmits(['show-map']);
const loading = ref(true);
const bikeData = ref([]);
const sortedBikeData = computed(() => {
    if (!props.userLat || !props.userLon)
        return bikeData.value;
    return [...bikeData.value]
        .map((item) => ({
        ...item,
        distance: calculateDistance(props.userLat, props.userLon, item.lat, item.lon),
        formattedDistance: formatDistance(calculateDistance(props.userLat, props.userLon, item.lat, item.lon))
    }))
        .sort((a, b) => (a.distance || 0) - (b.distance || 0));
});
const fetchBikeData = async () => {
    try {
        loading.value = true;
        const response = await fetch('https://data.rennesmetropole.fr/api/explore/v2.1/catalog/datasets/etat-des-stations-le-velo-star-en-temps-reel/records?limit=10');
        const data = await response.json();
        bikeData.value = data.results.map((station) => ({
            name: station.nom_station,
            type: 'station',
            available: station.nombrevelosdisponibles,
            capacity: station.nombreemplacementsdisponibles,
            lat: station.coordonnees.lat,
            lon: station.coordonnees.lon
        }));
    }
    catch (error) {
        console.error('Erreur chargement vélos:', error);
        bikeData.value = [
            { name: 'Station Sainte-Anne', type: 'station', available: 13, capacity: 13, lat: 48.1123, lon: -1.6789 },
            { name: 'Station Hoche', type: 'station', available: 13, capacity: 13, lat: 48.1145, lon: -1.6756 },
            { name: 'Parking Hoche', type: 'parking', available: 13, lat: 48.1140, lon: -1.6750, capacity: 0 }
        ];
    }
    finally {
        loading.value = false;
    }
};
onMounted(() => {
    fetchBikeData();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['card-header']} */ ;
/** @type {__VLS_StyleScopedClasses['items-list']} */ ;
/** @type {__VLS_StyleScopedClasses['item-header']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-more']} */ ;
/** @type {__VLS_StyleScopedClasses['category-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-header']} */ ;
/** @type {__VLS_StyleScopedClasses['card-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['card-header']} */ ;
/** @type {__VLS_StyleScopedClasses['subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['category-card']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-more']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "category-card" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "card-header" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    ...{ class: "card-icon" },
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    'stroke-width': "2",
});
__VLS_asFunctionalElement(__VLS_intrinsics.circle, __VLS_intrinsics.circle)({
    cx: "18",
    cy: "17",
    r: "3",
});
__VLS_asFunctionalElement(__VLS_intrinsics.circle, __VLS_intrinsics.circle)({
    cx: "6",
    cy: "17",
    r: "3",
});
__VLS_asFunctionalElement(__VLS_intrinsics.path, __VLS_intrinsics.path)({
    d: "M4 6h16M4 12h16",
});
__VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "subtitle" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "card-content" },
});
if (__VLS_ctx.loading) {
    // @ts-ignore
    [loading,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "loading" },
    });
}
else if (__VLS_ctx.sortedBikeData.length) {
    // @ts-ignore
    [sortedBikeData,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "items-list" },
    });
    for (const [item, idx] of __VLS_getVForSourceType((__VLS_ctx.sortedBikeData.slice(0, 3)))) {
        // @ts-ignore
        [sortedBikeData,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            key: (idx),
            ...{ class: "item" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "item-header" },
        });
        if (item.type === 'station') {
            __VLS_asFunctionalElement(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
                ...{ class: "item-icon" },
                viewBox: "0 0 24 24",
                fill: "currentColor",
            });
            __VLS_asFunctionalElement(__VLS_intrinsics.circle, __VLS_intrinsics.circle)({
                cx: "12",
                cy: "12",
                r: "9",
            });
        }
        else {
            __VLS_asFunctionalElement(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
                ...{ class: "item-icon" },
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                'stroke-width': "2",
            });
            __VLS_asFunctionalElement(__VLS_intrinsics.rect, __VLS_intrinsics.rect)({
                x: "3",
                y: "3",
                width: "18",
                height: "18",
                rx: "2",
            });
        }
        __VLS_asFunctionalElement(__VLS_intrinsics.h4, __VLS_intrinsics.h4)({});
        (item.name);
        if (item.type === 'station') {
            __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
                ...{ class: "item-detail" },
            });
            (item.available);
            __VLS_asFunctionalElement(__VLS_intrinsics.br)({});
            (item.capacity);
            __VLS_asFunctionalElement(__VLS_intrinsics.br)({});
            __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "distance" },
            });
            (item.formattedDistance);
        }
        else {
            __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
                ...{ class: "item-detail" },
            });
            (item.available);
            __VLS_asFunctionalElement(__VLS_intrinsics.br)({});
            __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "distance" },
            });
            (item.formattedDistance);
        }
    }
}
__VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.$emit('show-map');
            // @ts-ignore
            [$emit,];
        } },
    ...{ class: "btn-more" },
});
/** @type {__VLS_StyleScopedClasses['category-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-header']} */ ;
/** @type {__VLS_StyleScopedClasses['card-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['card-content']} */ ;
/** @type {__VLS_StyleScopedClasses['loading']} */ ;
/** @type {__VLS_StyleScopedClasses['items-list']} */ ;
/** @type {__VLS_StyleScopedClasses['item']} */ ;
/** @type {__VLS_StyleScopedClasses['item-header']} */ ;
/** @type {__VLS_StyleScopedClasses['item-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['item-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['item-detail']} */ ;
/** @type {__VLS_StyleScopedClasses['distance']} */ ;
/** @type {__VLS_StyleScopedClasses['item-detail']} */ ;
/** @type {__VLS_StyleScopedClasses['distance']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-more']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    emits: {},
    props: {
        location: String,
        userLat: Number,
        userLon: Number
    },
});
export default {};
