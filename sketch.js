/* David Fuller

    Driver file for A*simulation

    June 22, 2017
*/

var astar;

function setup() {
    createCanvas(WIDTH, HEIGHT);
    astar = new AStar();
}

function draw() {
    background(GRAY);

    if (astar.solution_exists) {
        astar.search();
        astar.show();

        // If no solution stop looping through draw
        if (!astar.solution_exists) {
            noLoop();
        }
    }
}
