module Raffle {
    export function IssueScreen(): ng.IComponentOptions {
        return {
            templateUrl: "app/components/templates/IssueScreen.html",
            controller: IssueScreenController
        };
    }

    export class IssueScreenController {
        constructor() {
            
        }
    }
}