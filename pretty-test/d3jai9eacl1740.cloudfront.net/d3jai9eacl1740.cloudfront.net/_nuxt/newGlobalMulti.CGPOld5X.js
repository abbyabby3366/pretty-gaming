import {
    _ as j
} from "./Skeleton.AP6HsXEx.js";
import {
    d as $
} from "./p.DiIRZ5QN.js";
import {
    N as I,
    f as B,
    g as P,
    h as T,
    i as N,
    j as M
} from "./chipsetting.D-MgVFkH.js";
import {
    r,
    c as V,
    $ as q,
    w as C,
    k as G,
    g as t,
    a as c,
    v as o,
    x as A,
    u as l,
    b as n,
    t as p,
    q as i,
    e as b,
    T as D,
    p as E,
    i as F
} from "./entry.BFNHJ093.js";
import {
    s as H,
    c as L,
    d as R
} from "./shuffling.XZhqFkC3.js";
import {
    _ as U
} from "./lottie-web-vue.Do31YJ3k.js";
import {
    _ as z
} from "./_plugin-vue_export-helper.DlAUqK2U.js";
const m = e => (E("data-v-16f68c0a"), e = e(), F(), e),
    J = {
        key: 0
    },
    K = {
        key: 0,
        class: "bg-skeleton"
    },
    Q = {
        key: 1,
        class: "bg-table hereTable"
    },
    W = {
        class: "self-start absolute top-[5px]"
    },
    X = m(() => n("img", {
        src: M
    }, null, -1)),
    Y = {
        key: 2,
        class: "bg-table overflow-hidden"
    },
    Z = {
        key: 3,
        class: "relative bg-table"
    },
    ee = m(() => n("img", {
        class: "w-[15%] absolute left-0 top-[55%] translate-y-[-50%]",
        src: L
    }, null, -1)),
    ae = m(() => n("img", {
        class: "w-[15%] absolute right-0 top-[55%] translate-y-[-50%]",
        src: R
    }, null, -1)),
    te = {
        class: "font24-20 absolute w-[50%] left-[50%] top-[65%] translate-x-[-50%] translate-y-[-50%]"
    },
    oe = {
        __name: "newGlobalMulti",
        props: {
            api: {
                type: Object
            },
            socket: {
                type: Object,
                required: !0
            },
            placing: {
                type: Object
            },
            placed: {
                type: Object
            },
            endPayOut: {
                type: Object
            },
            dialog: {
                type: Object
            },
            game: {
                type: String,
                default: "bac"
            }
        },
        emits: ["switching"],
        setup(e, {
            emit: f
        }) {
            const a = e,
                u = f,
                g = r({
                    balance: 0,
                    online: 0,
                    status: ""
                }),
                h = V(() => q()._playingRoomId);
            C(() => a.socket, () => {
                g.value.status = a.socket.status
            });
            const y = r(!0);
            return G(() => {
                y.value = !1
            }), (_, d) => {
                const s = j,
                    k = $,
                    w = B,
                    v = P,
                    x = T,
                    O = N;
                return e.api.studio !== "pragmaticplay" && e.api.studio !== "vivo" ? (t(), c("div", J, [o(D, {
                    name: "page",
                    mode: "out-in"
                }, {
                    default: A(() => [l(y) ? (t(), c("div", K, [o(s, {
                        class: "h-[10%] w-[100%]"
                    }), o(s, {
                        class: "h-[40%] w-[40%]"
                    }), o(s, {
                        class: "h-[40%] w-[16%]"
                    }), o(s, {
                        class: "h-[40%] w-[40%]"
                    }), o(s, {
                        class: "h-[25%] w-[100%]"
                    })])) : l(h) === a.api.roomId ? (t(), c("div", Q, [n("div", W, p(a.api.name), 1), X, n("div", null, p(_.$t("here")), 1)])) : l(g).status !== "Shuffle" ? (t(), c("div", Y, [o(k, {
                        api: a.api,
                        socket: a.socket,
                        game: e.game,
                        joinable: !1,
                        onSwitching: d[0] || (d[0] = S => u("switching"))
                    }, null, 8, ["api", "socket", "game"]), e.game === "bac" ? (t(), i(I, {
                        key: 0,
                        api: a.api,
                        socket: a.socket,
                        placing: a.placing,
                        placed: a.placed,
                        "end-pay-out": e.endPayOut,
                        dialog: e.dialog
                    }, null, 8, ["api", "socket", "placing", "placed", "end-pay-out", "dialog"])) : e.game === "dt" ? (t(), i(w, {
                        key: 1,
                        api: a.api,
                        socket: a.socket,
                        placing: a.placing,
                        placed: a.placed,
                        "end-pay-out": e.endPayOut,
                        dialog: e.dialog
                    }, null, 8, ["api", "socket", "placing", "placed", "end-pay-out", "dialog"])) : e.game === "sed" ? (t(), i(v, {
                        key: 2,
                        api: a.api,
                        socket: a.socket,
                        placing: a.placing,
                        placed: a.placed,
                        "end-pay-out": e.endPayOut,
                        dialog: e.dialog
                    }, null, 8, ["api", "socket", "placing", "placed", "end-pay-out", "dialog"])) : e.game === "SicBo" || e.game === "ThaiHiLo" || e.game === "ThaiFanTan" ? (t(), i(x, {
                        key: 3,
                        api: a.api,
                        socket: a.socket,
                        placing: a.placing,
                        placed: a.placed,
                        "end-pay-out": e.endPayOut,
                        dialog: e.dialog,
                        gametype: e.game
                    }, null, 8, ["api", "socket", "placing", "placed", "end-pay-out", "dialog", "gametype"])) : e.game === "rou" ? (t(), i(O, {
                        key: 4,
                        api: a.api,
                        socket: a.socket,
                        placing: a.placing,
                        placed: a.placed,
                        "end-pay-out": e.endPayOut,
                        dialog: e.dialog,
                        gametype: e.game
                    }, null, 8, ["api", "socket", "placing", "placed", "end-pay-out", "dialog", "gametype"])) : b("", !0)])) : (t(), c("div", Z, [o(k, {
                        api: a.api,
                        socket: a.socket,
                        game: e.game,
                        joinable: !1,
                        onSwitching: d[1] || (d[1] = S => u("switching"))
                    }, null, 8, ["api", "socket", "game"]), ee, ae, o(l(U), {
                        class: "absolute w-[30%] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]",
                        "animation-data": l(H),
                        loop: !0
                    }, null, 8, ["animation-data"]), n("div", te, p(_.$t("shuffling")), 1)]))]),
                    _: 1
                })])) : b("", !0)
            }
        }
    },
    me = z(oe, [
        ["__scopeId", "data-v-16f68c0a"]
    ]);
export {
    me as _
};