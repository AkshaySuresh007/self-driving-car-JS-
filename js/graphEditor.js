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

        this.ctx = this.canvas.getContext('2d');

        // Add event listeners to the canvas
        this.#addEventListeners();
    }

    /**
     * @private
     * Adds event listeners to the canvas for handling user interactions, including mouse down and mouse move events.
     * On mouse down, determines the hovered point in the graph and updates the selected point accordingly.
     * On mouse move, updates the hovered point based on the nearest point to the mouse coordinates within a threshold of 15 pixels.
     */
    #addEventListeners() {
        // Listen for mouse down events on the canvas
        this.canvas.addEventListener("mousedown", (evt) => {
            if (evt.button === 2) { // right click
                if (this.hovered) {
                    this.#removePoint(this.hovered);
                }
            }
            if (evt.button === 0) { // left click
                // Create a Point instance representing the mouse coordinates
                const mouse = new Point(evt.offsetX, evt.offsetY);
                // If a hovered point is found, update the selected point and return
                if (this.hovered) {
                    this.selected = this.hovered;
                    return;
                }
                // If no hovered point is found, add the mouse point to the graph and set it as the selected point
                this.graph.addPoint(mouse);
                this.selected = mouse;
                this.hovered = mouse;
            }
        });
        // Listen for mouse move events on the canvas
        this.canvas.addEventListener("mousemove", (evt) => {
            // Create a Point instance representing the mouse coordinates
            const mouse = new Point(evt.offsetX, evt.offsetY);
            // Update the hovered point based on the nearest point to the mouse coordinates within a threshold of 15 pixels
            this.hovered = getNearestPoint(mouse, this.graph.points, 15);
        });
        // Prevent the default context menu on right-click
        this.canvas.addEventListener("contextmenu", (evt) => evt.preventDefault());
    }

    #removePoint(point) {
        this.graph.removePoint(point);
        this.hovered = null;
        if (this.selected == point) this.selected = null;
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
            this.selected.draw(this.ctx, { outline: true });
        }
    }
}
