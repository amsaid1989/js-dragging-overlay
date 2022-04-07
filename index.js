const area = document.querySelector("#area");
const drag = document.querySelector("#drag");

let initialX, initialY;

area.addEventListener("mousedown", (event) => {
    if (event.button === 0) {
        // Get the current cursor position
        initialX = event.clientX;
        initialY = event.clientY;

        // Show the dragging overlay and move it to the cursor
        // position
        drag.style.visibility = "visible";
        drag.style.left = `${initialX}px`;
        drag.style.top = `${initialY}px`;

        area.addEventListener("mousemove", onMouseMove);

        area.addEventListener("mouseup", onMouseUp);
    }
});

function onMouseMove(event) {
    /**
     * Calculate the width of the dragging overlay and its
     * position based on how the user moves the mouse.
     */

    const xDifference = event.clientX - initialX;
    const yDifference = event.clientY - initialY;

    // HOW THE DRAGGING OVERLAY IS DRAWN
    //
    // If the user move the mouse to the right, then the
    // value of the mouse horizontal position would be
    // increasing. In this case, all we need to do is to
    // set the width of the overaly to the absolute value
    // of the difference between the current position of
    // the mouse cursor and the initial position.
    //
    // If the user drags to the left, the horizontal
    // position of the mouse would be decreasing, meaning
    // that the difference would be negative. In this
    // case, we still set the width to the absolute value
    // of the difference, but we offset the overlay's
    // left to the current cursor position.
    //
    // The same happens when the user moves the mouse
    // vertically, with moving the mouse down resulting
    // in positive yDifference values, and moving the
    // mouse up resulting in negative yDifference values.

    if (xDifference >= 0) {
        drag.style.left = `${initialX}px`;
    } else {
        drag.style.left = `${event.clientX}px`;
    }

    if (yDifference >= 0) {
        drag.style.top = `${initialY}px`;
    } else {
        drag.style.top = `${event.clientY}px`;
    }

    drag.style.width = `${Math.abs(xDifference)}px`;
    drag.style.height = `${Math.abs(yDifference)}px`;
}

function onMouseUp() {
    /**
     * Reset the dragging overlay.
     */
    area.removeEventListener("mousemove", onMouseMove);

    drag.style.visibility = "hidden";
    drag.style.width = "0px";
    drag.style.height = "0px";
}
