import {
    a6 as $l,
    g as n,
    a as c,
    b as l,
    t as d,
    u as p,
    _ as H,
    e as f,
    n as r,
    h as ie,
    r as de,
    c as N,
    y as ne,
    w as se,
    $ as _,
    v,
    m as h,
    q as G,
    F as x,
    p as X,
    i as ee,
    f as R,
    k as pe,
    I as yl,
    d as S,
    N as wl,
    O as Tl,
    s as gl
} from "./entry.BFNHJ093.js";
import {
    G as Q,
    a as bl,
    _ as ml
} from "./shuffling.XZhqFkC3.js";
import {
    b as hl,
    c as kl,
    _ as fl,
    a as _l
} from "./p.DiIRZ5QN.js";
import {
    _ as V
} from "./_plugin-vue_export-helper.DlAUqK2U.js";
import {
    _ as Ll
} from "./Divider.DMu9loxT.js";
import {
    _ as xl
} from "./close.BqjWTNPe.js";
const Cl = {
        props: {
            valuePlacing: {
                default: 0,
                type: Number
            },
            valuePlaced: {
                default: 0,
                type: Number
            },
            size: {
                default: "normal",
                type: String
            }
        },
        data() {
            return {}
        },
        watch: {
            valuePlacing: {
                handler(t) {
                    t > 0 && $l("ChipsBet")
                }
            }
        },
        methods: {
            chipRender() {
                let t;
                switch (this.valuePlacing) {
                    case 1:
                        t = "1";
                        break;
                    case 5:
                        t = "5";
                        break;
                    case 10:
                        t = "10";
                        break;
                    case 20:
                        t = "20";
                        break;
                    case 50:
                        t = "50";
                        break;
                    case 100:
                        t = "100";
                        break;
                    case 200:
                        t = "200";
                        break;
                    case 500:
                        t = "500";
                        break;
                    case 1e3:
                        t = "1000";
                        break;
                    case 2e3:
                        t = "2000";
                        break;
                    case 5e3:
                        t = "5000";
                        break;
                    case 1e4:
                        t = "10000";
                        break;
                    case 2e4:
                        t = "20000";
                        break;
                    case 5e4:
                        t = "50000";
                        break;
                    case 1e5:
                        t = "100000";
                        break;
                    case 2e5:
                        t = "200000";
                        break;
                    default:
                        t = "00"
                }
                return t
            },
            chipRenderPlaced() {
                let t;
                switch (this.valuePlaced) {
                    case 1:
                        t = "1";
                        break;
                    case 5:
                        t = "5";
                        break;
                    case 10:
                        t = "10";
                        break;
                    case 20:
                        t = "20";
                        break;
                    case 50:
                        t = "50";
                        break;
                    case 100:
                        t = "100";
                        break;
                    case 200:
                        t = "200";
                        break;
                    case 500:
                        t = "500";
                        break;
                    case 1e3:
                        t = "1000";
                        break;
                    case 2e3:
                        t = "2000";
                        break;
                    case 5e3:
                        t = "5000";
                        break;
                    case 1e4:
                        t = "10000";
                        break;
                    case 2e4:
                        t = "20000";
                        break;
                    case 5e4:
                        t = "50000";
                        break;
                    case 1e5:
                        t = "100000";
                        break;
                    case 2e5:
                        t = "200000";
                        break;
                    default:
                        t = "00"
                }
                return t
            }
        }
    },
    Bl = {
        key: 0
    },
    Sl = {
        class: "bettingChip placed"
    },
    Ml = ["src"],
    Al = {
        key: 0,
        class: "absolute left-[50%] top-[45%] translate-x-[-50%] translate-y-[-50%] text-black text-[10px] font-bold"
    },
    Hl = {
        class: "bettingChip"
    },
    Rl = ["src"],
    zl = {
        key: 0,
        class: "absolute left-[50%] top-[45%] translate-x-[-50%] translate-y-[-50%] text-black text-[10px] font-bold"
    };

