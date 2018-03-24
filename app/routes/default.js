module.exports = function(server) {

    //Set a default page for hitting /
    server.get('/',
        function(req, res) {
            res.json({
                "version": 1.0,
                "author": "Hack the Hub Team Wizards"
            });
        });

        //Adding a Customer
    server.get('/customer', function(req, res, next) {

        var customer = new User({
            name: req.body.name,
            email: req.body.email,
            password: "password"
        })

        customer.save(function(error) {
            if (error) {
            res.json({
                title: "Failed",
                message: "Customer Add Failed",
                error: error
            });
            }
            res.json({
            title: "Success",
            username: req.body.name,
            message: "Customer Successfully Added"
            });
        });
    });
};