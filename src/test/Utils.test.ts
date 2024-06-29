import { getStringInfo, toUpperCase } from "../app/Utils"

describe('Utils test suite', () => {
 it('should return uppercase', () => {
  //Arrange:
  const sut = toUpperCase;
  const expected = 'ABC';

  //act:
  const actual = sut('abc')

  //assert
  expect(actual).toBe(expected)
 })
})


describe('getStringInfo for arg: My-string', () => { 
 //arrange:
  const sut = getStringInfo;

  //act:
  const actual = sut('My-string');

 it('should return lower case', () => {
    expect(actual.lowerCase).toBe('my-string')
 })

 it('should return character length', () => {
    expect(actual.length).toBe(9)
    expect(actual.characters).toHaveLength(9)

 })

 it('should return right value for extrainfo', () => {
  expect(actual.extraInfo).toEqual({})
 })

 it('should check if extraInfo is defined or truthy', () => {
//Check undefined
   expect(actual.extraInfo).not.toBe(undefined)
   expect(actual.extraInfo).not.toBeUndefined()
   expect(actual.extraInfo).toBeDefined()

   //Check for truthy values
   expect(actual.extraInfo).toBeTruthy()
 })


 it('should return right characters in array', () => {
expect(actual.characters).toEqual(['M', 'y', '-', 's', 't', 'r', 'i', 'n', 'g'])
  //Array contains string char
  expect(actual.characters).toContain<string>('M')
  //Array contains characters in different order
    expect(actual.characters).toEqual(
     expect.arrayContaining(['M', 'g', 'y', 't', 'r', 'i', 'n', '-', 's'
     ])
    )
 })
 })

 //Parametrized testing
 //Test multiple args or use cases

describe('Uppercase test examples', () => {
 it.each([
  {input: 'cat', expected: 'CAT'},
  {input: 'abc', expected: 'ABC'},
  {input: 'chair', expected: 'CHAIR'},
 ])('$input return uppercase as $expected', ({input, expected}) => {
  //Arrange:
  const sut = toUpperCase;
  //act:
  const actual = sut(input)
  //assert
  expect(actual).toBe(expected)
 })
})