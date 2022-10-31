function handleInternalErrors(err, req, res, next) {
    console.log(err);
    res.status(500).send({ message: 'Internal Server Error'});
}

function handleCustomErrors(err, req, res, next) {
    if(err.status){
        res.status(err.status).send({ message: err.message })
    } else {
        next(err);
    }
}

function handlePSQLErrors(err, req, res, next) {
    if(err.code === '22P02'){
        res.status(400).send({ message: 'Bad Request'})
    } else if (err.code === '23503') {
        res.status(404).send({message : 'Not found'})
    } else {
        next(err);
        }
    }

function handleInvalidRouteErrors(req,res){
    res.status(404).send({ message: "Invalid Route"})
};

function handleInternalErrors(err, req, res, next) {
    console.log(err);
    res.status(500).send({ message: 'Internal Server Error'});
}

module.exports = {handlePSQLErrors, handleCustomErrors, handleInternalErrors, handleInvalidRouteErrors};