import {
    $ as u,
    g as t,
    a as g,
    e as m,
    b as n,
    t as c,
    n as r,
    F as p,
    p as b,
    i as k
} from "./entry.BFNHJ093.js";
import {
    _ as v
} from "./close.BqjWTNPe.js";
import {
    _ as a
} from "./_plugin-vue_export-helper.DlAUqK2U.js";
const d = {
        name: "Gamerules",
        components: {},
        data() {
            return {
                dialog: !1,
                selecting: "bac",
                selectingBAC: "normal"
            }
        },
        computed: {
            sizing() {
                return u()._sizing
            }
        },
        methods: {
            toggle(i = "bac") {
                this.selecting = i, this.dialog = !this.dialog
            }
        }
    },
    C = i => (b("data-v-5384bc41"), i = i(), k(), i),
    y = {
        key: 1,
        class: "bg-bethistory"
    },
    B = C(() => n("img", {
        src: v
    }, null, -1)),
    S = [B],
    f = {
        class: "font-18-16",
        style: {
            "margin-top": "12px",
            "margin-left": "12px"
        }
    },
    _ = {
        class: "flex overflow-auto",
        style: {
            height: "65px",
            gap: "8px",
            "margin-left": "10px",
            "margin-top": "10px"
        }
    },
    z = {
        class: "content"
    },
    w = {
        key: 0,
        class: "content"
    },
    M = {
        class: "flex block-newline",
        style: {
            height: "50px",
            gap: "8px"
        }
    },
    A = ["src"],
    h = ["src"],
    D = ["src"],
    H = ["src"],
    L = ["src"],
    R = ["src"],
    T = ["src"],
    F = ["src"],
    I = ["src"],
    N = ["src"],
    x = ["src"];

