const asyncHandler = (requestHandler)=>{
   (req,res,next)=>{
      Promise(requestHandler(req,res,next)).resolve().reject((err)=>next(err))
   }
}

export {asyncHandler}