function jl(t, e, o, k, u, g) {
    return n(), c("div", {
        class: "main",
        style: ie(o.size === "small" ? "scale:0.7;margin-left:-6px;margin-top:-5px;" : "")
    }, [o.valuePlaced !== 0 ? (n(), c("div", Bl, [l("div", Sl, [l("img", {
        src: `/chip/${g.chipRenderPlaced()}.svg`,
        class: "chipVal"
    }, null, 8, Ml), g.chipRenderPlaced() === "00" ? (n(), c("div", Al, d(("useCur" in t ? t.useCur : p(H))(o.valuePlaced)), 1)) : f("", !0)])])) : f("", !0), o.valuePlacing !== 0 ? (n(), c("div", {
        key: 1,
        class: r(o.valuePlaced !== 0 ? "checkMove" : "")
    }, [l("div", Hl, [l("img", {
        src: `/chip/${g.chipRender()}.svg`,
        class: "chipVal"
    }, null, 8, Rl), g.chipRender() === "00" ? (n(), c("div", zl, d(("useCur" in t ? t.useCur : p(H))(o.valuePlacing)), 1)) : f("", !0)])], 2)) : f("", !0)], 4)
}
const oe = V(Cl, [
        ["render", jl],
        ["__scopeId", "data-v-674edf7f"]
    ]),
    Pl = "" + globalThis.__publicAssetsURL("stats/timeline/p.svg"),
    Ol = "" + globalThis.__publicAssetsURL("stats/timeline/b.svg"),
    Il = "" + globalThis.__publicAssetsURL("stats/timeline/t.svg"),
    Gl = "" + globalThis.__publicAssetsURL("stats/basepp.svg"),
    Dl = "" + globalThis.__publicAssetsURL("stats/basebp.svg"),
    ce = "" + globalThis.__publicAssetsURL("hall/table/stop.svg"),
    W = t => (X("data-v-c7e22f1e"), t = t(), ee(), t),
    Ul = {
        class: "flex flex-wrap items-center gap-[1%] mt-[3px] py-[4px] px-[5px] rounded-[6px] bg-white/80"
    },
    Wl = {
        key: 0,
        class: "flex gap-[1%] w-[100%]"
    },
    Nl = ["innerHTML"],
    Vl = ["innerHTML"],
    El = {
        key: 2,
        class: "relative"
    },
    Fl = ["innerHTML"],
    Kl = {
        key: 3,
        class: "relative"
    },
    Zl = ["innerHTML"],
    ql = {
        key: 1,
        class: "flex gap-[3%] justify-center w-[100%]"
    },
    Yl = {
        key: 0,
        class: "relative"
    },
    Jl = ["innerHTML"],
    Ql = {
        key: 1,
        class: "relative"
    },
    Xl = ["innerHTML"],
    et = {
        class: "flex justify-between text-[10px] w-[100%] mt-[5px]"
    },
    lt = {
        class: "flex gap-[8px] text-black items-center"
    },
    tt = {
        class: "block-newline"
    },
    it = {
        class: "flex"
    },
    st = W(() => l("img", {
        class: "w-[11px] mr-[2px]",
        src: Pl
    }, null, -1)),
    at = {
        class: "flex"
    },
    nt = W(() => l("img", {
        class: "w-[11px] mr-[2px]",
        src: Ol
    }, null, -1)),
    ot = {
        class: "flex"
    },
    ct = W(() => l("img", {
        class: "w-[11px] mr-[2px]",
        src: Il
    }, null, -1)),
    dt = {
        class: "flex"
    },
    pt = W(() => l("img", {
        class: "w-[11px] mr-[2px]",
        src: Gl
    }, null, -1)),
    rt = {
        class: "flex"
    },
    ut = W(() => l("img", {
        class: "w-[11px] mr-[2px]",
        src: Dl
    }, null, -1)),
    vt = {
        class: "flex gap-[4px]"
    },
    gt = R('<div data-v-c7e22f1e>P</div><div class="flex bg-white/80 rounded-[8px] p-[2px]" data-v-c7e22f1e><div class="w-[8px]" data-v-c7e22f1e><img src="' + bl + '" data-v-c7e22f1e></div><div class="w-[7px]" data-v-c7e22f1e><img src="' + hl + '" data-v-c7e22f1e></div><div class="w-[8px]" data-v-c7e22f1e><img src="' + kl + '" data-v-c7e22f1e></div></div>', 2),
    bt = [gt],
    mt = R('<div data-v-c7e22f1e>B</div><div class="flex bg-white/80 rounded-[8px] p-[2px]" data-v-c7e22f1e><div class="w-[8px]" data-v-c7e22f1e><img src="' + ml + '" data-v-c7e22f1e></div><div class="w-[7px]" data-v-c7e22f1e><img src="' + fl + '" data-v-c7e22f1e></div><div class="w-[8px]" data-v-c7e22f1e><img src="' + _l + '" data-v-c7e22f1e></div></div>', 2),
    ht = [mt],
    kt = {
        class: "relative flex w-[100%] gap-[1%] pt-[3px] h-[57px]"
    },
    ft = W(() => l("div", null, "1:11", -1)),
    _t = W(() => l("div", null, "1:1", -1)),
    xt = W(() => l("div", null, "1:8", -1)),
    $t = {
        key: 0
    },
    yt = {
        key: 1
    },
    wt = W(() => l("div", null, "1:11", -1)),
    Tt = W(() => l("img", {
        class: "w-[30px]",
        src: ce
    }, null, -1)),
    Lt = {
        class: "w-[50%] h-[80%] flex justify-end items-end gap-[2px]"
    },
    Ct = ["src"],
    Bt = ["src"],
    St = ["src"],
    Mt = {
        class: "absolute top-[20%]"
    },
    At = {
        class: "w-[45%] h-[100%] flex flex-col justify-center items-center"
    },
    Ht = {
        key: 0,
        class: "text-player font-bold font16-14"
    },
    Rt = {
        key: 1,
        class: "text-banker font-bold font16-14"
    },
    zt = {
        key: 2,
        class: "text-tie font-bold font16-14"
    },
    jt = ["innerHTML"],
    Pt = {
        class: "w-[50%] h-[80%] flex items-end gap-[2px]"
    },
    Ot = ["src"],
    It = ["src"],
    Gt = ["src"],
    Dt = {
        class: "absolute top-[20%]"
    },
    Ut = ["innerHTML"],
    Wt = {
        __name: "newMulBetbac",
        props: {
            api: {
                type: Object
            },
            socket: {
                type: Object,
                default () {
                    return {
                        timeLeft: 20
                    }
                }
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
            }
        },
        setup(t) {
            const e = t,
                o = de({
                    player1: "Red",
                    player2: "Red",
                    player3: "",
                    banker1: "Red",
                    banker2: "Red",
                    banker3: "",
                    playerPoint: 0,
                    bankerPoint: 0
                }),
                k = N(() => ne()._bettingType);
            se(() => e.socket.result, () => {
                (e.socket.status === "showResult" || e.socket.status === "PayOut") && (o.value.player1 = e.socket.result.rsBc.player_1, o.value.player2 = e.socket.result.rsBc.player_2, o.value.player3 = e.socket.result.rsBc.player_3, o.value.banker1 = e.socket.result.rsBc.banker_1, o.value.banker2 = e.socket.result.rsBc.banker_2, o.value.banker3 = e.socket.result.rsBc.banker_3, o.value.playerPoint = e.socket.result.rsBc.player123, o.value.bankerPoint = e.socket.result.rsBc.banker123)
            });
            const u = s => {
                    ne().placeBetBac(s, e.socket.roomId, e.socket.gameId, k.value, !0)
                },
                g = s => {
                    ne().askingBac(e.api, s)
                },
                a = N(() => _()._sizing);
            return (s, i) => {
                var T, L, y, C, A, B, z, j, P, O, M, E, F, K, Z, q, Y, $, J, ae;
                const b = oe;
                return n(), c(x, null, [l("div", Ul, [("$storeGlobal" in s ? s.$storeGlobal : p(_))().mulView ? (n(), c("div", Wl, [p(a) === "mobile" ? (n(), c("div", {
                    key: 0,
                    class: "roadmap-timeline",
                    innerHTML: e.api.htmlTimeline6
                }, null, 8, Nl)) : p(a) === "desktop" ? (n(), c("div", {
                    key: 1,
                    class: "roadmap-timeline",
                    innerHTML: e.api.htmlTimeline8
                }, null, 8, Vl)) : f("", !0), p(a) === "mobile" ? (n(), c("div", El, [v(Q, {
                    "goodroad-type": e.api.donut20.isGR
                }, null, 8, ["goodroad-type"]), l("div", {
                    class: "roadmap-donut",
                    innerHTML: e.api.donut20.html
                }, null, 8, Fl)])) : f("", !0), p(a) === "desktop" ? (n(), c("div", Kl, [v(Q, {
                    "goodroad-type": e.api.donut21.isGR
                }, null, 8, ["goodroad-type"]), l("div", {
                    class: "roadmap-donut",
                    innerHTML: e.api.donut21.html
                }, null, 8, Zl)])) : f("", !0)])) : (n(), c("div", ql, [p(a) === "mobile" ? (n(), c("div", Yl, [v(Q, {
                    "goodroad-type": e.api.donut26.isGR
                }, null, 8, ["goodroad-type"]), l("div", {
                    class: "roadmap-donut2",
                    innerHTML: e.api.donut26.html
                }, null, 8, Jl)])) : p(a) === "desktop" ? (n(), c("div", Ql, [v(Q, {
                    "goodroad-type": e.api.donut30.isGR
                }, null, 8, ["goodroad-type"]), l("div", {
                    class: "roadmap-donut2",
                    innerHTML: e.api.donut30.html
                }, null, 8, Xl)])) : f("", !0)])), l("div", et, [l("div", lt, [l("div", tt, " # " + d(e.api.btt.tt), 1), l("div", it, [st, h(d(e.api.btt.player), 1)]), l("div", at, [nt, h(d(e.api.btt.banker), 1)]), l("div", ot, [ct, h(d(e.api.btt.tie), 1)]), l("div", dt, [pt, h(d(e.api.btt.pp), 1)]), l("div", rt, [ut, h(d(e.api.btt.bp), 1)])]), l("div", vt, [l("div", {
                    class: "text-white flex justify-center items-center bg-player rounded-[8px] p-[2px] gap-[4px] clickActive",
                    onClick: i[0] || (i[0] = I => g("p"))
                }, bt), l("div", {
                    class: "text-white flex justify-center items-center bg-banker rounded-[8px] p-[2px] gap-[4px] clickActive",
                    onClick: i[1] || (i[1] = I => g("b"))
                }, ht)])])]), l("div", kt, [l("div", {
                    class: "relative flex flex-col w-[15%] bg-player/30 py-[4px] rounded-[8px] border border-player clickActive insetShadow60px text-[10px]",
                    onClick: i[2] || (i[2] = I => u("playerPair"))
                }, [l("div", null, d(s.$t("player")), 1), l("div", null, d(s.$t("pair")), 1), ft, p(k) === "4Point" ? (n(), G(b, {
                    key: 0,
                    "value-placing": (T = e.placing) == null ? void 0 : T["4Point"].playerPair,
                    "value-placed": (L = e.placed) == null ? void 0 : L["4Point"].playerPair
                }, null, 8, ["value-placing", "value-placed"])) : (n(), G(b, {
                    key: 1,
                    "value-placing": (y = e.placing) == null ? void 0 : y.Baccarat.playerPair,
                    "value-placed": (C = e.placed) == null ? void 0 : C.Baccarat.playerPair
                }, null, 8, ["value-placing", "value-placed"]))]), l("div", {
                    class: r(["relative flex flex-col w-[27.5%] bg-player/30 py-[8px] rounded-[8px] border border-player clickActive insetShadow60px text-[12px]", e.socket.resultWin === "player" ? "bg-player/100 blink" : ""]),
                    onClick: i[3] || (i[3] = I => u("player"))
                }, [l("div", null, d(s.$t("player")), 1), _t, p(k) === "4Point" ? (n(), G(b, {
                    key: 0,
                    "value-placing": (A = e.placing) == null ? void 0 : A["4Point"].player,
                    "value-placed": (B = e.placed) == null ? void 0 : B["4Point"].player
                }, null, 8, ["value-placing", "value-placed"])) : (n(), G(b, {
                    key: 1,
                    "value-placing": (z = e.placing) == null ? void 0 : z.Baccarat.player,
                    "value-placed": (j = e.placed) == null ? void 0 : j.Baccarat.player
                }, null, 8, ["value-placing", "value-placed"]))], 2), l("div", {
                    class: r(["relative flex flex-col w-[15%] bg-tie/30 py-[8px] rounded-[8px] border border-tie clickActive insetShadow60px text-[12px]", e.socket.resultWin === "tie" ? "bg-tie/100 blink" : ""]),
                    onClick: i[4] || (i[4] = I => u("tie"))
                }, [l("div", null, d(s.$t("tie")), 1), xt, p(k) === "4Point" ? (n(), G(b, {
                    key: 0,
                    "value-placing": (P = e.placing) == null ? void 0 : P["4Point"].tie,
                    "value-placed": (O = e.placed) == null ? void 0 : O["4Point"].tie
                }, null, 8, ["value-placing", "value-placed"])) : (n(), G(b, {
                    key: 1,
                    "value-placing": (M = e.placing) == null ? void 0 : M.Baccarat.tie,
                    "value-placed": (E = e.placed) == null ? void 0 : E.Baccarat.tie
                }, null, 8, ["value-placing", "value-placed"]))], 2), l("div", {
                    class: r(["relative flex flex-col w-[27.5%] bg-banker/30 py-[8px] rounded-[8px] border border-banker clickActive insetShadow60px text-[12px]", e.socket.resultWin === "banker" ? "bg-banker/100 blink" : ""]),
                    onClick: i[5] || (i[5] = I => u("banker"))
                }, [l("div", null, d(s.$t("banker")), 1), p(k) === "4Point" ? (n(), c("div", $t, " 1:0.96 ")) : (n(), c("div", yt, " 1:0.95 ")), p(k) === "4Point" ? (n(), G(b, {
                    key: 2,
                    "value-placing": (F = e.placing) == null ? void 0 : F["4Point"].banker,
                    "value-placed": (K = e.placed) == null ? void 0 : K["4Point"].banker
                }, null, 8, ["value-placing", "value-placed"])) : (n(), G(b, {
                    key: 3,
                    "value-placing": (Z = e.placing) == null ? void 0 : Z.Baccarat.banker,
                    "value-placed": (q = e.placed) == null ? void 0 : q.Baccarat.banker
                }, null, 8, ["value-placing", "value-placed"]))], 2), l("div", {
                    class: "relative flex flex-col w-[15%] bg-banker/30 py-[4px] rounded-[8px] border border-banker clickActive insetShadow60px text-[10px]",
                    onClick: i[6] || (i[6] = I => u("bankerPair"))
                }, [l("div", null, d(s.$t("banker")), 1), l("div", null, d(s.$t("pair")), 1), wt, p(k) === "4Point" ? (n(), G(b, {
                    key: 0,
                    "value-placing": (Y = e.placing) == null ? void 0 : Y["4Point"].bankerPair,
                    "value-placed": ($ = e.placed) == null ? void 0 : $["4Point"].bankerPair
                }, null, 8, ["value-placing", "value-placed"])) : (n(), G(b, {
                    key: 1,
                    "value-placing": (J = e.placing) == null ? void 0 : J.Baccarat.bankerPair,
                    "value-placed": (ae = e.placed) == null ? void 0 : ae.Baccarat.bankerPair
                }, null, 8, ["value-placing", "value-placed"]))]), l("div", {
                    id: "noMoreBet",
                    class: r(["absolute flex flex-col justify-center items-center bg-black/70 left-0 right-0 top-[6px] bottom-0 rounded m-[-3px]", e.socket.timeLeft === 0 && e.socket.status === "CountDown" ? "block" : "hidden"])
                }, [Tt, l("div", null, d(s.$t("nomorebet")), 1)], 2), l("div", {
                    id: "showResult",
                    class: r(["absolute flex justify-center items-center gap-[2%] bg-black/70 left-0 right-0 top-[6px] bottom-0 rounded m-[-3px]", e.socket.status === "showResult" || e.socket.status === "PayOut" ? "block" : "hidden"])
                }, [l("div", Lt, [p(o).player3 ? (n(), c("img", {
                    key: 0,
                    class: "w-[22px] rotate-90 mr-[5px] mb-[-4px]",
                    src: `/card/2/${p(o).player3||"Red"}.png`
                }, null, 8, Ct)) : f("", !0), l("img", {
                    class: "w-[22px]",
                    src: `/card/2/${p(o).player1||"Red"}.png`
                }, null, 8, Bt), l("img", {
                    class: "w-[22px] mr-[10%]",
                    src: `/card/2/${p(o).player2||"Red"}.png`
                }, null, 8, St), l("div", Mt, d(p(o).playerPoint), 1)]), l("div", At, [e.socket.resultWin === "player" ? (n(), c("div", Ht, d(s.$t("playerwin")), 1)) : e.socket.resultWin === "banker" ? (n(), c("div", Rt, d(s.$t("bankerwin")), 1)) : e.socket.resultWin === "tie" ? (n(), c("div", zt, d(s.$t("tiewin")), 1)) : f("", !0), l("div", {
                    class: "font14-10",
                    innerHTML: e.endPayOut.msgHTML
                }, null, 8, jt)]), l("div", Pt, [l("img", {
                    class: "w-[22px] ml-[10%]",
                    src: `/card/2/${p(o).banker1||"Red"}.png`
                }, null, 8, Ot), l("img", {
                    class: "w-[22px]",
                    src: `/card/2/${p(o).banker2||"Red"}.png`
                }, null, 8, It), p(o).banker3 ? (n(), c("img", {
                    key: 0,
                    class: "w-[22px] -rotate-90 ml-[5px] mb-[-4px]",
                    src: `/card/2/${p(o).banker3||"Red"}.png`
                }, null, 8, Gt)) : f("", !0), l("div", Dt, d(p(o).bankerPoint), 1)])], 2), l("div", {
                    id: "dialog",
                    class: r(["absolute flex flex-col justify-center items-center gap-[2%] bg-black/70 left-0 right-0 top-[6px] bottom-0 rounded m-[-3px]", e.dialog.isOpen ? "block" : "hidden"]),
                    onClick: i[7] || (i[7] = I => e.dialog.code === 998 ? ("$storeGlobal" in s ? s.$storeGlobal : p(_))().getDemo() : ""),
                    innerHTML: e.dialog.msgHTML
                }, null, 10, Ut)])], 64)
            }
        }
    },
    lo = V(Wt, [
        ["__scopeId", "data-v-c7e22f1e"]
    ]),
    Nt = "" + globalThis.__publicAssetsURL("stats/dt/p.svg"),
    Vt = "" + globalThis.__publicAssetsURL("stats/dt/b.svg"),
    Et = "" + globalThis.__publicAssetsURL("stats/dt/t.svg"),
    te = t => (X("data-v-ba359bfe"), t = t(), ee(), t),
    Ft = {
        class: "flex flex-wrap items-center gap-[1%] mt-[3px] py-[4px] px-[5px] rounded-[6px] bg-white/80"
    },
    Kt = {
        key: 0,
        class: "flex gap-[1%] w-[100%]"
    },
    Zt = ["innerHTML"],
    qt = ["innerHTML"],
    Yt = {
        key: 2,
        class: "relative"
    },
    Jt = ["innerHTML"],
    Qt = {
        key: 3,
        class: "relative"
    },
    Xt = ["innerHTML"],
    ei = {
        key: 1,
        class: "flex gap-[3%] justify-center w-[100%]"
    },
    li = {
        key: 0,
        class: "relative"
    },
    ti = ["innerHTML"],
    ii = {
        key: 1,
        class: "relative"
    },
    si = ["innerHTML"],
    ai = {
        class: "flex justify-between text-[10px] w-[100%] mt-[5px]"
    },
    ni = {
        class: "flex gap-[8px] text-black items-center"
    },
    oi = {
        class: "block-newline"
    },
    ci = {
        class: "flex"
    },
    di = te(() => l("img", {
        class: "w-[11px] mr-[2px]",
        src: Nt
    }, null, -1)),
    pi = {
        class: "flex"
    },
    ri = te(() => l("img", {
        class: "w-[11px] mr-[2px]",
        src: Vt
    }, null, -1)),
    ui = {
        class: "flex"
    },
    vi = te(() => l("img", {
        class: "w-[11px] mr-[2px]",
        src: Et
    }, null, -1)),
    gi = {
        class: "flex gap-[4px]"
    },
    bi = R('<div data-v-ba359bfe>D</div><div class="flex bg-white/80 rounded-[8px] p-[2px]" data-v-ba359bfe><div class="w-[8px]" data-v-ba359bfe><img src="' + ml + '" data-v-ba359bfe></div><div class="w-[7px]" data-v-ba359bfe><img src="' + fl + '" data-v-ba359bfe></div><div class="w-[8px]" data-v-ba359bfe><img src="' + _l + '" data-v-ba359bfe></div></div>', 2),
    mi = [bi],
    hi = R('<div data-v-ba359bfe>T</div><div class="flex bg-white/80 rounded-[8px] p-[2px]" data-v-ba359bfe><div class="w-[8px]" data-v-ba359bfe><img src="' + bl + '" data-v-ba359bfe></div><div class="w-[7px]" data-v-ba359bfe><img src="' + hl + '" data-v-ba359bfe></div><div class="w-[8px]" data-v-ba359bfe><img src="' + kl + '" data-v-ba359bfe></div></div>', 2),
    ki = [hi],
    fi = {
        class: "relative flex w-[100%] gap-[2%] h-[57px] pt-[3px]"
    },
    _i = te(() => l("div", null, "1:1", -1)),
    xi = te(() => l("div", null, "1:8", -1)),
    $i = te(() => l("div", null, "1:1", -1)),
    yi = te(() => l("img", {
        class: "w-[30px]",
        src: ce
    }, null, -1)),
    wi = {
        class: "w-[50%] h-[80%] flex justify-end items-end gap-[2px]"
    },
    Ti = ["src"],
    Li = {
        class: "absolute top-[15%]"
    },
    Ci = {
        class: "w-[45%] h-[100%] flex flex-col justify-center items-center"
    },
    Bi = {
        key: 0,
        class: "text-banker font-bold font16-14"
    },
    Si = {
        key: 1,
        class: "text-player font-bold font16-14"
    },
    Mi = {
        key: 2,
        class: "text-tie font-bold font16-14"
    },
    Ai = ["innerHTML"],
    Hi = {
        class: "w-[50%] h-[80%] flex items-end gap-[2px]"
    },
    Ri = {
        class: "absolute top-[15%]"
    },
    zi = ["src"],
    ji = ["innerHTML"],
    Pi = {
        __name: "newMulBetdt",
        props: {
            api: {
                type: Object
            },
            socket: {
                type: Object,
                default () {
                    return {
                        timeLeft: 20
                    }
                }
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
            }
        },
        setup(t) {
            const e = t,
                o = de({
                    player1: "Red",
                    banker1: "Red",
                    playerPoint: 0,
                    bankerPoint: 0
                });
            pe(() => {}), se(() => e.socket.result, () => {
                (e.socket.status === "showResult" || e.socket.status === "PayOut") && (o.value.player1 = e.socket.result.rsDr.dragon, o.value.banker1 = e.socket.result.rsDr.tiger, o.value.playerPoint = e.socket.result.rsDr.dragon_tt, o.value.bankerPoint = e.socket.result.rsDr.tiger_tt)
            });
            const k = a => {
                    ne().placeBetDt(a, e.socket.roomId, e.socket.gameId, !0)
                },
                u = a => {
                    ne().askingDt(e.api, a)
                },
                g = N(() => _()._sizing);
            return (a, s) => {
                var b, T, L, y, C, A;
                const i = oe;
                return n(), c(x, null, [l("div", Ft, [("$storeGlobal" in a ? a.$storeGlobal : p(_))().mulView ? (n(), c("div", Kt, [p(g) === "mobile" ? (n(), c("div", {
                    key: 0,
                    class: "roadmap-timeline",
                    innerHTML: e.api.htmlTimeline6
                }, null, 8, Zt)) : p(g) === "desktop" ? (n(), c("div", {
                    key: 1,
                    class: "roadmap-timeline",
                    innerHTML: e.api.htmlTimeline8
                }, null, 8, qt)) : f("", !0), p(g) === "mobile" ? (n(), c("div", Yt, [v(Q, {
                    "goodroad-type": e.api.donut20.isGR
                }, null, 8, ["goodroad-type"]), l("div", {
                    class: "roadmap-donut",
                    innerHTML: e.api.donut20.html
                }, null, 8, Jt)])) : f("", !0), p(g) === "desktop" ? (n(), c("div", Qt, [v(Q, {
                    "goodroad-type": e.api.donut21.isGR
                }, null, 8, ["goodroad-type"]), l("div", {
                    class: "roadmap-donut",
                    innerHTML: e.api.donut21.html
                }, null, 8, Xt)])) : f("", !0)])) : (n(), c("div", ei, [p(g) === "mobile" ? (n(), c("div", li, [v(Q, {
                    "goodroad-type": e.api.donut26.isGR
                }, null, 8, ["goodroad-type"]), l("div", {
                    class: "roadmap-donut2",
                    innerHTML: e.api.donut26.html
                }, null, 8, ti)])) : p(g) === "desktop" ? (n(), c("div", ii, [v(Q, {
                    "goodroad-type": e.api.donut30.isGR
                }, null, 8, ["goodroad-type"]), l("div", {
                    class: "roadmap-donut2",
                    innerHTML: e.api.donut30.html
                }, null, 8, si)])) : f("", !0)])), l("div", ai, [l("div", ni, [l("div", oi, " # " + d(e.api.dtt.tt), 1), l("div", ci, [di, h(d(e.api.dtt.dr), 1)]), l("div", pi, [ri, h(d(e.api.dtt.tg), 1)]), l("div", ui, [vi, h(d(e.api.dtt.tie), 1)])]), l("div", gi, [l("div", {
                    class: "text-white flex justify-center items-center bg-banker rounded-[8px] p-[2px] gap-[4px] clickActive",
                    onClick: s[0] || (s[0] = B => u("p"))
                }, mi), l("div", {
                    class: "text-white flex justify-center items-center bg-player rounded-[8px] p-[2px] gap-[4px] clickActive",
                    onClick: s[1] || (s[1] = B => u("b"))
                }, ki)])])]), l("div", fi, [l("div", {
                    class: r(["relative flex flex-col w-[40%] bg-banker/30 py-[7px] text-[12px] rounded-[8px] border border-banker clickActive overflow-hidden insetShadow60px", e.socket.resultWin === "DRAGON" ? "bg-banker/100 blink" : ""]),
                    onClick: s[2] || (s[2] = B => k("dragon"))
                }, [l("div", null, d(a.$t("dragon")), 1), _i, v(i, {
                    "value-placing": (b = e.placing) == null ? void 0 : b.dragon,
                    "value-placed": (T = e.placed) == null ? void 0 : T.dragon
                }, null, 8, ["value-placing", "value-placed"])], 2), l("div", {
                    class: r(["relative flex flex-col w-[20%] bg-tie/30 py-[7px] text-[12px] rounded-[8px] border border-tie clickActive overflow-hidden insetShadow60px", e.socket.resultWin === "TIE" ? "bg-tie/100 blink" : ""]),
                    onClick: s[3] || (s[3] = B => k("tie"))
                }, [l("div", null, d(a.$t("tie")), 1), xi, v(i, {
                    "value-placing": (L = e.placing) == null ? void 0 : L.tie,
                    "value-placed": (y = e.placed) == null ? void 0 : y.tie
                }, null, 8, ["value-placing", "value-placed"])], 2), l("div", {
                    class: r(["relative flex flex-col w-[40%] bg-player/30 py-[7px] text-[12px] rounded-[8px] border border-player clickActive overflow-hidden insetShadow60px", e.socket.resultWin === "TIGER" ? "bg-banker/100 blink" : ""]),
                    onClick: s[4] || (s[4] = B => k("tiger"))
                }, [l("div", null, d(a.$t("tiger")), 1), $i, v(i, {
                    "value-placing": (C = e.placing) == null ? void 0 : C.tiger,
                    "value-placed": (A = e.placed) == null ? void 0 : A.tiger
                }, null, 8, ["value-placing", "value-placed"])], 2), l("div", {
                    id: "noMoreBet",
                    class: r(["absolute flex flex-col justify-center items-center bg-black/70 left-0 right-0 top-[6px] bottom-0 rounded m-[-3px]", e.socket.timeLeft === 0 && e.socket.status === "CountDown" ? "block" : "hidden"])
                }, [yi, l("div", null, d(a.$t("nomorebet")), 1)], 2), l("div", {
                    id: "showResult",
                    class: r(["absolute flex justify-center items-center gap-[2%] bg-black/70 left-0 right-0 top-[6px] bottom-0 rounded m-[-3px]", e.socket.status === "showResult" || e.socket.status === "PayOut" ? "block" : "hidden"])
                }, [l("div", wi, [l("img", {
                    class: "w-[22px] mr-[15%]",
                    src: `/card/2/${p(o).player1||"Red"}.png`
                }, null, 8, Ti), l("div", Li, d(p(o).playerPoint), 1)]), l("div", Ci, [e.socket.resultWin === "DRAGON" ? (n(), c("div", Bi, d(a.$t("dragonwin")), 1)) : e.socket.resultWin === "TIGER" ? (n(), c("div", Si, d(a.$t("tigerwin")), 1)) : e.socket.resultWin === "TIE" ? (n(), c("div", Mi, d(a.$t("tiewin")), 1)) : f("", !0), l("div", {
                    class: "font14-10",
                    innerHTML: e.endPayOut.msgHTML
                }, null, 8, Ai)]), l("div", Hi, [l("div", Ri, d(p(o).bankerPoint), 1), l("img", {
                    class: "w-[22px] ml-[15%]",
                    src: `/card/2/${p(o).banker1||"Red"}.png`
                }, null, 8, zi)])], 2), l("div", {
                    id: "dialog",
                    class: r(["absolute flex flex-col justify-center items-center gap-[2%] bg-black/70 left-0 right-0 top-[6px] bottom-0 rounded m-[-3px]", e.dialog.isOpen ? "block" : "hidden"]),
                    onClick: s[5] || (s[5] = B => e.dialog.code === 998 ? ("$storeGlobal" in a ? a.$storeGlobal : p(_))().getDemo() : ""),
                    innerHTML: e.dialog.msgHTML
                }, null, 10, ji)])], 64)
            }
        }
    },
    to = V(Pi, [
        ["__scopeId", "data-v-ba359bfe"]
    ]),
    Oi = "" + globalThis.__publicAssetsURL("hall/game_sedie.svg"),
    D = "" + globalThis.__publicAssetsURL("sedie/w.svg"),
    U = "" + globalThis.__publicAssetsURL("sedie/r.svg"),
    le = t => (X("data-v-ecb0656f"), t = t(), ee(), t),
    Ii = {
        class: "flex flex-wrap items-center gap-[1%] mt-[3px] mb-[6px] py-[4px] px-[5px] rounded-[6px] bg-white/80"
    },
    Gi = {
        class: "flex gap-[1%] w-[100%]"
    },
    Di = ["innerHTML"],
    Ui = ["innerHTML"],
    Wi = ["innerHTML"],
    Ni = ["innerHTML"],
    Vi = {
        class: "flex justify-between text-[10px] w-[100%] mt-[5px]"
    },
    Ei = {
        class: "flex gap-[8px] text-black items-center"
    },
    Fi = {
        class: "text-black"
    },
    Ki = {
        class: "flex gap-[2px]"
    },
    Zi = le(() => l("div", {
        class: "bg-player rounded-[50%] w-[13px] h-[13px] text-white"
    }, " O ", -1)),
    qi = {
        class: "flex gap-[2px]"
    },
    Yi = le(() => l("div", {
        class: "bg-banker rounded-[50%] w-[13px] h-[13px] text-white"
    }, " E ", -1)),
    Ji = {
        class: "flex gap-[2px]"
    },
    Qi = le(() => l("div", {
        class: "bg-player rounded-[50%] w-[13px] h-[13px] text-white"
    }, " S ", -1)),
    Xi = {
        class: "flex gap-[2px]"
    },
    es = le(() => l("div", {
        class: "bg-banker rounded-[50%] w-[13px] h-[13px text-white"
    }, " B ", -1)),
    ls = {
        class: "relative flex w-[100%] gap-[2%] pt-[4px] mt-[-6px]"
    },
    ts = {
        class: "w-[33%] h-[100%] flex flex-col gap-[4px]"
    },
    is = R('<div class="bet-top" data-v-ecb0656f><div class="point-white" data-v-ecb0656f>   </div><div class="point-white" data-v-ecb0656f>   </div><div class="point-white" data-v-ecb0656f>   </div><div class="point-white" data-v-ecb0656f> 0 </div></div><div class="bet-bot" data-v-ecb0656f> 1:14 </div>', 2),
    ss = R('<div class="bet-top" data-v-ecb0656f><div class="point-white" data-v-ecb0656f>   </div><div class="point-white" data-v-ecb0656f>   </div><div class="point-white" data-v-ecb0656f>   </div><div class="point-red" data-v-ecb0656f> 1 </div></div><div class="bet-bot" data-v-ecb0656f> 1:2.8 </div>', 2),
    as = {
        class: "w-[33%] h-[100%] flex flex-col gap-[4px]"
    },
    ns = {
        class: "bet-top named"
    },
    os = le(() => l("div", {
        class: "bet-bot"
    }, " 1:0.96 ", -1)),
    cs = {
        class: "bet-top named"
    },
    ds = le(() => l("div", {
        class: "bet-bot"
    }, " 1:0.96 ", -1)),
    ps = {
        class: "w-[33%] h-[100%] flex flex-col gap-[4px]"
    },
    rs = R('<div class="bet-top" data-v-ecb0656f><div class="point-red" data-v-ecb0656f>   </div><div class="point-red" data-v-ecb0656f>   </div><div class="point-red" data-v-ecb0656f>   </div><div class="point-red" data-v-ecb0656f> 4 </div></div><div class="bet-bot" data-v-ecb0656f> 1:14 </div>', 2),
    us = R('<div class="bet-top" data-v-ecb0656f><div class="point-white" data-v-ecb0656f>   </div><div class="point-red" data-v-ecb0656f>   </div><div class="point-red" data-v-ecb0656f>   </div><div class="point-red" data-v-ecb0656f> 3 </div></div><div class="bet-bot" data-v-ecb0656f> 1:2.8 </div>', 2),
    vs = le(() => l("img", {
        class: "w-[30px]",
        src: ce
    }, null, -1)),
    gs = le(() => l("img", {
        class: "w-[30px]",
        src: Oi
    }, null, -1)),
    bs = {
        key: 0,
        class: "flex"
    },
    ms = R('<img src="' + D + '" data-v-ecb0656f><img src="' + D + '" data-v-ecb0656f><img src="' + D + '" data-v-ecb0656f><div class="image-container" data-v-ecb0656f><img src="' + D + '" data-v-ecb0656f><div class="text-overlay" data-v-ecb0656f><span class="text-banker" data-v-ecb0656f>0</span></div></div>', 4),
    hs = [ms],
    ks = {
        key: 1,
        class: "flex"
    },
    fs = R('<img src="' + D + '" data-v-ecb0656f><img src="' + D + '" data-v-ecb0656f><img src="' + D + '" data-v-ecb0656f><div class="image-container" data-v-ecb0656f><img src="' + U + '" data-v-ecb0656f><div class="text-overlay" data-v-ecb0656f><span class="text-white" data-v-ecb0656f>1</span></div></div>', 4),
    _s = [fs],
    xs = {
        key: 2,
        class: "flex"
    },
    $s = R('<img src="' + D + '" data-v-ecb0656f><img src="' + D + '" data-v-ecb0656f><img src="' + U + '" data-v-ecb0656f><div class="image-container" data-v-ecb0656f><img src="' + U + '" data-v-ecb0656f><div class="text-overlay" data-v-ecb0656f><span class="text-white" data-v-ecb0656f>2</span></div></div>', 4),
    ys = [$s],
    ws = {
        key: 3,
        class: "flex"
    },
    Ts = R('<img src="' + D + '" data-v-ecb0656f><img src="' + U + '" data-v-ecb0656f><img src="' + U + '" data-v-ecb0656f><div class="image-container" data-v-ecb0656f><img src="' + U + '" data-v-ecb0656f><div class="text-overlay" data-v-ecb0656f><span class="text-white" data-v-ecb0656f>3</span></div></div>', 4),
    Ls = [Ts],
    Cs = {
        key: 4,
        class: "flex"
    },
    Bs = R('<img src="' + U + '" data-v-ecb0656f><img src="' + U + '" data-v-ecb0656f><img src="' + U + '" data-v-ecb0656f><div class="image-container" data-v-ecb0656f><img src="' + U + '" data-v-ecb0656f><div class="text-overlay" data-v-ecb0656f><span class="text-white" data-v-ecb0656f>4</span></div></div>', 4),
    Ss = [Bs],
    Ms = ["innerHTML"],
    As = ["innerHTML"],
    Hs = {
        __name: "newMulBetsed",
        props: {
            api: {
                type: Object
            },
            socket: {
                type: Object,
                default () {
                    return {
                        timeLeft: 20
                    }
                }
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
            }
        },
        setup(t) {
            const e = t;
            pe(() => {}), se(() => e.socket.result, () => {
                e.socket.status === "showResult" || e.socket.status
            });
            const o = g => {
                    yl().placeBetSedie(g, e.socket.roomId, e.socket.gameId, !0)
                },
                k = N(() => _()._sizing),
                u = g => e.socket.resultWin ? e.socket.resultWin.find(s => s === g) !== void 0 : !1;
            return (g, a) => {
                var i, b, T, L, y, C, A, B, z, j, P, O;
                const s = oe;
                return n(), c(x, null, [l("div", Ii, [l("div", Gi, [p(k) === "mobile" ? (n(), c("div", {
                    key: 0,
                    class: "roadmap-timeline",
                    innerHTML: e.api.htmlTimeline6
                }, null, 8, Di)) : p(k) === "desktop" ? (n(), c("div", {
                    key: 1,
                    class: "roadmap-timeline",
                    innerHTML: e.api.htmlTimeline8
                }, null, 8, Ui)) : f("", !0), p(k) === "mobile" ? (n(), c("div", {
                    key: 2,
                    class: "roadmap-donut",
                    innerHTML: e.api.oddEven20.point
                }, null, 8, Wi)) : f("", !0), p(k) === "desktop" ? (n(), c("div", {
                    key: 3,
                    class: "roadmap-donut",
                    innerHTML: e.api.oddEven21.point
                }, null, 8, Ni)) : f("", !0)]), l("div", Vi, [l("div", Ei, [l("div", Fi, " # " + d(e.api.sdtt.tt), 1), l("div", Ki, [Zi, l("div", null, d(e.api.sdtt.odd), 1)]), l("div", qi, [Yi, l("div", null, d(e.api.sdtt.even), 1)]), l("div", Ji, [Qi, l("div", null, d(e.api.sdtt.sm), 1)]), l("div", Xi, [es, l("div", null, d(e.api.sdtt.big), 1)])])])]), l("div", ls, [l("div", ts, [l("div", {
                    class: r(["bet-normal clickActive", u("0") ? "win blink" : ""]),
                    onClick: a[0] || (a[0] = M => o("0"))
                }, [is, v(s, {
                    "value-placing": (i = e.placing) == null ? void 0 : i["0"],
                    "value-placed": (b = e.placed) == null ? void 0 : b["0"]
                }, null, 8, ["value-placing", "value-placed"])], 2), l("div", {
                    class: r(["bet-normal clickActive", u("1") ? "win blink" : ""]),
                    onClick: a[1] || (a[1] = M => o("1"))
                }, [ss, v(s, {
                    "value-placing": (T = e.placing) == null ? void 0 : T["1"],
                    "value-placed": (L = e.placed) == null ? void 0 : L["1"]
                }, null, 8, ["value-placing", "value-placed"])], 2)]), l("div", as, [l("div", {
                    class: r(["bet-blue clickActive", u("odd") ? "win blink" : ""]),
                    onClick: a[2] || (a[2] = M => o("odd"))
                }, [l("div", ns, d(g.$t("odd")), 1), os, v(s, {
                    "value-placing": (y = e.placing) == null ? void 0 : y.odd,
                    "value-placed": (C = e.placed) == null ? void 0 : C.odd
                }, null, 8, ["value-placing", "value-placed"])], 2), l("div", {
                    class: r(["bet-red clickActive", u("even") ? "win blink" : ""]),
                    onClick: a[3] || (a[3] = M => o("even"))
                }, [l("div", cs, d(g.$t("even")), 1), ds, v(s, {
                    "value-placing": (A = e.placing) == null ? void 0 : A.even,
                    "value-placed": (B = e.placed) == null ? void 0 : B.even
                }, null, 8, ["value-placing", "value-placed"])], 2)]), l("div", ps, [l("div", {
                    class: r(["bet-normal clickActive", u("4") ? "win blink" : ""]),
                    onClick: a[4] || (a[4] = M => o("4"))
                }, [rs, v(s, {
                    "value-placing": (z = e.placing) == null ? void 0 : z["4"],
                    "value-placed": (j = e.placed) == null ? void 0 : j["4"]
                }, null, 8, ["value-placing", "value-placed"])], 2), l("div", {
                    class: r(["bet-normal clickActive", u("3") ? "win blink" : ""]),
                    onClick: a[5] || (a[5] = M => o("3"))
                }, [us, v(s, {
                    "value-placing": (P = e.placing) == null ? void 0 : P["3"],
                    "value-placed": (O = e.placed) == null ? void 0 : O["3"]
                }, null, 8, ["value-placing", "value-placed"])], 2)]), l("div", {
                    id: "noMoreBet",
                    class: r(["absolute flex flex-col justify-center items-center bg-black/70 left-0 right-0 top-[6px] bottom-0 rounded m-[-3px]", e.socket.timeLeft === 0 && e.socket.status === "CountDown" ? "block" : "hidden"])
                }, [vs, l("div", null, d(g.$t("nomorebet")), 1)], 2), l("div", {
                    class: r(["absolute flex flex-col justify-center items-center bg-black/70 left-0 right-0 top-[6px] bottom-0 rounded m-[-3px]", e.socket.status === "showResult" ? "block" : "hidden"])
                }, [gs, l("div", null, d(g.$t("waitingforres")), 1)], 2), e.socket.status === "PayOut" && e.endPayOut.msgHTML ? (n(), c("div", {
                    key: 0,
                    id: "showResult",
                    class: r(["absolute flex flex-col justify-center items-center gap-[2%] bg-black/70 left-0 right-0 top-[6px] bottom-0 rounded m-[-3px]", e.socket.status === "showResult" || e.socket.status === "PayOut" ? "block" : "hidden"])
                }, [e.socket.resultWin[0] === "0" ? (n(), c("div", bs, hs)) : e.socket.resultWin[0] === "1" ? (n(), c("div", ks, _s)) : e.socket.resultWin[0] === "2" ? (n(), c("div", xs, ys)) : e.socket.resultWin[0] === "3" ? (n(), c("div", ws, Ls)) : e.socket.resultWin[0] === "4" ? (n(), c("div", Cs, Ss)) : f("", !0), l("div", {
                    class: "font14-10",
                    innerHTML: e.endPayOut.msgHTML
                }, null, 8, Ms)], 2)) : f("", !0), l("div", {
                    id: "dialog",
                    class: r(["absolute flex flex-col justify-center items-center gap-[2%] bg-black/70 left-0 right-0 top-[6px] bottom-0 rounded m-[-3px]", e.dialog.isOpen ? "block" : "hidden"]),
                    onClick: a[6] || (a[6] = M => e.dialog.code === 998 ? ("$storeGlobal" in g ? g.$storeGlobal : p(_))().getDemo() : ""),
                    innerHTML: e.dialog.msgHTML
                }, null, 10, As)])], 64)
            }
        }
    },
    io = V(Hs, [
        ["__scopeId", "data-v-ecb0656f"]
    ]),
    Rs = "" + globalThis.__publicAssetsURL("stats/sicbo/1.svg"),
    zs = "" + globalThis.__publicAssetsURL("stats/sicbo/2.svg"),
    js = "" + globalThis.__publicAssetsURL("stats/sicbo/3.svg"),
    Ps = "" + globalThis.__publicAssetsURL("stats/sicbo/4.svg"),
    Os = "" + globalThis.__publicAssetsURL("stats/sicbo/5.svg"),
    Is = "" + globalThis.__publicAssetsURL("stats/sicbo/6.svg"),
    Gs = "" + globalThis.__publicAssetsURL("hilo/1.svg"),
    Ds = "" + globalThis.__publicAssetsURL("hilo/2.svg"),
    Us = "" + globalThis.__publicAssetsURL("hilo/3.svg"),
    Ws = "" + globalThis.__publicAssetsURL("hilo/4.svg"),
    Ns = "" + globalThis.__publicAssetsURL("hilo/5.svg"),
    Vs = "" + globalThis.__publicAssetsURL("hilo/6.svg"),
    Es = "" + globalThis.__publicAssetsURL("waiting.svg"),
    w = t => (X("data-v-09540ded"), t = t(), ee(), t),
    Fs = {
        class: "flex justify-center mt-[6px]"
    },
    Ks = ["innerHTML"],
    Zs = ["innerHTML"],
    qs = ["innerHTML"],
    Ys = {
        key: 2,
        class: "bg-bgDark/50 absolute bottom-1 right-1 rounded-[4px] p-[2px]"
    },
    Js = {
        key: 3,
        class: "bg-bgDark/50 absolute bottom-1 right-1 rounded-[4px] p-[2px]"
    },
    Qs = {
        key: 1,
        class: "w-[357px] flex flex-wrap ml-[-2px] mt-[0px] bg-white p-[3px] relative rounded-[5px]"
    },
    Xs = ["innerHTML"],
    ea = {
        key: 2,
        class: "w-[357px] flex flex-wrap ml-[-2px] mt-[0px] bg-white p-[3px] relative rounded-[5px]"
    },
    la = ["innerHTML"],
    ta = {
        class: "relative w-[100%] pt-[3px]"
    },
    ia = {
        key: 0,
        class: "flex flex-col gap-[1px]"
    },
    sa = {
        class: "flex w-full h-[25%] gap-[1px]"
    },
    aa = {
        class: "text-[12px] smallpoint"
    },
    na = w(() => l("div", {
        class: "text-[10px]"
    }, " 4-10 ", -1)),
    oa = w(() => l("div", {
        class: "text-[10px]"
    }, "   ", -1)),
    ca = {
        class: "text-[12px]"
    },
    da = w(() => l("div", {
        class: "text-[10px]"
    }, "   ", -1)),
    pa = {
        class: "text-[12px] bigpoint"
    },
    ra = w(() => l("div", {
        class: "text-[10px]"
    }, " 11-17 ", -1)),
    ua = {
        class: "flex w-full h-[25%] gap-[1px]"
    },
    va = w(() => l("img", {
        src: Rs
    }, null, -1)),
    ga = w(() => l("img", {
        src: zs
    }, null, -1)),
    ba = w(() => l("img", {
        src: js
    }, null, -1)),
    ma = w(() => l("img", {
        src: Ps
    }, null, -1)),
    ha = w(() => l("img", {
        src: Os
    }, null, -1)),
    ka = w(() => l("img", {
        src: Is
    }, null, -1)),
    fa = {
        class: "flex w-full h-[20%] gap-[1px]"
    },
    _a = {
        class: "flex w-full h-[20%] gap-[1px]"
    },
    xa = {
        key: 1,
        class: "flex flex-wrap gap-[1px] rounded-[5px] overflow-hidden"
    },
    $a = w(() => l("img", {
        src: Gs,
        class: "w-[40%]"
    }, null, -1)),
    ya = w(() => l("img", {
        src: Ds,
        class: "w-[40%]"
    }, null, -1)),
    wa = w(() => l("img", {
        src: Us,
        class: "w-[40%]"
    }, null, -1)),
    Ta = w(() => l("img", {
        src: Ws,
        class: "w-[40%]"
    }, null, -1)),
    La = w(() => l("img", {
        src: Ns,
        class: "w-[40%]"
    }, null, -1)),
    Ca = w(() => l("img", {
        src: Vs,
        class: "w-[40%]"
    }, null, -1)),
    Ba = {
        key: 2,
        class: "flex flex-wrap gap-[1px] rounded-[5px] overflow-hidden"
    },
    Sa = w(() => l("img", {
        class: "w-[30px]",
        src: ce
    }, null, -1)),
    Ma = w(() => l("img", {
        class: "w-[30px]",
        src: Es
    }, null, -1)),
    Aa = {
        class: "relative flex flex-col"
    },
    Ha = {
        class: "relative flex"
    },
    Ra = ["src"],
    za = ["src"],
    ja = ["src"],
    Pa = ["innerHTML"],
    Oa = ["innerHTML"],
    Ia = {
        __name: "newMulBetsicbo",
        props: {
            api: {
                type: Object
            },
            socket: {
                type: Object,
                default () {
                    return {
                        timeLeft: 20
                    }
                }
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
            gametype: {
                type: String
            }
        },
        setup(t) {
            const e = t;
            pe(() => {}), se(() => e.socket.result, () => {
                e.socket.status === "showResult" || e.socket.status
            });
            const o = s => {
                    wl().placeBetSicBo(s, e.socket.roomId, e.socket.gameId, e.gametype, !0)
                },
                k = N(() => _()._sizing),
                u = de(!0),
                g = N(() => e.socket.result.rsSic.split(",")),
                a = s => e.socket.resultWin ? e.socket.resultWin.find(b => b === s) !== void 0 : !1;
            return (s, i) => {
                var T, L, y, C, A, B, z, j, P, O, M, E, F, K, Z, q, Y, $, J, ae, I, ve, ge, be, me, he, ke, fe, _e, xe, $e, ye, we, Te, Le, Ce, Be, Se, Me, Ae, He, Re, ze, je, Pe, Oe, Ie, Ge, De, Ue, We, Ne, Ve, Ee, Fe, Ke, Ze, qe, Ye, Je, Qe, Xe, el, ll, tl, il, sl, al, nl, ol, cl, dl, pl, rl, ul, vl;
                const b = oe;
                return n(), c(x, null, [l("div", Fs, [t.gametype === "SicBo" ? (n(), c("div", {
                    key: 0,
                    class: "w-[357px] flex flex-wrap ml-[-2px] mt-[0px] bg-white p-[3px] relative rounded-[5px]",
                    onClick: i[0] || (i[0] = m => u.value = !p(u))
                }, [l("div", {
                    class: "h-fit bg-white roadmap-timelineSicBo",
                    innerHTML: e.api.sicboTimeline7
                }, null, 8, Ks), p(u) ? (n(), c("div", {
                    key: 0,
                    class: "h-fit bg-white roadmap-donutSicBo",
                    innerHTML: p(k) === "mobile" ? e.api.sicboBS13.html : e.api.sicboBS.html
                }, null, 8, Zs)) : (n(), c("div", {
                    key: 1,
                    class: "h-fit bg-white roadmap-donutSicBo",
                    innerHTML: p(k) === "mobile" ? e.api.sicboOE13.html : e.api.sicboOE.html
                }, null, 8, qs)), p(u) ? (n(), c("div", Ys, d(s.$t("OddEven")), 1)) : (n(), c("div", Js, d(s.$t("BigSmall")), 1))])) : t.gametype === "ThaiHiLo" ? (n(), c("div", Qs, [l("div", {
                    class: "h-fit bg-white roadmap-timelineHilo",
                    innerHTML: e.api.hiloTimeline21
                }, null, 8, Xs)])) : t.gametype === "ThaiFanTan" ? (n(), c("div", ea, [l("div", {
                    class: "h-fit bg-white roadmap-timelineHilo",
                    innerHTML: e.api.fantanTimeline21
                }, null, 8, la)])) : f("", !0)]), l("div", ta, [t.gametype === "SicBo" ? (n(), c("div", ia, [l("div", sa, [l("div", {
                    id: "m-small",
                    class: r(["base20 clickActive", a("small") ? "blink" : ""]),
                    onClick: i[1] || (i[1] = m => o("small"))
                }, [l("div", aa, d(s.$t("small")), 1), na, v(b, {
                    "value-placing": (T = e.placing) == null ? void 0 : T.SicBo.small,
                    "value-placed": (L = e.placed) == null ? void 0 : L.SicBo.small,
                    size: "small"
                }, null, 8, ["value-placing", "value-placed"])], 2), l("div", {
                    id: "m-odd",
                    class: r(["base20 oddpoint clickActive", a("odd") ? "blink" : ""]),
                    onClick: i[2] || (i[2] = m => o("odd"))
                }, [h(d(s.$t("odd")) + " ", 1), oa, v(b, {
                    "value-placing": (y = e.placing) == null ? void 0 : y.SicBo.odd,
                    "value-placed": (C = e.placed) == null ? void 0 : C.SicBo.odd,
                    size: "small"
                }, null, 8, ["value-placing", "value-placed"])], 2), l("div", {
                    id: "m-any-triple",
                    class: r(["base20 clickActive", a("any-triple") ? "blink" : ""]),
                    onClick: i[3] || (i[3] = m => o("any-triple"))
                }, [l("div", ca, [l("div", null, d(s.$t("any")), 1), l("div", null, d(s.$t("triple")), 1)]), v(b, {
                    "value-placing": (A = e.placing) == null ? void 0 : A.SicBo["any-triple"],
                    "value-placed": (B = e.placed) == null ? void 0 : B.SicBo["any-triple"],
                    size: "small"
                }, null, 8, ["value-placing", "value-placed"])], 2), l("div", {
                    id: "m-even",
                    class: r(["base20 evenpoint clickActive", a("even") ? "blink" : ""]),
                    onClick: i[4] || (i[4] = m => o("even"))
                }, [h(d(s.$t("even")) + " ", 1), da, v(b, {
                    "value-placing": (z = e.placing) == null ? void 0 : z.SicBo.even,
                    "value-placed": (j = e.placed) == null ? void 0 : j.SicBo.even,
                    size: "small"
                }, null, 8, ["value-placing", "value-placed"])], 2), l("div", {
                    id: "m-big",
                    class: r(["base20 clickActive", a("big") ? "blink" : ""]),
                    onClick: i[5] || (i[5] = m => o("big"))
                }, [l("div", pa, d(s.$t("big")), 1), ra, v(b, {
                    "value-placing": (P = e.placing) == null ? void 0 : P.SicBo.big,
                    "value-placed": (O = e.placed) == null ? void 0 : O.SicBo.big,
                    size: "small"
                }, null, 8, ["value-placing", "value-placed"])], 2)]), l("div", ua, [l("div", {
                    id: "m-single-1",
                    class: r(["base16 clickActive", a("single-1") ? "blink" : ""]),
                    onClick: i[6] || (i[6] = m => o("single-1"))
                }, [va, v(b, {
                    "value-placing": (M = e.placing) == null ? void 0 : M.SicBo["single-1"],
                    "value-placed": (E = e.placed) == null ? void 0 : E.SicBo["single-1"],
                    size: "small"
                }, null, 8, ["value-placing", "value-placed"])], 2), l("div", {
                    id: "m-single-2",
                    class: r(["base16 clickActive", a("single-2") ? "blink" : ""]),
                    onClick: i[7] || (i[7] = m => o("single-2"))
                }, [ga, v(b, {
                    "value-placing": (F = e.placing) == null ? void 0 : F.SicBo["single-2"],
                    "value-placed": (K = e.placed) == null ? void 0 : K.SicBo["single-2"],
                    size: "small"
                }, null, 8, ["value-placing", "value-placed"])], 2), l("div", {
                    id: "m-single-3",
                    class: r(["base16 clickActive", a("single-3") ? "blink" : ""]),
                    onClick: i[8] || (i[8] = m => o("single-3"))
                }, [ba, v(b, {
                    "value-placing": (Z = e.placing) == null ? void 0 : Z.SicBo["single-3"],
                    "value-placed": (q = e.placed) == null ? void 0 : q.SicBo["single-3"],
                    size: "small"
                }, null, 8, ["value-placing", "value-placed"])], 2), l("div", {
                    id: "m-single-4",
                    class: r(["base16 clickActive", a("single-4") ? "blink" : ""]),
                    onClick: i[9] || (i[9] = m => o("single-4"))
                }, [ma, v(b, {
                    "value-placing": (Y = e.placing) == null ? void 0 : Y.SicBo["single-4"],
                    "value-placed": ($ = e.placed) == null ? void 0 : $.SicBo["single-4"],
                    size: "small"
                }, null, 8, ["value-placing", "value-placed"])], 2), l("div", {
                    id: "m-single-5",
                    class: r(["base16 clickActive", a("single-5") ? "blink" : ""]),
                    onClick: i[10] || (i[10] = m => o("single-5"))
                }, [ha, v(b, {
                    "value-placing": (J = e.placing) == null ? void 0 : J.SicBo["single-5"],
                    "value-placed": (ae = e.placed) == null ? void 0 : ae.SicBo["single-5"],
                    size: "small"
                }, null, 8, ["value-placing", "value-placed"])], 2), l("div", {
                    id: "m-single-6",
                    class: r(["base16 clickActive", a("single-6") ? "blink" : ""]),
                    onClick: i[11] || (i[11] = m => o("single-6"))
                }, [ka, v(b, {
                    "value-placing": (I = e.placing) == null ? void 0 : I.SicBo["single-6"],
                    "value-placed": (ve = e.placed) == null ? void 0 : ve.SicBo["single-6"],
                    size: "small"
                }, null, 8, ["value-placing", "value-placed"])], 2)]), l("div", fa, [l("div", {
                    id: "m-total-4",
                    class: r(["base14 clickActive", a("total-4") ? "blink" : ""]),
                    onClick: i[12] || (i[12] = m => o("total-4"))
                }, [h(" 4 "), v(b, {
                    "value-placing": (ge = e.placing) == null ? void 0 : ge.SicBo["total-4"],
                    "value-placed": (be = e.placed) == null ? void 0 : be.SicBo["total-4"],
                    size: "small"
                }, null, 8, ["value-placing", "value-placed"])], 2), l("div", {
                    id: "m-total-5",
                    class: r(["base14 clickActive", a("total-5") ? "blink" : ""]),
                    onClick: i[13] || (i[13] = m => o("total-5"))
                }, [h(" 5 "), v(b, {
                    "value-placing": (me = e.placing) == null ? void 0 : me.SicBo["total-5"],
                    "value-placed": (he = e.placed) == null ? void 0 : he.SicBo["total-5"],
                    size: "small"
                }, null, 8, ["value-placing", "value-placed"])], 2), l("div", {
                    id: "m-total-6",
                    class: r(["base14 clickActive", a("total-6") ? "blink" : ""]),
                    onClick: i[14] || (i[14] = m => o("total-6"))
                }, [h(" 6 "), v(b, {
                    "value-placing": (ke = e.placing) == null ? void 0 : ke.SicBo["total-6"],
                    "value-placed": (fe = e.placed) == null ? void 0 : fe.SicBo["total-6"],
                    size: "small"
                }, null, 8, ["value-placing", "value-placed"])], 2), l("div", {
                    id: "m-total-7",
                    class: r(["base14 clickActive", a("total-7") ? "blink" : ""]),
                    onClick: i[15] || (i[15] = m => o("total-7"))
                }, [h(" 7 "), v(b, {
                    "value-placing": (_e = e.placing) == null ? void 0 : _e.SicBo["total-7"],
                    "value-placed": (xe = e.placed) == null ? void 0 : xe.SicBo["total-7"],
                    size: "small"
                }, null, 8, ["value-placing", "value-placed"])], 2), l("div", {
                    id: "m-total-8",
                    class: r(["base14 clickActive", a("total-8") ? "blink" : ""]),
                    onClick: i[16] || (i[16] = m => o("total-8"))
                }, [h(" 8 "), v(b, {
                    "value-placing": ($e = e.placing) == null ? void 0 : $e.SicBo["total-8"],
                    "value-placed": (ye = e.placed) == null ? void 0 : ye.SicBo["total-8"],
                    size: "small"
                }, null, 8, ["value-placing", "value-placed"])], 2), l("div", {
                    id: "m-total-9",
                    class: r(["base14 clickActive", a("total-9") ? "blink" : ""]),
                    onClick: i[17] || (i[17] = m => o("total-9"))
                }, [h(" 9 "), v(b, {
                    "value-placing": (we = e.placing) == null ? void 0 : we.SicBo["total-9"],
                    "value-placed": (Te = e.placed) == null ? void 0 : Te.SicBo["total-9"],
                    size: "small"
                }, null, 8, ["value-placing", "value-placed"])], 2), l("div", {
                    id: "m-total-10",
                    class: r(["base14 clickActive", a("total-10") ? "blink" : ""]),
                    onClick: i[18] || (i[18] = m => o("total-10"))
                }, [h(" 10 "), v(b, {
                    "value-placing": (Le = e.placing) == null ? void 0 : Le.SicBo["total-10"],
                    "value-placed": (Ce = e.placed) == null ? void 0 : Ce.SicBo["total-10"],
                    size: "small"
                }, null, 8, ["value-placing", "value-placed"])], 2)]), l("div", _a, [l("div", {
                    id: "m-total-11",
                    class: r(["base14 clickActive", a("total-11") ? "blink" : ""]),
                    onClick: i[19] || (i[19] = m => o("total-11"))
                }, [h(" 11 "), v(b, {
                    "value-placing": (Be = e.placing) == null ? void 0 : Be.SicBo["total-11"],
                    "value-placed": (Se = e.placed) == null ? void 0 : Se.SicBo["total-11"],
                    size: "small"
                }, null, 8, ["value-placing", "value-placed"])], 2), l("div", {
                    id: "m-total-12",
                    class: r(["base14 clickActive", a("total-12") ? "blink" : ""]),
                    onClick: i[20] || (i[20] = m => o("total-12"))
                }, [h(" 12 "), v(b, {
                    "value-placing": (Me = e.placing) == null ? void 0 : Me.SicBo["total-12"],
                    "value-placed": (Ae = e.placed) == null ? void 0 : Ae.SicBo["total-12"],
                    size: "small"
                }, null, 8, ["value-placing", "value-placed"])], 2), l("div", {
                    id: "m-total-13",
                    class: r(["base14 clickActive", a("total-13") ? "blink" : ""]),
                    onClick: i[21] || (i[21] = m => o("total-13"))
                }, [h(" 13 "), v(b, {
                    "value-placing": (He = e.placing) == null ? void 0 : He.SicBo["total-13"],
                    "value-placed": (Re = e.placed) == null ? void 0 : Re.SicBo["total-13"],
                    size: "small"
                }, null, 8, ["value-placing", "value-placed"])], 2), l("div", {
                    id: "m-total-14",
                    class: r(["base14 clickActive", a("total-14") ? "blink" : ""]),
                    onClick: i[22] || (i[22] = m => o("total-14"))
                }, [h(" 14 "), v(b, {
                    "value-placing": (ze = e.placing) == null ? void 0 : ze.SicBo["total-14"],
                    "value-placed": (je = e.placed) == null ? void 0 : je.SicBo["total-14"],
                    size: "small"
                }, null, 8, ["value-placing", "value-placed"])], 2), l("div", {
                    id: "m-total-15",
                    class: r(["base14 clickActive", a("total-15") ? "blink" : ""]),
                    onClick: i[23] || (i[23] = m => o("total-15"))
                }, [h(" 15 "), v(b, {
                    "value-placing": (Pe = e.placing) == null ? void 0 : Pe.SicBo["total-15"],
                    "value-placed": (Oe = e.placed) == null ? void 0 : Oe.SicBo["total-15"],
                    size: "small"
                }, null, 8, ["value-placing", "value-placed"])], 2), l("div", {
                    id: "m-total-16",
                    class: r(["base14 clickActive", a("total-16") ? "blink" : ""]),
                    onClick: i[24] || (i[24] = m => o("total-16"))
                }, [h(" 16 "), v(b, {
                    "value-placing": (Ie = e.placing) == null ? void 0 : Ie.SicBo["total-16"],
                    "value-placed": (Ge = e.placed) == null ? void 0 : Ge.SicBo["total-16"],
                    size: "small"
                }, null, 8, ["value-placing", "value-placed"])], 2), l("div", {
                    id: "m-total-17",
                    class: r(["base14 clickActive", a("total-17") ? "blink" : ""]),
                    onClick: i[25] || (i[25] = m => o("total-17"))
                }, [h(" 17 "), v(b, {
                    "value-placing": (De = e.placing) == null ? void 0 : De.SicBo["total-17"],
                    "value-placed": (Ue = e.placed) == null ? void 0 : Ue.SicBo["total-17"],
                    size: "small"
                }, null, 8, ["value-placing", "value-placed"])], 2)])])) : t.gametype === "ThaiHiLo" ? (n(), c("div", xa, [l("div", {
                    class: r(["bg-white w-[33.1%] h-[40px] flex justify-center items-center text-player font-bold clickActive relative", a("thl-lo") ? "hilo-win" : ""]),
                    onClick: i[26] || (i[26] = m => o("thl-lo"))
                }, [h(d(s.$t("lo")) + " ", 1), v(b, {
                    "value-placing": (We = e.placing) == null ? void 0 : We.ThaiHiLo["thl-lo"],
                    "value-placed": (Ne = e.placed) == null ? void 0 : Ne.ThaiHiLo["thl-lo"],
                    size: "small"
                }, null, 8, ["value-placing", "value-placed"])], 2), l("div", {
                    class: r(["bg-white w-[33%] h-[40px] flex justify-center items-center text-banker font-bold clickActive relative", a("thl-11") ? "hilo-win" : ""]),
                    onClick: i[27] || (i[27] = m => o("thl-11"))
                }, [h(d(s.$t("11hilo")) + " ", 1), v(b, {
                    "value-placing": (Ve = e.placing) == null ? void 0 : Ve.ThaiHiLo["thl-11"],
                    "value-placed": (Ee = e.placed) == null ? void 0 : Ee.ThaiHiLo["thl-11"],
                    size: "small"
                }, null, 8, ["value-placing", "value-placed"])], 2), l("div", {
                    class: r(["bg-white w-[33.1%] h-[40px] flex justify-center items-center text-black font-bold clickActive relative", a("thl-hi") ? "hilo-win" : ""]),
                    onClick: i[28] || (i[28] = m => o("thl-hi"))
                }, [h(d(s.$t("hi")) + " ", 1), v(b, {
                    "value-placing": (Fe = e.placing) == null ? void 0 : Fe.ThaiHiLo["thl-hi"],
                    "value-placed": (Ke = e.placed) == null ? void 0 : Ke.ThaiHiLo["thl-hi"],
                    size: "small"
                }, null, 8, ["value-placing", "value-placed"])], 2), l("div", {
                    class: r(["bg-white w-[16.3%] h-[40px] flex justify-center items-center clickActive relative", a("thl-1") ? "hilo-win" : ""]),
                    onClick: i[29] || (i[29] = m => o("thl-1"))
                }, [$a, v(b, {
                    "value-placing": (Ze = e.placing) == null ? void 0 : Ze.ThaiHiLo["thl-1"],
                    "value-placed": (qe = e.placed) == null ? void 0 : qe.ThaiHiLo["thl-1"],
                    size: "small"
                }, null, 8, ["value-placing", "value-placed"])], 2), l("div", {
                    class: r(["bg-white w-[16.5%] h-[40px] flex justify-center items-center clickActive relative", a("thl-2") ? "hilo-win" : ""]),
                    onClick: i[30] || (i[30] = m => o("thl-2"))
                }, [ya, v(b, {
                    "value-placing": (Ye = e.placing) == null ? void 0 : Ye.ThaiHiLo["thl-2"],
                    "value-placed": (Je = e.placed) == null ? void 0 : Je.ThaiHiLo["thl-2"],
                    size: "small"
                }, null, 8, ["value-placing", "value-placed"])], 2), l("div", {
                    class: r(["bg-white w-[16.3%] h-[40px] flex justify-center items-center clickActive relative", a("thl-3") ? "hilo-win" : ""]),
                    onClick: i[31] || (i[31] = m => o("thl-3"))
                }, [wa, v(b, {
                    "value-placing": (Qe = e.placing) == null ? void 0 : Qe.ThaiHiLo["thl-3"],
                    "value-placed": (Xe = e.placed) == null ? void 0 : Xe.ThaiHiLo["thl-3"],
                    size: "small"
                }, null, 8, ["value-placing", "value-placed"])], 2), l("div", {
                    class: r(["bg-white w-[16.5%] h-[40px] flex justify-center items-center clickActive relative", a("thl-4") ? "hilo-win" : ""]),
                    onClick: i[32] || (i[32] = m => o("thl-4"))
                }, [Ta, v(b, {
                    "value-placing": (el = e.placing) == null ? void 0 : el.ThaiHiLo["thl-4"],
                    "value-placed": (ll = e.placed) == null ? void 0 : ll.ThaiHiLo["thl-4"],
                    size: "small"
                }, null, 8, ["value-placing", "value-placed"])], 2), l("div", {
                    class: r(["bg-white w-[16.5%] h-[40px] flex justify-center items-center clickActive relative", a("thl-5") ? "hilo-win" : ""]),
                    onClick: i[33] || (i[33] = m => o("thl-5"))
                }, [La, v(b, {
                    "value-placing": (tl = e.placing) == null ? void 0 : tl.ThaiHiLo["thl-5"],
                    "value-placed": (il = e.placed) == null ? void 0 : il.ThaiHiLo["thl-5"],
                    size: "small"
                }, null, 8, ["value-placing", "value-placed"])], 2), l("div", {
                    class: r(["bg-white w-[16.3%] h-[40px] flex justify-center items-center clickActive relative", a("thl-6") ? "hilo-win" : ""]),
                    onClick: i[34] || (i[34] = m => o("thl-6"))
                }, [Ca, v(b, {
                    "value-placing": (sl = e.placing) == null ? void 0 : sl.ThaiHiLo["thl-6"],
                    "value-placed": (al = e.placed) == null ? void 0 : al.ThaiHiLo["thl-6"],
                    size: "small"
                }, null, 8, ["value-placing", "value-placed"])], 2)])) : t.gametype === "ThaiFanTan" ? (n(), c("div", Ba, [l("div", {
                    class: r(["bg-white w-[49.7%] h-[40px] flex justify-center items-center text-black font-bold clickActive relative insetShadow60px", a("tft-1") ? "blink" : ""]),
                    onClick: i[35] || (i[35] = m => o("tft-1"))
                }, [h(" 1 "), v(b, {
                    "value-placing": (nl = e.placing) == null ? void 0 : nl.ThaiFanTan["tft-1"],
                    "value-placed": (ol = e.placed) == null ? void 0 : ol.ThaiFanTan["tft-1"],
                    size: "small"
                }, null, 8, ["value-placing", "value-placed"])], 2), l("div", {
                    class: r(["bg-tie w-[49.7%] h-[40px] flex justify-center items-center text-black font-bold clickActive relative insetShadow60px", a("tft-2") ? "blink" : ""]),
                    onClick: i[36] || (i[36] = m => o("tft-2"))
                }, [h(" 2 "), v(b, {
                    "value-placing": (cl = e.placing) == null ? void 0 : cl.ThaiFanTan["tft-2"],
                    "value-placed": (dl = e.placed) == null ? void 0 : dl.ThaiFanTan["tft-2"],
                    size: "small"
                }, null, 8, ["value-placing", "value-placed"])], 2), l("div", {
                    class: r(["bg-secondary w-[49.7%] h-[40px] flex justify-center items-center text-black font-bold clickActive relative insetShadow60px", a("tft-3") ? "blink" : ""]),
                    onClick: i[37] || (i[37] = m => o("tft-3"))
                }, [h(" 3 "), v(b, {
                    "value-placing": (pl = e.placing) == null ? void 0 : pl.ThaiFanTan["tft-3"],
                    "value-placed": (rl = e.placed) == null ? void 0 : rl.ThaiFanTan["tft-3"],
                    size: "small"
                }, null, 8, ["value-placing", "value-placed"])], 2), l("div", {
                    class: r(["bg-banker w-[49.7%] h-[40px] flex justify-center items-center text-black clickActive relative insetShadow60px", a("tft-4") ? "blink" : ""]),
                    onClick: i[38] || (i[38] = m => o("tft-4"))
                }, [h(" 4 "), v(b, {
                    "value-placing": (ul = e.placing) == null ? void 0 : ul.ThaiFanTan["tft-4"],
                    "value-placed": (vl = e.placed) == null ? void 0 : vl.ThaiFanTan["tft-4"],
                    size: "small"
                }, null, 8, ["value-placing", "value-placed"])], 2)])) : f("", !0), l("div", {
                    id: "noMoreBet",
                    class: r(["absolute flex flex-col justify-center items-center bg-black/70 left-0 right-0 top-[6px] bottom-0 rounded m-[-3px]", e.socket.timeLeft === 0 && e.socket.status === "CountDown" ? "block" : "hidden"])
                }, [Sa, l("div", null, d(s.$t("nomorebet")), 1)], 2), l("div", {
                    class: r(["absolute flex flex-col justify-center items-center bg-black/70 left-0 right-0 top-[6px] bottom-0 rounded m-[-3px]", e.socket.status === "showResult" ? "block" : "hidden"])
                }, [Ma, l("div", null, d(s.$t("waitingforres")), 1)], 2), e.socket.status === "PayOut" && e.endPayOut.msgHTML ? (n(), c("div", {
                    key: 3,
                    id: "showResult",
                    class: r(["absolute flex flex-col justify-center items-center gap-[2%] bg-black/70 left-0 right-0 top-[6px] bottom-0 rounded m-[-3px]", e.socket.status === "showResult" || e.socket.status === "PayOut" ? "block" : "hidden"])
                }, [l("div", Aa, [l("div", Ha, [l("img", {
                    src: `/stats/sicbo/DICE/L/L-${p(g)[0]}.svg`,
                    class: "w-[40px] scale-rotate-left z-10"
                }, null, 8, Ra), l("img", {
                    src: `/stats/sicbo/DICE/M/M-${p(g)[1]}.svg`,
                    class: "w-[40px] scale-animation z-10"
                }, null, 8, za), l("img", {
                    src: `/stats/sicbo/DICE/R/R-${p(g)[2]}.svg`,
                    class: "w-[40px] scale-rotate-right z-10"
                }, null, 8, ja)]), l("div", null, [(n(!0), c(x, null, S(p(g), (m, ue) => (n(), c("span", {
                    key: ue
                }, d(m + " "), 1))), 128)), h(" " + d(s.$t("sumto")) + " " + d(p(g).reduce((m, ue) => m + Number(ue), 0)), 1)]), l("div", {
                    class: "font14-10 flex justify-center gap-[3px]",
                    innerHTML: e.endPayOut.msgHTML
                }, null, 8, Pa)])], 2)) : f("", !0), l("div", {
                    id: "dialog",
                    class: r(["absolute flex flex-col justify-center items-center gap-[2%] bg-black/70 left-0 right-0 top-[6px] bottom-0 rounded m-[-3px]", e.dialog.isOpen ? "block" : "hidden"]),
                    onClick: i[39] || (i[39] = m => e.dialog.code === 998 ? ("$storeGlobal" in s ? s.$storeGlobal : p(_))().getDemo() : ""),
                    innerHTML: e.dialog.msgHTML
                }, null, 10, Oa)])], 64)
            }
        }
    },
    so = V(Ia, [
        ["__scopeId", "data-v-09540ded"]
    ]),
    Ga = "" + globalThis.__publicAssetsURL("hall/game_rou.svg"),
    re = t => (X("data-v-9a5850c8"), t = t(), ee(), t),
    Da = {
        class: "flex flex-wrap items-center gap-[1%] mt-[3px] mb-[3px] py-[4px] px-[0px] rounded-[6px] overflow-hidden"
    },
    Ua = {
        class: "flex gap-[1%] w-[100%]"
    },
    Wa = {
        class: "h-[100%] relative rounded-[8px] mt-[8px] flex justify-center items-center overflow-hidden"
    },
    Na = {
        class: "grid grid-cols-6 border border-white rounded-[8px] overflow-hidden text-white text-center w-fit bg-white gap-[1px] h-[150px]"
    },
    Va = re(() => l("img", {
        class: "w-[30px]",
        src: ce
    }, null, -1)),
    Ea = re(() => l("img", {
        class: "w-[30px]",
        src: Ga
    }, null, -1)),
    Fa = {
        class: "relative flex justify-center items-center mt-[-25px]",
        style: {
            scale: "0.45"
        }
    },
    Ka = {
        width: "188",
        height: "83",
        viewBox: "0 0 188 83",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    },
    Za = re(() => l("circle", {
        cx: "94",
        cy: "72",
        r: "11",
        fill: "url(#paint0_radial_2671_13836)"
    }, null, -1)),
    qa = {
        x: "30",
        y: "50",
        "text-anchor": "middle",
        "dominant-baseline": "middle",
        "font-size": "32",
        "font-weight": "bold",
        fill: "white",
        transform: "rotate(-10)"
    },
    Ya = {
        x: "95",
        y: "40",
        "text-anchor": "middle",
        "dominant-baseline": "middle",
        "font-size": "32",
        "font-weight": "bold",
        fill: "white"
    },
    Ja = {
        x: "155",
        y: "20",
        "text-anchor": "middle",
        "dominant-baseline": "middle",
        "font-size": "32",
        "font-weight": "bold",
        fill: "white",
        transform: "rotate(10)"
    },
    Qa = re(() => l("defs", null, [l("radialGradient", {
        id: "paint0_radial_2671_13836",
        cx: "0",
        cy: "0",
        r: "1",
        gradientUnits: "userSpaceOnUse",
        gradientTransform: "translate(101 72) rotate(-175.03) scale(23.0868)"
    }, [l("stop", {
        "stop-color": "white"
    }), l("stop", {
        offset: "1",
        "stop-color": "#979797"
    })])], -1)),
    Xa = ["innerHTML"],
    en = ["innerHTML"],
    ln = {
        __name: "newMulBetrou",
        props: {
            api: {
                type: Object
            },
            socket: {
                type: Object,
                default () {
                    return {
                        timeLeft: 20
                    }
                }
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
            }
        },
        setup(t) {
            const e = t;
            pe(() => {}), se(() => e.socket.result, () => {
                e.socket.status === "showResult" || e.socket.status
            });
            const o = a => {
                e.socket.timeLeft !== 0 && Tl().placeBetRoulette(a, e.socket.roomId, e.socket.gameId, !0)
            };
            N(() => _()._sizing);
            const k = a => ["1", "3", "5", "7", "9", "12", "14", "16", "18", "19", "21", "23", "25", "27", "30", "32", "34", "36"].includes(a);

            function u(a) {
                a = parseInt(a);
                const s = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26],
                    i = new Set([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]),
                    b = s.indexOf(a);
                if (b === -1) return [];
                const T = s[(b - 1 + s.length) % s.length],
                    L = s[(b + 1) % s.length];
                return [{
                    point: T,
                    color: y(T)
                }, {
                    point: a,
                    color: y(a)
                }, {
                    point: L,
                    color: y(L)
                }];

                function y(C) {
                    return C === 0 ? "fill-rouGreen" : i.has(C) ? "fill-rouRed" : "fill-rouBlack"
                }
            }
            const g = de([{
                point: 0,
                color: "fill-white"
            }, {
                point: 0,
                color: "fill-white"
            }, {
                point: 0,
                color: "fill-white"
            }]);
            return se(() => e.socket.status, () => {
                e.socket.status === "PayOut" && (g.value = u(e.socket.result.rsRu))
            }), (a, s) => {
                var b, T, L, y, C, A, B, z, j, P, O, M, E, F, K, Z, q, Y;
                const i = oe;
                return n(), c("div", Da, [l("div", Ua, [(n(!0), c(x, null, S([...t.api.statistics].reverse().slice(0, 12), ($, J) => (n(), c("div", {
                    key: J
                }, [l("div", {
                    class: r([
                        [k($) ? "text-white bg-rouRed" : $ === "0" ? "text-white bg-rouGreen" : "text-white bg-rouBlack", J === 0 ? "border-secondary" : "border-white"], "w-[27px] h-[27px] flex justify-center items-center rounded-[5px] border border-1"
                    ])
                }, d($), 3)]))), 128))]), l("div", Wa, [l("div", Na, [l("div", {
                    class: "col-span-2 relative bg-black px-6 py-3 text-[18px] flex items-center justify-center clickActive",
                    style: {},
                    onClick: s[0] || (s[0] = $ => o("1st12"))
                }, [h(" 1st 12 "), v(i, {
                    "value-placing": (b = e.placing) == null ? void 0 : b["1st12"],
                    "value-placed": (T = e.placed) == null ? void 0 : T["1st12"],
                    size: "small"
                }, null, 8, ["value-placing", "value-placed"])]), l("div", {
                    class: "col-span-2 relative bg-black px-6 py-3 text-[18px] flex items-center justify-center clickActive",
                    onClick: s[1] || (s[1] = $ => o("2nd12"))
                }, [h(" 2nd 12 "), v(i, {
                    "value-placing": (L = e.placing) == null ? void 0 : L["2nd12"],
                    "value-placed": (y = e.placed) == null ? void 0 : y["2nd12"],
                    size: "small"
                }, null, 8, ["value-placing", "value-placed"])]), l("div", {
                    class: "col-span-2 relative bg-black px-6 py-3 text-[18px] flex items-center justify-center clickActive",
                    onClick: s[2] || (s[2] = $ => o("3rd12"))
                }, [h(" 3rd 12 "), v(i, {
                    "value-placing": (C = e.placing) == null ? void 0 : C["3rd12"],
                    "value-placed": (A = e.placed) == null ? void 0 : A["3rd12"],
                    size: "small"
                }, null, 8, ["value-placing", "value-placed"])]), l("div", {
                    class: "bg-black relative px-3 py-3 flex items-center justify-center clickActive text-[12px]",
                    onClick: s[3] || (s[3] = $ => o("1to18"))
                }, [h(" 1-18 "), v(i, {
                    "value-placing": (B = e.placing) == null ? void 0 : B["1to18"],
                    "value-placed": (z = e.placed) == null ? void 0 : z["1to18"],
                    size: "small"
                }, null, 8, ["value-placing", "value-placed"])]), l("div", {
                    class: "bg-black relative px-3 py-3 flex items-center justify-center clickActive text-[12px]",
                    onClick: s[4] || (s[4] = $ => o("even"))
                }, [h(d(a.$t("even")) + " ", 1), v(i, {
                    "value-placing": (j = e.placing) == null ? void 0 : j.even,
                    "value-placed": (P = e.placed) == null ? void 0 : P.even,
                    size: "small"
                }, null, 8, ["value-placing", "value-placed"])]), l("div", {
                    class: "bg-rouRed relative px-3 py-3 flex items-center justify-center clickActive text-[12px]",
                    onClick: s[5] || (s[5] = $ => o("red"))
                }, [v(i, {
                    "value-placing": (O = e.placing) == null ? void 0 : O.red,
                    "value-placed": (M = e.placed) == null ? void 0 : M.red,
                    size: "small"
                }, null, 8, ["value-placing", "value-placed"])]), l("div", {
                    class: "bg-rouBlack relative px-3 py-3 flex items-center justify-center clickActive",
                    onClick: s[6] || (s[6] = $ => o("black"))
                }, [v(i, {
                    "value-placing": (E = e.placing) == null ? void 0 : E.black,
                    "value-placed": (F = e.placed) == null ? void 0 : F.black,
                    size: "small"
                }, null, 8, ["value-placing", "value-placed"])]), l("div", {
                    class: "bg-black relative px-3 py-3 flex items-center justify-center clickActive text-[12px]",
                    onClick: s[7] || (s[7] = $ => o("odd"))
                }, [h(d(a.$t("odd")) + " ", 1), v(i, {
                    "value-placing": (K = e.placing) == null ? void 0 : K.odd,
                    "value-placed": (Z = e.placed) == null ? void 0 : Z.odd,
                    size: "small"
                }, null, 8, ["value-placing", "value-placed"])]), l("div", {
                    class: "bg-black relative px-3 py-3 flex items-center justify-center block-newline clickActive text-[12px]",
                    onClick: s[8] || (s[8] = $ => o("19to36"))
                }, [h(" 19-36 "), v(i, {
                    "value-placing": (q = e.placing) == null ? void 0 : q["19to36"],
                    "value-placed": (Y = e.placed) == null ? void 0 : Y["19to36"],
                    size: "small"
                }, null, 8, ["value-placing", "value-placed"])])]), l("div", {
                    id: "noMoreBet",
                    class: r(["absolute flex flex-col justify-center items-center bg-black/70 left-0 right-0 top-[6px] bottom-0 rounded m-[-3px]", e.socket.timeLeft === 0 && e.socket.status === "CountDown" ? "block" : "hidden"])
                }, [Va, l("div", null, d(a.$t("nomorebet")), 1)], 2), l("div", {
                    class: r(["absolute flex flex-col justify-center items-center bg-black/70 left-0 right-0 top-[0px] bottom-0 rounded m-[-3px]", e.socket.status === "showResult" ? "block" : "hidden"])
                }, [Ea, l("div", null, d(a.$t("waitingforres")), 1)], 2), e.socket.status === "PayOut" && e.endPayOut.msgHTML ? (n(), c("div", {
                    key: 0,
                    id: "showResult",
                    class: r(["absolute flex flex-col justify-center items-center bg-black/70 left-0 right-0 top-[0px] bottom-0 rounded m-[-3px]", e.socket.status === "showResult" || e.socket.status === "PayOut" ? "block" : "hidden"])
                }, [l("div", Fa, [(n(), c("svg", Ka, [l("path", {
                    d: "M187 9.63252C178.98 32.9228 169.304 60.4052 162.373 80C148.504 77.0787 132.639 75.3186 118 74.1573L125.241 1C146.098 2.4677 166.76 5.35573 187 9.63252Z",
                    class: r(p(g)[2].color)
                }, null, 2), l("path", {
                    d: "M126 1.14864L118.682 74C110.082 73.213 101.436 72.7786 92.778 72.6987C84.3961 72.6987 76.1068 72.9846 67.91 73.5565L60 1.11956C70.8057 0.373187 81.7317 0 92.778 0C103.972 0 115.046 0.38288 126 1.14864Z",
                    class: r(p(g)[1].color)
                }, null, 2), l("path", {
                    d: "M68 73.8511C52.8032 74.9072 37.7426 76.9639 22.973 80C17.4595 62.8181 8.48162 35.0274 0 9.1888C19.7162 5.14071 39.8207 2.4017 60.1065 1L68 73.8511Z",
                    class: r(p(g)[0].color)
                }, null, 2), Za, l("text", qa, d(p(g)[0].point), 1), l("text", Ya, d(p(g)[1].point), 1), l("text", Ja, d(p(g)[2].point), 1), Qa]))]), l("div", {
                    class: "font14-10 mt-[-25px]",
                    innerHTML: e.endPayOut.msgHTML
                }, null, 8, Xa)], 2)) : f("", !0), l("div", {
                    id: "dialog",
                    class: r(["absolute flex flex-col justify-center items-center bg-black/70 left-0 right-0 top-[0px] bottom-0 rounded m-[-3px]", e.dialog.isOpen ? "block" : "hidden"]),
                    onClick: s[9] || (s[9] = $ => e.dialog.code === 998 ? ("$storeGlobal" in a ? a.$storeGlobal : p(_))().getDemo() : ""),
                    innerHTML: e.dialog.msgHTML
                }, null, 10, en)])])
            }
        }
    },
    ao = V(ln, [
        ["__scopeId", "data-v-9a5850c8"]
    ]),
    no = "" + globalThis.__publicAssetsURL("here.svg"),
    tn = "" + globalThis.__publicAssetsURL("chip/10000000.png"),
    sn = t => (X("data-v-9b3a6f68"), t = t(), ee(), t),
    an = sn(() => l("img", {
        src: tn,
        class: "absolute z-[2] top-0 left-0"
    }, null, -1)),
    nn = [an],
    on = {
        key: 0,
        class: "rotating-background"
    },
    cn = ["onClick"],
    dn = ["src"],
    pn = {
        key: 0,
        class: "rotating-background"
    },
    rn = {
        __name: "selectChip",
        props: {
            width: {
                type: String
            }
        },
        setup(t) {
            const e = N(() => _()._chip),
                o = N(() => _()._betVal),
                k = u => {
                    _().setBetVal(u)
                };
            return (u, g) => (n(), c(x, null, [l("div", {
                class: r(p(o) === 1e7 ? "chip clickActive active relative" : "chip clickActive"),
                style: ie(t.width ? `width:${t.width}px;height:${t.width}px` : ""),
                onClick: g[0] || (g[0] = a => k(1e7))
            }, [l("div", {
                style: ie(p(o) === 1e7 ? "margin-top:-7px;width:110%;margin-left:-5%" : ""),
                class: "relative"
            }, nn, 4), p(o) === 1e7 ? (n(), c("div", on)) : f("", !0)], 6), (n(!0), c(x, null, S(p(e).selectList, (a, s) => (n(), c("div", {
                key: s,
                class: r(p(o) === p(e).list[a] ? "chip clickActive active relative" : "chip clickActive"),
                style: ie(t.width ? `width:${t.width}px;height:${t.width}px` : ""),
                onClick: i => k(p(e).list[a])
            }, [l("div", {
                style: ie(p(o) === p(e).list[a] ? "margin-top:-7px;width:110%;margin-left:-5%" : ""),
                class: "relative"
            }, [l("img", {
                src: `/chip/${p(e).list[a]}.svg`,
                class: "absolute z-[2] top-0 left-0"
            }, null, 8, dn)], 4), p(o) === p(e).list[a] ? (n(), c("div", pn)) : f("", !0)], 14, cn))), 128))], 64))
        }
    },
    oo = V(rn, [
        ["__scopeId", "data-v-9b3a6f68"]
    ]),
    co = "" + globalThis.__publicAssetsURL("hall/arrowbtm.svg"),
    po = "" + globalThis.__publicAssetsURL("hall/setting.svg"),
    un = {
        data() {
            return {
                dialog: !1,
                selectLimit: 1,
                cal: {},
                type: "",
                list: [{
                    name: "banker",
                    odd: 1
                }, {
                    name: "player",
                    odd: 1
                }, {
                    name: "tie",
                    odd: 8
                }, {
                    name: "pair",
                    odd: 11
                }, {
                    name: "small",
                    odd: 1.5
                }, {
                    name: "big",
                    odd: 1
                }, {
                    name: "natural",
                    odd: 3.5
                }, {
                    name: "supersix",
                    odd: 12
                }],
                listDT: [{
                    name: "dragon",
                    odd: 1
                }, {
                    name: "tiger",
                    odd: 1
                }, {
                    name: "tie",
                    odd: 8
                }],
                listSedie: [{
                    name: "odd",
                    odd: 1
                }, {
                    name: "even",
                    odd: 1
                }, {
                    name: "small",
                    odd: 1
                }, {
                    name: "big",
                    odd: 1
                }, {
                    name: "0Red",
                    odd: 14
                }, {
                    name: "1Red",
                    odd: 2.8
                }, {
                    name: "2Reds",
                    odd: 1.5
                }, {
                    name: "3Reds",
                    odd: 2.8
                }, {
                    name: "4Reds",
                    odd: 14
                }, {
                    name: "zeroOrFour",
                    odd: 6.5
                }],
                listSicBo: [{
                    name: "odd",
                    odd: 1
                }, {
                    name: "even",
                    odd: 1
                }, {
                    name: "small",
                    odd: 1
                }, {
                    name: "big",
                    odd: 1
                }, {
                    name: "4",
                    odd: 60
                }, {
                    name: "5",
                    odd: 30
                }, {
                    name: "6",
                    odd: 18
                }, {
                    name: "7",
                    odd: 12
                }, {
                    name: "8",
                    odd: 8
                }, {
                    name: "9",
                    odd: 7
                }, {
                    name: "10",
                    odd: 6
                }, {
                    name: "11",
                    odd: 6
                }, {
                    name: "12",
                    odd: 7
                }, {
                    name: "13",
                    odd: 8
                }, {
                    name: "14",
                    odd: 12
                }, {
                    name: "15",
                    odd: 18
                }, {
                    name: "16",
                    odd: 30
                }, {
                    name: "17",
                    odd: 60
                }, {
                    name: "twodice",
                    odd: 5
                }, {
                    name: "onSingle",
                    odd: 1
                }, {
                    name: "onDouble",
                    odd: 10
                }, {
                    name: "onTriple",
                    odd: 180
                }, {
                    name: "anytriple",
                    odd: 30
                }],
                listMegaSicBo: [{
                    name: "4",
                    odd: 50
                }, {
                    name: "5",
                    odd: 20
                }, {
                    name: "6",
                    odd: 15
                }, {
                    name: "9",
                    odd: 6
                }, {
                    name: "12",
                    odd: 6
                }, {
                    name: "15",
                    odd: 15
                }, {
                    name: "16",
                    odd: 20
                }, {
                    name: "17",
                    odd: 50
                }, {
                    name: "onDouble",
                    odd: 8
                }, {
                    name: "onTriple",
                    odd: 150
                }],
                listHiLo: [{
                    name: "hi",
                    odd: 1.1
                }, {
                    name: "lo",
                    odd: 1
                }, {
                    name: "11hilo",
                    odd: 6
                }, {
                    name: "numberspec",
                    odd: 1
                }, {
                    name: "doublespec",
                    odd: 5
                }, {
                    name: "1 2 3 , 4 5 6",
                    odd: 1
                }, {
                    name: "1lo",
                    odd: 1.8
                }, {
                    name: "2lo",
                    odd: 2
                }, {
                    name: "3lo",
                    odd: 3
                }, {
                    name: "4lo",
                    odd: 4
                }, {
                    name: "5lo",
                    odd: 6
                }, {
                    name: "6lo",
                    odd: 10
                }, {
                    name: "3hi",
                    odd: 6
                }, {
                    name: "4hi",
                    odd: 4
                }, {
                    name: "5hi",
                    odd: 3
                }, {
                    name: "6hi",
                    odd: 2
                }],
                listFanTan: [{
                    name: "1",
                    odd: 3
                }, {
                    name: "2",
                    odd: 3
                }, {
                    name: "3",
                    odd: 3
                }, {
                    name: "4",
                    odd: 3
                }],
                listRoulette: [{
                    name: "straightbet",
                    odd: 35
                }, {
                    name: "splitbet",
                    odd: 17
                }, {
                    name: "streetbet",
                    odd: 11
                }, {
                    name: "cornerbet",
                    odd: 8
                }, {
                    name: "sixnumberbet",
                    odd: 5
                }, {
                    name: "columnbet",
                    odd: 2
                }, {
                    name: "1st2nd3rd",
                    odd: 2
                }, {
                    name: "redblack",
                    odd: 1
                }, {
                    name: "evenodd",
                    odd: 1
                }, {
                    name: "highlow",
                    odd: 1
                }]
            }
        },
        computed: {
            limitId() {
                return _()._limitId
            },
            profile() {
                return _()._profile
            },
            chip() {
                return _()._chip
            }
        },
        watch: {
            selectLimit: {
                handler(t) {
                    this.cal = _()._profile.betLimit.find(e => e.limitId === t)
                },
                immediate: !0,
                deep: !0
            }
        },
        mounted() {},
        methods: {
            toggle(t) {
                this.dialog = !this.dialog, this.selectLimit = this.limitId, this.type = t
            },
            selectBetLimit(t) {
                this.selectLimit = t
            },
            save(t) {
                localStorage.setItem("limitId", this.selectLimit);
                const o = this.profile.betLimit.find(a => a.limitId === this.selectLimit).min,
                    k = this.findClosestNumber(this.chip.list, o);
                let u = this.chip.list.findIndex(a => a === k);
                const g = [];
                u > 11 && (u = 11), g.push(u), g.push(u + 1), g.push(u + 2), g.push(u + 3), g.push(u + 4), _().setChip(g), localStorage.setItem("chipList3", g.toString()), _().setBetVal(1e7), _().setBetLimit(this.selectLimit), this.toggle()
            },
            findClosestNumber(t, e) {
                if (t.length === 0) return null;
                let o = null,
                    k = Number.POSITIVE_INFINITY;
                for (let u = 0; u < t.length; u++)
                    if (t[u] >= e) {
                        const g = t[u] - e;
                        g < k && (k = g, o = t[u])
                    }
                return o
            }
        }
    },
    vn = t => (X("data-v-843e8e6a"), t = t(), ee(), t),
    gn = {
        key: 1,
        class: "bg"
    },
    bn = {
        style: {
            margin: "16px 12px"
        }
    },
    mn = vn(() => l("img", {
        src: xl
    }, null, -1)),
    hn = [mn],
    kn = {
        class: "font18-14",
        style: {
            "margin-bottom": "24px",
            "font-weight": "600"
        }
    },
    fn = {
        class: "flex flex-wrap",
        style: {
            gap: "8px",
            "margin-bottom": "24px"
        }
    },
    _n = ["onClick"],
    xn = {
        key: 0,
        class: "calzone"
    },
    $n = {
        class: "calzone-head"
    },
    yn = {
        class: "text"
    },
    wn = {
        class: "text"
    },
    Tn = {
        key: 1,
        class: "calzone"
    },
    Ln = {
        class: "calzone-head"
    },
    Cn = {
        class: "text"
    },
    Bn = {
        class: "text"
    },
    Sn = {
        key: 2,
        class: "calzone"
    },
    Mn = {
        class: "calzone-head"
    },
    An = {
        class: "text"
    },
    Hn = {
        class: "text"
    },
    Rn = {
        key: 3,
        class: "calzone"
    },
    zn = {
        class: "calzone-head"
    },
    jn = {
        class: "text"
    },
    Pn = {
        class: "text"
    };

