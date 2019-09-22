"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const authorization_controller_1 = require("./authorization.controller");
describe('Authorization Controller', () => {
    let module;
    beforeAll(async () => {
        module = await testing_1.Test.createTestingModule({
            controllers: [authorization_controller_1.AuthorizationController],
        }).compile();
    });
    it('should be defined', () => {
        const controller = module.get(authorization_controller_1.AuthorizationController);
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=authorization.controller.spec.js.map