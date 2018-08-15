const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];	
    if (token) {
        jwt.verify(token, "yqawv8nqi5", function(err, decoded) {
            if (err) {
                return res.status(403).json({ error: 'Failed to authenticate token.' });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.status(401).json({ error: 'No token provided.' });
    }
};

//     <div *ngIf="this.authenticationService.userAuthentication === false" class="users-login-block">
//     <form class="users-login">
//         <h2><i class="fas fa-book"></i> Library App</h2>
//     <p>Login {{authenticationLogin}}</p>
//     <input type="text" #log placeholder="Enter your login">

//     <p>Password</p>
//     <input type="password" #pass placeholder="Enter your pass">
//     <span [hidden]="this.authenticationService.loginError == false">Incorrect login or password</span>
//     <br><br>
//         <label>
//             <input type="checkbox" #checkbox name="remember"> Remember me
//         </label>
//     <button (click)="login(log.value, pass.value, checkbox.checked)" routerLink="/users">{{btnText}}</button>
    
// </form>
// </div>
// <router-outlet></router-outlet>

