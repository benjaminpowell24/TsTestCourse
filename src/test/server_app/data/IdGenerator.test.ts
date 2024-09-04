import * as IdGenerator from '../../../app/server_app/data/IdGenerator'
import { generateRandomId } from '../../../app/server_app/data/IdGenerator'

describe('random Id generator test suite', () => {

 
 it('should return a generated id', () => {
   jest.spyOn(IdGenerator, 'generateRandomId').mockReturnValue('1234')


  const actual = generateRandomId()
 
  expect(actual).toBe('1234')
 })
})