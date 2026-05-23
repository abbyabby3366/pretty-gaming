import {
    a as ks,
    _ as mt
} from "./Divider.DMu9loxT.js";
import {
    ag as be,
    aa as da,
    a2 as ca,
    r as M,
    c as O,
    P as et,
    Q as K,
    l as re,
    R as Oe,
    S as ze,
    ae as G,
    g as y,
    a as w,
    a8 as va,
    a9 as fa,
    b as n,
    V as he,
    n as R,
    h as Re,
    ah as zt,
    j as Ce,
    ai as Fe,
    k as Be,
    aj as pa,
    ak as At,
    F as ae,
    C as ma,
    w as vt,
    ac as Ge,
    q as se,
    x as q,
    v as L,
    e as E,
    X as tt,
    t as c,
    d as ye,
    u as b,
    p as ce,
    i as ve,
    U as Se,
    m as Ke,
    al as Is,
    T as Cs,
    am as ga,
    _ as T,
    a5 as ha,
    M as Ss,
    an as ba,
    $ as le,
    L as ft,
    ao as ya,
    ap as _a,
    aq as wa,
    Y as Bt,
    ar as is,
    Z as $a,
    as as ka,
    a0 as rs,
    K as Ia,
    H as Ie,
    at as ls
} from "./entry.BFNHJ093.js";
import {
    a as Ca,
    u as st,
    _ as Le,
    i as Sa
} from "./Icon.BriSQLkb.js";
import {
    c as Da,
    d as us,
    g as Oa,
    e as Ds,
    _ as Aa,
    f as Ba
} from "./Button.BIubBBJz.js";
import {
    _ as X
} from "./_plugin-vue_export-helper.DlAUqK2U.js";
import La from "./Icon.DDQP7vzt.js";
import {
    _ as Ye
} from "./close.BqjWTNPe.js";
import {
    _ as Me
} from "./arrowleft.BOsFqy6t.js";
import {
    _ as Os
} from "./arrowright.DUKW_HZK.js";
import {
    _ as Ma
} from "./gamerules.rFK4SbEC.js";
import {
    _ as xa
} from "./videoLoad.Cd0hhZqh.js";
import "./index.CAZilBRX.js";
const Ta = Symbol.for("nuxt:client-only"),
    Ea = "data-n-ids";

function As(e) {
    var a, r, l, i, d, m;
    if (typeof e != "string") throw new TypeError("[nuxt] [useId] key must be a string.");
    e = e.slice(1);
    const t = da(),
        s = ca();
    if (!s) throw new TypeError("[nuxt] `useId` must be called within a component setup function.");
    t._id || (t._id = 0), s._nuxtIdIndex || (s._nuxtIdIndex = {}), (a = s._nuxtIdIndex)[e] || (a[e] = 0);
    const o = e + ":" + s._nuxtIdIndex[e]++;
    if (t.payload.serverRendered && t.isHydrating && !be(Ta, !1)) {
        const u = ((r = s.vnode.el) == null ? void 0 : r.nodeType) === 8 && ((i = (l = s.vnode.el) == null ? void 0 : l.nextElementSibling) != null && i.getAttribute) ? (d = s.vnode.el) == null ? void 0 : d.nextElementSibling : s.vnode.el,
            f = JSON.parse(((m = u == null ? void 0 : u.getAttribute) == null ? void 0 : m.call(u, Ea)) || "{}");
        if (f[o]) return f[o]
    }
    return e + "_" + t._id++
}
const za = {
        wrapper: "relative inline-flex text-left rtl:text-right",
        container: "z-20 group",
        trigger: "inline-flex w-full",
        width: "w-48",
        height: "",
        background: "bg-white dark:bg-gray-800",
        shadow: "shadow-lg",
        rounded: "rounded-md",
        ring: "ring-1 ring-gray-200 dark:ring-gray-700",
        base: "relative focus:outline-none overflow-y-auto scroll-py-1",
        divide: "divide-y divide-gray-200 dark:divide-gray-700",
        padding: "p-1",
        item: {
            base: "group flex items-center gap-1.5 w-full",
            rounded: "rounded-md",
            padding: "px-1.5 py-1.5",
            size: "text-sm",
            active: "bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white",
            inactive: "text-gray-700 dark:text-gray-200",
            disabled: "cursor-not-allowed opacity-50",
            icon: {
                base: "flex-shrink-0 w-5 h-5",
                active: "text-gray-500 dark:text-gray-400",
                inactive: "text-gray-400 dark:text-gray-500"
            },
            avatar: {
                base: "flex-shrink-0",
                size: "2xs"
            },
            label: "truncate",
            shortcuts: "hidden md:inline-flex flex-shrink-0 gap-0.5 ms-auto"
        },
        transition: {
            enterActiveClass: "transition duration-100 ease-out",
            enterFromClass: "transform scale-95 opacity-0",
            enterToClass: "transform scale-100 opacity-100",
            leaveActiveClass: "transition duration-75 ease-in",
            leaveFromClass: "transform scale-100 opacity-100",
            leaveToClass: "transform scale-95 opacity-0"
        },
        popper: {
            placement: "bottom-end",
            strategy: "fixed"
        },
        default: {
            openDelay: 0,
            closeDelay: 0
        },
        arrow: { ...Ca,
            ring: "before:ring-1 before:ring-gray-200 dark:before:ring-gray-700",
            background: "before:bg-white dark:before:bg-gray-700"
        }
    },
    Ra = {
        base: "inline-flex items-center justify-center text-gray-900 dark:text-white",
        padding: "px-1",
        size: {
            xs: "h-4 min-w-[16px] text-[10px]",
            sm: "h-5 min-w-[20px] text-[11px]",
            md: "h-6 min-w-[24px] text-[12px]"
        },
        rounded: "rounded",
        font: "font-medium font-sans",
        background: "bg-gray-100 dark:bg-gray-800",
        ring: "ring-1 ring-gray-300 dark:ring-gray-700 ring-inset",
        default: {
            size: "sm"
        }
    },
    ja = {
        base: "relative inline-flex flex-shrink-0 border-2 border-transparent disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none",
        rounded: "rounded-full",
        ring: "focus-visible:ring-2 focus-visible:ring-{color}-500 dark:focus-visible:ring-{color}-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900",
        active: "bg-{color}-500 dark:bg-{color}-400",
        inactive: "bg-gray-200 dark:bg-gray-700",
        size: {
            "2xs": "h-3 w-5",
            xs: "h-3.5 w-6",
            sm: "h-4 w-7",
            md: "h-5 w-9",
            lg: "h-6 w-11",
            xl: "h-7 w-[3.25rem]",
            "2xl": "h-8 w-[3.75rem]"
        },
        container: {
            base: "pointer-events-none relative inline-block rounded-full bg-white dark:bg-gray-900 shadow transform ring-0 transition ease-in-out duration-200",
            active: {
                "2xs": "translate-x-2 rtl:-translate-x-2",
                xs: "translate-x-2.5 rtl:-translate-x-2.5",
                sm: "translate-x-3 rtl:-translate-x-3",
                md: "translate-x-4 rtl:-translate-x-4",
                lg: "translate-x-5 rtl:-translate-x-5",
                xl: "translate-x-6 rtl:-translate-x-6",
                "2xl": "translate-x-7 rtl:-translate-x-7"
            },
            inactive: "translate-x-0 rtl:-translate-x-0",
            size: {
                "2xs": "h-2 w-2",
                xs: "h-2.5 w-2.5",
                sm: "h-3 w-3",
                md: "h-4 w-4",
                lg: "h-5 w-5",
                xl: "h-6 w-6",
                "2xl": "h-7 w-7"
            }
        },
        icon: {
            base: "absolute inset-0 h-full w-full flex items-center justify-center transition-opacity",
            active: "opacity-100 ease-in duration-200",
            inactive: "opacity-0 ease-out duration-100",
            size: {
                "2xs": "h-2 w-2",
                xs: "h-2 w-2",
                sm: "h-2 w-2",
                md: "h-3 w-3",
                lg: "h-4 w-4",
                xl: "h-5 w-5",
                "2xl": "h-6 w-6"
            },
            on: "text-{color}-500 dark:text-{color}-400",
            off: "text-gray-400 dark:text-gray-500",
            loading: "animate-spin text-{color}-500 dark:text-{color}-400"
        },
        default: {
            onIcon: null,
            offIcon: null,
            loadingIcon: "i-heroicons-arrow-path-20-solid",
            color: "primary",
            size: "md"
        }
    },
    Pa = {
        wrapper: "relative w-full flex items-center",
        base: "w-full absolute appearance-none cursor-pointer disabled:cursor-not-allowed disabled:bg-opacity-50 focus:outline-none peer group",
        rounded: "rounded-lg",
        background: "bg-transparent",
        ring: "focus-visible:ring-2 focus-visible:ring-{color}-500 dark:focus-visible:ring-{color}-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900",
        progress: {
            base: "absolute pointer-events-none peer-disabled:bg-opacity-50",
            rounded: "rounded-s-lg",
            background: "bg-{color}-500 dark:bg-{color}-400",
            size: {
                "2xs": "h-px",
                xs: "h-0.5",
                sm: "h-1",
                md: "h-2",
                lg: "h-3",
                xl: "h-4",
                "2xl": "h-5"
            }
        },
        thumb: {
            base: "[&::-webkit-slider-thumb]:relative [&::-moz-range-thumb]:relative [&::-webkit-slider-thumb]:z-[1] [&::-moz-range-thumb]:z-[1] [&::-webkit-slider-thumb]:appearance-none [&::-moz-range-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0",
            color: "text-{color}-500 dark:text-{color}-400",
            background: "[&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:dark:bg-gray-900 [&::-moz-range-thumb]:bg-current",
            ring: "[&::-webkit-slider-thumb]:ring-2 [&::-webkit-slider-thumb]:ring-current",
            size: {
                "2xs": "[&::-webkit-slider-thumb]:h-1.5 [&::-moz-range-thumb]:h-1.5 [&::-webkit-slider-thumb]:w-1.5 [&::-moz-range-thumb]:w-1.5 [&::-webkit-slider-thumb]:mt-[-2.5px] [&::-moz-range-thumb]:mt-[-2.5px]",
                xs: "[&::-webkit-slider-thumb]:h-2 [&::-moz-range-thumb]:h-2 [&::-webkit-slider-thumb]:w-2 [&::-moz-range-thumb]:w-2 [&::-webkit-slider-thumb]:mt-[-3px] [&::-moz-range-thumb]:mt-[-3px]",
                sm: "[&::-webkit-slider-thumb]:h-3 [&::-moz-range-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-moz-range-thumb]:w-3 [&::-webkit-slider-thumb]:-mt-1 [&::-moz-range-thumb]:-mt-1",
                md: "[&::-webkit-slider-thumb]:h-4 [&::-moz-range-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-moz-range-thumb]:w-4 [&::-webkit-slider-thumb]:-mt-1 [&::-moz-range-thumb]:-mt-1",
                lg: "[&::-webkit-slider-thumb]:h-5 [&::-moz-range-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-moz-range-thumb]:w-5 [&::-webkit-slider-thumb]:-mt-1 [&::-moz-range-thumb]:-mt-1",
                xl: "[&::-webkit-slider-thumb]:h-6 [&::-moz-range-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-moz-range-thumb]:w-6 [&::-webkit-slider-thumb]:-mt-1 [&::-moz-range-thumb]:-mt-1",
                "2xl": "[&::-webkit-slider-thumb]:h-7 [&::-moz-range-thumb]:h-7 [&::-webkit-slider-thumb]:w-7 [&::-moz-range-thumb]:w-7 [&::-webkit-slider-thumb]:-mt-1 [&::-moz-range-thumb]:-mt-1"
            }
        },
        track: {
            base: "[&::-webkit-slider-runnable-track]:group-disabled:bg-opacity-50 [&::-moz-range-track]:group-disabled:bg-opacity-50",
            background: "[&::-webkit-slider-runnable-track]:bg-gray-200 [&::-moz-range-track]:bg-gray-200 [&::-webkit-slider-runnable-track]:dark:bg-gray-700 [&::-moz-range-track]:dark:bg-gray-700",
            rounded: "[&::-webkit-slider-runnable-track]:rounded-lg [&::-moz-range-track]:rounded-lg",
            size: {
                "2xs": "[&::-webkit-slider-runnable-track]:h-px [&::-moz-range-track]:h-px",
                xs: "[&::-webkit-slider-runnable-track]:h-0.5 [&::-moz-range-track]:h-0.5",
                sm: "[&::-webkit-slider-runnable-track]:h-1 [&::-moz-range-track]:h-1",
                md: "[&::-webkit-slider-runnable-track]:h-2 [&::-moz-range-track]:h-2",
                lg: "[&::-webkit-slider-runnable-track]:h-3 [&::-moz-range-track]:h-3",
                xl: "[&::-webkit-slider-runnable-track]:h-4 [&::-moz-range-track]:h-4",
                "2xl": "[&::-webkit-slider-runnable-track]:h-5 [&::-moz-range-track]:h-5"
            }
        },
        size: {
            "2xs": "h-1.5",
            xs: "h-2",
            sm: "h-3",
            md: "h-4",
            lg: "h-5",
            xl: "h-6",
            "2xl": "h-7"
        },
        default: {
            size: "md",
            color: "primary"
        }
    },
    Rt = (e, t) => {
        const s = be("form-events", void 0),
            o = be("form-group", void 0),
            a = be("form-inputs", void 0);
        o && (e != null && e.id && (o.inputId.value = e == null ? void 0 : e.id), a && (a.value[o.name.value] = o.inputId.value));
        const r = M(!1);

        function l(u, f) {
            s && s.emit({
                type: u,
                path: f
            })
        }

        function i() {
            l("blur", o == null ? void 0 : o.name.value), r.value = !0
        }

        function d() {
            l("change", o == null ? void 0 : o.name.value)
        }
        const m = Da(() => {
            (r.value || o != null && o.eagerValidation.value) && l("input", o == null ? void 0 : o.name.value)
        }, 300);
        return {
            inputId: O(() => (e == null ? void 0 : e.id) ? ? (o == null ? void 0 : o.inputId.value)),
            name: O(() => (e == null ? void 0 : e.name) ? ? (o == null ? void 0 : o.name.value)),
            size: O(() => {
                var f;
                const u = t.size[o == null ? void 0 : o.size.value] ? o == null ? void 0 : o.size.value : null;
                return (e == null ? void 0 : e.size) ? ? u ? ? ((f = t == null ? void 0 : t.default) == null ? void 0 : f.size)
            }),
            color: O(() => {
                var u;
                return (u = o == null ? void 0 : o.error) != null && u.value ? "red" : e == null ? void 0 : e.color
            }),
            emitFormBlur: i,
            emitFormInput: m,
            emitFormChange: d
        }
    },
    lt = et(K.ui.strategy, K.ui.range, Pa),
    Na = re({
        inheritAttrs: !1,
        props: {
            modelValue: {
                type: Number,
                default: 0
            },
            id: {
                type: String,
                default: null
            },
            name: {
                type: String,
                default: null
            },
            disabled: {
                type: Boolean,
                default: !1
            },
            min: {
                type: Number,
                default: 0
            },
            max: {
                type: Number,
                default: 100
            },
            step: {
                type: Number,
                default: 1
            },
            size: {
                type: String,
                default: null,
                validator(e) {
                    return Object.keys(lt.size).includes(e)
                }
            },
            color: {
                type: String,
                default: () => lt.default.color,
                validator(e) {
                    return K.ui.colors.includes(e)
                }
            },
            inputClass: {
                type: String,
                default: null
            },
            class: {
                type: [String, Object, Array],
                    default: () => ""
            },
            ui: {
                type: Object,
                default: () => ({})
            }
        },
        emits: ["update:modelValue", "change"],
        setup(e, {
            emit: t
        }) {
            const {
                ui: s,
                attrs: o
            } = st("range", Oe(e, "ui"), lt), {
                emitFormChange: a,
                inputId: r,
                color: l,
                size: i,
                name: d
            } = Rt(e, lt), m = O({
                get() {
                    return e.modelValue
                },
                set(_) {
                    t("update:modelValue", _)
                }
            }), u = _ => {
                t("change", _.target.value), a()
            }, f = O(() => ze(G(s.value.wrapper, s.value.size[i.value]), e.class)), v = O(() => ze(G(s.value.base, s.value.background, s.value.rounded, l.value && s.value.ring.replaceAll("{color}", l.value), s.value.size[i.value]), e.inputClass)), p = O(() => G(s.value.thumb.base, l.value && s.value.thumb.color.replaceAll("{color}", l.value), s.value.thumb.ring, s.value.thumb.background, s.value.thumb.size[i.value])), h = O(() => G(s.value.track.base, s.value.track.background, s.value.track.rounded, s.value.track.size[i.value])), g = O(() => G(s.value.progress.base, s.value.progress.rounded, l.value && s.value.progress.background.replaceAll("{color}", l.value), s.value.progress.size[i.value])), $ = O(() => {
                const {
                    modelValue: _,
                    min: k,
                    max: S
                } = e;
                return {
                    width: `${(Math.max(k,Math.min(_,S))-k)/(S-k)*100}%`
                }
            });
            return {
                ui: s,
                attrs: o,
                name: d,
                inputId: r,
                value: m,
                wrapperClass: f,
                inputClass: v,
                thumbClass: p,
                trackClass: h,
                progressClass: g,
                progressStyle: $,
                onChange: u
            }
        }
    }),
    Va = ["id", "name", "min", "max", "disabled", "step"];

function Fa(e, t, s, o, a, r) {
    return y(), w("div", {
        class: R(e.wrapperClass)
    }, [va(n("input", he({
        id: e.inputId,
        ref: "input",
        "onUpdate:modelValue": t[0] || (t[0] = l => e.value = l),
        name: e.name,
        min: e.min,
        max: e.max,
        disabled: e.disabled,
        step: e.step,
        type: "range",
        class: [e.inputClass, e.thumbClass, e.trackClass]
    }, e.attrs, {
        onChange: t[1] || (t[1] = (...l) => e.onChange && e.onChange(...l))
    }), null, 16, Va), [
        [fa, e.value, void 0, {
            number: !0
        }]
    ]), n("span", {
        class: R(e.progressClass),
        style: Re(e.progressStyle)
    }, null, 6)], 2)
}
const Ya = X(Na, [
    ["render", Fa]
]);

function Ha(e, t, s) {
    let o = M(s == null ? void 0 : s.value),
        a = O(() => e.value !== void 0);
    return [O(() => a.value ? e.value : o.value), function(r) {
        return a.value || (o.value = r), t == null ? void 0 : t(r)
    }]
}
let Bs = Symbol("headlessui.useid"),
    Ua = 0;

function gt() {
    return be(Bs, () => `${++Ua}`)()
}

function Ls(e) {
    zt(Bs, e)
}

function Y(e) {
    var t;
    if (e == null || e.value == null) return null;
    let s = (t = e.value.$el) != null ? t : e.value;
    return s instanceof Node ? s : null
}

