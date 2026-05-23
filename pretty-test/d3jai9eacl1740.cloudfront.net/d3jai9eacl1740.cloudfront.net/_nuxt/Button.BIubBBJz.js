import {
    at as ue,
    l as Q,
    c as y,
    au as ce,
    r as R,
    k as N,
    av as pe,
    aw as ke,
    o as xe,
    ax as we,
    ak as te,
    ac as Se,
    ay as Ce,
    az as Be,
    aA as Pe,
    aB as qe,
    K as Ie,
    aa as de,
    L as Re,
    aC as Ae,
    aD as Oe,
    aE as Te,
    aF as Le,
    u as je,
    j as Ee,
    a3 as $e,
    a2 as J,
    w as K,
    aG as ae,
    g as L,
    q as z,
    x as G,
    U as _,
    aH as ne,
    aI as re,
    V as D,
    am as ze,
    b as _e,
    aJ as De,
    aK as Ne,
    ah as Me,
    ag as le,
    C as Ue,
    P as He,
    Q as F,
    R as Ve,
    S as We,
    ae as H,
    n as V,
    e as W,
    a as Ge,
    t as Fe
} from "./entry.BFNHJ093.js";
import {
    _ as fe,
    u as Qe
} from "./Icon.BriSQLkb.js";
import {
    _ as ve
} from "./_plugin-vue_export-helper.DlAUqK2U.js";
async function ge(e, n = ue()) {
    const {
        path: a,
        matched: t
    } = n.resolve(e);
    if (!t.length || (n._routePreloaded || (n._routePreloaded = new Set), n._routePreloaded.has(a))) return;
    const l = n._preloadPromises = n._preloadPromises || [];
    if (l.length > 4) return Promise.all(l).then(() => ge(e, n));
    n._routePreloaded.add(a);
    const r = t.map(o => {
        var i;
        return (i = o.components) == null ? void 0 : i.default
    }).filter(o => typeof o == "function");
    for (const o of r) {
        const i = Promise.resolve(o()).catch(() => {}).finally(() => l.splice(l.indexOf(i)));
        l.push(i)
    }
    await Promise.all(l)
}
const Je = (...e) => e.find(n => n !== void 0);

