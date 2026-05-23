import {
    _ as v1
} from "./Divider.DMu9loxT.js";
import {
    a as y1,
    d as b1,
    b as w1,
    e as k1,
    c as I1
} from "./chipsetting.D-MgVFkH.js";
import {
    _ as $1
} from "./newGlobalMulti.CGPOld5X.js";
import {
    a1 as M1,
    z as P1,
    C as H1,
    a2 as z,
    j as G1,
    u as l,
    k as j,
    w as L1,
    a3 as E1,
    a4 as O1,
    l as T1,
    c,
    R as Z1,
    $ as p,
    r as e1,
    N as P,
    a as u,
    b as s,
    t as m,
    v as g,
    n as E,
    e as w,
    m as S1,
    F as H,
    d as G,
    x as O,
    q as v,
    y as M,
    g as r,
    _ as V1,
    p as z1,
    i as B1,
    f as A,
    I as T,
    O as Z
} from "./entry.BFNHJ093.js";
import {
    b as D1
} from "./shuffling.XZhqFkC3.js";
import {
    _ as R1
} from "./_plugin-vue_export-helper.DlAUqK2U.js";
import "./Icon.BriSQLkb.js";
import "./Icon.DDQP7vzt.js";
import "./index.CAZilBRX.js";
import "./p.DiIRZ5QN.js";
import "./videoLoad.Cd0hhZqh.js";
import "./close.BqjWTNPe.js";
import "./Skeleton.AP6HsXEx.js";
import "./lottie-web-vue.Do31YJ3k.js";

function A1() {
    let e = [];
    return {
        cleanup: () => {
            e = e.filter(n => (n(), !1))
        },
        onCleanup: n => {
            e.push(n)
        }
    }
}

function N1(e) {
    let t = () => {};
    const i = new Promise(d => {
        t = () => {
            e(), d()
        }
    });
    return {
        promise: i,
        resolvePromise: t,
        onResolvedPromise: d => {
            i.then(d)
        }
    }
}

function j1(e) {
    const t = e.effect.fn,
        i = e.render;
    e.render = (...n) => {
        e.effect.fn = () => i(...n);
        const d = e.effect.run();
        return e.effect.fn = t, e.render = i, d
    }
}
const W1 = e => typeof e == "function",
    F1 = e => e !== null && typeof e == "object";

function R(e, t) {
    if (M1(e) && (t(e), e.children !== null)) {
        if (Array.isArray(e.children)) {
            e.children.forEach(i => R(i, t));
            return
        }
        F1(e.children) && Object.keys(e.children).forEach(i => {
            if (!W1(e.children[i])) return;
            const n = e.children[i]();
            if (Array.isArray(n)) {
                n.forEach(d => R(d, t));
                return
            }
            R(n, t)
        })
    }
}

function U1(e) {
    var t, i;
    return ((t = e.type) == null ? void 0 : t.__asyncLoader) && ((i = e.type) == null ? void 0 : i.name) === "AsyncComponentWrapper"
}

function q1({
    subTree: e
}, t) {
    const i = [];
    if (R(e, n => {
            U1(n) && i.push(n.type.__asyncLoader())
        }), i.length > 0) {
        Promise.all(i).then(t);
        return
    }
    t()
}

function Y1(e) {
    if (!e || !e.subTree) return;
    const t = e.subTree.el,
        i = e.u;
    e.u === null && (e.u = []), e.u.push(() => {
        e.subTree.el === null && (e.subTree.el = t), e.u = i
    })
}

function J1() {
    const e = z();
    if (!e || e.isMounted) throw new Error("useLazyHydration must be called from the setup method.");
    const t = e.vnode.el !== null;
    if (e.vnode.type.__isLazilyHydrated = !0, !t) return {
        willPerformHydration: t,
        onHydrated: () => {}
    };
    const {
        cleanup: i,
        onCleanup: n
    } = A1(), {
        promise: d,
        resolvePromise: f,
        onResolvedPromise: h
    } = N1(i), y = C => h(() => G1(() => q1(e, C)));
    return e.type.__asyncLoader = () => d, Y1(e.parent), P1(() => {
        e.asyncDep = new Promise(C => {
            C(!0)
        })
    }), h(() => {
        j1(e), e.asyncDep = null
    }), H1(i), {
        willPerformHydration: t,
        hydrate: f,
        onHydrated: y,
        onCleanup: n
    }
}

function K1({
    willPerformHydration: e,
    hydrate: t,
    onCleanup: i
}, n = 2e3) {
    if (!e) return;
    if (!z()) throw new Error("useHydrateWhenIdle must be called from the setup or lifecycle hook methods.");
    if (!("requestIdleCallback" in window)) {
        t();
        return
    }
    const d = requestIdleCallback(() => {
        t()
    }, {
        timeout: n
    });
    i(() => {
        cancelIdleCallback(d)
    })
}
const l1 = {
        ELEMENT: 1,
        TEXT: 3,
        COMMENT: 8
    },
    o1 = e => e && e.nodeType === l1.ELEMENT,
    a1 = e => e && e.nodeType === l1.COMMENT,
    X1 = e => a1(e) && (e == null ? void 0 : e.data) === "[",
    Q1 = e => a1(e) && (e == null ? void 0 : e.data) === "]";

