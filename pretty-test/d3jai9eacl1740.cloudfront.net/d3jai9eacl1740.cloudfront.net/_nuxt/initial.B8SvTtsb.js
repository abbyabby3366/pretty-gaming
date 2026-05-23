import {
    z as r,
    y as o,
    N as b,
    O as i,
    I as n,
    A as l,
    $ as t,
    a as y,
    L as u,
    g as k
} from "./entry.BFNHJ093.js";
const m = {
    __name: "initial",
    setup(g) {
        r(() => {
            o().getTableBac().then(() => {
                b().getTableSicBo().then(() => {
                    i().getTableRoulette().then(() => {
                        n().getTableSeDie().then(() => {
                            o().getTableDt().then(() => {
                                l.init(), l.connect("hall")
                            }).then(async () => {
                                var a;
                                ((a = t()._profile) == null ? void 0 : a.currency[0]) === "THB" ? (localStorage.setItem("isClassic", "false"), t().setIsClassic(!1)) : (localStorage.setItem("isClassic", "true"), t().setIsClassic(!0)), await new Promise(s => setTimeout(s, 1500)), c()
                            })
                        })
                    })
                })
            })
        });
        const e = a => {
                u({
                    path: a
                })
            },
            c = () => {
                switch (localStorage.getItem("autoJoin")) {
                    case "BAC":
                        e("/lobby/baccarat");
                        break;
                    case "MUL":
                        e("/lobby/multiplay");
                        break;
                    case "DRA":
                        e("/lobby/dragontiger");
                        break;
                    case "SIC":
                        e("/lobby/sicbo");
                        break;
                    case "ROU":
                        e("/lobby/roulette");
                        break;
                    case "FT":
                        e("/lobby/fantan");
                        break;
                    case "SED":
                        e("/lobby/sedie");
                        break;
                    case "HILO":
                        e("/lobby/hilo");
                        break;
                    case "STEP":
                        e("/lobby/parlay");
                        break;
                    default:
                        e("/lobby/all");
                        break
                }
            };
        return (a, s) => (k(), y("div"))
    }
};
export {
    m as
    default
};