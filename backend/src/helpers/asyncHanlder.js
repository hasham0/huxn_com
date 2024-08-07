const asyncHandler = (requestHandler) => async (request, response, next) => {
  return Promise.resolve(requestHandler(request, response, next)).catch(
    (error) => {
      next(error);
    }
  );
};

export default asyncHandler;
