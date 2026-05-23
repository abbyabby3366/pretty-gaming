import {
    _ as Ke
} from "./landing.CE5phuSL.js";
import {
    _ as ye,
    u as we,
    a as Be,
    b as Me
} from "./Button.BIubBBJz.js";
import {
    r as g,
    k as ie,
    C as ge,
    P as Se,
    Q as de,
    l as Pe,
    R as le,
    c as h,
    S as Ne,
    g as d,
    a as m,
    b,
    F as V,
    d as x,
    n as M,
    U as J,
    q as Y,
    V as te,
    e as $,
    $ as _,
    y as oe,
    N as O,
    O as ve,
    I as fe,
    z as be,
    w as me,
    H as Te,
    v as se,
    u as a,
    x as pe,
    h as q,
    t as Q,
    L as Le,
    W as Oe
} from "./entry.BFNHJ093.js";
import {
    u as Re,
    _ as $e
} from "./Icon.BriSQLkb.js";
import {
    _ as he
} from "./_plugin-vue_export-helper.DlAUqK2U.js";
import {
    $ as Ee
} from "./3rdProvider.CU-NExb0.js";
import {
    s as De
} from "./interval.ByBGdkBT.js";
import "./close.BqjWTNPe.js";
import "./Icon.DDQP7vzt.js";
import "./index.CAZilBRX.js";
const ze = {
        wrapper: "relative",
        container: "relative w-full flex overflow-x-auto snap-x snap-mandatory scroll-smooth",
        item: "flex flex-none snap-center",
        arrows: {
            wrapper: "flex items-center justify-between"
        },
        indicators: {
            wrapper: "absolute flex items-center justify-center gap-3 bottom-4 inset-x-0",
            base: "rounded-full h-3 w-3",
            active: "bg-primary-500 dark:bg-primary-400",
            inactive: "bg-gray-100 dark:bg-gray-800 mix-blend-overlay"
        },
        default: {
            prevButton: {
                color: "black",
                class: "rtl:[&_span:first-child]:rotate-180 absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full",
                icon: "i-heroicons-chevron-left-20-solid"
            },
            nextButton: {
                color: "black",
                class: "rtl:[&_span:last-child]:rotate-180 absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full",
                icon: "i-heroicons-chevron-right-20-solid "
            }
        }
    },
    He = o => {
        const R = g(0);

        function p(l) {
            o.value.style.scrollSnapType = "none", o.value.style.scrollBehavior = "auto", R.value = l.pageX, window.addEventListener("mousemove", u), window.addEventListener("mouseup", S)
        }

        function S() {
            o.value.style.removeProperty("scroll-behavior"), o.value.style.removeProperty("scroll-snap-type"), o.value.style.removeProperty("pointer-events"), window.removeEventListener("mousemove", u), window.removeEventListener("mouseup", S)
        }

        function u(l) {
            l.preventDefault(), o.value.style.pointerEvents = "none";
            const n = l.pageX - R.value;
            R.value = l.pageX, o.value.scrollBy(-n, 0)
        }
        ie(() => {
            o.value && o.value.addEventListener("mousedown", p)
        }), ge(() => {
            o.value && o.value.removeEventListener("mousedown", p)
        })
    },
    ae = Se(de.ui.strategy, de.ui.carousel, ze),
    Ue = Pe({
        components: {
            UButton: ye
        },
        inheritAttrs: !1,
        props: {
            items: {
                type: Array,
                default: () => []
            },
            arrows: {
                type: Boolean,
                default: !1
            },
            indicators: {
                type: Boolean,
                default: !1
            },
            prevButton: {
                type: Object,
                default: () => ae.default.prevButton
            },
            nextButton: {
                type: Object,
                default: () => ae.default.nextButton
            },
            class: {
                type: [String, Object, Array],
                    default: () => ""
            },
            ui: {
                type: Object,
                default: void 0
            }
        },
        setup(o, {
            expose: R
        }) {
            const {
                ui: p,
                attrs: S
            } = Re("carousel", le(o, "ui"), ae, le(o, "class")), u = g(), l = g(0), {
                x: n
            } = we(u, {
                behavior: "smooth"
            }), {
                width: f
            } = Be(u);
            He(u), Me(u, E => {
                var A, F;
                const [C] = E;
                l.value = ((F = (A = C == null ? void 0 : C.target) == null ? void 0 : A.firstElementChild) == null ? void 0 : F.clientWidth) || 0
            });
            const c = h(() => l.value ? Math.round(n.value / l.value) + 1 : 0),
                D = h(() => l.value ? o.items.length - Math.round(f.value / l.value) + 1 : 0),
                Z = h(() => c.value <= 1),
                y = h(() => c.value === D.value);

            function j() {
                n.value += l.value
            }

            function k() {
                n.value -= l.value
            }

            function z(E) {
                n.value = (E - 1) * l.value
            }
            return R({
                pages: D,
                page: c,
                prev: k,
                next: j,
                select: z
            }), {
                ui: p,
                attrs: S,
                isFirst: Z,
                isLast: y,
                carouselRef: u,
                pages: D,
                currentPage: c,
                onClickNext: j,
                onClickPrev: k,
                onClick: z,
                twMerge: Ne
            }
        }
    }),
    Ve = ["role"],
    xe = ["aria-selected", "aria-label", "onClick"];

