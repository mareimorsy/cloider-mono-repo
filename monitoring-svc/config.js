const config = {
    app_port: process.env.APP_PORT || 3000,
    db_name: process.env.APP_PORT || "cloider",
    db_host: process.env.DB_HOST || "localhost",
    db_user: process.env.DB_USER || "root",
    db_password: process.env.DB_PASSWORD || "",
    alert_endpoint: process.env.ALERT_ENDPOINT || "http://localhost:4000/alert",
}

module.exports = config