function On(t, e, o, k, u, g) {
    const a = Ll;
    return n(), c(x, null, [u.dialog ? (n(), c("div", {
        key: 0,
        class: "bg-overlay",
        onClick: e[0] || (e[0] = s => g.toggle())
    })) : f("", !0), u.dialog ? (n(), c("div", gn, [l("div", bn, [l("div", {
        class: "close clickActive",
        onClick: e[1] || (e[1] = (...s) => g.toggle && g.toggle(...s))
    }, hn), l("div", kn, d(t.$t("betlimit")), 1), l("div", fn, [(n(!0), c(x, null, S(("$storeGlobal" in t ? t.$storeGlobal : p(_))()._profile.betLimit, s => (n(), c("div", {
        key: s.limitId,
        class: r(["btn font16-14 clickActive", u.selectLimit === s.limitId ? "active" : ""]),
        onClick: i => g.selectBetLimit(s.limitId)
    }, d(("useSetK" in t ? t.useSetK : p(gl))(s.min)) + " - " + d(("useSetK" in t ? t.useSetK : p(gl))(s.max)), 11, _n))), 128))]), u.type === "bac" ? (n(), c("div", xn, [l("div", $n, [l("div", yn, d(t.$t("bettype")), 1), l("div", wn, d(t.$t("maxstake")), 1)]), (n(!0), c(x, null, S(u.list, (s, i) => (n(), c("div", {
        key: i,
        class: "calzone-detail"
    }, [l("div", null, d(t.$t(`${s.name}`)), 1), l("div", null, d(("useCur" in t ? t.useCur : p(H))(Math.floor(u.cal.max / s.odd))), 1)]))), 128))])) : u.type === "dt" ? (n(), c("div", Tn, [l("div", Ln, [l("div", Cn, d(t.$t("bettype")), 1), l("div", Bn, d(t.$t("maxstake")), 1)]), (n(!0), c(x, null, S(u.listDT, (s, i) => (n(), c("div", {
        key: i,
        class: "calzone-detail"
    }, [l("div", null, d(t.$t(`${s.name}`)), 1), l("div", null, d(("useCur" in t ? t.useCur : p(H))(Math.floor(u.cal.max / s.odd))), 1)]))), 128))])) : u.type === "sedie" ? (n(), c("div", Sn, [l("div", Mn, [l("div", An, d(t.$t("bettype")), 1), l("div", Hn, d(t.$t("maxstake")), 1)]), (n(!0), c(x, null, S(u.listSedie, (s, i) => (n(), c("div", {
        key: i,
        class: "calzone-detail"
    }, [l("div", null, d(t.$t(`${s.name}`)), 1), l("div", null, d(("useCur" in t ? t.useCur : p(H))(Math.floor(u.cal.max / s.odd))), 1)]))), 128))])) : (n(), c("div", Rn, [l("div", zn, [l("div", jn, d(t.$t("bettype")), 1), l("div", Pn, d(t.$t("maxstake")), 1)]), v(a, {
        label: t.$t("baccarat"),
        ui: {
            label: "text-secondary dark:text-secondary"
        }
    }, null, 8, ["label"]), (n(!0), c(x, null, S(u.list, (s, i) => (n(), c("div", {
        key: i,
        class: "calzone-detail"
    }, [l("div", null, d(t.$t(`${s.name}`)), 1), l("div", null, d(("useCur" in t ? t.useCur : p(H))(Math.floor(u.cal.max / s.odd))), 1)]))), 128)), v(a, {
        label: t.$t("dragontiger"),
        ui: {
            label: "text-secondary dark:text-secondary"
        }
    }, null, 8, ["label"]), (n(!0), c(x, null, S(u.listDT, (s, i) => (n(), c("div", {
        key: i,
        class: "calzone-detail"
    }, [l("div", null, d(t.$t(`${s.name}`)), 1), l("div", null, d(("useCur" in t ? t.useCur : p(H))(Math.floor(u.cal.max / s.odd))), 1)]))), 128)), v(a, {
        label: t.$t("sicbo"),
        ui: {
            label: "text-secondary dark:text-secondary"
        }
    }, null, 8, ["label"]), (n(!0), c(x, null, S(u.listSicBo, (s, i) => (n(), c("div", {
        key: i,
        class: "calzone-detail"
    }, [l("div", null, d(t.$t(`${s.name}`)), 1), l("div", null, d(("useCur" in t ? t.useCur : p(H))(Math.floor(u.cal.max / s.odd))), 1)]))), 128)), v(a, {
        label: `${t.$t("megasicbo")} * ${t.$t("onlydiff")}`,
        ui: {
            label: "text-secondary dark:text-secondary"
        }
    }, null, 8, ["label"]), (n(!0), c(x, null, S(u.listMegaSicBo, (s, i) => (n(), c("div", {
        key: i,
        class: "calzone-detail"
    }, [l("div", null, d(t.$t(`${s.name}`)), 1), l("div", null, d(("useCur" in t ? t.useCur : p(H))(Math.floor(u.cal.max / s.odd))), 1)]))), 128)), v(a, {
        label: t.$t("hilo"),
        ui: {
            label: "text-secondary dark:text-secondary"
        }
    }, null, 8, ["label"]), (n(!0), c(x, null, S(u.listHiLo, (s, i) => (n(), c("div", {
        key: i,
        class: "calzone-detail"
    }, [l("div", null, d(t.$t(`${s.name}`)), 1), l("div", null, d(("useCur" in t ? t.useCur : p(H))(Math.floor(u.cal.max / s.odd))), 1)]))), 128)), v(a, {
        label: t.$t("fantan"),
        ui: {
            label: "text-secondary dark:text-secondary"
        }
    }, null, 8, ["label"]), (n(!0), c(x, null, S(u.listFanTan, (s, i) => (n(), c("div", {
        key: i,
        class: "calzone-detail"
    }, [l("div", null, d(t.$t(`${s.name}`)), 1), l("div", null, d(("useCur" in t ? t.useCur : p(H))(Math.floor(u.cal.max / s.odd))), 1)]))), 128)), v(a, {
        label: t.$t("roulette"),
        ui: {
            label: "text-secondary dark:text-secondary"
        }
    }, null, 8, ["label"]), (n(!0), c(x, null, S(u.listRoulette, (s, i) => (n(), c("div", {
        key: i,
        class: "calzone-detail"
    }, [l("div", null, d(t.$t(`${s.name}`)), 1), l("div", null, d(("useCur" in t ? t.useCur : p(H))(Math.floor(u.cal.max / s.odd))), 1)]))), 128)), v(a, {
        label: t.$t("sedie"),
        ui: {
            label: "text-secondary dark:text-secondary"
        }
    }, null, 8, ["label"]), (n(!0), c(x, null, S(u.listSedie, (s, i) => (n(), c("div", {
        key: i,
        class: "calzone-detail"
    }, [l("div", null, d(t.$t(`${s.name}`)), 1), l("div", null, d(("useCur" in t ? t.useCur : p(H))(Math.floor(u.cal.max / s.odd))), 1)]))), 128))])), l("div", {
        class: "saveBtn",
        onClick: e[2] || (e[2] = s => g.save())
    }, d(t.$t("save")), 1)])])) : f("", !0)], 64)
}
const ro = V(un, [
        ["render", On],
        ["__scopeId", "data-v-843e8e6a"]
    ]),
    In = {
        data() {
            return {
                dialog: !1,
                selecting: []
            }
        },
        computed: {
            chip() {
                return _()._chip
            },
            select() {
                return _()._chip.selectList
            }
        },
        watch: {},
        methods: {
            toggle() {
                this.dialog = !this.dialog, this.selecting = [...this.select]
            },
            checkChip(t) {
                return this.selecting.includes(t)
            },
            selectChip(t) {
                const e = t;
                this.selecting.includes(e) ? this.selecting.length && (this.selecting = this.selecting.filter(k => k !== e)) : this.selecting.length < 5 && this.selecting.push(e)
            },
            save(t) {
                const e = this.selecting.sort((o, k) => o - k);
                _().setChip(e), window.localStorage.setItem("chipList3", e), _().setBetVal(1e7), this.toggle()
            }
        }
    },
    Gn = t => (X("data-v-cb1ff5ff"), t = t(), ee(), t),
    Dn = {
        key: 1,
        class: "bg"
    },
    Un = {
        style: {
            margin: "16px 12px"
        }
    },
    Wn = Gn(() => l("img", {
        src: xl
    }, null, -1)),
    Nn = [Wn],
    Vn = {
        class: "font-18-16",
        style: {
            "margin-bottom": "30px",
            "font-weight": "600"
        }
    },
    En = {
        class: "flex flex-wrap",
        style: {
            gap: "8px",
            "margin-bottom": "24px"
        }
    },
    Fn = ["onClick"],
    Kn = ["src"];

