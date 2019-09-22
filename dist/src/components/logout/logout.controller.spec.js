"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const logout_controller_1 = require("./logout.controller");
describe('Logout Controller', () => {
    let module;
    beforeAll(async () => {
        module = await testing_1.Test.createTestingModule({
            controllers: [logout_controller_1.LogoutController],
        }).compile();
    });
    it('should be defined', () => {
        const controller = module.get(logout_controller_1.LogoutController);
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=logout.controller.spec.js.map