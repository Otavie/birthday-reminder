import request from 'supertest'
import { app } from '../app'

describe('POST /birthdays', () => {
    it('should respond with status 201 when adding a new celebrant', async() => {
        const res = await request(app)
            .post('/birthdays')
            .send({ username: 'test-user', email: 'test-user@example.com', dateOfBirth: '2000-01-01' })
        expect(res.status).toBe(201)    
    })

    it('should respond with status 400 when missing required fields', async() => {
        const res = await request(app)
            .post('/birthday')
            .send({ username: 'test-user' })        // Missing email and dateOfBirth
        expect(res.status).toBe(400)
    })

    it('should respond with status 400 when email is already in use', async () => {
        const res = await request(app)
            .post('/birthdays')
            .send({ username: 'test-user', email: 'test-user@example.com', dateOfBirth: '2000-01-01' })
        expect(res.status).toBe(400)
    })
})