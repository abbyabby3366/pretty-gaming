import {
    X as w,
    r as $,
    c as _,
    $ as c,
    u as o,
    g as a,
    a as i,
    h as p,
    b as t,
    t as s,
    Y as S,
    e as L,
    Z as I,
    a0 as m,
    p as D,
    i as z
} from "./entry.BFNHJ093.js";
import {
    _ as A
} from "./close.BqjWTNPe.js";
import {
    _ as C
} from "./_plugin-vue_export-helper.DlAUqK2U.js";
const b = "" + globalThis.__publicAssetsURL("loading_logo.svg"),
    f = l => (D("data-v-984062af"), l = l(), z(), l),
    B = {
        key: 0,
        class: "w-[100%] h-[100%] bg-bgDark/80 absolute top-0 left-0 z-[999]"
    },
    G = {
        class: "font24-20 font-bold"
    },
    N = {
        class: "font18-14"
    },
    j = f(() => t("img", {
        src: A
    }, null, -1)),
    O = [j],
    T = f(() => t("img", {
        class: "w-[50%]",
        src: b
    }, null, -1)),
    V = {
        class: "font24-20"
    },
    E = {
        key: 1,
        class: "w-[100%] h-[100%] bg-bgDark/80 absolute top-0 left-0 z-[999]"
    },
    F = f(() => t("img", {
        class: "w-[50%]",
        src: b
    }, null, -1)),
    H = {
        class: "font24-20"
    },
    M = {
        key: 0
    },
    R = {
        key: 1
    },
    U = {
        __name: "landing",
        setup(l) {
            const {
                locale: v,
                locales: h
            } = w(), y = () => h.value.find(e => e.code === v.value), r = $(!0), g = () => {
                c().setLanding(!1);
                const e = localStorage.getItem("musicN");
                I(y().code), e ? m(e) : m(1)
            }, u = _(() => c()._onLanding), d = _(() => c()._sizing), k = navigator.userAgent;
            return (e, n) => o(k).indexOf("Firefox") > -1 && o(u) ? (a(), i("div", B, [o(r) ? (a(), i("div", {
                key: 0,
                class: "bg-bgLight w-[30%] h-fit bg-bgDark absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col justify-start items-start p-[1.5%] rounded-[8px] gap-[24px]",
                style: p(o(d) === "mobile" ? "width:80%;padding:3%" : "")
            }, [t("div", G, s(e.$t("information")), 1), t("div", N, s(e.$t("infofirefox")), 1), t("div", {
                class: "bg-secondary text-black w-full py-[10px] rounded-[4px] font24-20 px-[20px] clickActive",
                onClick: n[0] || (n[0] = x => r.value = !1)
            }, s(e.$t("confirm")), 1), t("div", {
                class: "close",
                onClick: n[1] || (n[1] = x => r.value = !1)
            }, O)], 4)) : (a(), i("div", {
                key: 1,
                class: "bg-bgLight w-fit h-fit bg-bgDark absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col justify-center items-center p-[1.5%] rounded-[8px] gap-[8px]",
                style: p(o(d) === "mobile" ? "width:80%;height:50%;" : "")
            }, [T, t("div", V, s(e.$t("welcome")), 1), t("div", null, s(e.$t("welcome2")), 1), t("div", {
                class: "bg-secondary text-black w-[100%] py-[10px] rounded-[4px] font24-20 px-[20px] clickActive",
                onClick: g
            }, s(e.$t("confirm")), 1)], 4))])) : o(u) ? (a(), i("div", E, [t("div", {
                class: "bg-bgLight w-fit h-fit bg-bgDark absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col justify-center items-center p-[1.5%] rounded-[8px] gap-[8px]",
                style: p(o(d) === "mobile" ? "width:80%;height:50%;" : "")
            }, [F, t("div", H, s(e.$t("welcome")), 1), ("useSafe" in e ? e.useSafe : o(S))(("$storeGlobal" in e ? e.$storeGlobal : o(c))()._profile.currency[0]) === "THB" ? (a(), i("div", M, s(e.$t("welcome2")), 1)) : (a(), i("div", R, s(e.$t("welcome2_2")), 1)), t("div", {
                class: "bg-secondary text-black w-[100%] py-[10px] rounded-[4px] font24-20 px-[20px] clickActive",
                onClick: g
            }, s(e.$t("confirm")), 1)], 4)])) : L("", !0)
        }
    },
    q = C(U, [
        ["__scopeId", "data-v-984062af"]
    ]);
export {
    q as _
};