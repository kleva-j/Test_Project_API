/* eslint-disable consistent-return */
import NodeCache from 'node-cache';

const CacheMiddleware = (timeout) => (req, res, next) => {
  const Cache = new NodeCache({ stdTTL: timeout, checkperiod: timeout * 2, useClones: false });
  const key = `cache<=>${req.originalUrl || req.url}`;
  const cacheContent = Cache.get(key);
  if (cacheContent) {
    return res.status(200).json({
      status: 'Success',
      message: 'Single Product',
      result: cacheContent,
    });
  }
  res.sendJson = res.json;
  res.json = ({ status, result, ...rest }) => {
    Cache.set(key, result, timeout);
    res.sendJson({ status, ...rest, result });
  };
  next();
};

export default CacheMiddleware;
