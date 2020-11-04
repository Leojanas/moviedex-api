const {expect} = require('chai')
const supertest = require('supertest')
const app = require('../app')

describe('movie endpoint', ()=> {
    it('should return a 401 status for a bad authentication', ()=>{
        //still need to learn how to test with authentication
    })
    it('should return a full movie list when no query is submitted', ()=>{

    })
    it('should filter by name if name query is submitted', ()=>{

    })
    it('should filter by country if country query is submitted', ()=>{

    })
    it('should return a 400 error if an avg_vote query is not numeric', ()=>{

    })
    it('should filter by avg_vote for a valid avg_vote query', ()=>{

    })
})