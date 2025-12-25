// ==UserScript==
// @name         Torrent Mod Toolkit
// @version      0.2
// @description  Common actions for torrent mods
// @icon         https://raw.githubusercontent.com/xzin-CoRK/torrent-mod-toolkit/refs/heads/main/hammer.png
// @author       xzin

// @match        https://aither.cc/torrents/*
// @exclude      https://aither.cc/torrents/similar/*
// @exclude      https://aither.cc/torrents/moderation
// @match        https://blutopia.cc/torrents/*
// @exclude      https://blutopia.cc/torrents/similar/*
// @exclude      https://blutopia.cc/torrents/moderation
// @match        https://lst.gg/torrents/*
// @exclude      https://lst.gg/torrents/similar/*
// @exclude      https://lst.gg/torrents/moderation
// @match        https://upload.cx/torrents/*
// @exclude      https://upload.cx/torrents/similar/*
// @exclude      https://upload.cx/torrents/moderation
// @match        https://beyond-hd.me/torrents/*
// @match        https://hdbits.org/details.php?id=*
// @match        https://www.morethantv.me/torrents.php?id=*
// @match        https://avistaz.to/torrent/*
// @match        https://cinemaz.to/torrent/*
// @match        https://privatehd.to/torrent/*
// @match        https://filelist.io/details.php?id=*
// @match        https://anthelion.me/torrents.php?id=*&torrentid=*

// @grant        GM_setClipboard
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest

// @downloadURL https://openuserjs.org/install/xzin/Torrent_Mod_Toolkit.user.js
// @updateURL https://openuserjs.org/meta/xzin/Torrent_Mod_Toolkit.meta.js

// @license MIT
// ==/UserScript==

