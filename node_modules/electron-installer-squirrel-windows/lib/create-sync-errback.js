// @todo (imlucas): move this to `ampersand-sync-errback`
var createSyncErrback = function(method, model, options) {
  var fn = options.error;
  options.error = function(resp) {
    if (fn) {
      fn(model, resp, options);
    }
    model.trigger('error', model, resp, options);
  };

  var success = options.success;
  options.success = function(resp) {
    if (!model.set(model.parse(resp, options), options)) return false;
    if (success) {
      success(model, resp, options);
    }
  };
  return function(err, resp) {
    if (err) {
      options.error(err);
    } else {
      options.success(resp);
    }
  };
};

module.exports = createSyncErrback;
