import { CommandResult, GenericResponse, Rejection, ResponseStatus } from "@responsekit/core";
import { Response } from "express";

export abstract class CommandResultController {
    protected sendResponse<T>(
        result: CommandResult<T>,
        response: Response,
        successStatus: number = 200
    ): Response {
        if (result instanceof Rejection) {
            return response
                .status(result.reason)
                .json(new GenericResponse({
                    message: result.message,
                    status: ResponseStatus.Failure
                }));
        }
        else {
            return response
                .status(successStatus)
                .json(result);
        }
    }
}
