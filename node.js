/* David Fuller

    Node class for A*simulation

    June 22, 2017
*/

function Node(x, y) {
    // Node coordinates
    this.x = x;
    this.y = y;

    // Node costs
    this.f = ZERO;
    this.g = ZERO;
    this.h = ZERO;

    // Node neighbor and previous
    this.neighbors = [];
    this.previous = undefined;

    // Is node a wall or not
    this.wall = false; // Assume not
    if (random(ONE) < WALL_CHANCE) {
        this.wall = true;
    }
}

// Add node neighbors
Node.prototype.addNeighbors = function(grid) {
    if (this.x < COLS - ONE) {
        this.neighbors.push(grid[this.x + ONE][this.y]);
    }
    if (this.x > ZERO) {
        this.neighbors.push(grid[this.x - ONE][this.y]);
    }
    if (this.y < ROWS - ONE) {
        this.neighbors.push(grid[this.x][this.y + ONE]);
    }
    if (this.y > ZERO) {
        this.neighbors.push(grid[this.x][this.y - ONE]);
    }
    if (this.x > ZERO && this.y > ZERO) {
        this.neighbors.push(grid[this.x - ONE][this.y - ONE]);
    }
    if (this.x < COLS - ONE && this.y > ZERO) {
        this.neighbors.push(grid[this.x + ONE][this.y - ONE]);
    }
    if (this.x > ZERO && this.y < ROWS - ONE) {
        this.neighbors.push(grid[this.x - ONE][this.y + ONE]);
    }
    if (this.x < COLS - ONE && this.y < ROWS - ONE) {
        this.neighbors.push(grid[this.x + ONE][this.y + ONE]);
    }
}

// Show node
Node.prototype.show = function(colour, w, h, path) {
    if (path) {
        noFill();
        stroke(colour);
        strokeWeight(w / TWO);
        vertex(this.x * w + w / TWO, this.y * h + h / TWO);
    } else {
        fill(colour);
        if (this.wall) {
            fill(BLACK);
        }
        noStroke();
        rect(this.x * w, this.y * h, w, h);
    }
}
