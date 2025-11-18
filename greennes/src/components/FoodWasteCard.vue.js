import { ref, onMounted, defineProps, defineEmits, computed } from 'vue';
import { calculateDistance, formatDistance } from '../utils/geoLocation';
const props = defineProps({
    location: String,
    userLat: Number,
    userLon: Number
});
const emit = defineEmits(['show-map']);
const loading = ref(true);
const wasteData = ref([]);
const sortedWasteData = computed(() => {
    if (!props.userLat || !props.userLon)
        return wasteData.value;
    return [...wasteData.value]
        .map((item) => ({
        ...item,
        formattedDistance: formatDistance(calculateDistance(props.userLat, props.userLon, item.lat, item.lon))
    }))
        .sort((a, b) => {
        const distA = calculateDistance(props.userLat, props.userLon, a.lat, a.lon);
        const distB = calculateDistance(props.userLat, props.userLon, b.lat, b.lon);
        return distA - distB;
    });
});
const fetchWasteData = async () => {
    try {
        loading.value = true;
        const response = await fetch('https://data.rennesmetropole.fr/api/explore/v2.1/catalog/datasets/composteurs-collectifs/records?limit=10');
        const data = await response.json();
        wasteData.value = data.results.map((item) => ({
            name: item.nom || 'Composteur',
            distance: item.adresse || 'Rennes',
            lat: item.coordonnees?.lat,
            lon: item.coordonnees?.lon
        }));
    }
    catch (error) {
        console.error('Erreur chargement déchets:', error);
        wasteData.value = [
            { name: '3 composts à proximité', distance: '(10m, 45m, 200m)', lat: 48.1173, lon: -1.6778 },
            { name: '2 poubelles de déchets alimentaires', distance: '(15m, 60m)', lat: 48.1180, lon: -1.6800 }
        ];
    }
    finally {
        loading.value = false;
    }
};
onMounted(() => {
    fetchWasteData();
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
    fill: "currentColor",
});
__VLS_asFunctionalElement(__VLS_intrinsics.path)({
    d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z",
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
else if (__VLS_ctx.sortedWasteData.length) {
    // @ts-ignore
    [sortedWasteData,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "items-list" },
    });
    for (const [item, idx] of __VLS_getVForSourceType((__VLS_ctx.sortedWasteData.slice(0, 3)))) {
        // @ts-ignore
        [sortedWasteData,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            key: (idx),
            ...{ class: "item" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "item-header" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.h4, __VLS_intrinsics.h4)({});
        (item.name);
        __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            ...{ class: "item-detail" },
        });
        (item.distance);
        __VLS_asFunctionalElement(__VLS_intrinsics.br)({});
        if (item.formattedDistance) {
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
