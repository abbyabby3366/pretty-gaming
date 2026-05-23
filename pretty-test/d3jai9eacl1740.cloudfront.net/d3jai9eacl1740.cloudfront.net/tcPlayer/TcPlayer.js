!
function(e, t) {
    typeof exports === 'object' && typeof module === 'object' ? module.exports = t() : typeof define === 'function' && define.amd ? define([], t) : typeof exports === 'object' ? exports.TcPlayer = t() : e.TcPlayer = t()
}(this,
    function() {
        return function(e) {
            function t(o) {
                if (i[o]) return i[o].exports
                const n = i[o] = {
                    exports: {},
                    id: o,
                    loaded: !1
                }
                return e[o].call(n.exports, n, n.exports, t),
                    n.loaded = !0,
                    n.exports
            }
            var i = {}
            return t.m = e,
                t.c = i,
                t.p = '//imgcache.qq.com/open/qcloud/video/vcplayer/',
                t(0)
        }([function(e, t, i) {
                'use strict'

                function o(e) {
                    if (e && e.__esModule) return e
                    const t = {}
                    if (e != null)
                        for (const i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
                    return t.default = e,
                        t
                }

                function n(e, t) {
                    if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function')
                }

                function r(e, t) {
                    if (!e) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called')
                    return !t || typeof t !== 'object' && typeof t !== 'function' ? e : t
                }

                function s(e, t) {
                    if (typeof t !== 'function' && t !== null) throw new TypeError('Super expression must either be null or a function, not ' + typeof t)
                    e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }),
                        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }

                function a(e, t) {
                    if (d.IS_MOBILE ? (e.flash = !1, d.IS_X5TBS && e.x5_player ? b.mobile = ['webrtc', 'flv', 'm3u8', 'mp4'] : d.IS_ENABLED_MSE && e.h5_flv && (b.mobile = ['webrtc', 'flv', 'm3u8', 'mp4'])) : (e.flash = !!t.isFormat('rtmp') || e.flash, t.isFormat('flv') && void 0 == e.flash && (e.flash = !0), e.flash ? d.IS_ENABLED_FLASH || (e.flash = !1, d.IS_ENABLED_MSE ? e.h5_flv && (d.IS_SAFARI && v.compareVersion(d.SAFARI_VERSION, '10.1') > -1 || !d.IS_SAFARI) ? b.pc = ['webrtc', 'flv', 'm3u8', 'mp4'] : b.pc = ['webrtc', 'm3u8', 'mp4'] : b.pc = ['webrtc', 'mp4']) : d.IS_ENABLED_MSE ? e.h5_flv && (d.IS_SAFARI && v.compareVersion(d.SAFARI_VERSION, '10.1') > -1 || !d.IS_SAFARI) ? b.pc = ['webrtc', 'flv', 'm3u8', 'mp4'] : b.pc = ['webrtc', 'm3u8', 'mp4'] : d.IS_ENABLED_FLASH ? e.flash = !0 : b.pc = ['webrtc', 'mp4']), e.clarity) {
                        const i = M.indexOf(e.clarity)
                        M.splice(i, 1),
                            M.unshift(e.clarity)
                    }
                }

                function l(e) {
                    var t = {
                        urls: {
                            m3u8: {
                                od: e.m3u8 || '',
                                hd: e.m3u8_hd || '',
                                sd: e.m3u8_sd || ''
                            },
                            flv: {
                                od: e.flv || '',
                                hd: e.flv_hd || '',
                                sd: e.flv_sd || ''
                            },
                            mp4: {
                                od: e.mp4 || '',
                                hd: e.mp4_hd || '',
                                sd: e.mp4_sd || ''
                            },
                            rtmp: {
                                od: e.rtmp || '',
                                hd: e.rtmp_hd || '',
                                sd: e.rtmp_sd || ''
                            },
                            webrtc: {
                                od: e.webrtc || '',
                                hd: e.webrtc_hd || '',
                                sd: e.webrtc_sd || ''
                            }
                        },
                        isClarity: function(e) {
                            const i = t.urls
                            return !!(i.m3u8[e] || i.flv[e] || i.mp4[e] || i.rtmp[e] || i.webrtc[e])
                        },
                        isFormat: function(e) {
                            const i = t.urls
                            return !!i[e].od || !!i[e].hd || !!i[e].sd
                        },
                        hasUrl: function() {
                            return this.isFormat('rtmp') || this.isFormat('flv') || this.isFormat('m3u8') || this.isFormat('mp4') || this.isFormat('webrtc')
                        }
                    }
                    t.definitions = []
                    for (let i = 0; i < M.length; i++) t.isClarity(M[i]) && t.definitions.push(M[i])
                    a(e, t)
                    const o = p(t)
                    return o && (t.curUrl = o.url, t.curDef = o.definition, t.curFormat = o.format),
                        t
                }

                function c(e, t, i) {
                    const o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : b
                    let n = ''
                    let r = void 0
                    i = i || (d.IS_MOBILE ? o.mobile : o.pc)
                    for (let s = 0; s < i.length; s++)
                        if (n = i[s], e[n][t]) {
                            r = {
                                definition: t,
                                url: e[n][t],
                                format: n
                            }
                            break
                        }
                    return r
                }

                function u(e, t) {
                    for (let i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : M, o = '', n = 0; n < i.length; n++)
                        if (o = i[n], e[t][o]) return {
                            definition: o,
                            url: e[t][o]
                        }
                }

                function p(e) {
                    for (var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : b, i = void 0, o = '', n = e.urls, r = d.IS_MOBILE ? t.mobile : t.pc, s = 0; s < r.length; s++)
                        if (o = r[s], e.isFormat(o)) {
                            i = u(n, o),
                                i.format = o
                            break
                        }
                    return i
                }
                t.__esModule = !0,
                    t.TcPlayer = void 0
                const h = i(1)
                var d = o(h)
                const f = i(2)
                const y = (o(f), i(3))
                var v = o(y)
                const A = i(4)
                const m = o(A)
                const g = i(5)
                const w = m.MSG
                var b = {
                    mobile: ['webrtc', 'm3u8', 'mp4'],
                    pc: ['webrtc', 'rtmp', 'flv', 'm3u8', 'mp4']
                }
                var M = ['od', 'hd', 'sd']
                t.TcPlayer = function(e) {
                    function t(i, o) {
                        n(this, t)
                        const s = l(o)
                        M = ['od', 'hd', 'sd']
                        const a = {
                            owner: i,
                            videoSource: s,
                            src: s.curUrl,
                            autoplay: o.autoplay,
                            live: o.live,
                            flash: o.flash,
                            flashUrl: o.flashUrl,
                            poster: o.poster,
                            width: o.width,
                            height: o.height,
                            volume: o.volume,
                            listener: o.listener,
                            wording: o.wording,
                            controls: o.controls,
                            clarity: o.clarity,
                            clarityLabel: o.clarityLabel,
                            showLoading: typeof o.showLoading !== 'boolean' || o.showLoading,
                            pausePosterEnabled: void 0 === o.pausePosterEnabled || o.pausePosterEnabled,
                            fullscreenEnabled: void 0 === o.fuScrnEnabled || o.fuScrnEnabled,
                            systemFullscreen: o.systemFullscreen || !1,
                            hls: o.hls || '0.12.4',
                            h5_flv: o.h5_flv,
                            x5_player: o.x5_player !== !1,
                            x5_type: o.x5_type,
                            x5_fullscreen: o.x5_fullscreen,
                            x5_orientation: o.x5_orientation,
                            x5_playsinline: o.x5_playsinline,
                            preload: o.preload || 'auto',
                            hlsConfig: o.hlsConfig,
                            flvConfig: o.flvConfig,
                            webrtcConfig: o.webrtcConfig
                        }
                        return r(this, e.call(this, a))
                    }
                    return s(t, e),
                        t.prototype._switchClarity = function(e) {
                            e = e || 'od'
                            const t = this.currentTime()
                            const i = this.options.videoSource
                            const o = c(i.urls, e)
                            const n = this.playing()
                            this.load(o.url),
                                i.curUrl = o.url,
                                i.curDef = o.definition,
                                i.curFormat = o.format
                            var r = v.bind(this,
                                function() {
                                    parseInt(this.duration() - t) > 0 && !this.options.live && this.currentTime(t),
                                        n && this.play(!0),
                                        m.unsub(w.MetaLoaded, '*', r, this)
                                })
                            m.sub(w.MetaLoaded, '*', r, this)
                        },
                        t.prototype.switchClarity = function(e) {
                            this.claritySwitcher ? this.claritySwitcher.setClarity(e) : this._switchClarity(e)
                        },
                        t.prototype.handleMsg = function(t) {
                            e.prototype.handleMsg.call(this, t)
                        },
                        t
                }(g.Player)
            },
            function(e, t) {
                'use strict'
                t.__esModule = !0
                const i = window.navigator.userAgent
                const o = /AppleWebKit\/([\d.]+)/i.exec(i)
                const n = o ? parseFloat(o.pop()) : null
                const r = t.IS_IPAD = /iPad/i.test(i)
                const s = t.IS_IPHONE = /iPhone/i.test(i) && !r
                const a = t.IS_IPOD = /iPod/i.test(i)
                const l = t.IS_IOS = s || r || a
                const c = t.IOS_VERSION = function() {
                    const e = i.match(/OS (\d+)_(\d+)_?(\d+)?/i)
                    return e && [parseInt(e[1], 10), parseInt(e[2], 10), parseInt(e[3] || '0', 10)] || []
                }()
                const u = (t.IS_MAC = /Mac/i.test(i), t.IS_ANDROID = /Android/i.test(i))
                const p = t.ANDROID_VERSION = function() {
                    let e;
                    let t;
                    const o = i.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i)
                    return o ? (e = o[1] && parseFloat(o[1]), t = o[2] && parseFloat(o[2]), e && t ? parseFloat(o[1] + '.' + o[2]) : e || null) : null
                }()
                const h = (t.IS_OLD_ANDROID = u && /webkit/i.test(i) && p < 2.3, t.IS_NATIVE_ANDROID = u && p < 5 && n < 537, t.IS_FIREFOX = /Firefox/i.test(i))
                const d = t.FIREFOX_VERSION = h &&
                    function() {
                        const e = i.match(/Firefox\/(\d+)/)
                        return e && e[1] ? parseFloat(e[1]) : null
                    }()
                const f = t.IS_EDGE = /Edge/i.test(i)
                const y = t.IS_EDG = /Edg/i.test(i)
                const v = t.EDG_VERSION = y &&
                    function() {
                        const e = i.match(/Edg\/(\d+)/)
                        return e && e[1] ? parseFloat(e[1]) : null
                    }()
                const A = t.IS_CHROME = !f && /Chrome/i.test(i)
                const m = t.IS_SAFARI = !f && !A && /Safari/i.test(i)
                const g = (t.SAFARI_VERSION = function() {
                    if (!m) return null
                    const e = /version\/([\d.]+)/i
                    const t = i.match(e)
                    return t ? t[1] : void 0
                }(), t.IS_IE8 = /MSIE\s8\.0/.test(i), t.IS_IE9 = /MSIE\s9\.0/.test(i), t.IS_IE = /(msie\s|trident.*rv:)([\w.]+)/i.test(i))
                const w = (t.IE_VERSION = function() {
                    const e = /(msie\s|trident.*rv:)([\w.]+)/i
                    const t = i.match(e)
                    return t ? t[2] : null
                }(), t.TOUCH_ENABLED = !!('ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch), t.BACKGROUND_SIZE_SUPPORTED = 'backgroundSize' in document.createElement('video').style, t.HASVIDEO = !!document.createElement('video').canPlayType, t.IS_X5TBS = /TBS\/\d+/i.test(i))
                const b = (t.TBS_VERSION = function() {
                    const e = i.match(/TBS\/(\d+)/i)
                    if (e && e[1]) return e[1]
                }(), t.IS_MQQB = !w && /MQQBrowser\/\d+/i.test(i), t.IS_QQB = !w && / QQBrowser\/\d+/i.test(i), t.IS_WECHAT = /(micromessenger|webbrowser)/i.test(i), t.IS_UC = /UCBrowser\/(\d+)\./i.test(i))
                let M = (t.IS_MQQ = / QQ\/\d+/i.test(i), t.IS_MOBILE = u || l, t.IS_FILE_PROTOCOL = /file:/.test(location.protocol), t.FLASH_VERSION = null)
                const S = (t.IS_ENABLED_FLASH = function() {
                    let e
                    if (document.all || g) try {
                        if (e = new ActiveXObject('ShockwaveFlash.ShockwaveFlash')) return t.FLASH_VERSION = M = e.GetVariable('$version').split(' ')[1].replace(/,/g, '.'),
                            window.console && console.log('FLASH_VERSION', M), !0
                    } catch (e) {
                        return !1
                    } else try {
                        if (navigator.plugins && navigator.plugins.length > 0 && (e = navigator.plugins['Shockwave Flash'])) {
                            for (let i = e.description.split(' '), o = 0; o < i.length; ++o) isNaN(parseInt(i[o])) || (t.FLASH_VERSION = M = i[o], window.console && console.log('FLASH_VERSION', parseInt(i[o])))
                            return !0
                        }
                    } catch (e) {
                        return !1
                    }
                    return !1
                }(), t.IS_ENABLED_MSE = function() {
                    const e = window.MediaSource = window.MediaSource || window.WebKitMediaSource
                    const t = window.SourceBuffer = window.SourceBuffer || window.WebKitSourceBuffer
                    const i = e && typeof e.isTypeSupported === 'function' && e.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"')
                    const o = !t || t.prototype && typeof t.prototype.appendBuffer === 'function' && typeof t.prototype.remove === 'function'
                    if (!l) return i && o
                }(), t.BROWSER_TYPE = function() {
                    return i.includes('Edge') ? 'Edge' : i.includes('.NET') ? 'IE' : i.includes('QQBrowser') ? 'QQBrowser' : i.includes('Mac OS') ? 'safari' : i.includes('Chrome') ? 'chrome' : 'other'
                }(), t.isBrowserSupportWebRTC = function() {
                    const e = 56
                    const t = 80
                    return !b && !f && (!(y && v < t) && (!(h && d < e) && !(!w && m && l && (c.length === 0 || c[0] < 11 || c[0] === 11 && c[1] < 1 || c[0] === 11 && c[1] === 1 && c[2] < 2))))
                })
                t.IS_ENABLED_WEBRTC = function() {
                    const e = function() {
                        if (!S()) return !1
                        let e = !1
                        return ['RTCPeerConnection', 'webkitRTCPeerConnection', 'RTCIceGatherer'].forEach(function(t) {
                                e || t in window && (e = !0)
                            }),
                            e
                    }
                    const t = new Promise(function(t, i) {
                        try {
                            const o = {
                                iceServers: [],
                                sdpSemantics: 'unified-plan'
                            }
                            const n = new RTCPeerConnection(o)
                            let r = {}
                            n.addTransceiver ? (n.addTransceiver('audio', {
                                    direction: 'recvonly'
                                }), n.addTransceiver('video', {
                                    direction: 'recvonly'
                                })) : r = {
                                    offerToReceiveVideo: !0,
                                    offerToReceiveAudio: !0
                                },
                                n.createOffer(r).then(function(i) {
                                    const o = i.sdp.toLowerCase().includes('h264')
                                    n.close(),
                                        t(e() && o)
                                })
                        } catch (e) {
                            i()
                        }
                    })
                    return t
                }()
            },
            function(e, t) {
                'use strict'

                function i(e, t, i) {
                    return e ? (e.addEventListener ? e.addEventListener(t, i, !1) : e.attachEvent && e.attachEvent('on' + t, i), i) : console.warn('element not exists')
                }

                function o(e, t, i) {
                    return e ? void(e.removeEventListener ? e.removeEventListener(t, i, !1) : e.detachEvent && e.detachEvent('on' + t, i)) : console.warn('element not exists')
                }

                function n() {
                    const e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 'div'
                    const t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                    const i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}
                    const o = document.createElement(e)
                    for (const n in t)
                        if (t.hasOwnProperty(n)) {
                            const r = t[n]
                            r === null ? o.removeAttribute(r) : o.setAttribute(n, r)
                        }
                    for (const s in i) i.hasOwnProperty(s) && (o[s] = i[s])
                    return o
                }

                function r(e) {
                    return document.getElementById(e)
                }

                function s(e, t) {
                    e.classList ? e.classList.add(t) : c(e, t) || (e.className = e.className + ' ' + t)
                }

                function a(e, t) {
                    e.classList ? e.classList.remove(t) : e.className = e.className.replace(u(t), ' ')
                }

                function l(e, t, i) {
                    i ? s(e, t) : a(e, t)
                }

                function c(e, t) {
                    return e.classList ? e.classList.contains(t) : u(t).test(e.className)
                }

                function u(e) {
                    return new RegExp('(^|\\s)' + e + '($|\\s)')
                }

                function p(e) {
                    let t = void 0
                    if (e.getBoundingClientRect && e.parentNode && (t = e.getBoundingClientRect()), !t) return {
                        left: 0,
                        top: 0
                    }
                    const i = document.documentElement
                    const o = document.body
                    const n = i.clientLeft || o.clientLeft || 0
                    const r = window.pageXOffset || o.scrollLeft
                    const s = t.left + r - n
                    const a = i.clientTop || o.clientTop || 0
                    const l = window.pageYOffset || o.scrollTop
                    const c = t.top + l - a
                    return {
                        left: Math.round(s),
                        top: Math.round(c)
                    }
                }

                function h(e, t, i) {
                    const o = {}
                    const n = i || p(e)
                    const r = e.offsetWidth
                    const s = e.offsetHeight
                    const a = n.top
                    const l = n.left
                    let c = t.pageY || t.clientY
                    let u = t.pageX || t.clientX
                    return t.changedTouches && (u = t.changedTouches[0].pageX, c = t.changedTouches[0].pageY),
                        o.y = Math.max(0, Math.min(1, (a - c + s) / s)),
                        o.x = Math.max(0, Math.min(1, (u - l) / r)),
                        o
                }

                function d(e, t, i) {
                    const o = arguments.length > 3 && void 0 !== arguments[3] && arguments[3]
                    const n = document.createElement('script')
                    if (n.onload = n.onreadystatechange = function() {
                            this.readyState && this.readyState !== 'loaded' && this.readyState !== 'complete' || (typeof t === 'function' && t(), n.onload = n.onreadystatechange = null, n.parentNode && !o && n.parentNode.removeChild(n))
                        },
                        i)
                        for (const r in i)
                            if (i.hasOwnProperty(r)) {
                                const s = i[r]
                                s === null ? n.removeAttribute(s) : n.setAttribute(r, s)
                            }
                    n.src = e,
                        document.getElementsByTagName('head')[0].appendChild(n)
                }

                function f() {
                    const e = document
                    const t = e.documentElement
                    const i = e.body
                    return {
                        width: t && t.clientWidth || i && i.offsetWidth || window.innerWidth || 0,
                        height: t && t.clientHeight || i && i.offsetHeight || window.innerHeight || 0
                    }
                }
                t.__esModule = !0,
                    t.on = i,
                    t.off = o,
                    t.createEl = n,
                    t.get = r,
                    t.addClass = s,
                    t.removeClass = a,
                    t.toggleClass = l,
                    t.hasClass = c,
                    t.findElPosition = p,
                    t.getPointerPosition = h,
                    t.loadScript = d,
                    t.getViewportSize = f
            },
            function(e, t, i) {
                'use strict'

                function o(e) {
                    if (e && e.__esModule) return e
                    const t = {}
                    if (e != null)
                        for (const i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
                    return t.default = e,
                        t
                }

                function n() {
                    return E++
                }

                function r(e, t, i) {
                    t.guid || (t.guid = n())
                    const o = function() {
                        t.apply(e, arguments)
                    }
                    return o.guid = i ? i + '_' + t.guid : t.guid,
                        o
                }

                function s(e) {
                    if (e instanceof Array) return e.length === 0
                    for (const t in e)
                        if (e.hasOwnProperty(t)) return !1
                    return !0
                }

                function a(e) {
                    e |= 0
                    const t = 3600
                    const i = 60
                    let o = e / t | 0
                    let n = (e - o * t) / i | 0
                    let r = e - o * t - n * i
                    return o = o > 0 ? o + ':' : '',
                        n = n > 0 ? n + ':' : '00:',
                        r = r > 0 ? r + '' : o.length > 0 || n.length > 0 ? '00' : '00:00',
                        o = o.length == 2 ? '0' + o : o,
                        n = n.length == 2 ? '0' + n : n,
                        r = r.length == 1 ? '0' + r : r,
                        o + n + r
                }

                function l(e) {
                    h.__isFullscreen = !!document[_.fullscreenElement],
                        h.__isFullscreen || (I.IS_X5TBS && w.off(h.player.video.el, 'x5videoexitfullscreen', c), w.off(document, _.fullscreenchange, l)),
                        M.pub({
                                type: b.MSG.FullScreen,
                                src: 'util',
                                ts: e.timeStamp,
                                detail: {
                                    isFullscreen: h.__isFullscreen
                                }
                            },
                            h.player)
                }

                function c(e) {
                    e.type === 'x5videoexitfullscreen' && (h.__isFullscreen = !1, w.off(document, _.fullscreenchange, l), w.off(h.player.video.el, 'x5videoexitfullscreen', c), M.pub({
                            type: b.MSG.FullScreen,
                            src: 'util',
                            ts: e.timeStamp,
                            detail: {
                                isFullscreen: !1
                            }
                        },
                        h.player))
                }

                function u(e) {
                    e.type == 'webkitbeginfullscreen' ? (w.off(h.player.video.el, 'webkitbeginfullscreen', u), w.on(h.player.video.el, 'webkitendfullscreen', u), M.pub({
                            type: b.MSG.FullScreen,
                            src: 'util',
                            ts: e.timeStamp,
                            detail: {
                                isFullscreen: !0
                            }
                        },
                        h.player)) : e.type == 'webkitendfullscreen' && (w.off(h.player.video.el, 'webkitendfullscreen', u), M.pub({
                            type: b.MSG.FullScreen,
                            src: 'util',
                            ts: e.timeStamp,
                            detail: {
                                isFullscreen: !1
                            }
                        },
                        h.player))
                }

                function p(e) {
                    e.keyCode === 27 && h(h.player, !1)
                }

                function h(e, t, i) {
                    if (typeof t === 'undefined') return h.__isFullscreen || !1
                    const o = e.options.systemFullscreen
                    h.player = e,
                        _.requestFullscreen ? t ? (I.IS_X5TBS && w.on(e.video.el, 'x5videoexitfullscreen', c), w.on(document, _.fullscreenchange, l), i && i[_.requestFullscreen]()) : document[_.exitFullscreen]() : o && e.video.el.webkitEnterFullScreen ? (w.on(e.video.el, 'webkitbeginfullscreen', u), t ? e.video.el.webkitEnterFullScreen() : e.video.el.webkitExitFullscreen()) : (h.__isFullscreen = t, h.__isFullscreen ? (h.__origOverflow = document.documentElement.style.overflow, document.documentElement.style.overflow = 'hidden', w.on(document, 'keydown', p)) : (document.documentElement.style.overflow = h.__origOverflow, w.off(document, 'keydown', p)), w.toggleClass(document.body, 'vcp-full-window', t), M.pub({
                                type: b.MSG.FullScreen,
                                src: 'util',
                                detail: {
                                    isFullscreen: h.__isFullscreen
                                }
                            },
                            h.player))
                }

                function d(e) {
                    for (var t = arguments.length,
                            i = Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) i[o - 1] = arguments[o]
                    for (let n = 0; n < i.length; n++) {
                        const r = i[n]
                        for (const s in r) r.hasOwnProperty(s) && (e[s] = e[s] || r[s])
                    }
                    return e
                }

                function f(e, t) {
                    return typeof t === 'undefined' ? JSON.parse(localStorage[e] || 'null') : void(localStorage[e] = JSON.stringify(t))
                }

                function y(e, t) {
                    if (e = e || '0.0.0', t = t || '0.0.0', e == t) return 0
                    for (let i = e.split('.'), o = t.split('.'), n = Math.max(i.length, o.length), r = 0; r < n; r++) {
                        const s = ~~o[r]
                        const a = ~~i[r]
                        if (s < a) return 1
                        if (s > a) return -1
                    }
                    return -1
                }

                function v(e) {
                    return e.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\"/g, '&quot;').replace(/\'/g, '&#39;').replace(/\//g, '&#x2F;')
                }

                function A(e) {
                    let t = 'unknown'
                    return e.isFormat('rtmp') ? t = 'rtmp' : e.isFormat('flv') ? t = 'flv' : e.isFormat('m3u8') ? t = 'm3u8' : e.isFormat('mp4') && (t = 'mp4'),
                        t
                }

                function m(e, t) {
                    e = e.replace(/^(http|https):/, '')
                    let i = window.location.protocol
                    return i != 'http:' && i != 'https:' && (i = t || 'https:'),
                        e = i + e
                }
                t.__esModule = !0,
                    t.supportStyle = t.console = t.VideoType = t.CDNPath = t.FullscreenApi = void 0,
                    t.guid = n,
                    t.bind = r,
                    t.isEmpty = s,
                    t.convertTime = a,
                    t.doFullscreen = h,
                    t.extend = d,
                    t.store = f,
                    t.compareVersion = y,
                    t.escapeHTML = v,
                    t.getFormat = A,
                    t.unifyProtocol = m
                for (var g = i(2), w = o(g), b = i(4), M = o(b), S = i(1), I = o(S), E = 1, _ = t.FullscreenApi = {
                            requestFullscreen: null,
                            exitFullscreen: null,
                            fullscreenElement: null,
                            fullscreenEnabled: null,
                            fullscreenchange: null,
                            fullscreenerror: null
                        },
                        T = [
                            ['requestFullscreen', 'exitFullscreen', 'fullscreenElement', 'fullscreenEnabled', 'fullscreenchange', 'fullscreenerror'],
                            ['webkitRequestFullscreen', 'webkitExitFullscreen', 'webkitFullscreenElement', 'webkitFullscreenEnabled', 'webkitfullscreenchange', 'webkitfullscreenerror'],
                            ['webkitRequestFullScreen', 'webkitCancelFullScreen', 'webkitCurrentFullScreenElement', 'webkitCancelFullScreen', 'webkitfullscreenchange', 'webkitfullscreenerror'],
                            ['mozRequestFullScreen', 'mozCancelFullScreen', 'mozFullScreenElement', 'mozFullScreenEnabled', 'mozfullscreenchange', 'mozfullscreenerror'],
                            ['msRequestFullscreen', 'msExitFullscreen', 'msFullscreenElement', 'msFullscreenEnabled', 'MSFullscreenChange', 'MSFullscreenError']
                        ], D = T[0], L = void 0, C = 0; C < T.length; C++)
                    if (T[C][1] in document) {
                        L = T[C]
                        break
                    }
                if (L)
                    for (let O = 0; O < L.length; O++) _[D[O]] = L[O]
                t.CDNPath = 'https://cloudcache.tencent-cloud.com/open/qcloud/video/vcplayer/',
                    t.VideoType = {
                        RTMP: 'rtmp',
                        FLV: 'flv',
                        M3U8: 'm3u8'
                    },
                    t.console = {
                        log: function() {
                            window.console && window.console.log.apply(window.console, arguments)
                        },
                        warn: function() {
                            window.console && window.console.warn.apply(window.console, arguments)
                        },
                        error: function() {
                            window.console && window.console.error.apply(window.console, arguments)
                        }
                    },
                    t.supportStyle = function() {
                        const e = document.createElement('div')
                        const t = 'Khtml O Moz Webkit'.split(' ')
                        let i = t.length
                        return function(o) {
                            if (o in e.style) return !0
                            if ('-ms-' + o in e.style) return !0
                            for (o = o.replace(/^[a-z]/,
                                    function(e) {
                                        return e.toUpperCase()
                                    }); i--;)
                                if (t[i] + o in e.style) return !0
                            return !1
                        }
                    }()
            },
            function(e, t, i) {
                'use strict'

                function o(e) {
                    if (e && e.__esModule) return e
                    const t = {}
                    if (e != null)
                        for (const i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
                    return t.default = e,
                        t
                }

                function n(e) {
                    const t = e.guid
                    return t ? (h[t] = h[t] || {},
                        h[t]) : (console.error(e, ' has no guid.'), {})
                }

                function r(e) {
                    const t = e.guid
                    return t ? (d[t] = d[t] || {},
                        d[t]) : (console.error(e, ' has no guid.'), {})
                }

                function s(e, t) {
                    a(e.type, e, t),
                        a('*', e, t)
                }

                function a(e, t, i) {
                    try {
                        const o = n(i)
                        const s = r(i)
                        if (!o[e]) return
                        const a = o[e]
                        for (const l in a)
                            if (a.hasOwnProperty(l)) {
                                const c = a[l]
                                const u = s[l]
                                if (typeof u !== 'function') return !1
                                for (let p = 0; p < c.length; p++) {
                                    const h = c[p]
                                    h !== '*' && h !== t.src || u(t)
                                }
                            }
                    } catch (e) {
                        window.console && console.error && console.error(e.stack || e)
                    }
                }

                function l(e, t, i, o) {
                    const s = n(o)
                    const a = r(o)
                    return i.guid ? (a[i.guid] = i, s[e] = s[e] || {},
                        s[e][i.guid] = s[e][i.guid] || [], s[e][i.guid].push(t), i) : console.error('callback function need guid')
                }

                function c(e, t, i, o) {
                    const s = n(o)
                    const a = r(o)
                    if ((e == '*' || s[e]) && (e == '*' || s[e][i.guid]))
                        for (const l in s)
                            if ((e === '*' || l == e) && s.hasOwnProperty(l))
                                if (i !== '*') {
                                    let c = s[l][i.guid]
                                    t === '*' && (c = [])
                                    for (let u = 0; u < c.length;) c[u] === t ? c.splice(u, 1) : u++
                                        c.length == 0 && delete s[l][i.guid],
                                        p.isEmpty(s[l]) && delete s[l]
                                } else {
                                    for (const h in s[l]) delete a[h]
                                    delete s[l]
                                }
                }
                t.__esModule = !0,
                    t.MSG = void 0,
                    t.pub = s,
                    t.sub = l,
                    t.unsub = c
                const u = i(3)
                var p = o(u)
                var h = (t.MSG = {
                    Error: 'error',
                    TimeUpdate: 'timeupdate',
                    Load: 'load',
                    MetaLoaded: 'loadedmetadata',
                    Loaded: 'loadeddata',
                    Progress: 'progress',
                    FullScreen: 'fullscreen',
                    Play: 'play',
                    Playing: 'playing',
                    Pause: 'pause',
                    Ended: 'ended',
                    Seeking: 'seeking',
                    Seeked: 'seeked',
                    Resize: 'resize',
                    VolumeChange: 'volumechange',
                    WebRTCStatUpdate: 'webrtcstatupdate'
                }, {})
                var d = {}
            },
            function(e, t, i) {
                'use strict'

                function o(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }

                function n(e) {
                    if (e && e.__esModule) return e
                    const t = {}
                    if (e != null)
                        for (const i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
                    return t.default = e,
                        t
                }

                function r(e, t) {
                    if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function')
                }
                t.__esModule = !0,
                    t.Player = t.dom = t.util = t.browser = t.MSG = void 0,
                    i(6)
                const s = i(1)
                const a = n(s)
                const l = i(2)
                const c = n(l)
                const u = i(3)
                const p = n(u)
                const h = i(4)
                const d = n(h)
                const f = i(23)
                const y = o(f)
                const v = i(26)
                const A = o(v)
                const m = i(27)
                const g = o(m)
                const w = i(35)
                const b = o(w)
                const M = i(36)
                const S = o(M)
                const I = i(37)
                const E = o(I)
                const _ = i(38)
                const T = o(_)
                const D = i(39)
                const L = o(D)
                window.console || (window.console = {
                    log: function() {},
                    error: function() {},
                    debug: function() {},
                    info: function() {}
                })
                const C = t.MSG = d.MSG
                const O = t.browser = a
                const x = t.util = p
                const P = t.dom = c
                t.Player = function() {
                    function e(t) {
                        r(this, e),
                            this.options = t,
                            this.ready = !1,
                            this.hasPlay = !1
                        let i = t.owner
                        return i ? (this.guid = x.guid(), this.listener = this.options.listener, d.sub('*', '*', x.bind(this, this.handleMsg), this), i = P.get(i), this.mtaReport = new L.default(this, this.options), void this.render(i)) : console.error('Player need a container')
                    }
                    return e.prototype.render = function(e) {
                            let t = 'vcp-player'
                            if (O.TOUCH_ENABLED && (t += ' touchable'), this.el = P.createEl('div', {
                                    class: t
                                }), e.appendChild(this.el), this.errortips = new T.default(this), this.errortips.render(this.el), this.loading = new E.default(this), this.loading.render(this.el), this.options.width = this.options.width || e.offsetWidth, this.options.height = this.options.height || e.offsetHeight, this.size(this.options.width, this.options.height), !this.verifyOptions()) return this.listener({
                                    type: 'error',
                                    code: 5
                                }),
                                x.console.error('create failed')
                            if (!this.options.flash && O.HASVIDEO) {
                                const i = new y.default(this)
                                i.render(this.el),
                                    this.video = i
                            } else {
                                const o = new A.default(this)
                                o.render(this.el),
                                    this.video = o
                            }
                            if (!this.video) return x.console.error('create video failed')
                            this.poster = new S.default(this),
                                this.poster.render(this.el),
                                (O.IS_SAFARI && parseInt(O.SAFARI_VERSION) > 10 || O.IOS_VERSION > 10) && this.options.controls == 'system' || (this.bigplay = new b.default(this), this.bigplay.render(this.el))
                            let n = void 0
                            n = !(this.options.controls && this.options.controls != 'default' && (!this.options.flash || this.options.controls != 'system')),
                                n && (this.panel = new g.default(this), this.panel.render(this.el)),
                                this.setup()
                        },
                        e.prototype.verifyOptions = function() {
                            return O.IE_VERSION && x.compareVersion(O.IE_VERSION, '8.0') == -1 ? (this.errortips.show({
                                code: 5
                            }), !1) : !!this.options.src || (this.options.videoSource.hasUrl() ? O.IS_IE || !O.IS_ENABLED_FLASH ? this.errortips.show({
                                code: 5
                            }) : this.errortips.show({
                                code: 5
                            }) : this.errortips.show({
                                code: 12
                            }), !1)
                        },
                        e.prototype.size = function(e, t, i) {
                            i = i || 'cover'
                            const o = /^\d+\.?\d{0,2}%$/
                            let n = void 0
                            let r = void 0
                            if (o.test(e) || o.test(t)) n = e,
                                r = t
                            else {
                                const s = this.video ? this.video.videoWidth() : this.options.width
                                const a = this.video ? this.video.videoHeight() : this.options.height
                                if (n = e, r = t, s && a) {
                                    const l = s / a
                                    i == 'fit' && (n = e, r = n / l, r > t && (n *= t / r, r = t))
                                }
                                const c = P.getViewportSize()
                                c.width > 0 && n > c.width && (n = c.width)
                            }
                            n += o.test(n) ? '' : 'px',
                                r += o.test(r) ? '' : 'px',
                                this.el.style.width = n,
                                this.el.style.height = r,
                                this.video && (this.video.width(n), this.video.height(r)),
                                this.width = n,
                                this.height = r
                        },
                        e.prototype.setup = function() {
                            if (this.__handleEvent = x.bind(this, this.handleEvent), O.IS_MOBILE) {
                                if (this.options.autoplay) {
                                    const e = this
                                    document.addEventListener('WeixinJSBridgeReady',
                                        function() {
                                            e.play()
                                        })
                                }
                            } else this.loading.show()
                        },
                        e.prototype.destroy = function() {
                            this.video && this.video.destroy(),
                                this.panel && this.panel.destroy(),
                                this.bigplay && this.bigplay.destroy(),
                                this.loading && this.loading.destroy(),
                                d.unsub('*', '*', this.handleMsg, this),
                                this.video = this.panel = this.bigplay = this.loading = null,
                                this.el.parentNode ? .removeChild(this.el)
                        },
                        e.prototype.setListener = function(e) {
                            this.listener = e
                        },
                        e.prototype.handleEvent = function(e) {
                            switch (e.type) {
                                case 'mousemove':
                                    if (this.__lastmove && new Date - this.__lastmove < 100) break
                                    var t = this
                                    if (this.__movecnt = this.__movecnt || 0, this.__movecnt++, this.__movecnt < 5) {
                                        setTimeout(function() {
                                                t.__movecnt = 0
                                            },
                                            500)
                                        break
                                    }
                                    this.__movecnt = 0,
                                        this.__lastmove = +new Date,
                                        clearTimeout(this.__moveid),
                                        t.panel && t.panel.show(),
                                        this.__moveid = setTimeout(function() {
                                                t.playing() && t.panel && t.panel.hide()
                                            },
                                            3e3)
                            }
                        },
                        e.prototype.handleMsg = function(e) {
                            switch (e.type) {
                                case C.Load:
                                    P.removeClass(this.el, 'vcp-playing'),
                                        (this.options.preload === 'none' || this.options.hlsConfig && this.options.hlsConfig.autoStartLoad === !1) && this.loading.hide()
                                    break
                                case C.Play:
                                    if (!this.playing()) break;
                                    !this.hasPlay && this.options.flash && (this.mtaReport.reportFlash(), this.hasPlay = !0),
                                        P.addClass(this.el, 'vcp-playing'),
                                        this.video.type() == x.VideoType.RTMP && (this.__wait = !0, this.loading.show()),
                                        P.on(this.el, 'mousemove', this.__handleEvent)
                                    break
                                case C.Playing:
                                    this.loading.hide()
                                    break
                                case C.TimeUpdate:
                                    this.__wait && (this.__wait = !1, this.loading.hide())
                                    break
                                case C.Pause:
                                    P.off(this.el, 'mousemove', this.__handleEvent),
                                        P.removeClass(this.el, 'vcp-playing')
                                    break
                                case C.Ended:
                                    P.off(this.el, 'mousemove', this.__handleEvent),
                                        this.panel && this.panel.show(),
                                        P.removeClass(this.el, 'vcp-playing')
                                    break
                                case C.MetaLoaded:
                                    this.loading.hide(),
                                        this.mtaReport.report(),
                                        this.size(this.options.width, this.options.height)
                                    break
                                case C.Seeking:
                                    this.loading.show()
                                    break
                                case C.Seeked:
                                    this.loading.hide()
                                    break
                                case C.FullScreen:
                                    var t = this
                                    setTimeout(function() {
                                            P.toggleClass(t.el, 'vcp-fullscreen', e.detail.isFullscreen)
                                        },
                                        0)
                                    break
                                case C.Error:
                                    this.loading.hide(),
                                        this.errortips.show(e.detail),
                                        this.panel && this.panel.show()
                                    try {
                                        const i = this.options.videoSource
                                        const o = x.getFormat(i)
                                        O.IS_X5TBS ? MtaH5.clickStat('x5_err', {
                                            format: o
                                        }) : MtaH5.clickStat('error', {
                                            format: o
                                        })
                                    } catch (e) {}
                            }!e.private && this.listener && this.listener(e)
                        },
                        e.prototype.currentTime = function(e) {
                            return this.video.currentTime(e)
                        },
                        e.prototype.duration = function() {
                            return this.video.duration()
                        },
                        e.prototype.percent = function(e) {
                            return this.video.duration() ? typeof e === 'undefined' ? this.video.currentTime() / this.video.duration() : void this.video.currentTime(this.video.duration() * e) : 0
                        },
                        e.prototype.buffered = function() {
                            return this.video.duration() ? this.video.buffered() / this.video.duration() : 0
                        },
                        e.prototype.pause = function() {
                            this.video ? .pause()
                        },
                        e.prototype.play = function() {
                            let e
                            this.errortips.clear(),
                                (e = this.video).play.apply(e, arguments)
                        },
                        e.prototype.togglePlay = function() {
                            this.errortips.clear(),
                                this.video ? .togglePlay()
                        },
                        e.prototype.stop = function() {
                            this.video ? .stop()
                        },
                        e.prototype.mute = function(e) {
                            return this.video ? .mute(e)
                        },
                        e.prototype.volume = function(e) {
                            return this.video ? .volume(e)
                        },
                        e.prototype.fullscreen = function(e) {
                            return this.video ? .fullscreen(e)
                        },
                        e.prototype.load = function(e, t) {
                            this.errortips.clear(),
                                this.loading.show(),
                                this.video ? .load(e || this.options.src, t)
                        },
                        e.prototype.playing = function() {
                            return this.video && this.video.playing()
                        },
                        e.prototype.paused = function() {
                            return this.video && this.video.paused()
                        },
                        e
                }()
            },
            function(e, t, i) {
                let o = i(7)
                typeof o === 'string' && (o = [
                    [e.id, o, '']
                ])
                i(22)(o, {})
                o.locals && (e.exports = o.locals)
            },
            function(e, t, i) {
                t = e.exports = i(8)(),
                    t.push([e.id, '.vcp-player{position:relative;z-index:0;font-family:Tahoma,\\\\5FAE\\8F6F\\96C5\\9ED1,\\u5b8b\\u4f53,Verdana,Arial,sans-serif;background-color:#000}.vcp-player video{display:block;overflow:hidden}.vcp-fullscreen.vcp-player,.vcp-fullscreen video,body.vcp-full-window{width:100%!important;height:100%!important}body.vcp-full-window{overflow-y:auto}.vcp-full-window .vcp-player{position:fixed;left:0;top:0;z-index:2147483647}.vcp-pre-flash,.vcp-video{width:100%;height:100%}.vcp-pre-flash{z-index:999;background:#000;position:absolute;top:0;left:0}.vcp-controls-panel{position:absolute;bottom:0;width:100%;font-size:16px;height:3em;z-index:1000}.vcp-controls-panel.show{animation:fadeIn ease .8s;animation-fill-mode:forwards;-webkit-animation-fill-mode:forwards}.vcp-controls-panel.hide{animation:fadeOut ease .8s;animation-fill-mode:forwards;-webkit-animation-fill-mode:forwards}.vcp-panel-bg{width:100%;height:100%;position:absolute;left:0;top:0;background-color:#242424;opacity:.8;filter:alpha(opacity=80);z-index:1000}.vcp-playtoggle{cursor:pointer;position:relative;z-index:1001;width:3em;height:100%;float:left;background-image:url(' + i(9) + ');background-image:url(' + i(10) + ')\\0}.vcp-playtoggle:focus,.vcp-playtoggle:hover{background-color:#708090;opacity:.9;filter:alpha(opacity=90)}.touchable .vcp-playtoggle:hover{background-color:transparent;opacity:1}.vcp-playing .vcp-playtoggle{background-image:url(' + i(11) + ');background-image:url(' + i(12) + ')\\0}.vcp-bigplay{width:100%;height:80%;position:absolute;background-color:white\\0;filter:alpha(opacity=0);opacity:0;z-index:1000;top:0;left:0}.vcp-slider{position:relative;z-index:1001;float:left;background:#c4c4c4;height:10px;opacity:.8;filter:alpha(opacity=80);cursor:pointer}.vcp-slider .vcp-slider-track{width:0;height:100%;margin-top:0;opacity:1;filter:alpha(opacity=100);background-color:#1e90ff}.vcp-slider .vcp-slider-thumb{cursor:pointer;background-color:#fff;position:absolute;top:0;left:0;border-radius:1em!important;height:10px;margin-left:-5px;width:10px}.vcp-slider-vertical{position:relative;width:.5em;height:8em;top:-5.6em;z-index:1001;background-color:#1c1c1c;opacity:.9;filter:alpha(opacity=90);cursor:pointer}.vcp-slider-vertical .vcp-slider-track{background-color:#1275cf;width:.5em;height:100%;opacity:.8;filter:alpha(opacity=80)}.vcp-slider-vertical .vcp-slider-thumb{cursor:pointer;position:absolute;background-color:#f0f8ff;width:.8em;height:.8em;border-radius:.8em!important;margin-top:-.4em;top:0;left:-.15em}.vcp-timeline{top:-10px;left:0;height:10px;position:absolute;z-index:1001;width:100%}.vcp-timeline .vcp-slider-thumb{top:-4px}.vcp-timeline .vcp-slider{margin-top:8px;height:2px;width:100%}.vcp-timeline:hover .vcp-slider{margin-top:0;height:10px}.vcp-timeline:hover .vcp-slider-thumb{display:block;width:16px;height:16px;top:-3px;margin-left:-8px}.vcp-timelabel{display:inline-block;line-height:3em;float:left;color:#fff;padding:0 9px}.vcp-timelabel,.vcp-volume{height:3em;z-index:1001;position:relative}.vcp-volume{width:3em;cursor:pointer;float:right;background-color:transparent;opacity:.9;filter:alpha(opacity=90)}.vcp-volume-icon{background-image:url(' + i(13) + ');background-image:url(' + i(14) + ')\\0;display:inline-block;width:3em;height:3em;position:absolute;left:0;top:0}.vcp-volume-muted .vcp-volume-icon{background-image:url(' + i(15) + ');background-image:url(' + i(16) + ')\\0}.vcp-volume .vcp-slider-vertical{top:-8.4em;left:1em;display:none}.vcp-volume .vcp-slider-track{position:absolute;bottom:0}.vcp-volume:hover .vcp-slider-vertical{display:block}.vcp-volume .vcp-volume-bg{height:8.8em;width:2em;position:absolute;left:.25em;top:-8.8em;background:#242424;display:none}.vcp-volume:hover .vcp-slider-vertical,.vcp-volume:hover .vcp-volume-bg{display:block}.vcp-fullscreen-toggle{position:relative;width:3em;height:3em;float:right;cursor:pointer;z-index:1001;background-image:url(' + i(17) + ');background-image:url(' + i(18) + ')\\0}.vcp-fullscreen .vcp-fullscreen-toggle{background-image:url(' + i(19) + ');background-image:url(' + i(20) + ')\\0}.vcp-loading{box-sizing:border-box;background-clip:padding-box;width:50px;height:50px;display:none;position:absolute;top:50%;left:50%;margin:-25px 0 0 -25px;text-indent:-9999em}.vcp-loading:before{box-sizing:inherit;content:"";display:block;width:100%;height:100%;border-radius:50%;border:3px solid hsla(0,0%,100%,0);border-left-color:#fff;border-right-color:#fff;transform:translateZ(0);animation:load8 1.1s infinite linear}@keyframes load8{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}.vcp-poster{position:absolute;left:0;top:0;overflow:hidden;z-index:1000;width:100%;height:100%;display:none}.vcp-poster-pic{position:relative}.vcp-poster-pic.cover,.vcp-poster-pic.default{left:50%;top:50%;transform:translate(-50%,-50%)}.vcp-poster-pic.cover{width:100%}.vcp-poster-pic.stretch{width:100%;height:100%}.vcp-error-tips{position:absolute;z-index:1001;width:100%;height:4.5em;left:0;top:50%;color:#ff4500;margin-top:-5.25em;text-align:center;display:none}.vcp-clarityswitcher{height:3em;width:3em;cursor:pointer;position:relative;z-index:1001;float:right;background-color:transparent;opacity:.9}.vcp-vertical-switcher-container{width:3em;position:absolute;left:0;bottom:2.4em;background:#242424;display:none}.vcp-vertical-switcher-current{display:block;color:#fff;text-align:center;line-height:3em}.vcp-vertical-switcher-item{display:block;color:#fff;text-align:center;line-height:2em}.vcp-vertical-switcher-item.current{color:#888}.vcp-share>a{width:3em;height:3em;cursor:pointer;background-image:url(' + i(21) + ');opacity:.9;display:block}.vcp-share{width:3em;height:3em;position:relative;float:right;z-index:1001}.vcp-vertical-share-container{width:auto;height:auto;position:absolute;background:rgba(36,36,36,.8);padding:.5em;overflow:hidden;display:none}@keyframes fadeOut{0%{opacity:1}to{opacity:0}}.fadeOut{animation:fadeOut ease .8s;animation-fill-mode:forwards;-webkit-animation-fill-mode:forwards}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}.fadeIn{animation:fadeIn ease .8s;animation-fill-mode:forwards;-webkit-animation-fill-mode:forwards}', ''])
            },
            function(e, t) {
                e.exports = function() {
                    const e = []
                    return e.toString = function() {
                            for (var e = [], t = 0; t < this.length; t++) {
                                const i = this[t]
                                i[2] ? e.push('@media ' + i[2] + '{' + i[1] + '}') : e.push(i[1])
                            }
                            return e.join('')
                        },
                        e.i = function(t, i) {
                            typeof t === 'string' && (t = [
                                [null, t, '']
                            ])
                            for (var o = {},
                                    n = 0; n < this.length; n++) {
                                const r = this[n][0]
                                typeof r === 'number' && (o[r] = !0)
                            }
                            for (n = 0; n < t.length; n++) {
                                const s = t[n]
                                typeof s[0] === 'number' && o[s[0]] || (i && !s[2] ? s[2] = i : i && (s[2] = '(' + s[2] + ') and (' + i + ')'), e.push(s))
                            }
                        },
                        e
                }
            },
            function(e, t) {
                e.exports = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMzYgMzYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+DQogICAgPHBhdGggZD0iTTExLDEwIEwxOCwxMy43NCAxOCwyMi4yOCAxMSwyNiBNMTgsMTMuNzQgTDI2LDE4IDI2LDE4IDE4LDIyLjI4IiBmaWxsPSIjZmZmIj48L3BhdGg+DQo8L3N2Zz4='
            },
            function(e, t) {
                e.exports = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAAAFoAAABaAHAjuH0AAAAHdElNRQfgBRQSOydLEdPXAAABmUlEQVRYw+2Wu0oDQRhGz2oIEhAtBEHRQpIIXtAH0M7Kd7DQQl/BV/BlFEEsBO9IUAmI8X5Bi6RQoqgYJYr5LMISE5LdmZhyT7mzO9/8Z3b/WQgICAjwxak9JLPbfGiqfwGNCBhkmj4cECqryJyQ52iMWeIccsI9eVfav4tyEZrSjwpKaUHj6lKLHFnXEvIZd3CI080k6yyRJGdryi8AIEyYdtoYZJ9NEnzYyDIJKM7VQw8DROnnmGseihJNY6oiNKWCyvnRq5Y1o6jaFXJ3xMuaaQUuTbQywSgXLLLGXeMU/ZUVoZcOOhljj23OXVnVVdkHFIkwwgBDxEhwRpq3OuaougeV5HWsefXX3ge/XmQiOezloV5FAN+cssEB52QaH/DBNanSJjcyQHySrXxNa39stgEF3tlimR2yvJs8YBfwRIJ1klzyWLro3SpMA0SaG5LssMuL2dTmAV/kyJS3a/MG5xcg4IpVVrjlmbz9uekdkOOILRKkikemuRgjhIY1p7ia7Q/KEn7/RY6t80r8elF9yw4ICAiw4xcxfsNvJiWE7gAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNi0wNS0yMFQxODo1OToxOCswODowMJKBy7cAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTYtMDUtMjBUMTg6NTk6MzkrMDg6MDAHjn/CAAAAPHRFWHRzdmc6YmFzZS11cmkAZmlsZTovLy9EOi9zcGFjZS92Y19wbGF5ZXIvc3JjL2ltZy9wbGF5X2J0bi5zdmedrkudAAAAAElFTkSuQmCC'
            },
            function(e, t) {
                e.exports = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMzYgMzYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+DQogICAgPHBhdGggZD0iTTExLDEwIEwxNywxMCAxNywyNiAxMSwyNiBNMjAsMTAgTDI2LDEwIDI2LDI2IDIwLDI2IiBmaWxsPSIjZmZmIj48L3BhdGg+DQo8L3N2Zz4='
            },
            function(e, t) {
                e.exports = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAAAFoAAABaAHAjuH0AAAAHdElNRQfgBRQTADNsu4KlAAAAfklEQVRYw+2WsQ2AMAwEPyiZimloWIqOhjHYg1VAMi1Ejo2l0P2VH/kvnQ0QQohLaj9Jl6ocnBInDwpGzI+qgh0LxMhjCGSSN5skaeY6g+m4qn+dTh4WdIACCiiggAIKfEGulntxcrXC4sBaLXc7V/DuosDZolf9fngRQsgHbrk8P6SPYKxbAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE2LTA1LTIwVDE5OjAwOjI0KzA4OjAwi3r4LQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNi0wNS0yMFQxOTowMDo1MSswODowMKLaZi8AAAA8dEVYdHN2ZzpiYXNlLXVyaQBmaWxlOi8vL0Q6L3NwYWNlL3ZjX3BsYXllci9zcmMvaW1nL3N0b3BfYnRuLnN2Z0xvOgsAAAAASUVORK5CYII='
            },
            function(e, t) {
                e.exports = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMzYgMzYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+DQogICAgPHBhdGggZD0iTTEyLjM5LDE1LjU0IEwxMCwxNS41NCBMMTAsMjAuNDQgTDEyLjQsMjAuNDQgTDE3LDI1LjUwIEwxNywxMC40OCBMMTIuMzksMTUuNTQgWiIgb3BhY2l0eT0iMSIgZmlsbD0iI2ZmZiI+PC9wYXRoPg0KICAgIDxwYXRoIGQ9Ik0xMi4zOSwxNS41NCBMMTAsMTUuNTQgTDEwLDIwLjQ0IEwxMi40LDIwLjQ0IEwxNywyNS41MCBMMTcsMTAuNDggTDEyLjM5LDE1LjU0IFoiIG9wYWNpdHk9IjEiIGZpbGw9IiNmZmYiPjwvcGF0aD4NCiAgICA8cGF0aCBkPSJNMjIsMTcuOTkgQzIyLDE2LjQgMjAuNzQsMTUuMDUgMTksMTQuNTQgTDE5LDIxLjQ0IEMyMC43NCwyMC45MyAyMiwxOS41OSAyMiwxNy45OSBaIiBvcGFjaXR5PSIxIiBmaWxsPSIjZmZmIj48L3BhdGg+DQogICAgPHBhdGggZD0iTTIyLDE3Ljk5IEMyMiwxNi40IDIwLjc0LDE1LjA1IDE5LDE0LjU0IEwxOSwyMS40NCBDMjAuNzQsMjAuOTMgMjIsMTkuNTkgMjIsMTcuOTkgWiIgb3BhY2l0eT0iMSIgZmlsbD0iI2ZmZiI+PC9wYXRoPg0KPC9zdmc+'
            },
            function(e, t) {
                e.exports = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAAAFoAAABaAHAjuH0AAAAHdElNRQfgBR8OMR9bwV7WAAABiElEQVRYw+2WvS9DURiHn9sSbUMrrTZSsYgYSATBIkRYLI0JsfkDjCb+B4mFxeJjNVsMEkwmMRhMNloShg5K+zO4lV4ft6e9DJL7nO3c97zPOe/JOeeCj4+PT1UsszDVPsQm8NcrMBLY84+T+BOBnT7CDFM11sckud2aNalT7cuS96TfCBo1qhNJe7ULGgyKAyOsMFTuKPeaVesHgWOewyyRqYhsp0juPaa6xG0FMSJAhGUWHHFjtHBEloK3ElnMMQF00EfIsbRp5jljjSuKXgQwwCwFmmn61B8lwTjLbHFRXeB2DmJEaSP0pdAlIMYs3SYlchPIdVySsFeBOyWzsECd30rckjcRuG1yjiwvtBL+pAoC9xxw7VVwToAgXfSTdmz0E3ccs2km+AEhFFVKKXVqQzm9sytLKKNFpdUoPFx8qmy9Wle+QpBUvPzNM3aiQe3o8UPwW8kdK+nRoV5//bqu4IZVgvVMsYrAwj7Qz1yyXU9djF6Nj0ff4qHW35b//1/k4+PjY8AbQVScfN4fNOAAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTYtMDUtMzFUMTQ6NDk6MDYrMDg6MDB87oydAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE2LTA1LTMxVDE0OjQ5OjMxKzA4OjAwRpsNTAAAADp0RVh0c3ZnOmJhc2UtdXJpAGZpbGU6Ly8vRDovc3BhY2UvdmNfcGxheWVyL3NyYy9pbWcvdm9sdW1uLnN2Z7m8k5MAAAAASUVORK5CYII='
            },
            function(e, t) {
                e.exports = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMzYgMzYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+DQogICAgPHBhdGggZD0iTTEyLjM5LDE1LjU0IEwxMCwxNS41NCBMMTAsMjAuNDQgTDEyLjQsMjAuNDQgTDE3LDI1LjUwIEwxNywxMC40OCBMMTIuMzksMTUuNTQgWiIgb3BhY2l0eT0iMSIgZmlsbD0iI2ZmZiI+PC9wYXRoPg0KICAgIDxwYXRoIGQ9Ik0xMi4zOSwxNS41NCBMMTAsMTUuNTQgTDEwLDIwLjQ0IEwxMi40LDIwLjQ0IEwxNywyNS41MCBMMTcsMTAuNDggTDEyLjM5LDE1LjU0IFoiIG9wYWNpdHk9IjEiIGZpbGw9IiNmZmYiPjwvcGF0aD4NCiAgICA8cGF0aCBkPSJNMTkuNjMsMTUuOTIgTDIwLjY4LDE0LjkzIEwyMi44MSwxNi45NCBMMjQuOTQsMTQuOTMgTDI2LDE1LjkyIEwyMy44NiwxNy45MyBMMjYsMTkuOTMgTDI0Ljk0LDIwLjkyIEwyMi44MSwxOC45MiBMMjAuNjgsMjAuOTIgTDE5LjYzLDE5LjkzIEwyMS43NiwxNy45MyBMMTkuNjMsMTUuOTIgWiIgb3BhY2l0eT0iMSIgZmlsbD0iI2ZmZiI+PC9wYXRoPg0KICAgIDxwYXRoIGQ9Ik0xOS42MywxNS45MiBMMjAuNjgsMTQuOTMgTDIyLjgxLDE2Ljk0IEwyNC45NCwxNC45MyBMMjYsMTUuOTIgTDIzLjg2LDE3LjkzIEwyNiwxOS45MyBMMjQuOTQsMjAuOTIgTDIyLjgxLDE4LjkyIEwyMC42OCwyMC45MiBMMTkuNjMsMTkuOTMgTDIxLjc2LDE3LjkzIEwxOS42MywxNS45MiBaIiBvcGFjaXR5PSIxIiBmaWxsPSIjZmZmIj48L3BhdGg+DQo8L3N2Zz4='
            },
            function(e, t) {
                e.exports = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAAAFoAAABaAHAjuH0AAAAHdElNRQfgBR8OMx9p9zxUAAAB3UlEQVRYw+2Wz0sVURTHP+PMw3joG39jWRGFLpQnIhZBEGEEuZBoERK0aNUqWrXyL3AVtWjnKjVaqOBChKJV8UJatAgraBUkgo8Cn2kk8b4uHMN5zcybO+pCmM/ZnXvv+Z5z7g8upKSkpFTFijdN5ks8ag67glgCXv5NNB+KgBc+y3UGDfsTJ7hndbqit5qUpf0HDRDI6ILeSJowF3BiNAfO85D+XUeQRHjnQgR8QQa4y3D1VIJFopa5ZIEs9xnxzbNxaaBEiS0ytGNT4qd5iyxucRnooIdjvpFGbnOHlzznM6cZ4zgzPEamAtDHDbaoo7bC/xuHPC04fOci1yhGHd7oFuUC/ZssMs0QNylzkmXmKSQTUKi/wBqdDOBQosAUH8KDJHuLamnGxQEynKMhampUBWHiLle5xxnesU6ebh7gMhdWb1QFRVZZZoPyf2u6uMQSUzzlBb/oI5+sgvfUYHOWXk74zsk6X3nFLK9ZYZEyOb4YN1kI5dSmNp3SExW1wzNZQqheHcrJFrLVqnbVC8M3SnutW4+04RMINKM9sDwD4BMTTLNWOVZpifiXX5cW9PfAn+s9fGMUO0mKVQQsvAv9h4+Mm+7kboQYjQKgCYsfpt+Wo/8vSklJSYnBNtEBsGU3qz6oAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE2LTA1LTMxVDE0OjUxOjA1KzA4OjAwn18JNAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNi0wNS0zMVQxNDo1MTozMSswODowMJTCkngAAAA5dEVYdHN2ZzpiYXNlLXVyaQBmaWxlOi8vL0Q6L3NwYWNlL3ZjX3BsYXllci9zcmMvaW1nL211dGVkLnN2Z6SDmFIAAAAASUVORK5CYII='
            },
            function(e, t) {
                e.exports = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMzYgMzYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+DQogICAgPHBhdGggZD0iTTcsMTYgTDEwLDE2IEwxMCwxMyBMMTMsMTMgTDEzLDEwIEw3LDEwIEw3LDE2IFoiIG9wYWN0aXk9IjEiIGZpbGw9IiNmZmYiPjwvcGF0aD4NCiAgICA8cGF0aCBkPSJNMjMsMTAgTDIzLDEzIEwyNiwxMyBMMjYsMTYgTDI5LDE2IEwyOSwxMCBMMjMsMTAgWiIgb3BhY3RpeT0iMSIgZmlsbD0iI2ZmZiI+PC9wYXRoPg0KICAgIDxwYXRoIGQ9Ik0yMywyMyBMMjMsMjYgTDI5LDI2IEwyOSwyMCBMMjYsMjAgTDI2LDIzIEwyMywyMyBaIiBvcGFjdGl5PSIxIiBmaWxsPSIjZmZmIj48L3BhdGg+DQogICAgPHBhdGggZD0iTTEwLDIwIEw3LDIwIEw3LDI2IEwxMywyNiBMMTMsMjMgTDEwLDIzIEwxMCwyMCBaIiBvcGFjdGl5PSIxIiBmaWxsPSIjZmZmIj48L3BhdGg+DQo8L3N2Zz4='
            },
            function(e, t) {
                e.exports = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAAAFoAAABaAHAjuH0AAAAHdElNRQfgBR8TICc05PV7AAABZUlEQVRYw+2WPXKDMBSEPwXsg6TIJVxxEBcunEPFld04t6DiEi58EGyyKSAOED1JZCZFZrQVmtl9f/tGAjIyMjKicNOj0mgLuGVCNCtSErf0SPZU3EaSNxoj/IbXUYoVNYdgOSDkdNYUO1nc3Yx5lptznzzK2+zcmfV0EaWRYFQi0AWaFt2DZ6AMiA/UrJHpADTscLRU7L2LFkwANe+EceU6fO2Xd+BYY5U1EL5aZW0TfR70E+0iCzdVdCOlt4xx7A0vdIiGq4vGBsEzGxwFF5p5yMhVkZhgseY/4c9H5FvTkcmJZU5MjlQjp6Mk6a5t2p4KbXWXJB3TLru+x2LBOjgKa6Khu6j9nm/kRWvRb+6iCobLzvKin31LldyrkNNpeD4+9BHy4jH7nidJp58ehDqIe9HPPuiVz+TV7FyY6iKiNDqoYfLoX8wEF06zR98Ywyga3l8Rc4ui3NJSJmIJNyMjI8PCJz46uKC8JLnTAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE2LTA1LTMxVDE3OjQ1OjU3KzA4OjAwNY8FDQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNi0wNS0zMVQxOTozMjozOSswODowMOODzSEAAAA+dEVYdHN2ZzpiYXNlLXVyaQBmaWxlOi8vL0Q6L3NwYWNlL3ZjX3BsYXllci9zcmMvaW1nL2Z1bGxzY3JlZW4uc3ZnTGxUBwAAAABJRU5ErkJggg=='
            },
            function(e, t) {
                e.exports = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMzYgMzYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+DQogICAgPGRlZnM+DQogICAgICAgIDxwYXRoIGQ9Ik0xMywxMCBMMTAsMTAgTDEwLDEzIEw3LDEzIEw3LDE2IEwxMywxNiBMMTMsMTAgWiIgaWQ9InN2Zy1xdWl0LTEiPjwvcGF0aD4NCiAgICAgICAgPHBhdGggZD0iTTI5LDE2IEwyOSwxMyBMMjYsMTMgTDI2LDEwIEwyMywxMCBMMjMsMTYgTDI5LDE2IFoiIGlkPSJzdmctcXVpdC0yIj48L3BhdGg+DQogICAgICAgIDxwYXRoIGQ9Ik0yOSwyMyBMMjksMjAgTDIzLDIwIEwyMywyNiBMMjYsMjYgTDI2LDIzIEwyOSwyMyBaIiBpZD0ic3ZnLXF1aXQtMyI+PC9wYXRoPg0KICAgICAgICA8cGF0aCBkPSJNMTAsMjYgTDEzLDI2IEwxMywyMCBMNywyMCBMNywyMyBMMTAsMjMgTDEwLDI2IFoiIGlkPSJzdmctcXVpdC00Ij48L3BhdGg+DQogICAgPC9kZWZzPg0KICAgIDx1c2Ugc3Ryb2tlPSIjMDAwIiBzdHJva2Utb3BhY2l0eT0iLjE1IiBzdHJva2Utd2lkdGg9IjJweCIgeGxpbms6aHJlZj0iI3N2Zy1xdWl0LTEiPjwvdXNlPg0KICAgIDx1c2Ugc3Ryb2tlPSIjMDAwIiBzdHJva2Utb3BhY2l0eT0iLjE1IiBzdHJva2Utd2lkdGg9IjJweCIgeGxpbms6aHJlZj0iI3N2Zy1xdWl0LTIiPjwvdXNlPg0KICAgIDx1c2Ugc3Ryb2tlPSIjMDAwIiBzdHJva2Utb3BhY2l0eT0iLjE1IiBzdHJva2Utd2lkdGg9IjJweCIgeGxpbms6aHJlZj0iI3N2Zy1xdWl0LTMiPjwvdXNlPg0KICAgIDx1c2Ugc3Ryb2tlPSIjMDAwIiBzdHJva2Utb3BhY2l0eT0iLjE1IiBzdHJva2Utd2lkdGg9IjJweCIgeGxpbms6aHJlZj0iI3N2Zy1xdWl0LTQiPjwvdXNlPg0KICAgIDx1c2UgZmlsbD0iI2ZmZiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhsaW5rOmhyZWY9IiNzdmctcXVpdC0xIj48L3VzZT4NCiAgICA8dXNlIGZpbGw9IiNmZmYiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bGluazpocmVmPSIjc3ZnLXF1aXQtMiI+PC91c2U+DQogICAgPHVzZSBmaWxsPSIjZmZmIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeGxpbms6aHJlZj0iI3N2Zy1xdWl0LTMiPjwvdXNlPg0KICAgIDx1c2UgZmlsbD0iI2ZmZiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhsaW5rOmhyZWY9IiNzdmctcXVpdC00Ij48L3VzZT4NCjwvc3ZnPg=='
            },
            function(e, t) {
                e.exports = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwEAQAAACtm+1PAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAAAFoAAABaAHAjuH0AAAAHdElNRQfgBR8RLwr1J2GvAAAFUklEQVRo3u2Yf0iUdxzHX889z915levSmBbpNS8NlSCcrY7+iJq2H8ZNYQwyguZYMBhBUK1iKeWgX46xGAaFzWEYtYHXUZJaiTB2mSaCTSG7QpPVxJbN8rzHu/vuj9PSqfeczkHBveD55/l+vu/v5/P9fD7P830eiBAhQoQIESK8HhjDtJNmODaTtaaHdBcnKDtBuQCKFZR0UFaAMiRb5JwwFzYGbZWhkbnpI1oXQNkZXCN8lOkYi2VKPQvilxryDANKGjE48fAQn/c45f7cv09CXw7QpiGT4u9acFJ2vFFu3I2PRcjYifG1M6BWqUvFskf14PtfEgAoFwwFSWUtK4pq+lKqE3tPXXT3xjuKKwe3xEHsALAqDJFVEDtQObglrjfeUdx76qK7L6U6sWVFUY2hIKksmInZYZJykLPmlCbF9CVUJ4sxNBXuN4N5LZAZhm4mmNc2Fe43j9XoS6hOnlOaFANyVni+BNGFWMg7vublLFAKPFbRFrCrZS+smkVH4JJ/JZA9jc3JDlzyr6RZdIzeCNjVMo9VtIFSMLLW2J7wTiUUsgfG1XwmLR6r+MncYLgvZTF3Gs6GhZTFXHOD4X5/zeJ1Jrf0pa85vJ7QamKbIc8wcKNp65LEutWxAbvqlrKYO/9ExhC5sxvA/BMZQ3d2HDUJJ26d0xDbbW5csiavokc9gw34bqYB7FPSiEn8dfWfsd0fdL24mws8o4550yqbqXlGnf56QvZCEoLaP3CH5ViUtIo4Ff4KNVWnIR2FE09g13D9hJFR59MlD5vIBzzTcDk4J13yjNMaQ2DXcD1OPEBUKCGtDOh4iI9CUcnnfD226V44Xx54IDYLG4fon0YAsWKzsFEecLNNB78L07jRTCmVQlFJNH4tH7UCaPIep/zqxp+LkotufjvytHnJJvLFZmG7fKD1XTBY0c5ocFMwVF0+0FpC8b5r0hHJxSUqxxlskls773UZvbUcJJdtobIQ8mwiW+Qcf9eCkyAWgP99Jj4qPUAsGKr0Nu+nw66nh4H7GgG8pbfN3zfsMv4Iah7wGDD9y6YO5CsgPZEtT77wd/kvzyiAkXHDyM4KDTsfMBxGBgD0BLOvpRkA1FB24aT8lSZkD8gW+cPXvISUIdmRWF6x0VaUfMTiDdXExb+0WqHXD9zUCOAdeFM+8PFKd07xymvSuSmaeG+XcWut66A/t3sb+KKYGcqKOclJqb3xjuLgqS3QPu4aFLdEqd9xo2NPG5iPEf5h7tiNjj1totTvEIPi1gRdIURvvKN4TnJSavCbIYSHGosFWITMbik/uLSUOsFimw7piOQiWArh8lg6J7nYq3sbExlkTlIIh6R8znKeTgKhhLSaeAg7Jl2Jfv2EkWfUAcGXULAETIRPcM7oC2xUa6xjJfr12DEBQ6GEtDJw2NfOQLexcQmJpATsatnoYU5/PWF2zkEA88ge3vDgt6c7WqLEVZ7rnIbPus2Np33t9ADRwCczDcClVqlL1+RV9CiZFY89VmE1Nxju39lx1LSQhFnzH+DpjpaolKavPP121WpKlx77mulRq9RnwO0ZZ0C661svlj2qV89gU8+IDFAa+msWrxNO3LN9nBZXed5vV63ivT8aBvFlgBQN3A76MPVxOhSvxSdlqAxM8hknbfc1M9BtblzCciyBXcP1FIrKzntdRg7JV4ANYQQggXylc2/XMsuii99wSMrXlejXd5sbT/ua6RnZ+avavmgHMBkveyKtIo6zfEQ0fm8tB0F6gsYTY4QhkJ5srXUdNEa7vucs59lOnK89vJr/T7yKP7amw+v/azFChAgRIkSIMMv8A/Qifkc5vn6XAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE2LTA1LTMxVDE3OjQ2OjUxKzA4OjAwvWiLNAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNi0wNS0zMVQxNzo0NzoxMCswODowMAHKXfgAAABDdEVYdHN2ZzpiYXNlLXVyaQBmaWxlOi8vL0Q6L3NwYWNlL3ZjX3BsYXllci9zcmMvaW1nL2Z1bGxzY3JlZW5fZXhpdC5zdmeq7hYiAAAAAElFTkSuQmCC'
            },
            function(e, t) {
                e.exports = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAjVJREFUeNrsmDtoFUEUhr+rJkiCSEyRQhHRCCohBAlioRIECxtBQRBL8VHYWFmIhXaijY2gRCGIFlbpLASFYDAiPoiPYFBBRBQFkRA0PmI+m3MhhORe3ZDNXpgfplh2mZlv5/zn7NmSSi1rATWuBJAAEkACSAAJIAHMpxbluFYbcBDYCiwBvgODQDdwD5jINKuax+hSB51ew+p+tS7L3HlsvlW9b2UNqGuyzJ+HBzqBjVWeaQIai2ri31XiewK4BbwvmgdK6k71tjo+Q+j8UbvVlqzrlOagIysBHcAxYDfwDOgB1sV1c5zKa+B63BvNvNgsABqApcBIpESAlcBh4Ehsqge4DHwIsPVAK/AtwD7P+m1lBNgCHAJWAa+AG8By4ATQAlwFLgIv5txhGeJuh/p2Six/UkfUXnVzTrUlUx1Yq/bPYMibakOem89SB9piTKePk7xQ2I+5p8CjCsWoqegAb4AzYdyyRoEnYezeSJUNeQFkzUKdwL54433AXWATcDJCrBc4D/RPU4UXR0odm0+AsuqiKJW1AjgAHI1TuAZcAJ4Dq4FdQHuc/BBwB3iYdxr9l9GhXlLH1CH1nNqn/pqUtcYjHR9XG/NKo/8z6tXtFdJuWT/V02pzUfuBveqPKhBf1FNF7Qfqw7SVtAzYVtR+4DEwXMt/JV4CZ4GvVSCvFLmpXxheeDAl9sej4emKZwrR0FRSO7AH2BAFbiCK3rv5KmTpz1wCSAAJIAEkgASQAGpZfwcAT9esWbDao2gAAAAASUVORK5CYII='
            },
            function(e, t, i) {
                function o(e, t) {
                    for (let i = 0; i < e.length; i++) {
                        const o = e[i]
                        const n = d[o.id]
                        if (n) {
                            n.refs++
                                for (var r = 0; r < n.parts.length; r++) n.parts[r](o.parts[r])
                            for (; r < o.parts.length; r++) n.parts.push(c(o.parts[r], t))
                        } else {
                            for (var s = [], r = 0; r < o.parts.length; r++) s.push(c(o.parts[r], t))
                            d[o.id] = {
                                id: o.id,
                                refs: 1,
                                parts: s
                            }
                        }
                    }
                }

                function n(e) {
                    for (var t = [], i = {},
                            o = 0; o < e.length; o++) {
                        const n = e[o]
                        const r = n[0]
                        const s = n[1]
                        const a = n[2]
                        const l = n[3]
                        const c = {
                            css: s,
                            media: a,
                            sourceMap: l
                        }
                        i[r] ? i[r].parts.push(c) : t.push(i[r] = {
                            id: r,
                            parts: [c]
                        })
                    }
                    return t
                }

                function r(e, t) {
                    const i = v()
                    const o = g[g.length - 1]
                    if (e.insertAt === 'top') o ? o.nextSibling ? i.insertBefore(t, o.nextSibling) : i.appendChild(t) : i.insertBefore(t, i.firstChild),
                        g.push(t)
                    else {
                        if (e.insertAt !== 'bottom') throw new Error('Invalid value for parameter \'insertAt\'. Must be \'top\' or \'bottom\'.')
                        i.appendChild(t)
                    }
                }

                function s(e) {
                    e.parentNode.removeChild(e)
                    const t = g.indexOf(e)
                    t >= 0 && g.splice(t, 1)
                }

                function a(e) {
                    const t = document.createElement('style')
                    return t.type = 'text/css',
                        r(e, t),
                        t
                }

                function l(e) {
                    const t = document.createElement('link')
                    return t.rel = 'stylesheet',
                        r(e, t),
                        t
                }

                function c(e, t) {
                    let i, o, n
                    if (t.singleton) {
                        const r = m++
                            i = A || (A = a(t)),
                            o = u.bind(null, i, r, !1),
                            n = u.bind(null, i, r, !0)
                    } else e.sourceMap && typeof URL === 'function' && typeof URL.createObjectURL === 'function' && typeof URL.revokeObjectURL === 'function' && typeof Blob === 'function' && typeof btoa === 'function' ? (i = l(t), o = h.bind(null, i), n = function() {
                        s(i),
                            i.href && URL.revokeObjectURL(i.href)
                    }) : (i = a(t), o = p.bind(null, i), n = function() {
                        s(i)
                    })
                    return o(e),
                        function(t) {
                            if (t) {
                                if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap) return
                                o(e = t)
                            } else n()
                        }
                }

                function u(e, t, i, o) {
                    const n = i ? '' : o.css
                    if (e.styleSheet) e.styleSheet.cssText = w(t, n)
                    else {
                        const r = document.createTextNode(n)
                        const s = e.childNodes
                        s[t] && e.removeChild(s[t]),
                            s.length ? e.insertBefore(r, s[t]) : e.appendChild(r)
                    }
                }

                function p(e, t) {
                    const i = t.css
                    const o = t.media
                    if (o && e.setAttribute('media', o), e.styleSheet) e.styleSheet.cssText = i
                    else {
                        for (; e.firstChild;) e.removeChild(e.firstChild)
                        e.appendChild(document.createTextNode(i))
                    }
                }

                function h(e, t) {
                    let i = t.css
                    const o = t.sourceMap
                    o && (i += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(o)))) + ' */')
                    const n = new Blob([i], {
                        type: 'text/css'
                    })
                    const r = e.href
                    e.href = URL.createObjectURL(n),
                        r && URL.revokeObjectURL(r)
                }
                var d = {}
                const f = function(e) {
                    let t
                    return function() {
                        return typeof t === 'undefined' && (t = e.apply(this, arguments)),
                            t
                    }
                }
                const y = f(function() {
                    return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase())
                })
                var v = f(function() {
                    return document.head || document.getElementsByTagName('head')[0]
                })
                var A = null
                var m = 0
                var g = []
                e.exports = function(e, t) {
                    t = t || {},
                        typeof t.singleton === 'undefined' && (t.singleton = y()),
                        typeof t.insertAt === 'undefined' && (t.insertAt = 'bottom')
                    const i = n(e)
                    return o(i, t),
                        function(e) {
                            for (var r = [], s = 0; s < i.length; s++) {
                                const a = i[s]
                                var l = d[a.id]
                                l.refs--,
                                    r.push(l)
                            }
                            if (e) {
                                const c = n(e)
                                o(c, t)
                            }
                            for (var s = 0; s < r.length; s++) {
                                var l = r[s]
                                if (l.refs === 0) {
                                    for (let u = 0; u < l.parts.length; u++) l.parts[u]()
                                    delete d[l.id]
                                }
                            }
                        }
                }
                var w = function() {
                    const e = []
                    return function(t, i) {
                        return e[t] = i,
                            e.filter(Boolean).join('\n')
                    }
                }()
            },
            function(e, t, i) {
                'use strict'

                function o(e) {
                    if (e && e.__esModule) return e
                    const t = {}
                    if (e != null)
                        for (const i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
                    return t.default = e,
                        t
                }

                function n(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }

                function r(e, t) {
                    if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function')
                }

                function s(e, t) {
                    if (!e) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called')
                    return !t || typeof t !== 'object' && typeof t !== 'function' ? e : t
                }

                function a(e, t) {
                    if (typeof t !== 'function' && t !== null) throw new TypeError('Super expression must either be null or a function, not ' + typeof t)
                    e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }),
                        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }
                t.__esModule = !0
                const l = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ?
                    function(e) {
                        return typeof e
                    } : function(e) {
                        return e && typeof Symbol === 'function' && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e
                    }
                const c = i(24)
                const u = n(c)
                const p = i(2)
                const h = o(p)
                const d = i(3)
                const f = o(d)
                const y = i(4)
                const v = i(25)
                const A = o(v)
                const m = i(1)
                const g = o(m)
                const w = (f.FullscreenApi, {
                    '0.7.1': 'libs/hls.js',
                    '0.7min': 'libs/hls.min.js',
                    '0.8.1': 'libs/hls0.8.js',
                    '0.8.9': 'libs/hls.min.0.8.9.js',
                    '0.12.4': 'libs/hls.min.0.12.4.js'
                })
                const b = function(e) {
                    function t(i) {
                        return r(this, t),
                            s(this, e.call(this, i, 'H5Video'))
                    }
                    return a(t, e),
                        t.prototype.render = function(t) {
                            let i;
                            const o = this.player.options
                            const n = o.controls == 'system' ? '' : null
                            const r = !!o.autoplay || null
                            return i = o.poster && l(o.poster) == 'object' ? o.poster.src : typeof o.poster === 'string' ? o.poster : null,
                                this.createEl('video', {
                                    controls: n,
                                    preload: o.preload || 'auto',
                                    autoplay: r,
                                    'webkit-playsinline': '',
                                    playsinline: '',
                                    'x-webkit-airplay': 'allow',
                                    'x5-video-player-type': o.x5_type == 'h5-page' ? 'h5-page' : null,
                                    'x5-video-player-fullscreen': !!o.x5_fullscreen || null,
                                    'x5-video-orientation': ['landscape', 'portrait', 'landscape|portrait'][o.x5_orientation] || null,
                                    'x5-playsinline': !!o.x5_playsinline == 1 ? o.x5_playsinline : null,
                                    'x5-mse-live-streaming': o.live ? '' : null
                                }),
                                this.el.style.width = this.player.width,
                                this.el.style.height = this.player.height,
                                e.prototype.render.call(this, t)
                        },
                        t.prototype.__hlsLoaded = function(e) {
                            if (!Hls.isSupported()) return this.notify({
                                type: 'error',
                                code: 5,
                                timeStamp: +new Date
                            })
                            this.flv && (this.flv.unload(), this.flv.detachMediaElement()),
                                this.hls && (this.hls.stopLoad(), this.hls.detachMedia(), this.hls.destroy()),
                                this.webrtc && this.webrtc.stopPlay()
                            const t = new Hls(this.options.hlsConfig)
                            t.loadSource(e),
                                t.attachMedia(this.el),
                                t.on(Hls.Events.MANIFEST_PARSED,
                                    function(e, t) {}),
                                t.on(Hls.Events.MEDIA_DETACHED,
                                    function() {}),
                                t.on(Hls.Events.ERROR, f.bind(this, this.__hlsOnError)),
                                this.hls = t
                        },
                        t.prototype.__hlsOnManifestParsed = function(e, t) {
                            this.metaDataLoaded = !0
                        },
                        t.prototype.__hlsOnError = function(e, t) {
                            const i = t.type
                            const o = t.details
                            const n = t.fatal
                            const r = this.hls
                            if (n) switch (i) {
                                case Hls.ErrorTypes.NETWORK_ERROR:
                                    o.indexOf('TimeOut') > 0 ? f.console.error('加载视频文件超时') : f.console.error('无法加载视频文件，请检查网络，以及视频文件是否允许跨域请求访问，m3u8文件是否存在 ' + (t.response && t.response.status ? 'netstatus:' + t.response.status : '')),
                                        this.notify({
                                            type: 'error',
                                            code: 2,
                                            timeStamp: +new Date
                                        }),
                                        r.startLoad()
                                    break
                                case Hls.ErrorTypes.MEDIA_ERROR:
                                    r.recoverMediaError()
                                    break
                                default:
                                    r.destroy()
                            }
                        },
                        t.prototype.__webrtcLoaded = function(e) {
                            this.hls && (this.hls.stopLoad(), this.hls.detachMedia()),
                                this.flv && (this.flv.detachMediaElement(), this.flv.destroy())
                            const t = this
                            const i = this.player.options.webrtcConfig
                            const o = new TXLivePlayer
                            o.setPlayerView(this.el),
                                i && i.streamType ? i.streamType === 'video' ? o.setConfig({
                                    receiveVideo: !0,
                                    receiveAudio: !1
                                }) : i.streamType === 'audio' ? o.setConfig({
                                    receiveVideo: !1,
                                    receiveAudio: !0
                                }) : o.setConfig({
                                    receiveVideo: !0,
                                    receiveAudio: !0
                                }) : o.setConfig({
                                    receiveVideo: !0,
                                    receiveAudio: !0
                                }),
                                o.startPlay(e),
                                o.setPlayListener({
                                    onPlayEvent: function(e, i) {
                                        if (e === 1006) {
                                            var o = {
                                                type: 'webrtcstop',
                                                timeStamp: +new Date
                                            }
                                            return t.notify(o), !1
                                        }
                                        if (e === 1009) {
                                            var o = {
                                                type: 'webrtcwaitstart',
                                                timeStamp: +new Date
                                            }
                                            return t.notify(o), !1
                                        }
                                        if (e === 1010) {
                                            var o = {
                                                type: 'webrtcwaitend',
                                                timeStamp: +new Date
                                            }
                                            return t.notify(o), !1
                                        }
                                        var o = {
                                            type: 'error'
                                        }
                                        return e === -2001 && (o.code = 2001),
                                            e === -2002 && (o.code = 2002),
                                            e === -2004 && (o.code = 2003),
                                            e === -2005 ? (t.__convertProtocol(t.options.src, t.options.m3u8 ? f.VideoType.M3U8 : ''), !1) : void(o.code && (i && (o.reason = i.message), o.timeStamp = +new Date, t.notify(o)))
                                    },
                                    onPlayStats: function(e) {
                                        t.notify({
                                            type: y.MSG.WebRTCStatUpdate,
                                            detail: e,
                                            timeStamp: +new Date
                                        })
                                    }
                                }),
                                this.webrtc = o
                        },
                        t.prototype.__flvLoaded = function(e) {
                            if (!flvjs.isSupported()) return this.notify({
                                type: 'error',
                                code: 5,
                                timeStamp: +new Date
                            })
                            this.hls && (this.hls.stopLoad(), this.hls.detachMedia()),
                                this.flv && (this.flv.detachMediaElement(), this.flv.destroy()),
                                this.webrtc && this.webrtc.stopPlay()
                            const t = flvjs.createPlayer(Object.assign({
                                    type: 'mse',
                                    isLive: this.player.options.live,
                                    url: e
                                }),
                                this.options.flvConfig)
                            t.attachMediaElement(this.el),
                                t.on(flvjs.Events.ERROR, f.bind(this,
                                    function(e, t, i) {
                                        const o = {
                                            type: 'error'
                                        }
                                        e == flvjs.ErrorTypes.NETWORK_ERROR && (o.code = 2),
                                            e == flvjs.ErrorTypes.MEDIA_ERROR && (o.code = 1002),
                                            e == flvjs.ErrorTypes.OTHER_ERROR,
                                            o.timeStamp = +new Date,
                                            this.notify(o)
                                    })),
                                t.on(flvjs.Events.MEDIA_INFO, f.bind(this,
                                    function(e, t) {})),
                                t.on(flvjs.Events.STATISTICS_INFO, f.bind(this,
                                    function(e, t) {})),
                                this.flv = t,
                                t.load()
                        },
                        t.prototype.setup = function() {
                            this.playState = A.PlayStates.IDLE,
                                this.seekState = A.SeekStates.IDLE,
                                this.metaDataLoaded = !1,
                                this.__timebase = +new Date,
                                this.on(y.MSG.MetaLoaded, this.notify),
                                this.on(y.MSG.Loaded, this.notify),
                                this.on(y.MSG.Progress, this.notify),
                                this.on(y.MSG.Play, this.notify),
                                this.on(y.MSG.Playing, this.notify),
                                this.on(y.MSG.Pause, this.notify),
                                this.on(y.MSG.Error, this.notify),
                                this.on(y.MSG.TimeUpdate, this.notify),
                                this.on(y.MSG.Ended, this.notify),
                                this.on(y.MSG.Seeking, this.notify),
                                this.on(y.MSG.Seeked, this.notify),
                                this.on(y.MSG.VolumeChange, this.notify),
                                this.on('durationchange', this.notify),
                                this.load(this.options.src, this.options.m3u8 ? f.VideoType.M3U8 : '')
                        },
                        t.prototype.destroy = function() {
                            e.prototype.destroy.call(this),
                                this.hls && this.hls.destroy(),
                                this.flv && this.flv.destroy(),
                                this.webrtc && this.webrtc.stopPlay()

                        },
                        t.prototype.notify = function(e) {
                            const t = {
                                type: e.type,
                                src: this,
                                ts: +new Date,
                                timeStamp: e.timeStamp
                            }
                            switch (e.type) {
                                case y.MSG.MetaLoaded:
                                    this.metaDataLoaded = !0
                                    break
                                case y.MSG.Error:
                                    var i = {
                                        1: 'MEDIA_ERR_ABORTED',
                                        2: 'MEDIA_ERR_NETWORK',
                                        3: 'MEDIA_ERR_DECODE',
                                        4: 'MEDIA_ERR_SRC_NOT_SUPPORTED'
                                    }
                                    t.detail = this.el && this.el.error || {
                                            code: e.code
                                        },
                                        t.detail.reason = i[t.detail.code] || e.reason
                                    break
                                case y.MSG.Ended:
                                    this.pause(),
                                        this.playState = A.PlayStates.STOP
                                    break
                                case 'durationchange':
                                    this.videoHeight() != 0 && (t.type = y.MSG.Resize)
                                    break
                                case y.MSG.Playing:
                                    this.playState = e.type.toUpperCase()
                                    break
                                case y.MSG.Pause:
                                    this.playState = A.PlayStates.PAUSED
                                    break
                                case y.MSG.Seeking:
                                case y.MSG.Seeked:
                                    this.seekState = e.type.toUpperCase()
                                    break
                                case y.MSG.WebRTCStatUpdate:
                                    t.detail = e.detail
                            }
                            e.type != 'timeupdate',
                                this.pub(t)
                        },
                        t.prototype.videoWidth = function() {
                            return this.el.videoWidth
                        },
                        t.prototype.videoHeight = function() {
                            return this.el.videoHeight
                        },
                        t.prototype.width = function(e) {
                            return e ? void(this.el.style.width = e) : this.el.width
                        },
                        t.prototype.height = function(e) {
                            return e ? void(this.el.style.height = e) : this.el.height
                        },
                        t.prototype.play = function() {
                            this.options.hlsConfig && this.options.hlsConfig.autoStartLoad === !1 && this.hls && this.hls.startLoad(-1),
                                this.el.play()
                        },
                        t.prototype.togglePlay = function() {
                            // this.paused() ? this.play() : this.pause()
                        },
                        t.prototype.pause = function() {
                            this.el.pause()
                        },
                        t.prototype.stop = function() {
                            this.el.pause(),
                                this.el.currentTime = 0
                        },
                        t.prototype.paused = function() {
                            return this.el.paused
                        },
                        t.prototype.buffered = function() {
                            return this.el.buffered.length >= 1 ? this.el.buffered.end(this.el.buffered.length - 1) : 0
                        },
                        t.prototype.currentTime = function(e) {
                            return typeof e === 'undefined' ? this.el.currentTime : this.el.currentTime = e
                        },
                        t.prototype.duration = function() {
                            return this.el.duration || 0
                        },
                        t.prototype.mute = function(e) {
                            return typeof e === 'undefined' ? this.el.muted : (this.volume(e ? 0 : this.__lastVol), this.el.muted = e)
                        },
                        t.prototype.volume = function(e) {
                            return typeof e === 'undefined' ? this.el.volume : (e < 0 && (e = 0), e > 1 && (e = 1), e != 0 && (this.__lastVol = e), this.el.muted = e == 0, this.options.volume = e, this.el.volume = e)
                        },
                        t.prototype.fullscreen = function(e) {
                            return f.doFullscreen(this.player, e, this.owner)
                        },
                        t.prototype.load = function(e, t) {
                            const i = this
                            const o = e.includes('webrtc://') || e.includes('.sdp')
                            this.pub({
                                    type: y.MSG.Load,
                                    src: this,
                                    ts: +new Date,
                                    detail: {
                                        src: e,
                                        type: t
                                    }
                                }),
                                o ? g.IS_ENABLED_WEBRTC.then(function(o) {
                                    o ? typeof window.TXLivePlayer === 'undefined' ? h.loadScript(f.unifyProtocol('/tcPlayer/TXLivePlayer-1.1.0.min.js'),
                                        function() {
                                            i.__webrtcLoaded.call(i, e)
                                        }) : i.__webrtcLoaded(e) : i.__convertProtocol(e, t)
                                }).catch(function(o) {
                                    i.__convertProtocol(e, t)
                                }) : this.__load(e, t)
                        },
                        t.prototype.__convertProtocol = function(e, t) {
                            g.IS_ENABLED_MSE ? g.IS_MOBILE ? (e.includes('.sdp') ? e = e.replace('.sdp', '.m3u8') : (e = e.replace('webrtc://', 'https://').replace('?', '.m3u8?'), !e.includes('?') && !e.includes('.m3u8') && (e += '.m3u8')), this.__load(e, t)) : (e.includes('.sdp') ? e = e.replace('.sdp', '.flv') : (e = e.replace('webrtc://', 'https://').replace('?', '.flv?'), !e.includes('?') && !e.includes('.flv') && (e += '.flv')), this.__load(e, t)) : this.notify({
                                type: 'error',
                                code: 2e3,
                                timeStamp: +new Date
                            })
                        },
                        t.prototype.__load = function(e, t) {
                            const i = e.includes('.m3u8') || t == f.VideoType.M3U8
                            const o = e.includes('.flv')
                            if (!g.IS_ENABLED_MSE || !i && !o || g.IS_X5TBS && this.player.options.x5_player || i && g.IS_MAC && g.IS_SAFARI && !g.IS_IOS) this.hls && (this.hls.stopLoad(), this.hls.detachMedia()),
                                this.flv && (this.flv.unload(), this.flv.detachMediaElement()),
                                this.__type = t,
                                this.el.src = e
                            else {
                                const n = this
                                const r = w[this.options.hls] || w['0.7.1']
                                i ? (this.__type = f.VideoType.M3U8, typeof window.Hls === 'undefined' ? h.loadScript(f.unifyProtocol(f.CDNPath + r),
                                    function() {
                                        n.__hlsLoaded.call(n, e)
                                    }) : this.__hlsLoaded(e)) : o && (this.__type = f.VideoType.FLV, typeof window.flvjs === 'undefined' ? h.loadScript(f.unifyProtocol('/tcPlayer/mpegts.js'),
                                    function() {
                                        t && (window.flvjs = t),
                                            window.flvjs = mpegts,
                                            n.__flvLoaded.call(n, e)
                                    }) : this.__flvLoaded(e))
                            }
                        },
                        t.prototype.playing = function() {
                            return !this.el.paused
                        },
                        t.prototype.type = function() {
                            return this.__type
                        },
                        t
                }(u.default)
                t.default = b
            },
            function(e, t, i) {
                'use strict'

                function o(e) {
                    if (e && e.__esModule) return e
                    const t = {}
                    if (e != null)
                        for (const i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
                    return t.default = e,
                        t
                }

                function n(e, t) {
                    if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function')
                }

                function r(e, t) {
                    return t + '_' + e
                }

                function s(e, t) {
                    return t.guid && !String(t.guid).includes('_') ? e + '_' + t.guid : t.guid
                }
                t.__esModule = !0
                const a = i(2)
                const l = o(a)
                const c = i(3)
                const u = o(c)
                const p = i(4)
                const h = o(p)
                const d = i(1)
                const f = o(d)
                const y = function() {
                    function e(t, i) {
                        n(this, e),
                            this.name = i,
                            this.player = t,
                            this.options = t.options,
                            this.fnCache = {},
                            this.guid = u.guid()
                    }
                    return e.prototype.createEl = function(e, t, i) {
                            return this.el = l.createEl(e, t, i)
                        },
                        e.prototype.render = function(e) {
                            return e && this.el && (this.owner = e, e.appendChild(this.el), this.setup()),
                                this.el
                        },
                        e.prototype.on = function(e, t, i) {
                            typeof e === 'string' && (i = t, t = e, e = this.el),
                                this.cbs = this.cbs || {}
                            let o = s(this.guid, i)
                            const n = !o
                            const a = o && !this.fnCache[o]
                            return n || a ? (i = u.bind(this, i, this.guid), this.fnCache[i.guid] = i, o = i.guid) : i = this.fnCache[o],
                                l.on(e, t, i),
                                this.cbs[r(o, t)] = {
                                    guid: o,
                                    el: e,
                                    type: t
                                },
                                i
                        },
                        e.prototype.off = function(e, t, i) {
                            typeof e === 'string' && (i = t, t = e, e = this.el),
                                f.IS_MOBILE && t == 'click' && (t = 'touchend')
                            const o = s(this.guid, i)
                            this.fnCache[o] && (i = this.fnCache[o]),
                                l.off(e, t, i),
                                delete this.cbs[r(o, t)]
                        },
                        e.prototype.pub = function(e) {
                            const t = this
                            setTimeout(function() {
                                    h.pub(e, t.player)
                                },
                                0)
                        },
                        e.prototype.sub = function(e, t, i) {
                            h.sub(e, t, i, this.player)
                        },
                        e.prototype.unsub = function(e, t, i) {
                            h.unsub(e, t, i, this.player)
                        },
                        e.prototype.handleMsg = function() {},
                        e.prototype.setup = function() {},
                        e.prototype.destroy = function() {
                            if (this.handleMsg && this.unsub('*', '*', this.handleMsg), this.cbs) {
                                for (const e in this.cbs)
                                    if (this.cbs.hasOwnProperty(e)) {
                                        const t = this.cbs[e]
                                        l.off(t.el, t.type, this.fnCache[t.guid]),
                                            delete this.cbs[e]
                                    }
                                this.fnCache = null,
                                    this.cbs = null
                                try {
                                    this.el.parentNode.removeChild(this.el)
                                } catch (e) {}
                            }
                        },
                        e
                }()
                t.default = y
            },
            function(e, t) {
                'use strict'
                t.__esModule = !0
                t.PlayStates = {
                        IDLE: 'IDLE',
                        PLAYING: 'PLAYING',
                        PAUSED: 'PAUSED',
                        STOP: 'STOP'
                    },
                    t.SeekStates = {
                        IDLE: 'IDLE',
                        SEEKING: 'SEEKING',
                        SEEKED: 'SEEKED'
                    },
                    t.ControlsStates = {
                        DEFAULT: 'default',
                        NONE: 'none',
                        SYSTEM: ''
                    }
            },
            function(e, t, i) {
                'use strict'

                function o(e) {
                    if (e && e.__esModule) return e
                    const t = {}
                    if (e != null)
                        for (const i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
                    return t.default = e,
                        t
                }

                function n(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }

                function r(e, t) {
                    if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function')
                }

                function s(e, t) {
                    if (!e) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called')
                    return !t || typeof t !== 'object' && typeof t !== 'function' ? e : t
                }

                function a(e, t) {
                    if (typeof t !== 'function' && t !== null) throw new TypeError('Super expression must either be null or a function, not ' + typeof t)
                    e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }),
                        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }

                function l(e) {
                    return window.document[e] ? window.document[e] : navigator.appName.includes('Microsoft Internet') ? document.getElementById(e) : document.embeds && document.embeds[e] ? document.embeds[e] : void 0
                }
                t.__esModule = !0
                const c = i(24)
                const u = n(c)
                const p = i(4)
                const h = i(2)
                const d = o(h)
                const f = i(3)
                const y = o(f)
                const v = i(25)
                const A = o(v)
                const m = i(1)
                const g = o(m)
                const w = function(e) {
                    function t(i) {
                        r(this, t)
                        const o = s(this, e.call(this, i, 'FlashVideo'))
                        const n = 'vcpFlashCB_' + o.guid
                        return o.__flashCB = n,
                            window[n] || (window[n] = function(e, t) {
                                    t = t && t[0]
                                    const i = window[n].fnObj && window[n].fnObj[t.objectID]
                                    i && i(e, t)
                                },
                                window[n].fnObj = {}),
                            o
                    }
                    return a(t, e),
                        t.prototype.render = function(e) {
                            this.__timebase = +new Date
                            const t = this.player.options
                            const i = y.unifyProtocol(t.flashUrl || '//cloudcache.tencent-cloud.com/open/qcloud/video/player/release/QCPlayer.swf')
                            const o = 'opaque'
                            const n = 'obj_vcplayer_' + this.player.guid
                            const r = this.__flashCB
                            this.__id = n
                            const s = d.createEl('div', {
                                class: 'vcp-video'
                            })
                            s.innerHTML = '\n\t\t<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="" id="' + n + '" width="100%" height="100%">\n            <param name="movie"  value="' + i + '" />\n            <param name="quality" value="autohigh" />\n            <param name="swliveconnect" value="true" />\n            <param name="allowScriptAccess" value="always" />\n            <param name="bgcolor" value="#000" />\n            <param name="allowFullScreen" value="true" />\n            <param name="wmode" value="' + o + '" />\n            <param name="FlashVars" value="cbName=' + r + '" />\n\n            <embed src="' + i + '" width="100%" height="100%" name="' + n + '"\n                   quality="autohigh"\n                   bgcolor="#000"\n                   align="middle" allowFullScreen="true"\n                   allowScriptAccess="always"\n                   type="application/x-shockwave-flash"\n                   swliveconnect="true"\n                   wmode="' + o + '"\n                   FlashVars="cbName=' + r + '"\n                   pluginspage="http://www.macromedia.com/go/getflashplayer" >\n            </embed>\n        </object>\n\t\t',
                                this.container = s,
                                this.owner = e,
                                this.owner.appendChild(s),
                                this.cover = d.createEl('div', {
                                    class: 'vcp-pre-flash'
                                }),
                                this.owner.appendChild(this.cover),
                                window[this.__flashCB].fnObj[this.__id] = y.bind(this, this.notify)
                        },
                        t.prototype.setup = function() {
                            this.on('error', this.notify),
                                this.playState = A.PlayStates.IDLE,
                                this.seekState = A.SeekStates.IDLE,
                                this.metaDataLoaded = !1
                        },
                        t.prototype.doPolling = function() {
                            this.options.live || (clearInterval(this.__timer), this.__timer = setInterval(this.interval.bind(this), 1e3))
                        },
                        t.prototype.endPolling = function() {
                            clearInterval(this.__timer)
                        },
                        t.prototype.interval = function() {
                            let e
                            try {
                                e = this.el.getState()
                            } catch (e) {
                                return void this.endPolling()
                            }
                            if (this.__m3u8) {
                                const t = this.currentTime() + e.bufferLength
                                this.__buffered !== t && (this.__buffered = t, this.pub({
                                        type: p.MSG.Progress,
                                        src: this,
                                        ts: +new Date
                                    })),
                                    this.__buffered >= this.duration() && this.endPolling()
                            } else this.__rtmp || (this.__bytesloaded != e.bytesLoaded && (this.__bytesloaded = e.bytesLoaded, this.pub({
                                type: p.MSG.Progress,
                                src: this,
                                ts: +new Date
                            })), this.__bytesloaded >= this.__bytesTotal && this.endPolling())
                        },
                        t.prototype.destroy = function() {
                            typeof this.el !== 'undefined' && typeof this.el.destroy !== 'undefined' && this.el.destroy(),
                                this.endPolling(),
                                delete window[this.__flashCB].fnObj[this.__id],
                                e.prototype.destroy.call(this)
                        },
                        t.prototype.notify = function(e, t) {
                            const i = {
                                type: e,
                                ts: +new Date
                            }
                            try {
                                switch (this.options.debug && this.pub({
                                    type: i.type,
                                    src: this,
                                    ts: i.ts,
                                    detail: y.extend({
                                            debug: !0
                                        },
                                        t)
                                }), i.type) {
                                    case 'ready':
                                        if (this.el = l(this.__id), this.setup(), g.IS_FIREFOX) {
                                            var o = this
                                            setTimeout(function() {
                                                    o.el.setAutoPlay(!!o.options.autoplay),
                                                        o.__timebase = new Date - t.time,
                                                        o.load(o.options.src)
                                                },
                                                0)
                                        } else {
                                            try {
                                                this.el.setAutoPlay(!!this.options.autoplay)
                                            } catch (e) {
                                                console.warn('Flash 调用失败，请检查Flash是否启用成功')
                                            }
                                            this.__timebase = new Date - t.time,
                                                this.load(this.options.src)
                                        }
                                        return
                                    case 'metaData':
                                        i.type = p.MSG.MetaLoaded,
                                            this.__videoWidth = t.videoWidth,
                                            this.__videoHeight = t.videoHeight,
                                            this.__duration = t.duration,
                                            this.__bytesTotal = t.bytesTotal,
                                            this.__prevPlayState = null,
                                            this.__m3u8 = t.type === y.VideoType.M3U8,
                                            this.__rtmp = t.type === y.VideoType.RTMP,
                                            this.__type = t.type,
                                            this.__metaloaded = !0,
                                            this.metaDataLoaded = !0,
                                            this.doPolling()
                                        var o = this
                                        if (!o.cover) break
                                        setTimeout(function() {
                                                o.cover && (o.owner.removeChild(o.cover), o.cover = null)
                                            },
                                            500)
                                        break
                                    case 'playState':
                                        this.playState = t.playState,
                                            t.playState == A.PlayStates.PLAYING ? (this.__playing = !0, this.__stopped = !1, i.type = p.MSG.Play) : t.playState == A.PlayStates.PAUSED ? (this.__playing = !1, this.__stopped = !1, i.type = p.MSG.Pause) : t.playState == A.PlayStates.STOP ? (this.__playing = !1, this.__stopped = !0, i.type = p.MSG.Ended, this.__prevPlayState = null, this.options.live && (this.metaDataLoaded = !1)) : t.playState == A.PlayStates.IDLE && (this.__playing = !1, this.__stopped = !0, i.type = p.MSG.Ended)
                                        break
                                    case 'seekState':
                                        if (this.seekState = t.seekState, !this.__metaloaded) return
                                        if (t.seekState == A.SeekStates.SEEKING) i.type = p.MSG.Seeking
                                        else {
                                            if (t.seekState != A.SeekStates.SEEKED) return
                                            this.__m3u8 || this.options.live || t.playState != A.PlayStates.STOP || (this.play(), this.__prevPlayState = t.playState),
                                                this.__m3u8 && (i.type = p.MSG.Seeked)
                                        }
                                        break
                                    case 'netStatus':
                                        this.options.live || (t.code == 'NetStream.Buffer.Full' ? (this.__prevPlayState == A.PlayStates.PAUSED || this.__prevPlayState == A.PlayStates.STOP, this.__prevPlayState = null, i.type = p.MSG.Seeked) : t.code == 'NetStream.Seek.Complete'),
                                            t.code == 'NetConnection.Connect.Closed' && (this.options.src.includes('rtmp://') ? this.playState == A.PlayStates.STOP ? (i.type = 'error', t = {
                                                code: 13,
                                                reason: t.code
                                            }) : (i.type = 'error', t = {
                                                code: 1002,
                                                reason: t.code
                                            }) : this.playState = A.PlayStates.IDLE),
                                            t.code != 'NetStream.Play.Stop' && t.code != 'NetConnection.Connect.Success' && t.code != 'NetConnection.Connect.Failed' || (this.playState = A.PlayStates.IDLE)
                                        break
                                    case 'mediaTime':
                                        this.__videoWidth = t.videoWidth,
                                            this.__videoHeight = t.videoHeight,
                                            i.type = p.MSG.TimeUpdate
                                        break
                                    case 'error':
                                        if (t.code == 'NetStream.Seek.InvalidTime') return this.currentTime(t.details), !1
                                        t.code == 'NetStream.Play.StreamNotFound' && this.pub({
                                            type: 'netStatus',
                                            src: this,
                                            ts: i.ts,
                                            detail: t
                                        })
                                        var n = isNaN(parseInt(t.code)) ? 1002 : t.code
                                        var r = isNaN(parseInt(t.code)) ? t.code : t.msg
                                        var s = r.match(/#(\d+)/)
                                        s && s[1] && (n = s[1]),
                                            t = {
                                                code: n,
                                                reason: r || ''
                                            },
                                            this.metaDataLoaded = !1
                                }
                                const a = e == 'printLog' || e == 'canPlay';
                                !a && this.pub({
                                    type: i.type,
                                    src: this,
                                    ts: i.ts,
                                    detail: t
                                })
                            } catch (t) {
                                y.console.error(e + ' ' + i.type, t)
                            }
                        },
                        t.prototype.handleMsg = function(e) {},
                        t.prototype.videoWidth = function() {
                            return this.__videoWidth
                        },
                        t.prototype.videoHeight = function() {
                            return this.__videoHeight
                        },
                        t.prototype.width = function(e) {
                            return typeof e === 'undefined' ? this.el && this.el.width : (e = '100%', this.el && (this.el.width = e))
                        },
                        t.prototype.height = function(e) {
                            return typeof e === 'undefined' ? this.el && this.el.height : (e = '100%', this.el && (this.el.height = e))
                        },
                        t.prototype.play = function(e) {
                            this.playState == A.PlayStates.PAUSED || this.playState == A.PlayStates.PLAYING || e ? this.el.playerResume() : this.playState != A.PlayStates.PLAYING && this.el.playerPlay()
                        },
                        t.prototype.togglePlay = function() {
                            if (this.metaDataLoaded)
                                if (this.playState == A.PlayStates.PAUSED) this.el.playerResume()
                            else if (this.playState == A.PlayStates.PLAYING) this.el.playerPause()
                            else if (this.playState == A.PlayStates.STOP) this.currentTime(0),
                                this.el.playerResume()
                            else try {
                                this.el.playerPlay()
                            } catch (e) {
                                console.warn('Flash 调用失败，请检查Flash是否启用成功')
                            } else this.player.load()
                        },
                        t.prototype.pause = function() {
                            this.el.playerPause()
                        },
                        t.prototype.stop = function() {
                            this.el.playerStop()
                        },
                        t.prototype.paused = function() {
                            return !this.__playing
                        },
                        t.prototype.buffered = function() {
                            let e
                            return this.__m3u8 ? this.__buffered || 0 : (e = (this.__bytesloaded || 0) / (this.__bytesTotal || 1), this.duration() * e)
                        },
                        t.prototype.currentTime = function(e) {
                            return typeof e === 'undefined' ? this.el.getPosition() : void this.el.playerSeek(e)
                        },
                        t.prototype.duration = function() {
                            return this.__duration
                        },
                        t.prototype.mute = function(e) {
                            return typeof e === 'undefined' ? this.volume() == 0 : void this.volume(e ? 0 : this.__lastVol)
                        },
                        t.prototype.volume = function(e) {
                            return typeof e === 'undefined' ? this.el && this.el.getState().volume : (this.el && this.el.playerVolume(e), e != 0 && (this.__lastVol = e), this.options.volume = e, void this.pub({
                                type: p.MSG.VolumeChange,
                                src: this,
                                ts: +new Date
                            }))
                        },
                        t.prototype.fullscreen = function(e) {
                            return y.doFullscreen(this.player, e, this.owner)
                        },
                        t.prototype.load = function(e, t) {
                            this.pub({
                                    type: p.MSG.Load,
                                    src: this,
                                    ts: +new Date,
                                    detail: {
                                        src: e,
                                        type: t
                                    }
                                }),
                                this.el && this.el.playerLoad(e)
                        },
                        t.prototype.playing = function() {
                            return this.el && this.el.getState && this.el.getState().playState === A.PlayStates.PLAYING
                        },
                        t.prototype.type = function() {
                            return this.__type
                        },
                        t.prototype.state = function() {
                            return this.playState
                        },
                        t
                }(u.default)
                t.default = w
            },
            function(e, t, i) {
                'use strict'

                function o(e) {
                    if (e && e.__esModule) return e
                    const t = {}
                    if (e != null)
                        for (const i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
                    return t.default = e,
                        t
                }

                function n(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }

                function r(e, t) {
                    if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function')
                }

                function s(e, t) {
                    if (!e) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called')
                    return !t || typeof t !== 'object' && typeof t !== 'function' ? e : t
                }

                function a(e, t) {
                    if (typeof t !== 'function' && t !== null) throw new TypeError('Super expression must either be null or a function, not ' + typeof t)
                    e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }),
                        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }
                t.__esModule = !0
                const l = i(24)
                const c = n(l)
                const u = i(28)
                const p = n(u)
                const h = i(29)
                const d = n(h)
                const f = i(30)
                const y = i(31)
                const v = n(y)
                const A = i(32)
                const m = n(A)
                const g = i(33)
                const w = n(g)
                const b = i(34)
                const M = n(b)
                const S = i(4)
                const I = i(2)
                const E = o(I)
                const _ = i(3)
                const T = o(_)
                const D = i(1)
                const L = o(D)
                const C = function(e) {
                    function t(i) {
                        return r(this, t),
                            s(this, e.call(this, i, 'Panel'))
                    }
                    return a(t, e),
                        t.prototype.render = function(t) {
                            return this.createEl('div', {
                                    class: 'vcp-controls-panel'
                                }),
                                this.el.appendChild(E.createEl('div', {
                                    class: 'vcp-panel-bg'
                                })),
                                this.playToggle = new p.default(this.player),
                                this.playToggle.render(this.el),
                                this.timelabel = new m.default(this.player),
                                this.timelabel.render(this.el),
                                this.timeline = new v.default(this.player),
                                this.timeline.render(this.el),
                                this.options.fullscreenEnabled === !0 && (this.fullscreen = new d.default(this.player), this.fullscreen.render(this.el)),
                                L.IS_MOBILE || (this.volume = new w.default(this.player), this.volume.render(this.el)),
                                this.options.videoSource && this.options.videoSource.definitions.length > 1 && !L.IS_MOBILE && (this.claritySwitcher = new M.default(this.player), this.claritySwitcher.render(this.el)),
                                e.prototype.render.call(this, t)
                        },
                        t.prototype.setup = function() {
                            const e = T.bind(this, this.handleMsg)
                            this.sub(f.MSG.Changing, this.volume, e),
                                this.sub(f.MSG.Changed, this.timeline.progress, e),
                                this.sub(S.MSG.TimeUpdate, this.player.video, e),
                                this.sub(S.MSG.Progress, this.player.video, e),
                                this.sub(S.MSG.MetaLoaded, this.player.video, e),
                                this.sub(S.MSG.Pause, this.player.video, e),
                                this.sub(S.MSG.Play, this.player.video, e),
                                this.sub(S.MSG.Ended, this.player.video, e)
                        },
                        t.prototype.handleMsg = function(e) {
                            switch (e.type) {
                                case S.MSG.MetaLoaded:
                                    this.timeline.percent(this.player.percent()),
                                        this.timeline.buffered(this.player.buffered()),
                                        this.player.volume(typeof this.options.volume === 'undefined' ? .5 : this.options.volume), !this.options.autoplay && this.show()
                                    break
                                case S.MSG.TimeUpdate:
                                    this.timeline.scrubbing || this.timeline.percent(this.player.percent())
                                    break
                                case S.MSG.Pause:
                                    this.show()
                                    break
                                case S.MSG.Play:
                                    this.hide()
                                    break
                                case S.MSG.Progress:
                                    this.timeline.buffered(this.player.buffered())
                                    break
                                case f.MSG.Changed:
                                    e.src === this.timeline.progress && this.player.percent(this.timeline.percent())
                                    break
                                case S.MSG.Ended:
                                    this.show()
                            }
                        },
                        t.prototype.toggle = function() {
                            E.hasClass(this.el, 'show') ? this.hide() : this.show()
                        },
                        t.prototype.show = function() {
                            E.hasClass(this.el, 'hide') && (E.removeClass(this.el, 'hide'), E.addClass(this.el, 'show'))
                        },
                        t.prototype.hide = function() {
                            E.removeClass(this.el, 'show'),
                                E.addClass(this.el, 'hide')
                        },
                        t
                }(c.default)
                t.default = C
            },
            function(e, t, i) {
                'use strict'

                function o(e) {
                    if (e && e.__esModule) return e
                    const t = {}
                    if (e != null)
                        for (const i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
                    return t.default = e,
                        t
                }

                function n(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }

                function r(e, t) {
                    if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function')
                }

                function s(e, t) {
                    if (!e) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called')
                    return !t || typeof t !== 'object' && typeof t !== 'function' ? e : t
                }

                function a(e, t) {
                    if (typeof t !== 'function' && t !== null) throw new TypeError('Super expression must either be null or a function, not ' + typeof t)
                    e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }),
                        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }
                t.__esModule = !0
                const l = i(24)
                const c = n(l)
                const u = i(2)
                const p = (o(u), i(4))
                const h = (o(p), i(3))
                const d = (o(h), i(25))
                const f = (o(d),
                    function(e) {
                        function t(i) {
                            return r(this, t),
                                s(this, e.call(this, i, 'PlayToggle'))
                        }
                        return a(t, e),
                            t.prototype.render = function(t) {
                                return this.createEl('div', {
                                        class: 'vcp-playtoggle'
                                    }),
                                    e.prototype.render.call(this, t)
                            },
                            t.prototype.setup = function() {
                                this.on('click', this.onClick)
                            },
                            t.prototype.onClick = function() {
                                this.player.togglePlay()
                            },
                            t.prototype.handleMsg = function(e) {
                                console.log('@' + this.name, e)
                            },
                            t
                    }(c.default))
                t.default = f
            },
            function(e, t, i) {
                'use strict'

                function o(e) {
                    if (e && e.__esModule) return e
                    const t = {}
                    if (e != null)
                        for (const i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
                    return t.default = e,
                        t
                }

                function n(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }

                function r(e, t) {
                    if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function')
                }

                function s(e, t) {
                    if (!e) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called')
                    return !t || typeof t !== 'object' && typeof t !== 'function' ? e : t
                }

                function a(e, t) {
                    if (typeof t !== 'function' && t !== null) throw new TypeError('Super expression must either be null or a function, not ' + typeof t)
                    e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }),
                        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }
                t.__esModule = !0
                const l = i(24)
                const c = n(l)
                const u = i(2)
                const p = (o(u), i(4))
                const h = (o(p), i(3))
                const d = o(h)
                const f = function(e) {
                    function t(i) {
                        return r(this, t),
                            s(this, e.call(this, i, 'FullscreenToggle'))
                    }
                    return a(t, e),
                        t.prototype.render = function(t) {
                            return this.createEl('div', {
                                    class: 'vcp-fullscreen-toggle'
                                }),
                                window.fsApi = d.FullscreenApi,
                                e.prototype.render.call(this, t)
                        },
                        t.prototype.setup = function() {
                            this.on('click', this.onClick)
                        },
                        t.prototype.onClick = function() {
                            this.player.fullscreen(!this.player.fullscreen())
                        },
                        t.prototype.handleMsg = function(e) {
                            console.log(t.name, e)
                        },
                        t
                }(c.default)
                t.default = f
            },
            function(e, t, i) {
                'use strict'

                function o(e) {
                    if (e && e.__esModule) return e
                    const t = {}
                    if (e != null)
                        for (const i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
                    return t.default = e,
                        t
                }

                function n(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }

                function r(e, t) {
                    if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function')
                }

                function s(e, t) {
                    if (!e) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called')
                    return !t || typeof t !== 'object' && typeof t !== 'function' ? e : t
                }

                function a(e, t) {
                    if (typeof t !== 'function' && t !== null) throw new TypeError('Super expression must either be null or a function, not ' + typeof t)
                    e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }),
                        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }
                t.__esModule = !0,
                    t.MSG = void 0
                const l = i(24)
                const c = n(l)
                const u = i(2)
                const p = o(u)
                const h = i(4)
                const d = (o(h), i(3))
                const f = (o(d), t.MSG = {
                    Changing: 'sliderchanging',
                    Changed: 'sliderchanged'
                })
                const y = function(e) {
                    function t(i, o) {
                        r(this, t)
                        const n = s(this, e.call(this, i, 'Slider'))
                        return n.vertical = o || !1,
                            n
                    }
                    return a(t, e),
                        t.prototype.render = function(t, i) {
                            const o = this.vertical ? 'vcp-slider-vertical' : 'vcp-slider'
                            return this.createEl('div', {
                                    class: o
                                }),
                                this.track = p.createEl('div', {
                                    class: 'vcp-slider-track'
                                }),
                                this.thumb = p.createEl('div', {
                                    class: 'vcp-slider-thumb'
                                }),
                                this.el.appendChild(this.track),
                                this.el.appendChild(this.thumb),
                                this.enabled = typeof i === 'undefined' || i,
                                e.prototype.render.call(this, t)
                        },
                        t.prototype.setup = function() {
                            this.enabled && (this.ownerDoc = document.body.ownerDocument, this.on('mousedown', this.mousedown), this.on('touchstart', this.mousedown))
                        },
                        t.prototype.handleMsg = function(e) {},
                        t.prototype.mousedown = function(e) {
                            return e.preventDefault && e.preventDefault(),
                                this.pos = p.findElPosition(this.el),
                                this.on(this.ownerDoc, 'mouseup', this.mouseup),
                                this.on(this.ownerDoc, 'mousemove', this.mousemove),
                                this.on(this.ownerDoc, 'touchend', this.mouseup),
                                this.on(this.ownerDoc, 'touchmove', this.mousemove),
                                this.mousemove(e), !1
                        },
                        t.prototype.mouseup = function(e) {
                            e.target || e.srcElement
                            this.off(this.ownerDoc, 'mouseup', this.mouseup),
                                this.off(this.ownerDoc, 'mousemove', this.mousemove),
                                this.off(this.ownerDoc, 'touchend', this.mouseup),
                                this.off(this.ownerDoc, 'touchmove', this.mousemove),
                                this.pub({
                                    type: f.Changed,
                                    src: this,
                                    private: !0
                                })
                        },
                        t.prototype.mousemove = function(e) {
                            const t = p.getPointerPosition(this.el, e, this.pos)
                            this.vertical ? (this.__percent = 1 - t.y, this.thumb.style.top = 100 * this.__percent + '%') : (this.__percent = t.x, this.thumb.style.left = 100 * this.__percent + '%'),
                                this.__percent = Number(this.__percent.toFixed(3)),
                                this.pub({
                                    type: f.Changing,
                                    src: this,
                                    private: !0
                                })
                        },
                        t.prototype.percent = function(e) {
                            return e || e == 0 ? (this.__percent = e, void(this.vertical ? this.thumb.style.top = 100 * this.__percent + '%' : this.thumb.style.left = 100 * this.__percent + '%')) : this.__percent
                        },
                        t
                }(c.default)
                t.default = y
            },
            function(e, t, i) {
                'use strict'

                function o(e) {
                    if (e && e.__esModule) return e
                    const t = {}
                    if (e != null)
                        for (const i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
                    return t.default = e,
                        t
                }

                function n(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }

                function r(e, t) {
                    if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function')
                }

                function s(e, t) {
                    if (!e) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called')
                    return !t || typeof t !== 'object' && typeof t !== 'function' ? e : t
                }

                function a(e, t) {
                    if (typeof t !== 'function' && t !== null) throw new TypeError('Super expression must either be null or a function, not ' + typeof t)
                    e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }),
                        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }
                t.__esModule = !0
                const l = i(30)
                const c = n(l)
                const u = i(24)
                const p = n(u)
                const h = i(2)
                const d = (o(h), i(3))
                const f = o(d)
                const y = function(e) {
                    function t(i) {
                        return r(this, t),
                            s(this, e.call(this, i, 'Timeline'))
                    }
                    return a(t, e),
                        t.prototype.render = function(t) {
                            return this.enabled = !this.options.live,
                                this.createEl('div', {
                                    class: 'vcp-timeline'
                                }),
                                this.progress = new c.default(this.player, !1),
                                this.progress.render(this.el, this.enabled),
                                this.track = this.progress.track,
                                this.enabled || (this.el.style.display = 'none'),
                                e.prototype.render.call(this, t)
                        },
                        t.prototype.setup = function() {
                            this.enabled && (this.sub(l.MSG.Changing, this.progress, f.bind(this, this.handleMsg)), this.sub(l.MSG.Changed, this.progress, f.bind(this, this.handleMsg)))
                        },
                        t.prototype.handleMsg = function(e) {
                            e.type === l.MSG.Changing ? (this.scrubbing = !0, this.syncLabel(this.percent())) : e.type === l.MSG.Changed && (this.scrubbing = !1)
                        },
                        t.prototype.syncLabel = function(e) {
                            const t = this.player.duration()
                            e = Math.min(e, 1)
                            let i = ''
                            t && (i = f.convertTime(e * t) + ' / ' + f.convertTime(t)),
                                this.pub({
                                    type: 'timelabel',
                                    src: 'timeline',
                                    label: i,
                                    private: !0
                                })
                        },
                        t.prototype.buffered = function(e) {
                            this.enabled && (e = Math.min(e, 1), this.__buffered = e, this.track.style.width = 100 * e + '%')
                        },
                        t.prototype.percent = function(e) {
                            if (this.enabled) return typeof e === 'undefined' ? this.progress.percent() || 0 : (e = Math.min(e, 1), this.syncLabel(e), this.__buffered < e && this.buffered(this.player.buffered()), this.progress.percent(e))
                        },
                        t
                }(p.default)
                t.default = y
            },
            function(e, t, i) {
                'use strict'

                function o(e) {
                    if (e && e.__esModule) return e
                    const t = {}
                    if (e != null)
                        for (const i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
                    return t.default = e,
                        t
                }

                function n(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }

                function r(e, t) {
                    if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function')
                }

                function s(e, t) {
                    if (!e) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called')
                    return !t || typeof t !== 'object' && typeof t !== 'function' ? e : t
                }

                function a(e, t) {
                    if (typeof t !== 'function' && t !== null) throw new TypeError('Super expression must either be null or a function, not ' + typeof t)
                    e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }),
                        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }
                t.__esModule = !0
                const l = i(30)
                const c = (n(l), i(24))
                const u = n(c)
                const p = i(2)
                const h = (o(p), i(3))
                const d = o(h)
                const f = function(e) {
                    function t(i) {
                        return r(this, t),
                            s(this, e.call(this, i, 'Timelabel'))
                    }
                    return a(t, e),
                        t.prototype.render = function(t) {
                            return this.createEl('span', {
                                    class: 'vcp-timelabel'
                                }),
                                e.prototype.render.call(this, t)
                        },
                        t.prototype.setup = function() {
                            this.sub('timelabel', 'timeline', d.bind(this, this.handleMsg))
                        },
                        t.prototype.handleMsg = function(e) {
                            this.el.innerHTML = e.label
                        },
                        t
                }(u.default)
                t.default = f
            },
            function(e, t, i) {
                'use strict'

                function o(e) {
                    if (e && e.__esModule) return e
                    const t = {}
                    if (e != null)
                        for (const i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
                    return t.default = e,
                        t
                }

                function n(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }

                function r(e, t) {
                    if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function')
                }

                function s(e, t) {
                    if (!e) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called')
                    return !t || typeof t !== 'object' && typeof t !== 'function' ? e : t
                }

                function a(e, t) {
                    if (typeof t !== 'function' && t !== null) throw new TypeError('Super expression must either be null or a function, not ' + typeof t)
                    e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }),
                        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }
                t.__esModule = !0
                const l = i(30)
                const c = n(l)
                const u = i(24)
                const p = n(u)
                const h = i(2)
                const d = o(h)
                const f = i(3)
                const y = o(f)
                const v = i(4)
                const A = function(e) {
                    function t(i) {
                        return r(this, t),
                            s(this, e.call(this, i, 'Volume'))
                    }
                    return a(t, e),
                        t.prototype.render = function(t) {
                            return this.createEl('div', {
                                    class: 'vcp-volume'
                                }),
                                this.bg = d.createEl('div', {
                                    class: 'vcp-volume-bg'
                                }),
                                this.el.appendChild(this.bg),
                                this.volume = new c.default(this.player, !0),
                                this.volume.render(this.el),
                                this.track = this.volume.track,
                                this.icon = d.createEl('span', {
                                    class: 'vcp-volume-icon'
                                }),
                                this.el.appendChild(this.icon),
                                e.prototype.render.call(this, t)
                        },
                        t.prototype.setup = function() {
                            this.sub(l.MSG.Changing, this.volume, y.bind(this, this.handleMsg)),
                                this.sub(l.MSG.Changed, this.volume, y.bind(this, this.handleMsg)),
                                this.sub(v.MSG.VolumeChange, this.player.video, y.bind(this, this.handleMsg)),
                                this.on(this.icon, 'click', this.toggleMute)
                        },
                        t.prototype.handleMsg = function(e) {
                            switch (e.type) {
                                case l.MSG.Changing:
                                    this.syncTrack(this.percent())
                                    break
                                case l.MSG.Changed:
                                    this.percent(this.percent())
                                    break
                                case v.MSG.VolumeChange:
                                    var t = this.player.volume()
                                    this.syncTrack(t),
                                        t == 0 ? this.syncMute(!0) : t > 0 && this.__muted && this.syncMute(!1)
                            }
                        },
                        t.prototype.toggleMute = function(e) {
                            const t = !this.player.mute()
                            this.player.mute(t)
                        },
                        t.prototype.syncMute = function(e) {
                            e ? d.addClass(this.el, 'vcp-volume-muted') : d.removeClass(this.el, 'vcp-volume-muted'),
                                this.__muted = e
                        },
                        t.prototype.syncTrack = function(e) {
                            this.track.style.height = 100 * e + '%',
                                this.volume.percent(1 - e)
                        },
                        t.prototype.percent = function(e) {
                            return typeof e === 'undefined' ? 1 - this.volume.percent() || 0 : (this.player.volume(e), e)
                        },
                        t
                }(p.default)
                t.default = A
            },
            function(e, t, i) {
                'use strict'

                function o(e) {
                    if (e && e.__esModule) return e
                    const t = {}
                    if (e != null)
                        for (const i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
                    return t.default = e,
                        t
                }

                function n(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }

                function r(e, t) {
                    if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function')
                }

                function s(e, t) {
                    if (!e) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called')
                    return !t || typeof t !== 'object' && typeof t !== 'function' ? e : t
                }

                function a(e, t) {
                    if (typeof t !== 'function' && t !== null) throw new TypeError('Super expression must either be null or a function, not ' + typeof t)
                    e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }),
                        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }
                t.__esModule = !0
                const l = i(24)
                const c = n(l)
                const u = i(2)
                const p = o(u)
                const h = i(3)
                const d = o(h)
                let f = {
                    od: '超清',
                    hd: '高清',
                    sd: '标清'
                }
                const y = function(e) {
                    function t(i) {
                        r(this, t)
                        const o = s(this, e.call(this, i, 'ClaritySwitcher'))
                        return f = d.extend({},
                                i.options.clarityLabel, f),
                            i.claritySwitcher = o,
                            o
                    }
                    return a(t, e),
                        t.prototype.render = function(t) {
                            this.show = !1,
                                this.createEl('div', {
                                    class: 'vcp-clarityswitcher'
                                }),
                                this.current = p.createEl('a', {
                                    class: 'vcp-vertical-switcher-current'
                                }),
                                this.container = p.createEl('div', {
                                    class: 'vcp-vertical-switcher-container'
                                }),
                                this.items = [],
                                this.currentItem = ''
                            const i = this.options.videoSource
                            this.current.innerHTML = f[i.curDef],
                                this.el.appendChild(this.current)
                            for (let o = 0; o < i.definitions.length; o++) {
                                const n = p.createEl('a', {
                                    class: 'vcp-vertical-switcher-item'
                                })
                                n.innerHTML = f[i.definitions[o]],
                                    i.definitions[o] == i.curDef && (p.addClass(n, 'current'), this.currentItem = n),
                                    n.setAttribute('data-def', i.definitions[o]),
                                    this.items.push(n),
                                    this.container.appendChild(n)
                            }
                            return this.el.appendChild(this.container),
                                e.prototype.render.call(this, t)
                        },
                        t.prototype.setup = function() {
                            this.on('click', this.onClick),
                                this.on('mouseenter', this.onMouseEnter),
                                this.on('mouseleave', this.onMouseLeave)
                        },
                        t.prototype.onClick = function(e) {
                            const t = e.target.getAttribute('data-def')
                            t ? (this.current.innerHTML = f[t], p.removeClass(this.currentItem, 'current'), p.addClass(e.target, 'current'), this.currentItem = e.target, this.player._switchClarity(t)) : !this.show
                        },
                        t.prototype.onMouseLeave = function() {
                            this.container.style.display = 'none',
                                this.show = !1
                        },
                        t.prototype.onMouseEnter = function() {
                            this.container.style.display = 'block',
                                this.show = !0
                        },
                        t.prototype.setClarity = function(e) {
                            e && (this.current.innerHTML = f[e], p.removeClass(document.querySelector('.vcp-vertical-switcher-item.current'), 'current'), p.addClass(document.querySelector('.vcp-vertical-switcher-item[data-def="' + e + '"]'), 'current'), this.currentItem = document.querySelector('.vcp-vertical-switcher-item[data-def="' + e + '"]'), this.player._switchClarity(e))
                        },
                        t
                }(c.default)
                t.default = y
            },
            function(e, t, i) {
                'use strict'

                function o(e) {
                    if (e && e.__esModule) return e
                    const t = {}
                    if (e != null)
                        for (const i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
                    return t.default = e,
                        t
                }

                function n(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }

                function r(e, t) {
                    if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function')
                }

                function s(e, t) {
                    if (!e) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called')
                    return !t || typeof t !== 'object' && typeof t !== 'function' ? e : t
                }

                function a(e, t) {
                    if (typeof t !== 'function' && t !== null) throw new TypeError('Super expression must either be null or a function, not ' + typeof t)
                    e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }),
                        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }
                t.__esModule = !0
                const l = i(24)
                const c = n(l)
                const u = i(1)
                const p = o(u)
                const h = function(e) {
                    function t(i) {
                        return r(this, t),
                            s(this, e.call(this, i, 'BigPlay'))
                    }
                    return a(t, e),
                        t.prototype.render = function(t) {
                            return this.createEl('div', {
                                    class: 'vcp-bigplay'
                                }),
                                e.prototype.render.call(this, t)
                        },
                        t.prototype.setup = function() {
                            this.on('click', this.onClick)
                        },
                        t.prototype.onClick = function() {
                            const e = this.player.video
                            return p.IS_MOBILE && !e.paused() ? this.player.panel && this.player.panel.toggle() : void this.player.togglePlay()
                        },
                        t.prototype.handleMsg = function(e) {
                            console.log('@' + this.name, e)
                        },
                        t
                }(c.default)
                t.default = h
            },
            function(e, t, i) {
                'use strict'

                function o(e) {
                    if (e && e.__esModule) return e
                    const t = {}
                    if (e != null)
                        for (const i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
                    return t.default = e,
                        t
                }

                function n(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }

                function r(e, t) {
                    if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function')
                }

                function s(e, t) {
                    if (!e) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called')
                    return !t || typeof t !== 'object' && typeof t !== 'function' ? e : t
                }

                function a(e, t) {
                    if (typeof t !== 'function' && t !== null) throw new TypeError('Super expression must either be null or a function, not ' + typeof t)
                    e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }),
                        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }
                t.__esModule = !0
                const l = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ?
                    function(e) {
                        return typeof e
                    } : function(e) {
                        return e && typeof Symbol === 'function' && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e
                    }
                const c = i(24)
                const u = n(c)
                const p = i(2)
                const h = o(p)
                const d = i(3)
                const f = o(d)
                const y = i(1)
                const v = o(y)
                const A = i(4)
                const m = function(e) {
                    function t(i) {
                        r(this, t)
                        const o = s(this, e.call(this, i, 'Poster'))
                        return o.options.poster && l(o.options.poster) == 'object' ? o.poster = o.options.poster : typeof o.options.poster === 'string' ? o.poster = {
                                src: o.options.poster
                            } : o.poster = {},
                            o
                    }
                    return a(t, e),
                        t.prototype.render = function(t) {
                            this.createEl('div', {
                                    class: 'vcp-poster'
                                }),
                                this.hide()
                            const i = this.poster
                            if (i) {
                                this.pic = h.createEl('img', {
                                    class: 'vcp-poster-pic'
                                })
                                const o = this.poster.style
                                switch (o) {
                                    case 'stretch':
                                        h.addClass(this.pic, 'stretch')
                                        break
                                    case 'cover':
                                        h.addClass(this.pic, 'cover')
                                        break
                                    default:
                                        h.addClass(this.pic, 'default')
                                }
                                this.el.appendChild(this.pic)
                            }
                            return e.prototype.render.call(this, t)
                        },
                        t.prototype.setup = function() {
                            this.on('click', this.onClick),
                                this.sub(A.MSG.Load, this.player.video, f.bind(this, this.handleMsg)),
                                this.sub(A.MSG.MetaLoaded, this.player.video, f.bind(this, this.handleMsg)),
                                this.sub(A.MSG.Play, this.player.video, f.bind(this, this.handleMsg)),
                                this.sub(A.MSG.Pause, this.player.video, f.bind(this, this.handleMsg)),
                                this.sub(A.MSG.Ended, this.player.video, f.bind(this, this.handleMsg)),
                                this.sub(A.MSG.Error, this.player.video, f.bind(this, this.handleMsg))
                        },
                        t.prototype.onClick = function() {
                            this.pub({
                                    type: 'click',
                                    src: this
                                }),
                                (v.IS_SAFARI && parseInt(v.SAFARI_VERSION) > 10 || v.IOS_VERSION > 10) && this.player.options.controls == 'system' && this.player.togglePlay()
                        },
                        t.prototype.handleMsg = function(e) {
                            switch (e.type) {
                                case A.MSG.Load:
                                    this.__loaded = !1,
                                        this.setPoster(this.poster.start)
                                    break
                                case A.MSG.MetaLoaded:
                                    if (this.__loaded = !0, !this.player.playing()) break
                                    this.hide()
                                case A.MSG.Play:
                                    if (!this.__loaded) break
                                    this.hide()
                                    break
                                case A.MSG.Pause:
                                    if (!this.__loaded) break
                                    this.options.pausePosterEnabled === !0 && this.setPoster(this.poster.pause)
                                    break
                                case A.MSG.Ended:
                                    if (!this.__loaded) break
                                    break
                                case A.MSG.Error:
                                    if (!this.__loaded) break
                            }
                        },
                        t.prototype.setPoster = function(e) {
                            if (e = e || this.poster.src) {
                                this.__preload && (this.__preload.onload = null),
                                    this.__preload = new Image
                                const t = this.__preload
                                this.hide()
                                const i = this
                                t.onload = function() {
                                        if (i.pic.src !== t.src && (i.pic.src = t.src, i.show(), !f.supportStyle('transform'))) {
                                            const e = i.poster.style == 'stretch'
                                            if (e) return
                                            const o = i.poster.style == 'cover' ? i.options.width / (t.width / t.height) : t.height
                                            const n = '-' + i.options.width / 2 + 'px'
                                            const r = '-' + o / 2 + 'px'
                                            i.pic.style.cssText = 'left: 50%; top: 50%; margin-left: ' + n + '; margin-top: ' + r + ';'
                                        }
                                    },
                                    t.src = e
                            }
                        },
                        t.prototype.toggle = function(e) {
                            clearTimeout(this.__tid)
                            const t = this
                            this.__tid = setTimeout(function() {
                                    t.el.style.display = e
                                },
                                100)
                        },
                        t.prototype.hide = function() {
                            this.__preload && (this.__preload.onload = null),
                                this.toggle('none')
                        },
                        t.prototype.show = function() {
                            this.toggle('block')
                        },
                        t
                }(u.default)
                t.default = m
            },
            function(e, t, i) {
                'use strict'

                function o(e) {
                    if (e && e.__esModule) return e
                    const t = {}
                    if (e != null)
                        for (const i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
                    return t.default = e,
                        t
                }

                function n(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }

                function r(e, t) {
                    if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function')
                }

                function s(e, t) {
                    if (!e) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called')
                    return !t || typeof t !== 'object' && typeof t !== 'function' ? e : t
                }

                function a(e, t) {
                    if (typeof t !== 'function' && t !== null) throw new TypeError('Super expression must either be null or a function, not ' + typeof t)
                    e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }),
                        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }
                t.__esModule = !0
                const l = i(24)
                const c = n(l)
                const u = i(2)
                const p = (o(u), i(4))
                const h = (o(p), i(3))
                const d = (o(h),
                    function(e) {
                        function t(i) {
                            r(this, t)
                            const o = s(this, e.call(this, i, 'Loading'))
                            return o.timeSeed = null,
                                o
                        }
                        return a(t, e),
                            t.prototype.render = function(t) {
                                const el = this.createEl('div', {
                                    class: 'vcp-loading'
                                })
                                el.style.visibility = 'hidden'
                                return el,
                                    e.prototype.render.call(this, t)
                            },
                            t.prototype.setup = function() {},
                            t.prototype.handleMsg = function(e) {},
                            t.prototype.show = function() {
                                if (this.options.showLoading !== !1) {
                                    const e = 500
                                    const t = this
                                    this.timeSeed = setTimeout(function() {
                                            t.el.style.display = 'block'
                                        },
                                        e)
                                }
                            },
                            t.prototype.hide = function() {
                                this.timeSeed && (clearTimeout(this.timeSeed), this.timeSeed = null),
                                    this.el.style.display = 'none'
                            },
                            t
                    }(c.default))
                t.default = d
            },
            function(e, t, i) {
                'use strict'

                function o(e) {
                    if (e && e.__esModule) return e
                    const t = {}
                    if (e != null)
                        for (const i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
                    return t.default = e,
                        t
                }

                function n(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }

                function r(e, t) {
                    if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function')
                }

                function s(e, t) {
                    if (!e) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called')
                    return !t || typeof t !== 'object' && typeof t !== 'function' ? e : t
                }

                function a(e, t) {
                    if (typeof t !== 'function' && t !== null) throw new TypeError('Super expression must either be null or a function, not ' + typeof t)
                    e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }),
                        t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }
                t.__esModule = !0
                const l = i(24)
                const c = n(l)
                const u = i(2)
                const p = (o(u), i(4))
                const h = (o(p), i(3))
                const d = o(h)
                const f = {
                    EnvError: '当前系统环境不支持播放该视频格式',
                    EnvFlashError: '当前系统环境不支持播放该视频格式',
                    VideoSourceError: '获取视频失败，请检查播放链接是否有效',
                    NetworkError: '网络错误，请检查网络配置或者播放链接是否正确',
                    VideoDecodeError: '视频解码错误',
                    ArgumentError: '使用参数有误，请检查播放器调用代码',
                    UrlEmpty: '请填写视频播放地址',
                    FileProtocol: '请勿在file协议下使用播放器，可能会导致视频无法播放',
                    LiveFinish: '直播已结束,请稍后再来',
                    CrossDomainError: '无法加载视频文件，跨域访问被拒绝',
                    Ie9IframeFullscreenError: '在IE9中用iframe引用的实例无法支持全屏',
                    WebrtcEnvError: '当前环境不支持 WebRTC 格式文件播放',
                    WebrtcApiError: '调用 WebRTC 接口失败',
                    WebrtcPullStreamError: '调用拉流接口失败',
                    WebrtcConnectError: '连接服务器失败，并且连接重试次数已超过设定值',
                    WebrtcDecodeError: 'WebRTC 解码失败'
                }
                const y = {
                    FileProtocol: [10],
                    ArgumentError: [11],
                    UrlEmpty: [12],
                    LiveFinish: [13],
                    VideoSourceError: [1002, 2032],
                    EnvError: [4, 5],
                    NetworkError: [1001, 1, 2],
                    VideoDecodeError: [3],
                    CrossDomainError: [2048],
                    Ie9IframeFullscreenError: [10001],
                    WebrtcEnvError: [2e3],
                    WebrtcApiError: [2001],
                    WebrtcPullStreamError: [2002],
                    WebrtcConnectError: [2003],
                    WebrtcDecodeError: [2004]
                }
                const v = function(e) {
                    function t(i) {
                        r(this, t)
                        const o = s(this, e.call(this, i, 'ErrorTips'))
                        o.customTips = d.extend({},
                            f, o.options.wording)
                        for (const n in y)
                            for (let a = 0; a < y[n].length; a++) {
                                const l = y[n][a]
                                o.customTips[l] = o.customTips[l] || o.customTips[n]
                            }
                        return o
                    }
                    return a(t, e),
                        t.prototype.render = function(t) {
                            return this.createEl('div', {
                                    class: 'vcp-error-tips'
                                }),
                                e.prototype.render.call(this, t)
                        },
                        t.prototype.setup = function() {},
                        t.prototype.handleMsg = function(e) {},
                        t.prototype.show = function(e) {
                            this.el.style.display = 'block'
                            let t = void 0
                            if (typeof e === 'string') t = e
                            else {
                                const i = this.customTips[e.code] || e.reason
                                t = '[' + e.code + ']' + i
                            }
                            this.el.innerHTML = d.escapeHTML(t)
                        },
                        t.prototype.hide = function() {
                            this.el.style.display = 'none'
                        },
                        t.prototype.clear = function() {
                            this.el.innerHTML = '',
                                this.hide()
                        },
                        t
                }(c.default)
                t.default = v
            },
            function(e, t, i) {
                'use strict'

                function o(e) {
                    if (e && e.__esModule) return e
                    const t = {}
                    if (e != null)
                        for (const i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
                    return t.default = e,
                        t
                }

                function n(e, t) {
                    if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function')
                }
                t.__esModule = !0
                const r = i(1)
                const s = o(r)
                const a = i(2)
                const l = o(a)
                const c = i(3)
                const u = function() {
                    function e(t, i) {
                        n(this, e),
                            this.player = t,
                            this.options = i,
                            this.load()
                    }
                    return e.prototype.load = function() {
                            l.loadScript((0, c.unifyProtocol)('//pingjs.qq.com/h5/stats.js?v2.0.4'), null, {
                                name: 'MTAH5',
                                sid: '500376528',
                                cid: '500383222'
                            }, !0)
                        },
                        e.prototype.report = function() {
                            window.MtaH5 && (this.player.duration() == 0 || this.player.duration() == 1 / 0 ? MtaH5.clickStat('live', {
                                live: 'true'
                            }) : MtaH5.clickStat('vod', {
                                vod: 'true'
                            }))
                        },
                        e.prototype.reportFlash = function() {
                            if (window.MtaH5) {
                                const e = this.options.videoSource
                                const t = (0, c.getFormat)(e)
                                const i = {
                                    browser: s.BROWSER_TYPE,
                                    mse: !!s.IS_ENABLED_MSE,
                                    format: t
                                }
                                MtaH5.clickStat('flash', i)
                            }
                        },
                        e
                }()
                t.default = u
            }
        ])
    })