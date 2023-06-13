exports.successResponse = (request, response, data, code = 200) => response.send({
    code,
    data,
    success: true,
  });
  
  exports.errorResponse = (
    request,
    response,
    errorMessage = 'Something went wrong.Please try again.',
    code = 500,
    error = {},
  ) => response.status(code).json({
    code,
    errorMessage,
    error,
    success: false,
  });