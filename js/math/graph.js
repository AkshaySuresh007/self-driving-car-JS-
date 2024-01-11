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
     * Adds a new point to the graph.
     * @param {Point} point - The Point instance to be added to the graph.
     */
    addPoint(point) {
        // adding the point instance to the 'points' array 
        this.points.push(point);
    }

    /**
     * Checks if the graph contains a specific point.
     * @param {Point} point - The Point instance to check for in the graph.
     * @returns {Point|null} - The matching Point instance if found, or null if not found.
     */
    containsPoint(point) {
        // Use the find method to search for a point with the same coordinates
        // If found, return the matching Point instance; otherwise, return null
        return this.points.find((p) => p.equals(point));
    }

    /**
     * Attempts to add a point to the graph if it is not already present.
     * @param {Point} point - The Point instance to try to add to the graph.
     * @returns {boolean} - Returns true if the point was added, false if it was already present.
     */
    tryAddPoint(point) {
        // Check if the graph does not already contain the given point
        if (!this.containsPoint(point)) {
            // If the point is not present, add it to the graph
            this.addPoint(point);
            // Return true to indicate that the point was added
            return true;
        }
        // Return false as the point was already present in the graph
        return false;
    }

    /**
     * Removes a specified segment from the graph.
     * @param {Segment} seg - The Segment instance to be removed from the graph.
     */
    removeSegment(seg) {
        this.segments.splice(this.segments.indexOf(seg), 1);
    }

    /**
     * Adds a segment to the graph.
     * @param {Segment} seg - The Segment instance to be added to the graph.
     */
    addSegment(seg) {
        // Push the provided segment to the list of segments in the graph
        this.segments.push(seg);
    }

    /**
     * Checks if the graph contains a specific segment.
     * @param {Segment} seg - The Segment instance to check for in the graph.
     * @returns {Segment|null} - The matching Segment instance if found, or null if not found.
     */
    containsSegment(seg) {
        // Use the find method to check if any segment in the graph is equal to the provided segment
        return this.segments.find((s) => s.equals(seg));
    }

    /**
     * Attempts to add a segment to the graph if it is not already present.
     * @param {Segment} seg - The Segment instance to attempt to add to the graph.
     * @returns {boolean} - Returns true if the segment was added successfully, false if it was already present or invalid.
     */
    tryAddSegment(seg) {
        // Check if the graph does not already contain the given segment and the segment is not degenerate (p1 equals p2)
        if (!this.containsSegment(seg) && !seg.p1.equals(seg.p2)) {
            // If the segment is not present and not degenerate, add it to the graph
            this.addSegment(seg);
            // Return true to indicate that the segment was added successfully
            return true;
        }
        // Return false as the segment was either already present or degenerate
        return false;
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