function Ke(e) {
    const n = e.componentName || "NuxtLink";

    function a(t, l) {
        if (!t || e.trailingSlash !== "append" && e.trailingSlash !== "remove") return t;
        if (typeof t == "string") return ie(t, e.trailingSlash);
        const r = "path" in t ? t.path : l(t).path;
        return { ...t,
            name: void 0,
            path: ie(r, e.trailingSlash)
        }
    }
    return Q({
        name: n,
        props: {
            to: {
                type: [String, Object],
                default: void 0,
                required: !1
            },
            href: {
                type: [String, Object],
                default: void 0,
                required: !1
            },
            target: {
                type: String,
                default: void 0,
                required: !1
            },
            rel: {
                type: String,
                default: void 0,
                required: !1
            },
            noRel: {
                type: Boolean,
                default: void 0,
                required: !1
            },
            prefetch: {
                type: Boolean,
                default: void 0,
                required: !1
            },
            noPrefetch: {
                type: Boolean,
                default: void 0,
                required: !1
            },
            activeClass: {
                type: String,
                default: void 0,
                required: !1
            },
            exactActiveClass: {
                type: String,
                default: void 0,
                required: !1
            },
            prefetchedClass: {
                type: String,
                default: void 0,
                required: !1
            },
            replace: {
                type: Boolean,
                default: void 0,
                required: !1
            },
            ariaCurrentValue: {
                type: String,
                default: void 0,
                required: !1
            },
            external: {
                type: Boolean,
                default: void 0,
                required: !1
            },
            custom: {
                type: Boolean,
                default: void 0,
                required: !1
            }
        },
        setup(t, {
            slots: l
        }) {
            const r = ue(),
                o = Ie(),
                i = y(() => {
                    const u = t.to || t.href || "";
                    return a(u, r.resolve)
                }),
                g = y(() => typeof i.value == "string" && ce(i.value, {
                    acceptRelative: !0
                })),
                d = y(() => t.target && t.target !== "_self"),
                f = y(() => t.external || d.value ? !0 : typeof i.value == "object" ? !1 : i.value === "" || g.value),
                s = R(!1),
                c = R(null),
                b = u => {
                    var m;
                    c.value = t.custom ? (m = u == null ? void 0 : u.$el) == null ? void 0 : m.nextElementSibling : u == null ? void 0 : u.$el
                };
            if (t.prefetch !== !1 && t.noPrefetch !== !0 && t.target !== "_blank" && !Ze()) {
                const m = de();
                let p, h = null;
                N(() => {
                    const k = Ye();
                    pe(() => {
                        p = ke(() => {
                            var P;
                            (P = c == null ? void 0 : c.value) != null && P.tagName && (h = k.observe(c.value, async () => {
                                h == null || h(), h = null;
                                const x = typeof i.value == "string" ? i.value : r.resolve(i.value).fullPath;
                                await Promise.all([m.hooks.callHook("link:prefetch", x).catch(() => {}), !f.value && ge(i.value, r).catch(() => {})]), s.value = !0
                            }))
                        })
                    })
                }), xe(() => {
                    p && we(p), h == null || h(), h = null
                })
            }
            return () => {
                var k, P;
                if (!f.value) {
                    const x = {
                        ref: b,
                        to: i.value,
                        activeClass: t.activeClass || e.activeClass,
                        exactActiveClass: t.exactActiveClass || e.exactActiveClass,
                        replace: t.replace,
                        ariaCurrentValue: t.ariaCurrentValue,
                        custom: t.custom
                    };
                    return t.custom || (s.value && (x.class = t.prefetchedClass || e.prefetchedClass), x.rel = t.rel || void 0), te(Se("RouterLink"), x, l.default)
                }
                const u = typeof i.value == "object" ? ((k = r.resolve(i.value)) == null ? void 0 : k.href) ? ? null : i.value && !t.external && !g.value ? a(Ce(o.app.baseURL, i.value), r.resolve) : i.value || null,
                    m = t.target || null,
                    p = Je(t.noRel ? "" : t.rel, e.externalRelAttribute, g.value || d.value ? "noopener noreferrer" : "") || null,
                    h = () => Re(u, {
                        replace: t.replace
                    });
                return t.custom ? l.default ? l.default({
                    href: u,
                    navigate: h,
                    get route() {
                        if (!u) return;
                        const x = Be(u);
                        return {
                            path: x.pathname,
                            fullPath: x.pathname,
                            get query() {
                                return Pe(x.search)
                            },
                            hash: x.hash,
                            params: {},
                            name: void 0,
                            matched: [],
                            redirectedFrom: void 0,
                            meta: {},
                            href: u
                        }
                    },
                    rel: p,
                    target: m,
                    isExternal: f.value,
                    isActive: !1,
                    isExactActive: !1
                }) : null : te("a", {
                    ref: c,
                    href: u,
                    rel: p,
                    target: m
                }, (P = l.default) == null ? void 0 : P.call(l))
            }
        }
    })
}
const Xe = Ke(qe);

function ie(e, n) {
    const a = n === "append" ? Ae : Oe;
    return ce(e) && !e.startsWith("http") ? e : a(e, !0)
}

function Ye() {
    const e = de();
    if (e._observer) return e._observer;
    let n = null;
    const a = new Map,
        t = (r, o) => (n || (n = new IntersectionObserver(i => {
            for (const g of i) {
                const d = a.get(g.target);
                (g.isIntersecting || g.intersectionRatio > 0) && d && d()
            }
        })), a.set(r, o), n.observe(r), () => {
            a.delete(r), n.unobserve(r), a.size === 0 && (n.disconnect(), n = null)
        });
    return e._observer = {
        observe: t
    }
}

function Ze() {
    const e = navigator.connection;
    return !!(e && (e.saveData || /2g/.test(e.effectiveType)))
}

function be(e) {
    return Te() ? (Le(e), !0) : !1
}

function C(e) {
    return typeof e == "function" ? e() : je(e)
}
const et = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const tt = Object.prototype.toString,
    at = e => tt.call(e) === "[object Object]",
    T = () => {};

function he(e, n) {
    function a(...t) {
        return new Promise((l, r) => {
            Promise.resolve(e(() => n.apply(this, t), {
                fn: n,
                thisArg: this,
                args: t
            })).then(l).catch(r)
        })
    }
    return a
}