function G(i, s, V, E, e, l) {
    return t(), g(p, null, [e.dialog ? (t(), g("div", {
        key: 0,
        class: "w-[100%] h-[100%] bg-black/50 absolute top-0 left-0 z-[100]",
        onClick: s[0] || (s[0] = (...o) => l.toggle && l.toggle(...o))
    })) : m("", !0), e.dialog ? (t(), g("div", y, [n("div", {
        class: "close",
        onClick: s[1] || (s[1] = (...o) => l.toggle && l.toggle(...o))
    }, S), n("div", f, c(i.$t("gamerules")), 1), n("div", _, [n("div", {
        class: r(["menu-btn", e.selecting === "bac" ? "active" : ""]),
        onClick: s[2] || (s[2] = o => e.selecting = "bac")
    }, c(i.$t("baccarat")), 3), n("div", {
        class: r(["menu-btn", e.selecting === "step" ? "active" : ""]),
        onClick: s[3] || (s[3] = o => e.selecting = "step")
    }, c(i.$t("parlay")), 3), n("div", {
        class: r(["menu-btn", e.selecting === "dt" ? "active" : ""]),
        onClick: s[4] || (s[4] = o => e.selecting = "dt")
    }, c(i.$t("dragontiger")), 3), n("div", {
        class: r(["menu-btn", e.selecting === "SicBo" ? "active" : ""]),
        onClick: s[5] || (s[5] = o => e.selecting = "SicBo")
    }, c(i.$t("sicbo")), 3), n("div", {
        class: r(["menu-btn", e.selecting === "MegaSicBo" ? "active" : ""]),
        onClick: s[6] || (s[6] = o => e.selecting = "MegaSicBo")
    }, c(i.$t("megasicbo")), 3), n("div", {
        class: r(["menu-btn", e.selecting === "ThaiHiLo" ? "active" : ""]),
        onClick: s[7] || (s[7] = o => e.selecting = "ThaiHiLo")
    }, c(i.$t("hilo")), 3), n("div", {
        class: r(["menu-btn", e.selecting === "Roulette" ? "active" : ""]),
        onClick: s[8] || (s[8] = o => e.selecting = "Roulette")
    }, c(i.$t("roulette")), 3), n("div", {
        class: r(["menu-btn", e.selecting === "Sedie" ? "active" : ""]),
        onClick: s[9] || (s[9] = o => e.selecting = "Sedie")
    }, c(i.$t("sedie")), 3)]), n("div", z, [e.selecting === "bac" ? (t(), g("div", w, [n("div", M, [n("div", {
        class: r(["menu-btn", e.selectingBAC === "fourpoint" ? "active2" : ""]),
        style: {
            "background-color": "black"
        },
        onClick: s[10] || (s[10] = o => e.selectingBAC = "fourpoint")
    }, c(i.$t("4point")), 3), n("div", {
        class: r(["menu-btn", e.selectingBAC === "normal" ? "active2" : ""]),
        style: {
            "background-color": "black"
        },
        onClick: s[11] || (s[11] = o => e.selectingBAC = "normal")
    }, c(i.$t("classic")), 3), n("div", {
        class: r(["menu-btn", e.selectingBAC === "super6" ? "active2" : ""]),
        style: {
            "background-color": "black"
        },
        onClick: s[12] || (s[12] = o => e.selectingBAC = "super6")
    }, c(i.$t("supersix")), 3), n("div", {
        class: r(["menu-btn", e.selectingBAC === "cowcow" ? "active2" : ""]),
        style: {
            "background-color": "black"
        },
        onClick: s[13] || (s[13] = o => e.selectingBAC = "cowcow")
    }, c(i.$t("cowcow")), 3)]), e.selectingBAC === "normal" ? (t(), g("img", {
        key: 0,
        src: l.sizing === "mobile" ? "/gamerules/enNormalMobile.png" : "/gamerules/enNormalDesktop.png"
    }, null, 8, A)) : e.selectingBAC === "fourpoint" ? (t(), g("img", {
        key: 1,
        src: l.sizing === "mobile" ? "/gamerules/enFourMobile.png" : "/gamerules/enFourDesktop.png"
    }, null, 8, h)) : e.selectingBAC === "super6" ? (t(), g("img", {
        key: 2,
        src: l.sizing === "mobile" ? "/gamerules/enSuper6Mobile.png" : "/gamerules/enSuper6Desktop.png"
    }, null, 8, D)) : e.selectingBAC === "cowcow" ? (t(), g("img", {
        key: 3,
        src: l.sizing === "mobile" ? "/gamerules/enCowMobile.png" : "/gamerules/enCowDesktop.png"
    }, null, 8, H)) : m("", !0)])) : e.selecting === "step" ? (t(), g("img", {
        key: 1,
        src: l.sizing === "mobile" ? "/gamerules/enparlaymobile.png" : "/gamerules/enparlay.png"
    }, null, 8, L)) : e.selecting === "dt" ? (t(), g("img", {
        key: 2,
        src: l.sizing === "mobile" ? "/gamerules/endtmobile.png" : "/gamerules/endt.png"
    }, null, 8, R)) : e.selecting === "SicBo" ? (t(), g("img", {
        key: 3,
        src: l.sizing === "mobile" ? "/gamerules/enSicBoMobile.png" : "/gamerules/enSicBoDesktop.png"
    }, null, 8, T)) : e.selecting === "MegaSicBo" ? (t(), g("img", {
        key: 4,
        src: l.sizing === "mobile" ? "/gamerules/enMegaSicBoMobile.png" : "/gamerules/enMegaSicBoDesktop.png"
    }, null, 8, F)) : e.selecting === "ThaiHiLo" ? (t(), g("img", {
        key: 5,
        src: l.sizing === "mobile" ? "/gamerules/enThaiHiLoMobile.png" : "/gamerules/enThaiHiLoDesktop.png"
    }, null, 8, I)) : e.selecting === "Sedie" ? (t(), g("img", {
        key: 6,
        src: l.sizing === "mobile" ? "/gamerules/enSedieMobile.png" : "/gamerules/enSedieDesktop.png"
    }, null, 8, N)) : e.selecting === "Roulette" ? (t(), g("img", {
        key: 7,
        src: l.sizing === "mobile" ? "/gamerules/enRouletteMobile.png" : "/gamerules/enRouletteDesktop.png"
    }, null, 8, x)) : m("", !0)])])) : m("", !0)], 64)
}
const K = a(d, [
    ["render", G],
    ["__scopeId", "data-v-5384bc41"]
]);
export {
    K as _
};