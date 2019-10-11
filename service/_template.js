const reportError = (res, error) => {
    console.error(error);
    res.status(422).send({error});
};

module.exports = (hosting, worker) => ({
    name: `tukion.${hosting.name}`,
    worker(service) {
        service.post('/add', async (req, res, next) => {
            try {
                const {link} = req.body;
                if (hosting.url_pattern.test(link)) {
                    const added = await worker.add(link);
                    res.send(added);
                } else {
                    reportError(res, `Url ${link} doesn't look like ${hosting.name} url.`);
                }
            } catch (error) {
                reportError(res, error);
            }
        });
    }
});