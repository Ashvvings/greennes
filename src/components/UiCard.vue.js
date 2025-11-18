import { useRouter } from 'vue-router';
const props = defineProps({
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    image: { type: String, default: '' },
    imageAlt: { type: String, default: '' },
    href: { type: String, default: '' }
});
const emit = defineEmits();
const router = useRouter();
const onClick = (e) => {
    emit('click', e);
    if (!props.href)
        return;
    // open external links in new tab, internal routes with router
    if (/^https?:\/\//.test(props.href))
        window.open(props.href, '_blank');
    else
        router.push(props.href);
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
/** @type {__VLS_StyleScopedClasses['ui-card']} */ ;
/** @type {__VLS_StyleScopedClasses['ui-card']} */ ;
/** @type {__VLS_StyleScopedClasses['clickable']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.article, __VLS_intrinsics.article)({
    ...{ onClick: (__VLS_ctx.onClick) },
    ...{ class: (['ui-card', { clickable: !!__VLS_ctx.href }]) },
    role: "article",
});
// @ts-ignore
[onClick, href,];
if (__VLS_ctx.image) {
    // @ts-ignore
    [image,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "card-image" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.img)({
        src: (__VLS_ctx.image),
        alt: (__VLS_ctx.imageAlt || __VLS_ctx.title || 'Card image'),
        loading: "lazy",
    });
    // @ts-ignore
    [image, imageAlt, title,];
}
__VLS_asFunctionalElement(__VLS_intrinsics.header, __VLS_intrinsics.header)({
    ...{ class: "card-header" },
});
var __VLS_0 = {};
__VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
    ...{ class: "card-title" },
});
(__VLS_ctx.title);
// @ts-ignore
[title,];
if (__VLS_ctx.subtitle) {
    // @ts-ignore
    [subtitle,];
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "card-subtitle" },
    });
    (__VLS_ctx.subtitle);
    // @ts-ignore
    [subtitle,];
}
__VLS_asFunctionalElement(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "card-body" },
});
var __VLS_2 = {};
if (__VLS_ctx.$slots.footer) {
    // @ts-ignore
    [$slots,];
    __VLS_asFunctionalElement(__VLS_intrinsics.footer, __VLS_intrinsics.footer)({
        ...{ class: "card-footer" },
    });
    var __VLS_4 = {};
}
/** @type {__VLS_StyleScopedClasses['clickable']} */ ;
/** @type {__VLS_StyleScopedClasses['ui-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-image']} */ ;
/** @type {__VLS_StyleScopedClasses['card-header']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title']} */ ;
/** @type {__VLS_StyleScopedClasses['card-subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['card-body']} */ ;
/** @type {__VLS_StyleScopedClasses['card-footer']} */ ;
// @ts-ignore
var __VLS_1 = __VLS_0, __VLS_3 = __VLS_2, __VLS_5 = __VLS_4;
const __VLS_base = (await import('vue')).defineComponent({
    __typeEmits: {},
    props: {
        title: { type: String, default: '' },
        subtitle: { type: String, default: '' },
        image: { type: String, default: '' },
        imageAlt: { type: String, default: '' },
        href: { type: String, default: '' }
    },
});
const __VLS_export = {};
export default {};
