import {
    J as h,
    K as u,
    $ as a,
    L as g,
    M as m,
    a as p,
    b as o,
    t as r,
    m as d,
    h as k,
    g as b
} from "./entry.BFNHJ093.js";
import {
    s as f
} from "./interval.ByBGdkBT.js";
import {
    _ as v
} from "./_plugin-vue_export-helper.DlAUqK2U.js";
const _ = {
        setup() {
            const e = h(),
                {
                    baseURL: t,
                    version: i
                } = u().public;
            return {
                appConfig: e,
                baseURL: t,
                version: i
            }
        },
        data() {
            return {
                value: 0,
                interval: 0
            }
        },
        computed: {
            sizing() {
                return a()._sizing
            }
        },
        watch: {
            async value(e) {
                e < 100 || (await clearInterval(this.interval), g({
                    path: "/initial"
                }))
            }
        },
        beforeUnmount() {
            clearInterval(this.interval)
        },
        beforeMount() {
            this.checkMaintain()
        },
        mounted() {
            this.interval = f(() => {
                this.value += 1
            }, 40)
        },
        methods: {
            checkAllParams() {
                localStorage.removeItem("game"), localStorage.removeItem("room"), localStorage.setItem("autoJoin", this.getParameterByName("game")), localStorage.setItem("autoJoinRoom", this.getParameterByName("room"));
                const e = this.getParameterByName("tkuuid"),
                    t = this.getParameterByName("game_id");
                e !== "" ? this.getToken(e) : window.location.href.includes("uat.") ? m("POST", "/apiRoute/member/authen", {
                    username: "pablo",
                    password: "aA8765432"
                }).then(c => {
                    c.code === 0 && (window.localStorage.setItem("token", c.data.accessToken), a().token = c.data.accessToken, a().getProfile())
                }) : t === "play-demo" && (localStorage.removeItem("token"), a().getDemo());
                const i = this.getParameterByName("lang");
                if (i) switch (i) {
                    case "TH":
                        this.selectLang("th");
                        break;
                    case "EN":
                        this.selectLang("en");
                        break;
                    case "CNM":
                        this.selectLang("zh");
                        break;
                    case "CNC":
                        this.selectLang("zh2");
                        break;
                    case "KOR":
                        this.selectLang("kr");
                        break;
                    case "VT":
                        this.selectLang("vt");
                        break;
                    case "MY":
                        this.selectLang("my");
                        break;
                    case "LO":
                        this.selectLang("lo");
                        break;
                    case "KM":
                        this.selectLang("km");
                        break;
                    case "ID":
                        this.selectLang("id");
                        break;
                    case "MS":
                        this.selectLang("ms");
                        break;
                    case "TR":
                        this.selectLang("tr");
                        break;
                    case "JP":
                        this.selectLang("jp");
                        break;
                    case "BN":
                        this.selectLang("bn");
                        break;
                    case "ES":
                        this.selectLang("es");
                        break;
                    case "SV":
                        this.selectLang("sv");
                        break
                }
                this.getParameterByName("isClassic") ? (localStorage.setItem("isClassic", "true"), a().setIsClassic(!0)) : (localStorage.setItem("isClassic", "false"), a().setIsClassic(!1));
                const n = this.getParameterByName("url");
                n ? a().setRedirect(n) : a().setRedirect(""), window.localStorage.getItem("firstSicBo") ? a().setFirstTimeSicBo(!1) : a().setFirstTimeSicBo(!0)
            },
            selectLang(e) {
                this.$i18n.setLocale(e)
            },
            getParameterByName(e) {
                e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                const t = "[\\?&]" + e + "=([^&#]*)",
                    s = new RegExp(t).exec(window.location.href);
                return s == null ? "" : decodeURIComponent(s[1].replace(/\+/g, " "))
            },
            async checkMaintain() {
                m("GET", "/apiRoute/maintenance", "").then(e => {
                    e.data.isActive ? this.checkAllParams() : (window.maintenTime = e.data.endDate, g({
                        path: "/maintenance"
                    }))
                })
            },
            async getToken(e) {
                const t = {
                    tkuuid: `${e}`,
                    ip: ""
                };
                a().getToken(t)
            }
        }
    },
    L = {
        class: "main-bg"
    },
    S = {
        class: "bg-img"
    },
    y = ["src"],
    B = {
        class: "vers"
    },
    I = {
        class: "loading-zone"
    },
    w = {
        class: "loading-progress"
    };

function T(e, t, i, s, n, l) {
    return b(), p("div", L, [o("div", S, [o("img", {
        src: l.sizing === "mobile" ? "/loading/mobileLoading.jpg" : "/loading/desktopLoading.jpg"
    }, null, 8, y), o("div", B, r(s.baseURL.includes("dev") ? `DEV ${s.version}` : `Version ${s.version}`), 1), o("div", I, [d(r(e.$t("loading")) + " ", 1), o("div", w, [o("div", {
        class: "loading-progress-bulb",
        style: k(`width:${n.value}%`)
    }, null, 4)]), d(" " + r(n.value) + "% ", 1)])])])
}
const x = v(_, [
    ["render", T],
    ["__scopeId", "data-v-73b450b8"]
]);
export {
    x as
    default
};