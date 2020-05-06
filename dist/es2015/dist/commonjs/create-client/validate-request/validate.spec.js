"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validate_1 = __importDefault(require("./validate"));
describe('validate', () => {
    it('throws if data does not match schema, with an explanative message', () => {
        const schema = {
            type: 'object',
            properties: {
                foo: { type: 'number' },
                bar: { type: 'string' },
            },
        };
        const data = {
            foo: '10',
            bar: 10,
        };
        expect(() => validate_1.default(schema, data)).toThrow([
            '[oa-client:103] Data does not pass validation: data.foo should be number',
            'schema path: #/properties/foo/type',
            'params: {"type":"number"}',
            'data: {"foo":"10","bar":10}',
        ].join('\n'));
    });
    it('does not throw if data matches schema', () => {
        const schema = { type: 'number' };
        const data = 10;
        expect(() => validate_1.default(schema, data)).not.toThrow();
    });
});
