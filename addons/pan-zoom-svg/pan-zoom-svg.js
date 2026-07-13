(function () {
    "use strict";

    function enablePanZoom(svg) {

        const viewport = svg.querySelector(":scope > g");

        delete svg.dataset.expanded;

        if (!viewport) {
            return;
        }

        let scale = 1;
        let x = 0;
        let y = 0;

        let dragging = false;
        let lastX = 0;
        let lastY = 0;


        function update() {

    if (x === 0 && y === 0 && scale === 1) {
        viewport.removeAttribute("transform");
        return;
    }

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

    svg.style.width = "";
    svg.style.maxWidth = "";

    delete svg.dataset.expanded;
}


        function zoom(factor) {

            scale *= factor;

            update();
        }


        const figure = svg.closest("figure");

        if (figure) {

            figure.style.position = "relative";

            let controls = figure.querySelector(".svg-controls");


            /*
             * Controls maken indien nodig.
             * Bij een ReSpec snapshot bestaan deze al.
             */
            if (!controls) {

                controls = document.createElement("div");

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
            }


            /*
             * Events opnieuw koppelen.
             * Dit is nodig omdat snapshots geen JS-events bevatten.
             */
            if (!controls.dataset.bound) {

                const move = 50;


                controls.children[0].onclick = () => {
                    y += move;
                    update();
                };


                controls.children[1].onclick = () => {
                    zoom(1.2);
                };


                controls.children[2].onclick = () => {
                    x += move;
                    update();
                };


                controls.children[3].onclick = () => {
                    reset();
                };


                controls.children[4].onclick = () => {
                    x -= move;
                    update();
                };


                controls.children[5].onclick = () => {
                    zoom(0.8);
                };


                controls.children[6].onclick = () => {
                    y -= move;
                    update();
                };


                              


                controls.children[7].onclick = () => {
                    
                    const expanded = !(
                        svg.style.width === `${svg.dataset.originalWidth}px` ||
                        svg.style.width === ""
                    );
                   
                    if (expanded) {
                        
                        svg.style.width = svg.dataset.originalWidth;
                        svg.style.maxWidth = ""; 
                        return;
                    }

                    svg.style.width =
                        (Number(svg.dataset.originalWidth) * 2);

                    svg.style.maxWidth = "none";                    
                };


                controls.children[8].onclick = () => {

                    const clone = svg.cloneNode(true);


                    if (!clone.getAttribute("xmlns")) {

                        clone.setAttribute(
                            "xmlns",
                            "http://www.w3.org/2000/svg"
                        );
                    }


                    const source =
                        '<?xml version="1.0" encoding="UTF-8"?>\n' +
                        clone.outerHTML;


                    const blob = new Blob(
                        [source],
                        {
                            type: "image/svg+xml;charset=utf-8"
                        }
                    );


                    const url = URL.createObjectURL(blob);


                    const a = document.createElement("a");

                    a.href = url;


                    const caption =
                        figure.querySelector("figcaption");


                    const filename = caption
                        ? caption.textContent
                            .trim()
                            .replace(/[^\w\-]+/g, "_")
                        : (svg.id || "diagram");


                    a.download = filename + ".svg";

                    a.click();


                    URL.revokeObjectURL(url);
                };


                controls.dataset.bound = "true";
            }
        }



        /*
         * Dragging slechts één keer koppelen.
         */
        if (!svg.dataset.dragBound) {


            svg.addEventListener("mousedown", e => {

                dragging = true;

                lastX = e.clientX;
                lastY = e.clientY;

                svg.style.cursor = "grabbing";
            });



            svg.addEventListener("mousemove", e => {

                if (!dragging) {
                    return;
                }


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


            svg.addEventListener(
                "mouseup",
                stopDragging
            );


            svg.addEventListener(
                "mouseleave",
                stopDragging
            );


            svg.addEventListener(
                "dblclick",
                reset
            );


            svg.style.cursor = "grab";


            svg.dataset.dragBound = "true";
        }
    }



    function scan() {

        document
            .querySelectorAll("svg")
            .forEach(enablePanZoom);
    }



    function observe() {

        const observer = new MutationObserver(
            mutations => {

                for (const mutation of mutations) {

                    for (const node of mutation.addedNodes) {

                        if (node.nodeType !== Node.ELEMENT_NODE) {
                            continue;
                        }


                        if (node.matches?.("svg")) {

                            enablePanZoom(node);

                        } else {

                            node
                                .querySelectorAll?.("svg")
                                .forEach(enablePanZoom);
                        }
                    }
                }
            }
        );


        observer.observe(
            document.body,
            {
                childList: true,
                subtree: true
            }
        );
    }



    function start() {


        function init() {

            scan();

            observe();
        }



        if (
            window.respecConfig &&
            document.respec?.ready
        ) {

            document.respec.ready.then(init);


        } else if (
            document.readyState === "loading"
        ) {

            document.addEventListener(
                "DOMContentLoaded",
                init,
                {
                    once: true
                }
            );


        } else {

            init();
        }
    }


    start();

})();