function nt(e, n = {}) {
    let a, t, l = T;
    const r = i => {
        clearTimeout(i), l(), l = T
    };
    return i => {
        const g = C(e),
            d = C(n.maxWait);
        return a && r(a), g <= 0 || d !== void 0 && d <= 0 ? (t && (r(t), t = null), Promise.resolve(i())) : new Promise((f, s) => {
            l = n.rejectOnCancel ? s : f, d && !t && (t = setTimeout(() => {
                a && r(a), t = null, f(i())
            }, d)), a = setTimeout(() => {
                t && r(t), t = null, f(i())
            }, g)
        })
    }
}

function rt(...e) {
    let n = 0,
        a, t = !0,
        l = T,
        r, o, i, g, d;
    !$e(e[0]) && typeof e[0] == "object" ? {
        delay: o,
        trailing: i = !0,
        leading: g = !0,
        rejectOnCancel: d = !1
    } = e[0] : [o, i = !0, g = !0, d = !1] = e;
    const f = () => {
        a && (clearTimeout(a), a = void 0, l(), l = T)
    };
    return c => {
        const b = C(o),
            u = Date.now() - n,
            m = () => r = c();
        return f(), b <= 0 ? (n = Date.now(), m()) : (u > b && (g || !t) ? (n = Date.now(), m()) : i && (r = new Promise((p, h) => {
            l = d ? h : p, a = setTimeout(() => {
                n = Date.now(), t = !0, p(m()), f()
            }, Math.max(0, b - u))
        })), !g && !a && (a = setTimeout(() => t = !0, b)), t = !1, r)
    }
}

function lt(e) {
    return e || J()
}

function it(e, n = 200, a = {}) {
    return he(nt(n, a), e)
}

function ot(e, n = 200, a = !1, t = !0, l = !1) {
    return he(rt(n, a, t, l), e)
}

function me(e, n = !0, a) {
    lt() ? N(e, a) : n ? e() : Ee(e)
}

function I(e) {
    var n;
    const a = C(e);
    return (n = a == null ? void 0 : a.$el) != null ? n : a
}
const M = et ? window : void 0;

function oe(...e) {
    let n, a, t, l;
    if (typeof e[0] == "string" || Array.isArray(e[0]) ? ([a, t, l] = e, n = M) : [n, a, t, l] = e, !n) return T;
    Array.isArray(a) || (a = [a]), Array.isArray(t) || (t = [t]);
    const r = [],
        o = () => {
            r.forEach(f => f()), r.length = 0
        },
        i = (f, s, c, b) => (f.addEventListener(s, c, b), () => f.removeEventListener(s, c, b)),
        g = K(() => [I(n), C(l)], ([f, s]) => {
            if (o(), !f) return;
            const c = at(s) ? { ...s
            } : s;
            r.push(...a.flatMap(b => t.map(u => i(f, b, u, c))))
        }, {
            immediate: !0,
            flush: "post"
        }),
        d = () => {
            g(), o()
        };
    return be(d), d
}

function st() {
    const e = R(!1),
        n = J();
    return n && N(() => {
        e.value = !0
    }, n), e
}

function ut(e) {
    const n = st();
    return y(() => (n.value, !!e()))
}

function ct(e, n, a = {}) {
    const {
        window: t = M,
        ...l
    } = a;
    let r;
    const o = ut(() => t && "ResizeObserver" in t),
        i = () => {
            r && (r.disconnect(), r = void 0)
        },
        g = y(() => Array.isArray(e) ? e.map(s => I(s)) : [I(e)]),
        d = K(g, s => {
            if (i(), o.value && t) {
                r = new ResizeObserver(n);
                for (const c of s) c && r.observe(c, l)
            }
        }, {
            immediate: !0,
            flush: "post"
        }),
        f = () => {
            i(), d()
        };
    return be(f), {
        isSupported: o,
        stop: f
    }
}

