(function () {
    "use strict";

    function enablePanZoom(svg) {

        // Voorkom dubbele initialisatie
        if (svg.dataset.panZoomInitialized) {
            return;
        }
        svg.dataset.panZoomInitialized = "true";

        // pak de eerste inhoudsgroep van Mermaid
        const viewport = svg.querySelector(":scope > g");

        if (!viewport) {
            console.warn("Geen viewport gevonden", svg);
            return;
        }

        let scale = 1;
        let x = 0;
        let y = 0;

        let dragging = false;
        let lastX = 0;
        let lastY = 0;

        function update() {
            viewport.setAttribute(
                "transform",
                `translate(${x} ${y}) scale(${scale})`
            );
        }

        function reset() {
            scale = 1;
            x = 0;
            y = 0;
            update();
        }

        function zoom(factor) {
            scale *= factor;
            update();
        }

        const figure = svg.closest("figure");
        if (figure) {
            figure.style.position = "relative";

            if (!figure.querySelector(".svg-controls")) {
                const controls = document.createElement("div");
                controls.className = "svg-controls";

              controls.innerHTML = `
    <button title="Omhoog">▲</button>
    <button title="Inzoomen">+</button>
    <button title="Links">◀</button>
    <button title="Reset">⛶</button>
    <button title="Rechts">▶</button>
    <button title="Uitzoomen">−</button>
    <button title="Omlaag">▼</button>
    <button title="Vergroot">⤢</button>
    <button title="Download">⭳</button>
`;

figure.appendChild(controls);

const move = 50; // aantal pixels per klik

controls.children[0].onclick = () => {
    y += move;
    update();
};

controls.children[1].onclick = () => zoom(1.2);

controls.children[2].onclick = () => {
    x += move;
    update();
};

controls.children[3].onclick = reset;

controls.children[4].onclick = () => {
    x -= move;
    update();
};

controls.children[5].onclick = () => zoom(0.8);

controls.children[6].onclick = () => {
    y -= move;
    update();
};

if (!svg.dataset.originalWidth) {
    svg.dataset.originalWidth = svg.clientWidth;
}

controls.children[7].onclick = () => {

    if (svg.dataset.expanded === "true") {
        svg.style.width = "";
        svg.style.maxWidth = "";
        svg.dataset.expanded = "false";
    } else {
        svg.style.width = (svg.dataset.originalWidth * 2) + "px";
        svg.style.maxWidth = "none";
        svg.dataset.expanded = "true";
    }

};

// Download SVG
controls.children[8].onclick = () => {

    // Kopie maken zodat we niets in het document wijzigen
    const clone = svg.cloneNode(true);

    // xmlns toevoegen als die ontbreekt
    if (!clone.getAttribute("xmlns")) {
        clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    }

    const source =
        '<?xml version="1.0" encoding="UTF-8"?>\n' +
        clone.outerHTML;

    const blob = new Blob([source], {
        type: "image/svg+xml;charset=utf-8"
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;

const caption = figure.querySelector("figcaption");
const filename = caption
    ? caption.textContent.trim().replace(/[^\w\-]+/g, "_")
    : (svg.id || "diagram");

a.download = filename + ".svg";


    a.click();

    URL.revokeObjectURL(url);
};








            }
        }

        //svg.addEventListener("wheel", e => {
        //    e.preventDefault();
       //     zoom(e.deltaY < 0 ? 1.15 : 0.85);
       // }, { passive: false });

        svg.addEventListener("mousedown", e => {
            dragging = true;
            lastX = e.clientX;
            lastY = e.clientY;
            svg.style.cursor = "grabbing";
        });

        svg.addEventListener("mousemove", e => {
            if (!dragging) return;

            x += (e.clientX - lastX) / scale;
            y += (e.clientY - lastY) / scale;

            lastX = e.clientX;
            lastY = e.clientY;

            update();
        });

        function stopDragging() {
            dragging = false;
            svg.style.cursor = "grab";
        }

        svg.addEventListener("mouseup", stopDragging);
        svg.addEventListener("mouseleave", stopDragging);

        svg.addEventListener("dblclick", reset);

        svg.style.cursor = "grab";

        console.log("Pan/Zoom geactiveerd", svg);
    }

    function scan() {
        document
            .querySelectorAll("figure svg")
            .forEach(enablePanZoom);
    }

    function observe() {

        // eerst bestaande SVG's
        scan();

        const observer = new MutationObserver(mutations => {

            for (const mutation of mutations) {

                for (const node of mutation.addedNodes) {

                    if (node.nodeType !== Node.ELEMENT_NODE) {
                        continue;
                    }

                    // Direct een svg toegevoegd?
                    if (node.matches?.("svg")) {
                        enablePanZoom(node);
                    }

                    // Of bevat het nieuwe node ergens svg's?
                    node.querySelectorAll?.("svg").forEach(enablePanZoom);
                }
            }

        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        console.log("Pan/Zoom observer gestart.");
    }

    function start() {

        if (document.respec?.ready) {

            document.respec.ready.then(() => {
                console.log("ReSpec klaar.");
                observe();
            });

        } else if (document.readyState === "loading") {

            document.addEventListener("DOMContentLoaded", observe);

        } else {

            observe();

        }
    }

    start();

})();
