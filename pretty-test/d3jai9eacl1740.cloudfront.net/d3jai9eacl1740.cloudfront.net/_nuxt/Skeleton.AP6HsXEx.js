import {
    P as n,
    Q as o,
    l as r,
    R as u,
    c,
    S as l,
    ae as i,
    g as p,
    a as d,
    V as f
} from "./entry.BFNHJ093.js";
import {
    u as g
} from "./Icon.BriSQLkb.js";
import {
    _ as m
} from "./_plugin-vue_export-helper.DlAUqK2U.js";
const _ = {
        base: "animate-pulse",
        background: "bg-gray-100 dark:bg-gray-800",
        rounded: "rounded-md"
    },
    k = n(o.ui.strategy, o.ui.skeleton, _),
    b = r({
        inheritAttrs: !1,
        props: {
            class: {
                type: [String, Object, Array],
                    default: () => ""
            },
            ui: {
                type: Object,
                default: () => ({})
            }
        },
        setup(e) {
            const {
                ui: s,
                attrs: t
            } = g("skeleton", u(e, "ui"), k), a = c(() => l(i(s.value.base, s.value.background, s.value.rounded), e.class));
            return {
                ui: s,
                attrs: t,
                skeletonClass: a
            }
        }
    });

function y(e, s, t, a, C, v) {
    return p(), d("div", f({
        class: e.skeletonClass
    }, e.attrs), null, 16)
}
const w = m(b, [
    ["render", y]
]);
export {
    w as _
};