function wt(e, n = {
    width: 0,
    height: 0
}, a = {}) {
    const {
        window: t = M,
        box: l = "content-box"
    } = a, r = y(() => {
        var s, c;
        return (c = (s = I(e)) == null ? void 0 : s.namespaceURI) == null ? void 0 : c.includes("svg")
    }), o = R(n.width), i = R(n.height), {
        stop: g
    } = ct(e, ([s]) => {
        const c = l === "border-box" ? s.borderBoxSize : l === "content-box" ? s.contentBoxSize : s.devicePixelContentBoxSize;
        if (t && r.value) {
            const b = I(e);
            if (b) {
                const u = b.getBoundingClientRect();
                o.value = u.width, i.value = u.height
            }
        } else if (c) {
            const b = Array.isArray(c) ? c : [c];
            o.value = b.reduce((u, {
                inlineSize: m
            }) => u + m, 0), i.value = b.reduce((u, {
                blockSize: m
            }) => u + m, 0)
        } else o.value = s.contentRect.width, i.value = s.contentRect.height
    }, a);
    me(() => {
        const s = I(e);
        s && (o.value = "offsetWidth" in s ? s.offsetWidth : n.width, i.value = "offsetHeight" in s ? s.offsetHeight : n.height)
    });
    const d = K(() => I(e), s => {
        o.value = s ? n.width : 0, i.value = s ? n.height : 0
    });

    function f() {
        g(), d()
    }
    return {
        width: o,
        height: i,
        stop: f
    }
}
const se = 1;

