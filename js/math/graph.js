/**
 * Represents a graph composed of points and segments.
 */
class Graph {
    /**
     * Constructor for creating a Graph instance.
     * @param {Point[]} [points=[]] - An array of Point instances representing graph points.
     * @param {Segment[]} [segments=[]] - An array of Segment instances representing graph segments or links.
     */
    constructor(points = [], segments = []) {
        this.points = points;
        this.segments = segments;
    }

    /**
     * Draws the graph on the canvas by rendering its segments and points.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
     */
    draw(ctx) {
        // Draw each segment in the graph
        for (const seg of this.segments) {
            seg.draw(ctx);
        }

        // Draw each point in the graph
        for (const point of this.points) {
            point.draw(ctx);
        }
    }
}