(function () {
    "use strict";

    const version = "0.2";

    var release_name;
    var mediainfo;
    var uniqueId;
    var file_structure;
    var imdbId;
    var home_tracker_link;
    var isHidden = false;

    const ATH_SEARCH_URL = "https://aither.cc/torrents?imdbId=";
    const AVISTAZ_SEARCH_URL = "https://avistaz.to/movies?search=&imdb=";
    const BHD_SEARCH_URL = "https://beyond-hd.me/torrents/all?search=&doSearch=Search&imdb=";
    const BLU_SEARCH_URL = "https://blutopia.cc/torrents?imdbId=";
    const BTN_SEARCH_URL = "https://broadcasthe.net/torrents.php?imdb=";
    const FL_SEARCH_URL = "https://filelist.io/browse.php?search=";
    const HDB_SEARCH_URL = "https://hdbits.org/browse.php?imdb=";
    const HDT_SEARCH_URL = "https://hd-torrents.org/torrents.php?active=0&options=2&search=";
    const HUNO_SEARCH_URL = "https://hawke.uno/torrents?imdbId=";
    const LST_SEARCH_URL = "https://lst.gg/torrents?imdbId=";
    const MTEAM_SEARCH_URL = "https://kp.m-team.cc/browse?keyword=https://www.imdb.com/title/";
    const MTV_SEARCH_URL = "https://www.morethantv.me/torrents/browse?searchtext=";
    const PHD_SEARCH_URL = "https://privatehd.to/movies?search=&imdb=";
    const PTP_SEARCH_URL = "https://passthepopcorn.me/torrents.php?imdb=";
    const ULCX_SEARCH_URL = "https://upload.cx/torrents?imdbId="

    const SRRDB_SEARCH_URL = `https://srrdb.com/browse/imdb:`;

    const homeTrackerSearchUrlMap = {
        // ATH
        "ATELiER": ATH_SEARCH_URL,
        "Headpatter" : ATH_SEARCH_URL,
        "Kitsune": ATH_SEARCH_URL,
        "NAN0": ATH_SEARCH_URL,
        "MainFrame": ATH_SEARCH_URL,

        //AVISTAZ
        "AppleTor" : AVISTAZ_SEARCH_URL,
        "DUSKLiGHT" : AVISTAZ_SEARCH_URL,
        "HBO" : AVISTAZ_SEARCH_URL,
        "MrHulk" : AVISTAZ_SEARCH_URL,

        // BHD
        "BeyondHD" : BHD_SEARCH_URL,
        "BMF": BHD_SEARCH_URL,
        "BHDStudio" : BHD_SEARCH_URL,
        "CRFW": BHD_SEARCH_URL,
        "decibeL": BHD_SEARCH_URL,
        "FLUX": BHD_SEARCH_URL,
        "FraMeSToR": BHD_SEARCH_URL,
        "HiFi": BHD_SEARCH_URL,
        "NCmt": BHD_SEARCH_URL,
        "W4NK3R" : BHD_SEARCH_URL,

        // BLU
        "BLURANiUM": BLU_SEARCH_URL,
        "BLUTONiUM": BLU_SEARCH_URL,
        "CultFilms™": BLU_SEARCH_URL,
        "CultFilms": BLU_SEARCH_URL,
        "PmP": BLU_SEARCH_URL,
        "Tux": BLU_SEARCH_URL,
        "WiLDCAT": BLU_SEARCH_URL,

        // BTN
        "BTN" : BTN_SEARCH_URL,
        "CMRG" : BTN_SEARCH_URL,
        "iT00NZ" : BTN_SEARCH_URL,
        "LAZY" : BTN_SEARCH_URL,
        "NTb" : BTN_SEARCH_URL,
        "RAWR" : BTN_SEARCH_URL,
        "TVSmash" : BTN_SEARCH_URL,

        // FL
        "playBD": FL_SEARCH_URL,
        "playHD": FL_SEARCH_URL,
        "playWEB": FL_SEARCH_URL,

        // HDB
        "CALiGARi" : HDB_SEARCH_URL,
        "CasStudio" : HDB_SEARCH_URL,
        "Chotab" : HDB_SEARCH_URL,
        "Cinefeel" : HDB_SEARCH_URL,
        "CtrlHD" : HDB_SEARCH_URL,
        "DON" : HDB_SEARCH_URL,
        "EA" : HDB_SEARCH_URL,
        "EbP" : HDB_SEARCH_URL,
        "HaB" : HDB_SEARCH_URL,
        "HDMaNiAcS" : HDB_SEARCH_URL,
        "HiP" : HDB_SEARCH_URL,
        "KHN" : HDB_SEARCH_URL,
        "LoRD" : HDB_SEARCH_URL,
        "monkee" : HDB_SEARCH_URL,
        "NTG" : HDB_SEARCH_URL,
        "REBORN" : HDB_SEARCH_URL,
        "RO" : HDB_SEARCH_URL,
        "SbR" : HDB_SEARCH_URL,
        "SiGMA" : HDB_SEARCH_URL,
        "Skazhutin" : HDB_SEARCH_URL,
        "TayTO" : HDB_SEARCH_URL,
        "ViSUM" : HDB_SEARCH_URL,
        "VietHD" : HDB_SEARCH_URL,
        "WiLF" : HDB_SEARCH_URL,
        "WiHD" : HDB_SEARCH_URL,
        "ZoroSenpai" : HDB_SEARCH_URL,
        "ZQ" : HDB_SEARCH_URL,

        // HDT
        "KRaLiMaRKo" : HDT_SEARCH_URL,
        "HDT" : HDT_SEARCH_URL,
        "HiDt" : HDT_SEARCH_URL,
        "SPHD" : HDT_SEARCH_URL,

        // HUNO
        "HONE" : HUNO_SEARCH_URL,

        // LST
        "coffee" : LST_SEARCH_URL,
        "L0ST" : LST_SEARCH_URL,
        "SQS" : LST_SEARCH_URL,

        // MTEAM
        "MTeam" : MTEAM_SEARCH_URL,
        "MWeb" : MTEAM_SEARCH_URL,

        // MTV
        "hallowed" : MTV_SEARCH_URL,
        "TEPES" : MTV_SEARCH_URL,
        "PiRAMiDHEAD" : MTV_SEARCH_URL,

        // PHD
        "EPSiLON" : PHD_SEARCH_URL,
        "TRiToN" : PHD_SEARCH_URL,

        // PTP
        "PTP" : PTP_SEARCH_URL,
        "HANDJOB" : PTP_SEARCH_URL,

        // ULCX
        "BLOOM" : ULCX_SEARCH_URL,
    };

    /*
    * Helper function to create a toast notification element
    */
    function setupToast() {
        if (document.getElementById("tmt-toast-container")) return;

        const container = document.createElement("div");
        container.id = "tmt-toast-container";
        document.body.appendChild(container);
    }

    /*
    * Helper function to display messages via toast
    */
    function showToast(message, duration = 2500) {
        const container = document.getElementById("tmt-toast-container");
        if (!container) return;

        const toast = document.createElement("div");
        toast.className = "tmt-toast";
        toast.textContent = message;

        container.appendChild(toast);

        // Trigger the CSS animation
        requestAnimationFrame(() => toast.classList.add("show"));

        // Remove after duration
        setTimeout(() => {
            toast.classList.remove("show");
            // remove from DOM after transition
            toast.addEventListener("transitionend", () => toast.remove(), { once: true });
        }, duration);
    }

    /*
    * Extract the unique ID from within mediainfo, if present
    */
    function extractUniqueId(mediainfo) {
        if (!mediainfo) return null;

        const match = mediainfo.match(/Unique\s+ID\s*[:\-]\s*([A-Za-z0-9]+(?:\.[A-Za-z0-9]+)?)/i);
        return match ? match[1].trim() : null;
    }


    /*
    * Inserts the toolkit into the DOM
    * It is necessary to have in its own function with the ability to re-render due to asynchronous nature of fetching mediainfo from HDB
    */
    function renderToolkit() {
        let existingToolkit = document.getElementById("torrentModToolkit");

        // Render element
        const toolkitDiv = document.createElement("div");
        toolkitDiv.id = "torrentModToolkit";

        let mediainfoDisabled = activeTemplate && mediainfo ? ``: ` disabled `;
        let uniqueIdDisabled = activeTemplate && uniqueId ? ``: ` disabled `;
        let fileStructureDisabled = activeTemplate && file_structure ? `` : ` disabled `;
        let homeTrackerDisabled = activeTemplate && home_tracker_link ? `` : ` disabled `;

        var mediainfoButtonHtml = `<button id="copyFullMediainfoBtn"` + mediainfoDisabled + `" >Copy mediainfo</button>`;
        var uniqueIdButtonHtml = `<button id="copyUniqueIDBtn"`+ uniqueIdDisabled +`">Copy Unique ID</button>`;
        var fileStructureButtonHtml = `<button id="copyFileStructureBtn"` + fileStructureDisabled + `>Copy file name(s)</button>`;
        var homeTrackerButtonHtml = `<button id="homeTrackerBtn"`+ homeTrackerDisabled +`>Go to home tracker</button>`;

        toolkitDiv.innerHTML = `
        <div class="hdr"><div class="center"><b>Torrent Mod Toolkit v` + version + `</b></div><button id="toggleToolkitBtn">▼</button></div>
        <div class="body">
        <div class="center pad">
          <a href="${PTP_SEARCH_URL + imdbId}" target="_blank"><img width="20" height="20" title="PTP" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADkAAAA5CAMAAAC7xnO3AAAAV1BMVEUAAAD///9oiM2CacFm5Mj/jGb842dn3auC3X/z82j/uWZw14xudcRwbsBmpdz83GZm4NBq26KP4Hrm9Wr/rmdmr91u2ZNmntln5L/902b/l2Zt1otnseEVRKmYAAAAeUlEQVRIx+3WtwqAMBCAYU2zpNlii+//nAZFCDooSIaQ+5fjhm89LoNCl7u+TpCvM8kopUNda81YVfVu78rS8rEtCkJI4/ZNKYSQkBJjfJerk4sv+SHnUxo1/ZMCJEiQIKOV8pKPe8s8aa317q3x7m2SxfUnxCWhAO24CSsei22B/wAAAABJRU5ErkJggg==" /></a>
          <a href="${BTN_SEARCH_URL + imdbId}" target="_blank"><img width="20" height="20" title="BTN" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAAJFBMVEUAAAAKfKcLodkJcJcKnNEKlMoKd6AKirsKc5wKhbQJkMQKga5GWjbDAAAAAXRSTlMAQObYZgAAAWJJREFUOMul0D1PwzAQBmCn0JSPJadKUImlsmCnyh9AkbsjlAjBVBbPZcrAAgvK2DVi6YIQmdj957DfxrGtBJbekNzdYzsXs72C8+H+iPP5X3AzCIdCDMP4H7jtH68fJ0VhIJhAzwPYYoRgHq6haTRwf2gOmJQlwG0ZdbBm7LLbYvIs0589LsuNXpXpsCDEcq6hrje7SnTzC7PmVCkDI13OLSCLiH4A9gZyfRIzoFTSnpy1kN+Zd0wEuBL5ElDgKgArHI2Ge7MjKUNomk8LrzjisWla+EJ9UFUdbBnu7tvCtQNc0QvqOE1XSO5xaQ6YlGwYEA6iuv4I4cHcJqBeh4BGH8a2oZQKYGIbF0qVPkQadgkR+fBMdI4k1pB40JURBVsigF1y5sCrYindlkhK+eTlMgnyNmZmFaH/3m1AWZlYEE2ReCPOKsQb4en/bOpFwoYFfRdT21+g7O9JWD8oTYntEb/z/32K0Kt3+AAAAABJRU5ErkJggg==" /></a>
          <a href="${HDB_SEARCH_URL + imdbId}" target="_blank"><img width="20" height="20" title="HDB" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAGFBMVEVPZHWjt8exxNNfdIV1ipuNorP+/v7Y3+RqcToTAAAA4ElEQVQoz6XITW6DMBCG4ZF8AkjcrkEh2RpNLgA22RvhsEZqZy6QmOt3DKpUWVlUyuufT3qgzvoHVFlQVOmU6W4fFFmvoJYpZep6Az+z9z5WMxFx4T3okrXW8VnS5UKLQJg5BB+fMvqTdIAwsg4hNmNyajYIvxDO3xncBaaR1nWl08jTNN2XAYaeUk3PgxtuAq5n51w8yQzutrg/IPPxlcH5IdDtsA0dHdiOr2jjoWNrZ3mAHaO9xmNLa6QHCrRsEeOhJeIGEQGzXoAyZn8qLYJSYIxRW2AUSOkzkNrl/X4ALOVfoodI6RkAAAAASUVORK5CYII=" /></a>
          <a href="${SRRDB_SEARCH_URL + imdbId}" target="_blank"><img width="20" height="20" title="srrDB" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAUVBMVEUAAAAAAAAAAAAAAAAAAAC7u7v///+ZzP/Mmf+Z/5n/mZn//2b/mWaMjIxymL6Ycr5yvnK+cnK+vky+ckxUcY1xVI1nZ2dUjVSNVFSNjTiNVDi2juC+AAAABHRSTlN9PL4AffGBGQAAAMlJREFUWMPtlzcOwzAQBElLVKZy/v9DjXVBLK5Q4StkyJxygJ3uCNAk1qRfY2xi7CtV8LLGpCqw1/EJ7ENFDDvcOTXEdMIdY02MRwhgzwU47LkAhz0XQqASwDUCuFoQAzHwtIDqmPTnrOBJga0viX6Dm9ucaGe4pSuIbgkB7LkAhz0X4LDnQgiUArhcAFcIYiAGnhZQHJPunH/oRbo/sHpH+BXOu4xw/jKAPRfgsOfCZcAJ4DJBDMTAPwR0x6Q/53u/rkb9+VZ//9+xTWbto7vDzQAAAABJRU5ErkJggg==" /></a>
        </div>
        <div><span class="uid">UID: ${uniqueId ? uniqueId : ''}</span></div>
        ` + mediainfoButtonHtml + `
        ` + uniqueIdButtonHtml + `
        ` + fileStructureButtonHtml + `
        ` + homeTrackerButtonHtml + `</div>`;

        if(existingToolkit) {
            existingToolkit.innerHTML = toolkitDiv.innerHTML
        } else {
            document.body.appendChild(toolkitDiv);
        }

        /* ---------------------------------------------------------------------
        * BUTTON HANDLERS
        * ---------------------------------------------------------------------
        */

        // Copy entire mediainfo block
        document.getElementById("copyFullMediainfoBtn").addEventListener("click", () => {
            if (!activeTemplate) return showToast("No template for this site");

            if (!mediainfo) return showToast("Mediainfo not found");

            GM_setClipboard(mediainfo);
            showToast("Mediainfo copied");
        });

        // Copy Unique ID
        document.getElementById("copyUniqueIDBtn").addEventListener("click", () => {
            if (!activeTemplate) return showToast("No template for this site");

            if (!mediainfo) return showToast("No mediainfo found");

            if (!uniqueId) return showToast("Unique ID not found");

            GM_setClipboard(uniqueId);
            showToast(`Unique ID copied`);
        });

        // Copy file structure
        document.getElementById("copyFileStructureBtn").addEventListener("click", () => {
            if (!activeTemplate) return showToast("No template for this site")

            GM_setClipboard(file_structure);
            showToast(`File structure copied`);
        })

        // Go to home tracker
        document.getElementById("homeTrackerBtn").addEventListener("click", () => {
            if (!activeTemplate) return showToast("No template for this site")

            window.open(home_tracker_link, '_blank')
        })

        // hide toolkit button
        document.getElementById("toggleToolkitBtn").addEventListener("click", (event) => {
            const toolkitBody = document.querySelector("#torrentModToolkit div.body");
            const toggleButton = event.currentTarget;

            if(toolkitBody && !isHidden) {
                toolkitBody.hidden = true;
                isHidden = true;
                toggleButton.textContent = "▲";

            } else if(toolkitBody && isHidden) {
                toolkitBody.hidden = false;
                isHidden = false;
                toggleButton.textContent = "▼";
            }
        })
    }

    /* ---------------------------------------------------------------------
     * SITE TEMPLATE DEFINITIONS
     * ---------------------------------------------------------------------
     *
     * Each template defines:
     *  - matches(url): boolean — decides if this module handles the current site
     *  - extractMediainfo(): string|null — copy the mediainfo based on CSS selector or make separate HTML call to retreive it
     *  - extractFileStructure() : string|null — copy the torrent page's file list
     *  - extractIMDB() : string|null — finds the imdb id
     *  - extractReleaseGroup() : string|null — finds the release group, if present
     */

    const siteTemplates = [
        {
            name: "General UNIT3D Template",
            matches: (url) => url.includes("aither.cc") || url.includes("blutopia.cc") || url.includes("lst.gg") || url.includes("upload.cx"),
            extractMediainfo: () => {
                const el = document.querySelector(".torrent-mediainfo-dump pre code[x-ref='mediainfo']");
                return el ? el.innerText.trim() : null;
            },
            extractFileStructure: () => {
                const files = document.querySelectorAll("div[data-tab='list'] tr td:nth-child(2)");
                if(!files) return null;

                return Array.from(files)
                    .map(file => file.innerText.trim())
                    .join("\n");
            },
            extractIMDB: () => {
                const el = document.querySelector("li.meta__imdb a");
                if(!el) return null;
                const match = el.href.match(/tt\d{7,8}/)
                return match ? match[0] : null;
            },
            extractReleaseGroup: () => {
                const title = document.querySelector("h1.torrent__name");
                if(!title) return null;

                release_name = title.innerText;
                const match = title.innerText.match(/-([A-Za-z0-9]+)$/);
                return match ? match[1] : null;
            }
        },

        {
            name: "BHD Template",
            matches: (url) => url.includes("beyond-hd.me"),
            extractMediainfo: () => {
                const inline_view = document.querySelector("div.table-torrents tr.libraryinline pre.decoda-code code");
                const torrent_page_view = document.querySelector("div#stats-full pre.decoda-code div");

                return inline_view ? inline_view.innerText.trim() : torrent_page_view ? torrent_page_view.innerText.trim() : null;
            },
            extractFileStructure: () => {
                const match = window.location.href.match(/torrents\/[^.]+\.(\d+)$/);
                if(!match) return null;
                let torrentId = match[1].trim();
                let files = document.querySelectorAll('#modal_torrent_files' + torrentId + ' table tr td:nth-child(2)')
                if(!files) return null;

                return Array.from(files)
                    .map(file => file.innerText.trim())
                    .join("\n");
            },
            extractIMDB: () => {
                const el = document.querySelector("a[title='IMDB']");
                if(!el) return null;
                const match = el.href.match(/tt\d{7,8}/)
                return match ? match[0] : null;
            },
            extractReleaseGroup: () => {
                const title = document.querySelector("div#stats-quick div.text-main span.text-main");
                if(!title) return null;

                release_name = title.innerText;
                const match = title.innerText.match(/-([A-Za-z0-9]+)(\.mkv|\.mp4)?$/);
                return match ? match[1] : null;
            }
        },

        {
            name: "HDB Template",
            matches: (url) => url.includes("hdbits.org"),
            extractMediainfo: () => {
                const urlParams = new URLSearchParams(window.location.search);
                const torrentId = urlParams.get('id');
                if(!torrentId) return null;

                GM_xmlhttpRequest({
                    method: "GET",
                    url: 'https://hdbits.org/details/mediainfo?id=' + torrentId,
                    onload: function(response) {
                        if (response.status !== 200) {
                            console.error("Failed to fetch:", response.status);
                            return;
                        }

                        mediainfo = response.responseText;
                        uniqueId = extractUniqueId(mediainfo);
                        renderToolkit();
                        return response.responseText;
                    }
                });
            },
            extractFileStructure: () => {
                const blocks = [...document.querySelectorAll("div.collapsable")];
                const fileListBlock = blocks.find(el => el.textContent.includes("File list"));
                if (fileListBlock && fileListBlock.nextElementSibling?.classList.contains("hideablecontent")) {
                    let files = fileListBlock.nextElementSibling.querySelectorAll('tr td:first-child');
                    if(!files) return null;

                    return Array.from(files)
                        .map(file => file.innerText.trim())
                        .join("\n");
                }

                return null;
            },
            extractIMDB: () => {
                const links = [...document.querySelectorAll('a')];
                const imdbLink = links.find(el => el.href.includes("imdb.com"));
                if(!imdbLink) return null;
                const match = imdbLink.href.match(/tt\d{7,8}/)
                return match ? match[0] : null;
            },
            extractReleaseGroup: () => {
                const title = document.querySelector("div.torrent-title h1");
                if(!title) return null;

                release_name = title.innerText;
                const match = title.innerText.match(/-([A-Za-z0-9]+)$/);
                return match ? match[1] : null;
            }
        },

        {
            name: "Z Network Template",
            matches: (url) => url.includes("avistaz.to") || url.includes("privatehd.to") || url.includes("cinemaz.to"),
            extractMediainfo: () => {
                const el = document.querySelector("div#collapseMediaInfo pre");
                return el ? el.textContent.trim() : null;
            },
            extractFileStructure: () => {
                const files = document.querySelectorAll("div#file_list_tree a span.file-name");
                if(!files) return null;

                return Array.from(files)
                    .map(file => file.innerText.trim())
                    .join("\n");
            },
            extractIMDB: () => {
                const links = [...document.querySelectorAll('a')];
                const imdbLink = links.find(el => el.href.includes("imdb.com"));
                if(!imdbLink) return null;
                const match = imdbLink.href.match(/tt\d{7,8}/)
                return match ? match[0] : null;
            },
            extractReleaseGroup: () => {
                const title = document.querySelector("a.torrent-filename");
                if(!title) return null;

                release_name = title.innerText;
                const match = title.innerText.match(/-([A-Za-z0-9]+)$/);
                return match ? match[1] : null;
            }
        },

        {
            name: "FL Template",
            matches: (url) => url.includes("filelist.io"),
            extractMediainfo: () => {
                const urlParams = new URLSearchParams(window.location.search);
                const torrentId = urlParams.get('id');
                if(!torrentId) return null;

                GM_xmlhttpRequest({
                    method: "GET",
                    url: 'https://filelist.io/mediainfo.php?id=' + torrentId,
                    onload: function(response) {
                        if (response.status !== 200) {
                            console.error("Failed to fetch:", response.status);
                            return;
                        }

                        const parser = new DOMParser();
                        const doc = parser.parseFromString(response.responseText, "text/html");
                        const el = doc.querySelector("div.cblock-innercontent");

                        if(!el) return null;

                        mediainfo = el.innerText;
                        uniqueId = extractUniqueId(mediainfo);
                        renderToolkit();
                        return response.responseText;
                    }
                });
            },
            extractFileStructure: () => {
                const fileSpans = [...document.querySelectorAll("div.cblock-innercontent > div > div > span")];
                const fileSpan = fileSpans.find(el => el.innerText.includes("Files"));
                if(!fileSpan) return null;
                const temp = document.createElement("div");
                temp.innerHTML = fileSpan.getAttribute('data-original-title');
                const files = temp.querySelectorAll("div[align='left']");
                return Array.from(files)
                    .map(file => file.innerText.trim())
                    .join("\n");
            },
            extractIMDB: () => {
                const links = [...document.querySelectorAll('a')];
                const imdbLink = links.find(el => el.href.includes("imdb.com"));
                if(!imdbLink) return null;
                const match = imdbLink.href.match(/tt\d{7,8}/)
                return match ? match[0] : null;
            },
            extractReleaseGroup: () => {
                const title = document.querySelector("div.cblock-header h4");
                if(!title) return null;

                release_name = title.innerText;
                const match = title.innerText.match(/-([A-Za-z0-9]+)$/);
                return match ? match[1] : null;
            }
        },

         {
            name: "ANT Template",
            matches: (url) => url.includes("anthelion.me"),
            extractMediainfo: () => {
                const urlParams = new URLSearchParams(window.location.search);
                const torrentId = urlParams.get('torrentid');
                if(!torrentId) return null;

                const el = document.querySelector(`tr#torrent_${torrentId} blockquote.mediainfoRaw`);
                return el ? el.textContent.trim() : null;
            },
            extractFileStructure: () => {
                const urlParams = new URLSearchParams(window.location.search);
                const torrentId = urlParams.get('torrentid');
                if(!torrentId) return null;
                const files = document.querySelectorAll(`div#files_${torrentId} tr.row td:first-child`);
                if(!files) return null;

                return Array.from(files)
                    .map(file => file.innerText.trim())
                    .join("\n");
            },
            extractIMDB: () => {
                const links = [...document.querySelectorAll('a')];
                const imdbLink = links.find(el => el.href.includes("imdb.com"));
                if(!imdbLink) return null;
                const match = imdbLink.href.match(/tt\d{7,8}/)
                return match ? match[0] : null;
            },
            extractReleaseGroup: () => {
                const urlParams = new URLSearchParams(window.location.search);
                const torrentId = urlParams.get('torrentid');
                if(!torrentId) return null;
                const title = document.querySelector(`tr#torrent_${torrentId} div.spoilerContainer input.spoilerButton`);
                if(!title) return null;

                release_name = title.value;
                const match = release_name.match(/-([A-Za-z0-9]+)(\.mkv|\.mp4)?$/);
                return match ? match[1] : null;
            }
        },

        {
            name: "MTV Template",
            matches: (url) => url.includes("morethantv.me"),
            extractMediainfo: () => {
                const el = document.querySelector("div.body div.mediainfo");
                return el ? el.textContent.trim() : null;
            },
            extractFileStructure: () => {
                const files = document.querySelectorAll('div#content div.body div.hidden tr td:first-child');
                if(!files) return null;

                return Array.from(files)
                    .map(file => file.innerText.trim())
                    .join("\n");
            },
            extractIMDB: () => {

            },
            extractReleaseGroup: () => {

            }
        }

    ];

    /* ---------------------------------------------------------------------
     * SELECT TEMPLATE BASED ON URL, THEN LOAD DATA
     * ---------------------------------------------------------------------
     */

    const currentURL = window.location.href;
    const activeTemplate = siteTemplates.find((m) => m.matches(currentURL)) || null;

    if(activeTemplate) {
        mediainfo = activeTemplate.extractMediainfo();
        uniqueId = extractUniqueId(mediainfo);
        file_structure = activeTemplate.extractFileStructure();

        // Get info for home tracker link
        imdbId = activeTemplate.extractIMDB();

        const release_group = activeTemplate.extractReleaseGroup();

       if(imdbId && release_group) {
            if(homeTrackerSearchUrlMap[release_group]) {
                home_tracker_link = homeTrackerSearchUrlMap[release_group] ? homeTrackerSearchUrlMap[release_group] + imdbId : null;
            }
        }
    }


    /* ---------------------------------------------------------------------
     * SET STYLES FOR FLOATING TOOLBAR UI
     * ---------------------------------------------------------------------
     */

    GM_addStyle(`
      #torrentModToolkit {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: #1e2332;
          color: #fff;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 14px;
          z-index: 999999;
          box-shadow: 0 2px 8px rgba(0,0,0,0.35);
          min-width: 250px;
      }

      #torrentModToolkit button {
          display: block;
          width: 100%;
          margin-top: 6px;
          padding: 6px;
          border: none;
          border-radius: 4px;
          background: #2e3445;
          color: white;
          font-size: 13px;
          cursor: arrow;
      }

      #torrentModToolkit .hdr {
          display: flex;
          flex-direction: row;
          align-items: center;
      }

      #torrentModToolkit .hdr div {
         flex: 1;
         text-align: center;
      }

      #torrentModToolkit .hdr button {
          margin-left: auto;
          flex-basis: 12px;
          font-weight: bold;
          background: none;
      }

      #torrentModToolkit .center {
          text-align: center;
      }

       #torrentModToolkit .pad {
          padding: 3px;
      }

      #torrentModToolkit .uid {
         font-size: 12px;
      }

      #torrentModToolkit button:not([disabled]):hover {
          background: #2d6cd3;
          cursor: pointer;
      }

      #torrentModToolkit button[disabled] {
          background: #181C25;
      }

      #tmt-toast-container {
            position: fixed;
            bottom: 180px;
            right: 20px;
            z-index: 9999999;
            display: flex;
            flex-direction: column;
            gap: 10px;
            pointer-events: none; /* let clicks pass through */
        }

        .tmt-toast {
            min-width: 180px;
            max-width: 300px;
            background: rgba(0,0,0,0.85);
            color: #fff;
            padding: 10px 14px;
            border-radius: 6px;
            font-size: 13px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.3s ease, transform 0.3s ease;
            pointer-events: auto;
        }

        .tmt-toast.show {
            opacity: 1;
            transform: translateY(0);
        }
    `);

    setupToast();
    renderToolkit();


})();