function St(e, n = {}) {
    const {
        throttle: a = 0,
        idle: t = 200,
        onStop: l = T,
        onScroll: r = T,
        offset: o = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        },
        eventListenerOptions: i = {
            capture: !1,
            passive: !0
        },
        behavior: g = "auto",
        window: d = M,
        onError: f = v => {}
    } = n, s = R(0), c = R(0), b = y({
        get() {
            return s.value
        },
        set(v) {
            m(v, void 0)
        }
    }), u = y({
        get() {
            return c.value
        },
        set(v) {
            m(void 0, v)
        }
    });

    function m(v, A) {
        var w, j, E, q;
        if (!d) return;
        const S = C(e);
        if (!S) return;
        (E = S instanceof Document ? d.document.body : S) == null || E.scrollTo({
            top: (w = C(A)) != null ? w : u.value,
            left: (j = C(v)) != null ? j : b.value,
            behavior: C(g)
        });
        const $ = ((q = S == null ? void 0 : S.document) == null ? void 0 : q.documentElement) || (S == null ? void 0 : S.documentElement) || S;
        b != null && (s.value = $.scrollLeft), u != null && (c.value = $.scrollTop)
    }
    const p = R(!1),
        h = ae({
            left: !0,
            right: !1,
            top: !0,
            bottom: !1
        }),
        k = ae({
            left: !1,
            right: !1,
            top: !1,
            bottom: !1
        }),
        P = v => {
            p.value && (p.value = !1, k.left = !1, k.right = !1, k.top = !1, k.bottom = !1, l(v))
        },
        x = it(P, a + t),
        U = v => {
            var A;
            if (!d) return;
            const w = ((A = v == null ? void 0 : v.document) == null ? void 0 : A.documentElement) || (v == null ? void 0 : v.documentElement) || I(v),
                {
                    display: j,
                    flexDirection: E
                } = getComputedStyle(w),
                q = w.scrollLeft;
            k.left = q < s.value, k.right = q > s.value;
            const S = Math.abs(q) <= (o.left || 0),
                $ = Math.abs(q) + w.clientWidth >= w.scrollWidth - (o.right || 0) - se;
            j === "flex" && E === "row-reverse" ? (h.left = $, h.right = S) : (h.left = S, h.right = $), s.value = q;
            let O = w.scrollTop;
            v === d.document && !O && (O = d.document.body.scrollTop), k.top = O < c.value, k.bottom = O > c.value;
            const Z = Math.abs(O) <= (o.top || 0),
                ee = Math.abs(O) + w.clientHeight >= w.scrollHeight - (o.bottom || 0) - se;
            j === "flex" && E === "column-reverse" ? (h.top = ee, h.bottom = Z) : (h.top = Z, h.bottom = ee), c.value = O
        },
        Y = v => {
            var A;
            if (!d) return;
            const w = (A = v.target.documentElement) != null ? A : v.target;
            U(w), p.value = !0, x(v), r(v)
        };
    return oe(e, "scroll", a ? ot(Y, a, !0, !1) : Y, i), me(() => {
        try {
            const v = C(e);
            if (!v) return;
            U(v)
        } catch (v) {
            f(v)
        }
    }), oe(e, "scrollend", P, i), {
        x: b,
        y: u,
        isScrolling: p,
        arrivedState: h,
        directions: k,
        measure() {
            const v = C(e);
            d && v && U(v)
        }
    }
}
const X = {
        to: {
            type: [String, Object],
            default: void 0,
            required: !1
        },
        href: {
            type: [String, Object],
            default: void 0,
            required: !1
        },
        target: {
            type: String,
            default: void 0,
            required: !1
        },
        rel: {
            type: String,
            default: void 0,
            required: !1
        },
        noRel: {
            type: Boolean,
            default: void 0,
            required: !1
        },
        prefetch: {
            type: Boolean,
            default: void 0,
            required: !1
        },
        noPrefetch: {
            type: Boolean,
            default: void 0,
            required: !1
        },
        activeClass: {
            type: String,
            default: void 0,
            required: !1
        },
        exactActiveClass: {
            type: String,
            default: void 0,
            required: !1
        },
        prefetchedClass: {
            type: String,
            default: void 0,
            required: !1
        },
        replace: {
            type: Boolean,
            default: void 0,
            required: !1
        },
        ariaCurrentValue: {
            type: String,
            default: void 0,
            required: !1
        },
        external: {
            type: Boolean,
            default: void 0,
            required: !1
        }
    },
    dt = e => Object.keys(X).reduce((a, t) => (e[t] !== void 0 && (a[t] = e[t]), a), {}),
    ft = {
        base: "focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0",
        font: "font-medium",
        rounded: "rounded-md",
        truncate: "text-left break-all line-clamp-1",
        block: "w-full flex justify-center items-center",
        inline: "inline-flex items-center",
        size: {
            "2xs": "text-xs",
            xs: "text-xs",
            sm: "text-sm",
            md: "text-sm",
            lg: "text-sm",
            xl: "text-base"
        },
        gap: {
            "2xs": "gap-x-1",
            xs: "gap-x-1.5",
            sm: "gap-x-1.5",
            md: "gap-x-2",
            lg: "gap-x-2.5",
            xl: "gap-x-2.5"
        },
        padding: {
            "2xs": "px-2 py-1",
            xs: "px-2.5 py-1.5",
            sm: "px-2.5 py-1.5",
            md: "px-3 py-2",
            lg: "px-3.5 py-2.5",
            xl: "px-3.5 py-2.5"
        },
        square: {
            "2xs": "p-1",
            xs: "p-1.5",
            sm: "p-1.5",
            md: "p-2",
            lg: "p-2.5",
            xl: "p-2.5"
        },
        color: {
            white: {
                solid: "shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-900 dark:text-white bg-white hover:bg-gray-50 disabled:bg-white dark:bg-gray-900 dark:hover:bg-gray-800/50 dark:disabled:bg-gray-900 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",
                ghost: "text-gray-900 dark:text-white hover:bg-white dark:hover:bg-gray-900 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400"
            },
            gray: {
                solid: "shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-700 dark:text-gray-200 bg-gray-50 hover:bg-gray-100 disabled:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700/50 dark:disabled:bg-gray-800 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",
                ghost: "text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",
                link: "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 underline-offset-4 hover:underline focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400"
            },
            black: {
                solid: "shadow-sm text-white dark:text-gray-900 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-900 dark:bg-white dark:hover:bg-gray-100 dark:disabled:bg-white focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",
                link: "text-gray-900 dark:text-white underline-offset-4 hover:underline focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400"
            }
        },
        variant: {
            solid: "shadow-sm text-white dark:text-gray-900 bg-{color}-500 hover:bg-{color}-600 disabled:bg-{color}-500 dark:bg-{color}-400 dark:hover:bg-{color}-500 dark:disabled:bg-{color}-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-{color}-500 dark:focus-visible:outline-{color}-400",
            outline: "ring-1 ring-inset ring-current text-{color}-500 dark:text-{color}-400 hover:bg-{color}-50 disabled:bg-transparent dark:hover:bg-{color}-950 dark:disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-{color}-500 dark:focus-visible:ring-{color}-400",
            soft: "text-{color}-500 dark:text-{color}-400 bg-{color}-50 hover:bg-{color}-100 disabled:bg-{color}-50 dark:bg-{color}-950 dark:hover:bg-{color}-900 dark:disabled:bg-{color}-950 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-{color}-500 dark:focus-visible:ring-{color}-400",
            ghost: "text-{color}-500 dark:text-{color}-400 hover:bg-{color}-50 disabled:bg-transparent dark:hover:bg-{color}-950 dark:disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-{color}-500 dark:focus-visible:ring-{color}-400",
            link: "text-{color}-500 hover:text-{color}-600 disabled:text-{color}-500 dark:text-{color}-400 dark:hover:text-{color}-500 dark:disabled:text-{color}-400 underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-{color}-500 dark:focus-visible:ring-{color}-400"
        },
        icon: {
            base: "flex-shrink-0",
            loading: "animate-spin",
            size: {
                "2xs": "h-4 w-4",
                xs: "h-4 w-4",
                sm: "h-5 w-5",
                md: "h-5 w-5",
                lg: "h-5 w-5",
                xl: "h-6 w-6"
            }
        },
        default: {
            size: "sm",
            variant: "solid",
            color: "primary",
            loadingIcon: "i-heroicons-arrow-path-20-solid"
        }
    },
    vt = Q({
        inheritAttrs: !1,
        props: { ...X,
            as: {
                type: String,
                default: "button"
            },
            type: {
                type: String,
                default: "button"
            },
            disabled: {
                type: Boolean,
                default: null
            },
            active: {
                type: Boolean,
                default: void 0
            },
            exact: {
                type: Boolean,
                default: !1
            },
            exactQuery: {
                type: Boolean,
                default: !1
            },
            exactHash: {
                type: Boolean,
                default: !1
            },
            inactiveClass: {
                type: String,
                default: void 0
            }
        },
        setup(e) {
            function n(a, t, {
                isActive: l,
                isExactActive: r
            }) {
                return e.exactQuery && !Ne(a.query, t.query) || e.exactHash && a.hash !== t.hash ? e.inactiveClass : e.exact && r || !e.exact && l ? e.activeClass : e.inactiveClass
            }
            return {
                resolveLinkClass: n
            }
        }
    }),
    gt = ["href", "aria-disabled", "role", "rel", "target", "onClick"];

