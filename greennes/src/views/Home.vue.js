import { ref } from 'vue';
import SearchBar from '../components/SearchBar.vue';
import BikeCard from '../components/BikeCard.vue';
import FoodWasteCard from '../components/FoodWasteCard.vue';
import ParksCard from '../components/ParksCard.vue';
import AirQualitySection from '../components/AirQualitySection.vue';
import RatingForm from '../components/RatingForm.vue';
import MapModal from '../components/MapModal.vue';
const selectedLocation = ref('');
const showMap = ref(false);
const mapTitle = ref('');
const mapItems = ref([]);
const handleLocationSelected = (location) => {
    selectedLocation.value = location;
};
const showBikeMap = () => {
    mapTitle.value = 'Vélos - Stations et Parkings';
    showMap.value = true;
};
const showWasteMap = () => {
    mapTitle.value = 'Déchets Alimentaires';
    showMap.value = true;
};
const showParksMap = () => {
    mapTitle.value = 'Parcs et Jardins';
    showMap.value = true;
};
const closeMapModal = () => {
    showMap.value = false;
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['nav-link']} */ ;
/** @type {__VLS_StyleScopedClasses['navbar']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-center']} */ ;
/** @type {__VLS_StyleScopedClasses['cards-grid']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "home-view" },
});
/** @type {[typeof SearchBar, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(SearchBar, new SearchBar({
    ...{ 'onLocationSelected': {} },
}));
const __VLS_1 = __VLS_0({
    ...{ 'onLocationSelected': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
let __VLS_3;
let __VLS_4;
const __VLS_5 = ({ locationSelected: {} },
    { onLocationSelected: (__VLS_ctx.handleLocationSelected) });
// @ts-ignore
[handleLocationSelected,];
var __VLS_2;
if (__VLS_ctx.selectedLocation) {
    // @ts-ignore
    [selectedLocation,];
    __VLS_asFunctionalElement(__VLS_intrinsics.section, __VLS_intrinsics.section)({
        ...{ class: "main-content" },
        id: "home-cards",
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "container" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "cards-grid" },
    });
    /** @type {[typeof BikeCard, ]} */ ;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(BikeCard, new BikeCard({
        ...{ 'onShowMap': {} },
        location: (__VLS_ctx.selectedLocation),
    }));
    const __VLS_8 = __VLS_7({
        ...{ 'onShowMap': {} },
        location: (__VLS_ctx.selectedLocation),
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    let __VLS_10;
    let __VLS_11;
    const __VLS_12 = ({ showMap: {} },
        { onShowMap: (__VLS_ctx.showBikeMap) });
    // @ts-ignore
    [selectedLocation, showBikeMap,];
    var __VLS_9;
    /** @type {[typeof FoodWasteCard, ]} */ ;
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent(FoodWasteCard, new FoodWasteCard({
        ...{ 'onShowMap': {} },
        location: (__VLS_ctx.selectedLocation),
    }));
    const __VLS_15 = __VLS_14({
        ...{ 'onShowMap': {} },
        location: (__VLS_ctx.selectedLocation),
    }, ...__VLS_functionalComponentArgsRest(__VLS_14));
    let __VLS_17;
    let __VLS_18;
    const __VLS_19 = ({ showMap: {} },
        { onShowMap: (__VLS_ctx.showWasteMap) });
    // @ts-ignore
    [selectedLocation, showWasteMap,];
    var __VLS_16;
    /** @type {[typeof ParksCard, ]} */ ;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(ParksCard, new ParksCard({
        ...{ 'onShowMap': {} },
        location: (__VLS_ctx.selectedLocation),
    }));
    const __VLS_22 = __VLS_21({
        ...{ 'onShowMap': {} },
        location: (__VLS_ctx.selectedLocation),
    }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    let __VLS_24;
    let __VLS_25;
    const __VLS_26 = ({ showMap: {} },
        { onShowMap: (__VLS_ctx.showParksMap) });
    // @ts-ignore
    [selectedLocation, showParksMap,];
    var __VLS_23;
}
/** @type {[typeof AirQualitySection, ]} */ ;
// @ts-ignore
const __VLS_28 = __VLS_asFunctionalComponent(AirQualitySection, new AirQualitySection({}));
const __VLS_29 = __VLS_28({}, ...__VLS_functionalComponentArgsRest(__VLS_28));
/** @type {[typeof RatingForm, ]} */ ;
// @ts-ignore
const __VLS_32 = __VLS_asFunctionalComponent(RatingForm, new RatingForm({}));
const __VLS_33 = __VLS_32({}, ...__VLS_functionalComponentArgsRest(__VLS_32));
/** @type {[typeof MapModal, ]} */ ;
// @ts-ignore
const __VLS_36 = __VLS_asFunctionalComponent(MapModal, new MapModal({
    ...{ 'onClose': {} },
    isOpen: (__VLS_ctx.showMap),
    title: (__VLS_ctx.mapTitle),
    items: (__VLS_ctx.mapItems),
}));
const __VLS_37 = __VLS_36({
    ...{ 'onClose': {} },
    isOpen: (__VLS_ctx.showMap),
    title: (__VLS_ctx.mapTitle),
    items: (__VLS_ctx.mapItems),
}, ...__VLS_functionalComponentArgsRest(__VLS_36));
let __VLS_39;
let __VLS_40;
const __VLS_41 = ({ close: {} },
    { onClose: (__VLS_ctx.closeMapModal) });
// @ts-ignore
[showMap, mapTitle, mapItems, closeMapModal,];
var __VLS_38;
/** @type {__VLS_StyleScopedClasses['home-view']} */ ;
/** @type {__VLS_StyleScopedClasses['main-content']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['cards-grid']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
