let ignoredURLs = ['/api/user/login']

module.exports = ({ meta, config, managers }) => {
    return ({ req, res, next }) => {
        const token = res.req.headers.authorization?.replace("Bearer","")?.trim();
        if (!token && !ignoredURLs.includes(res.req.url)) {
            console.log('token required but not found')
            return managers.responseDispatcher.dispatch(res, { ok: false, code: 401, errors: 'unauthorized' });
        }
        
        let decoded = null;
        try {
            if (!ignoredURLs.includes(res.req.url)) {
                decoded = managers.token.verifyLongToken({ token });
                if (!decoded) {
                    console.log('failed to decode-1')
                    return managers.responseDispatcher.dispatch(res, { ok: false, code: 401, errors: 'unauthorized' });
                };
            }
        } catch (err) {
            console.log('failed to decode-2')
            return managers.responseDispatcher.dispatch(res, { ok: false, code: 401, errors: 'unauthorized' });
        }
        res.req.decoded = decoded
        next();
    }
}