function n1({
    vnode: e,
    subTree: t
}) {
    if (!e || e.el === null) return [];
    if (o1(e.el)) return [e.el];
    const i = [];
    if (t && X1(t.el) && Q1(t.anchor)) {
        let n = e.el.nextSibling;
        for (; n;) {
            if (n && o1(n) && i.push(n), n === t.anchor) return i;
            n = n.nextSibling
        }
    }
    return i
}

function x1({
    willPerformHydration: e,
    hydrate: t,
    onCleanup: i
}, n = ["focus"]) {
    if (!e) return;
    const d = z();
    if (!d || d.isMounted) throw new Error("useHydrateOnInteraction must be called from the setup method.");
    const f = l(n);
    j(() => {
        const h = n1(d),
            y = h.length > 1 ? h[0].parentElement || document : h[0],
            C = {
                capture: !0,
                once: !1,
                passive: !0
            },
            S = _ => {
                _.stopPropagation();
                const V = _.composedPath && _.composedPath() || _.path;
                if (!V) {
                    let b = _.target;
                    for (; b;) {
                        if (h.includes(b)) {
                            t();
                            return
                        }
                        if (b === y) return;
                        b = b.parentElement
                    }
                    return
                }
                h.forEach(b => {
                    V.includes(b) && t()
                })
            };
        f.forEach(_ => {
            y.addEventListener(_, S, C)
        }), i(() => {
            f.forEach(_ => {
                y.removeEventListener(_, S, C)
            })
        })
    })
}

function ee({
    willPerformHydration: e,
    hydrate: t,
    onCleanup: i
}, n) {
    if (!e) return;
    if (!z()) throw new Error("useHydrateWhenTriggered must be called from the setup or lifecycle hook methods.");
    const d = L1(E1(n) ? n : () => n, f => {
        f && t()
    }, {
        immediate: !0
    });
    i(d)
}
const N = new Map;

function oe(e) {
    const t = typeof IntersectionObserver < "u";
    if (!t) return {
        supported: t
    };
    const i = JSON.stringify(e);
    if (N.has(i)) return {
        supported: t,
        observer: N.get(i)
    };
    const n = new IntersectionObserver(d => {
        d.forEach(f => {
            !(f.isIntersecting || f.intersectionRatio > 0) || !f.target.hydrate || f.target.hydrate()
        })
    }, e);
    return N.set(i, n), {
        supported: t,
        observer: n
    }
}