function Zn(t, e, o, k, u, g) {
    return n(), c(x, null, [u.dialog ? (n(), c("div", {
        key: 0,
        class: "bg-overlay",
        onClick: e[0] || (e[0] = a => g.toggle())
    })) : f("", !0), u.dialog ? (n(), c("div", Dn, [l("div", Un, [l("div", {
        class: "close clickActive",
        onClick: e[1] || (e[1] = (...a) => g.toggle && g.toggle(...a))
    }, Nn), l("div", Vn, d(t.$t("favchip")), 1), l("div", En, [(n(!0), c(x, null, S(g.chip.list, (a, s) => (n(), c("div", {
        key: s,
        class: r(["relative", g.checkChip(s) ? "activeChip" : ""]),
        onClick: i => g.selectChip(s)
    }, [l("img", {
        src: `/chip/${a}.svg`,
        width: "40px",
        height: "40px",
        style: ie(g.checkChip(s) ? "opacity:1" : "opacity:0.4")
    }, null, 12, Kn)], 10, Fn))), 128))]), l("div", {
        class: r(["saveBtn", u.selecting.length < 5 ? "disable" : ""]),
        onClick: e[2] || (e[2] = a => g.save())
    }, d(t.$t("save")), 3)])])) : f("", !0)], 64)
}
const uo = V(In, [
    ["render", Zn],
    ["__scopeId", "data-v-cb1ff5ff"]
]);
export {
    lo as N, oe as _, co as a, ro as b, uo as c, po as d, oo as e, to as f, io as g, so as h, ao as i, no as j, Rs as k, zs as l, js as m, Ps as n, Os as o, Is as p, Gs as q, Vs as r, Ds as s, Us as t, Ws as u, Ns as v, ce as w, D as x, U as y
};