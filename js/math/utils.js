/**
 * Finds and returns the nearest point to a given location among a collection of points.
 *
 * @param {Object} loc - The location for which the nearest point needs to be determined.
 * @param {Array} points - An array of points to search for the nearest point.
 * @param {number} [threshold=Number.MAX_SAFE_INTEGER] - Optional threshold to limit the maximum distance for consideration.
 * @returns {Object|null} - The nearest point to the specified location, or null if the collection of points is empty.
 */
const getNearestPoint = (loc, points, threshold = Number.MAX_SAFE_INTEGER) => {
    let minDist = Number.MAX_SAFE_INTEGER;
    let nearest = null;

    // Iterate through each point in the collection
    for (const point of points) {
        // Calculate the distance between the current point and the specified location
        const dist = distance(point, loc);

        // Check if the distance is less than the current minimum distance and within the specified threshold
        if (dist < minDist && dist < threshold) {
            minDist = dist;
            nearest = point;
        }
    }
    return nearest;
};

/**
 * Calculates and returns the Euclidean distance between two points in a 2D plane.
 *
 * @param {Object} p1 - The first point with 'x' and 'y' coordinates.
 * @param {Object} p2 - The second point with 'x' and 'y' coordinates.
 * @returns {number} - The Euclidean distance between the two points.
 */
const distance = (p1, p2) => {
    // Use the Math.hypot function to calculate the Euclidean distance
    return Math.hypot(p1.x - p2.x, p1.y - p2.y);
};