function te({
    willPerformHydration: e,
    hydrate: t,
    onCleanup: i
}, n) {
    if (!e) return;
    const d = z();
    if (!d || d.isMounted) throw new Error("useHydrateWhenVisible must be called from the setup method.");
    const {
        supported: f,
        observer: h
    } = oe(n);
    if (!f) {
        t();
        return
    }
    j(() => {
        const y = n1(d);
        y.forEach(C => {
            C.hydrate = t, h.observe(C)
        }), i(() => {
            y.forEach(C => {
                delete C.hydrate, h.unobserve(C)
            })
        })
    })
}
const t1 = e => e.length === 1 ? e[0] : e,
    le = T1({
        name: "LazyHydrationWrapper",
        inheritAttrs: !1,
        suspensible: !1,
        props: {
            whenIdle: {
                default: !1,
                type: [Boolean, Number]
            },
            whenVisible: {
                default: !1,
                type: [Boolean, Object]
            },
            onInteraction: {
                default: !1,
                type: [Array, Boolean, String]
            },
            whenTriggered: {
                default: void 0,
                type: [Boolean, Object]
            }
        },
        emits: ["hydrated"],
        setup(e, {
            slots: t,
            emit: i
        }) {
            const n = J1();
            if (!n.willPerformHydration) return () => t1(t.default());
            if (n.onHydrated(() => i("hydrated")), e.whenIdle && K1(n, e.whenIdle !== !0 ? e.whenIdle : void 0), e.whenVisible && te(n, e.whenVisible !== !0 ? e.whenVisible : void 0), e.onInteraction) {
                let d;
                e.onInteraction !== !0 && (d = c(() => Array.isArray(e.onInteraction) ? e.onInteraction : [e.onInteraction]).value), x1(n, d)
            }
            return e.whenTriggered !== void 0 && ee(n, Z1(e, "whenTriggered")), () => t1(t.default())
        }
    }),
    ae = O1(le),
    W = e => (z1("data-v-f7d1304e"), e = e(), B1(), e),
    ne = {
        class: "desktop-container"
    },
    ie = {
        class: "lobby-content"
    },
    se = {
        class: "top-head gap-4"
    },
    re = {
        class: "name-zone gap-4"
    },
    de = {
        class: "font24-20 block-newline"
    },
    ce = ["fill"],
    pe = A('<g clip-path="url(#clip0_2770_237451)" data-v-f7d1304e><path fill-rule="evenodd" clip-rule="evenodd" d="M5.71429 0.499634C2.55837 0.499634 0 3.058 0 6.21392C0 9.36983 2.55837 11.9282 5.71429 11.9282C8.87023 11.9282 11.4285 9.36983 11.4285 6.21392C11.4285 3.058 8.87023 0.499634 5.71429 0.499634ZM5.71429 1.64249C3.18956 1.64249 1.14285 3.68919 1.14285 6.21392C1.14285 8.73865 3.18956 10.7853 5.71429 10.7853C8.23902 10.7853 10.2857 8.73865 10.2857 6.21392C10.2857 3.68919 8.23902 1.64249 5.71429 1.64249Z" fill="#fill" data-v-f7d1304e></path><path fill-rule="evenodd" clip-rule="evenodd" d="M17.7143 0.5C14.5584 0.5 12 3.05837 12 6.21428C12 9.3702 14.5584 11.9286 17.7143 11.9286C20.8702 11.9286 23.4285 9.3702 23.4285 6.21428C23.4285 3.05837 20.8702 0.5 17.7143 0.5ZM17.7143 1.64286C15.1896 1.64286 13.1429 3.68955 13.1429 6.21428C13.1429 8.73902 15.1896 10.7857 17.7143 10.7857C20.239 10.7857 22.2857 8.73902 22.2857 6.21428C22.2857 3.68955 20.239 1.64286 17.7143 1.64286Z" fill="#fill" data-v-f7d1304e></path><path d="M17.6153 8.5H16.2653C16.1333 8.5 16.0613 8.428 16.0613 8.296V4.504C16.0613 4.372 16.1333 4.3 16.2653 4.3H17.5433C18.4673 4.3 19.0013 4.708 19.0013 5.398C19.0013 5.842 18.7793 6.142 18.3353 6.31C18.8873 6.454 19.1753 6.796 19.1753 7.318C19.1753 8.068 18.6053 8.5 17.6153 8.5ZM16.9073 7.906H17.5853C18.0893 7.906 18.3773 7.672 18.3773 7.258C18.3773 6.856 18.0893 6.616 17.5853 6.616H17.0693L17.1833 6.058H17.5193C17.9753 6.058 18.2393 5.848 18.2393 5.476C18.2393 5.11 17.9813 4.894 17.5193 4.894H16.9073C16.8593 4.894 16.8293 4.924 16.8293 4.972V7.828C16.8293 7.876 16.8593 7.906 16.9073 7.906Z" fill="#fill" data-v-f7d1304e></path><path d="M1.23278 17.8784C0.859461 17.7631 0.505109 17.5696 0.195471 17.2979C0.0679889 17.772 0 18.2706 0 18.7851C0 21.941 2.55837 24.4994 5.71428 24.4994C8.87021 24.4994 11.4286 21.941 11.4286 18.7851C11.4286 15.6292 8.87021 13.0709 5.71428 13.0709C5.20004 13.0709 4.70167 13.1387 4.22764 13.2661C4.49937 13.5758 4.69284 13.9301 4.80804 14.3035C5.10096 14.2446 5.40402 14.2137 5.71428 14.2137C8.23902 14.2137 10.2857 16.2604 10.2857 18.7851C10.2857 21.3099 8.23902 23.3566 5.71428 23.3566C3.18955 23.3566 1.14286 21.3099 1.14286 18.7851C1.14286 18.4746 1.1738 18.1715 1.23278 17.8784Z" fill="#fill" data-v-f7d1304e></path><path d="M2.07757 16.863C3.02434 16.863 3.79186 16.0955 3.79186 15.1487C3.79186 14.2019 3.02434 13.4345 2.07757 13.4345C1.1308 13.4345 0.363281 14.2019 0.363281 15.1487C0.363281 16.0955 1.1308 16.863 2.07757 16.863Z" fill="#fill" data-v-f7d1304e></path><path d="M4.94388 8.5H4.16388V4.504C4.16388 4.378 4.23588 4.3 4.36788 4.3H5.66988C6.61188 4.3 7.14588 4.774 7.14588 5.62C7.14588 6.442 6.61788 6.904 5.66988 6.904H5.14788L5.26188 6.316H5.62788C6.10788 6.316 6.38988 6.064 6.38988 5.626C6.38988 5.188 6.10788 4.936 5.62788 4.936H5.02188C4.97388 4.936 4.94388 4.966 4.94388 5.014V8.5Z" fill="#fill" data-v-f7d1304e></path></g><defs data-v-f7d1304e><clipPath id="clip0_2770_237451" data-v-f7d1304e><rect width="24" height="24" fill="white" transform="translate(0 0.5)" data-v-f7d1304e></rect></clipPath></defs>', 2),
    ue = [pe],
    fe = ["fill"],
    he = A('<g clip-path="url(#clip0_2770_237472)" data-v-f7d1304e><path fill-rule="evenodd" clip-rule="evenodd" d="M5.71429 0.499634C2.55837 0.499634 0 3.058 0 6.21392C0 9.36983 2.55837 11.9282 5.71429 11.9282C8.87023 11.9282 11.4285 9.36983 11.4285 6.21392C11.4285 3.058 8.87023 0.499634 5.71429 0.499634ZM5.71429 1.64249C3.18956 1.64249 1.14285 3.68919 1.14285 6.21392C1.14285 8.73865 3.18956 10.7853 5.71429 10.7853C8.23902 10.7853 10.2857 8.73865 10.2857 6.21392C10.2857 3.68919 8.23902 1.64249 5.71429 1.64249Z" fill="#fill" data-v-f7d1304e></path><path d="M1.23309 17.8783C0.859766 17.7631 0.505414 17.5695 0.195776 17.2978C0.068294 17.772 0.000305176 18.2706 0.000305176 18.785C0.000305176 21.9409 2.55867 24.4993 5.71459 24.4993C8.87051 24.4993 11.4289 21.9409 11.4289 18.785C11.4289 15.6291 8.87051 13.0708 5.71459 13.0708C5.20035 13.0708 4.70198 13.1387 4.22794 13.2661C4.49967 13.5757 4.69314 13.9301 4.80835 14.3035C5.10127 14.2446 5.40432 14.2136 5.71459 14.2136C8.23932 14.2136 10.286 16.2603 10.286 18.785C10.286 21.3098 8.23932 23.3565 5.71459 23.3565C3.18986 23.3565 1.14316 21.3098 1.14316 18.785C1.14316 18.4746 1.17411 18.1714 1.23309 17.8783Z" fill="#fill" data-v-f7d1304e></path><path d="M2.07849 16.863C3.02526 16.863 3.79277 16.0954 3.79277 15.1487C3.79277 14.2019 3.02526 13.4344 2.07849 13.4344C1.13171 13.4344 0.364197 14.2019 0.364197 15.1487C0.364197 16.0954 1.13171 16.863 2.07849 16.863Z" fill="#fill" data-v-f7d1304e></path><path fill-rule="evenodd" clip-rule="evenodd" d="M21.902 1.78918C20.917 0.983188 19.6578 0.499634 18.2858 0.499634C15.1299 0.499634 12.5715 3.058 12.5715 6.21392C12.5715 7.58596 13.0551 8.84506 13.861 9.83012L13.4367 10.2545C13.2135 10.4776 13.2135 10.8394 13.4367 11.0626C13.6598 11.2857 14.0216 11.2857 14.2448 11.0626L14.6692 10.6382C15.6543 11.4445 16.9135 11.9282 18.2858 11.9282C21.4417 11.9282 24.0001 9.36983 24.0001 6.21392C24.0001 4.84165 23.5163 3.58235 22.7101 2.59725L23.1341 2.17325C23.3572 1.9501 23.3572 1.5883 23.1341 1.36514C22.9109 1.14198 22.5491 1.14198 22.326 1.36514L21.902 1.78918ZM18.2858 1.64249C15.7611 1.64249 13.7144 3.68919 13.7144 6.21392C13.7144 7.27021 14.0726 8.24283 14.6742 9.01689L21.0887 2.60237C20.3147 2.00074 19.3421 1.64249 18.2858 1.64249ZM21.8969 3.41044L15.4823 9.82506C16.2565 10.4269 17.2293 10.7853 18.2858 10.7853C20.8105 10.7853 22.8572 8.73865 22.8572 6.21392C22.8572 5.1574 22.4988 4.18458 21.8969 3.41044Z" fill="#fill" data-v-f7d1304e></path></g><defs data-v-f7d1304e><clipPath id="clip0_2770_237472" data-v-f7d1304e><rect width="24" height="24" fill="white" transform="translate(0 0.5)" data-v-f7d1304e></rect></clipPath></defs>', 2),
    Ce = [he],
    ge = {
        class: "control-zone font18-12 block-newline"
    },
    _e = {
        class: "selectType-zone"
    },
    me = {
        class: "flex gap-2"
    },
    ve = {
        class: "online-zone"
    },
    ye = W(() => s("img", {
        src: D1
    }, null, -1)),
    be = {
        class: "text1"
    },
    we = {
        class: "text2"
    },
    ke = W(() => s("img", {
        class: "arrow-btm",
        src: y1
    }, null, -1)),
    Ie = {
        class: "top-head gap-4"
    },
    $e = {
        class: "name-zone gap-4"
    },
    Me = {
        class: "font24-20 block-newline"
    },
    Pe = {
        key: 0,
        class: "top-head gap-4"
    },
    He = {
        class: "name-zone gap-4"
    },
    Ge = {
        class: "font24-20 block-newline"
    },
    Le = {
        class: "top-head gap-4"
    },
    Ee = {
        class: "name-zone gap-4"
    },
    Oe = {
        class: "font24-20 block-newline"
    },
    Te = {
        class: "top-head gap-4"
    },
    Ze = {
        class: "name-zone gap-4"
    },
    Se = {
        class: "font24-20 block-newline"
    },
    Ve = {
        class: "top-head gap-4"
    },
    ze = {
        class: "name-zone gap-4"
    },
    Be = {
        class: "font24-20 block-newline"
    },
    De = {
        class: "top-head gap-4"
    },
    Re = {
        class: "name-zone gap-4"
    },
    Ae = {
        class: "font24-20 block-newline"
    },
    Ne = {
        class: "chip-zone"
    },
    je = ["fill"],
    We = A('<g clip-path="url(#clip0_2770_237451)" data-v-f7d1304e><path fill-rule="evenodd" clip-rule="evenodd" d="M5.71429 0.499634C2.55837 0.499634 0 3.058 0 6.21392C0 9.36983 2.55837 11.9282 5.71429 11.9282C8.87023 11.9282 11.4285 9.36983 11.4285 6.21392C11.4285 3.058 8.87023 0.499634 5.71429 0.499634ZM5.71429 1.64249C3.18956 1.64249 1.14285 3.68919 1.14285 6.21392C1.14285 8.73865 3.18956 10.7853 5.71429 10.7853C8.23902 10.7853 10.2857 8.73865 10.2857 6.21392C10.2857 3.68919 8.23902 1.64249 5.71429 1.64249Z" fill="#fill" data-v-f7d1304e></path><path fill-rule="evenodd" clip-rule="evenodd" d="M17.7143 0.5C14.5584 0.5 12 3.05837 12 6.21428C12 9.3702 14.5584 11.9286 17.7143 11.9286C20.8702 11.9286 23.4285 9.3702 23.4285 6.21428C23.4285 3.05837 20.8702 0.5 17.7143 0.5ZM17.7143 1.64286C15.1896 1.64286 13.1429 3.68955 13.1429 6.21428C13.1429 8.73902 15.1896 10.7857 17.7143 10.7857C20.239 10.7857 22.2857 8.73902 22.2857 6.21428C22.2857 3.68955 20.239 1.64286 17.7143 1.64286Z" fill="#fill" data-v-f7d1304e></path><path d="M17.6153 8.5H16.2653C16.1333 8.5 16.0613 8.428 16.0613 8.296V4.504C16.0613 4.372 16.1333 4.3 16.2653 4.3H17.5433C18.4673 4.3 19.0013 4.708 19.0013 5.398C19.0013 5.842 18.7793 6.142 18.3353 6.31C18.8873 6.454 19.1753 6.796 19.1753 7.318C19.1753 8.068 18.6053 8.5 17.6153 8.5ZM16.9073 7.906H17.5853C18.0893 7.906 18.3773 7.672 18.3773 7.258C18.3773 6.856 18.0893 6.616 17.5853 6.616H17.0693L17.1833 6.058H17.5193C17.9753 6.058 18.2393 5.848 18.2393 5.476C18.2393 5.11 17.9813 4.894 17.5193 4.894H16.9073C16.8593 4.894 16.8293 4.924 16.8293 4.972V7.828C16.8293 7.876 16.8593 7.906 16.9073 7.906Z" fill="black" data-v-f7d1304e></path><path d="M1.23278 17.8784C0.859461 17.7631 0.505109 17.5696 0.195471 17.2979C0.0679889 17.772 0 18.2706 0 18.7851C0 21.941 2.55837 24.4994 5.71428 24.4994C8.87021 24.4994 11.4286 21.941 11.4286 18.7851C11.4286 15.6292 8.87021 13.0709 5.71428 13.0709C5.20004 13.0709 4.70167 13.1387 4.22764 13.2661C4.49937 13.5758 4.69284 13.9301 4.80804 14.3035C5.10096 14.2446 5.40402 14.2137 5.71428 14.2137C8.23902 14.2137 10.2857 16.2604 10.2857 18.7851C10.2857 21.3099 8.23902 23.3566 5.71428 23.3566C3.18955 23.3566 1.14286 21.3099 1.14286 18.7851C1.14286 18.4746 1.1738 18.1715 1.23278 17.8784Z" fill="#fill" data-v-f7d1304e></path><path d="M2.07757 16.863C3.02434 16.863 3.79186 16.0955 3.79186 15.1487C3.79186 14.2019 3.02434 13.4345 2.07757 13.4345C1.1308 13.4345 0.363281 14.2019 0.363281 15.1487C0.363281 16.0955 1.1308 16.863 2.07757 16.863Z" fill="#fill" data-v-f7d1304e></path><path d="M4.94388 8.5H4.16388V4.504C4.16388 4.378 4.23588 4.3 4.36788 4.3H5.66988C6.61188 4.3 7.14588 4.774 7.14588 5.62C7.14588 6.442 6.61788 6.904 5.66988 6.904H5.14788L5.26188 6.316H5.62788C6.10788 6.316 6.38988 6.064 6.38988 5.626C6.38988 5.188 6.10788 4.936 5.62788 4.936H5.02188C4.97388 4.936 4.94388 4.966 4.94388 5.014V8.5Z" fill="#fill" data-v-f7d1304e></path></g><defs data-v-f7d1304e><clipPath id="clip0_2770_237451" data-v-f7d1304e><rect width="24" height="24" fill="white" transform="translate(0 0.5)" data-v-f7d1304e></rect></clipPath></defs>', 2),
    Fe = [We],
    Ue = ["fill"],
    qe = A('<g clip-path="url(#clip0_2770_237472)" data-v-f7d1304e><path fill-rule="evenodd" clip-rule="evenodd" d="M5.71429 0.499634C2.55837 0.499634 0 3.058 0 6.21392C0 9.36983 2.55837 11.9282 5.71429 11.9282C8.87023 11.9282 11.4285 9.36983 11.4285 6.21392C11.4285 3.058 8.87023 0.499634 5.71429 0.499634ZM5.71429 1.64249C3.18956 1.64249 1.14285 3.68919 1.14285 6.21392C1.14285 8.73865 3.18956 10.7853 5.71429 10.7853C8.23902 10.7853 10.2857 8.73865 10.2857 6.21392C10.2857 3.68919 8.23902 1.64249 5.71429 1.64249Z" fill="#fill" data-v-f7d1304e></path><path d="M1.23309 17.8783C0.859766 17.7631 0.505414 17.5695 0.195776 17.2978C0.068294 17.772 0.000305176 18.2706 0.000305176 18.785C0.000305176 21.9409 2.55867 24.4993 5.71459 24.4993C8.87051 24.4993 11.4289 21.9409 11.4289 18.785C11.4289 15.6291 8.87051 13.0708 5.71459 13.0708C5.20035 13.0708 4.70198 13.1387 4.22794 13.2661C4.49967 13.5757 4.69314 13.9301 4.80835 14.3035C5.10127 14.2446 5.40432 14.2136 5.71459 14.2136C8.23932 14.2136 10.286 16.2603 10.286 18.785C10.286 21.3098 8.23932 23.3565 5.71459 23.3565C3.18986 23.3565 1.14316 21.3098 1.14316 18.785C1.14316 18.4746 1.17411 18.1714 1.23309 17.8783Z" fill="#fill" data-v-f7d1304e></path><path d="M2.07849 16.863C3.02526 16.863 3.79277 16.0954 3.79277 15.1487C3.79277 14.2019 3.02526 13.4344 2.07849 13.4344C1.13171 13.4344 0.364197 14.2019 0.364197 15.1487C0.364197 16.0954 1.13171 16.863 2.07849 16.863Z" fill="#fill" data-v-f7d1304e></path><path fill-rule="evenodd" clip-rule="evenodd" d="M21.902 1.78918C20.917 0.983188 19.6578 0.499634 18.2858 0.499634C15.1299 0.499634 12.5715 3.058 12.5715 6.21392C12.5715 7.58596 13.0551 8.84506 13.861 9.83012L13.4367 10.2545C13.2135 10.4776 13.2135 10.8394 13.4367 11.0626C13.6598 11.2857 14.0216 11.2857 14.2448 11.0626L14.6692 10.6382C15.6543 11.4445 16.9135 11.9282 18.2858 11.9282C21.4417 11.9282 24.0001 9.36983 24.0001 6.21392C24.0001 4.84165 23.5163 3.58235 22.7101 2.59725L23.1341 2.17325C23.3572 1.9501 23.3572 1.5883 23.1341 1.36514C22.9109 1.14198 22.5491 1.14198 22.326 1.36514L21.902 1.78918ZM18.2858 1.64249C15.7611 1.64249 13.7144 3.68919 13.7144 6.21392C13.7144 7.27021 14.0726 8.24283 14.6742 9.01689L21.0887 2.60237C20.3147 2.00074 19.3421 1.64249 18.2858 1.64249ZM21.8969 3.41044L15.4823 9.82506C16.2565 10.4269 17.2293 10.7853 18.2858 10.7853C20.8105 10.7853 22.8572 8.73865 22.8572 6.21392C22.8572 5.1574 22.4988 4.18458 21.8969 3.41044Z" fill="#fill" data-v-f7d1304e></path></g><defs data-v-f7d1304e><clipPath id="clip0_2770_237472" data-v-f7d1304e><rect width="24" height="24" fill="white" transform="translate(0 0.5)" data-v-f7d1304e></rect></clipPath></defs>', 2),
    Ye = [qe],
    Je = W(() => s("img", {
        src: b1
    }, null, -1)),
    Ke = [Je],
    Xe = {
        __name: "multiplay",
        props: {
            apiMulti: {
                type: Object
            },
            socket: {
                type: Object
            },
            apiDt: {
                type: Object
            },
            apiSedie: {
                type: Object
            },
            apiSic: {
                type: Object
            },
            apiRou: {
                type: Object
            },
            top6: {
                type: Array
            }
        },
        setup(e) {
            const t = e;
            j(() => {
                p().getOnline()
            });
            const i = c(() => p()._online),
                n = c(() => M()._bettingType),
                d = a => {
                    M().setBetType(a)
                },
                f = e1(),
                h = () => {
                    f.value.toggle()
                },
                y = e1(),
                C = () => {
                    y.value.toggle()
                },
                S = c(() => M()._bacPlacing),
                _ = c(() => M()._bacPlaced),
                V = c(() => M()._dtPlacing),
                b = c(() => M()._dtPlaced),
                B = c(() => M()._endPayOut),
                D = c(() => M()._dialog);
            c(() => T()._seDieTable);
            const i1 = c(() => T()._seDieSocket),
                s1 = c(() => T()._seDiePlacing),
                r1 = c(() => T()._seDiePlaced),
                d1 = c(() => T()._endPayOut),
                c1 = c(() => T()._dialog);
            c(() => P()._sicboTable);
            const F = c(() => P()._sicboSocket),
                U = c(() => P()._sicboPlacing),
                q = c(() => P()._sicboPlaced),
                Y = c(() => P()._endPayOut),
                J = c(() => P()._dialog);
            c(() => Z()._rouletteTableTable);
            const p1 = c(() => Z()._rouletteSocket),
                u1 = c(() => Z()._roulettePlacing),
                f1 = c(() => Z()._roulettePlaced),
                h1 = c(() => Z()._endPayOut),
                C1 = c(() => Z()._dialog),
                K = P().gameTypeOpening;
            return (a, k) => {
                var X, Q, x;
                const I = v1,
                    g1 = w1,
                    $ = $1,
                    L = ae,
                    _1 = k1,
                    m1 = I1;
                return r(), u("div", ne, [s("div", ie, [s("div", se, [s("div", re, [s("div", de, m(a.$t("gooroad")), 1), g(I), ("$storeGlobal" in a ? a.$storeGlobal : l(p))()._sizing === "mobile" ? (r(), u("div", {
                    key: 0,
                    class: "flex border border-golden rounded-[5px] h-[25px]",
                    style: {
                        cursor: "pointer"
                    },
                    onClick: k[0] || (k[0] = o => ("$storeGlobal" in a ? a.$storeGlobal : l(p))().toggleMulView())
                }, [s("div", {
                    class: E(["rounded-[5px] m-[1px] p-[3px]", ("$storeGlobal" in a ? a.$storeGlobal : l(p))()._mulView ? "bg-golden" : ""])
                }, [(r(), u("svg", {
                    width: "17",
                    height: "18",
                    viewBox: "0 0 24 25",
                    fill: ("$storeGlobal" in a ? a.$storeGlobal : l(p))()._mulView ? "black" : "white",
                    xmlns: "http://www.w3.org/2000/svg"
                }, ue, 8, ce))], 2), s("div", {
                    class: E(["rounded-[5px] m-[1px] p-[3px]", ("$storeGlobal" in a ? a.$storeGlobal : l(p))()._mulView === !1 ? "bg-golden" : ""])
                }, [(r(), u("svg", {
                    width: "17",
                    height: "18",
                    viewBox: "0 0 24 25",
                    fill: ("$storeGlobal" in a ? a.$storeGlobal : l(p))()._mulView === !1 ? "black" : "gray",
                    xmlns: "http://www.w3.org/2000/svg"
                }, Ce, 8, fe))], 2)])) : w("", !0)]), s("div", ge, [s("div", _e, [s("div", {
                    class: E(["type-btn clickActive", l(n) === "Baccarat" ? "active" : ""]),
                    onClick: k[1] || (k[1] = o => d("Baccarat"))
                }, m(a.$t("classic")), 3), ("$storeGlobal" in a ? a.$storeGlobal : l(p))()._isClassic ? w("", !0) : (r(), u("div", {
                    key: 0,
                    class: E(["type-btn clickActive", l(n) === "4Point" ? "active" : ""]),
                    onClick: k[2] || (k[2] = o => d("4Point"))
                }, m(a.$t("4point")), 3))]), s("div", me, [s("div", ve, [ye, S1(" " + m(("useCur" in a ? a.useCur : l(V1))(l(i)[0].online)), 1)]), s("div", {
                    class: "betLimit-zone clickActive",
                    onClick: h
                }, [s("div", be, m(a.$t("betlimit")) + " : ", 1), s("div", we, m(("$storeGlobal" in a ? a.$storeGlobal : l(p))().limitStr), 1), ke]), g(g1, {
                    ref_key: "betLimitDialog",
                    ref: f
                }, null, 512)])])]), (r(!0), u(H, null, G(e.top6, o => (r(), u("div", {
                    key: o.roomId
                }, [o.type === "Baccarat" ? (r(), v($, {
                    key: 0,
                    api: o,
                    socket: t.socket[o.roomId],
                    placing: l(S)[o.roomId],
                    placed: l(_)[o.roomId],
                    "end-pay-out": l(B)[o.roomId],
                    dialog: l(D)[o.roomId],
                    game: "bac"
                }, null, 8, ["api", "socket", "placing", "placed", "end-pay-out", "dialog"])) : (r(), v($, {
                    key: o.roomId,
                    api: o,
                    socket: t.socket[o.roomId],
                    placing: l(V)[o.roomId],
                    placed: l(b)[o.roomId],
                    "end-pay-out": l(B)[o.roomId],
                    dialog: l(D)[o.roomId],
                    game: "dt"
                }, null, 8, ["api", "socket", "placing", "placed", "end-pay-out", "dialog"]))]))), 128)), s("div", Ie, [s("div", $e, [s("div", Me, m(a.$t("baccarat")), 1), g(I)])]), (r(!0), u(H, null, G(t.apiMulti, o => (r(), u("div", {
                    key: o.roomId
                }, [g(L, {
                    "when-visible": ""
                }, {
                    default: O(() => [g($, {
                        api: o,
                        socket: t.socket[o.roomId],
                        placing: l(S)[o.roomId],
                        placed: l(_)[o.roomId],
                        "end-pay-out": l(B)[o.roomId],
                        dialog: l(D)[o.roomId],
                        game: "bac"
                    }, null, 8, ["api", "socket", "placing", "placed", "end-pay-out", "dialog"])]),
                    _: 2
                }, 1024)]))), 128)), g(L, {
                    "when-visible": ""
                }, {
                    default: O(() => [t.apiDt[0] ? (r(), u("div", Pe, [s("div", He, [s("div", Ge, m(a.$t("dragontiger")), 1), g(I)])])) : w("", !0), (r(!0), u(H, null, G(t.apiDt, o => (r(), v($, {
                        key: o.roomId,
                        api: o,
                        socket: t.socket[o.roomId],
                        placing: l(V)[o.roomId],
                        placed: l(b)[o.roomId],
                        "end-pay-out": l(B)[o.roomId],
                        dialog: l(D)[o.roomId],
                        game: "dt"
                    }, null, 8, ["api", "socket", "placing", "placed", "end-pay-out", "dialog"]))), 128))]),
                    _: 1
                }), l(K).sicBo && t.apiSic[0] ? (r(), v(L, {
                    key: 0,
                    "when-visible": ""
                }, {
                    default: O(() => [s("div", Le, [s("div", Ee, [s("div", Oe, m(a.$t("sicbo")), 1), g(I)])]), (r(!0), u(H, null, G(t.apiSic, o => (r(), v($, {
                        key: o.roomId,
                        api: o,
                        socket: l(F)[o.roomId],
                        placing: l(U)[o.roomId],
                        placed: l(q)[o.roomId],
                        "end-pay-out": l(Y)[o.roomId],
                        dialog: l(J)[o.roomId],
                        game: "SicBo"
                    }, null, 8, ["api", "socket", "placing", "placed", "end-pay-out", "dialog"]))), 128))]),
                    _: 1
                })) : w("", !0), l(K).thaiHilo && t.apiSic[0] && ((X = ("$storeGlobal" in a ? a.$storeGlobal : l(p))()._profile) == null ? void 0 : X.currency[0]) !== "MYR" ? (r(), v(L, {
                    key: 1,
                    "when-visible": ""
                }, {
                    default: O(() => [s("div", Te, [s("div", Ze, [s("div", Se, m(a.$t("hilo")), 1), g(I)])]), (r(!0), u(H, null, G(t.apiSic, o => (r(), v($, {
                        key: o.roomId,
                        api: o,
                        socket: l(F)[o.roomId],
                        placing: l(U)[o.roomId],
                        placed: l(q)[o.roomId],
                        "end-pay-out": l(Y)[o.roomId],
                        dialog: l(J)[o.roomId],
                        game: "ThaiHiLo"
                    }, null, 8, ["api", "socket", "placing", "placed", "end-pay-out", "dialog"]))), 128))]),
                    _: 1
                })) : w("", !0), t.apiRou[0] && ((Q = ("$storeGlobal" in a ? a.$storeGlobal : l(p))()._profile) == null ? void 0 : Q.currency[0]) !== "MYR" ? (r(), v(L, {
                    key: 2,
                    "when-visible": ""
                }, {
                    default: O(() => [s("div", Ve, [s("div", ze, [s("div", Be, m(a.$t("roulette")), 1), g(I)])]), (r(!0), u(H, null, G(t.apiRou, o => (r(), v($, {
                        key: o.roomId,
                        api: o,
                        socket: l(p1)[o.roomId],
                        placing: l(u1)[o.roomId],
                        placed: l(f1)[o.roomId],
                        "end-pay-out": l(h1)[o.roomId],
                        dialog: l(C1)[o.roomId],
                        game: "rou"
                    }, null, 8, ["api", "socket", "placing", "placed", "end-pay-out", "dialog"]))), 128))]),
                    _: 1
                })) : w("", !0), t.apiSedie[0] && ((x = ("$storeGlobal" in a ? a.$storeGlobal : l(p))()._profile) == null ? void 0 : x.currency[0]) !== "MYR" ? (r(), v(L, {
                    key: 3,
                    "when-visible": ""
                }, {
                    default: O(() => [s("div", De, [s("div", Re, [s("div", Ae, m(a.$t("sedie")), 1), g(I)])]), (r(!0), u(H, null, G(t.apiSedie, o => (r(), v($, {
                        key: o.roomId,
                        api: o,
                        socket: l(i1)[o.roomId],
                        placing: l(s1)[o.roomId],
                        placed: l(r1)[o.roomId],
                        "end-pay-out": l(d1)[o.roomId],
                        dialog: l(c1)[o.roomId],
                        game: "sed"
                    }, null, 8, ["api", "socket", "placing", "placed", "end-pay-out", "dialog"]))), 128))]),
                    _: 1
                })) : w("", !0)]), s("div", Ne, [("$storeGlobal" in a ? a.$storeGlobal : l(p))()._sizing === "desktop" ? (r(), u("div", {
                    key: 0,
                    class: "flex flex-col border border-golden rounded-[5px]",
                    style: {
                        cursor: "pointer"
                    },
                    onClick: k[3] || (k[3] = o => ("$storeGlobal" in a ? a.$storeGlobal : l(p))().toggleMulView())
                }, [s("div", {
                    class: E(["rounded-[5px] m-[1px] p-[3px]", ("$storeGlobal" in a ? a.$storeGlobal : l(p))()._mulView ? "bg-golden" : ""])
                }, [(r(), u("svg", {
                    width: "24",
                    height: "25",
                    viewBox: "0 0 24 25",
                    fill: ("$storeGlobal" in a ? a.$storeGlobal : l(p))()._mulView ? "black" : "white",
                    xmlns: "http://www.w3.org/2000/svg"
                }, Fe, 8, je))], 2), s("div", {
                    class: E(["rounded-[5px] m-[1px] p-[3px]", ("$storeGlobal" in a ? a.$storeGlobal : l(p))()._mulView === !1 ? "bg-golden" : ""])
                }, [(r(), u("svg", {
                    width: "24",
                    height: "25",
                    viewBox: "0 0 24 25",
                    fill: ("$storeGlobal" in a ? a.$storeGlobal : l(p))()._mulView === !1 ? "black" : "gray",
                    xmlns: "http://www.w3.org/2000/svg"
                }, Ye, 8, Ue))], 2)])) : w("", !0), g(_1), ("$storeGlobal" in a ? a.$storeGlobal : l(p))()._sizing === "desktop" ? (r(), v(I, {
                    key: 1,
                    style: {
                        width: "24px"
                    }
                })) : w("", !0), s("div", {
                    class: "chip-setting clickActive",
                    onClick: C
                }, Ke)]), g(m1, {
                    ref_key: "chipDialog",
                    ref: y
                }, null, 512)])
            }
        }
    },
    u2 = R1(Xe, [
        ["__scopeId", "data-v-f7d1304e"]
    ]);
export {
    u2 as
    default
};