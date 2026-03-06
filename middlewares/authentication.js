//to check whwther user exists or not
const { validateToken } = require("../services/authentication")

function checkForAuthenticationCookie(cookieName){
    return (req, res, next) => { //for this use cookie parser
         const tokenCookieValue = req.cookies[cookieName];
         if (!tokenCookieValue) {
           return next();
         }

       try {
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
        } catch (error) {
            // Token invalid or verification failed
            req.user = null;
        }

        next(); // ✅ Proceed to next middleware/route
    };
}

module.exports = {
     checkForAuthenticationCookie,    
}