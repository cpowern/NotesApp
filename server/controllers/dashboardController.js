/**
 * Get
 * Dashboard
 */
exports.dashboard = async (req, res) => {
    const locals = {
        title: "Dashboard",
        description: "Free NodeJS Notes app.",
    };

    res.render('dashboard/index', {
        locals,
        //frontpage layout
        layout: '../views/layouts/dashboard'
    });
}