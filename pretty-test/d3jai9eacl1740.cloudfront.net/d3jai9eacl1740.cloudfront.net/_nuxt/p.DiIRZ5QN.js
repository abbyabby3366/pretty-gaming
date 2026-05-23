import {
    r as _,
    c as $,
    $ as u,
    k as P,
    o as C,
    g as c,
    a as p,
    b as a,
    n as k,
    u as i,
    h as I,
    w as E,
    e as v,
    t as L,
    _ as U,
    q as T,
    F as O,
    H as M,
    L as r,
    N as V,
    p as A,
    i as B
} from "./entry.BFNHJ093.js";
import {
    _ as N
} from "./videoLoad.Cd0hhZqh.js";
import {
    b as j
} from "./shuffling.XZhqFkC3.js";
import {
    _ as G
} from "./_plugin-vue_export-helper.DlAUqK2U.js";
const F = ["id"],
    z = a("img", {
        class: "w-[55%]",
        src: N
    }, null, -1),
    H = [z],
    J = {
        __name: "videoTC",
        props: {
            forceURL: {
                default: ""
            },
            sendkey: {
                default: 0
            },
            camera: {
                default: "NORMAL"
            },
            isMulti: {
                default: !1
            }
        },
        setup(l) {
            const n = l,
                e = _(!0),
                b = $(() => n.forceURL ? n.forceURL : window.videoUrl),
                o = () => {
                    window.TcPlayer && (e.value = !0, window.player = new TcPlayer.TcPlayer(`${n.sendkey}`, {
                        webrtc: b.value,
                        width: "100%",
                        height: "100%",
                        controls: "none",
                        live: !0,
                        autoplay: !0,
                        listener: t => {
                            t.type === "loadeddata" && (e.value = !1, window.player.volume(parseFloat(localStorage.getItem("liveV")))), t.type
                        }
                    }))
                },
                d = t => {
                    const s = parseFloat(t.detail ? ? t);
                    window.player.volume(s)
                },
                f = () => {
                    if (document.visibilityState === "hidden") window.dispatchEvent(new CustomEvent("tc:setVolume", {
                        detail: "0"
                    })), window.player.destroy();
                    else {
                        o();
                        const t = window.localStorage.getItem("liveV");
                        window.dispatchEvent(new CustomEvent("tc:setVolume", {
                            detail: t
                        }))
                    }
                },
                m = () => {
                    window.player.destroy(), o()
                },
                h = $(() => u()._sizing),
                g = t => {
                    if (t === "NORMAL") return "width:100%;";
                    if (t === "ZOOM") return h.value === "mobile" || n.isMulti ? "transform: scale(1.5) translate(0px, 30px);" : "width: 100%";
                    if (t === "ICO") return h.value === "mobile" || n.isMulti ? "transform: scale(1.5) translate(0px, 15px);" : "width: 100%"
                };
            return P(() => {
                o(), window.addEventListener("tc:setVolume", d), document.addEventListener("visibilitychange", f), localStorage.getItem("autoJoinRoom") && (window.addEventListener("click", m, {
                    once: !0
                }), window.addEventListener("touchstart", m, {
                    once: !0
                }))
            }), C(() => {
                window.removeEventListener("tc:setVolume", d), document.removeEventListener("visibilitychange", f), window.player.destroy()
            }), (t, s) => (c(), p("div", null, [a("div", {
                id: n.sendkey,
                class: k(i(e) ? "hidden" : "block"),
                style: I(g(n.camera))
            }, null, 14, F), a("div", {
                class: k(["justify-center", i(e) ? "flex" : "hidden"])
            }, H, 2)]))
        }
    },
    Z = ["id"],
    q = a("img", {
        class: "w-[55%]",
        src: N
    }, null, -1),
    D = [q],
    K = {
        __name: "videoNANO",
        props: {
            forceURL: {
                default: ""
            },
            sendkey: {
                default: 0
            },
            isZoom: {
                default: !1
            }
        },
        setup(l) {
            const n = l,
                e = _(!0),
                b = $(() => n.forceURL ? n.forceURL : window.videoUrl);
            let o;
            const d = {
                    source: {
                        group: {
                            id: `${b.value}`,
                            apiurl: "https://bintu.nanocosmos.de"
                        },
                        options: {
                            adaption: {
                                rule: "deviationOfMean2"
                            }
                        },
                        startIndex: 0
                    },
                    playback: {
                        latencyControlMode: "balacedadaptive",
                        autoplay: !0,
                        automute: !1,
                        muted: !1,
                        faststart: !0
                    },
                    events: {
                        onPlay: function(t) {
                            e.value = !1
                        },
                        onPause: function(t) {
                            e.value = !1, o.play()
                        },
                        onError: function(t) {
                            o.play()
                        }
                    },
                    style: {
                        width: "100%",
                        height: "100%",
                        controls: !1,
                        interactive: !0,
                        displayMutedAutoplay: !1
                    }
                },
                f = t => {
                    const s = t;
                    o && typeof o.setVolume == "function" && (o.setVolume(s), s <= 0 ? o.mute() : o.unmute())
                },
                m = t => f(t.detail),
                h = () => {
                    o = new window.NanoPlayer(`${n.sendkey}`), o.setup(d).then(t => {
                        "" + JSON.stringify(t, void 0, 4);
                        const s = parseFloat(localStorage.getItem("liveV"));
                        Number.isNaN(s) || f(s)
                    }, t => {
                        alert(t.message)
                    })
                };
            P(() => {
                h(), window.addEventListener("nano:setVolume", m), document.addEventListener("visibilitychange", g)
            }), C(() => {
                window.removeEventListener("nano:setVolume", m), document.removeEventListener("visibilitychange", g), o == null || o.destroy()
            });
            const g = () => {
                document.visibilityState === "hidden" ? o == null || o.destroy() : h()
            };
            return (t, s) => (c(), p("div", null, [a("div", {
                id: n.sendkey,
                class: k(i(e) ? "hidden" : "block"),
                style: {
                    width: "100%",
                    "padding-bottom": "56.25%"
                }
            }, null, 10, Z), a("div", {
                class: k(["justify-center", i(e) ? "flex" : "hidden"])
            }, D, 2)]))
        }
    },
    S = l => (A("data-v-237d141d"), l = l(), B(), l),
    Q = {
        key: 0,
        class: "relative w-[100%] h-[2px] mt-[-4px] mb-[5px]"
    },
    W = {
        class: "flex justify-between mt-[4px] block-newline"
    },
    X = {
        class: "flex items-center gap-[4px]"
    },
    Y = ["src"],
    ee = {
        class: "flex gap-[4px]"
    },
    te = S(() => a("img", {
        src: j
    }, null, -1)),
    oe = {
        class: "font-light text-[12px]"
    },
    se = {
        class: "flex items-center gap-[12px]"
    },
    ae = ["src"],
    ie = {
        key: 2,
        class: "relative"
    },
    le = S(() => a("circle", {
        class: "bg"
    }, null, -1)),
    ne = S(() => a("circle", {
        class: "fg"
    }, null, -1)),
    re = [le, ne],
    ce = {
        class: "absolute top-[20%] left-[0%]",
        style: {
            "font-size": "12px",
            "text-align": "center",
            width: "26px"
        }
    },
    de = {
        key: 1,
        class: "relative w-[100%] h-[2px] bg-bgLight mt-[8px]"
    },
    ue = {
        key: 2,
        class: "rounded-[10px] overflow-hidden mt-[4px]"
    },
    me = {
        __name: "mul-topbar",
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
            game: {
                type: String
            },
            joinable: {
                type: Boolean,
                default () {
                    return !0
                }
            }
        },
        emits: ["switching"],
        setup(l, {
            emit: n
        }) {
            const e = l,
                b = n,
                o = _(0),
                d = _(0);
            E(() => e.socket.timeLeft, () => {
                o.value = e.socket.timeLeft;
                const s = e.socket.maxTimeLeft,
                    y = e.socket.timeLeft,
                    x = 100,
                    R = s - y,
                    w = x / s;
                d.value = x - w * R, t()
            });
            const f = _(!1),
                m = _(Math.floor(Math.random() * 1e3)),
                h = () => {
                    f.value = !f.value, m.value += 1
                },
                g = () => {
                    M().name === "lobby-multiplay" ? e.game === "bac" ? (r({
                        path: "/baccarat"
                    }), u().setPlayingRoomId(e.api.roomId)) : e.game === "dt" ? (r({
                        path: "/dragontiger"
                    }), u().setPlayingRoomId(e.api.roomId)) : e.game === "sed" ? (r({
                        path: "/sedie"
                    }), u().setPlayingRoomId(e.api.roomId)) : (e.game === "SicBo" || e.game === "ThaiFanTan" || e.game === "ThaiHiLo") && (r({
                        path: "/sicbo"
                    }), u().setPlayingRoomId(e.api.roomId)) : (e.game === "bac" ? r({
                        path: "/lobby/all"
                    }).then(() => {
                        u().setPlayingRoomId(e.api.roomId)
                    }).then(() => {
                        r({
                            path: "/baccarat"
                        }).then(() => {})
                    }) : e.game === "dt" ? r({
                        path: "/lobby/all"
                    }).then(() => {
                        u().setPlayingRoomId(e.api.roomId)
                    }).then(() => {
                        r({
                            path: "/dragontiger"
                        }).then(() => {})
                    }) : e.game === "sed" ? r({
                        path: "/lobby/all"
                    }).then(() => {
                        u().setPlayingRoomId(e.api.roomId)
                    }).then(() => {
                        r({
                            path: "/sedie"
                        }).then(() => {})
                    }) : e.game === "SicBo" || e.game === "ThaiFanTan" || e.game === "ThaiHiLo" ? r({
                        path: "/lobby/all"
                    }).then(() => {
                        u().setPlayingRoomId(e.api.roomId), V().setBetType(e.game), V().setRoomBetType(e.game)
                    }).then(() => {
                        r({
                            path: "/sicbo"
                        }).then(() => {})
                    }) : e.game === "rou" && r({
                        path: "/lobby/all"
                    }).then(() => {
                        u().setPlayingRoomId(e.api.roomId)
                    }).then(() => {
                        r({
                            path: "/roulette"
                        }).then(() => {})
                    }), b("switching")), window.localStorage.setItem("currentSwitchGame", e.game)
                },
                t = () => d.value > 66 ? "colorGreen" : d.value > 33 ? "colorOrange" : "colorRed";
            return (s, y) => {
                const x = J,
                    R = K;
                return c(), p(O, null, [e.socket.status !== "Shuffle" && l.joinable == !1 && l.game !== "parlay" ? (c(), p("div", Q, [a("div", {
                    class: k(["absolute ml-[-5px] mr-[-5px] newprogress", t()]),
                    style: I(`width:${i(d)}%`)
                }, null, 6)])) : v("", !0), a("div", W, [a("div", X, [a("div", {
                    class: "flex gap-[4px] clickActive",
                    onClick: y[0] || (y[0] = w => ("$storeGlobal" in s ? s.$storeGlobal : i(u))().addFav(e.api.roomId))
                }, [a("img", {
                    class: "w-[20px]",
                    src: ("$storeGlobal" in s ? s.$storeGlobal : i(u))()._favList.find(w => w === e.api.roomId) ? "/hall/favOn.svg" : "/hall/favOff.svg"
                }, null, 8, Y), a("div", null, L(e.api.name), 1)]), a("div", ee, [te, a("div", oe, L(("useCur" in s ? s.useCur : i(U))(e.socket.online)), 1)])]), a("div", se, [e.socket.status !== "Shuffle" ? (c(), p("img", {
                    key: 0,
                    src: i(f) ? "/hall/table/videoOn.svg" : "/hall/table/videoOff.svg",
                    class: "clickActive",
                    onClick: y[1] || (y[1] = w => h())
                }, null, 8, ae)) : v("", !0), l.joinable && l.game !== "parley" ? (c(), p("div", {
                    key: 1,
                    class: "py-[3.5px] px-[16px] bg-secondary text-black rounded-[5px] clickActive",
                    onClick: g
                }, L(s.$t("join")), 1)) : v("", !0), e.socket.status !== "Shuffle" ? (c(), p("div", ie, [(c(), p("svg", {
                    width: "26",
                    height: "26",
                    viewBox: "0 0 250 250",
                    class: "circular-progress",
                    style: I(`--progress: ${i(d)}`)
                }, re, 4)), a("div", ce, L(i(o)), 1)])) : v("", !0)])]), e.socket.status !== "Shuffle" && l.joinable ? (c(), p("div", de, [i(d) !== 0 ? (c(), p("div", {
                    key: 0,
                    class: "relative progress",
                    style: I(`width:${i(d)}%`)
                }, null, 4)) : v("", !0)])) : v("", !0), i(f) && e.socket.status !== "Shuffle" ? (c(), p("div", ue, [e.api.videoUrl.includes("webrtc://") ? (c(), T(x, {
                    key: i(m),
                    camera: e.api.camera,
                    "force-u-r-l": e.api.videoUrl,
                    sendkey: i(m),
                    "is-multi": !0
                }, null, 8, ["camera", "force-u-r-l", "sendkey"])) : (c(), T(R, {
                    key: i(m),
                    camera: e.api.camera,
                    class: "w-[140%] ml-[-20%] h-[205px]",
                    "force-u-r-l": e.api.videoUrl,
                    sendkey: i(m)
                }, null, 8, ["camera", "force-u-r-l", "sendkey"]))])) : v("", !0)], 64)
            }
        }
    },
    ge = G(me, [
        ["__scopeId", "data-v-237d141d"]
    ]),
    ye = "" + globalThis.__publicAssetsURL("stats/donut/normal/b.svg"),
    _e = "" + globalThis.__publicAssetsURL("stats/cockroach/b.svg"),
    be = "" + globalThis.__publicAssetsURL("stats/donut/normal/p.svg"),
    we = "" + globalThis.__publicAssetsURL("stats/cockroach/p.svg");
export {
    be as _, we as a, ye as b, _e as c, ge as d, J as e, K as f
};