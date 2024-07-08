import { getRequestBody } from "../../../app/server_app/utils/Utils"
import { IncomingMessage } from "http"

const requestMock = {
 on: jest.fn()
}

const someObject = {
 id: '1234',
 name: 'test',
 city: 'test',
}

const someObjAsString = JSON.stringify(someObject)

describe('getRequestBody test suite', () => {

it('should return object for valid JSON body', async() => {
 requestMock.on.mockImplementation((event, cb) => {
  if(event === 'data'){
   cb(someObjAsString)
  } else cb()
 })

 const actual = await getRequestBody(requestMock as any as IncomingMessage)

 expect(actual).toEqual(someObject)
})

it('should throw error for invalid JSON body', async() => {
 requestMock.on.mockImplementation((event, cb) => {
  if(event === 'data'){
   cb('a' + someObjAsString)
  } else cb()
 })


 await expect( getRequestBody(requestMock as any)).rejects.toThrow("Unexpected token 'a', \"a{\"id\":\"12\"... is not valid JSON")
})

it('should throw error for error event', async () => {
const someError = new Error('test error')
requestMock.on.mockImplementation((event, cb) => {
 if(event === 'error'){
  cb(someError)
 }
})

const actual = getRequestBody(requestMock as any)

await expect(actual).rejects.toThrow(someError.message)
})


})