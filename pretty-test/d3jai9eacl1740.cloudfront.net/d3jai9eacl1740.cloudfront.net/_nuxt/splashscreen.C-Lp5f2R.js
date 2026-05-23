import {
    _ as d
} from "./_plugin-vue_export-helper.DlAUqK2U.js";
import {
    a,
    b as r,
    U as c,
    g as h
} from "./entry.BFNHJ093.js";
const m = {
        data() {
            return {}
        },
        mounted() {
            window.addEventListener("resize", this.resize), this.resize()
        },
        methods: {
            resize() {
                const e = document.getElementById("outer"),
                    t = window.innerWidth,
                    s = window.innerHeight,
                    n = e.clientWidth,
                    o = e.clientHeight,
                    i = Math.min(t / n, s / o);
                e.style.transform = `translate(-50%,-50%) scale(${i})`
            }
        },
        unmounted() {
            window.removeEventListener("resize", this.resize)
        }
    },
    l = {
        id: "gamecontainer"
    },
    u = {
        id: "outer"
    },
    _ = {
        id: "bg-layout"
    };

function f(e, t, s, n, o, i) {
    return h(), a("div", l, [r("div", u, [r("div", _, [c(e.$slots, "default", {}, void 0, !0)])])])
}
const g = d(m, [
    ["render", f],
    ["__scopeId", "data-v-0f407413"]
]);
export {
    g as
    default
};