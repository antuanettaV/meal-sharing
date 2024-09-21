const http = require("http");
const url = require("url");
const port = 3000;

const db = {
    query: (sql) => {
        return new Promise((resolve, reject) => {
            const meals = [
                { id: 1, title: "Paella", description: "An authentic paella", when: "2024-09-25 14:00:00", location: "Valencia", max_reservation: 10, price: 20, created_date: "2024-09-01" },
                { id: 2, title: "Dumplings", description: "Dumplings with potatoes and mushrooms", when: "2023-10-20 12:00:00", location: "Beijing", max_reservation: 5, price: 15, created_date: "2023-10-01" }
            ];

            if (sql.includes("ORDER BY id ASC LIMIT 1")) {
                resolve([meals[0]]);
            } else if (sql.includes("ORDER BY id DESC LIMIT 1")) {
                resolve([meals[meals.length - 1]]);
            } else if (sql.includes("WHERE `when` > NOW()")) {
                resolve([meals[0]]); 
            } else if (sql.includes("WHERE `when` < NOW()")) {
                resolve([meals[1]]); 
            } else {
                resolve(meals); 
            }
        });
    }
};

const sendJSON = (res, status, data) => {
    res.writeHead(status, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
};

const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (req.method === "GET" && parsedUrl.pathname === "/future-meals") {
        try {
            const futureMeals = await db.query("SELECT * FROM meal WHERE `when` > NOW()");
            sendJSON(res, 200, futureMeals.length ? futureMeals : []); 
        } catch (error) {
            sendJSON(res, 500, { error: "An error occurred while fetching future meals." });
        }
    } else if (req.method === "GET" && parsedUrl.pathname === "/past-meals") {
        try {
            const pastMeals = await db.query("SELECT * FROM meal WHERE `when` < NOW()");
            sendJSON(res, 200, pastMeals.length ? pastMeals : []); 
        } catch (error) {
            sendJSON(res, 500, { error: "An error occurred while fetching past meals." });
        }
    } else if (req.method === "GET" && parsedUrl.pathname === "/all-meals") {
        try {
            const allMeals = await db.query("SELECT * FROM meal ORDER BY id ASC");
            sendJSON(res, 200, allMeals.length ? allMeals : []); 
        } catch (error) {
            sendJSON(res, 500, { error: "An error occurred while fetching all meals." });
        }
    } else if (req.method === "GET" && parsedUrl.pathname === "/first-meal") {
        try {
            const firstMeal = await db.query("SELECT * FROM meal ORDER BY id ASC LIMIT 1");
            if (firstMeal.length === 0) {
                sendJSON(res, 404, { message: "No meals found." });
            } else {
                sendJSON(res, 200, firstMeal[0]);
            }
        } catch (error) {
            sendJSON(res, 500, { error: "An error occurred while fetching the first meal." });
        }
    } else if (req.method === "GET" && parsedUrl.pathname === "/last-meal") {
        try {
            const lastMeal = await db.query("SELECT * FROM meal ORDER BY id DESC LIMIT 1");
            if (lastMeal.length === 0) {
                sendJSON(res, 404, { message: "No meals found." });
            } else {
                sendJSON(res, 200, lastMeal[0]);
            }
        } catch (error) {
            sendJSON(res, 500, { error: "An error occurred while fetching the last meal." });
        }
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
    }
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
