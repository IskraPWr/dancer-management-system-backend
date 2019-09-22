"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const charges_controller_1 = require("./charges.controller");
describe('Charges Controller', () => {
    let module;
    beforeAll(async () => {
        module = await testing_1.Test.createTestingModule({
            controllers: [charges_controller_1.ChargesController],
        }).compile();
    });
    it('should be defined', () => {
        const controller = module.get(charges_controller_1.ChargesController);
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=charges.controller.spec.js.map