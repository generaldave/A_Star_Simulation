/* David Fuller

    A*simulation class

    June 22, 2017
*/

function AStar() {
    this.grid = new Array(COLS);
    this.open_set = [];
    this.closed_set = [];
    this.start;
    this.end;
    this.path = [];

    this.cell_width = width / COLS;
    this.cell_height = height / ROWS;

    // Assume a solution exists
    this.solution_exists = true;

    // Set up grid
    this.setupGrid();

    // Store start and end node
    this.start = this.grid[ZERO][ZERO];
    this.end = this.grid[COLS - ONE][ROWS - ONE];

    // Start and end nodes cannot be walls
    this.start.wall = false;
    this.end.wall = false;

    // Openset begins with start node
    this.open_set.push(this.start);
}

// Method sets up grid of nodes
AStar.prototype.setupGrid = function() {
    // Initialize grid
    for (var i = ZERO; i < COLS; i++) {
        this.grid[i] = new Array(ROWS);
    }

    // Initialize nodes
    for (var i = ZERO; i < COLS; i++) {
        for (var j = ZERO; j < ROWS; j++) {
            this.grid[i][j] = new Node(i, j);
        }
    }

    // Initialize neighbors
    for (var i = ZERO; i < COLS; i++) {
        for (var j = ZERO; j < ROWS; j++) {
            this.grid[i][j].addNeighbors(this.grid);
        }
    }
}

// Removes an object from an array
AStar.prototype.removeFromArray = function(obj) {
    for (var i = this.open_set.length - ONE; i >= ZERO; i--) {
        if (this.open_set[i] == obj) {
            this.open_set.splice(i, ONE);
        }
    }
}

// Heuristic function - finds euclidean distance from current node to end node
AStar.prototype.heuristic = function(start_node, end_node) {
    return dist(start_node.x, start_node.y, end_node.x, end_node.y);
}

// A* search algorithm
AStar.prototype.search = function() {
    // If open set is not empty, continue searching, otherwise stop
    if (this.open_set.length > ZERO) {
        var lowest_index = ZERO; // Assumed best route as first index
        for (var i = ZERO; i < this.open_set.length; i++) {
            if (this.open_set[i].f < this.open_set[lowest_index].f) {
                lowest_index = i;
            }
        }
        var current = this.open_set[lowest_index];

        // Find path
        this.path = [];
        var temp = current;
        this.path.push(temp);
        while (temp.previous) {
            this.path.push(temp.previous);
            temp = temp.previous;
        }

        // If lowest_index = end, search is done
        if (current === this.end) {
            this.solution_exists = false;
            createP("DONE!");
            return;
        }

        // open_set.remove(current);
        // removeFromArray(array, object)
        this.removeFromArray(current);
        this.closed_set.push(current);

        // Get and check neighbors of current node
        var neighbors = current.neighbors;
        for (var i = ZERO; i < neighbors.length; i++) {
            var neighbor = neighbors[i];
            if (!this.closed_set.includes(neighbor) && !neighbor.wall) {
                var temp_g = current.g + MOVE_COST;

                var new_path = false;
                if (this.open_set.includes(neighbor)) {
                    if (temp_g < neighbor.g) {
                        neighbor.g = temp_g;
                        new_path = true;
                    }
                } else {
                    neighbor.g = temp_g;
                    new_path = true;
                    this.open_set.push(neighbor);
                }

                if (new_path) {
                    neighbor.h = this.heuristic(neighbor, this.end);
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.previous = current;
                }
            }
        }
    } else {
        // no solution
        createP("No solution");
        this.solution_exists = false;
        return;
    }
}

// Shows grid
AStar.prototype.show = function() {
    // Show A* grid
    for (var i = ZERO; i < COLS; i++) {
        for (var j = ZERO; j < ROWS; j++) {
            this.grid[i][j].show(color(GRAY), this.cell_width, this.cell_height);
        }
    }

    // Show closed set in red
    for (var i = ZERO; i < this.closed_set.length; i++) {
        this.closed_set[i].show(color(255, 0, 0, 50), this.cell_width, this.cell_height, false);
    }

    // Show open set in green
    for (var i = ZERO; i < this.open_set.length; i++) {
        this.open_set[i].show(color(0, 255, 0, 50), this.cell_width, this.cell_height, false);
    }

    // Show path in blue
    beginShape();
    for (var i = ZERO; i < this.path.length; i++) {
        this.path[i].show(color(0, 0, 200), this.cell_width, this.cell_height, true);
    }
    endShape();
}
