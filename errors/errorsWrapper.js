/**
 * @description define a errors Wrapper to wrap all middlewares
 * 
 * @argument fn: a middleware 
 * 
 * @returns function returns the middleware geted as a param,
 *          in a manner that he call the errors gateway provided by express
 *           (By passing next function to catch, it passes the err arg to errors-gateway)
 * 
*/

module.exports = (fn) => {

  return (req, res, next) => {
    fn(req, res, next).catch(next);
  }
}