function ht(e, t, ...s) {
    if (e in t) {
        let a = t[e];
        return typeof a == "function" ? a(...s) : a
    }
    let o = new Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(t).map(a=>`"${a}"`).join(", ")}.`);
    throw Error.captureStackTrace && Error.captureStackTrace(o, ht), o
}
var Wa = Object.defineProperty,
    qa = (e, t, s) => t in e ? Wa(e, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: s
    }) : e[t] = s,
    ds = (e, t, s) => (qa(e, typeof t != "symbol" ? t + "" : t, s), s);
let Ga = class {
        constructor() {
            ds(this, "current", this.detect()), ds(this, "currentId", 0)
        }
        set(t) {
            this.current !== t && (this.currentId = 0, this.current = t)
        }
        reset() {
            this.set(this.detect())
        }
        nextId() {
            return ++this.currentId
        }
        get isServer() {
            return this.current === "server"
        }
        get isClient() {
            return this.current === "client"
        }
        detect() {
            return typeof window > "u" || typeof document > "u" ? "server" : "client"
        }
    },
    jt = new Ga;

function Pt(e) {
    if (jt.isServer) return null;
    if (e instanceof Node) return e.ownerDocument;
    if (e != null && e.hasOwnProperty("value")) {
        let t = Y(e);
        if (t) return t.ownerDocument
    }
    return document
}
let Lt = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map(e => `${e}:not([tabindex='-1'])`).join(",");
var Mt = (e => (e[e.First = 1] = "First", e[e.Previous = 2] = "Previous", e[e.Next = 4] = "Next", e[e.Last = 8] = "Last", e[e.WrapAround = 16] = "WrapAround", e[e.NoScroll = 32] = "NoScroll", e))(Mt || {}),
    Ka = (e => (e[e.Error = 0] = "Error", e[e.Overflow = 1] = "Overflow", e[e.Success = 2] = "Success", e[e.Underflow = 3] = "Underflow", e))(Ka || {}),
    Xa = (e => (e[e.Previous = -1] = "Previous", e[e.Next = 1] = "Next", e))(Xa || {});

function Ms(e = document.body) {
    return e == null ? [] : Array.from(e.querySelectorAll(Lt)).sort((t, s) => Math.sign((t.tabIndex || Number.MAX_SAFE_INTEGER) - (s.tabIndex || Number.MAX_SAFE_INTEGER)))
}
var Nt = (e => (e[e.Strict = 0] = "Strict", e[e.Loose = 1] = "Loose", e))(Nt || {});

function Vt(e, t = 0) {
    var s;
    return e === ((s = Pt(e)) == null ? void 0 : s.body) ? !1 : ht(t, {
        0() {
            return e.matches(Lt)
        },
        1() {
            let o = e;
            for (; o !== null;) {
                if (o.matches(Lt)) return !0;
                o = o.parentElement
            }
            return !1
        }
    })
}

function xs(e) {
    let t = Pt(e);
    Ce(() => {
        t && !Vt(t.activeElement, 0) && Qa(e)
    })
}
var Ja = (e => (e[e.Keyboard = 0] = "Keyboard", e[e.Mouse = 1] = "Mouse", e))(Ja || {});
typeof window < "u" && typeof document < "u" && (document.addEventListener("keydown", e => {
    e.metaKey || e.altKey || e.ctrlKey || (document.documentElement.dataset.headlessuiFocusVisible = "")
}, !0), document.addEventListener("click", e => {
    e.detail === 1 ? delete document.documentElement.dataset.headlessuiFocusVisible : e.detail === 0 && (document.documentElement.dataset.headlessuiFocusVisible = "")
}, !0));

function Qa(e) {
    e == null || e.focus({
        preventScroll: !0
    })
}
let Za = ["textarea", "input"].join(",");

function en(e) {
    var t, s;
    return (s = (t = e == null ? void 0 : e.matches) == null ? void 0 : t.call(e, Za)) != null ? s : !1
}

function Ts(e, t = s => s) {
    return e.slice().sort((s, o) => {
        let a = t(s),
            r = t(o);
        if (a === null || r === null) return 0;
        let l = a.compareDocumentPosition(r);
        return l & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : l & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0
    })
}

function tn(e, t) {
    return sn(Ms(), t, {
        relativeTo: e
    })
}

function sn(e, t, {
    sorted: s = !0,
    relativeTo: o = null,
    skipElements: a = []
} = {}) {
    var r;
    let l = (r = Array.isArray(e) ? e.length > 0 ? e[0].ownerDocument : document : e == null ? void 0 : e.ownerDocument) != null ? r : document,
        i = Array.isArray(e) ? s ? Ts(e) : e : Ms(e);
    a.length > 0 && i.length > 1 && (i = i.filter(h => !a.includes(h))), o = o ? ? l.activeElement;
    let d = (() => {
            if (t & 5) return 1;
            if (t & 10) return -1;
            throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")
        })(),
        m = (() => {
            if (t & 1) return 0;
            if (t & 2) return Math.max(0, i.indexOf(o)) - 1;
            if (t & 4) return Math.max(0, i.indexOf(o)) + 1;
            if (t & 8) return i.length - 1;
            throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")
        })(),
        u = t & 32 ? {
            preventScroll: !0
        } : {},
        f = 0,
        v = i.length,
        p;
    do {
        if (f >= v || f + v <= 0) return 0;
        let h = m + f;
        if (t & 16) h = (h + v) % v;
        else {
            if (h < 0) return 3;
            if (h >= v) return 1
        }
        p = i[h], p == null || p.focus(u), f += d
    } while (p !== l.activeElement);
    return t & 6 && en(p) && p.select(), 2
}

function an() {
    return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0
}

function nn() {
    return /Android/gi.test(window.navigator.userAgent)
}

function on() {
    return an() || nn()
}

function ut(e, t, s) {
    jt.isServer || Fe(o => {
        document.addEventListener(e, t, s), o(() => document.removeEventListener(e, t, s))
    })
}

function rn(e, t, s) {
    jt.isServer || Fe(o => {
        window.addEventListener(e, t, s), o(() => window.removeEventListener(e, t, s))
    })
}

function ln(e, t, s = O(() => !0)) {
    function o(r, l) {
        if (!s.value || r.defaultPrevented) return;
        let i = l(r);
        if (i === null || !i.getRootNode().contains(i)) return;
        let d = function m(u) {
            return typeof u == "function" ? m(u()) : Array.isArray(u) || u instanceof Set ? u : [u]
        }(e);
        for (let m of d) {
            if (m === null) continue;
            let u = m instanceof HTMLElement ? m : Y(m);
            if (u != null && u.contains(i) || r.composed && r.composedPath().includes(u)) return
        }
        return !Vt(i, Nt.Loose) && i.tabIndex !== -1 && r.preventDefault(), t(r, i)
    }
    let a = M(null);
    ut("pointerdown", r => {
        var l, i;
        s.value && (a.value = ((i = (l = r.composedPath) == null ? void 0 : l.call(r)) == null ? void 0 : i[0]) || r.target)
    }, !0), ut("mousedown", r => {
        var l, i;
        s.value && (a.value = ((i = (l = r.composedPath) == null ? void 0 : l.call(r)) == null ? void 0 : i[0]) || r.target)
    }, !0), ut("click", r => {
        on() || a.value && (o(r, () => a.value), a.value = null)
    }, !0), ut("touchend", r => o(r, () => r.target instanceof HTMLElement ? r.target : null), !0), rn("blur", r => o(r, () => window.document.activeElement instanceof HTMLIFrameElement ? window.document.activeElement : null), !0)
}

function cs(e, t) {
    if (e) return e;
    let s = t ? ? "button";
    if (typeof s == "string" && s.toLowerCase() === "button") return "button"
}

function Es(e, t) {
    let s = M(cs(e.value.type, e.value.as));
    return Be(() => {
        s.value = cs(e.value.type, e.value.as)
    }), Fe(() => {
        var o;
        s.value || Y(t) && Y(t) instanceof HTMLButtonElement && !((o = Y(t)) != null && o.hasAttribute("type")) && (s.value = "button")
    }), s
}

function vs(e) {
    return [e.screenX, e.screenY]
}

function un() {
    let e = M([-1, -1]);
    return {
        wasMoved(t) {
            let s = vs(t);
            return e.value[0] === s[0] && e.value[1] === s[1] ? !1 : (e.value = s, !0)
        },
        update(t) {
            e.value = vs(t)
        }
    }
}

function dn({
    container: e,
    accept: t,
    walk: s,
    enabled: o
}) {
    Fe(() => {
        let a = e.value;
        if (!a || o !== void 0 && !o.value) return;
        let r = Pt(e);
        if (!r) return;
        let l = Object.assign(d => t(d), {
                acceptNode: t
            }),
            i = r.createTreeWalker(a, NodeFilter.SHOW_ELEMENT, l, !1);
        for (; i.nextNode();) s(i.currentNode)
    })
}
var xt = (e => (e[e.None = 0] = "None", e[e.RenderStrategy = 1] = "RenderStrategy", e[e.Static = 2] = "Static", e))(xt || {}),
    cn = (e => (e[e.Unmount = 0] = "Unmount", e[e.Hidden = 1] = "Hidden", e))(cn || {});

function He({
    visible: e = !0,
    features: t = 0,
    ourProps: s,
    theirProps: o,
    ...a
}) {
    var r;
    let l = Rs(o, s),
        i = Object.assign(a, {
            props: l
        });
    if (e || t & 2 && l.static) return St(i);
    if (t & 1) {
        let d = (r = l.unmount) == null || r ? 0 : 1;
        return ht(d, {
            0() {
                return null
            },
            1() {
                return St({ ...a,
                    props: { ...l,
                        hidden: !0,
                        style: {
                            display: "none"
                        }
                    }
                })
            }
        })
    }
    return St(i)
}

function St({
    props: e,
    attrs: t,
    slots: s,
    slot: o,
    name: a
}) {
    var r, l;
    let {
        as: i,
        ...d
    } = js(e, ["unmount", "static"]), m = (r = s.default) == null ? void 0 : r.call(s, o), u = {};
    if (o) {
        let f = !1,
            v = [];
        for (let [p, h] of Object.entries(o)) typeof h == "boolean" && (f = !0), h === !0 && v.push(p);
        f && (u["data-headlessui-state"] = v.join(" "))
    }
    if (i === "template") {
        if (m = zs(m ? ? []), Object.keys(d).length > 0 || Object.keys(t).length > 0) {
            let [f, ...v] = m ? ? [];
            if (!fn(f) || v.length > 0) throw new Error(['Passing props on "template"!', "", `The current component <${a} /> is rendering a "template".`, "However we need to passthrough the following props:", Object.keys(d).concat(Object.keys(t)).map(g => g.trim()).filter((g, $, _) => _.indexOf(g) === $).sort((g, $) => g.localeCompare($)).map(g => `  - ${g}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "template".', "Render a single element as the child so that we can forward the props onto that element."].map(g => `  - ${g}`).join(`
