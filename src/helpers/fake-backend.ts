// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users') || '[]') || [];

export function configuraFakeBackend() {
    let realFetch = window.fetch;

    window.fetch = function (url: string, opts: any) {
        return new Promise((resolve: any, reject: any) => {
            // mô phỏng thời gian chờ gọi đến máy chủ
            setTimeout(() => {
                // Xác thực
                if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
                    // lấy các tham số từ post rq
                    let params = JSON.parse(opts.body);

                    // tìm nếu bất kỳ người dùng nào đăng nhập khớp
                    let filteredUsers = users.filter((user: any) => {
                        return user.username === params.username && user.password === params.password;
                    });

                    if (filteredUsers.length) {
                        // xác thực thành công trả về user detail và mô phỏng jwt token
                        let user = filteredUsers[0];
                        let responseJson = {
                            id: user.id,
                            username: user.username,
                            firstName: user.firstName,
                            lastName: user.lastname,
                            token: 'fake-jwt-token'
                        };
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(responseJson)), status: 200});
                    } else {
                        reject('Username or password is incorrect');
                    }

                    return;
                }

                // get users
                if (url.endsWith('/users') && opts.method === 'GET') {
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(users)) });
                    } else {
                        reject('Unauthorised!');
                    }
                    return;
                }

                // register user
                if (url.endsWith("/users/register") && opts.method === 'POST') {
                    let newUser = JSON.parse(opts.body);

                    // validation
                    let duplicateUser = users.filter((user: any) => { return user.username === newUser.username; }).length;
                    if (duplicateUser) {
                        reject('Username "' + newUser.username + '" is already taken');
                        return;
                    }

                    // save
                    newUser.id = users.length ? Math.max(...users.map((user: any) => user.id)) + 1 : 1;
                    users.push(newUser);
                    localStorage.setItem('users', JSON.stringify(users));

                    resolve({ ok: true, text: () => Promise.resolve() });

                    return;
                }

                // delete user
                if (url.match(/\/users\/\d+$/) && opts.method === 'DELETE' ) {
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        // find user by id in users array
                        let urlParts = url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        for (let i = 0; i < users.length; i++) {
                            let user = users[i];
                            if (user.id === id) {
                                // delete user
                                users.splice(i, 1);
                                localStorage.setItem('users', JSON.stringify(users));
                                break;
                            }
                        }

                        // respond 200 OK
                        resolve({ ok: true, text: () => Promise.resolve() });
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }

                // pass through any requests not handled above
                realFetch(url, opts).then(response => resolve(response));
            }, 500);
        })
    }
}