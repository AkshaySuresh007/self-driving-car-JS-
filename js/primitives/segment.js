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
     * Checks if the current segment is equal to another segment, considering both directions.
     * @param {Segment} seg - The Segment instance to compare with the current segment.
     * @returns {boolean} - Returns true if the segments are equal, considering both directions; false otherwise.
     */
    equals(seg) {
        // Check if the endpoints of the current segment are equal to the endpoints of the provided segment in either direction
        return this.includes(seg.p1) && this.includes(seg.p2);
    }

    /**
     * Checks if the current segment includes a specified point.
     * @param {Point} point - The Point instance to check for inclusion in the segment.
     * @returns {boolean} - Returns true if the segment includes the specified point; false otherwise.
     */
    includes(point) {
        // Check if the specified point is equal to either endpoint of the current segment
        return this.p1.equals(point) || this.p2.equals(point);
    }

    /**
     * Draws the line segment on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
     * @param {object} [options] - Optional parameters for customizing the appearance.
     * @param {number} [options.width=2] - The width of the line segment.
     * @param {string} [options.color="black"] - The color of the line segment.
     * @param {number[]} [options.dash=[]] - An array representing the dash pattern for the line.
     */
    draw(ctx, { width = 2, color = "black", dash = [] } = {}) {
        ctx.beginPath(); // Begin a new path
        // Set the line width and stroke color
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.setLineDash(dash);
        // Move to the starting point of the segment
        ctx.moveTo(this.p1.x, this.p1.y);
        // Draw a line to the ending point of the segment
        ctx.lineTo(this.p2.x, this.p2.y);
        // Stroke the path to render the line
        ctx.stroke();
        ctx.setLineDash([]); // Reset the dash pattern to default
    }       

}