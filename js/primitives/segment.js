/**
 * Represents a line segment connecting two points.
 */
class Segment {
    /**
     * Constructor for creating a Segment instance.
     * @param {Point} p1 - The starting point of the segment.
     * @param {Point} p2 - The ending point of the segment.
     */
    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
    }

    /**
     * Draws the segment on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
     * @param {number} [width=2] - The width of the line segment.
     * @param {string} [color="black"] - The color of the line segment.
     */
    draw(ctx, width = 2, color = "black") {
        ctx.beginPath(); // Begin a new path
        // Set the line width and stroke color
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        // Move to the starting point of the segment
        ctx.moveTo(this.p1.x, this.p1.y);
        // Draw a line to the ending point of the segment
        ctx.lineTo(this.p2.x, this.p2.y);
        // Stroke the path to render the line
        ctx.stroke();
    }
}