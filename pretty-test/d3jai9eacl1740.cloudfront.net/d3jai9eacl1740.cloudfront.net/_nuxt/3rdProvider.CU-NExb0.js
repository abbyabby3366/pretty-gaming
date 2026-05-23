import {
    a5 as l,
    $ as r,
    M as s,
    aa as c
} from "./entry.BFNHJ093.js";
const d = l("3rdProvider", {
    state: () => ({
        playingURL: "",
        sicTable: [],
        rouTable: [],
        bjTable: [],
        socket3rd: {}
    }),
    getters: {
        _playingURL: t => t.playingURL,
        _sicboTable: t => t.sicboTable,
        _rouTable: t => t.rouTable,
        _bjTable: t => t.bjTable,
        _socket3rd: t => t.socket3rd
    },
    actions: {
        async getIframePP(t) {
            const {
                $i18n: e
            } = c(), a = {
                pathform: r()._sizing,
                lang: e.locale.value,
                tableId: t
            };
            let o;
            return await s("POST", "/apiRoute/member/startGame3rdProvider", a).then(i => {
                i.code === 0 && (this.playingURL = i.body, o = i), o = i
            }), o
        },
        async getTableBlackjack() {
            s("GET", "/apiRoute/table/getAllBlackjack").then(t => {
                t.code === 0 && (t.data = t.data.filter(e => e.isActive === !0), this.bjTable = t.data)
            })
        },
        async getTableRoulette() {
            s("GET", "/apiRoute/table/getAllRoulette").then(t => {
                if (t.code === 0) {
                    t.data = t.data.filter(a => a.isActive === !0), this.rouTable = t.data, this.drawStatsRou(t.data, "list");
                    const e = {};
                    this.rouTable.forEach((a, o) => {
                        Object.assign(e, {
                            [a.roomId]: a
                        })
                    }), Object.assign(this.socket3rd, e)
                }
            })
        },
        setSocketRou(t, e) {
            e.timeLeft === e.maxTimeLeft - 1 && this.getTableById(e.roomId), this.socket3rd[t] = e
        },
        getTableById(t) {
            s("GET", `/apiRoute/table/getStatResult/${t}`).then(e => {
                e.code === 0 && (e.data, t.substring(0, 3) === "SIC" || t.substring(0, 3))
            })
        },
        drawStatsRou(t, e) {
            t.forEach((a, o) => {
                const i = {};
                Object.assign(t[o], i)
            }), e === "list" ? this.rouTable = t : this.rouTable.forEach((a, o) => {
                a.roomId === t[0].roomId && (this.rouTable[o] = t[0])
            })
        }
    }
});
export {
    d as $
};