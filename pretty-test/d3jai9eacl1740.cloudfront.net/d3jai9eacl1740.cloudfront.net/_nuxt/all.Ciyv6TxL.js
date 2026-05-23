import {
    _ as R
} from "./Divider.DMu9loxT.js";
import {
    _ as h
} from "./globalTable.CiMX2t1k.js";
import {
    _ as O,
    a as v,
    b as k
} from "./filterOnlineByType.CWXFFsWg.js";
import {
    k as G,
    $ as _,
    N as T,
    a as u,
    b as f,
    t as $,
    v as s,
    e as m,
    F as D,
    d as j,
    x as y,
    u as r,
    q as n,
    g as i
} from "./entry.BFNHJ093.js";
import "./Icon.BriSQLkb.js";
import "./Icon.DDQP7vzt.js";
import "./index.CAZilBRX.js";
import "./_plugin-vue_export-helper.DlAUqK2U.js";
import "./Skeleton.AP6HsXEx.js";
import "./3rdProvider.CU-NExb0.js";
import "./shuffling.XZhqFkC3.js";
import "./t.CaNOAqv7.js";
import "./lottie-web-vue.Do31YJ3k.js";
const I = {
        class: "flex flex-col w-[100%]"
    },
    w = {
        class: "lobby-content"
    },
    x = {
        class: "flex basis-full gap-3"
    },
    M = {
        class: "font24-20 block-newline"
    },
    N = {
        key: 0,
        class: "flex w-full justify-center font18-14 p-[20px]"
    },
    W = {
        __name: "all",
        props: {
            api: {
                type: Array
            },
            socket: {
                type: Object
            },
            apiDt: {
                type: Array
            },
            filterDt: {
                type: Array
            },
            socket3rd: {
                type: Object
            },
            socketSicbo: {
                type: Object
            },
            apiSic: {
                type: Array
            },
            filterSic: {
                type: Array
            },
            apiRou: {
                type: Array
            },
            filterRou: {
                type: Array
            },
            socketRou: {
                type: Object
            },
            apiSedie: {
                type: Array
            },
            filterSed: {
                type: Array
            },
            socketSedie: {
                type: Object
            },
            filterTop6: {
                type: Array
            }
        },
        setup(B) {
            const e = B;
            G(() => {
                _().getOnline()
            });
            const d = T().gameTypeOpening;
            return (l, V) => {
                var b, g, S;
                const A = R,
                    c = h,
                    p = O;
                return i(), u("div", I, [f("div", w, [f("div", x, [f("div", M, $(l.$t("gooroad")), 1), s(A), s(v)]), e.filterTop6[0] ? m("", !0) : (i(), u("div", N, $(l.$t("notable")), 1)), (i(!0), u(D, null, j(e.filterTop6, o => (i(), u("div", {
                    key: o.roomId
                }, [o.type === "Baccarat" ? (i(), n(c, {
                    key: o.roomId,
                    api: o,
                    socket: e.socket[o.roomId],
                    game: "bac"
                }, null, 8, ["api", "socket"])) : (i(), n(c, {
                    key: o.roomId,
                    api: o,
                    socket: e.socket[o.roomId],
                    game: "dt"
                }, null, 8, ["api", "socket"]))]))), 128))]), s(p, {
                    "api-arr": e.api,
                    socket: e.socket,
                    game: "bac",
                    online: r(k)("Baccarat")
                }, {
                    table: y(({
                        api: o,
                        socket: t,
                        game: a
                    }) => [s(c, {
                        api: o,
                        socket: t,
                        game: a
                    }, null, 8, ["api", "socket", "game"])]),
                    _: 1
                }, 8, ["api-arr", "socket", "online"]), e.filterDt[0] ? (i(), n(p, {
                    key: 0,
                    "api-arr": e.filterDt,
                    socket: e.socket,
                    game: "dt",
                    online: r(k)("DragonTiger")
                }, {
                    table: y(({
                        api: o,
                        socket: t,
                        game: a
                    }) => [s(c, {
                        api: o,
                        socket: t,
                        game: a
                    }, null, 8, ["api", "socket", "game"])]),
                    _: 1
                }, 8, ["api-arr", "socket", "online"])) : m("", !0), e.filterSic[0] && r(d).sicBo ? (i(), n(p, {
                    key: 1,
                    "api-arr": e.filterSic,
                    socket: e.socketSicbo,
                    game: "SicBo",
                    online: r(k)("SicBo")
                }, {
                    table: y(({
                        api: o,
                        socket: t,
                        game: a
                    }) => [s(c, {
                        api: o,
                        socket: t,
                        game: a
                    }, null, 8, ["api", "socket", "game"])]),
                    _: 1
                }, 8, ["api-arr", "socket", "online"])) : m("", !0), e.filterSic[0] && r(d).thaiHilo && ((b = ("$storeGlobal" in l ? l.$storeGlobal : r(_))()._profile) == null ? void 0 : b.currency[0]) !== "MYR" ? (i(), n(p, {
                    key: 2,
                    "api-arr": e.filterSic,
                    socket: e.socketSicbo,
                    game: "ThaiHiLo",
                    online: r(k)("SicBo")
                }, {
                    table: y(({
                        api: o,
                        socket: t,
                        game: a
                    }) => [s(c, {
                        api: o,
                        socket: t,
                        game: a
                    }, null, 8, ["api", "socket", "game"])]),
                    _: 1
                }, 8, ["api-arr", "socket", "online"])) : m("", !0), e.filterRou[0] && ((g = ("$storeGlobal" in l ? l.$storeGlobal : r(_))()._profile) == null ? void 0 : g.currency[0]) !== "MYR" ? (i(), n(p, {
                    key: 3,
                    "api-arr": e.filterRou,
                    socket: e.socketRou,
                    game: "rou",
                    online: r(k)("Roulette")
                }, {
                    table: y(({
                        api: o,
                        socket: t,
                        game: a
                    }) => [s(c, {
                        api: o,
                        socket: t,
                        game: a
                    }, null, 8, ["api", "socket", "game"])]),
                    _: 1
                }, 8, ["api-arr", "socket", "online"])) : m("", !0), e.filterSed[0] && ((S = ("$storeGlobal" in l ? l.$storeGlobal : r(_))()._profile) == null ? void 0 : S.currency[0]) !== "MYR" ? (i(), n(p, {
                    key: 4,
                    "api-arr": e.filterSed,
                    socket: e.socketSedie,
                    game: "sed",
                    online: r(k)("Sedie")
                }, {
                    table: y(({
                        api: o,
                        socket: t,
                        game: a
                    }) => [s(c, {
                        api: o,
                        socket: t,
                        game: a
                    }, null, 8, ["api", "socket", "game"])]),
                    _: 1
                }, 8, ["api-arr", "socket", "online"])) : m("", !0)])
            }
        }
    };
export {
    W as
    default
};