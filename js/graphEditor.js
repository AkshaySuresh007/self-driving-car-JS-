/**
 * The GraphEditor class represents an editor for manipulating a graph on an HTML canvas.
 * @class
 * @param {HTMLCanvasElement} canvas - The HTML canvas element to use for rendering the graph.
 * @param {Graph} graph - The Graph instance to be edited.
 */
class GraphEditor {
    /**
     * @constructor
     * @param {HTMLCanvasElement} canvas - The HTML canvas element to use for rendering the graph.
     * @param {Graph} graph - The Graph instance to be edited.
     */
    constructor(canvas, graph) {
        this.canvas = canvas;
        this.graph = graph;

        this.selected = null;
        this.hovered = null;
        this.dragging = false;
        this.mouse = null;

        this.ctx = this.canvas.getContext('2d');

        // Add event listeners to the canvas
        this.#addEventListeners();
    }

    /**
     * @private
     * Adds event listeners to the canvas for handling user interactions, including mouse down and mouse move events.
     * On mouse down, determines the hovered point in the graph and updates the selected point accordingly.
     * On mouse move, updates the hovered point based on the nearest point to the mouse coordinates within a threshold of 15 pixels.
     * Handles both left-click (for selecting and dragging points) and right-click (for removing points).
     */
    #addEventListeners() {
        // Listen for mouse down events on the canvas and bind the event handler to the current instance
        this.canvas.addEventListener("mousedown", this.#handleMouseDown.bind(this));
        // Listen for mouse move events on the canvas and bind the event handler to the current instance
        this.canvas.addEventListener("mousemove", this.#handleMouseMove.bind(this));
        // Prevent the default context menu on right-click
        this.canvas.addEventListener("contextmenu", (evt) => evt.preventDefault());
        // Listen for mouseup events on the canvas to reset dragging state
        this.canvas.addEventListener("mouseup", () => this.dragging = false);
    }

    /**
     * Handles the mouse move event on the canvas.
     * Updates the mouse coordinates, determines the hovered point based on the nearest point
     * to the mouse coordinates within a threshold of 15 pixels, and adjusts the selected point's
     * coordinates if dragging is enabled.
     *
     * @param {MouseEvent} evt - The mouse move event.
     */
    #handleMouseMove(evt) {
        // Create a Point instance representing the mouse coordinates
        this.mouse = new Point(evt.offsetX, evt.offsetY);

        // Update the hovered point based on the nearest point to the mouse coordinates within a threshold of 15 pixels
        this.hovered = getNearestPoint(this.mouse, this.graph.points, 15);

        // If dragging is true, update the selected point's coordinates to match the mouse coordinates
        if (this.dragging) {
            this.selected.x = this.mouse.x;
            this.selected.y = this.mouse.y;
        }
    }

    /**
     * Handles the mouse down event on the canvas.
     * Performs different actions based on the mouse button clicked:
     * - Right-click (button 2): Removes the selected point if present; otherwise, clears the selected point.
     * - Left-click (button 0): If a hovered point is found, updates the selected point and sets dragging state to true.
     *                          If no hovered point is found, adds the mouse point to the graph and sets it as the selected point.
     *
     * @param {MouseEvent} evt - The mouse down event.
     */
    #handleMouseDown(evt) {
        // Right-click (button 2): Remove the selected point if present; otherwise, clear the selected point
        if (evt.button === 2) {
            if (this.selected) {
                this.selected = null;
            } else if (this.hovered) {
                this.#removePoint(this.hovered);
            }
        }
        // Left-click (button 0)
        if (evt.button === 0) {
            // If a hovered point is found, update the selected point and set dragging state to true
            if (this.hovered) {
                this.#select(this.hovered);
                this.dragging = true;
                return;
            }
            // If no hovered point is found, add the mouse point to the graph and set it as the selected point
            this.graph.addPoint(this.mouse);
            this.#select(this.mouse);
            this.hovered = this.mouse;
        }
    }

    /**
     * Selects a point, creating a segment between the currently selected point (if any) and the specified point.
     * @param {Point} point - The Point instance to be selected.
     */
    #select(point) {
        // If a point is already selected, attempt to add a segment between the currently selected point and the specified point
        if (this.selected) {
            this.graph.tryAddSegment(new Segment(this.selected, point));
        }
        // Set the specified point as the new selected point
        this.selected = point;
    }

    /**
     * Removes the specified point from the graph and updates the hovered and selected points accordingly.
     * @param {Point} point - The Point instance to be removed from the graph.
     */
    #removePoint(point) {
        // Remove the specified point from the graph
        this.graph.removePoint(point);
        // Reset the hovered point to null
        this.hovered = null;
        // If the selected point is the same as the removed point, reset the selected point to null
        if (this.selected === point) this.selected = null;
    }

    /**
     * Displays the current state of the graph on the canvas.
     * Additionally, if a point is selected, it draws an outline around the selected point.
     */
    display() {
        // Draw the graph on the canvas using its rendering context
        this.graph.draw(this.ctx);
        if (this.hovered) {
            this.hovered.draw(this.ctx, { fill: true });
        }
        // Check if a point is selected and draw an outline if true
        if (this.selected) {
            const intent = this.hovered ?? this.mouse;
            new Segment(this.selected, intent).draw(this.ctx, { dash: [3, 3] });
            this.selected.draw(this.ctx, { outline: true });
        }
    }
}