`)].join(`
`));
            let p = Rs((l = f.props) != null ? l : {}, d, u),
                h = pa(f, p, !0);
            for (let g in p) g.startsWith("on") && (h.props || (h.props = {}), h.props[g] = p[g]);
            return h
        }
        return Array.isArray(m) && m.length === 1 ? m[0] : m
    }
    return At(i, Object.assign({}, d, u), {
        default: () => m
    })
}

function zs(e) {
    return e.flatMap(t => t.type === ae ? zs(t.children) : [t])
}

function Rs(...e) {
    if (e.length === 0) return {};
    if (e.length === 1) return e[0];
    let t = {},
        s = {};
    for (let o of e)
        for (let a in o) a.startsWith("on") && typeof o[a] == "function" ? (s[a] != null || (s[a] = []), s[a].push(o[a])) : t[a] = o[a];
    if (t.disabled || t["aria-disabled"]) return Object.assign(t, Object.fromEntries(Object.keys(s).map(o => [o, void 0])));
    for (let o in s) Object.assign(t, {
        [o](a, ...r) {
            let l = s[o];
            for (let i of l) {
                if (a instanceof Event && a.defaultPrevented) return;
                i(a, ...r)
            }
        }
    });
    return t
}

function vn(e) {
    let t = Object.assign({}, e);
    for (let s in t) t[s] === void 0 && delete t[s];
    return t
}

function js(e, t = []) {
    let s = Object.assign({}, e);
    for (let o of t) o in s && delete s[o];
    return s
}

function fn(e) {
    return e == null ? !1 : typeof e.type == "string" || typeof e.type == "object" || typeof e.type == "function"
}
var Ps = (e => (e[e.None = 1] = "None", e[e.Focusable = 2] = "Focusable", e[e.Hidden = 4] = "Hidden", e))(Ps || {});
let pn = re({
        name: "Hidden",
        props: {
            as: {
                type: [Object, String],
                default: "div"
            },
            features: {
                type: Number,
                default: 1
            }
        },
        setup(e, {
            slots: t,
            attrs: s
        }) {
            return () => {
                var o;
                let {
                    features: a,
                    ...r
                } = e, l = {
                    "aria-hidden": (a & 2) === 2 ? !0 : (o = r["aria-hidden"]) != null ? o : void 0,
                    hidden: (a & 4) === 4 ? !0 : void 0,
                    style: {
                        position: "fixed",
                        top: 1,
                        left: 1,
                        width: 1,
                        height: 0,
                        padding: 0,
                        margin: -1,
                        overflow: "hidden",
                        clip: "rect(0, 0, 0, 0)",
                        whiteSpace: "nowrap",
                        borderWidth: "0",
                        ...(a & 4) === 4 && (a & 2) !== 2 && {
                            display: "none"
                        }
                    }
                };
                return He({
                    ourProps: l,
                    theirProps: r,
                    slot: {},
                    attrs: s,
                    slots: t,
                    name: "Hidden"
                })
            }
        }
    }),
    Ns = Symbol("Context");
var Qe = (e => (e[e.Open = 1] = "Open", e[e.Closed = 2] = "Closed", e[e.Closing = 4] = "Closing", e[e.Opening = 8] = "Opening", e))(Qe || {});

function mn() {
    return be(Ns, null)
}

function gn(e) {
    zt(Ns, e)
}
var H = (e => (e.Space = " ", e.Enter = "Enter", e.Escape = "Escape", e.Backspace = "Backspace", e.Delete = "Delete", e.ArrowLeft = "ArrowLeft", e.ArrowUp = "ArrowUp", e.ArrowRight = "ArrowRight", e.ArrowDown = "ArrowDown", e.Home = "Home", e.End = "End", e.PageUp = "PageUp", e.PageDown = "PageDown", e.Tab = "Tab", e))(H || {});

function hn(e) {
    throw new Error("Unexpected object: " + e)
}
var Q = (e => (e[e.First = 0] = "First", e[e.Previous = 1] = "Previous", e[e.Next = 2] = "Next", e[e.Last = 3] = "Last", e[e.Specific = 4] = "Specific", e[e.Nothing = 5] = "Nothing", e))(Q || {});

function bn(e, t) {
    let s = t.resolveItems();
    if (s.length <= 0) return null;
    let o = t.resolveActiveIndex(),
        a = o ? ? -1;
    switch (e.focus) {
        case 0:
            {
                for (let r = 0; r < s.length; ++r)
                    if (!t.resolveDisabled(s[r], r, s)) return r;
                return o
            }
        case 1:
            {
                a === -1 && (a = s.length);
                for (let r = a - 1; r >= 0; --r)
                    if (!t.resolveDisabled(s[r], r, s)) return r;
                return o
            }
        case 2:
            {
                for (let r = a + 1; r < s.length; ++r)
                    if (!t.resolveDisabled(s[r], r, s)) return r;
                return o
            }
        case 3:
            {
                for (let r = s.length - 1; r >= 0; --r)
                    if (!t.resolveDisabled(s[r], r, s)) return r;
                return o
            }
        case 4:
            {
                for (let r = 0; r < s.length; ++r)
                    if (t.resolveId(s[r], r, s) === e.id) return r;
                return o
            }
        case 5:
            return null;
        default:
            hn(e)
    }
}

function yn(e) {
    var t, s;
    let o = (t = e == null ? void 0 : e.form) != null ? t : e.closest("form");
    if (o) {
        for (let a of o.elements)
            if (a !== e && (a.tagName === "INPUT" && a.type === "submit" || a.tagName === "BUTTON" && a.type === "submit" || a.nodeName === "INPUT" && a.type === "image")) {
                a.click();
                return
            }(s = o.requestSubmit) == null || s.call(o)
    }
}
let fs = /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;

function ps(e) {
    var t, s;
    let o = (t = e.innerText) != null ? t : "",
        a = e.cloneNode(!0);
    if (!(a instanceof HTMLElement)) return o;
    let r = !1;
    for (let i of a.querySelectorAll('[hidden],[aria-hidden],[role="img"]')) i.remove(), r = !0;
    let l = r ? (s = a.innerText) != null ? s : "" : o;
    return fs.test(l) && (l = l.replace(fs, "")), l
}

function _n(e) {
    let t = e.getAttribute("aria-label");
    if (typeof t == "string") return t.trim();
    let s = e.getAttribute("aria-labelledby");
    if (s) {
        let o = s.split(" ").map(a => {
            let r = document.getElementById(a);
            if (r) {
                let l = r.getAttribute("aria-label");
                return typeof l == "string" ? l.trim() : ps(r).trim()
            }
            return null
        }).filter(Boolean);
        if (o.length > 0) return o.join(", ")
    }
    return ps(e).trim()
}

function wn(e) {
    let t = M(""),
        s = M("");
    return () => {
        let o = Y(e);
        if (!o) return "";
        let a = o.innerText;
        if (t.value === a) return s.value;
        let r = _n(o).trim().toLowerCase();
        return t.value = a, s.value = r, r
    }
}
var $n = (e => (e[e.Open = 0] = "Open", e[e.Closed = 1] = "Closed", e))($n || {}),
    kn = (e => (e[e.Pointer = 0] = "Pointer", e[e.Other = 1] = "Other", e))(kn || {});

function In(e) {
    requestAnimationFrame(() => requestAnimationFrame(e))
}
let Vs = Symbol("MenuContext");

function bt(e) {
    let t = be(Vs, null);
    if (t === null) {
        let s = new Error(`<${e} /> is missing a parent <Menu /> component.`);
        throw Error.captureStackTrace && Error.captureStackTrace(s, bt), s
    }
    return t
}
let Cn = re({
        name: "Menu",
        props: {
            as: {
                type: [Object, String],
                default: "template"
            }
        },
        setup(e, {
            slots: t,
            attrs: s
        }) {
            let o = M(1),
                a = M(null),
                r = M(null),
                l = M([]),
                i = M(""),
                d = M(null),
                m = M(1);

            function u(v = p => p) {
                let p = d.value !== null ? l.value[d.value] : null,
                    h = Ts(v(l.value.slice()), $ => Y($.dataRef.domRef)),
                    g = p ? h.indexOf(p) : null;
                return g === -1 && (g = null), {
                    items: h,
                    activeItemIndex: g
                }
            }
            let f = {
                menuState: o,
                buttonRef: a,
                itemsRef: r,
                items: l,
                searchQuery: i,
                activeItemIndex: d,
                activationTrigger: m,
                closeMenu: () => {
                    o.value = 1, d.value = null
                },
                openMenu: () => o.value = 0,
                goToItem(v, p, h) {
                    let g = u(),
                        $ = bn(v === Q.Specific ? {
                            focus: Q.Specific,
                            id: p
                        } : {
                            focus: v
                        }, {
                            resolveItems: () => g.items,
                            resolveActiveIndex: () => g.activeItemIndex,
                            resolveId: _ => _.id,
                            resolveDisabled: _ => _.dataRef.disabled
                        });
                    i.value = "", d.value = $, m.value = h ? ? 1, l.value = g.items
                },
                search(v) {
                    let p = i.value !== "" ? 0 : 1;
                    i.value += v.toLowerCase();
                    let h = (d.value !== null ? l.value.slice(d.value + p).concat(l.value.slice(0, d.value + p)) : l.value).find($ => $.dataRef.textValue.startsWith(i.value) && !$.dataRef.disabled),
                        g = h ? l.value.indexOf(h) : -1;
                    g === -1 || g === d.value || (d.value = g, m.value = 1)
                },
                clearSearch() {
                    i.value = ""
                },
                registerItem(v, p) {
                    let h = u(g => [...g, {
                        id: v,
                        dataRef: p
                    }]);
                    l.value = h.items, d.value = h.activeItemIndex, m.value = 1
                },
                unregisterItem(v) {
                    let p = u(h => {
                        let g = h.findIndex($ => $.id === v);
                        return g !== -1 && h.splice(g, 1), h
                    });
                    l.value = p.items, d.value = p.activeItemIndex, m.value = 1
                }
            };
            return ln([a, r], (v, p) => {
                var h;
                f.closeMenu(), Vt(p, Nt.Loose) || (v.preventDefault(), (h = Y(a)) == null || h.focus())
            }, O(() => o.value === 0)), zt(Vs, f), gn(O(() => ht(o.value, {
                0: Qe.Open,
                1: Qe.Closed
            }))), () => {
                let v = {
                    open: o.value === 0,
                    close: f.closeMenu
                };
                return He({
                    ourProps: {},
                    theirProps: e,
                    slot: v,
                    slots: t,
                    attrs: s,
                    name: "Menu"
                })
            }
        }
    }),
    Sn = re({
        name: "MenuButton",
        props: {
            disabled: {
                type: Boolean,
                default: !1
            },
            as: {
                type: [Object, String],
                default: "button"
            },
            id: {
                type: String,
                default: null
            }
        },
        setup(e, {
            attrs: t,
            slots: s,
            expose: o
        }) {
            var a;
            let r = (a = e.id) != null ? a : `headlessui-menu-button-${gt()}`,
                l = bt("MenuButton");
            o({
                el: l.buttonRef,
                $el: l.buttonRef
            });

            function i(f) {
                switch (f.key) {
                    case H.Space:
                    case H.Enter:
                    case H.ArrowDown:
                        f.preventDefault(), f.stopPropagation(), l.openMenu(), Ce(() => {
                            var v;
                            (v = Y(l.itemsRef)) == null || v.focus({
                                preventScroll: !0
                            }), l.goToItem(Q.First)
                        });
                        break;
                    case H.ArrowUp:
                        f.preventDefault(), f.stopPropagation(), l.openMenu(), Ce(() => {
                            var v;
                            (v = Y(l.itemsRef)) == null || v.focus({
                                preventScroll: !0
                            }), l.goToItem(Q.Last)
                        });
                        break
                }
            }

            function d(f) {
                switch (f.key) {
                    case H.Space:
                        f.preventDefault();
                        break
                }
            }

            function m(f) {
                e.disabled || (l.menuState.value === 0 ? (l.closeMenu(), Ce(() => {
                    var v;
                    return (v = Y(l.buttonRef)) == null ? void 0 : v.focus({
                        preventScroll: !0
                    })
                })) : (f.preventDefault(), l.openMenu(), In(() => {
                    var v;
                    return (v = Y(l.itemsRef)) == null ? void 0 : v.focus({
                        preventScroll: !0
                    })
                })))
            }
            let u = Es(O(() => ({
                as: e.as,
                type: t.type
            })), l.buttonRef);
            return () => {
                var f;
                let v = {
                        open: l.menuState.value === 0
                    },
                    { ...p
                    } = e,
                    h = {
                        ref: l.buttonRef,
                        id: r,
                        type: u.value,
                        "aria-haspopup": "menu",
                        "aria-controls": (f = Y(l.itemsRef)) == null ? void 0 : f.id,
                        "aria-expanded": l.menuState.value === 0,
                        onKeydown: i,
                        onKeyup: d,
                        onClick: m
                    };
                return He({
                    ourProps: h,
                    theirProps: p,
                    slot: v,
                    attrs: t,
                    slots: s,
                    name: "MenuButton"
                })
            }
        }
    }),
    Dn = re({
        name: "MenuItems",
        props: {
            as: {
                type: [Object, String],
                default: "div"
            },
            static: {
                type: Boolean,
                default: !1
            },
            unmount: {
                type: Boolean,
                default: !0
            },
            id: {
                type: String,
                default: null
            }
        },
        setup(e, {
            attrs: t,
            slots: s,
            expose: o
        }) {
            var a;
            let r = (a = e.id) != null ? a : `headlessui-menu-items-${gt()}`,
                l = bt("MenuItems"),
                i = M(null);
            o({
                el: l.itemsRef,
                $el: l.itemsRef
            }), dn({
                container: O(() => Y(l.itemsRef)),
                enabled: O(() => l.menuState.value === 0),
                accept(v) {
                    return v.getAttribute("role") === "menuitem" ? NodeFilter.FILTER_REJECT : v.hasAttribute("role") ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_ACCEPT
                },
                walk(v) {
                    v.setAttribute("role", "none")
                }
            });

            function d(v) {
                var p;
                switch (i.value && clearTimeout(i.value), v.key) {
                    case H.Space:
                        if (l.searchQuery.value !== "") return v.preventDefault(), v.stopPropagation(), l.search(v.key);
                    case H.Enter:
                        if (v.preventDefault(), v.stopPropagation(), l.activeItemIndex.value !== null) {
                            let h = l.items.value[l.activeItemIndex.value];
                            (p = Y(h.dataRef.domRef)) == null || p.click()
                        }
                        l.closeMenu(), xs(Y(l.buttonRef));
                        break;
                    case H.ArrowDown:
                        return v.preventDefault(), v.stopPropagation(), l.goToItem(Q.Next);
                    case H.ArrowUp:
                        return v.preventDefault(), v.stopPropagation(), l.goToItem(Q.Previous);
                    case H.Home:
                    case H.PageUp:
                        return v.preventDefault(), v.stopPropagation(), l.goToItem(Q.First);
                    case H.End:
                    case H.PageDown:
                        return v.preventDefault(), v.stopPropagation(), l.goToItem(Q.Last);
                    case H.Escape:
                        v.preventDefault(), v.stopPropagation(), l.closeMenu(), Ce(() => {
                            var h;
                            return (h = Y(l.buttonRef)) == null ? void 0 : h.focus({
                                preventScroll: !0
                            })
                        });
                        break;
                    case H.Tab:
                        v.preventDefault(), v.stopPropagation(), l.closeMenu(), Ce(() => tn(Y(l.buttonRef), v.shiftKey ? Mt.Previous : Mt.Next));
                        break;
                    default:
                        v.key.length === 1 && (l.search(v.key), i.value = setTimeout(() => l.clearSearch(), 350));
                        break
                }
            }

            function m(v) {
                switch (v.key) {
                    case H.Space:
                        v.preventDefault();
                        break
                }
            }
            let u = mn(),
                f = O(() => u !== null ? (u.value & Qe.Open) === Qe.Open : l.menuState.value === 0);
            return () => {
                var v, p;
                let h = {
                        open: l.menuState.value === 0
                    },
                    { ...g
                    } = e,
                    $ = {
                        "aria-activedescendant": l.activeItemIndex.value === null || (v = l.items.value[l.activeItemIndex.value]) == null ? void 0 : v.id,
                        "aria-labelledby": (p = Y(l.buttonRef)) == null ? void 0 : p.id,
                        id: r,
                        onKeydown: d,
                        onKeyup: m,
                        role: "menu",
                        tabIndex: 0,
                        ref: l.itemsRef
                    };
                return He({
                    ourProps: $,
                    theirProps: g,
                    slot: h,
                    attrs: t,
                    slots: s,
                    features: xt.RenderStrategy | xt.Static,
                    visible: f.value,
                    name: "MenuItems"
                })
            }
        }
    }),
    On = re({
        name: "MenuItem",
        inheritAttrs: !1,
        props: {
            as: {
                type: [Object, String],
                default: "template"
            },
            disabled: {
                type: Boolean,
                default: !1
            },
            id: {
                type: String,
                default: null
            }
        },
        setup(e, {
            slots: t,
            attrs: s,
            expose: o
        }) {
            var a;
            let r = (a = e.id) != null ? a : `headlessui-menu-item-${gt()}`,
                l = bt("MenuItem"),
                i = M(null);
            o({
                el: i,
                $el: i
            });
            let d = O(() => l.activeItemIndex.value !== null ? l.items.value[l.activeItemIndex.value].id === r : !1),
                m = wn(i),
                u = O(() => ({
                    disabled: e.disabled,
                    get textValue() {
                        return m()
                    },
                    domRef: i
                }));
            Be(() => l.registerItem(r, u)), ma(() => l.unregisterItem(r)), Fe(() => {
                l.menuState.value === 0 && d.value && l.activationTrigger.value !== 0 && Ce(() => {
                    var _, k;
                    return (k = (_ = Y(i)) == null ? void 0 : _.scrollIntoView) == null ? void 0 : k.call(_, {
                        block: "nearest"
                    })
                })
            });

            function f(_) {
                if (e.disabled) return _.preventDefault();
                l.closeMenu(), xs(Y(l.buttonRef))
            }

            function v() {
                if (e.disabled) return l.goToItem(Q.Nothing);
                l.goToItem(Q.Specific, r)
            }
            let p = un();

            function h(_) {
                p.update(_)
            }

            function g(_) {
                p.wasMoved(_) && (e.disabled || d.value || l.goToItem(Q.Specific, r, 0))
            }

            function $(_) {
                p.wasMoved(_) && (e.disabled || d.value && l.goToItem(Q.Nothing))
            }
            return () => {
                let {
                    disabled: _,
                    ...k
                } = e, S = {
                    active: d.value,
                    disabled: _,
                    close: l.closeMenu
                };
                return He({
                    ourProps: {
                        id: r,
                        ref: i,
                        role: "menuitem",
                        tabIndex: _ === !0 ? void 0 : -1,
                        "aria-disabled": _ === !0 ? !0 : void 0,
                        onClick: f,
                        onFocus: v,
                        onPointerenter: h,
                        onMouseenter: h,
                        onPointermove: g,
                        onMousemove: g,
                        onPointerleave: $,
                        onMouseleave: $
                    },
                    theirProps: { ...s,
                        ...k
                    },
                    slot: S,
                    attrs: s,
                    slots: t,
                    name: "MenuItem"
                })
            }
        }
    }),
    An = Symbol("GroupContext"),
    Bn = re({
        name: "Switch",
        emits: {
            "update:modelValue": e => !0
        },
        props: {
            as: {
                type: [Object, String],
                default: "button"
            },
            modelValue: {
                type: Boolean,
                default: void 0
            },
            defaultChecked: {
                type: Boolean,
                optional: !0
            },
            form: {
                type: String,
                optional: !0
            },
            name: {
                type: String,
                optional: !0
            },
            value: {
                type: String,
                optional: !0
            },
            id: {
                type: String,
                default: null
            },
            disabled: {
                type: Boolean,
                default: !1
            },
            tabIndex: {
                type: Number,
                default: 0
            }
        },
        inheritAttrs: !1,
        setup(e, {
            emit: t,
            attrs: s,
            slots: o,
            expose: a
        }) {
            var r;
            let l = (r = e.id) != null ? r : `headlessui-switch-${gt()}`,
                i = be(An, null),
                [d, m] = Ha(O(() => e.modelValue), k => t("update:modelValue", k), O(() => e.defaultChecked));

            function u() {
                m(!d.value)
            }
            let f = M(null),
                v = i === null ? f : i.switchRef,
                p = Es(O(() => ({
                    as: e.as,
                    type: s.type
                })), v);
            a({
                el: v,
                $el: v
            });

            function h(k) {
                k.preventDefault(), u()
            }

            function g(k) {
                k.key === H.Space ? (k.preventDefault(), u()) : k.key === H.Enter && yn(k.currentTarget)
            }

            function $(k) {
                k.preventDefault()
            }
            let _ = O(() => {
                var k, S;
                return (S = (k = Y(v)) == null ? void 0 : k.closest) == null ? void 0 : S.call(k, "form")
            });
            return Be(() => {
                vt([_], () => {
                    if (!_.value || e.defaultChecked === void 0) return;

                    function k() {
                        m(e.defaultChecked)
                    }
                    return _.value.addEventListener("reset", k), () => {
                        var S;
                        (S = _.value) == null || S.removeEventListener("reset", k)
                    }
                }, {
                    immediate: !0
                })
            }), () => {
                let {
                    name: k,
                    value: S,
                    form: D,
                    tabIndex: A,
                    ...B
                } = e, x = {
                    checked: d.value
                }, j = {
                    id: l,
                    ref: v,
                    role: "switch",
                    type: p.value,
                    tabIndex: A === -1 ? 0 : A,
                    "aria-checked": d.value,
                    "aria-labelledby": i == null ? void 0 : i.labelledby.value,
                    "aria-describedby": i == null ? void 0 : i.describedby.value,
                    onClick: h,
                    onKeyup: g,
                    onKeypress: $
                };
                return At(ae, [k != null && d.value != null ? At(pn, vn({
                    features: Ps.Hidden,
                    as: "input",
                    type: "checkbox",
                    hidden: !0,
                    readOnly: !0,
                    checked: d.value,
                    form: D,
                    disabled: B.disabled,
                    name: k,
                    value: S
                })) : null, He({
                    ourProps: j,
                    theirProps: { ...s,
                        ...js(B, ["modelValue", "defaultChecked"])
                    },
                    slot: x,
                    attrs: s,
                    slots: o,
                    name: "Switch"
                })])
            }
        }
    });
const ke = et(K.ui.strategy, K.ui.toggle, ja),
    Ln = re({
        components: {
            HSwitch: Bn,
            UIcon: Le
        },
        inheritAttrs: !1,
        props: {
            id: {
                type: String,
                default: null
            },
            name: {
                type: String,
                default: null
            },
            modelValue: {
                type: Boolean,
                default: !1
            },
            disabled: {
                type: Boolean,
                default: !1
            },
            loading: {
                type: Boolean,
                default: !1
            },
            onIcon: {
                type: String,
                default: () => ke.default.onIcon
            },
            offIcon: {
                type: String,
                default: () => ke.default.offIcon
            },
            loadingIcon: {
                type: String,
                default: () => ke.default.loadingIcon
            },
            color: {
                type: String,
                default: () => ke.default.color,
                validator(e) {
                    return K.ui.colors.includes(e)
                }
            },
            size: {
                type: String,
                default: () => ke.default.size,
                validator(e) {
                    return Object.keys(ke.size).includes(e)
                }
            },
            class: {
                type: [String, Object, Array],
                    default: () => ""
            },
            ui: {
                type: Object,
                default: () => ({})
            }
        },
        emits: ["update:modelValue", "change"],
        setup(e, {
            emit: t
        }) {
            const {
                ui: s,
                attrs: o
            } = st("toggle", Oe(e, "ui"), ke), {
                emitFormChange: a,
                color: r,
                inputId: l,
                name: i
            } = Rt(e), d = O({
                get() {
                    return e.modelValue
                },
                set(h) {
                    t("update:modelValue", h), t("change", h), a()
                }
            }), m = O(() => ze(G(s.value.base, s.value.size[e.size], s.value.rounded, r.value && s.value.ring.replaceAll("{color}", r.value), r.value && (d.value ? s.value.active : s.value.inactive).replaceAll("{color}", r.value)), e.class)), u = O(() => G(s.value.container.base, s.value.container.size[e.size], d.value ? s.value.container.active[e.size] : s.value.container.inactive)), f = O(() => G(s.value.icon.size[e.size], r.value && s.value.icon.on.replaceAll("{color}", r.value))), v = O(() => G(s.value.icon.size[e.size], r.value && s.value.icon.off.replaceAll("{color}", r.value))), p = O(() => G(s.value.icon.size[e.size], r.value && s.value.icon.loading.replaceAll("{color}", r.value)));
            return Ls(() => As("$mRW6KdlcYH")), {
                ui: s,
                attrs: o,
                name: i,
                inputId: l,
                active: d,
                switchClass: m,
                containerClass: u,
                onIconClass: f,
                offIconClass: v,
                loadingIconClass: p
            }
        }
    });

function Mn(e, t, s, o, a, r) {
    const l = Le,
        i = Ge("HSwitch");
    return y(), se(i, he({
        id: e.inputId,
        modelValue: e.active,
        "onUpdate:modelValue": t[0] || (t[0] = d => e.active = d),
        name: e.name,
        disabled: e.disabled || e.loading,
        class: e.switchClass
    }, e.attrs), {
        default: q(() => [n("span", {
            class: R(e.containerClass)
        }, [e.loading ? (y(), w("span", {
            key: 0,
            class: R([e.ui.icon.active, e.ui.icon.base]),
            "aria-hidden": "true"
        }, [L(l, {
            name: e.loadingIcon,
            class: R(e.loadingIconClass)
        }, null, 8, ["name", "class"])], 2)) : E("", !0), !e.loading && e.onIcon ? (y(), w("span", {
            key: 1,
            class: R([e.active ? e.ui.icon.active : e.ui.icon.inactive, e.ui.icon.base]),
            "aria-hidden": "true"
        }, [L(l, {
            name: e.onIcon,
            class: R(e.onIconClass)
        }, null, 8, ["name", "class"])], 2)) : E("", !0), !e.loading && e.offIcon ? (y(), w("span", {
            key: 2,
            class: R([e.active ? e.ui.icon.inactive : e.ui.icon.active, e.ui.icon.base]),
            "aria-hidden": "true"
        }, [L(l, {
            name: e.offIcon,
            class: R(e.offIconClass)
        }, null, 8, ["name", "class"])], 2)) : E("", !0)], 2)]),
        _: 1
    }, 16, ["id", "modelValue", "name", "disabled", "class"])
}
const xn = X(Ln, [
        ["render", Mn]
    ]),
    Tn = "" + globalThis.__publicAssetsURL("headerBar/ham/back.svg"),
    En = e => (ce("data-v-30471952"), e = e(), ve(), e),
    zn = {
        key: 0,
        class: "bg-menu"
    },
    Rn = En(() => n("img", {
        src: Tn
    }, null, -1)),
    jn = {
        class: "flex flex-col gap-[2%] overflow-auto h-[100%] mask-y pt-[2%] pb-[2%]"
    },
    Pn = ["onClick"],
    Nn = ["src"],
    Vn = {
        __name: "dialoglang",
        props: {
            dialogLang: {
                type: Boolean,
                default () {
                    return !1
                }
            }
        },
        emits: ["toggleDialogLang", "setLang"],
        setup(e, {
            emit: t
        }) {
            const s = t,
                {
                    locale: o,
                    locales: a,
                    setLocale: r
                } = tt();
            return (l, i) => e.dialogLang ? (y(), w("div", zn, [n("div", {
                class: "flex gap-4 clickActive",
                onClick: i[0] || (i[0] = d => s("toggleDialogLang"))
            }, [Rn, n("div", null, c(l.$t("language")), 1)]), n("div", jn, [(y(!0), w(ae, null, ye(b(a), d => (y(), w("div", {
                key: d.code,
                class: "btn gap-2 clickActive",
                onClick: m => s("setLang", d.code)
            }, [n("img", {
                src: `/headerBar/lang/${d.code.substring(0,2)}.svg`
            }, null, 8, Nn), n("div", null, c(d.name), 1)], 8, Pn))), 128))])])) : E("", !0)
        }
    },
    Fn = X(Vn, [
        ["__scopeId", "data-v-30471952"]
    ]),
    Dt = et(K.ui.strategy, K.ui.kbd, Ra),
    Yn = re({
        inheritAttrs: !1,
        props: {
            value: {
                type: String,
                default: null
            },
            size: {
                type: String,
                default: () => Dt.default.size,
                validator(e) {
                    return Object.keys(Dt.size).includes(e)
                }
            },
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
                ui: t,
                attrs: s
            } = st("kbd", Oe(e, "ui"), Dt), o = O(() => ze(G(t.value.base, t.value.size[e.size], t.value.padding, t.value.rounded, t.value.font, t.value.background, t.value.ring), e.class));
            return {
                ui: t,
                attrs: s,
                kbdClass: o
            }
        }
    });

function Hn(e, t, s, o, a, r) {
    return y(), w("kbd", he({
        class: e.kbdClass
    }, e.attrs), [Se(e.$slots, "default", {}, () => [Ke(c(e.value), 1)])], 16)
}
const Fs = X(Yn, [
    ["render", Hn]
]);

function te(e) {
    if (e == null) return window;
    if (e.toString() !== "[object Window]") {
        var t = e.ownerDocument;
        return t && t.defaultView || window
    }
    return e
}

function Ae(e) {
    var t = te(e).Element;
    return e instanceof t || e instanceof Element
}

function ne(e) {
    var t = te(e).HTMLElement;
    return e instanceof t || e instanceof HTMLElement
}

function Ft(e) {
    if (typeof ShadowRoot > "u") return !1;
    var t = te(e).ShadowRoot;
    return e instanceof t || e instanceof ShadowRoot
}
var De = Math.max,
    pt = Math.min,
    je = Math.round;

function Tt() {
    var e = navigator.userAgentData;
    return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
        return t.brand + "/" + t.version
    }).join(" ") : navigator.userAgent
}

function Ys() {
    return !/^((?!chrome|android).)*safari/i.test(Tt())
}

function Pe(e, t, s) {
    t === void 0 && (t = !1), s === void 0 && (s = !1);
    var o = e.getBoundingClientRect(),
        a = 1,
        r = 1;
    t && ne(e) && (a = e.offsetWidth > 0 && je(o.width) / e.offsetWidth || 1, r = e.offsetHeight > 0 && je(o.height) / e.offsetHeight || 1);
    var l = Ae(e) ? te(e) : window,
        i = l.visualViewport,
        d = !Ys() && s,
        m = (o.left + (d && i ? i.offsetLeft : 0)) / a,
        u = (o.top + (d && i ? i.offsetTop : 0)) / r,
        f = o.width / a,
        v = o.height / r;
    return {
        width: f,
        height: v,
        top: u,
        right: m + f,
        bottom: u + v,
        left: m,
        x: m,
        y: u
    }
}

function Yt(e) {
    var t = te(e),
        s = t.pageXOffset,
        o = t.pageYOffset;
    return {
        scrollLeft: s,
        scrollTop: o
    }
}

function Un(e) {
    return {
        scrollLeft: e.scrollLeft,
        scrollTop: e.scrollTop
    }
}

function Wn(e) {
    return e === te(e) || !ne(e) ? Yt(e) : Un(e)
}

function de(e) {
    return e ? (e.nodeName || "").toLowerCase() : null
}

function _e(e) {
    return ((Ae(e) ? e.ownerDocument : e.document) || window.document).documentElement
}

function Ht(e) {
    return Pe(_e(e)).left + Yt(e).scrollLeft
}

function me(e) {
    return te(e).getComputedStyle(e)
}

function Ut(e) {
    var t = me(e),
        s = t.overflow,
        o = t.overflowX,
        a = t.overflowY;
    return /auto|scroll|overlay|hidden/.test(s + a + o)
}

function qn(e) {
    var t = e.getBoundingClientRect(),
        s = je(t.width) / e.offsetWidth || 1,
        o = je(t.height) / e.offsetHeight || 1;
    return s !== 1 || o !== 1
}

function Gn(e, t, s) {
    s === void 0 && (s = !1);
    var o = ne(t),
        a = ne(t) && qn(t),
        r = _e(t),
        l = Pe(e, a, s),
        i = {
            scrollLeft: 0,
            scrollTop: 0
        },
        d = {
            x: 0,
            y: 0
        };
    return (o || !o && !s) && ((de(t) !== "body" || Ut(r)) && (i = Wn(t)), ne(t) ? (d = Pe(t, !0), d.x += t.clientLeft, d.y += t.clientTop) : r && (d.x = Ht(r))), {
        x: l.left + i.scrollLeft - d.x,
        y: l.top + i.scrollTop - d.y,
        width: l.width,
        height: l.height
    }
}

function Wt(e) {
    var t = Pe(e),
        s = e.offsetWidth,
        o = e.offsetHeight;
    return Math.abs(t.width - s) <= 1 && (s = t.width), Math.abs(t.height - o) <= 1 && (o = t.height), {
        x: e.offsetLeft,
        y: e.offsetTop,
        width: s,
        height: o
    }
}

function yt(e) {
    return de(e) === "html" ? e : e.assignedSlot || e.parentNode || (Ft(e) ? e.host : null) || _e(e)
}

function Hs(e) {
    return ["html", "body", "#document"].indexOf(de(e)) >= 0 ? e.ownerDocument.body : ne(e) && Ut(e) ? e : Hs(yt(e))
}

function Xe(e, t) {
    var s;
    t === void 0 && (t = []);
    var o = Hs(e),
        a = o === ((s = e.ownerDocument) == null ? void 0 : s.body),
        r = te(o),
        l = a ? [r].concat(r.visualViewport || [], Ut(o) ? o : []) : o,
        i = t.concat(l);
    return a ? i : i.concat(Xe(yt(l)))
}

function Kn(e) {
    return ["table", "td", "th"].indexOf(de(e)) >= 0
}

function ms(e) {
    return !ne(e) || me(e).position === "fixed" ? null : e.offsetParent
}

function Xn(e) {
    var t = /firefox/i.test(Tt()),
        s = /Trident/i.test(Tt());
    if (s && ne(e)) {
        var o = me(e);
        if (o.position === "fixed") return null
    }
    var a = yt(e);
    for (Ft(a) && (a = a.host); ne(a) && ["html", "body"].indexOf(de(a)) < 0;) {
        var r = me(a);
        if (r.transform !== "none" || r.perspective !== "none" || r.contain === "paint" || ["transform", "perspective"].indexOf(r.willChange) !== -1 || t && r.willChange === "filter" || t && r.filter && r.filter !== "none") return a;
        a = a.parentNode
    }
    return null
}

function at(e) {
    for (var t = te(e), s = ms(e); s && Kn(s) && me(s).position === "static";) s = ms(s);
    return s && (de(s) === "html" || de(s) === "body" && me(s).position === "static") ? t : s || Xn(e) || t
}
var Z = "top",
    oe = "bottom",
    ie = "right",
    ee = "left",
    qt = "auto",
    nt = [Z, oe, ie, ee],
    Ne = "start",
    Ze = "end",
    Jn = "clippingParents",
    Us = "viewport",
    qe = "popper",
    Qn = "reference",
    gs = nt.reduce(function(e, t) {
        return e.concat([t + "-" + Ne, t + "-" + Ze])
    }, []),
    Ws = [].concat(nt, [qt]).reduce(function(e, t) {
        return e.concat([t, t + "-" + Ne, t + "-" + Ze])
    }, []),
    Zn = "beforeRead",
    eo = "read",
    to = "afterRead",
    so = "beforeMain",
    ao = "main",
    no = "afterMain",
    oo = "beforeWrite",
    io = "write",
    ro = "afterWrite",
    lo = [Zn, eo, to, so, ao, no, oo, io, ro];

function uo(e) {
    var t = new Map,
        s = new Set,
        o = [];
    e.forEach(function(r) {
        t.set(r.name, r)
    });

    function a(r) {
        s.add(r.name);
        var l = [].concat(r.requires || [], r.requiresIfExists || []);
        l.forEach(function(i) {
            if (!s.has(i)) {
                var d = t.get(i);
                d && a(d)
            }
        }), o.push(r)
    }
    return e.forEach(function(r) {
        s.has(r.name) || a(r)
    }), o
}

function co(e) {
    var t = uo(e);
    return lo.reduce(function(s, o) {
        return s.concat(t.filter(function(a) {
            return a.phase === o
        }))
    }, [])
}

function vo(e) {
    var t;
    return function() {
        return t || (t = new Promise(function(s) {
            Promise.resolve().then(function() {
                t = void 0, s(e())
            })
        })), t
    }
}

function fo(e) {
    var t = e.reduce(function(s, o) {
        var a = s[o.name];
        return s[o.name] = a ? Object.assign({}, a, o, {
            options: Object.assign({}, a.options, o.options),
            data: Object.assign({}, a.data, o.data)
        }) : o, s
    }, {});
    return Object.keys(t).map(function(s) {
        return t[s]
    })
}

function po(e, t) {
    var s = te(e),
        o = _e(e),
        a = s.visualViewport,
        r = o.clientWidth,
        l = o.clientHeight,
        i = 0,
        d = 0;
    if (a) {
        r = a.width, l = a.height;
        var m = Ys();
        (m || !m && t === "fixed") && (i = a.offsetLeft, d = a.offsetTop)
    }
    return {
        width: r,
        height: l,
        x: i + Ht(e),
        y: d
    }
}

function mo(e) {
    var t, s = _e(e),
        o = Yt(e),
        a = (t = e.ownerDocument) == null ? void 0 : t.body,
        r = De(s.scrollWidth, s.clientWidth, a ? a.scrollWidth : 0, a ? a.clientWidth : 0),
        l = De(s.scrollHeight, s.clientHeight, a ? a.scrollHeight : 0, a ? a.clientHeight : 0),
        i = -o.scrollLeft + Ht(e),
        d = -o.scrollTop;
    return me(a || s).direction === "rtl" && (i += De(s.clientWidth, a ? a.clientWidth : 0) - r), {
        width: r,
        height: l,
        x: i,
        y: d
    }
}

function qs(e, t) {
    var s = t.getRootNode && t.getRootNode();
    if (e.contains(t)) return !0;
    if (s && Ft(s)) {
        var o = t;
        do {
            if (o && e.isSameNode(o)) return !0;
            o = o.parentNode || o.host
        } while (o)
    }
    return !1
}

function Et(e) {
    return Object.assign({}, e, {
        left: e.x,
        top: e.y,
        right: e.x + e.width,
        bottom: e.y + e.height
    })
}

function go(e, t) {
    var s = Pe(e, !1, t === "fixed");
    return s.top = s.top + e.clientTop, s.left = s.left + e.clientLeft, s.bottom = s.top + e.clientHeight, s.right = s.left + e.clientWidth, s.width = e.clientWidth, s.height = e.clientHeight, s.x = s.left, s.y = s.top, s
}

function hs(e, t, s) {
    return t === Us ? Et(po(e, s)) : Ae(t) ? go(t, s) : Et(mo(_e(e)))
}

function ho(e) {
    var t = Xe(yt(e)),
        s = ["absolute", "fixed"].indexOf(me(e).position) >= 0,
        o = s && ne(e) ? at(e) : e;
    return Ae(o) ? t.filter(function(a) {
        return Ae(a) && qs(a, o) && de(a) !== "body"
    }) : []
}

function bo(e, t, s, o) {
    var a = t === "clippingParents" ? ho(e) : [].concat(t),
        r = [].concat(a, [s]),
        l = r[0],
        i = r.reduce(function(d, m) {
            var u = hs(e, m, o);
            return d.top = De(u.top, d.top), d.right = pt(u.right, d.right), d.bottom = pt(u.bottom, d.bottom), d.left = De(u.left, d.left), d
        }, hs(e, l, o));
    return i.width = i.right - i.left, i.height = i.bottom - i.top, i.x = i.left, i.y = i.top, i
}

function ue(e) {
    return e.split("-")[0]
}

function Ve(e) {
    return e.split("-")[1]
}

function Gt(e) {
    return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y"
}

function Gs(e) {
    var t = e.reference,
        s = e.element,
        o = e.placement,
        a = o ? ue(o) : null,
        r = o ? Ve(o) : null,
        l = t.x + t.width / 2 - s.width / 2,
        i = t.y + t.height / 2 - s.height / 2,
        d;
    switch (a) {
        case Z:
            d = {
                x: l,
                y: t.y - s.height
            };
            break;
        case oe:
            d = {
                x: l,
                y: t.y + t.height
            };
            break;
        case ie:
            d = {
                x: t.x + t.width,
                y: i
            };
            break;
        case ee:
            d = {
                x: t.x - s.width,
                y: i
            };
            break;
        default:
            d = {
                x: t.x,
                y: t.y
            }
    }
    var m = a ? Gt(a) : null;
    if (m != null) {
        var u = m === "y" ? "height" : "width";
        switch (r) {
            case Ne:
                d[m] = d[m] - (t[u] / 2 - s[u] / 2);
                break;
            case Ze:
                d[m] = d[m] + (t[u] / 2 - s[u] / 2);
                break
        }
    }
    return d
}

function Ks() {
    return {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }
}

function Xs(e) {
    return Object.assign({}, Ks(), e)
}

function Js(e, t) {
    return t.reduce(function(s, o) {
        return s[o] = e, s
    }, {})
}

function Kt(e, t) {
    t === void 0 && (t = {});
    var s = t,
        o = s.placement,
        a = o === void 0 ? e.placement : o,
        r = s.strategy,
        l = r === void 0 ? e.strategy : r,
        i = s.boundary,
        d = i === void 0 ? Jn : i,
        m = s.rootBoundary,
        u = m === void 0 ? Us : m,
        f = s.elementContext,
        v = f === void 0 ? qe : f,
        p = s.altBoundary,
        h = p === void 0 ? !1 : p,
        g = s.padding,
        $ = g === void 0 ? 0 : g,
        _ = Xs(typeof $ != "number" ? $ : Js($, nt)),
        k = v === qe ? Qn : qe,
        S = e.rects.popper,
        D = e.elements[h ? k : v],
        A = bo(Ae(D) ? D : D.contextElement || _e(e.elements.popper), d, u, l),
        B = Pe(e.elements.reference),
        x = Gs({
            reference: B,
            element: S,
            strategy: "absolute",
            placement: a
        }),
        j = Et(Object.assign({}, S, x)),
        P = v === qe ? j : B,
        N = {
            top: A.top - P.top + _.top,
            bottom: P.bottom - A.bottom + _.bottom,
            left: A.left - P.left + _.left,
            right: P.right - A.right + _.right
        },
        I = e.modifiersData.offset;
    if (v === qe && I) {
        var C = I[a];
        Object.keys(N).forEach(function(V) {
            var z = [ie, oe].indexOf(V) >= 0 ? 1 : -1,
                U = [Z, oe].indexOf(V) >= 0 ? "y" : "x";
            N[V] += C[U] * z
        })
    }
    return N
}
var bs = {
    placement: "bottom",
    modifiers: [],
    strategy: "absolute"
};

function ys() {
    for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++) t[s] = arguments[s];
    return !t.some(function(o) {
        return !(o && typeof o.getBoundingClientRect == "function")
    })
}

function yo(e) {
    e === void 0 && (e = {});
    var t = e,
        s = t.defaultModifiers,
        o = s === void 0 ? [] : s,
        a = t.defaultOptions,
        r = a === void 0 ? bs : a;
    return function(i, d, m) {
        m === void 0 && (m = r);
        var u = {
                placement: "bottom",
                orderedModifiers: [],
                options: Object.assign({}, bs, r),
                modifiersData: {},
                elements: {
                    reference: i,
                    popper: d
                },
                attributes: {},
                styles: {}
            },
            f = [],
            v = !1,
            p = {
                state: u,
                setOptions: function(_) {
                    var k = typeof _ == "function" ? _(u.options) : _;
                    g(), u.options = Object.assign({}, r, u.options, k), u.scrollParents = {
                        reference: Ae(i) ? Xe(i) : i.contextElement ? Xe(i.contextElement) : [],
                        popper: Xe(d)
                    };
                    var S = co(fo([].concat(o, u.options.modifiers)));
                    return u.orderedModifiers = S.filter(function(D) {
                        return D.enabled
                    }), h(), p.update()
                },
                forceUpdate: function() {
                    if (!v) {
                        var _ = u.elements,
                            k = _.reference,
                            S = _.popper;
                        if (ys(k, S)) {
                            u.rects = {
                                reference: Gn(k, at(S), u.options.strategy === "fixed"),
                                popper: Wt(S)
                            }, u.reset = !1, u.placement = u.options.placement, u.orderedModifiers.forEach(function(N) {
                                return u.modifiersData[N.name] = Object.assign({}, N.data)
                            });
                            for (var D = 0; D < u.orderedModifiers.length; D++) {
                                if (u.reset === !0) {
                                    u.reset = !1, D = -1;
                                    continue
                                }
                                var A = u.orderedModifiers[D],
                                    B = A.fn,
                                    x = A.options,
                                    j = x === void 0 ? {} : x,
                                    P = A.name;
                                typeof B == "function" && (u = B({
                                    state: u,
                                    options: j,
                                    name: P,
                                    instance: p
                                }) || u)
                            }
                        }
                    }
                },
                update: vo(function() {
                    return new Promise(function($) {
                        p.forceUpdate(), $(u)
                    })
                }),
                destroy: function() {
                    g(), v = !0
                }
            };
        if (!ys(i, d)) return p;
        p.setOptions(m).then(function($) {
            !v && m.onFirstUpdate && m.onFirstUpdate($)
        });

        function h() {
            u.orderedModifiers.forEach(function($) {
                var _ = $.name,
                    k = $.options,
                    S = k === void 0 ? {} : k,
                    D = $.effect;
                if (typeof D == "function") {
                    var A = D({
                            state: u,
                            name: _,
                            instance: p,
                            options: S
                        }),
                        B = function() {};
                    f.push(A || B)
                }
            })
        }

        function g() {
            f.forEach(function($) {
                return $()
            }), f = []
        }
        return p
    }
}
var dt = {
    passive: !0
};

function _o(e) {
    var t = e.state,
        s = e.instance,
        o = e.options,
        a = o.scroll,
        r = a === void 0 ? !0 : a,
        l = o.resize,
        i = l === void 0 ? !0 : l,
        d = te(t.elements.popper),
        m = [].concat(t.scrollParents.reference, t.scrollParents.popper);
    return r && m.forEach(function(u) {
            u.addEventListener("scroll", s.update, dt)
        }), i && d.addEventListener("resize", s.update, dt),
        function() {
            r && m.forEach(function(u) {
                u.removeEventListener("scroll", s.update, dt)
            }), i && d.removeEventListener("resize", s.update, dt)
        }
}
const Qs = {
    name: "eventListeners",
    enabled: !0,
    phase: "write",
    fn: function() {},
    effect: _o,
    data: {}
};

function wo(e) {
    var t = e.state,
        s = e.name;
    t.modifiersData[s] = Gs({
        reference: t.rects.reference,
        element: t.rects.popper,
        strategy: "absolute",
        placement: t.placement
    })
}
const $o = {
    name: "popperOffsets",
    enabled: !0,
    phase: "read",
    fn: wo,
    data: {}
};
var ko = {
    top: "auto",
    right: "auto",
    bottom: "auto",
    left: "auto"
};

function Io(e, t) {
    var s = e.x,
        o = e.y,
        a = t.devicePixelRatio || 1;
    return {
        x: je(s * a) / a || 0,
        y: je(o * a) / a || 0
    }
}

function _s(e) {
    var t, s = e.popper,
        o = e.popperRect,
        a = e.placement,
        r = e.variation,
        l = e.offsets,
        i = e.position,
        d = e.gpuAcceleration,
        m = e.adaptive,
        u = e.roundOffsets,
        f = e.isFixed,
        v = l.x,
        p = v === void 0 ? 0 : v,
        h = l.y,
        g = h === void 0 ? 0 : h,
        $ = typeof u == "function" ? u({
            x: p,
            y: g
        }) : {
            x: p,
            y: g
        };
    p = $.x, g = $.y;
    var _ = l.hasOwnProperty("x"),
        k = l.hasOwnProperty("y"),
        S = ee,
        D = Z,
        A = window;
    if (m) {
        var B = at(s),
            x = "clientHeight",
            j = "clientWidth";
        if (B === te(s) && (B = _e(s), me(B).position !== "static" && i === "absolute" && (x = "scrollHeight", j = "scrollWidth")), B = B, a === Z || (a === ee || a === ie) && r === Ze) {
            D = oe;
            var P = f && B === A && A.visualViewport ? A.visualViewport.height : B[x];
            g -= P - o.height, g *= d ? 1 : -1
        }
        if (a === ee || (a === Z || a === oe) && r === Ze) {
            S = ie;
            var N = f && B === A && A.visualViewport ? A.visualViewport.width : B[j];
            p -= N - o.width, p *= d ? 1 : -1
        }
    }
    var I = Object.assign({
            position: i
        }, m && ko),
        C = u === !0 ? Io({
            x: p,
            y: g
        }, te(s)) : {
            x: p,
            y: g
        };
    if (p = C.x, g = C.y, d) {
        var V;
        return Object.assign({}, I, (V = {}, V[D] = k ? "0" : "", V[S] = _ ? "0" : "", V.transform = (A.devicePixelRatio || 1) <= 1 ? "translate(" + p + "px, " + g + "px)" : "translate3d(" + p + "px, " + g + "px, 0)", V))
    }
    return Object.assign({}, I, (t = {}, t[D] = k ? g + "px" : "", t[S] = _ ? p + "px" : "", t.transform = "", t))
}

function Co(e) {
    var t = e.state,
        s = e.options,
        o = s.gpuAcceleration,
        a = o === void 0 ? !0 : o,
        r = s.adaptive,
        l = r === void 0 ? !0 : r,
        i = s.roundOffsets,
        d = i === void 0 ? !0 : i,
        m = {
            placement: ue(t.placement),
            variation: Ve(t.placement),
            popper: t.elements.popper,
            popperRect: t.rects.popper,
            gpuAcceleration: a,
            isFixed: t.options.strategy === "fixed"
        };
    t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, _s(Object.assign({}, m, {
        offsets: t.modifiersData.popperOffsets,
        position: t.options.strategy,
        adaptive: l,
        roundOffsets: d
    })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, _s(Object.assign({}, m, {
        offsets: t.modifiersData.arrow,
        position: "absolute",
        adaptive: !1,
        roundOffsets: d
    })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
        "data-popper-placement": t.placement
    })
}
const Zs = {
    name: "computeStyles",
    enabled: !0,
    phase: "beforeWrite",
    fn: Co,
    data: {}
};

function So(e) {
    var t = e.state;
    Object.keys(t.elements).forEach(function(s) {
        var o = t.styles[s] || {},
            a = t.attributes[s] || {},
            r = t.elements[s];
        !ne(r) || !de(r) || (Object.assign(r.style, o), Object.keys(a).forEach(function(l) {
            var i = a[l];
            i === !1 ? r.removeAttribute(l) : r.setAttribute(l, i === !0 ? "" : i)
        }))
    })
}

function Do(e) {
    var t = e.state,
        s = {
            popper: {
                position: t.options.strategy,
                left: "0",
                top: "0",
                margin: "0"
            },
            arrow: {
                position: "absolute"
            },
            reference: {}
        };
    return Object.assign(t.elements.popper.style, s.popper), t.styles = s, t.elements.arrow && Object.assign(t.elements.arrow.style, s.arrow),
        function() {
            Object.keys(t.elements).forEach(function(o) {
                var a = t.elements[o],
                    r = t.attributes[o] || {},
                    l = Object.keys(t.styles.hasOwnProperty(o) ? t.styles[o] : s[o]),
                    i = l.reduce(function(d, m) {
                        return d[m] = "", d
                    }, {});
                !ne(a) || !de(a) || (Object.assign(a.style, i), Object.keys(r).forEach(function(d) {
                    a.removeAttribute(d)
                }))
            })
        }
}
const Oo = {
    name: "applyStyles",
    enabled: !0,
    phase: "write",
    fn: So,
    effect: Do,
    requires: ["computeStyles"]
};
var Ao = [Qs, $o, Zs, Oo],
    Bo = {
        left: "right",
        right: "left",
        bottom: "top",
        top: "bottom"
    };

function ct(e) {
    return e.replace(/left|right|bottom|top/g, function(t) {
        return Bo[t]
    })
}
var Lo = {
    start: "end",
    end: "start"
};

function ws(e) {
    return e.replace(/start|end/g, function(t) {
        return Lo[t]
    })
}

function Mo(e, t) {
    t === void 0 && (t = {});
    var s = t,
        o = s.placement,
        a = s.boundary,
        r = s.rootBoundary,
        l = s.padding,
        i = s.flipVariations,
        d = s.allowedAutoPlacements,
        m = d === void 0 ? Ws : d,
        u = Ve(o),
        f = u ? i ? gs : gs.filter(function(h) {
            return Ve(h) === u
        }) : nt,
        v = f.filter(function(h) {
            return m.indexOf(h) >= 0
        });
    v.length === 0 && (v = f);
    var p = v.reduce(function(h, g) {
        return h[g] = Kt(e, {
            placement: g,
            boundary: a,
            rootBoundary: r,
            padding: l
        })[ue(g)], h
    }, {});
    return Object.keys(p).sort(function(h, g) {
        return p[h] - p[g]
    })
}

function xo(e) {
    if (ue(e) === qt) return [];
    var t = ct(e);
    return [ws(e), t, ws(t)]
}

function To(e) {
    var t = e.state,
        s = e.options,
        o = e.name;
    if (!t.modifiersData[o]._skip) {
        for (var a = s.mainAxis, r = a === void 0 ? !0 : a, l = s.altAxis, i = l === void 0 ? !0 : l, d = s.fallbackPlacements, m = s.padding, u = s.boundary, f = s.rootBoundary, v = s.altBoundary, p = s.flipVariations, h = p === void 0 ? !0 : p, g = s.allowedAutoPlacements, $ = t.options.placement, _ = ue($), k = _ === $, S = d || (k || !h ? [ct($)] : xo($)), D = [$].concat(S).reduce(function(Ee, ge) {
                return Ee.concat(ue(ge) === qt ? Mo(t, {
                    placement: ge,
                    boundary: u,
                    rootBoundary: f,
                    padding: m,
                    flipVariations: h,
                    allowedAutoPlacements: g
                }) : ge)
            }, []), A = t.rects.reference, B = t.rects.popper, x = new Map, j = !0, P = D[0], N = 0; N < D.length; N++) {
            var I = D[N],
                C = ue(I),
                V = Ve(I) === Ne,
                z = [Z, oe].indexOf(C) >= 0,
                U = z ? "width" : "height",
                W = Kt(t, {
                    placement: I,
                    boundary: u,
                    rootBoundary: f,
                    altBoundary: v,
                    padding: m
                }),
                J = z ? V ? ie : ee : V ? oe : Z;
            A[U] > B[U] && (J = ct(J));
            var Te = ct(J),
                fe = [];
            if (r && fe.push(W[C] <= 0), i && fe.push(W[J] <= 0, W[Te] <= 0), fe.every(function(Ee) {
                    return Ee
                })) {
                P = I, j = !1;
                break
            }
            x.set(I, fe)
        }
        if (j)
            for (var F = h ? 3 : 1, $t = function(ge) {
                    var We = D.find(function(it) {
                        var we = x.get(it);
                        if (we) return we.slice(0, ge).every(function(kt) {
                            return kt
                        })
                    });
                    if (We) return P = We, "break"
                }, Ue = F; Ue > 0; Ue--) {
                var ot = $t(Ue);
                if (ot === "break") break
            }
        t.placement !== P && (t.modifiersData[o]._skip = !0, t.placement = P, t.reset = !0)
    }
}
const Eo = {
    name: "flip",
    enabled: !0,
    phase: "main",
    fn: To,
    requiresIfExists: ["offset"],
    data: {
        _skip: !1
    }
};

function zo(e, t, s) {
    var o = ue(e),
        a = [ee, Z].indexOf(o) >= 0 ? -1 : 1,
        r = typeof s == "function" ? s(Object.assign({}, t, {
            placement: e
        })) : s,
        l = r[0],
        i = r[1];
    return l = l || 0, i = (i || 0) * a, [ee, ie].indexOf(o) >= 0 ? {
        x: i,
        y: l
    } : {
        x: l,
        y: i
    }
}

function Ro(e) {
    var t = e.state,
        s = e.options,
        o = e.name,
        a = s.offset,
        r = a === void 0 ? [0, 0] : a,
        l = Ws.reduce(function(u, f) {
            return u[f] = zo(f, t.rects, r), u
        }, {}),
        i = l[t.placement],
        d = i.x,
        m = i.y;
    t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += d, t.modifiersData.popperOffsets.y += m), t.modifiersData[o] = l
}
const jo = {
    name: "offset",
    enabled: !0,
    phase: "main",
    requires: ["popperOffsets"],
    fn: Ro
};

function Po(e) {
    return e === "x" ? "y" : "x"
}

function Je(e, t, s) {
    return De(e, pt(t, s))
}

function No(e, t, s) {
    var o = Je(e, t, s);
    return o > s ? s : o
}

function Vo(e) {
    var t = e.state,
        s = e.options,
        o = e.name,
        a = s.mainAxis,
        r = a === void 0 ? !0 : a,
        l = s.altAxis,
        i = l === void 0 ? !1 : l,
        d = s.boundary,
        m = s.rootBoundary,
        u = s.altBoundary,
        f = s.padding,
        v = s.tether,
        p = v === void 0 ? !0 : v,
        h = s.tetherOffset,
        g = h === void 0 ? 0 : h,
        $ = Kt(t, {
            boundary: d,
            rootBoundary: m,
            padding: f,
            altBoundary: u
        }),
        _ = ue(t.placement),
        k = Ve(t.placement),
        S = !k,
        D = Gt(_),
        A = Po(D),
        B = t.modifiersData.popperOffsets,
        x = t.rects.reference,
        j = t.rects.popper,
        P = typeof g == "function" ? g(Object.assign({}, t.rects, {
            placement: t.placement
        })) : g,
        N = typeof P == "number" ? {
            mainAxis: P,
            altAxis: P
        } : Object.assign({
            mainAxis: 0,
            altAxis: 0
        }, P),
        I = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
        C = {
            x: 0,
            y: 0
        };
    if (B) {
        if (r) {
            var V, z = D === "y" ? Z : ee,
                U = D === "y" ? oe : ie,
                W = D === "y" ? "height" : "width",
                J = B[D],
                Te = J + $[z],
                fe = J - $[U],
                F = p ? -j[W] / 2 : 0,
                $t = k === Ne ? x[W] : j[W],
                Ue = k === Ne ? -j[W] : -x[W],
                ot = t.elements.arrow,
                Ee = p && ot ? Wt(ot) : {
                    width: 0,
                    height: 0
                },
                ge = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : Ks(),
                We = ge[z],
                it = ge[U],
                we = Je(0, x[W], Ee[W]),
                kt = S ? x[W] / 2 - F - we - We - N.mainAxis : $t - we - We - N.mainAxis,
                na = S ? -x[W] / 2 + F + we + it + N.mainAxis : Ue + we + it + N.mainAxis,
                It = t.elements.arrow && at(t.elements.arrow),
                oa = It ? D === "y" ? It.clientTop || 0 : It.clientLeft || 0 : 0,
                Jt = (V = I == null ? void 0 : I[D]) != null ? V : 0,
                ia = J + kt - Jt - oa,
                ra = J + na - Jt,
                Qt = Je(p ? pt(Te, ia) : Te, J, p ? De(fe, ra) : fe);
            B[D] = Qt, C[D] = Qt - J
        }
        if (i) {
            var Zt, la = D === "x" ? Z : ee,
                ua = D === "x" ? oe : ie,
                $e = B[A],
                rt = A === "y" ? "height" : "width",
                es = $e + $[la],
                ts = $e - $[ua],
                Ct = [Z, ee].indexOf(_) !== -1,
                ss = (Zt = I == null ? void 0 : I[A]) != null ? Zt : 0,
                as = Ct ? es : $e - x[rt] - j[rt] - ss + N.altAxis,
                ns = Ct ? $e + x[rt] + j[rt] - ss - N.altAxis : ts,
                os = p && Ct ? No(as, $e, ns) : Je(p ? as : es, $e, p ? ns : ts);
            B[A] = os, C[A] = os - $e
        }
        t.modifiersData[o] = C
    }
}
const Fo = {
    name: "preventOverflow",
    enabled: !0,
    phase: "main",
    fn: Vo,
    requiresIfExists: ["offset"]
};
var Yo = function(t, s) {
    return t = typeof t == "function" ? t(Object.assign({}, s.rects, {
        placement: s.placement
    })) : t, Xs(typeof t != "number" ? t : Js(t, nt))
};

function Ho(e) {
    var t, s = e.state,
        o = e.name,
        a = e.options,
        r = s.elements.arrow,
        l = s.modifiersData.popperOffsets,
        i = ue(s.placement),
        d = Gt(i),
        m = [ee, ie].indexOf(i) >= 0,
        u = m ? "height" : "width";
    if (!(!r || !l)) {
        var f = Yo(a.padding, s),
            v = Wt(r),
            p = d === "y" ? Z : ee,
            h = d === "y" ? oe : ie,
            g = s.rects.reference[u] + s.rects.reference[d] - l[d] - s.rects.popper[u],
            $ = l[d] - s.rects.reference[d],
            _ = at(r),
            k = _ ? d === "y" ? _.clientHeight || 0 : _.clientWidth || 0 : 0,
            S = g / 2 - $ / 2,
            D = f[p],
            A = k - v[u] - f[h],
            B = k / 2 - v[u] / 2 + S,
            x = Je(D, B, A),
            j = d;
        s.modifiersData[o] = (t = {}, t[j] = x, t.centerOffset = x - B, t)
    }
}

function Uo(e) {
    var t = e.state,
        s = e.options,
        o = s.element,
        a = o === void 0 ? "[data-popper-arrow]" : o;
    a != null && (typeof a == "string" && (a = t.elements.popper.querySelector(a), !a) || qs(t.elements.popper, a) && (t.elements.arrow = a))
}
const Wo = {
        name: "arrow",
        enabled: !0,
        phase: "main",
        fn: Ho,
        effect: Uo,
        requires: ["popperOffsets"],
        requiresIfExists: ["preventOverflow"]
    },
    qo = yo({
        defaultModifiers: [...Ao, jo, Eo, Fo, Zs, Qs, Wo]
    });

function Go({
    locked: e = !1,
    overflowPadding: t = 8,
    offsetDistance: s = 8,
    offsetSkid: o = 0,
    gpuAcceleration: a = !0,
    adaptive: r = !0,
    scroll: l = !0,
    resize: i = !0,
    arrow: d = !1,
    placement: m,
    strategy: u
}, f) {
    const v = M(null),
        p = M(null),
        h = M(null);
    return Be(() => {
        Fe(g => {
            if (!p.value || !v.value && !(f != null && f.value)) return;
            const $ = us(p),
                _ = (f == null ? void 0 : f.value) || us(v);
            if (!($ instanceof HTMLElement) || !_) return;
            const k = {
                modifiers: [{
                    name: "flip",
                    enabled: !e
                }, {
                    name: "preventOverflow",
                    options: {
                        padding: t
                    }
                }, {
                    name: "offset",
                    options: {
                        offset: [o, s]
                    }
                }, {
                    name: "computeStyles",
                    options: {
                        adaptive: r,
                        gpuAcceleration: a
                    }
                }, {
                    name: "eventListeners",
                    options: {
                        scroll: l,
                        resize: i
                    }
                }, {
                    name: "arrow",
                    enabled: d
                }]
            };
            m && (k.placement = m), u && (k.strategy = u), h.value = qo(_, $, k), g(h.value.destroy)
        })
    }), [v, p, h]
}
const Ot = et(K.ui.strategy, K.ui.dropdown, za),
    Ko = re({
        components: {
            HMenu: Cn,
            HMenuButton: Sn,
            HMenuItems: Dn,
            HMenuItem: On,
            UIcon: Le,
            UAvatar: ks,
            UKbd: Fs
        },
        inheritAttrs: !1,
        props: {
            items: {
                type: Array,
                default: () => []
            },
            mode: {
                type: String,
                default: "click",
                validator: e => ["click", "hover"].includes(e)
            },
            open: {
                type: Boolean,
                default: void 0
            },
            disabled: {
                type: Boolean,
                default: !1
            },
            popper: {
                type: Object,
                default: () => ({})
            },
            openDelay: {
                type: Number,
                default: () => Ot.default.openDelay
            },
            closeDelay: {
                type: Number,
                default: () => Ot.default.closeDelay
            },
            class: {
                type: [String, Object, Array],
                    default: () => ""
            },
            ui: {
                type: Object,
                default: () => ({})
            }
        },
        emits: ["update:open"],
        setup(e, {
            emit: t
        }) {
            const {
                ui: s,
                attrs: o
            } = st("dropdown", Oe(e, "ui"), Ot, Oe(e, "class")), a = O(() => Is(e.mode === "hover" ? {
                offsetDistance: 0
            } : {}, e.popper, s.value.popper)), [r, l] = Go(a.value), i = M(null);
            let d = null,
                m = null;
            Be(() => {
                var k, S;
                const $ = (k = r.value) == null ? void 0 : k.$.provides;
                if (!$) return;
                const _ = Object.getOwnPropertySymbols($);
                i.value = _.length && $[_[0]], e.open && ((S = i.value) == null || S.openMenu())
            });
            const u = O(() => {
                var S, D, A;
                if (e.mode !== "hover") return {};
                const $ = ((S = e.popper) == null ? void 0 : S.offsetDistance) || ((D = s.value.popper) == null ? void 0 : D.offsetDistance) || 8,
                    _ = (A = a.value.placement) == null ? void 0 : A.split("-")[0],
                    k = `${$}px`;
                return _ === "top" || _ === "bottom" ? {
                    paddingTop: k,
                    paddingBottom: k
                } : _ === "left" || _ === "right" ? {
                    paddingLeft: k,
                    paddingRight: k
                } : {
                    paddingTop: k,
                    paddingBottom: k,
                    paddingLeft: k,
                    paddingRight: k
                }
            });

            function f($) {
                !$.cancelable || !i.value || (i.value.menuState === 0 ? i.value.closeMenu() : i.value.openMenu())
            }

            function v() {
                e.mode !== "hover" || !i.value || (m && (clearTimeout(m), m = null), i.value.menuState !== 0 && (d = d || setTimeout(() => {
                    i.value.openMenu && i.value.openMenu(), d = null
                }, e.openDelay)))
            }

            function p() {
                e.mode !== "hover" || !i.value || (d && (clearTimeout(d), d = null), i.value.menuState !== 1 && (m = m || setTimeout(() => {
                    i.value.closeMenu && i.value.closeMenu(), m = null
                }, e.closeDelay)))
            }

            function h($, _, {
                href: k,
                navigate: S,
                close: D,
                isExternal: A
            }) {
                _.click && _.click($), k && !A && (S($), D())
            }
            vt(() => e.open, ($, _) => {
                i.value && (_ === void 0 || $ === _ || ($ ? i.value.openMenu() : i.value.closeMenu()))
            }), vt(() => {
                var $;
                return ($ = i.value) == null ? void 0 : $.menuState
            }, ($, _) => {
                _ === void 0 || $ === _ || t("update:open", $ === 0)
            });
            const g = Ds;
            return Ls(() => As("$ctlRmIk4j0")), {
                ui: s,
                attrs: o,
                popper: a,
                trigger: r,
                container: l,
                containerStyle: u,
                onTouchStart: f,
                onMouseEnter: v,
                onMouseLeave: p,
                onClick: h,
                getNuxtLinkProps: Oa,
                twMerge: ze,
                twJoin: G,
                NuxtLink: g
            }
        }
    }),
    Xo = ["disabled"];

function Jo(e, t, s, o, a, r) {
    const l = Ge("HMenuButton"),
        i = Le,
        d = ks,
        m = Fs,
        u = Ge("HMenuItem"),
        f = Ds,
        v = Ge("HMenuItems"),
        p = Ge("HMenu");
    return y(), se(p, he({
        as: "div",
        class: e.ui.wrapper
    }, e.attrs, {
        onMouseleave: e.onMouseLeave
    }), {
        default: q(({
            open: h
        }) => [L(l, {
            ref: "trigger",
            as: "div",
            disabled: e.disabled,
            class: R(e.ui.trigger),
            role: "button",
            onMouseenter: e.onMouseEnter,
            onTouchstartPassive: e.onTouchStart
        }, {
            default: q(() => [Se(e.$slots, "default", {
                open: h,
                disabled: e.disabled
            }, () => [n("button", {
                disabled: e.disabled
            }, " Open ", 8, Xo)])]),
            _: 2
        }, 1032, ["disabled", "class", "onMouseenter", "onTouchstartPassive"]), h && e.items.length ? (y(), w("div", {
            key: 0,
            ref: "container",
            class: R([e.ui.container, e.ui.width]),
            style: Re(e.containerStyle),
            onMouseenter: t[0] || (t[0] = (...g) => e.onMouseEnter && e.onMouseEnter(...g))
        }, [L(Cs, he({
            appear: ""
        }, e.ui.transition), {
            default: q(() => [n("div", null, [e.popper.arrow ? (y(), w("div", {
                key: 0,
                "data-popper-arrow": "",
                class: R(Object.values(e.ui.arrow))
            }, null, 2)) : E("", !0), L(v, {
                class: R([e.ui.base, e.ui.divide, e.ui.ring, e.ui.rounded, e.ui.shadow, e.ui.background, e.ui.height]),
                static: ""
            }, {
                default: q(() => [(y(!0), w(ae, null, ye(e.items, (g, $) => (y(), w("div", {
                    key: $,
                    class: R(e.ui.padding)
                }, [(y(!0), w(ae, null, ye(g, (_, k) => (y(), se(f, he({
                    key: k
                }, e.getNuxtLinkProps(_), {
                    custom: ""
                }), {
                    default: q(({
                        href: S,
                        target: D,
                        rel: A,
                        navigate: B,
                        isExternal: x,
                        isActive: j
                    }) => [L(u, {
                        disabled: _.disabled
                    }, {
                        default: q(({
                            active: P,
                            disabled: N,
                            close: I
                        }) => [(y(), se(ga(S ? "a" : "button"), {
                            href: N ? void 0 : S,
                            rel: A,
                            target: D,
                            class: R(e.twMerge(e.twJoin(e.ui.item.base, e.ui.item.padding, e.ui.item.size, e.ui.item.rounded, P || j ? e.ui.item.active : e.ui.item.inactive, N && e.ui.item.disabled), _.class)),
                            onClick: C => e.onClick(C, _, {
                                href: S,
                                navigate: B,
                                close: I,
                                isExternal: x
                            })
                        }, {
                            default: q(() => [Se(e.$slots, _.slot || "item", {
                                item: _
                            }, () => {
                                var C;
                                return [_.icon ? (y(), se(i, {
                                    key: 0,
                                    name: _.icon,
                                    class: R(e.twMerge(e.twJoin(e.ui.item.icon.base, P || j ? e.ui.item.icon.active : e.ui.item.icon.inactive), _.iconClass))
                                }, null, 8, ["name", "class"])) : _.avatar ? (y(), se(d, he({
                                    key: 1
                                }, {
                                    size: e.ui.item.avatar.size,
                                    ..._.avatar
                                }, {
                                    class: e.ui.item.avatar.base
                                }), null, 16, ["class"])) : E("", !0), n("span", {
                                    class: R(e.twMerge(e.ui.item.label, _.labelClass))
                                }, c(_.label), 3), (C = _.shortcuts) != null && C.length ? (y(), w("span", {
                                    key: 2,
                                    class: R(e.ui.item.shortcuts)
                                }, [(y(!0), w(ae, null, ye(_.shortcuts, V => (y(), se(m, {
                                    key: V
                                }, {
                                    default: q(() => [Ke(c(V), 1)]),
                                    _: 2
                                }, 1024))), 128))], 2)) : E("", !0)]
                            })]),
                            _: 2
                        }, 1032, ["href", "rel", "target", "class", "onClick"]))]),
                        _: 2
                    }, 1032, ["disabled"])]),
                    _: 2
                }, 1040))), 128))], 2))), 128))]),
                _: 3
            }, 8, ["class"])])]),
            _: 3
        }, 16)], 38)) : E("", !0)]),
        _: 3
    }, 16, ["class", "onMouseleave"])
}
const Qo = X(Ko, [
        ["render", Jo]
    ]),
    Zo = {
        name: "Bethistorybac",
        data() {
            return {
                dialog: !1,
                data: [],
                banker: 1,
                player: 1,
                tie: 8,
                playerPair: 11,
                bankerPair: 11,
                small: 1.5,
                big: .5,
                playerNatural: 3.5,
                bankerNatural: 3.5,
                super6: 12
            }
        },
        methods: {
            toggle(e) {
                this.dialog = !this.dialog, this.data = e
            },
            genOdd(e, t) {
                let s;
                return e === "banker" ? t === "4Point" ? s = "0.96" : t === "Baccarat" ? s = "0.95" : t === "Super6" ? s = "1" : s = "1~9" : s = this[e], t === "CowCow" && e === "player" && (s = "1~9"), s
            }
        }
    },
    _t = e => (ce("data-v-4668e7af"), e = e(), ve(), e),
    ei = {
        key: 0,
        class: "bg-bethistory"
    },
    ti = _t(() => n("img", {
        src: Ye
    }, null, -1)),
    si = [ti],
    ai = {
        class: "flexible"
    },
    ni = _t(() => n("div", {
        class: "img"
    }, [n("img", {
        src: Me
    })], -1)),
    oi = {
        class: "text"
    },
    ii = {
        class: "detail-zone"
    },
    ri = {
        class: "set"
    },
    li = {
        class: "head"
    },
    ui = {
        class: "val"
    },
    di = {
        class: "set"
    },
    ci = {
        class: "head"
    },
    vi = {
        class: "val"
    },
    fi = {
        class: "set"
    },
    pi = {
        class: "head"
    },
    mi = {
        class: "val"
    },
    gi = {
        class: "set"
    },
    hi = {
        class: "head"
    },
    bi = {
        class: "val"
    },
    yi = {
        class: "set"
    },
    _i = {
        class: "head"
    },
    wi = {
        class: "val"
    },
    $i = {
        class: "set"
    },
    ki = {
        class: "head"
    },
    Ii = {
        key: 0,
        style: {
            color: "green"
        },
        class: "val"
    },
    Ci = {
        key: 1,
        class: "text",
        style: {
            color: "white"
        }
    },
    Si = {
        key: 2,
        style: {
            color: "red"
        },
        class: "val"
    },
    Di = {
        class: "showres-dialog"
    },
    Oi = _t(() => n("div", {
        class: "text"
    }, " P ", -1)),
    Ai = {
        class: "flex flex-wrap align-center",
        style: {
            gap: "6px"
        }
    },
    Bi = {
        class: "card"
    },
    Li = ["src"],
    Mi = {
        class: "card"
    },
    xi = ["src"],
    Ti = {
        class: "card3"
    },
    Ei = ["src"],
    zi = {
        class: "point-text"
    },
    Ri = _t(() => n("div", {
        class: "text"
    }, " B ", -1)),
    ji = {
        class: "flex flex-wrap align-center",
        style: {
            gap: "6px"
        }
    },
    Pi = {
        class: "card"
    },
    Ni = ["src"],
    Vi = {
        class: "card"
    },
    Fi = ["src"],
    Yi = {
        class: "card3B"
    },
    Hi = ["src"],
    Ui = {
        class: "point-text"
    },
    Wi = {
        class: "result"
    },
    qi = {
        key: 0,
        class: "player"
    },
    Gi = {
        key: 1,
        class: "banker"
    },
    Ki = {
        key: 2,
        class: "tie"
    },
    Xi = {
        class: "item-area"
    },
    Ji = {
        class: "group"
    },
    Qi = {
        class: "head"
    },
    Zi = {
        class: "val"
    },
    er = {
        class: "group"
    },
    tr = {
        class: "head"
    },
    sr = {
        class: "val"
    },
    ar = {
        class: "group"
    },
    nr = {
        class: "head"
    },
    or = {
        class: "val"
    },
    ir = {
        class: "group"
    },
    rr = {
        class: "head"
    },
    lr = {
        class: "val"
    },
    ur = {
        class: "group"
    },
    dr = {
        class: "head"
    },
    cr = {
        class: "val"
    },
    vr = {
        class: "group"
    },
    fr = {
        class: "head"
    },
    pr = {
        key: 0,
        class: "val",
        style: {
            color: "green"
        }
    },
    mr = {
        key: 1,
        class: "text",
        style: {
            color: "white"
        }
    },
    gr = {
        key: 2,
        class: "val",
        style: {
            color: "red"
        }
    };

function hr(e, t, s, o, a, r) {
    const l = mt;
    return a.dialog ? (y(), w("div", ei, [n("div", {
        class: "close",
        onClick: t[0] || (t[0] = (...i) => r.toggle && r.toggle(...i))
    }, si), n("div", ai, [n("div", {
        class: "topside",
        onClick: t[1] || (t[1] = (...i) => r.toggle && r.toggle(...i))
    }, [ni, n("div", oi, c(e.$t("betdetail")), 1)]), n("div", null, [n("div", ii, [n("div", ri, [n("div", li, c(e.$t("id")), 1), n("div", ui, c(a.data.tableId), 1)]), n("div", di, [n("div", ci, c(e.$t("datetime")), 1), n("div", vi, c(e.$dayjs(a.data.date).format("DD/MM/YYYY HH:mm:ss")), 1)]), n("div", fi, [n("div", pi, c(e.$t("gameid")), 1), n("div", mi, c(a.data._id), 1)]), n("div", gi, [n("div", hi, c(e.$t("round")), 1), n("div", bi, c(a.data.round), 1)]), L(l), n("div", yi, [n("div", _i, c(e.$t("totalbet")), 1), n("div", wi, c(("useCur" in e ? e.useCur : b(T))(Math.abs(a.data.totalBet))), 1)]), n("div", $i, [n("div", ki, c(e.$t("totalwin/lose")), 1), a.data.winLose > 0 ? (y(), w("div", Ii, c(("useCur" in e ? e.useCur : b(T))(a.data.winLose)), 1)) : a.data.winLose === 0 ? (y(), w("div", Ci, c(("useCur" in e ? e.useCur : b(T))(a.data.winLose)), 1)) : (y(), w("div", Si, c(("useCur" in e ? e.useCur : b(T))(a.data.winLose)), 1))])]), n("div", Di, [n("div", {
        class: R(["player-card-zone", a.data.result.winBc[0] === "player" || a.data.result.winBc[0] === "tie" ? "won" : ""])
    }, [Oi, n("div", Ai, [n("div", Bi, [n("img", {
        src: `/card/2/${a.data.result.rsBc.player_1}.png`
    }, null, 8, Li)]), n("div", Mi, [n("img", {
        src: `/card/2/${a.data.result.rsBc.player_2}.png`
    }, null, 8, xi)]), n("div", Ti, [n("img", {
        style: {
            width: "25px",
            height: "33px",
            "margin-left": "5px"
        },
        src: `/card/2/${a.data.result.rsBc.player_3||"Red"}.png`
    }, null, 8, Ei)]), n("div", zi, c(a.data.result.rsBc.player123), 1)])], 2), n("div", {
        class: R(["banker-card-zone", a.data.result.winBc[0] === "banker" || a.data.result.winBc[0] === "tie" ? "won" : ""])
    }, [Ri, n("div", ji, [n("div", Pi, [n("img", {
        src: `/card/2/${a.data.result.rsBc.banker_1}.png`
    }, null, 8, Ni)]), n("div", Vi, [n("img", {
        src: `/card/2/${a.data.result.rsBc.banker_2}.png`
    }, null, 8, Fi)]), n("div", Yi, [n("img", {
        style: {
            width: "25px",
            height: "33px",
            "margin-left": "5px"
        },
        src: `/card/2/${a.data.result.rsBc.banker_3||"Red"}.png`
    }, null, 8, Hi)]), n("div", Ui, c(a.data.result.rsBc.banker123), 1)])], 2)]), n("div", Wi, [a.data.result.winBc[0] === "player" ? (y(), w("div", qi, c(e.$t("playerwin")), 1)) : a.data.result.winBc[0] === "banker" ? (y(), w("div", Gi, c(e.$t("bankerwin")), 1)) : (y(), w("div", Ki, c(e.$t("tiewin")), 1))])]), n("div", Xi, [(y(!0), w(ae, null, ye(a.data.txtList, (i, d) => (y(), w("div", {
        key: d,
        class: "item-type"
    }, [n("div", Ji, [n("div", Qi, c(e.$t("betid")), 1), n("div", Zi, c(i.betId), 1)]), n("div", er, [n("div", tr, c(e.$t("gametype")), 1), n("div", sr, c(e.$t(`bethistory.${i.type}`)), 1)]), n("div", ar, [n("div", nr, c(e.$t("bettype")), 1), n("div", or, c(e.$t(`bethistory.${i.betPosition}`)), 1)]), n("div", ir, [n("div", rr, c(e.$t("odd")), 1), n("div", lr, c(r.genOdd(i.betPosition, i.type)), 1)]), n("div", ur, [n("div", dr, c(e.$t("betamount")), 1), n("div", cr, c(("useCur" in e ? e.useCur : b(T))(Math.abs(i.betAmt))), 1)]), n("div", vr, [n("div", fr, c(e.$t("win/lose")), 1), i.winLose > 0 ? (y(), w("div", pr, c(("useCur" in e ? e.useCur : b(T))(i.winLose)), 1)) : i.winLose === 0 ? (y(), w("div", mr, c(("useCur" in e ? e.useCur : b(T))(i.winLose)), 1)) : (y(), w("div", gr, c(("useCur" in e ? e.useCur : b(T))(i.winLose)), 1))])]))), 128))])])])) : E("", !0)
}
const br = X(Zo, [
        ["render", hr],
        ["__scopeId", "data-v-4668e7af"]
    ]),
    yr = {
        name: "Bethistorystep",
        data() {
            return {
                dialog: !1,
                data: [],
                banker: 1,
                player: 1,
                tie: 8,
                playerPair: 11,
                bankerPair: 11,
                small: 1.5,
                big: .5,
                playerNatural: 3.5,
                bankerNatural: 3.5,
                super6: 12
            }
        },
        methods: {
            toggle(e) {
                this.dialog = !this.dialog, this.data = e
            },
            genOdd(e, t) {
                let s;
                return e === "banker" ? t === "4Point" ? s = "0.96" : t === "Baccarat" ? s = "0.95" : t === "Super6" ? s = "1" : s = "1~9" : s = this[e], t === "CowCow" && e === "player" && (s = "1~9"), s
            }
        }
    },
    Xt = e => (ce("data-v-2c04862c"), e = e(), ve(), e),
    _r = {
        key: 0,
        class: "bg-bethistory"
    },
    wr = Xt(() => n("img", {
        src: Ye
    }, null, -1)),
    $r = [wr],
    kr = {
        class: "flexible"
    },
    Ir = Xt(() => n("div", {
        class: "img"
    }, [n("img", {
        src: Me
    })], -1)),
    Cr = {
        class: "text"
    },
    Sr = {
        class: "detail-zone"
    },
    Dr = {
        class: "set"
    },
    Or = {
        class: "head"
    },
    Ar = {
        class: "val"
    },
    Br = {
        class: "set"
    },
    Lr = {
        class: "head"
    },
    Mr = {
        class: "val"
    },
    xr = {
        class: "set"
    },
    Tr = {
        class: "head"
    },
    Er = {
        class: "val"
    },
    zr = {
        class: "set"
    },
    Rr = {
        class: "head"
    },
    jr = {
        class: "val"
    },
    Pr = {
        class: "set"
    },
    Nr = {
        class: "head"
    },
    Vr = {
        class: "val"
    },
    Fr = {
        class: "set"
    },
    Yr = {
        class: "head"
    },
    Hr = {
        key: 0,
        style: {
            color: "green"
        },
        class: "val"
    },
    Ur = {
        key: 1,
        class: "text",
        style: {
            color: "white"
        }
    },
    Wr = {
        key: 2,
        style: {
            color: "red"
        },
        class: "val"
    },
    qr = {
        class: "item-area"
    },
    Gr = {
        class: "flex justify-between",
        style: {
            width: "100%"
        }
    },
    Kr = {
        class: "headerstep"
    },
    Xr = {
        key: 0,
        class: "resultWin",
        style: {
            "background-color": "#FF515199"
        }
    },
    Jr = {
        key: 1,
        class: "resultWin",
        style: {
            "background-color": "gray"
        }
    },
    Qr = {
        key: 2,
        class: "resultWin",
        style: {
            "background-color": "gray"
        }
    },
    Zr = {
        key: 3,
        class: "resultWin"
    },
    el = {
        class: "detail-group"
    },
    tl = {
        class: "headLabel"
    },
    sl = {
        class: "amtLabel"
    },
    al = {
        class: "detail-group"
    },
    nl = {
        class: "headLabel"
    },
    ol = {
        class: "amtLabel"
    },
    il = {
        class: "detail-group"
    },
    rl = {
        class: "headLabel"
    },
    ll = {
        key: 0,
        class: "amtLabel"
    },
    ul = {
        class: "text-player"
    },
    dl = {
        key: 1,
        class: "amtLabel"
    },
    cl = {
        class: "text-banker"
    },
    vl = {
        class: "detail-group"
    },
    fl = {
        class: "headLabel"
    },
    pl = Xt(() => n("div", {
        class: "amtLabel"
    }, " 1.9 ", -1)),
    ml = {
        class: "card-zone"
    },
    gl = {
        class: "tt"
    },
    hl = {
        class: "pos"
    },
    bl = {
        class: "card-list"
    },
    yl = {
        class: "card3"
    },
    _l = ["src"],
    wl = {
        class: "card"
    },
    $l = ["src"],
    kl = {
        class: "card"
    },
    Il = ["src"],
    Cl = {
        class: "tt"
    },
    Sl = {
        class: "pos"
    },
    Dl = {
        class: "card-list"
    },
    Ol = {
        class: "card"
    },
    Al = ["src"],
    Bl = {
        class: "card"
    },
    Ll = ["src"],
    Ml = {
        class: "card3B"
    },
    xl = ["src"],
    Tl = {
        class: "flex align-center"
    },
    El = {
        key: 0,
        class: "text-player"
    },
    zl = {
        key: 1,
        class: "text-banker"
    },
    Rl = {
        key: 2,
        class: "text-tie"
    };

function jl(e, t, s, o, a, r) {
    const l = mt;
    return a.dialog ? (y(), w("div", _r, [n("div", {
        class: "close",
        onClick: t[0] || (t[0] = (...i) => r.toggle && r.toggle(...i))
    }, $r), n("div", kr, [n("div", {
        class: "topside",
        onClick: t[1] || (t[1] = (...i) => r.toggle && r.toggle(...i))
    }, [Ir, n("div", Cr, c(e.$t("betdetail")), 1)]), n("div", null, [n("div", Sr, [n("div", Dr, [n("div", Or, c(e.$t("game")), 1), n("div", Ar, c(e.$t("parlay")), 1)]), n("div", Br, [n("div", Lr, c(e.$t("datetime")), 1), n("div", Mr, c(e.$dayjs(a.data.date).format("DD/MM/YYYY HH:mm:ss")), 1)]), n("div", xr, [n("div", Tr, c(e.$t("gameid")), 1), n("div", Er, c(a.data._id), 1)]), L(l), n("div", zr, [n("div", Rr, c(e.$t("totalbet")), 1), n("div", jr, c(("useCur" in e ? e.useCur : b(T))(Math.abs(a.data.totalBet))), 1)]), n("div", Pr, [n("div", Nr, c(e.$t("round")), 1), n("div", Vr, c(a.data.stepList.length), 1)]), L(l), n("div", Fr, [n("div", Yr, c(e.$t("totalwin/lose")), 1), a.data.winLose > 0 ? (y(), w("div", Hr, c(("useCur" in e ? e.useCur : b(T))(a.data.winLose)), 1)) : a.data.winLose === 0 ? (y(), w("div", Ur, c(("useCur" in e ? e.useCur : b(T))(a.data.winLose)), 1)) : (y(), w("div", Wr, c(("useCur" in e ? e.useCur : b(T))(a.data.winLose)), 1))])])]), n("div", qr, [(y(!0), w(ae, null, ye(a.data.stepList, (i, d) => (y(), w("div", {
        key: d,
        class: "item-type"
    }, [n("div", Gr, [n("div", Kr, c(e.$t("round")) + " " + c(d + 1), 1), i.betStatus == "Lose" ? (y(), w("div", Xr, c(e.$t("youlost")), 1)) : i.betStatus == "Pending" ? (y(), w("div", Jr, c(e.$t("pending")), 1)) : i.betStatus == "Tie" ? (y(), w("div", Qr, c(e.$t("tie")), 1)) : (y(), w("div", Zr, c(e.$t("youwin")), 1))]), n("div", el, [n("div", tl, c(e.$t("tables")), 1), n("div", sl, c(i.tableId), 1)]), n("div", al, [n("div", nl, c(e.$t("betid")), 1), n("div", ol, c(i.gameId), 1)]), n("div", il, [n("div", rl, c(e.$t("bettype")), 1), i.betPosition === "player" ? (y(), w("div", ll, [n("span", ul, c(e.$t("player")), 1)])) : i.betPosition === "banker" ? (y(), w("div", dl, [n("span", cl, c(e.$t("banker")), 1)])) : E("", !0)]), n("div", vl, [n("div", fl, c(e.$t("odd")), 1), pl]), L(l), n("div", ml, [n("div", {
        class: "player",
        style: Re(i.rsBc.player123 > i.rsBc.banker123 ? "border:1px solid white" : "")
    }, [n("div", gl, c(i.rsBc.player123), 1), n("div", hl, c(e.$t("player")), 1), n("div", bl, [n("div", yl, [n("img", {
        src: `/card/2/${i.rsBc.player_3||"Red"}.png`
    }, null, 8, _l)]), n("div", wl, [n("img", {
        src: `/card/2/${i.rsBc.player_1||"Red"}.png`
    }, null, 8, $l)]), n("div", kl, [n("img", {
        src: `/card/2/${i.rsBc.player_2||"Red"}.png`
    }, null, 8, Il)])])], 4), n("div", {
        class: "banker",
        style: Re(i.rsBc.player123 < i.rsBc.banker123 ? "border:1px solid white" : "")
    }, [n("div", Cl, c(i.rsBc.banker123), 1), n("div", Sl, c(e.$t("banker")), 1), n("div", Dl, [n("div", Ol, [n("img", {
        src: `/card/2/${i.rsBc.banker_1||"Red"}.png`
    }, null, 8, Al)]), n("div", Bl, [n("img", {
        src: `/card/2/${i.rsBc.banker_2||"Red"}.png`
    }, null, 8, Ll)]), n("div", Ml, [n("img", {
        src: `/card/2/${i.rsBc.banker_3||"Red"}.png`
    }, null, 8, xl)])])], 4), n("div", Tl, [i.rsBc.player123 > i.rsBc.banker123 ? (y(), w("div", El, c(e.$t("playerwin")), 1)) : i.rsBc.player123 < i.rsBc.banker123 ? (y(), w("div", zl, c(e.$t("bankerwin")), 1)) : (y(), w("div", Rl, c(e.$t("tiewin")), 1))])])]))), 128))])])])) : E("", !0)
}
const Pl = X(yr, [
        ["render", jl],
        ["__scopeId", "data-v-2c04862c"]
    ]),
    Nl = {
        name: "Bethistorybac",
        data() {
            return {
                dialog: !1,
                data: [],
                banker: 1,
                player: 1,
                tie: 8,
                playerPair: 11,
                bankerPair: 11,
                small: 1.5,
                big: .5,
                playerNatural: 3.5,
                bankerNatural: 3.5,
                super6: 12,
                dragon: 1,
                tiger: 1
            }
        },
        methods: {
            toggle(e) {
                this.dialog = !this.dialog, this.data = e
            },
            genOdd(e, t) {
                let s;
                return e === "banker" ? t === "4Point" ? s = "0.96" : t === "Baccarat" ? s = "0.95" : t === "Super6" ? s = "1" : s = "1~9" : s = this[e], t === "CowCow" && e === "player" && (s = "1~9"), s
            }
        }
    },
    wt = e => (ce("data-v-50bb6ae7"), e = e(), ve(), e),
    Vl = {
        key: 0,
        class: "bg-bethistory"
    },
    Fl = wt(() => n("img", {
        src: Ye
    }, null, -1)),
    Yl = [Fl],
    Hl = {
        class: "flexible"
    },
    Ul = wt(() => n("div", {
        class: "img"
    }, [n("img", {
        src: Me
    })], -1)),
    Wl = {
        class: "text"
    },
    ql = {
        class: "detail-zone"
    },
    Gl = {
        class: "set"
    },
    Kl = {
        class: "head"
    },
    Xl = {
        class: "val"
    },
    Jl = {
        class: "set"
    },
    Ql = {
        class: "head"
    },
    Zl = {
        class: "val"
    },
    eu = {
        class: "set"
    },
    tu = {
        class: "head"
    },
    su = {
        class: "val"
    },
    au = {
        class: "set"
    },
    nu = {
        class: "head"
    },
    ou = {
        class: "val"
    },
    iu = {
        class: "set"
    },
    ru = {
        class: "head"
    },
    lu = {
        class: "val"
    },
    uu = {
        class: "set"
    },
    du = {
        class: "head"
    },
    cu = {
        key: 0,
        style: {
            color: "green"
        },
        class: "val"
    },
    vu = {
        key: 1,
        class: "text",
        style: {
            color: "white"
        }
    },
    fu = {
        key: 2,
        style: {
            color: "red"
        },
        class: "val"
    },
    pu = {
        class: "showres-dialog"
    },
    mu = wt(() => n("div", {
        class: "text"
    }, " D ", -1)),
    gu = {
        class: "flex flex-wrap items-center",
        style: {
            gap: "6px"
        }
    },
    hu = {
        class: "card"
    },
    bu = ["src"],
    yu = {
        class: "point-text"
    },
    _u = wt(() => n("div", {
        class: "text"
    }, " T ", -1)),
    wu = {
        class: "flex flex-wrap items-center",
        style: {
            gap: "6px"
        }
    },
    $u = {
        class: "card"
    },
    ku = ["src"],
    Iu = {
        class: "point-text"
    },
    Cu = {
        class: "result"
    },
    Su = {
        key: 0,
        class: "player"
    },
    Du = {
        key: 1,
        class: "banker"
    },
    Ou = {
        key: 2,
        class: "tie"
    },
    Au = {
        class: "item-area"
    },
    Bu = {
        class: "group"
    },
    Lu = {
        class: "head"
    },
    Mu = {
        class: "val"
    },
    xu = {
        class: "group"
    },
    Tu = {
        class: "head"
    },
    Eu = {
        class: "val"
    },
    zu = {
        class: "group"
    },
    Ru = {
        class: "head"
    },
    ju = {
        class: "val"
    },
    Pu = {
        class: "group"
    },
    Nu = {
        class: "head"
    },
    Vu = {
        class: "val"
    },
    Fu = {
        class: "group"
    },
    Yu = {
        class: "head"
    },
    Hu = {
        class: "val"
    },
    Uu = {
        class: "group"
    },
    Wu = {
        class: "head"
    },
    qu = {
        key: 0,
        class: "val",
        style: {
            color: "green"
        }
    },
    Gu = {
        key: 1,
        class: "text",
        style: {
            color: "white"
        }
    },
    Ku = {
        key: 2,
        class: "val",
        style: {
            color: "red"
        }
    };

function Xu(e, t, s, o, a, r) {
    const l = mt;
    return a.dialog ? (y(), w("div", Vl, [n("div", {
        class: "close",
        onClick: t[0] || (t[0] = (...i) => r.toggle && r.toggle(...i))
    }, Yl), n("div", Hl, [n("div", {
        class: "topside",
        onClick: t[1] || (t[1] = (...i) => r.toggle && r.toggle(...i))
    }, [Ul, n("div", Wl, c(e.$t("betdetail")), 1)]), n("div", null, [n("div", ql, [n("div", Gl, [n("div", Kl, c(e.$t("tables")), 1), n("div", Xl, c(a.data.tableId), 1)]), n("div", Jl, [n("div", Ql, c(e.$t("datetime")), 1), n("div", Zl, c(e.$dayjs(a.data.date).format("DD/MM/YYYY HH:mm:ss")), 1)]), n("div", eu, [n("div", tu, c(e.$t("gameid")), 1), n("div", su, c(a.data._id), 1)]), n("div", au, [n("div", nu, c(e.$t("round")), 1), n("div", ou, c(a.data.round), 1)]), L(l), n("div", iu, [n("div", ru, c(e.$t("totalbet")), 1), n("div", lu, c(("useCur" in e ? e.useCur : b(T))(Math.abs(a.data.totalBet))), 1)]), n("div", uu, [n("div", du, c(e.$t("totalwin/lose")), 1), a.data.winLose > 0 ? (y(), w("div", cu, c(("useCur" in e ? e.useCur : b(T))(a.data.winLose)), 1)) : a.data.winLose === 0 ? (y(), w("div", vu, c(("useCur" in e ? e.useCur : b(T))(a.data.winLose)), 1)) : (y(), w("div", fu, c(("useCur" in e ? e.useCur : b(T))(a.data.winLose)), 1))])]), n("div", pu, [n("div", {
        class: R(["player-card-zone", a.data.result.winDr === "DRAGON" || a.data.result.winDr === "TIE" ? "won" : ""])
    }, [mu, n("div", gu, [n("div", hu, [n("img", {
        src: `/card/2/${a.data.result.rsDr.dragon}.png`
    }, null, 8, bu)]), n("div", yu, c(a.data.result.rsDr.dragon_tt), 1)])], 2), n("div", {
        class: R(["banker-card-zone", a.data.result.winDr === "TIGER" || a.data.result.winDr === "TIE" ? "won" : ""])
    }, [_u, n("div", wu, [n("div", $u, [n("img", {
        src: `/card/2/${a.data.result.rsDr.tiger}.png`
    }, null, 8, ku)]), n("div", Iu, c(a.data.result.rsDr.tiger_tt), 1)])], 2)]), n("div", Cu, [a.data.result.winDr === "TIGER" ? (y(), w("div", Su, c(e.$t("tigerwin")), 1)) : a.data.result.winDr === "DRAGON" ? (y(), w("div", Du, c(e.$t("dragonwinn")), 1)) : (y(), w("div", Ou, c(e.$t("tiewin")), 1))])]), n("div", Au, [(y(!0), w(ae, null, ye(a.data.txtList, (i, d) => (y(), w("div", {
        key: d,
        class: "item-type"
    }, [n("div", Bu, [n("div", Lu, c(e.$t("betid")), 1), n("div", Mu, c(i.betId), 1)]), n("div", xu, [n("div", Tu, c(e.$t("gametype")), 1), n("div", Eu, c(e.$t("dragontiger")), 1)]), n("div", zu, [n("div", Ru, c(e.$t("bettype")), 1), n("div", ju, c(e.$t(`bethistory.${i.betPosition}`)), 1)]), n("div", Pu, [n("div", Nu, c(e.$t("odd")), 1), n("div", Vu, c(r.genOdd(i.betPosition, i.type)), 1)]), n("div", Fu, [n("div", Yu, c(e.$t("betamount")), 1), n("div", Hu, c(("useCur" in e ? e.useCur : b(T))(Math.abs(i.betAmt))), 1)]), n("div", Uu, [n("div", Wu, c(e.$t("win/lose")), 1), i.winLose > 0 ? (y(), w("div", qu, c(("useCur" in e ? e.useCur : b(T))(i.winLose)), 1)) : i.winLose === 0 ? (y(), w("div", Gu, c(("useCur" in e ? e.useCur : b(T))(i.winLose)), 1)) : (y(), w("div", Ku, c(("useCur" in e ? e.useCur : b(T))(i.winLose)), 1))])]))), 128))])])])) : E("", !0)
}
const Ju = X(Nl, [
        ["render", Xu],
        ["__scopeId", "data-v-50bb6ae7"]
    ]),
    Qu = {
        name: "BethistoryIframe",
        data() {
            return {
                dialog: !1,
                data: [],
                banker: 1,
                player: 1,
                tie: 8,
                playerPair: 11,
                bankerPair: 11,
                small: 1.5,
                big: .5,
                playerNatural: 3.5,
                bankerNatural: 3.5,
                super6: 12,
                dragon: 1,
                tiger: 1,
                i18n: tt()
            }
        },
        computed: {
            checkURL() {
                return window.location.href.includes("dev") || window.location.href.includes("localhost") ? "https://status-dev.hippo168.com" : "https://status.hippo168.com"
            }
        },
        methods: {
            toggle(e) {
                this.dialog = !this.dialog, this.data = e
            }
        }
    },
    ea = e => (ce("data-v-a4bdd318"), e = e(), ve(), e),
    Zu = {
        key: 0,
        class: "bg-bethistory"
    },
    ed = ea(() => n("img", {
        src: Ye
    }, null, -1)),
    td = [ed],
    sd = {
        class: "flexible"
    },
    ad = ea(() => n("div", {
        class: "img"
    }, [n("img", {
        src: Me
    })], -1)),
    nd = {
        class: "text"
    },
    od = {
        class: "w-[100%] h-[95%]"
    },
    id = ["id", "src"];

function rd(e, t, s, o, a, r) {
    return a.dialog ? (y(), w("div", Zu, [n("div", {
        class: "close",
        onClick: t[0] || (t[0] = (...l) => r.toggle && r.toggle(...l))
    }, td), n("div", sd, [n("div", {
        class: "topside",
        onClick: t[1] || (t[1] = (...l) => r.toggle && r.toggle(...l))
    }, [ad, n("div", nd, c(e.$t("betdetail")), 1)]), n("div", od, [n("iframe", {
        id: a.data.gameId,
        class: "w-[100%] h-[100%]",
        src: `${r.checkURL}/?gameId=${a.data.gameId}&id=${a.data._id}&lang=${a.i18n.locale}`
    }, null, 8, id)])])])) : E("", !0)
}
const ld = X(Qu, [
        ["render", rd],
        ["__scopeId", "data-v-a4bdd318"]
    ]),
    ud = ha("betHistory", {
        state: () => ({}),
        getters: {},
        actions: {
            async requestBetHistory(e) {
                let t;
                return await Ss("POST", "/apiRoute/transaction/myBet2", e).then(s => {
                    t = s
                }), t
            }
        }
    }),
    dd = {
        name: "Bethistory",
        data() {
            return {
                dialog: !1,
                gametype: "All games",
                datetype: "Today",
                isSettle: !0,
                startDate: this.$dayjs().format("YYYY-MM-DD") + " 00:00:00",
                endDate: this.$dayjs().format("YYYY-MM-DD") + " 23:59:59",
                datalist: [],
                sum: {
                    totalBet: 0,
                    winLose: 0
                },
                i18n: tt(),
                dropdownGameType: [
                    [{
                        slot: "dropItem",
                        label: "allgame",
                        click: () => {
                            this.selectGametype("All games")
                        }
                    }],
                    [{
                        slot: "dropItem",
                        label: "baccarat",
                        click: () => {
                            this.selectGametype("Baccarat")
                        }
                    }],
                    [{
                        slot: "dropItem",
                        label: "parlay",
                        click: () => {
                            this.selectGametype("Step")
                        }
                    }],
                    [{
                        slot: "dropItem",
                        label: "dragontiger",
                        click: () => {
                            this.selectGametype("DragonTiger")
                        }
                    }],
                    [{
                        slot: "dropItem",
                        label: "dice",
                        click: () => {
                            this.selectGametype("SicBo")
                        }
                    }],
                    [{
                        slot: "dropItem",
                        label: "roulette",
                        click: () => {
                            this.selectGametype("Roulette")
                        }
                    }],
                    [{
                        slot: "dropItem",
                        label: "sedie",
                        click: () => {
                            this.selectGametype("Sedie")
                        }
                    }]
                ],
                dropdownGameDate: [
                    [{
                        slot: "dropItem",
                        label: "today",
                        click: () => {
                            this.selectSortdate("Today")
                        }
                    }],
                    [{
                        slot: "dropItem",
                        label: "yesterday",
                        click: () => {
                            this.selectSortdate("Yesterday")
                        }
                    }],
                    [{
                        slot: "dropItem",
                        label: "thisweek",
                        click: () => {
                            this.selectSortdate("This week")
                        }
                    }],
                    [{
                        slot: "dropItem",
                        label: "lastweek",
                        click: () => {
                            this.selectSortdate("Last week")
                        }
                    }],
                    [{
                        slot: "dropItem",
                        label: "thismonth",
                        click: () => {
                            this.selectSortdate("This month")
                        }
                    }],
                    [{
                        slot: "dropItem",
                        label: "lastmonth",
                        click: () => {
                            this.selectSortdate("Last month")
                        }
                    }]
                ]
            }
        },
        methods: {
            showSelectType() {
                if (this.gametype === "All games") return this.i18n.t("allgame");
                if (this.gametype === "Baccarat") return this.i18n.t("baccarat");
                if (this.gametype === "Step") return this.i18n.t("parlay");
                if (this.gametype === "DragonTiger") return this.i18n.t("dragontiger");
                if (this.gametype === "SicBo") return this.i18n.t("dice");
                if (this.gametype === "Roulette") return this.i18n.t("roulette");
                if (this.gametype === "Sedie") return this.i18n.t("sedie")
            },
            showSelectDate() {
                if (this.datetype === "Today") return this.i18n.t("today");
                if (this.datetype === "Yesterday") return this.i18n.t("yesterday");
                if (this.datetype === "This week") return this.i18n.t("thisweek");
                if (this.datetype === "Last week") return this.i18n.t("lastweek");
                if (this.datetype === "This month") return this.i18n.t("thismonth");
                if (this.datetype === "Last month") return this.i18n.t("lastmonth")
            },
            toggle() {
                this.dialog = !this.dialog, this.dialog && this.requestBetlog()
            },
            selectGametype(e) {
                this.gametype = e, this.requestBetlog()
            },
            gateway(e) {
                this.$refs.historyIframe.toggle(e)
            },
            reset() {
                this.gametype = "All games", this.datetype = "Today", this.startDate = this.$dayjs().format("YYYY-MM-DD") + " 00:00:00", this.endDate = this.$dayjs().format("YYYY-MM-DD") + " 23:59:59", this.requestBetlog()
            },
            selectSortdate(e) {
                if (this.datetype = e, e === "Today") this.startDate = this.$dayjs().format("YYYY-MM-DD") + " 00:00:00", this.endDate = this.$dayjs().format("YYYY-MM-DD") + " 23:59:59";
                else if (e === "Yesterday") {
                    const t = this.$dayjs().subtract("1", "days");
                    this.startDate = t.format("YYYY-MM-DD") + " 00:00:00", this.endDate = t.format("YYYY-MM-DD") + " 23:59:59"
                } else if (e === "This week") {
                    const t = this.$dayjs().startOf("week");
                    this.startDate = t.format("YYYY-MM-DD") + " 00:00:00", this.endDate = t.endOf("week").format("YYYY-MM-DD") + " 23:59:59"
                } else if (e === "Last week") {
                    const t = this.$dayjs().subtract("1", "weeks");
                    this.startDate = t.startOf("week").format("YYYY-MM-DD") + " 00:00:00", this.endDate = t.endOf("week").format("YYYY-MM-DD") + " 23:59:59"
                } else if (e === "This month") {
                    const t = this.$dayjs().startOf("month"),
                        s = this.$dayjs().endOf("month");
                    this.startDate = t.format("YYYY-MM-DD") + " 00:00:00", this.endDate = s.format("YYYY-MM-DD") + " 23:59:59"
                } else if (e === "Last month") {
                    const t = this.$dayjs().subtract("1", "months");
                    this.startDate = t.startOf("month").format("YYYY-MM-DD") + " 00:00:00", this.endDate = t.endOf("month").format("YYYY-MM-DD") + " 23:59:59"
                }
                this.requestBetlog()
            },
            async requestBetlog() {
                let e;
                this.gametype === "All games" ? e = "All" : this.gametype === "Baccarat" ? e = "Baccarat" : this.gametype === "Step" ? e = "Step" : this.gametype === "DragonTiger" ? e = "DragonTiger" : this.gametype === "SicBo" ? e = "SicBo" : this.gametype === "Roulette" ? e = "Roulette" : this.gametype === "Sedie" && (e = "Sedie");
                const t = {
                    startDate: this.startDate,
                    endDate: this.endDate,
                    type: e,
                    limit: 100,
                    page: 1
                };
                ud().requestBetHistory(t).then(s => {
                    s.code === 0 && (this.sum = s.data.summaries, this.datalist = s.data.result)
                })
            }
        }
    },
    ta = e => (ce("data-v-3a477e55"), e = e(), ve(), e),
    cd = {
        key: 0,
        class: "bg-bethistory"
    },
    vd = ta(() => n("img", {
        src: Ye
    }, null, -1)),
    fd = [vd],
    pd = {
        class: "flex font18-14",
        style: {
            "margin-top": "12px",
            "margin-left": "12px"
        }
    },
    md = {
        class: "filter-zone"
    },
    gd = {
        class: "text-start pr-[15px]"
    },
    hd = {
        class: "text-left"
    },
    bd = {
        class: "text-start pr-[15px]"
    },
    yd = {
        class: "text-left"
    },
    _d = {
        class: "content-bethistory"
    },
    wd = ["onClick"],
    $d = {
        style: {
            "flex-basis": "33%"
        }
    },
    kd = {
        key: 0,
        class: "flex name"
    },
    Id = {
        key: 1,
        class: "flex name"
    },
    Cd = {
        class: "flex",
        style: {
            gap: "8px"
        }
    },
    Sd = {
        class: "text-time"
    },
    Dd = {
        class: "text-time"
    },
    Od = {
        class: "amtandwinlose"
    },
    Ad = {
        class: "head"
    },
    Bd = {
        class: "item"
    },
    Ld = {
        class: "amtandwinlose"
    },
    Md = {
        class: "head"
    },
    xd = {
        key: 0,
        class: "item",
        style: {
            color: "lawngreen"
        }
    },
    Td = {
        key: 1,
        class: "text",
        style: {
            color: "white"
        }
    },
    Ed = {
        key: 2,
        class: "item",
        style: {
            color: "red"
        }
    },
    zd = ta(() => n("div", {
        class: "arrow"
    }, [n("img", {
        src: Os
    })], -1)),
    Rd = {
        class: "total-zone"
    },
    jd = {
        class: "betamt"
    },
    Pd = {
        class: "text"
    },
    Nd = {
        class: "text"
    },
    Vd = {
        class: "betamt"
    },
    Fd = {
        class: "text"
    },
    Yd = {
        class: "text"
    },
    Hd = {
        class: "winlose"
    },
    Ud = {
        class: "text"
    },
    Wd = {
        key: 0,
        class: "text",
        style: {
            color: "forestgreen"
        }
    },
    qd = {
        key: 1,
        class: "text",
        style: {
            color: "black"
        }
    },
    Gd = {
        key: 2,
        class: "text",
        style: {
            color: "red"
        }
    };

function Kd(e, t, s, o, a, r) {
    const l = Aa,
        i = Qo,
        d = br,
        m = Pl,
        u = Ju,
        f = ld;
    return a.dialog ? (y(), w("div", cd, [n("div", {
        class: "close",
        onClick: t[0] || (t[0] = (...v) => r.toggle && r.toggle(...v))
    }, fd), n("div", pd, c(e.$t("bethistory.bethistory")), 1), n("div", md, [L(i, {
        items: a.dropdownGameType,
        popper: {
            placement: "bottom-start"
        }
    }, {
        dropItem: q(({
            item: v
        }) => [n("div", hd, c(e.$t(`${v.label}`)), 1)]),
        default: q(() => [L(l, {
            icon: "i-game-icons-card-ace-clubs",
            "trailing-icon": "i-heroicons-chevron-down-20-solid"
        }, {
            default: q(() => [n("div", gd, c(r.showSelectType()), 1)]),
            _: 1
        })]),
        _: 1
    }, 8, ["items"]), L(i, {
        items: a.dropdownGameDate,
        popper: {
            placement: "bottom-start"
        }
    }, {
        dropItem: q(({
            item: v
        }) => [n("div", yd, c(e.$t(`${v.label}`)), 1)]),
        default: q(() => [L(l, {
            icon: "i-heroicons-calendar-days",
            "trailing-icon": "i-heroicons-chevron-down-20-solid"
        }, {
            default: q(() => [n("div", bd, c(r.showSelectDate()), 1)]),
            _: 1
        })]),
        _: 1
    }, 8, ["items"])]), n("div", {
        class: "flex text-secondary",
        style: {
            "margin-left": "12px",
            "margin-top": "2px",
            cursor: "pointer"
        },
        onClick: t[1] || (t[1] = (...v) => r.reset && r.reset(...v))
    }, c(e.$t("resetfilter")), 1), n("div", _d, [(y(!0), w(ae, null, ye(a.datalist, (v, p) => (y(), w("div", {
        key: p,
        class: "content-item",
        onClick: h => r.gateway(v)
    }, [n("div", $d, [v.tableId === "0" && v.txtList[0].betPosition.includes("Pmt") ? (y(), w("div", kd, " Pretty Gaming EURO " + c(v.type), 1)) : (y(), w("div", Id, c(v.tableId === "0" ? e.$t("parlay") : v.tableId), 1)), n("div", Cd, [n("div", Sd, c(e.$dayjs(v.date).format("DD/MM/YYYY HH:mm:ss")), 1), n("div", Dd, c(e.$t("id")) + " : " + c(v.tableId === "0" ? v.txtList[0].betId : v._id), 1)])]), n("div", Od, [n("div", Ad, c(e.$t("betamount")), 1), n("div", Bd, c(("useCur" in e ? e.useCur : b(T))(Math.abs(v.totalBet))), 1)]), n("div", Ld, [n("div", Md, c(e.$t("win/lose")), 1), v.winLose > 0 ? (y(), w("div", xd, " +" + c(("useCur" in e ? e.useCur : b(T))(v.winLose)), 1)) : v.winLose === 0 ? (y(), w("div", Td, c(("useCur" in e ? e.useCur : b(T))(v.winLose)), 1)) : (y(), w("div", Ed, c(("useCur" in e ? e.useCur : b(T))(v.winLose)), 1))]), zd], 8, wd))), 128))]), n("div", Rd, [n("div", jd, [n("div", Pd, c(e.$t("turnover")), 1), n("div", Nd, c(("useCur" in e ? e.useCur : b(T))(a.sum.turnOver)), 1)]), n("div", Vd, [n("div", Fd, c(e.$t("totalbetamount")), 1), n("div", Yd, c(("useCur" in e ? e.useCur : b(T))(Math.abs(a.sum.totalBet))), 1)]), n("div", Hd, [n("div", Ud, c(e.$t("totalwin/lose")), 1), a.sum.winLose > 0 ? (y(), w("div", Wd, " +" + c(("useCur" in e ? e.useCur : b(T))(a.sum.winLose)), 1)) : a.sum.winLose === 0 ? (y(), w("div", qd, c(("useCur" in e ? e.useCur : b(T))(a.sum.winLose)), 1)) : (y(), w("div", Gd, c(("useCur" in e ? e.useCur : b(T))(a.sum.winLose)), 1))])]), L(d, {
        ref: "bachistory"
    }, null, 512), L(m, {
        ref: "stephistory"
    }, null, 512), L(u, {
        ref: "dthistory"
    }, null, 512), L(f, {
        ref: "historyIframe"
    }, null, 512)])) : E("", !0)
}
const Xd = X(dd, [
        ["render", Kd],
        ["__scopeId", "data-v-3a477e55"]
    ]),
    pe = et(K.ui.strategy, K.ui.input, Sa),
    Jd = re({
        components: {
            UIcon: Le
        },
        inheritAttrs: !1,
        props: {
            modelValue: {
                type: [String, Number],
                default: ""
            },
            type: {
                type: String,
                default: "text"
            },
            id: {
                type: String,
                default: null
            },
            name: {
                type: String,
                default: null
            },
            placeholder: {
                type: String,
                default: null
            },
            required: {
                type: Boolean,
                default: !1
            },
            disabled: {
                type: Boolean,
                default: !1
            },
            autofocus: {
                type: Boolean,
                default: !1
            },
            autofocusDelay: {
                type: Number,
                default: 100
            },
            icon: {
                type: String,
                default: null
            },
            loadingIcon: {
                type: String,
                default: () => pe.default.loadingIcon
            },
            leadingIcon: {
                type: String,
                default: null
            },
            trailingIcon: {
                type: String,
                default: null
            },
            trailing: {
                type: Boolean,
                default: !1
            },
            leading: {
                type: Boolean,
                default: !1
            },
            loading: {
                type: Boolean,
                default: !1
            },
            padded: {
                type: Boolean,
                default: !0
            },
            size: {
                type: String,
                default: null,
                validator(e) {
                    return Object.keys(pe.size).includes(e)
                }
            },
            color: {
                type: String,
                default: () => pe.default.color,
                validator(e) {
                    return [...K.ui.colors, ...Object.keys(pe.color)].includes(e)
                }
            },
            variant: {
                type: String,
                default: () => pe.default.variant,
                validator(e) {
                    return [...Object.keys(pe.variant), ...Object.values(pe.color).flatMap(t => Object.keys(t))].includes(e)
                }
            },
            inputClass: {
                type: String,
                default: null
            },
            class: {
                type: [String, Object, Array],
                    default: () => ""
            },
            ui: {
                type: Object,
                default: () => ({})
            },
            modelModifiers: {
                type: Object,
                default: () => ({})
            }
        },
        emits: ["update:modelValue", "blur", "change"],
        setup(e, {
            emit: t,
            slots: s
        }) {
            const {
                ui: o,
                attrs: a
            } = st("input", Oe(e, "ui"), pe, Oe(e, "class")), {
                size: r,
                rounded: l
            } = Ba({
                ui: o,
                props: e
            }), {
                emitFormBlur: i,
                emitFormInput: d,
                size: m,
                color: u,
                inputId: f,
                name: v
            } = Rt(e, pe), p = O(() => r.value || m.value), h = M(Is({}, e.modelModifiers, {
                trim: !1,
                lazy: !1,
                number: !1
            })), g = M(null), $ = () => {
                var z;
                e.autofocus && ((z = g.value) == null || z.focus())
            }, _ = z => {
                h.value.trim && (z = z.trim()), (h.value.number || e.type === "number") && (z = ba(z)), t("update:modelValue", z), d()
            }, k = z => {
                h.value.lazy || _(z.target.value)
            }, S = z => {
                if (e.type === "file") {
                    const U = z.target.files;
                    t("change", U)
                } else {
                    const U = z.target.value;
                    t("change", U), h.value.lazy && _(U), h.value.trim && (z.target.value = U.trim())
                }
            }, D = z => {
                i(), t("blur", z)
            };
            Be(() => {
                setTimeout(() => {
                    $()
                }, e.autofocusDelay)
            });
            const A = O(() => {
                    var U, W;
                    const z = ((W = (U = o.value.color) == null ? void 0 : U[u.value]) == null ? void 0 : W[e.variant]) || o.value.variant[e.variant];
                    return ze(G(o.value.base, o.value.form, l.value, o.value.placeholder, e.type === "file" && o.value.file.base, o.value.size[p.value], e.padded ? o.value.padding[p.value] : "p-0", z == null ? void 0 : z.replaceAll("{color}", u.value), (B.value || s.leading) && o.value.leading.padding[p.value], (x.value || s.trailing) && o.value.trailing.padding[p.value]), e.inputClass)
                }),
                B = O(() => e.icon && e.leading || e.icon && !e.trailing || e.loading && !e.trailing || e.leadingIcon),
                x = O(() => e.icon && e.trailing || e.loading && e.trailing || e.trailingIcon),
                j = O(() => e.loading ? e.loadingIcon : e.leadingIcon || e.icon),
                P = O(() => e.loading && !B.value ? e.loadingIcon : e.trailingIcon || e.icon),
                N = O(() => G(o.value.icon.leading.wrapper, o.value.icon.leading.pointer, o.value.icon.leading.padding[p.value])),
                I = O(() => G(o.value.icon.base, u.value && K.ui.colors.includes(u.value) && o.value.icon.color.replaceAll("{color}", u.value), o.value.icon.size[p.value], e.loading && o.value.icon.loading)),
                C = O(() => G(o.value.icon.trailing.wrapper, o.value.icon.trailing.pointer, o.value.icon.trailing.padding[p.value])),
                V = O(() => G(o.value.icon.base, u.value && K.ui.colors.includes(u.value) && o.value.icon.color.replaceAll("{color}", u.value), o.value.icon.size[p.value], e.loading && !B.value && o.value.icon.loading));
            return {
                ui: o,
                attrs: a,
                name: v,
                inputId: f,
                input: g,
                isLeading: B,
                isTrailing: x,
                inputClass: A,
                leadingIconName: j,
                leadingIconClass: I,
                leadingWrapperIconClass: N,
                trailingIconName: P,
                trailingIconClass: V,
                trailingWrapperIconClass: C,
                onInput: k,
                onChange: S,
                onBlur: D
            }
        }
    }),
    Qd = ["id", "name", "value", "type", "required", "placeholder", "disabled"];

function Zd(e, t, s, o, a, r) {
    const l = Le;
    return y(), w("div", {
        class: R(e.type === "hidden" ? "hidden" : e.ui.wrapper)
    }, [n("input", he({
        id: e.inputId,
        ref: "input",
        name: e.name,
        value: e.modelValue,
        type: e.type,
        required: e.required,
        placeholder: e.placeholder,
        disabled: e.disabled,
        class: e.inputClass
    }, e.attrs, {
        onInput: t[0] || (t[0] = (...i) => e.onInput && e.onInput(...i)),
        onBlur: t[1] || (t[1] = (...i) => e.onBlur && e.onBlur(...i)),
        onChange: t[2] || (t[2] = (...i) => e.onChange && e.onChange(...i))
    }), null, 16, Qd), Se(e.$slots, "default"), e.isLeading && e.leadingIconName || e.$slots.leading ? (y(), w("span", {
        key: 0,
        class: R(e.leadingWrapperIconClass)
    }, [Se(e.$slots, "leading", {
        disabled: e.disabled,
        loading: e.loading
    }, () => [L(l, {
        name: e.leadingIconName,
        class: R(e.leadingIconClass)
    }, null, 8, ["name", "class"])])], 2)) : E("", !0), e.isTrailing && e.trailingIconName || e.$slots.trailing ? (y(), w("span", {
        key: 1,
        class: R(e.trailingWrapperIconClass)
    }, [Se(e.$slots, "trailing", {
        disabled: e.disabled,
        loading: e.loading
    }, () => [L(l, {
        name: e.trailingIconName,
        class: R(e.trailingIconClass)
    }, null, 8, ["name", "class"])])], 2)) : E("", !0)], 2)
}
const ec = X(Jd, [
        ["render", Zd]
    ]),
    tc = e => (ce("data-v-2da14fe8"), e = e(), ve(), e),
    sc = {
        key: 0,
        class: "w-[100%] h-[100%] bg-bgDark/80 absolute top-0 left-0 z-[999]"
    },
    ac = tc(() => n("img", {
        src: Ye
    }, null, -1)),
    nc = [ac],
    oc = {
        class: "text-left w-[100%]"
    },
    ic = {
        class: "font14-10 w-[100%] text-left"
    },
    rc = {
        key: 0,
        class: "text-banker w-[100%] text-left mt-[-12px] text-[12px]"
    },
    lc = {
        class: "font14-10 w-[100%] text-left"
    },
    uc = {
        key: 1,
        class: "text-banker w-[100%] text-left mt-[-12px] text-[12px]"
    },
    dc = {
        key: 2,
        class: "text-banker w-[100%] text-left mt-[-12px] text-[12px]"
    },
    cc = {
        __name: "dialogLogin",
        props: {
            isOpen: {
                type: Boolean,
                default () {
                    return !1
                }
            }
        },
        emits: ["toggleDialogLogin"],
        setup(e, {
            emit: t
        }) {
            const s = O(() => le()._sizing),
                o = t,
                a = M({
                    username: "",
                    password: ""
                }),
                r = M(!1),
                l = M(!1),
                i = M(!1),
                d = M("password"),
                m = () => {
                    Ss("POST", "/apiRoute/member/authen", a.value).then(u => {
                        u.code === 0 ? (window.localStorage.setItem("token", u.data.accessToken), le().token = u.data.accessToken, le().getProfile(), ft("/")) : (window.localStorage.removeItem("token"), le().token = "", u.code === 10001 ? (i.value = !0, l.value = !1, r.value = !1) : u.code === 998 && u.msg.includes("password") ? l.value = !0 : r.value = !0)
                    })
                };
            return (u, f) => {
                const v = ec,
                    p = Le;
                return e.isOpen ? (y(), w("div", sc, [n("div", {
                    class: "bg-bgMedium w-fit h-fit absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col justify-center items-center p-[1.5%] rounded-[8px] gap-[12px] border border-bgLi",
                    style: Re(b(s) === "mobile" ? "padding:5%;" : "")
                }, [n("div", {
                    class: "close",
                    onClick: f[0] || (f[0] = h => o("toggleDialogLogin"))
                }, nc), n("div", oc, c(u.$t("login")), 1), n("div", ic, c(u.$t("username")), 1), L(v, {
                    modelValue: b(a).username,
                    "onUpdate:modelValue": f[1] || (f[1] = h => b(a).username = h),
                    class: "w-[305px] h-[40px]",
                    placeholder: u.$t("enterusername"),
                    color: b(r) || b(i) ? "red" : "white",
                    onFocus: f[2] || (f[2] = h => (r.value = !1, l.value = !1, i.value = !1))
                }, null, 8, ["modelValue", "placeholder", "color"]), b(r) ? (y(), w("div", rc, c(u.$t("loginerr1")), 1)) : E("", !0), n("div", lc, c(u.$t("password")), 1), L(v, {
                    modelValue: b(a).password,
                    "onUpdate:modelValue": f[5] || (f[5] = h => b(a).password = h),
                    class: "w-[305px] h-[40px] relative",
                    type: b(d),
                    placeholder: u.$t("enterpassword"),
                    color: b(l) || b(i) ? "red" : "white",
                    onFocus: f[6] || (f[6] = h => (l.value = !1, r.value = !1, i.value = !1))
                }, {
                    default: q(() => [b(d) === "text" ? (y(), se(p, {
                        key: 0,
                        name: "i-heroicons-eye-solid",
                        class: "absolute right-3 top-2",
                        onClick: f[3] || (f[3] = h => d.value = "password")
                    })) : b(d) === "password" ? (y(), se(p, {
                        key: 1,
                        name: "i-heroicons-eye-slash-solid",
                        class: "absolute right-3 top-2",
                        onClick: f[4] || (f[4] = h => d.value = "text")
                    })) : E("", !0)]),
                    _: 1
                }, 8, ["modelValue", "type", "placeholder", "color"]), b(l) ? (y(), w("div", uc, c(u.$t("loginerr2")), 1)) : E("", !0), b(i) ? (y(), w("div", dc, c(u.$t("loginfail")), 1)) : E("", !0), n("div", {
                    class: "bg-secondary text-black w-[100%] py-[5px] rounded-[4px] font18-14 px-[20px] clickActive",
                    onClick: f[7] || (f[7] = h => b(a).username && b(a).password ? m() : !b(a).username && !b(a).password ? (r.value = !0, l.value = !0) : b(a).username ? b(a).password ? "" : l.value = !0 : r.value = !0)
                }, c(u.$t("login")), 1)], 4)])) : E("", !0)
            }
        }
    },
    vc = X(cc, [
        ["__scopeId", "data-v-2da14fe8"]
    ]),
    fc = "" + globalThis.__publicAssetsURL("headerBar/ham/avatar_demo.svg"),
    pc = "" + globalThis.__publicAssetsURL("headerBar/ham/bethistory.svg"),
    mc = "" + globalThis.__publicAssetsURL("headerBar/ham/lang.svg"),
    gc = "" + globalThis.__publicAssetsURL("headerBar/ham/full.svg"),
    hc = "" + globalThis.__publicAssetsURL("headerBar/ham/gamerules.svg"),
    bc = "" + globalThis.__publicAssetsURL("headerBar/ham/signout.svg"),
    xe = e => (ce("data-v-542986af"), e = e(), ve(), e),
    yc = {
        key: 1,
        class: "bg-menu"
    },
    _c = {
        key: 0,
        class: "profile-zone"
    },
    wc = xe(() => n("img", {
        class: "avatar",
        src: fc
    }, null, -1)),
    $c = {
        class: "flex flex-col justify-center"
    },
    kc = {
        class: "flex justify-start",
        style: {
            "user-select": "text"
        }
    },
    Ic = {
        key: 1,
        class: "playdemo-zone"
    },
    Cc = {
        class: "flex gap-1"
    },
    Sc = xe(() => n("img", {
        src: pc
    }, null, -1)),
    Dc = {
        class: "sound-zone"
    },
    Oc = {
        class: "flex justify-between"
    },
    Ac = {
        class: "flex items-center gap-2"
    },
    Bc = ["src"],
    Lc = {
        class: "flex justify-between"
    },
    Mc = {
        class: "flex items-center gap-2"
    },
    xc = ["src"],
    Tc = {
        class: "flex justify-between"
    },
    Ec = {
        class: "flex justify-around gap-5"
    },
    zc = {
        class: "flex justify-between"
    },
    Rc = {
        class: "flex items-center gap-2"
    },
    jc = ["src"],
    Pc = {
        class: "flex gap-1"
    },
    Nc = xe(() => n("img", {
        src: mc
    }, null, -1)),
    Vc = {
        class: "flex gap-1"
    },
    Fc = ["src"],
    Yc = {
        class: "flex gap-1"
    },
    Hc = xe(() => n("img", {
        src: gc
    }, null, -1)),
    Uc = {
        class: "flex gap-1"
    },
    Wc = xe(() => n("img", {
        src: hc
    }, null, -1)),
    qc = {
        class: "flex gap-1"
    },
    Gc = {
        class: "w-[20px]"
    },
    Kc = xe(() => n("div", {
        class: "spacer"
    }, null, -1)),
    Xc = xe(() => n("img", {
        src: bc
    }, null, -1)),
    Jc = {
        __name: "hamburger",
        emits: ["triggerBalance"],
        setup(e, {
            expose: t,
            emit: s
        }) {
            const o = () => {
                    document.fullscreenElement ? document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen() : document.documentElement.requestFullscreen ? document.documentElement.requestFullscreen() : document.documentElement.mozRequestFullScreen ? document.documentElement.mozRequestFullScreen() : document.documentElement.webkitRequestFullscreen ? document.documentElement.webkitRequestFullscreen() : document.documentElement.msRequestFullscreen && document.documentElement.msRequestFullscreen()
                },
                {
                    locale: a,
                    locales: r,
                    setLocale: l
                } = tt(),
                i = () => r.value.find(I => I.code === a.value),
                d = M(!1),
                m = () => {
                    d.value = !d.value
                },
                u = M(!1),
                f = () => {
                    u.value = !u.value
                },
                v = async I => {
                    await l(I), await $a(I), g.value.track = 1, p.getBanner(), m()
                },
                p = le(),
                h = M(!1),
                g = M({
                    gameVol: 70,
                    musicVol: 25,
                    liveVol: 100,
                    track: 1
                });
            Be(() => {
                localStorage.getItem("effectV") && localStorage.getItem("musicV") && localStorage.getItem("musicN") && localStorage.getItem("liveV") && (g.value.gameVol = parseFloat(localStorage.getItem("effectV")) * 100, g.value.musicVol = parseFloat(localStorage.getItem("musicV")) * 100, g.value.liveVol = parseFloat(localStorage.getItem("liveV")) * 100, g.value.track = parseInt(localStorage.getItem("musicN")))
            });
            const $ = I => {
                    const C = ka();
                    I === "next" ? (g.value.track + 1 > C ? g.value.track = 1 : g.value.track++, rs(g.value.track)) : I === "back" && (g.value.track - 1 < 1 ? g.value.track = C : g.value.track--, rs(g.value.track))
                },
                _ = I => I < 100 && I > 0 ? "sound" : I === 100 ? "soundmax" : "soundmute",
                k = (I, C) => {
                    C === "sound" ? g.value[I] = 0 : C === "soundmute" ? g.value[I] = 100 : g.value[I] = 0
                };
            vt(() => g.value, I => {
                ya(g.value.gameVol / 100), _a(g.value.musicVol / 100), wa(g.value.liveVol / 100)
            }, {
                deep: !0
            });
            const S = I => (/^https?:\/\//i.test(I) || (I = "https://" + I), I),
                D = () => {
                    p.logout(), p.redirect ? window.location.replace(S(`${p.redirect}`)) : ft("/")
                },
                A = () => {
                    h.value = !h.value
                },
                B = () => {},
                x = M(),
                j = () => {
                    x.value.toggle()
                },
                P = M(),
                N = () => {
                    P.value.toggle()
                };
            return t({
                toggleDialog: A,
                toggleDialogLang: m
            }), (I, C) => {
                const V = Ya,
                    z = xn,
                    U = La,
                    W = Fn,
                    J = Xd,
                    Te = Ma,
                    fe = vc;
                return y(), w(ae, null, [b(h) ? (y(), w("div", {
                    key: 0,
                    class: "bg-hamberger",
                    onClick: C[0] || (C[0] = F => b(d) === !0 ? m() : A())
                })) : E("", !0), b(h) ? (y(), w("div", yc, [b(p)._token ? (y(), w("div", _c, [wc, n("div", $c, [n("div", kc, c(b(p)._profile.isTrail ? "Demo mode" : `${b(p)._profile._id}`), 1), n("div", {
                    id: "balance-zone2",
                    class: "flex",
                    style: {
                        gap: "12px"
                    },
                    onClick: C[1] || (C[1] = F => B())
                }, [n("div", null, c(("useCur" in I ? I.useCur : b(T))(b(p)._profile.balance)) + " " + c(("useSafe" in I ? I.useSafe : b(Bt))(b(p)._profile.currency[0])), 1)])])])) : (y(), w("div", Ic, [n("div", null, c(I.$t("tryourdemo")), 1), n("div", {
                    class: "btn-playdemo clickActive",
                    onClick: C[2] || (C[2] = F => b(p).getDemo())
                }, c(I.$t("playdemo")), 1)])), b(p)._token ? (y(), w("div", {
                    key: 2,
                    class: "btn clickActive",
                    onClick: C[3] || (C[3] = F => j())
                }, [n("div", Cc, [Sc, n("div", null, c(I.$t("bethistory.bethistory")), 1)])])) : E("", !0), n("div", Dc, [n("div", Oc, [n("div", null, c(I.$t("game")), 1), n("div", Ac, [n("img", {
                    class: "clickActive",
                    src: `/headerBar/ham/${_(b(g).gameVol)}.svg`,
                    onClick: C[4] || (C[4] = F => k("gameVol", _(b(g).gameVol)))
                }, null, 8, Bc), Ke(), L(V, {
                    modelValue: b(g).gameVol,
                    "onUpdate:modelValue": C[5] || (C[5] = F => b(g).gameVol = F),
                    class: "slider",
                    size: "sm",
                    min: 0,
                    max: 100
                }, null, 8, ["modelValue"])])]), n("div", Lc, [n("div", null, c(I.$t("music")), 1), n("div", Mc, [n("img", {
                    class: "clickActive",
                    src: `/headerBar/ham/${_(b(g).musicVol)}.svg`,
                    onClick: C[6] || (C[6] = F => k("musicVol", _(b(g).musicVol)))
                }, null, 8, xc), Ke(), L(V, {
                    modelValue: b(g).musicVol,
                    "onUpdate:modelValue": C[7] || (C[7] = F => b(g).musicVol = F),
                    class: "slider",
                    size: "sm",
                    min: 0,
                    max: 100
                }, null, 8, ["modelValue"])])]), n("div", Tc, [n("div", null, c(I.$t("trackmusic")), 1), n("div", Ec, [n("img", {
                    class: "clickActive",
                    src: Me,
                    onClick: C[8] || (C[8] = F => $("back"))
                }), n("div", null, c(b(g).track), 1), n("img", {
                    class: "clickActive",
                    src: Os,
                    onClick: C[9] || (C[9] = F => $("next"))
                })])]), n("div", zc, [n("div", null, c(I.$t("streaming")), 1), n("div", Rc, [n("img", {
                    class: "clickActive",
                    src: `/headerBar/ham/${_(b(g).liveVol)}.svg`,
                    onClick: C[10] || (C[10] = F => k("liveVol", _(b(g).liveVol)))
                }, null, 8, jc), b(is.isMobile) ? (y(), se(z, {
                    key: 1,
                    modelValue: b(g).liveVol,
                    "onUpdate:modelValue": C[12] || (C[12] = F => b(g).liveVol = F)
                }, null, 8, ["modelValue"])) : (y(), se(V, {
                    key: 0,
                    modelValue: b(g).liveVol,
                    "onUpdate:modelValue": C[11] || (C[11] = F => b(g).liveVol = F),
                    class: "slider",
                    size: "sm",
                    min: 0,
                    max: 100
                }, null, 8, ["modelValue"]))])])]), n("div", {
                    class: "btn clickActive flex justify-between",
                    onClick: C[13] || (C[13] = F => m())
                }, [n("div", Pc, [Nc, n("div", null, c(I.$t("language")), 1)]), n("div", Vc, [n("img", {
                    src: `/headerBar/lang/${i().code.substring(0,2)}.svg`
                }, null, 8, Fc), n("div", null, c(i().name), 1)])]), b(is.isMobile) ? E("", !0) : (y(), w("div", {
                    key: 3,
                    class: "btn clickActive",
                    onClick: C[14] || (C[14] = F => o())
                }, [n("div", Yc, [Hc, n("div", null, c(I.$t("fullscreen")), 1)])])), n("div", {
                    class: "btn clickActive",
                    onClick: N
                }, [n("div", Uc, [Wc, n("div", null, c(I.$t("gamerules")), 1)])]), b(p)._token ? E("", !0) : (y(), w("div", {
                    key: 4,
                    class: "btn clickActive",
                    onClick: f
                }, [n("div", qc, [n("div", Gc, [L(U, {
                    name: "heroicons:user-16-solid"
                })]), n("div", null, c(I.$t("login")), 1)])])), Kc, b(p)._token ? (y(), w("div", {
                    key: 5,
                    class: "btn clickActive",
                    onClick: C[15] || (C[15] = F => D())
                }, [Xc, Ke(" " + c(I.$t("logout")), 1)])) : E("", !0)])) : E("", !0), L(W, {
                    ref: "dialoglang",
                    "dialog-lang": b(d),
                    onToggleDialogLang: m,
                    onSetLang: v
                }, null, 8, ["dialog-lang"]), L(J, {
                    ref_key: "betHistoryDialog",
                    ref: x
                }, null, 512), L(Te, {
                    ref_key: "gamerulesDialog",
                    ref: P
                }, null, 512), L(fe, {
                    ref: "dialogLogin",
                    "is-open": b(u),
                    onToggleDialogLogin: f
                }, null, 8, ["is-open"])], 64)
            }
        }
    },
    Qc = X(Jc, [
        ["__scopeId", "data-v-542986af"]
    ]),
    sa = "" + globalThis.__publicAssetsURL("headerBar/Logo.svg"),
    $s = "" + globalThis.__publicAssetsURL("headerBar/Menu.svg"),
    aa = e => (ce("data-v-ac2bc439"), e = e(), ve(), e),
    Zc = {
        key: 0
    },
    ev = {
        class: "bg-head"
    },
    tv = {
        class: "flex"
    },
    sv = {
        class: "head-control"
    },
    av = {
        key: 0,
        id: "balance-zone",
        class: "balance-zone"
    },
    nv = {
        class: "font18-12 fontWeight600 block-newline"
    },
    ov = {
        key: 1
    },
    iv = {
        class: "control-zone"
    },
    rv = ["src"],
    lv = ["src"],
    uv = {
        key: 1
    },
    dv = {
        class: "bg-head game"
    },
    cv = aa(() => n("img", {
        class: "back",
        src: Me
    }, null, -1)),
    vv = aa(() => n("img", {
        class: "logo game",
        src: sa
    }, null, -1)),
    fv = [cv, vv],
    pv = {
        class: "head-control game"
    },
    mv = {
        key: 0,
        id: "balance-zone",
        class: "balance-zone"
    },
    gv = {
        class: "font18-12 fontWeight600 block-newline"
    },
    hv = {
        key: 1
    },
    bv = {
        class: "control-zone"
    },
    yv = ["src"],
    _v = {
        __name: "AppHeader",
        setup(e) {
            const t = le();
            Ia().public;
            const s = M();
            O(() => le()._sizing);
            const o = () => {
                    le().getBalance();
                    const u = document.getElementById("refresh-btn"),
                        f = document.getElementById("balance-zone");
                    Ie().name.includes("lobby") ? (u.setAttribute("class", "refresh refresh-start"), f.setAttribute("class", "balance-zone clickActive inactive"), setTimeout(function() {
                        f.setAttribute("class", "balance-zone clickActive"), u.setAttribute("class", "refresh")
                    }, 1500)) : (u.setAttribute("class", "refresh game refresh-start"), f.setAttribute("class", "balance-zone clickActive inactive"), setTimeout(function() {
                        f.setAttribute("class", "balance-zone clickActive"), u.setAttribute("class", "refresh game")
                    }, 1500))
                },
                a = () => {
                    s.value.toggleDialog()
                },
                r = () => {
                    s.value.toggleDialog(), s.value.toggleDialogLang()
                },
                {
                    locale: l,
                    locales: i,
                    setLocale: d
                } = tt(),
                m = () => i.value.find(u => u.code === l.value);
            return (u, f) => {
                const v = mt,
                    p = Qc;
                return y(), w(ae, null, [L(Cs, {
                    name: "page",
                    mode: "out-in"
                }, {
                    default: q(() => [("useRoute" in u ? u.useRoute : b(Ie))().name.includes("lobby") || ("useRoute" in u ? u.useRoute : b(Ie))().name.includes("favorite") ? (y(), w("div", Zc, [n("div", ev, [n("div", tv, [("useRoute" in u ? u.useRoute : b(Ie))().name.includes("favorite") ? (y(), w("img", {
                        key: 0,
                        class: "back clickActive",
                        src: Me,
                        onClick: f[0] || (f[0] = h => ("useRouter" in u ? u.useRouter : b(ls))().back())
                    })) : E("", !0), n("img", {
                        class: "logo",
                        src: sa,
                        onClick: f[1] || (f[1] = h => ("useRoute" in u ? u.useRoute : b(Ie))().name.includes("lobby") ? ("navigateTo" in u ? u.navigateTo : b(ft))({
                            path: "/lobby/all"
                        }) : "")
                    })]), n("div", sv, [b(t)._profile && b(t)._token ? (y(), w("div", av, [n("div", nv, c(("useCur" in u ? u.useCur : b(T))(b(t)._profile.balance)) + " " + c(("useSafe" in u ? u.useSafe : b(Bt))(b(t)._profile.currency[0])), 1)])) : (y(), w("div", ov, [n("div", {
                        class: "demo-btn font18-14 clickActive",
                        onClick: f[2] || (f[2] = h => b(t).getDemo())
                    }, c(u.$t("playdemo")), 1)])), L(v, {
                        orientation: "vertical",
                        class: "h-7 w-1 color-red"
                    }), n("div", iv, [b(t)._profile && b(t)._token ? (y(), w("img", {
                        key: 0,
                        class: "ico clickActive",
                        src: ("useRoute" in u ? u.useRoute : b(Ie))().name.includes("favorite") ? "/headerBar/favIn.svg" : "/headerBar/favOn.svg",
                        onClick: f[3] || (f[3] = h => ("navigateTo" in u ? u.navigateTo : b(ft))({
                            path: "/favorite"
                        }))
                    }, null, 8, rv)) : E("", !0), n("img", {
                        class: "icoLang clickActive",
                        src: `/headerBar/lang/${m().code.substring(0,2)}.svg`,
                        onClick: r
                    }, null, 8, lv), n("img", {
                        class: "ico clickActive",
                        src: $s,
                        onClick: a
                    })])]), b(t)._sizing === "desktop" ? (y(), se(v, {
                        key: 0,
                        style: {
                            "flex-basis": "100%",
                            height: "0px",
                            "margin-top": "20px"
                        }
                    })) : E("", !0)])])) : (y(), w("div", uv, [n("div", dv, [n("div", {
                        class: "game-headLeft clickActive",
                        onClick: f[4] || (f[4] = h => ("useRouter" in u ? u.useRouter : b(ls))().back())
                    }, fv), n("div", pv, [b(t)._profile && b(t)._token ? (y(), w("div", mv, [n("div", gv, c(("useCur" in u ? u.useCur : b(T))(b(t)._profile.balance)) + " " + c(("useSafe" in u ? u.useSafe : b(Bt))(b(t)._profile.currency[0])), 1)])) : (y(), w("div", hv, [n("div", {
                        class: "demo-btn clickActive",
                        onClick: f[5] || (f[5] = h => ("$storeGlobal" in u ? u.$storeGlobal : b(le))().getDemo())
                    }, c(u.$t("playdemo")), 1)])), L(v, {
                        orientation: "vertical",
                        class: "h-7 w-1 color-red"
                    }), n("div", bv, [n("img", {
                        class: "icoLang clickActive",
                        src: `/headerBar/lang/${m().code.substring(0,2)}.svg`,
                        onClick: r
                    }, null, 8, yv), n("img", {
                        class: "ico game clickActive",
                        src: $s,
                        onClick: a
                    })])])])]))]),
                    _: 1
                }), L(p, {
                    ref_key: "refHamburger",
                    ref: s,
                    onTriggerBalance: o
                }, null, 512)], 64)
            }
        }
    },
    wv = X(_v, [
        ["__scopeId", "data-v-ac2bc439"]
    ]),
    $v = {
        data() {
            return {}
        },
        mounted() {
            window.addEventListener("resize", this.resize), this.resize()
        },
        unmounted() {
            window.removeEventListener("resize", this.resize)
        },
        methods: {
            resize() {
                const e = document.getElementById("outer"),
                    t = window.innerWidth,
                    s = window.innerHeight,
                    o = e.clientWidth,
                    a = e.clientHeight,
                    r = Math.min(t / o, s / a);
                e.style.transform = `translate(-50%,-50%) scale(${r})`
            }
        }
    },
    kv = e => (ce("data-v-45d08db5"), e = e(), ve(), e),
    Iv = {
        id: "gamecontainer"
    },
    Cv = {
        id: "outer"
    },
    Sv = {
        key: 0,
        class: "globalLoading"
    },
    Dv = kv(() => n("img", {
        class: "w-[35%] h-[35%]",
        src: xa
    }, null, -1)),
    Ov = [Dv];

function Av(e, t, s, o, a, r) {
    const l = wv;
    return y(), w("div", Iv, [n("div", Cv, [n("div", {
        id: "bg-layout",
        style: Re(("useRoute" in e ? e.useRoute : b(Ie))().name.includes("lobby") ? "" : "padding:0;")
    }, [("$storeGlobal" in e ? e.$storeGlobal : b(le))()._globalLoading ? (y(), w("div", Sv, Ov)) : E("", !0), L(l), Se(e.$slots, "default", {}, void 0, !0)], 4)])])
}
const Yv = X($v, [
    ["render", Av],
    ["__scopeId", "data-v-45d08db5"]
]);
export {
    Yv as
    default
};