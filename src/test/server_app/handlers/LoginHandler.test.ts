import { LoginHandler } from "../../../app/server_app/handlers/LoginHandler"
import { IncomingMessage, ServerResponse } from "http";
import { Authorizer } from "../../../app/server_app/auth/Authorizer";
import { HTTP_CODES } from "../../../app/server_app/model/ServerModel";


const requestMock = {
 method: 'POST',
}

const responseMock = {
 writeHead: jest.fn(),
 write: jest.fn(),
 statusCode: 0,
}

const authorizerMock = {
 login: jest.fn(),
}

const getRequestBodyMock = jest.fn()

jest.mock('../../../app/server_app/utils/Utils', () => {
 return {
  getRequestBody: () => getRequestBodyMock()
 }
})


describe('Login handler test suite', () => {
   let sut: LoginHandler

 beforeEach(() => {
  sut = new LoginHandler(requestMock as IncomingMessage, responseMock as any as ServerResponse, authorizerMock as any as Authorizer)
 })

 afterEach(() => {
  jest.clearAllMocks()
 })

 it('should return token with valid user credentials', async () => {
   getRequestBodyMock.mockResolvedValueOnce({
    userName: 'test',
    password: 'test',
   })

   authorizerMock.login.mockResolvedValueOnce('1234')

   await sut.handleRequest()
 })

 it('should throw 404 error for invalid user credentials', async () => {
  getRequestBodyMock.mockResolvedValueOnce({
   userName: 'test',
   password: 'test',
  })

  authorizerMock.login.mockResolvedValueOnce('')

  await sut.handleRequest()

  expect(responseMock.statusCode).toBe(HTTP_CODES.NOT_fOUND)
  expect(responseMock.write).toHaveBeenCalledWith(JSON.stringify('wrong username or password')) 
 })

 it('should throw 400 error if no username and password passed in request',async () => {
  getRequestBodyMock.mockResolvedValueOnce({
   userName: '',
   password: '',
  }) 

  await sut.handleRequest()

  expect(responseMock.statusCode).toBe(HTTP_CODES.BAD_REQUEST)
  expect(responseMock.write).toHaveBeenCalledWith(JSON.stringify('userName and password required')) 

 })
})