function bt(e, n, a, t, l, r) {
    const o = Xe;
    return e.to ? (L(), z(o, D({
        key: 1
    }, e.$props, {
        custom: ""
    }), {
        default: G(({
            route: i,
            href: g,
            target: d,
            rel: f,
            navigate: s,
            isActive: c,
            isExactActive: b,
            isExternal: u
        }) => [_e("a", D(e.$attrs, {
            href: e.disabled ? void 0 : g,
            "aria-disabled": e.disabled ? "true" : void 0,
            role: e.disabled ? "link" : void 0,
            rel: f,
            target: d,
            class: e.active !== void 0 ? e.active ? e.activeClass : e.inactiveClass : e.resolveLinkClass(i, e._.provides[De] || e.$route, {
                isActive: c,
                isExactActive: b
            }),
            onClick: m => !u && !e.disabled && s(m)
        }), [_(e.$slots, "default", ne(re({
            isActive: e.active !== void 0 ? e.active : e.exact ? b : c
        })))], 16, gt)]),
        _: 3
    }, 16)) : (L(), z(ze(e.as), D({
        key: 0,
        type: e.type,
        disabled: e.disabled
    }, e.$attrs, {
        class: e.active ? e.activeClass : e.inactiveClass
    }), {
        default: G(() => [_(e.$slots, "default", ne(re({
            isActive: e.active
        })))]),
        _: 3
    }, 16, ["type", "disabled", "class"]))
}
const ye = ve(vt, [
    ["render", bt]
]);

