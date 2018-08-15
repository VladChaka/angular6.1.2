require("../index");
let chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../index'),
    mongoose = require("mongoose"),
    bcrypt = require('bcrypt-nodejs'),
    jwt = require('jsonwebtoken'),
    userRepository = require("../util/dataCore").userRepository;
    should = chai.should();

chai.use(chaiHttp);

function TestingServise() {
    let self = this;

    self.success = function (res, status) {        
        if (status === 200) {
            res.should.have.status(status);
            res.body.should.be.a('object');
            res.body.user.should.have.property("username");
            res.body.user.should.have.property("email");
            res.body.user.should.have.property("post");
            res.body.user.should.have.property("phone");
            res.body.user.should.have.property("fullname");
        } else {
            
            res.should.have.status(status);
            res.body.should.be.a('object');
            res.body.should.have.property("error");
        }	
    }

    self.token = function (user) {
        return jwt.sign({ username: user.username }, 'yqawv8nqi5', { expiresIn: '1 h' });
    }
}

describe('Users', () => {
    let self = this;
    delete mongoose.connection.models['User'];
    TestingServise.apply(self);

    beforeEach(() => {
        userRepository.SchemaModel.remove({}, function (err) {
            if (err) throw new Error(err.message);
        });     
    });

    describe('/GET users', () => {
        it('it should GET all users', () => {
            let user = new userRepository.SchemaModel({
                username: "Vasya0",
                email: "allankar0@mail.ru",
                post: "Admin",
                phone: "4623452343",
                password: "vlad12345",
                fullname: "Vasya Pupkin",
                rating: 0,
                regDate: "30.10.2018"
            });
            chai.request(server)
                .get('/users')
                .query({ token: self.token(user) })
                .end((err, res) => {
                    if (err) throw new Error(err.message);
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                });
        });

        it('it should GET user by the given id', () => {
            let user = new userRepository.SchemaModel({
                username: "Vasya1",
                email: "allankar1@mail.ru",
                post: "Admin",
                phone: "4623452343",
                password: "vlad12345",
                fullname: "Vasya Pupkin",
                rating: 0,
                regDate: "30.10.2018"
            });
            userRepository.hashPassword(user, function(user) {
                user.save(function(err, user) {
                    if (err) throw new Error(err.message);				
                    chai.request(server)
                        .get('/users/' + user.id)
                        .query({ token: self.token(user) })
                        .end((err, res) => {
                            if (err) throw new Error(err.message);
                            self.success(res, 200);
                        });
                });
            });
        });

        it('it should not GET user by the given invalid id', () => {
            let user = new userRepository.SchemaModel({
                username: "Vasya2",
                email: "allankar2@mail.ru",
                post: "Admin",
                phone: "4623452343",
                password: "vlad12345",
                fullname: "Vasya Pupkin",
                rating: 0,
                regDate: "30.10.2018"
            });
            userRepository.hashPassword(user, function(user) {
                user.save(function(err, user) {
                    if (err) throw new Error(err.message);
                    chai.request(server)
                        .get('/users/4glglkj656344532dfasd')
                        .query({ token: self.token(user) })
                        .end((err, res) => {
                            if (err) throw new Error(err.message);
                            self.success(res, 400);
                        });
                });
            });
        });
    });

    describe('/POST users', () => {
        it('it should POST auth user', () => {
            let user = new userRepository.SchemaModel({
                username: "Vasya3",
                email: "allankar3@mail.ru",
                post: "Admin",
                phone: "4623452343",
                password: "vlad12345",
                fullname: "Vasya Pupkin",
                rating: 0,
                regDate: "30.10.2018"
            });
            userRepository.hashPassword(user, function (user) {
                user.save(function(err, user) {
                    if (err) throw new Error(err.message);
                    chai.request(server)
                        .post('/login')
                        .send({
                            username: "Vasya3",
                            password: "vlad12345"
                        })
                        .query({ token: self.token(user) })
                        .end((err, res) => {
                            if (err) throw new Error(err.message);
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property("status");
                            res.body.should.have.property("id");
                            res.body.should.have.property("token");
                        });
                })
            });
        });

        it('it should not POST auth user without password field', () => {
            let user = new userRepository.SchemaModel({
                username: "Vasya4",
                email: "allankar4@mail.ru",
                post: "Admin",
                phone: "4623452343",
                password: "vlad12345",
                fullname: "Vasya Pupkin",
                rating: 0,
                regDate: "30.10.2018"
            });
            userRepository.hashPassword(user, function(user) {
                user.save(function(err, user) {				
                    if (err) throw new Error(err.message);
                    chai.request(server)
                        .post('/login')
                        .send({
                            username: "Vasya"
                        })
                        .query({ token: self.token(user) })
                        .end((err, res) => {
                            if (err) throw new Error(err.message);
                            self.success(res, 400);
                        });
                });
            });
        });

        it('it should POST user', () => {
            let user = {
                username: "Viktor",
                email: "Viktoria@mail.ru",
                post: "Odmennnnn",
                password: "vlad12345",
                phone: "4623452343",
                fullname: "Odmen Viktor",
                rating: 0,
                regDate: "30.10.2018"
            };
            chai.request(server)
                .post('/users')
                .send(user)
                .query({ token: self.token(user) })
                .end((err, res) => {
                    if (err) throw new Error(err.message);                    
                    self.success(res, 200);
                });
        });

        it('it should not POST user without password field', () => {
            let user = {
                username: "Vasya5",
                email: "allankar5@mail.ru",
                post: "Admin",
                phone: "4623452343",
                fullname: "Vasya Pupkin",
                rating: 0,
                regDate: "30.10.2018"
            };
            chai.request(server)
                .post('/users')
                .send(user)
                .query({ token: self.token(user) })
                .end((err, res) => {
                    if (err) throw new Error(err.message);
                    self.success(res, 400);
                });
        });
    });

    describe('/PUT users', () => {
        it('it should PUT user by the given id', () => {
            let user = new userRepository.SchemaModel({
                username: "Vasya6",
                email: "allankar6@mail.ru",
                post: "Admin",
                phone: "4623452343",
                password: "vlad12345",
                fullname: "Vasya Pupkin",
                rating: 0,
                regDate: "30.10.2018"
            });
            userRepository.hashPassword(user, function(user) {
                user.save(function(err, user) {
                    if (err) throw new Error(err.message);
                    chai.request(server)
                        .put('/users/' + user.id)
                        .send({
                            username: "Fedya",
                            email: "FedyaTop@mail.ru",
                            post: "Odmen",
                            phone: "4623452343",
                            password: "Fedya12345",
                            fullname: "Fedya Papkin"
                        })
                        .query({ token: self.token(user) })
                        .end((err, res) => {
                            if (err) throw new Error(err.message);
                            self.success(res, 200);
                        });
                });
            });
        });

        it('it should not PUT user by the given invalid id', () => {
            let user = new userRepository.SchemaModel({
                username: "Vasya7",
                email: "allankar7@mail.ru",
                post: "Admin",
                phone: "4623452343",
                password: "vlad12345",
                fullname: "Vasya Pupkin",
                rating: 0,
                regDate: "30.10.2018"
            });
            userRepository.hashPassword(user, function(user) {
                user.save(function(err, user) {
                    if (err) throw new Error(err.message);
                    chai.request(server)
                        .put('/users/b3456jh3lj54g6345jl34')
                        .send({
                            username: "Fedya",
                            email: "FedyaTop@mail.ru",
                            post: "Odmen",
                            phone: "4623452343",
                            password: "Fedya12345",
                            fullname: "Fedya Papkin"
                                                })
                        .query({ token: self.token(user) })
                        .end((err, res) => {
                            if (err) throw new Error(err.message);
                            self.success(res, 500);
                        });
                });
            });
        });
    });

    describe('/DELETE users', () => {
        it('it should DELETE user by the given id', () => {
            let user = new userRepository.SchemaModel({
                username: "Vasya8",
                email: "allankar8@mail.ru",
                post: "Admin",
                phone: "4623452343",
                password: "vlad12345",
                fullname: "Vasya Pupkin",
                rating: 0,
                regDate: "30.10.2018"
            });
            userRepository.hashPassword(user, function(user) {
                user.save(function(err, user) {
                    if (err) throw new Error(err.message);
                    chai.request(server)
                        .delete('/users/' + user.id)
                        .query({ token: self.token(user) })
                        .end((err, res) => {
                            if (err) throw new Error(err.message);
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property("status");
                            res.body.should.have.property("success");
                        });
                });
            });
        });

        it('it should not DELETE user by the given invalid id', () => {
            let user = new userRepository.SchemaModel({
                username: "Vasya9",
                email: "allankar9@mail.ru",
                post: "Admin",
                phone: "4623452343",
                password: "vlad12345",
                fullname: "Vasya Pupkin",
                rating: 0,
                regDate: "30.10.2018"
            });
            userRepository.hashPassword(user, function(user) {
                user.save(function(err, user) {
                    if (err) throw new Error(err.message);
                    chai.request(server)
                        .delete('/users/4jglkj3454hg4hjgfhjg')
                        .query({ token: self.token(user) })
                        .end((err, res) => {
                            if (err) throw new Error(err.message);
                            self.success(res, 400);
                        });
                });
            });
        });
    });
});

