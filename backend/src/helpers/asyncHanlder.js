const asyncHandler = (requestHandler) => async (request, response, next) => {
  return Promise.resolve(requestHandler(request, response, next)).catch(
    (error) => {
      console.log("🚀 ~ asyncHandler ~ error:", error);
      next(error);
    }
  );
};

export default asyncHandler;
