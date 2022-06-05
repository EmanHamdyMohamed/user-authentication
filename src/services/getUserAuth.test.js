describe('Test Services : "getUserAuth"', () => {
    let sign;
    beforeEach(() => {
        const v = { virtual: true };
        sign = jest.fn().mockReturnValue('token');
        jest.doMock('jsonwebtoken', () => ({
            sign
        }), v);
    });

    afterEach(() => {
        jest.resetModules();
        jest.clearAllMocks();
    });

    it('should return user token', async () => {
        const { default: getUserAuth } = require('./getUserAuth');
        const res = await getUserAuth({
            email: 'email',
            fullName: 'fullName',
            id: 'id',
            roles: ['admin']
        });
        expect(sign).toHaveBeenCalled();
        expect(res).toEqual('token');
    });
});