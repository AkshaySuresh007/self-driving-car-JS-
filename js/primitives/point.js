/**
 * Represents a 2D point with x and y coordinates.
 */
class Point {
    /**
     * Constructor for creating a Point instance.
     * @param {number} x - The x-coordinate of the point.
     * @param {number} y - The y-coordinate of the point.
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Checks if the current point is equal to another point.
     * @param {Point} point - The Point instance to compare against.
     * @returns {boolean} - True if the points have the same coordinates, false otherwise.
     */
    equals(point) {
        return this.x === point.x && this.y === point.y;
    }


    /**
     * Draws a filled circle representing the Point on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
     * @param {object} [options] - Optional parameters for customizing the appearance.
     * @param {number} [options.size=18] - The size of the circle (diameter).
     * @param {string} [options.color="black"] - The color of the filled circle.
     * @param {boolean} [options.outline=false] - Whether to draw an outline around the circle.
     * @param {boolean} [options.fill=false] - Whether to fill the circle with a secondary color.
     */
    draw(ctx, { size = 18, color = "black", outline = false, fill = false } = {}) {
        const rad = size / 2; // Calculate the radius of the circle
        ctx.beginPath(); // Begin a new path
        ctx.fillStyle = color; // Set the fill style to the specified color
        ctx.arc(this.x, this.y, rad, 0, Math.PI * 2); // Draw a filled circle at the specified coordinates (this.x, this.y) with the calculated radius
        ctx.fill(); // Fill the circle with the specified color
        if (outline) {
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "yellow";
            ctx.arc(this.x, this.y, rad * 0.6, 0, Math.PI * 2);
            ctx.stroke();
        }
        if (fill) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, rad * 0.4, 0, Math.PI * 2);
            ctx.fillStyle = "yellow";
            ctx.fill();
        }
    }
}