function je(o, R, p, S, u, l) {
    const n = ye;
    return d(), m("div", te({
        class: o.ui.wrapper
    }, o.attrs), [b("div", {
        ref: "carouselRef",
        class: M([o.ui.container, "no-scrollbar"])
    }, [(d(!0), m(V, null, x(o.items, (f, c) => (d(), m("div", {
        key: c,
        class: M(o.ui.item),
        role: o.indicators ? "tabpanel" : null
    }, [J(o.$slots, "default", {
        item: f,
        index: c
    }, void 0, !0)], 10, Ve))), 128))], 2), o.arrows ? (d(), m("div", {
        key: 0,
        class: M(o.ui.arrows.wrapper)
    }, [J(o.$slots, "prev", {
        onClick: o.onClickPrev,
        disabled: o.isFirst
    }, () => {
        var f;
        return [o.prevButton ? (d(), Y(n, te({
            key: 0,
            disabled: o.isFirst
        }, { ...o.ui.default.prevButton,
            ...o.prevButton
        }, {
            class: o.twMerge(o.ui.default.prevButton.class, (f = o.prevButton) == null ? void 0 : f.class),
            "aria-label": "Prev",
            onClick: o.onClickPrev
        }), null, 16, ["disabled", "class", "onClick"])) : $("", !0)]
    }, !0), J(o.$slots, "next", {
        onClick: o.onClickNext,
        disabled: o.isLast
    }, () => {
        var f;
        return [o.nextButton ? (d(), Y(n, te({
            key: 0,
            disabled: o.isLast
        }, { ...o.ui.default.nextButton,
            ...o.nextButton
        }, {
            class: o.twMerge(o.ui.default.nextButton.class, (f = o.nextButton) == null ? void 0 : f.class),
            "aria-label": "Next",
            onClick: o.onClickNext
        }), null, 16, ["disabled", "class", "onClick"])) : $("", !0)]
    }, !0)], 2)) : $("", !0), o.indicators ? (d(), m("div", {
        key: 1,
        role: "tablist",
        class: M(o.ui.indicators.wrapper)
    }, [(d(!0), m(V, null, x(o.pages, f => J(o.$slots, "indicator", {
        key: f,
        onClick: o.onClick,
        active: f === o.currentPage,
        page: f
    }, () => [b("button", {
        type: "button",
        role: "tab",
        "aria-selected": f === o.currentPage,
        class: M([o.ui.indicators.base, f === o.currentPage ? o.ui.indicators.active : o.ui.indicators.inactive]),
        "aria-label": `set slide ${f}`,
        onClick: c => o.onClick(f)
    }, null, 10, xe)], !0)), 128))], 2)) : $("", !0)], 16)
}
const Fe = he(Ue, [
        ["render", je],
        ["__scopeId", "data-v-ea54307d"]
    ]),
    Ge = {
        class: "w-full h-full object-cover overflow-hidden"
    },
    We = ["src"],
    Xe = {
        class: "w-full h-full object-cover overflow-hidden"
    },
    Je = ["src"],
    qe = ["onClick"],
    Qe = ["src"],
    Ye = {
        class: "font18-14 block-newline"
    },
    Ze = {
        class: "tablelist-layout"
    },
    et = {
        key: 0,
        class: "studio-group"
    },
    tt = {
        class: "header"
    },
    ot = ["onClick"],
    st = ["src"],
    at = {
        class: "block-newline"
    },
    it = {
        class: "relative w-auto h-auto flex"
    },
    lt = {
        class: "btn-toggle"
    },
    nt = {
        class: "btn-zone"
    },
    rt = ["onClick"],
    ut = ["src"],
    ct = {
        class: "block-newline"
    },
    dt = {
        __name: "lobby",
        setup(o) {
            const R = (s, e, t) => {
                const w = s.findIndex(i => i.langKey === e),
                    r = s.findIndex(i => i.langKey === t);
                if (w === -1 || r === -1) return s;
                const v = s.splice(w, 1)[0];
                return s.splice(r + 1, 0, v), s
            };
            let p = [{
                path: "/lobby/all",
                langKey: "lobby",
                imgKey: "all",
                isActive: !0
            }, {
                path: "/lobby/multiplay",
                langKey: "multiplay",
                imgKey: "multi",
                isActive: !0
            }, {
                path: "/lobby/baccarat",
                langKey: "baccarat",
                imgKey: "bac",
                isActive: !0
            }, {
                path: "/lobby/dragontiger",
                langKey: "dragontiger",
                imgKey: "dt",
                isActive: !0
            }, {
                path: "/lobby/sicbo",
                langKey: "sicbo",
                imgKey: "sicbo",
                isActive: !0
            }, {
                path: "/lobby/hilo",
                langKey: "hilo",
                imgKey: "hilo",
                isActive: !0
            }, {
                path: "/lobby/roulette",
                langKey: "roulette",
                imgKey: "rou",
                isActive: !0
            }, {
                path: "/lobby/sedie",
                langKey: "sedie",
                imgKey: "sedie",
                isActive: !0
            }, {
                path: "/lobby/parlay",
                langKey: "parlay",
                imgKey: "parlay",
                isActive: !_()._isClassic
            }];
            const S = oe()._bacSocket,
                u = oe()._bacTable,
                l = oe()._dtTable,
                n = O()._sicboTable,
                f = ve()._rouletteSocket,
                c = ve()._rouletteTable;
            Ee()._bjTable;
            const D = O()._sicboSocket,
                Z = fe()._seDieSocket,
                y = fe()._seDieTable,
                j = h(() => _()._onLanding),
                k = s => {
                    Le({
                        path: s
                    })
                },
                z = O().gameTypeOpening;
            be(() => {
                var t, w;
                const s = (r, v) => {
                        r && (_().setPlayingRoomId(r), k(v))
                    },
                    e = () => {
                        l[0] || (p.find(r => r.imgKey === "dt").isActive = !1), (!n[0] || !z.sicBo) && (p.find(r => r.imgKey === "sicbo").isActive = !1), (!n[0] || !z.thaiHilo) && (p.find(r => r.imgKey === "hilo").isActive = !1), c[0] || (p.find(r => r.imgKey === "rou").isActive = !1), y[0] || (p.find(r => r.imgKey === "sedie").isActive = !1)
                    };
                if (j.value === !0) {
                    const r = localStorage.getItem("autoJoin"),
                        v = localStorage.getItem("autoJoinRoom");
                    switch (r) {
                        case "BAC":
                            s(v, "/baccarat");
                            break;
                        case "MUL":
                            break;
                        case "DRA":
                            l[0] ? s(v, "/dragontiger") : k("/lobby/all");
                            break;
                        case "SIC":
                            n[0] ? (O().setBetType("SicBo"), O().setRoomBetType("SicBo"), s(v, "/sicbo")) : k("/lobby/all");
                            break;
                        case "HILO":
                            n[0] ? (O().setBetType("ThaiHiLo"), O().setRoomBetType("ThaiHiLo"), s(v, "/sicbo")) : k("/lobby/all");
                            break;
                        case "FT":
                            n[0] ? (O().setBetType("ThaiFanTan"), O().setRoomBetType("ThaiFanTan"), s(v, "/sicbo")) : k("/lobby/all");
                            break;
                        case "SED":
                            y[0] ? s(v, "/sedie") : k("/lobby/all");
                            break;
                        case "ROU":
                            c[0] ? s(v, "/roulette") : k("/lobby/all");
                            break
                    }
                    e()
                } else e();
                if (((t = _()._profile) == null ? void 0 : t.currency[0]) === "VND") p = R([...p], "sedie", "baccarat");
                else if (((w = _()._profile) == null ? void 0 : w.currency[0]) === "MYR") {
                    const r = [...p];
                    ["hilo", "sedie", "roulette"].forEach(v => {
                        const i = r.find(B => B.langKey === v);
                        i && (i.isActive = !1)
                    }), p = r
                }
            });
            const E = h(() => _()._sizing);
            me(E, () => {});
            const C = h(() => _()._banner),
                A = g(),
                F = g(0);
            be(() => {
                _().getBanner()
            }), ie(() => {
                De(() => {
                    if (A.value) {
                        if (A.value.page === A.value.pages) return A.value.select(0);
                        F.value = A.value.page, A.value.next()
                    }
                }, 5e3), G(H.value)
            });
            const I = g(u),
                P = g(l),
                N = g(n),
                T = g(c),
                L = g(y),
                H = h({
                    get: () => _()._studioSelect,
                    set: s => _().setStudioSelect(s)
                }),
                G = function(s) {
                    H.value = s;
                    let e;
                    switch (s) {
                        case "all":
                            I.value = u, P.value = l, N.value = n, T.value = c, L.value = y;
                            break;
                        case "Colombia":
                            e = u.filter(t => t.studio === "COLOMBIA"), I.value = e, e = l.filter(t => t.studio === "COLOMBIA"), P.value = e, e = n.filter(t => t.studio === "COLOMBIA"), N.value = e, e = c.filter(t => t.studio === "COLOMBIA"), T.value = e, e = y.filter(t => t.studio === "COLOMBIA"), L.value = e;
                            break;
                        case "Cambodia":
                            e = u.filter(t => t.studio === "CAMBODIA"), I.value = e, e = l.filter(t => t.studio === "CAMBODIA"), P.value = e, e = n.filter(t => t.studio === "CAMBODIA"), N.value = e, e = c.filter(t => t.studio === "CAMBODIA"), T.value = e, e = y.filter(t => t.studio === "CAMBODIA"), L.value = e;
                            break;
                        case "Romania":
                            e = u.filter(t => t.studio === "ROMANIA"), I.value = e, e = l.filter(t => t.studio === "ROMANIA"), P.value = e, e = n.filter(t => t.studio === "ROMANIA"), N.value = e, e = c.filter(t => t.studio === "ROMANIA"), T.value = e, e = y.filter(t => t.studio === "ROMANIA"), L.value = e;
                            break;
                        case "Mexico":
                            e = u.filter(t => t.studio === "DENMARK"), I.value = e, e = l.filter(t => t.studio === "DENMARK"), P.value = e, e = n.filter(t => t.studio === "DENMARK"), N.value = e, e = c.filter(t => t.studio === "DENMARK"), T.value = e, e = y.filter(t => t.studio === "DENMARK"), L.value = e;
                            break;
                        case "Ph":
                            e = u.filter(t => t.studio === "PHILIPPINES"), I.value = e, e = l.filter(t => t.studio === "PHILIPPINES"), P.value = e, e = n.filter(t => t.studio === "PHILIPPINES"), N.value = e, e = c.filter(t => t.studio === "PHILIPPINES"), T.value = e, e = y.filter(t => t.studio === "PHILIPPINES"), L.value = e;
                            break;
                        case "vietnam":
                            e = u.filter(t => t.studio === "VIETNAM"), I.value = e, e = l.filter(t => t.studio === "VIETNAM"), P.value = e, e = n.filter(t => t.studio === "VIETNAM"), N.value = e, e = c.filter(t => t.studio === "VIETNAM"), T.value = e, e = y.filter(t => t.studio === "VIETNAM"), L.value = e;
                            break;
                        case "Spain":
                            e = u.filter(t => t.studio === "SPAIN"), I.value = e, e = l.filter(t => t.studio === "SPAIN"), P.value = e, e = n.filter(t => t.studio === "SPAIN"), N.value = e, e = c.filter(t => t.studio === "SPAIN"), T.value = e, e = y.filter(t => t.studio === "SPAIN"), L.value = e;
                            break
                    }
                },
                ke = [{
                    langKey: "all",
                    imgKey: "logo",
                    isActive: !0,
                    case: "all",
                    studioCode: null
                }, {
                    langKey: "Colombia",
                    imgKey: "Colombia",
                    isActive: !0,
                    case: "Colombia",
                    studioCode: "COLOMBIA"
                }, {
                    langKey: "Romania",
                    imgKey: "Romania",
                    isActive: !0,
                    case: "Romania",
                    studioCode: "ROMANIA"
                }, {
                    langKey: "Mexico",
                    imgKey: "Mexico",
                    isActive: !0,
                    case: "Mexico",
                    studioCode: "DENMARK"
                }, {
                    langKey: "Cambodia",
                    imgKey: "Cambodia",
                    isActive: !0,
                    case: "Cambodia",
                    studioCode: "CAMBODIA"
                }, {
                    langKey: "Ph",
                    imgKey: "Ph",
                    isActive: !0,
                    case: "Ph",
                    studioCode: "PHILIPPINES"
                }, {
                    langKey: "vietnam",
                    imgKey: "vt",
                    isActive: !0,
                    case: "vietnam",
                    studioCode: "VIETNAM"
                }, {
                    langKey: "Spain",
                    imgKey: "es",
                    isActive: !0,
                    case: "es",
                    studioCode: "SPAIN"
                }],
                ee = h(() => ke.filter(s => s.studioCode === null ? !0 : u.some(e => (e == null ? void 0 : e.studio) === s.studioCode) || l.some(e => (e == null ? void 0 : e.studio) === s.studioCode) || n.some(e => (e == null ? void 0 : e.studio) === s.studioCode) || c.some(e => (e == null ? void 0 : e.studio) === s.studioCode) || y.some(e => (e == null ? void 0 : e.studio) === s.studioCode)));
            me(ee, s => {
                s.some(e => e.langKey === H.value) || G("all")
            });
            const U = h(() => _()._sizing),
                W = g(!1),
                Ae = s => {
                    W.value = s
                },
                X = g(null),
                ne = g(!1),
                re = () => {
                    var s;
                    ne.value = ((s = X.value) == null ? void 0 : s.scrollTop) > 100
                };
            ie(() => {
                var s;
                (s = X.value) == null || s.addEventListener("scroll", re)
            }), ge(() => {
                var s;
                (s = X.value) == null || s.removeEventListener("scroll", re)
            });

            function ue(s, e, t) {
                const w = Array.isArray(s) ? s : [],
                    r = Array.isArray(e) ? e : [];
                return [...w, ...r].filter(v => {
                    var ce;
                    const i = Number(v.donut14.grCount),
                        B = (ce = t == null ? void 0 : t[v.roomId]) == null ? void 0 : ce.status;
                    return !isNaN(i) && B !== "Shuffle"
                }).sort((v, i) => Number(i.donut14.grCount) - Number(v.donut14.grCount)).slice(0, 6)
            }
            const _e = h(() => ue(u, [], S)),
                Ce = h(() => ue(I.value, [], S)),
                Ie = Te(),
                K = le(Ie, "path");
            return (s, e) => {
                const t = Ke,
                    w = Fe,
                    r = Oe,
                    v = $e;
                return d(), m("div", {
                    ref_key: "scrollContainer",
                    ref: X,
                    class: M(["setHeight", a(E) === "mobile" && a(K) === "/lobby/multiplay" ? "scroll-zone setHeightMUL" : "scroll-zone"])
                }, [se(t), a(U) === "mobile" && a(C).mobile ? (d(), Y(w, {
                    key: 0,
                    ref_key: "carouselRef",
                    ref: A,
                    items: a(C).mobile.map(i => i.image),
                    ui: {
                        item: "basis-full"
                    },
                    class: "w-full"
                }, {
                    default: pe(({
                        item: i
                    }) => [b("div", Ge, [(d(), m("img", {
                        key: a(C).mobile.map(B => B.image).indexOf(i),
                        src: i,
                        alt: "",
                        class: "w-full h-[135px]",
                        draggable: "false"
                    }, null, 8, We))])]),
                    _: 1
                }, 8, ["items"])) : a(U) === "desktop" && a(C).desktop ? (d(), Y(w, {
                    key: 1,
                    ref_key: "carouselRef",
                    ref: A,
                    items: a(C).desktop.map(i => i.image),
                    ui: {
                        item: "basis-full"
                    },
                    class: "w-full"
                }, {
                    default: pe(({
                        item: i
                    }) => [b("div", Xe, [(d(), m("img", {
                        key: a(C).desktop.map(B => B.image).indexOf(i),
                        src: i,
                        alt: "",
                        class: "w-full h-[130px]",
                        draggable: "false"
                    }, null, 8, Je))])]),
                    _: 1
                }, 8, ["items"])) : $("", !0), b("div", {
                    class: M(["btn-list", (a(K) !== "/lobby/all" && a(K) !== "/lobby/baccarat" && a(K) !== "/lobby/multiplay" && a(K) !== "/lobby/parlay", "widthMulti")]),
                    style: q(a(ne) && a(U) === "mobile" ? "position:sticky;top:-2px;z-index:10;background:#22223F;mask:unset;" : "")
                }, [(d(!0), m(V, null, x(a(p), i => (d(), m("div", {
                    key: i.langKey,
                    class: M(["clickActive btn-lobby", a(K) === i.path ? "inactive" : ""]),
                    style: q(i.isActive ? "" : "display:none"),
                    onClick: B => k(i.path)
                }, [b("img", {
                    src: `/hall/game_${i.imgKey}.svg`
                }, null, 8, Qe), b("div", Ye, Q(s.$t(i.langKey)), 1)], 14, qe))), 128))], 6), b("div", Ze, [(a(K) === "/lobby/all" || a(K) === "/lobby/baccarat") && a(U) === "desktop" ? (d(), m("div", et, [b("div", tt, Q(s.$t("studio")), 1), (d(!0), m(V, null, x(a(ee), i => (d(), m("div", {
                    key: i.langKey,
                    class: M(["btn-studio clickActive", a(H) === i.langKey ? "inactive" : ""]),
                    onClick: B => G(`${i.langKey}`)
                }, [b("img", {
                    src: `/flag/${i.imgKey}.svg`
                }, null, 8, st), b("div", at, Q(s.$t(i.langKey)), 1)], 10, ot))), 128))])) : $("", !0), se(r, {
                    api: a(I),
                    socket: a(S),
                    "socket-sedie": a(Z),
                    "socket-sicbo": a(D),
                    "socket-rou": a(f),
                    "api-multi": a(u),
                    "api-dt": a(l),
                    "filter-dt": a(P),
                    "api-sic": a(n),
                    "filter-sic": a(N),
                    "api-rou": a(c),
                    "filter-rou": a(T),
                    "api-sedie": a(y),
                    "filter-sed": a(L),
                    top6: a(_e),
                    "filter-top6": a(Ce),
                    keepalive: !1
                }, null, 8, ["api", "socket", "socket-sedie", "socket-sicbo", "socket-rou", "api-multi", "api-dt", "filter-dt", "api-sic", "filter-sic", "api-rou", "filter-rou", "api-sedie", "filter-sed", "top6", "filter-top6"])]), (a(K) === "/lobby/all" || a(K) === "/lobby/baccarat") && a(U) === "mobile" ? (d(), m("div", {
                    key: 2,
                    class: "studio-groupMobile",
                    style: q(a(W) ? "right:0%" : "right:-11%")
                }, [b("div", it, [b("div", {
                    class: "absolute overflow-hidden w-[20px] h-[90px] left-[-20px] top-[35%] cursor-pointer",
                    onClick: e[0] || (e[0] = i => Ae(!a(W)))
                }, [b("div", lt, [se(v, {
                    name: "i-heroicons-play-16-solid",
                    class: "btn-img w-[8px] bg-black",
                    style: q(a(W) ? "rotate: -45deg" : "rotate: 135deg")
                }, null, 8, ["style"])])]), b("div", nt, [(d(!0), m(V, null, x(a(ee), i => (d(), m("div", {
                    key: i.langKey,
                    class: M(["btn-studio clickActive", a(H) === i.langKey ? "inactive" : ""]),
                    onClick: B => G(`${i.langKey}`)
                }, [b("img", {
                    src: `/flag/${i.imgKey}.svg`
                }, null, 8, ut), b("div", ct, Q(s.$t(i.langKey)), 1)], 10, rt))), 128))])])], 4)) : $("", !0)], 2)
            }
        }
    },
    _t = he(dt, [
        ["__scopeId", "data-v-a2b83010"]
    ]);
export {
    _t as
    default
};