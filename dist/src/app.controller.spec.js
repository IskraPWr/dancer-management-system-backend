"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
describe('AppController', () => {
    let app;
    beforeAll(async () => {
        app = await testing_1.Test.createTestingModule({
            controllers: [app_controller_1.AppController],
            providers: [app_service_1.AppService],
        }).compile();
    });
    describe('root', () => {
        it('should return "Hello World!"', () => {
            const appController = app.get(app_controller_1.AppController);
            expect(appController.root()).toBe('Hello World!');
        });
    });
});
//# sourceMappingURL=app.controller.spec.js.map