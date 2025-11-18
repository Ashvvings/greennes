import { ref, defineEmits, watch } from 'vue';
import { debounce } from 'lodash';
const searchQuery = ref('');
const selectedLocation = ref('');
const suggestions = ref([]);
const showSuggestions = ref(false);
const loading = ref(false);
const errorMsg = ref('');
const searchResultsMode = ref(false);
const hasSelectedLocation = ref(false);
const emit = defineEmits(['location-selected']);
const lastSearched = ref('');
const showAutocompleteResults = ref(false);
const RENNES_VIEWBOX = "-1.745,48.070,-1.620,48.153";
const hideSuggestions = () => {
    window.setTimeout(() => {
        showSuggestions.value = false;
    }, 200);
};
const debouncedFetchSuggestions = debounce(async () => {
    if (searchQuery.value.length < 3) {
        suggestions.value = [];
        loading.value = false;
        return;
    }
    loading.value = true;
    errorMsg.value = '';
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery.value)}&limit=10&countrycodes=fr&viewbox=${RENNES_VIEWBOX}&bounded=1&addressdetails=1&extratags=1&namedetails=1`);
        const data = await response.json();
        const seen = new Set();
        const uniqueLabels = [];
        data.forEach((item) => {
            const a = item.address || {};
            const name = item.namedetails?.name;
            let mainLabel = '';
            if (name)
                mainLabel = name;
            else if (a.place)
                mainLabel = a.place;
            else if (a.shop)
                mainLabel = a.shop;
            else if (a.public_building)
                mainLabel = a.public_building;
            let streetLabel = '';
            if (a.road) {
                streetLabel = a.road;
                if (a.house_number)
                    streetLabel = `${a.house_number} ${streetLabel}`;
            }
            let combined = mainLabel.trim();
            if (streetLabel) {
                if (combined)
                    combined += ` – ${streetLabel}`;
                else
                    combined = streetLabel;
            }
            if (!combined)
                combined = item.display_name;
            if (!seen.has(combined)) {
                seen.add(combined);
                uniqueLabels.push(combined);
            }
        });
        suggestions.value = uniqueLabels.slice(0, 5);
    }
    catch (error) {
        errorMsg.value = "Erreur lors du chargement des suggestions.";
        suggestions.value = [];
    }
    finally {
        loading.value = false;
    }
}, 400);
watch(searchQuery, () => {
    if (searchResultsMode.value)
        searchResultsMode.value = false;
    debouncedFetchSuggestions();
});
const selectSuggestion = async (query) => {
    showSuggestions.value = false;
    showAutocompleteResults.value = false;
    loading.value = false;
    errorMsg.value = '';
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1&countrycodes=fr&viewbox=${RENNES_VIEWBOX}&bounded=1`);
        const data = await response.json();
        if (data.length > 0) {
            selectedLocation.value = query;
            hasSelectedLocation.value = true;
            searchQuery.value = '';
            emit('location-selected', {
                name: query,
                lat: parseFloat(data[0].lat),
                lon: parseFloat(data[0].lon)
            });
        }
    }
    catch (error) {
        errorMsg.value = "Impossible de récupérer la localisation sélectionnée.";
    }
};
const performSearch = async () => {
    errorMsg.value = '';
    searchResultsMode.value = false;
    hasSelectedLocation.value = false;
    selectedLocation.value = '';
    if (searchQuery.value.trim()) {
        await debouncedFetchSuggestions.flush?.();
        if (!suggestions.value.length) {
            errorMsg.value = "Aucun lieu trouvé pour votre recherche.";
            showAutocompleteResults.value = false;
        }
        else {
            searchResultsMode.value = true;
            showAutocompleteResults.value = true;
            lastSearched.value = searchQuery.value.trim();
        }
    }
};
const selectFromList = (label) => {
    selectSuggestion(label);
};
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
/** @type {__VLS_StyleScopedClasses['suggestions-underbar']} */ ;
/** @type {__VLS_StyleScopedClasses['suggestions-underbar']} */ ;
/** @type {__VLS_StyleScopedClasses['suggestion-item']} */ ;
/** @type {__VLS_StyleScopedClasses['suggestion-item']} */ ;
/** @type {__VLS_StyleScopedClasses['suggestion-item']} */ ;
/** @type {__VLS_StyleScopedClasses['search-button']} */ ;
/** @type {__VLS_StyleScopedClasses['location-info']} */ ;
/** @type {__VLS_StyleScopedClasses['search-section']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['search-container']} */ ;
/** @type {__VLS_StyleScopedClasses['search-input-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['search-input']} */ ;
/** @type {__VLS_StyleScopedClasses['search-button']} */ ;
/** @type {__VLS_StyleScopedClasses['location-info']} */ ;
/** @type {__VLS_StyleScopedClasses['search-section']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['search-container']} */ ;
/** @type {__VLS_StyleScopedClasses['search-input-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['search-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['search-input']} */ ;
/** @type {__VLS_StyleScopedClasses['search-button']} */ ;
/** @type {__VLS_StyleScopedClasses['location-info']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "search-section" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "container" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "search-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "search-input-wrapper" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    ...{ class: "search-icon" },
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    'stroke-width': "2",
});
__VLS_asFunctionalElement(__VLS_intrinsics.circle, __VLS_intrinsics.circle)({
    cx: "11",
    cy: "11",
    r: "8",
});
__VLS_asFunctionalElement(__VLS_intrinsics.path, __VLS_intrinsics.path)({
    d: "m21 21-4.35-4.35",
});
__VLS_asFunctionalElement(__VLS_intrinsics.input)({
    ...{ onKeyup: (__VLS_ctx.performSearch) },
    ...{ onInput: (...[$event]) => {
            __VLS_ctx.showSuggestions = true;
            // @ts-ignore
            [performSearch, showSuggestions,];
        } },
    ...{ onFocus: (...[$event]) => {
            __VLS_ctx.showSuggestions = true;
            // @ts-ignore
            [showSuggestions,];
        } },
    ...{ onBlur: (__VLS_ctx.hideSuggestions) },
    value: (__VLS_ctx.searchQuery),
    type: "text",
    placeholder: "Rechercher un lieu à Rennes",
    ...{ class: "search-input" },
    autocomplete: "off",
});
// @ts-ignore
[hideSuggestions, searchQuery,];
if (__VLS_ctx.loading && !__VLS_ctx.searchResultsMode && __VLS_ctx.showSuggestions) {
    // @ts-ignore
    [showSuggestions, loading, searchResultsMode,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "loading-spinner" },
    });
}
if (__VLS_ctx.showSuggestions && __VLS_ctx.suggestions.length > 0 && !__VLS_ctx.searchResultsMode) {
    // @ts-ignore
    [showSuggestions, searchResultsMode, suggestions,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "suggestions-dropdown" },
    });
    for (const [suggestion, idx] of __VLS_getVForSourceType((__VLS_ctx.suggestions))) {
        // @ts-ignore
        [suggestions,];
        __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onMousedown: (...[$event]) => {
                    if (!(__VLS_ctx.showSuggestions && __VLS_ctx.suggestions.length > 0 && !__VLS_ctx.searchResultsMode))
                        return;
                    __VLS_ctx.selectSuggestion(suggestion);
                    // @ts-ignore
                    [selectSuggestion,];
                } },
            key: (idx),
            ...{ class: "suggestion-item" },
        });
        (suggestion);
    }
}
__VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.performSearch) },
    ...{ class: "search-button" },
});
// @ts-ignore
[performSearch,];
if (__VLS_ctx.errorMsg) {
    // @ts-ignore
    [errorMsg,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "error-msg" },
    });
    (__VLS_ctx.errorMsg);
    // @ts-ignore
    [errorMsg,];
}
if (__VLS_ctx.searchResultsMode && __VLS_ctx.suggestions.length > 0 && !__VLS_ctx.hasSelectedLocation && !__VLS_ctx.selectedLocation) {
    // @ts-ignore
    [searchResultsMode, suggestions, hasSelectedLocation, selectedLocation,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "autocomplete-title" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
    (__VLS_ctx.lastSearched);
    // @ts-ignore
    [lastSearched,];
}
if (__VLS_ctx.searchResultsMode && __VLS_ctx.suggestions.length > 0 && !__VLS_ctx.hasSelectedLocation && !__VLS_ctx.selectedLocation) {
    // @ts-ignore
    [searchResultsMode, suggestions, hasSelectedLocation, selectedLocation,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "suggestions-underbar" },
    });
    for (const [suggestion, idx] of __VLS_getVForSourceType((__VLS_ctx.suggestions))) {
        // @ts-ignore
        [suggestions,];
        __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.searchResultsMode && __VLS_ctx.suggestions.length > 0 && !__VLS_ctx.hasSelectedLocation && !__VLS_ctx.selectedLocation))
                        return;
                    __VLS_ctx.selectFromList(suggestion);
                    // @ts-ignore
                    [selectFromList,];
                } },
            key: (idx),
            ...{ class: "suggestion-item" },
        });
        (suggestion);
    }
}
if (__VLS_ctx.hasSelectedLocation && __VLS_ctx.selectedLocation) {
    // @ts-ignore
    [hasSelectedLocation, selectedLocation,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "location-info" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
    (__VLS_ctx.selectedLocation);
    // @ts-ignore
    [selectedLocation,];
}
/** @type {__VLS_StyleScopedClasses['search-section']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['search-container']} */ ;
/** @type {__VLS_StyleScopedClasses['search-input-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['search-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['search-input']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-spinner']} */ ;
/** @type {__VLS_StyleScopedClasses['suggestions-dropdown']} */ ;
/** @type {__VLS_StyleScopedClasses['suggestion-item']} */ ;
/** @type {__VLS_StyleScopedClasses['search-button']} */ ;
/** @type {__VLS_StyleScopedClasses['error-msg']} */ ;
/** @type {__VLS_StyleScopedClasses['autocomplete-title']} */ ;
/** @type {__VLS_StyleScopedClasses['suggestions-underbar']} */ ;
/** @type {__VLS_StyleScopedClasses['suggestion-item']} */ ;
/** @type {__VLS_StyleScopedClasses['location-info']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    emits: {},
});
export default {};
