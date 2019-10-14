# @responsekit/express
Wraps a base controller that returns express Responses with responsekit payloads.

## Install
This lib relies on the [https://github.com/IRCraziestTaxi/responsekit](@responsekit/core) lib.

To use `@responsekit/express`:

```
npm install --save @responsekit/core @responsekit/express
```

## CommandResultController
Extend your controller from `CommandResultController` to send a response based on a `CommandResult` and an express `Response`.

For example, using `routing-controllers`:

```ts
import { CommandResult } from "@responsekit/core";
import { CommandResultController } from "@responsekit/express";
import { JsonController, Post, Res } from "routing-controllers";
import { Mediator } from "tsmediator";
import { AddThingCommand } from "../commands/addThing/AddThingCommand";
import { Thing } from "../entities/Thing";

@JsonController("/things")
export class ThingController extends CommandResultController {
    @Post()
    public async addThing(
        @Body()
        command: AddThingCommand,
        @Res()
        response: Response
    ): Promise<Response> {
        const result: CommandResult<Thing> = await new Mediator().Send("AddThingHandler", command);

        // Return a response with the default HTTP status code of 200 if result was successful
        // or the appropriate HTTP status code based on the returned Rejection.
        return this.sendResponse(result, response);

        // Return a response with a custom HTTP status code of 201 if result was successful
        // or the appropriate HTTP status code based on the returned Rejection.
        return this.sendResponse(result, response, 201);
    }
}
```

For an extension of `tsmediator`'s `Mediator` that handles returning thrown `Rejection`s in a `Validate` method, for instance, check out the [https://github.com/IRCraziestTaxi/responsekit-tsmediator](`@responsekit/tsmediator`) package.