function ht({
    ui: e,
    props: n
}) {
    const a = J();
    if (Me("ButtonGroupContextConsumer", !0), le("ButtonGroupContextConsumer", !1)) return {
        size: y(() => n.size),
        rounded: y(() => e.value.rounded)
    };
    let l = a.parent,
        r;
    for (; l && !r;) {
        if (l.type.name === "ButtonGroup") {
            r = le(`group-${l.uid}`);
            break
        }
        l = l.parent
    }
    const o = y(() => r == null ? void 0 : r.value.children.indexOf(a));
    return N(() => {
        r == null || r.value.register(a)
    }), Ue(() => {
        r == null || r.value.unregister(a)
    }), {
        size: y(() => (r == null ? void 0 : r.value.size) || n.size),
        rounded: y(() => !r || o.value === -1 ? e.value.rounded : r.value.children.length === 1 ? r.value.ui.rounded : o.value === 0 ? r.value.rounded.start : o.value === r.value.children.length - 1 ? r.value.rounded.end : "rounded-none")
    }
}
const B = He(F.ui.strategy, F.ui.button, ft),
    mt = Q({
        components: {
            UIcon: fe,
            ULink: ye
        },
        inheritAttrs: !1,
        props: { ...X,
            type: {
                type: String,
                default: "button"
            },
            block: {
                type: Boolean,
                default: !1
            },
            label: {
                type: String,
                default: null
            },
            loading: {
                type: Boolean,
                default: !1
            },
            disabled: {
                type: Boolean,
                default: !1
            },
            padded: {
                type: Boolean,
                default: !0
            },
            size: {
                type: String,
                default: () => B.default.size,
                validator(e) {
                    return Object.keys(B.size).includes(e)
                }
            },
            color: {
                type: String,
                default: () => B.default.color,
                validator(e) {
                    return [...F.ui.colors, ...Object.keys(B.color)].includes(e)
                }
            },
            variant: {
                type: String,
                default: () => B.default.variant,
                validator(e) {
                    return [...Object.keys(B.variant), ...Object.values(B.color).flatMap(n => Object.keys(n))].includes(e)
                }
            },
            icon: {
                type: String,
                default: null
            },
            loadingIcon: {
                type: String,
                default: () => B.default.loadingIcon
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
            square: {
                type: Boolean,
                default: !1
            },
            truncate: {
                type: Boolean,
                default: !1
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
        setup(e, {
            slots: n
        }) {
            const {
                ui: a,
                attrs: t
            } = Qe("button", Ve(e, "ui"), B), {
                size: l,
                rounded: r
            } = ht({
                ui: a,
                props: e
            }), o = y(() => e.icon && e.leading || e.icon && !e.trailing || e.loading && !e.trailing || e.leadingIcon), i = y(() => e.icon && e.trailing || e.loading && e.trailing || e.trailingIcon), g = y(() => e.square || !n.default && !e.label), d = y(() => {
                var p, h;
                const m = ((h = (p = a.value.color) == null ? void 0 : p[e.color]) == null ? void 0 : h[e.variant]) || a.value.variant[e.variant];
                return We(H(a.value.base, a.value.font, r.value, a.value.size[l.value], a.value.gap[l.value], e.padded && a.value[g.value ? "square" : "padding"][l.value], m == null ? void 0 : m.replaceAll("{color}", e.color), e.block ? a.value.block : a.value.inline), e.class)
            }), f = y(() => e.loading ? e.loadingIcon : e.leadingIcon || e.icon), s = y(() => e.loading && !o.value ? e.loadingIcon : e.trailingIcon || e.icon), c = y(() => H(a.value.icon.base, a.value.icon.size[l.value], e.loading && a.value.icon.loading)), b = y(() => H(a.value.icon.base, a.value.icon.size[l.value], e.loading && !o.value && a.value.icon.loading)), u = y(() => dt(e));
            return {
                ui: a,
                attrs: t,
                isLeading: o,
                isTrailing: i,
                isSquare: g,
                buttonClass: d,
                leadingIconName: f,
                trailingIconName: s,
                leadingIconClass: c,
                trailingIconClass: b,
                linkProps: u
            }
        }
    });

function yt(e, n, a, t, l, r) {
    const o = fe,
        i = ye;
    return L(), z(i, D({
        type: e.type,
        disabled: e.disabled || e.loading,
        class: e.buttonClass
    }, { ...e.linkProps,
        ...e.attrs
    }), {
        default: G(() => [_(e.$slots, "leading", {
            disabled: e.disabled,
            loading: e.loading
        }, () => [e.isLeading && e.leadingIconName ? (L(), z(o, {
            key: 0,
            name: e.leadingIconName,
            class: V(e.leadingIconClass),
            "aria-hidden": "true"
        }, null, 8, ["name", "class"])) : W("", !0)]), _(e.$slots, "default", {}, () => [e.label ? (L(), Ge("span", {
            key: 0,
            class: V([e.truncate ? e.ui.truncate : ""])
        }, Fe(e.label), 3)) : W("", !0)]), _(e.$slots, "trailing", {
            disabled: e.disabled,
            loading: e.loading
        }, () => [e.isTrailing && e.trailingIconName ? (L(), z(o, {
            key: 0,
            name: e.trailingIconName,
            class: V(e.trailingIconClass),
            "aria-hidden": "true"
        }, null, 8, ["name", "class"])) : W("", !0)])]),
        _: 3
    }, 16, ["type", "disabled", "class"])
}
const Ct = ve(mt, [
    ["render", yt]
]);
export {
    Ct as _, wt as a, ct as b, it as c, I as d, Xe as e, ht as f, dt as g, St as u
};