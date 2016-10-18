module Raffle {
    export function IndexPage(): ng.IComponentOptions {
        return {
            templateUrl: "app/components/templates/IndexPage.html",
            controller: IndexPageController
        };
    }

    export class IndexPageController {
        constructor() {
            
        }
    }
}