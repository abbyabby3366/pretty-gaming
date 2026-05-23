import {
    _ as q
} from "./Skeleton.AP6HsXEx.js";
import {
    c as S,
    $ as g,
    r as T,
    w as C,
    g as t,
    a,
    u as s,
    h as w,
    b as i,
    n as v,
    t as c,
    p as B,
    i as j,
    k as I,
    q as D,
    x as E,
    v as y,
    _ as $,
    e as u,
    m as b,
    F as N,
    d as P,
    T as V,
    L as k,
    N as G
} from "./entry.BFNHJ093.js";
import {
    $ as U
} from "./3rdProvider.CU-NExb0.js";
import {
    G as H,
    s as J,
    b as R,
    _ as O,
    a as z,
    c as K,
    d as Q
} from "./shuffling.XZhqFkC3.js";
import {
    _ as F
} from "./t.CaNOAqv7.js";
import {
    _ as W
} from "./lottie-web-vue.Do31YJ3k.js";
import {
    _ as A
} from "./_plugin-vue_export-helper.DlAUqK2U.js";
const X = "" + globalThis.__publicAssetsURL("headerBar/ham/avatar.svg"),
    Y = "" + globalThis.__publicAssetsURL("openCard.gif"),
    M = o => (B("data-v-f9475036"), o = o(), j(), o),
    Z = ["id"],
    ee = M(() => i("circle", {
        class: "bg"
    }, null, -1)),
    te = M(() => i("circle", {
        class: "bg"
    }, null, -1)),
    se = {
        key: 2,
        class: "textTime"
    },
    ae = {
        key: 3,
        class: "absolute img-openCard left-[12px]"
    },
    ie = M(() => i("img", {
        src: Y
    }, null, -1)),
    oe = [ie],
    ne = {
        __name: "countDownTimeLobby",
        props: {
            playingSocket: {
                type: Object,
                default () {
                    return {
                        timeLeft: 20
                    }
                }
            },
            countdownId: {
                type: String,
                default () {
                    return ""
                }
            }
        },
        setup(o) {
            const n = o,
                e = S(() => g()._sizing),
                p = T(0),
                _ = T(0);
            return C(() => n.playingSocket, () => {
                p.value = n.playingSocket.timeLeft;
                const f = n.playingSocket.maxTimeLeft,
                    x = n.playingSocket.timeLeft,
                    l = 100,
                    r = f - x,
                    h = l / f;
                _.value = l - h * r
            }), (f, x) => (t(), a("div", {
                id: n.countdownId,
                class: "countdownTime pointer-events-none"
            }, [s(e) === "desktop" ? (t(), a("svg", {
                key: 0,
                width: "40",
                height: "40",
                viewBox: "0 0 250 250",
                class: "circular-progress",
                style: w(`--progress: ${s(_)}`)
            }, [ee, i("circle", {
                class: v(["fg", s(p) <= 5 ? "warning" : ""])
            }, null, 2)], 4)) : (t(), a("svg", {
                key: 1,
                width: "25",
                height: "25",
                viewBox: "0 0 250 250",
                class: "circular-progress",
                style: w(`--progress: ${s(_)}`)
            }, [te, i("circle", {
                class: v(["fg", s(p) <= 5 ? "warning" : ""])
            }, null, 2)], 4)), s(p) > 0 ? (t(), a("div", se, c(s(p)), 1)) : (t(), a("div", ae, oe))], 8, Z))
        }
    },
    le = A(ne, [
        ["__scopeId", "data-v-f9475036"]
    ]),
    m = o => (B("data-v-0321e73e"), o = o(), j(), o),
    re = {
        key: 0,
        class: "relative bg-table font14-7 shuffle-zone bg-bgDark"
    },
    de = m(() => i("img", {
        class: "img-dealer",
        src: X
    }, null, -1)),
    ce = {
        key: 1,
        class: "bg-table bg-bgGray/30 font14-7"
    },
    pe = {
        style: {
            position: "relative",
            height: "100%"
        }
    },
    me = ["src"],
    ue = ["src"],
    ge = {
        key: 2,
        class: "balance"
    },
    _e = {
        class: "online"
    },
    be = m(() => i("img", {
        class: "online-img",
        src: R
    }, null, -1)),
    he = ["src"],
    ve = {
        key: 5,
        class: "name"
    },
    fe = {
        key: 6,
        class: "stats"
    },
    ye = {
        class: "block-newline"
    },
    ke = {
        class: "flex"
    },
    xe = m(() => i("img", {
        class: "w-[8px] mr-[5px]",
        src: O
    }, null, -1)),
    Te = {
        class: "flex"
    },
    we = m(() => i("img", {
        class: "w-[8px] mr-[5px]",
        src: z
    }, null, -1)),
    Le = {
        class: "flex"
    },
    $e = m(() => i("img", {
        class: "w-[8px] mr-[5px]",
        src: F
    }, null, -1)),
    He = {
        key: 7,
        class: "stats"
    },
    Me = {
        class: "block-newline"
    },
    Ie = {
        class: "flex"
    },
    Ge = m(() => i("img", {
        class: "w-[8px] mr-[5px]",
        src: z
    }, null, -1)),
    Se = {
        class: "flex"
    },
    Ce = m(() => i("img", {
        class: "w-[8px] mr-[5px]",
        src: O
    }, null, -1)),
    Be = {
        class: "flex"
    },
    je = m(() => i("img", {
        class: "w-[8px] mr-[5px]",
        src: F
    }, null, -1)),
    Re = {
        key: 0,
        class: "bg-roadmap"
    },
    Oe = {
        class: "roadmap"
    },
    ze = {
        key: 0
    },
    Fe = {
        key: 0,
        class: "flex gap-[0%] justify-center"
    },
    Ae = ["innerHTML"],
    qe = ["innerHTML"],
    De = {
        key: 2,
        class: "relative"
    },
    Ee = ["innerHTML"],
    Ne = {
        key: 3,
        class: "relative"
    },
    Pe = ["innerHTML"],
    Ve = {
        key: 1,
        class: "relative"
    },
    Ue = ["innerHTML"],
    Je = ["innerHTML"],
    Ke = ["innerHTML"],
    Qe = ["innerHTML"],
    We = ["innerHTML"],
    Xe = ["innerHTML"],
    Ye = ["innerHTML"],
    Ze = {
        key: 7
    },
    et = {
        class: "flex gap-[0%] justify-center"
    },
    tt = ["innerHTML"],
    st = ["innerHTML"],
    at = ["innerHTML"],
    it = ["innerHTML"],
    ot = ["src"],
    nt = {
        key: 1,
        class: "flex"
    },
    lt = {
        class: "flex gap-[4px]"
    },
    rt = m(() => i("img", {
        class: "shuffle-icon",
        src: R
    }, null, -1)),
    dt = {
        class: "font-light"
    },
    ct = m(() => i("img", {
        class: "w-[23%] absolute left-0 top-[50%] translate-y-[-50%]",
        src: K
    }, null, -1)),
    pt = m(() => i("img", {
        class: "w-[23%] absolute right-0 top-[50%] translate-y-[-50%]",
        src: Q
    }, null, -1)),
    mt = {
        class: "font24-14 absolute w-[50%] left-[50%] top-[55%] translate-x-[-50%] translate-y-[-50%]"
    },
    ut = {
        __name: "globalTable",
        props: {
            api: {
                type: Object,
                required: !0
            },
            socket: {
                type: Object,
                required: !0
            },
            game: {
                type: String,
                required: !0,
                default: "bac"
            }
        },
        setup(o) {
            const n = S(() => g()._sizing),
                e = o,
                p = T({
                    balance: 0,
                    online: 0,
                    status: ""
                });
            C(() => e.socket, () => {
                p.value.balance = e.socket.balance, p.value.online = e.socket.online, p.value.status = e.socket.status
            });
            const _ = l => {
                    const r = () => {
                        g().setGlobalLoading(!1)
                    };
                    g().setGlobalLoading(!0), l !== "pragmaticplay" && l !== "vivo" ? (g().setPlayingRoomId(e.api.roomId), e.api.roomId, e.game === "bac" ? k({
                        path: "/baccarat"
                    }).then(r) : e.game === "dt" ? k({
                        path: "/dragontiger"
                    }).then(r) : e.game === "sed" ? k({
                        path: "/sedie"
                    }).then(r) : e.game === "SicBo" || e.game === "ThaiHiLo" || e.game === "ThaiFanTan" ? (G().setBetType(e.game), G().setRoomBetType(e.game), k({
                        path: "/sicbo"
                    }).then(r)) : e.game === "rou" && k({
                        path: "/roulette"
                    }).then(r), window.localStorage.setItem("currentSwitchGame", e.game)) : U().getIframePP(e.api.roomId).then(h => {
                        h.code === 0 ? k({
                            path: "/baccarat3rd",
                            query: {
                                game: e.game
                            }
                        }) : alert(`${h.code} : ${h.msg}`)
                    })
                },
                f = T(!0);
            I(() => {
                f.value = !1
            });
            const x = l => ["1", "3", "5", "7", "9", "12", "14", "16", "18", "19", "21", "23", "25", "27", "30", "32", "34", "36"].includes(l);
            return I(() => {}), (l, r) => {
                const h = q;
                return t(), D(V, {
                    name: "page",
                    mode: "out-in"
                }, {
                    default: E(() => [s(f) ? (t(), a("div", re, [de, y(h, {
                        class: "h-4 w-[100%] mt-[3%] h-[40%]"
                    })])) : s(p).status !== "Shuffle" ? (t(), a("div", ce, [i("div", pe, [e.game !== "rou" ? (t(), a("img", {
                        key: 0,
                        class: "img-dealer clickActive",
                        src: e.api.tableImage ? e.api.tableImage : e.api.dealer.img,
                        alt: "image",
                        onErrorOnce: r[0] || (r[0] = d => {
                            d.target.src = "/mock404.jpg"
                        }),
                        onClick: r[1] || (r[1] = d => _(e.api.studio))
                    }, null, 40, me)) : (t(), a("img", {
                        key: 1,
                        class: "img-dealerRou clickActive",
                        src: e.api.tableImage ? e.api.tableImage : e.api.dealer.img,
                        alt: "image",
                        onErrorOnce: r[2] || (r[2] = d => {
                            d.target.src = "/mock404.jpg"
                        }),
                        onClick: r[3] || (r[3] = d => _(e.api.studio))
                    }, null, 40, ue)), e.api.studio !== "pragmaticplay" && e.api.studio !== "vivo" && e.game !== "SicBo" && e.game !== "ThaiFanTan" && e.game !== "ThaiHiLo" && e.game !== "rou" ? (t(), a("div", ge, c(("useCur" in l ? l.useCur : s($))(s(p).balance)), 1)) : u("", !0), i("div", _e, [be, b(" " + c(("useCur" in l ? l.useCur : s($))(s(p).online)), 1)]), e.api.studio !== "pragmaticplay" && e.api.studio !== "vivo" ? (t(), a("div", {
                        key: 3,
                        class: "name",
                        style: w(o.game === "rou" && s(n) === "mobile" ? "bottom:30px;" : o.game === "rou" && s(n) === "desktop" ? "bottom:50px;" : ""),
                        onClick: r[4] || (r[4] = d => ("$storeGlobal" in l ? l.$storeGlobal : s(g))().addFav(e.api.roomId))
                    }, [i("img", {
                        class: "name-img",
                        src: ("$storeGlobal" in l ? l.$storeGlobal : s(g))()._favList.find(d => d === e.api.roomId) ? "/hall/favOn.svg" : "/hall/favOff.svg"
                    }, null, 8, he), b(" " + c(e.api.name), 1)], 4)) : o.game === "rou" || o.game === "bj" ? (t(), a("div", {
                        key: 4,
                        class: "name",
                        style: w(s(n) === "mobile" ? "bottom:25px" : "bottom:40px")
                    }, c(e.api.name), 5)) : (t(), a("div", ve, c(e.api.name), 1)), o.game === "bac" ? (t(), a("div", fe, [i("div", ye, " # " + c(e.api.btt.tt), 1), i("div", ke, [xe, b(c(e.api.btt.player), 1)]), i("div", Te, [we, b(c(e.api.btt.banker), 1)]), i("div", Le, [$e, b(c(e.api.btt.tie), 1)])])) : o.game === "dt" ? (t(), a("div", He, [i("div", Me, " # " + c(e.api.dtt.tt), 1), i("div", Ie, [Ge, b(c(e.api.dtt.dr), 1)]), i("div", Se, [Ce, b(c(e.api.dtt.tg), 1)]), i("div", Be, [je, b(c(e.api.dtt.tie), 1)])])) : u("", !0)]), o.game !== "rou" && o.game !== "bj" ? (t(), a("div", Re, [i("div", Oe, [o.game === "bac" || o.game === "dt" ? (t(), a("div", ze, [("$storeGlobal" in l ? l.$storeGlobal : s(g))().mulView ? (t(), a("div", Fe, [i("div", {
                        class: v(["flex m-[1%]", s(n) === "mobile" ? "gap-[2px]" : ""])
                    }, [s(n) === "desktop" ? (t(), a("div", {
                        key: 0,
                        class: "roadmap-timeline",
                        innerHTML: e.api.htmlTimeline8
                    }, null, 8, Ae)) : s(n) === "mobile" ? (t(), a("div", {
                        key: 1,
                        class: "roadmap-timeline",
                        innerHTML: e.api.htmlTimeline6
                    }, null, 8, qe)) : u("", !0), s(n) === "desktop" ? (t(), a("div", De, [y(H, {
                        "goodroad-type": e.api.donut20.isGR
                    }, null, 8, ["goodroad-type"]), i("div", {
                        class: "roadmap-donut",
                        innerHTML: e.api.donut20.html
                    }, null, 8, Ee)])) : u("", !0), s(n) === "mobile" ? (t(), a("div", Ne, [y(H, {
                        "goodroad-type": e.api.donut14.isGR
                    }, null, 8, ["goodroad-type"]), i("div", {
                        class: "roadmap-donut",
                        innerHTML: e.api.donut14.html
                    }, null, 8, Pe)])) : u("", !0)], 2)])) : (t(), a("div", Ve, [y(H, {
                        "goodroad-type": e.api.donut28.isGR
                    }, null, 8, ["goodroad-type"]), i("div", {
                        class: "roadmap-table",
                        innerHTML: e.api.donut28.html
                    }, null, 8, Ue)]))])) : o.game === "SicBo" && s(n) === "mobile" ? (t(), a("div", {
                        key: 1,
                        class: "roadmap-table-sicbo p-[2px]",
                        innerHTML: e.api.sicboTimeline21
                    }, null, 8, Je)) : o.game === "SicBo" && s(n) === "desktop" ? (t(), a("div", {
                        key: 2,
                        class: "roadmap-table-sicbo py-[3px] px-[5px]",
                        innerHTML: e.api.sicboTimeline28
                    }, null, 8, Ke)) : o.game === "ThaiHiLo" && s(n) === "mobile" ? (t(), a("div", {
                        key: 3,
                        class: "roadmap-table-sicbo px-[1px] py-[2px]",
                        style: {
                            "grid-template-columns": "repeat(20, 7px)",
                            "grid-template-rows": "repeat(5, 8px)"
                        },
                        innerHTML: e.api.hiloTimeline21
                    }, null, 8, Qe)) : o.game === "ThaiHiLo" && s(n) === "desktop" ? (t(), a("div", {
                        key: 4,
                        class: "roadmap-table-sicbo py-[4px] px-[3px]",
                        style: {
                            "grid-template-columns": "repeat(24, 14px)",
                            "grid-template-rows": "repeat(5, 14px)"
                        },
                        innerHTML: e.api.hiloTimeline24
                    }, null, 8, We)) : o.game === "ThaiFanTan" && s(n) === "mobile" ? (t(), a("div", {
                        key: 5,
                        class: "roadmap-table-sicbo px-[1px] py-[2px]",
                        style: {
                            "grid-template-columns": "repeat(20, 7px)",
                            "grid-template-rows": "repeat(5, 8px)"
                        },
                        innerHTML: e.api.fantanTimeline21
                    }, null, 8, Xe)) : o.game === "ThaiFanTan" && s(n) === "desktop" ? (t(), a("div", {
                        key: 6,
                        class: "roadmap-table-sicbo py-[4px] px-[3px]",
                        style: {
                            "grid-template-columns": "repeat(24, 14px)",
                            "grid-template-rows": "repeat(5, 14px)"
                        },
                        innerHTML: e.api.fantanTimeline24
                    }, null, 8, Ye)) : u("", !0), o.game === "sed" ? (t(), a("div", Ze, [i("div", et, [i("div", {
                        class: v(["flex m-[1%]", s(n) === "mobile" ? "gap-[2px]" : ""])
                    }, [s(n) === "desktop" ? (t(), a("div", {
                        key: 0,
                        class: "roadmap-timeline",
                        innerHTML: e.api.htmlTimeline8
                    }, null, 8, tt)) : s(n) === "mobile" ? (t(), a("div", {
                        key: 1,
                        class: "roadmap-timeline",
                        innerHTML: e.api.htmlTimeline6
                    }, null, 8, st)) : u("", !0), s(n) === "desktop" ? (t(), a("div", {
                        key: 2,
                        class: "roadmap-donut",
                        innerHTML: e.api.oddEven20.point
                    }, null, 8, at)) : s(n) === "mobile" ? (t(), a("div", {
                        key: 3,
                        class: "roadmap-donut",
                        innerHTML: e.api.oddEven14.point
                    }, null, 8, it)) : u("", !0)], 2)])])) : u("", !0)])])) : o.game === "rou" || o.game === "bj" ? (t(), a("div", {
                        key: 1,
                        class: v(s(n) === "mobile" ? "absolute left-[2px] bottom-[2px] flex gap-[1px] text-[12px] w-[27px]" : "absolute left-[8px] bottom-[7px] flex gap-[2px]")
                    }, [(t(!0), a(N, null, P([...e.api.statistics].reverse(), (d, L) => (t(), a("div", {
                        key: L
                    }, [s(n) === "desktop" ? (t(), a("div", {
                        key: 0,
                        class: v([
                            [x(d) ? "text-white bg-rouRed" : d === "0" ? "text-white bg-rouGreen" : "text-white bg-rouBlack", L === 0 ? "border-secondary" : "border-white"], "w-[27px] h-[27px] flex justify-center items-center rounded-[5px] border border-1"
                        ])
                    }, c(d), 3)) : (t(), a("div", {
                        key: 1,
                        class: v([
                            [x(d) ? "text-white bg-rouRed" : d === "0" ? "text-white bg-rouGreen" : "text-white bg-rouBlack", L === 0 ? "border-secondary" : "border-white"], "w-[21px] h-[21px] flex justify-center items-center rounded-[5px] border border-1"
                        ])
                    }, c(d), 3))]))), 128))], 2)) : u("", !0), y(le, {
                        "playing-socket": e.socket,
                        "countdown-id": e.api.roomId
                    }, null, 8, ["playing-socket", "countdown-id"])])) : (t(), a("div", {
                        key: 2,
                        class: "relative bg-table font14-7 shuffle-zone bg-bgDark",
                        onClick: r[7] || (r[7] = d => _(e.api.studio))
                    }, [i("div", {
                        class: "flex justify-between items-center gap-[4px]",
                        onClick: r[6] || (r[6] = d => _(e.api.studio))
                    }, [e.api.studio !== "pragmaticplay" && e.api.studio !== "vivo" ? (t(), a("div", {
                        key: 0,
                        class: "flex gap-[4px] clickActive",
                        onClick: r[5] || (r[5] = d => ("$storeGlobal" in l ? l.$storeGlobal : s(g))().addFav(e.api.roomId))
                    }, [i("img", {
                        class: "shuffle-icon",
                        src: ("$storeGlobal" in l ? l.$storeGlobal : s(g))()._favList.find(d => d === e.api.roomId) ? "/hall/favOn.svg" : "/hall/favOff.svg"
                    }, null, 8, ot), i("div", null, c(e.api.name), 1)])) : (t(), a("div", nt, c(e.api.name), 1)), i("div", lt, [rt, i("div", dt, c(("useCur" in l ? l.useCur : s($))(s(p).online)), 1)])]), ct, pt, y(s(W), {
                        class: "absolute w-[50%] left-[52%] top-[45%] translate-x-[-50%] translate-y-[-50%]",
                        "animation-data": s(J),
                        loop: !0
                    }, null, 8, ["animation-data"]), i("div", mt, c(l.$t("shuffling")), 1)]))]),
                    _: 1
                })
            }
        }
    },
    kt = A(ut, [
        ["__scopeId", "data-v-0321e73e"]
    ]);
export {
    kt as _
};