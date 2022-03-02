const app = require('../app');
const request = require('supertest');
const cors = require('cors')

const corsConfig = {
    origin: true,
    credentials: true,
};

app.use(cors(corsConfig));
app.options('*', cors(corsConfig));

function makeRandom(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

describe("Employee Microservice",() => {
    describe("Create Employee", () => {
        test("without login should respond with a 400 status code", async () => {
            let response = await request(app).post("/api/employees/create").send({

            });

            expect(response.statusCode).toBe(401);
        });

        test("with login should respond with a 200 status code", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/employees/create").send({
                id: 1
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        });

        test("validation check", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/employees/create").send({})
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=` + cookie[0]]);

            expect(JSON.stringify(response.body)).toBe('{"code":500,"error":["Name is required","Name should be between 2-32 characters","Surname is required","Surname should be between 2-32 characters","Username is required","Username should be between 2-32 characters","Password is required","Password should be between 8-32 characters","Invalid value","Proper email is required","Email should be between 2-32 characters","Position name is required","Position name  should be between 2-32 characters","Invalid value"]}')
        });
    });

    describe("Get Employee by Id", () => {
        test("without login should respond with a 400 status code", async () => {

            let response = await request(app).post("/api/employees/get").send({
                id: 1
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login should respond with a 200 status code", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/employees/get").send({
                id: 1
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        });

        test("validation check", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/employees/get").send({})
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=` + cookie[0]]);

            expect(JSON.stringify(response.body)).toBe('{"code":500,"error":["Id is required"]}')
        });
    });

    describe("Get all", () => {
       test("without login respond with a 400 status code", async () => {
           let response = await request(app).get("/api/employees/getAll")
           expect(response.statusCode).toBe(401);
       });

        test("with login respond with a 200 status code", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).get("/api/employees/getAll")
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            console.log("login");
            console.log(response);

            expect(response.statusCode).toBe(200);
        });
    });

    describe("Get with username", () => {
       test("without login respond with a 400 status code", async () => {
           let response = await request(app).post("/api/employees/get-with-username").send({
              username: "employee"
           });
           expect(response.statusCode).toBe(401);
       });

        test("with login respond with a 200 status code", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/employees/get-with-username").send({
                username: "employee"
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        });

        test("validation check", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/employees/get-with-username").send({})
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=` + cookie[0]]);

            expect(JSON.stringify(response.body)).toBe('{"code":500,"error":["Username is required"]}')
        });
    });

    describe("Update", () => {
       test("without login respond with a 400 status code", async () => {
           let response = await request(app).put("/api/employees/update").send({
               id: 1,
               username: "employee"
           });
           expect(response.statusCode).toBe(401);
       });

        test("with login respond with a 200 status code", async () => {

            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");


            let response = await request(app).put("/api/employees/update").send({

            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        });

        test("validation check", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).put("/api/employees/update").send({})
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=` + cookie[0]]);

            expect(JSON.stringify(response.body)).toBe('{"code":500,"error":["Id is required"]}')
        });
    });

    describe("Delete", () => {
       test("without login respond with a 401 status code", async () => {
           let response = await request(app).post("/api/employees/delete").send({
           });

           expect(response.statusCode).toBe(401);
       });

        test("with login respond with a 200 status code", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/employees/delete").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        });

        test("validation check", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/employees/delete").send({})
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=` + cookie[0]]);

            expect(JSON.stringify(response.body)).toBe('{"code":500,"error":["Id is required"]}')
        });
    });
});

describe("Authentication Microservice",() => {
    describe("Login", () => {
        test("must return with a 200 status code", async ()=>{
            let response = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            expect(response.statusCode).toBe(200);
        });

        test("must return with a 400 status code", async ()=>{
            let response = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basareffgbasar"
            });

            expect(response.statusCode).toBe(400);
        });

        test("validation check", async ()=>{
            let response = await request(app).post("/api/authentication/login").send({

            });

            expect(JSON.stringify(response.body)).toBe('{"code":500,"error":{"code":"ERR_INVALID_ARG_TYPE"}}')
        });
    });
});

describe("Approval Request", ()=>{
    describe('create', () => {
       test("without login", async () => {
           let response = await request(app).post("/api/approvalRequest/create").send({
           });

           expect(response.statusCode).toBe(401);
       });

       test("with login", async () => {
           let login = await request(app).post("/api/authentication/login").send({
               username: "admin",
               password: "basarbasar"
           });

           let cookie = login.headers["set-cookie"][0].split('access-token=');
           cookie = cookie[1].split("\r\n");

           let response = await request(app).post("/api/approvalRequest/create").send({
           })
               .set('Accept-Language', 'en')
               .set('Cookie', [`access-token=`+cookie[0]])

           expect(response.statusCode).not.toBe(401);
       })

        test("validation check", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/approvalRequest/create").send({})
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=` + cookie[0]]);

            expect(JSON.stringify(response.body)).toBe('{"code":500,"error":["Employee Id is required","Invalid value","Course Id is required","Invalid value"]}')
        });
    });

    describe("Get", () => {
        test("without login", async () => {
            let response = await request(app).post("/api/approvalRequest/get").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/approvalRequest/get").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        })

        test("validation check", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/approvalRequest/get").send({})
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=` + cookie[0]]);

            expect(JSON.stringify(response.body)).toBe('{"code":500,"error":["Approval Request Id is required","Invalid value"]}')
        });
    });

    describe("GetAll", () => {
        test("without login", async () => {
            let response = await request(app).get("/api/approvalRequest/getAll").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).get("/api/approvalRequest/getAll").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        })
    });

    describe("Delete", () => {
        test("without login", async () => {
            let response = await request(app).post("/api/approvalRequest/delete").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/approvalRequest/delete").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        })

        test("validation check", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/approvalRequest/delete").send({})
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=` + cookie[0]]);

            expect(JSON.stringify(response.body)).toBe('{"code":500,"error":["Approval Request Id is required","Invalid value"]}')
        });
    });

    describe("Update", () => {
        test("without login", async () => {
            let response = await request(app).put("/api/approvalRequest/update").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/approvalRequest/update").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        })

        test("validation check", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/approvalRequest/update").send({})
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=` + cookie[0]]);

            expect(JSON.stringify(response.body)).toBe('{}')
        });
    });

    describe("Get with Employee Id", () => {
        test("without login", async () => {
            let response = await request(app).post("/api/approvalRequest/get/employee").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/approvalRequest/get/employee").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        })

        test("validation check", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/approvalRequest/get/employee").send({})
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=` + cookie[0]]);

            expect(JSON.stringify(response.body)).toBe('{"code":500,"error":["Employee Id is required","Invalid value"]}')
        });
    });

    describe("Get with Manager Id", () => {
        test("without login", async () => {
            let response = await request(app).post("/api/approvalRequest/get/manager").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/approvalRequest/get/manager").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        })
        test("validation check", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/approvalRequest/get/manager").send({})
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=` + cookie[0]]);

            expect(JSON.stringify(response.body)).toBe('{"code":500,"error":["Manager Id is required","Invalid value"]}')
        });
    });
});

describe("Assignment", () => {
    describe("Create", () => {
        test("without login", async () => {
            let response = await request(app).post("/api/assignment/createAssignment").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/assignment/createAssignment").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        });

        test("validation check", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/assignment/createAssignment").send({})
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=` + cookie[0]]);

            expect(JSON.stringify(response.body)).toBe('{"code":500,"error":["Deadline is required"]}')
        });
    });

    describe("Get", () => {
        test("without login", async () => {
            let response = await request(app).post("/api/assignment/getAssignment").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/assignment/get").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        });

        test("validation check", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/assignment/get").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(JSON.stringify(response.body)).toBe('{}')
        });
    });

    describe("Get All Assignments", () => {
        test("without login", async () => {
            let response = await request(app).post("/api/assignment/getAllAssignments").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/assignment/getAllAssignments").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        })
    });

    describe("Delete Assignment", () => {
        test("without login", async () => {
            let response = await request(app).post("/api/assignment/deleteAssignment").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/assignment/deleteAssignment").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        })

        test("validation check", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/assignment/deleteAssignment").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(JSON.stringify(response.body)).toBe('{"code":500,"error":["Id is required","Manager Id is required"]}')
        });
    });

    describe("Update Assignment", () => {
        test("without login", async () => {
            let response = await request(app).put("/api/assignment/updateAssignment").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).put("/api/assignment/updateAssignment").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        });

        test("validation check", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/assignment/updateAssignment").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(JSON.stringify(response.body)).toBe('{}')
        });
    });

    describe("Get With ManagerId", () => {
        test("without login", async () => {
            let response = await request(app).post("/api/assignment/getWithManager").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/assignment/getWithManager").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        })

        test("validation check", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/assignment/getWithManager").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(JSON.stringify(response.body)).toBe('{"code":500,"error":["Manager Id is required"]}')
        });
    });

    describe("Get With EmployeeId", () => {
        test("without login", async () => {
            let response = await request(app).post("/api/assignment/getWithEmployee").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/assignment/getWithEmployee").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        })

        test("validation check", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/assignment/getWithEmployee").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(JSON.stringify(response.body)).toBe('{"code":500,"error":["Employee Id is required"]}')
        });
    });
});

describe("Course", () => {
    describe("Create", () => {
        test("without login", async () => {
            let response = await request(app).post("/api/course/createCourse").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/course/createCourse").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        })

        test("validation check", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/course/createCourse").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(JSON.stringify(response.body)).toBe('{"code":500,"error":["Name is required","Name should be between 2-32 characters","Description is required","duration attribute is required","isLive attribute is required","categoryId is required"]}')
        });
    });

    describe("Get", () => {
        test("without login", async () => {
            let response = await request(app).post("/api/course/getCourse").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/course/getCourse").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        })

        test("validation check", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/course/getCourse").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(JSON.stringify(response.body)).toBe('{"code":500,"error":["Id is required"]}')
        });
    });

    describe("Get All Courses", () => {
        test("without login", async () => {
            let response = await request(app).post("/api/course/getAllCourses").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/course/getAllCourses").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        })
    });

    describe("Delete Course", () => {
        test("without login", async () => {
            let response = await request(app).post("/api/course/deleteCourse").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/course/deleteCourse").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        });
        test("validation check", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/course/deleteCourse").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(JSON.stringify(response.body)).toBe('{"code":500,"error":["Id is required"]}')
        });
    });

    describe("Update Course", () => {
        test("without login", async () => {
            let response = await request(app).put("/api/course/updateCourse").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).put("/api/course/updateCourse").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        })

        test("validation check", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).put("/api/course/updateCourse").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(JSON.stringify(response.body)).toBe('{"code":500,"error":["Id is required","Name should be between 2-32 characters"]}')
        });
    });

    describe("Get All Videos By Course Id", () => {
        test("without login", async () => {
            let response = await request(app).post("/api/course/getAllVideosByCourseId").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/course/getAllVideosByCourseId").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        })

        test("validation check", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/course/getAllVideosByCourseId").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(JSON.stringify(response.body)).toBe('{"code":500,"error":["Id is required"]}')
        });
    });

    describe("Get All Courses of Employee", () => {
        test("without login", async () => {
            let response = await request(app).post("/api/course/getAllCoursesOfEmployee").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/course/getAllCoursesOfEmployee").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        })

        test("validation check", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/course/getAllCoursesOfEmployee").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(JSON.stringify(response.body)).toBe('{"code":500,"error":["employeeId is required"]}')
        });
    });

    describe("Create Video Course Matching", () => {
        test("without login", async () => {
            let response = await request(app).post("/api/course/createVideoCourseMatching").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/course/createVideoCourseMatching").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        })

        test("validation check", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/course/createVideoCourseMatching").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(JSON.stringify(response.body)).toBe('{"code":500,"error":["Order is required","Order should be a decimal number","courseId is required","courseId should be a decimal number","videoId is required","videoId should be a decimal number"]}')
        });
    });

    describe("Delete Video Course Matching", () => {
        test("without login", async () => {
            let response = await request(app).post("/api/course/deleteVideoCourseMatching").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/course/deleteVideoCourseMatching").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        });

        test("validation check", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/course/deleteVideoCourseMatching").send({})
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=` + cookie[0]])

            expect(JSON.stringify(response.body)).toBe('{"code":500,"error":["Id is required"]}');
        });
    });

    describe("Get All Video Course Matching", () => {
        test("without login", async () => {
            let response = await request(app).get("/api/course/getAllVideoCourseMatchings").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).get("/api/course/getAllVideoCourseMatchings").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        });
    });

    describe("Get All Categories", () => {
        test("without login", async () => {
            let response = await request(app).post("/api/course/getAllCategories").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/course/getAllCategories").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        })
    });

    describe("Get Category", () => {
        test("without login", async () => {
            let response = await request(app).post("/api/course/getCategory").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/course/getCategory").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        })

        test("validation check", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/course/getCategory").send({})
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=` + cookie[0]])

            expect(JSON.stringify(response.body)).toBe('{"code":500,"error":["Id is required"]}');
        });
    });

    describe("Update Category", () => {
        test("without login", async () => {
            let response = await request(app).put("/api/course/updateCategory").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).put("/api/course/updateCategory").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        });

        test("validation check", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).put("/api/course/updateCategory").send({})
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=` + cookie[0]])

            expect(JSON.stringify(response.body)).toBe('{"code":500,"error":["Id is required","Name should be between 2-32 characters"]}');
        });
    });

    describe("Delete Category", () => {
        test("without login", async () => {
            let response = await request(app).post("/api/course/deleteCategory").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/course/deleteCategory").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        });

        test("validation check", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/course/deleteCategory").send({})
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=` + cookie[0]])

            expect(JSON.stringify(response.body)).toBe('{"code":500,"error":["Id is required"]}');
        });
    });

    describe("Create Category", () => {
        test("without login", async () => {
            let response = await request(app).post("/api/course/createCategory").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/course/createCategory").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        });

        test("validation check", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/course/createCategory").send({})
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=` + cookie[0]])

            expect(JSON.stringify(response.body)).toBe('{"code":500,"error":["Name is required","Name should be between 2-32 characters"]}');
        });
    });
});

describe("Link", () => {
    describe("Create", () => {
        test("without login", async () => {
            let response = await request(app).post("/api/course/createLink").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/course/createLink").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        });

        test("validation check", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/course/createLink").send({})
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=` + cookie[0]])

            expect(JSON.stringify(response.body)).toBe('{"code":500,"error":["Platform is required","Platform should be between 2-32 characters","Meeting link is required","Meeting time is required","Capacity is required","Capacity should be a decimal number","courseId is required","courseId should be a decimal number"]}');
        });
    });

    describe("Get", () => {
        test("without login", async () => {
            let response = await request(app).post("/api/course/getLink").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/course/getLink").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        });

        test("validation check", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).get("/api/course/getLink").send({})
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=` + cookie[0]])

            expect(JSON.stringify(response.body)).toBe('{}');
        });
    });

    describe("Get All", () => {
        test("without login", async () => {
            let response = await request(app).get("/api/course/getAllLinks").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).get("/api/course/getAllLinks").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        });

    });

    describe("Delete Link", () => {
        test("without login", async () => {
            let response = await request(app).post("/api/course/deleteLink").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/course/deleteLink").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        });

        test("validation check", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).get("/api/course/deleteLink").send({})
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=` + cookie[0]])

            expect(JSON.stringify(response.body)).toBe('{}');
        });
    });

    describe("Update Link", () => {
        test("without login", async () => {
            let response = await request(app).put("/api/course/updateLink").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).put("/api/course/updateLink").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        });

        test("validation check", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).put("/api/course/updateLink").send({})
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=` + cookie[0]])

            expect(JSON.stringify(response.body)).toBe('{"code":500,"error":["Id is required"]}');
        });
    });
});

describe("Management", () => {
    describe("Create", () => {
        test("without login", async () => {
            let response = await request(app).post("/api/management/create").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/management/create").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        });

        test("validation check", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/management/create").send({})
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=` + cookie[0]])

            expect(JSON.stringify(response.body)).toBe('{"code":500,"error":["Employee Id is required","Invalid value","Manager Id is required","Invalid value"]}');
        });
    });

    describe("Delete", () => {
        test("without login", async () => {
            let response = await request(app).post("/api/management/delete").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/management/delete").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        });

        test("validation check", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/management/delete").send({})
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=` + cookie[0]])

            expect(JSON.stringify(response.body)).toBe('{"code":500,"error":["Management Id is required","Invalid value"]}');
        });
    });

    describe("Get With Manager Id", () => {
        test("without login", async () => {
            let response = await request(app).post("/api/management/get/managerId").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/management/get/managerId").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        });

        test("validation check", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/management/get/managerId").send({})
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=` + cookie[0]])

            expect(JSON.stringify(response.body)).toBe('{"code":500,"error":["Manager Id is required","Invalid value"]}');
        });
    });

    describe("Get With Employee Id", () => {
        test("without login", async () => {
            let response = await request(app).post("/api/management/get/employeeId").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/management/get/employeeId").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        });

        test("validation check", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/management/get/employeeId").send({})
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=` + cookie[0]])

            expect(JSON.stringify(response.body)).toBe('{"code":500,"error":["Employee Id is required","Invalid value"]}');
        });
    });

    describe("Get All", () => {
        test("without login", async () => {
            let response = await request(app).get("/api/management/getAll").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).get("/api/management/getAll").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        })
    });

    describe("Get", () => {
        test("without login", async () => {
            let response = await request(app).post("/api/management/get").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/management/get").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        });

        test("validation check", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/management/get").send({})
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=` + cookie[0]])

            expect(JSON.stringify(response.body)).toBe('{"code":500,"error":["Employee Id is required","Invalid value","Manager Id is required","Invalid value"]}');
        });
    });

    describe("Get with id", () => {
        test("without login", async () => {
            let response = await request(app).post("/api/management/get/id").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/management/get/id").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        });

        test("validation check", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/management/get/id").send({})
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=` + cookie[0]])

            expect(JSON.stringify(response.body)).toBe('{"code":500,"error":["Management Id is required","Invalid value"]}');
        });
    });
});

describe("Notification", () => {
    describe("Send Notification", () => {

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/notification/sendNotification").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        })
    });
});

describe("Progress", () => {
    describe("Create", () => {
        test("without login", async () => {
            let response = await request(app).post("/api/reporting/createProgress").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/reporting/createProgress").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        })

        test("validation check", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/reporting/createProgress").send({})
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=` + cookie[0]])

            expect(JSON.stringify(response.body)).toBe('{"code":500,"error":["watchedTime is required","videoId is required","employeeId attribute is required"]}');
        });
    });

    describe("Get", () => {
        test("without login", async () => {
            let response = await request(app).post("/api/reporting/getProgress").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/reporting/getProgress").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        });

        test("validation check", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/reporting/getProgress").send({})
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=` + cookie[0]])

            expect(JSON.stringify(response.body)).toBe('{"code":500,"error":["Id is required"]}');
        });
    });

    describe("Get All", () => {
        test("without login", async () => {
            let response = await request(app).post("/api/reporting/getAllProgress").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/reporting/getAllProgress").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        })
    });

    describe("Delete", () => {
        test("without login", async () => {
            let response = await request(app).post("/api/reporting/deleteProgress").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/reporting/deleteProgress").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        });

        test("validation check", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/reporting/deleteProgress").send({})
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=` + cookie[0]])

            expect(JSON.stringify(response.body)).toBe('{"code":500,"error":["Id is required"]}');
        });
    });

    describe("Update", () => {
        test("without login", async () => {
            let response = await request(app).put("/api/reporting/updateProgress").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).put("/api/reporting/updateProgress").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        });

        test("validation check", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).put("/api/reporting/updateProgress").send({})
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=` + cookie[0]])

            expect(JSON.stringify(response.body)).toBe('{"code":500,"error":["watchedTime is required","videoId is required","employeeId attribute is required"]}');
        });
    });

    describe("Get Progress With Employee Id", () => {
        test("without login", async () => {
            let response = await request(app).post("/api/reporting/getProgressWithEmployeeId").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/reporting/getProgressWithEmployeeId").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        });

        test("validation check", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/reporting/getProgressWithEmployeeId").send({})
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=` + cookie[0]])

            expect(JSON.stringify(response.body)).toBe('{"code":500,"error":["Id is required"]}');
        });
    });

    describe("Get Progress With Employee Id and Video Id", () => {
        test("without login", async () => {
            let response = await request(app).post("/api/reporting/getProgressWithEmployeeIdAndVideoID").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/reporting/getProgressWithEmployeeIdAndVideoID").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        });

        test("validation check", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/reporting/getProgressWithEmployeeIdAndVideoID").send({})
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=` + cookie[0]])

            expect(JSON.stringify(response.body)).toBe('{"code":500,"error":["Id is required","Video Id is required"]}');
        });
    });
});

describe("Stream", () => {
    describe("Video Token", () => {
        test("without login", async () => {
            let response = await request(app).post("/api/stream/videoToken").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/stream/videoToken").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        });
    });
});

describe("Video", () => {
    describe("Create", () => {
        test("without login", async () => {
            let response = await request(app).post("/api/video/register").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/video/register").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        });

        test("validation check", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/video/register").send({})
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=` + cookie[0]])

            expect(JSON.stringify(response.body)).toBe('{"code":500,"error":["Title is required","Title should be between 2-255 characters!","Description is required","Cover Photo is required"]}');
        });
    });

    describe("Get", () => {
        test("without login", async () => {
            let response = await request(app).post("/api/video/get").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/video/get").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        });

        test("validation check", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/video/get").send({})
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=` + cookie[0]])

            expect(JSON.stringify(response.body)).toBe('{"code":500,"error":["Id is required!","Id must be numeric!"]}');
        });
    });

    describe("Get All", () => {
        test("without login", async () => {
            let response = await request(app).post("/api/video/getAll").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/video/getAll").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        });


    });

    describe("Delete", () => {
        test("without login", async () => {
            let response = await request(app).post("/api/video/erase").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/video/erase").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        });

        test("validation check", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/video/erase").send({})
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=` + cookie[0]])

            expect(JSON.stringify(response.body)).toBe('{"code":500,"error":["Id is required!","Id must be numeric!"]}');
        });
    });

    describe("Update", () => {
        test("without login", async () => {
            let response = await request(app).put("/api/video/update").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).put("/api/video/update").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        })

        test("validation check", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).put("/api/video/update").send({})
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=` + cookie[0]])

            expect(JSON.stringify(response.body)).toBe('{"code":500,"error":["Id is required!","Id must be numeric!","Title should be between 2-80 characters!"]}');
        });
    });
});

describe("Enrollment", () => {
    describe("Create", () => {
        test("without login", async () => {
            let response = await request(app).post("/api/enrollment/create").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/enrollment/create").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        });

        test("validation check", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/enrollment/create").send({})
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=` + cookie[0]])

            expect(JSON.stringify(response.body)).toBe('{"code":500,"error":["Employee Id is required","Invalid value","Course Id is required","Invalid value"]}');
        });
    });

    describe("Delete", () => {
        test("without login", async () => {
            let response = await request(app).post("/api/enrollment/delete").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/enrollment/delete").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        });

        test("validation check", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/enrollment/delete").send({})
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=` + cookie[0]])

            expect(JSON.stringify(response.body)).toBe('{"code":500,"error":["Enrollment Id is required","Invalid value"]}');
        });
    });

    describe("Get with course ID", () => {
        test("without login", async () => {
            let response = await request(app).post("/api/enrollment/get/courseId").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/enrollment/get/courseId").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        });

        test("validation check", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/enrollment/get/courseId").send({})
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=` + cookie[0]])

            expect(JSON.stringify(response.body)).toBe('{"code":500,"error":["Course Id is required","Invalid value"]}');
        });
    });

    describe("Get with Employee ID", () => {
        test("without login", async () => {
            let response = await request(app).post("/api/enrollment/get/employeeId").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/enrollment/get/employeeId").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        });

        test("validation check", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/enrollment/get/employeeId").send({})
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=` + cookie[0]])

            expect(JSON.stringify(response.body)).toBe('{"code":500,"error":["Employee Id is required","Invalid value"]}');
        });
    });

    describe("Get All", () => {
        test("without login", async () => {
            let response = await request(app).get("/api/enrollment/getAll").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).get("/api/enrollment/getAll").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        })
    });

    describe("Get", () => {
        test("without login", async () => {
            let response = await request(app).post("/api/enrollment/get").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/enrollment/get").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        });

        test("validation check", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/enrollment/get").send({})
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=` + cookie[0]])

            expect(JSON.stringify(response.body)).toBe('{"code":500,"error":["Employee Id is required","Invalid value","Course Id is required","Invalid value"]}');
        });
    });

    describe("Get with id", () => {
        test("without login", async () => {
            let response = await request(app).post("/api/enrollment/get/id").send({
            });

            expect(response.statusCode).toBe(401);
        });

        test("with login", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/enrollment/get/id").send({
            })
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=`+cookie[0]])

            expect(response.statusCode).not.toBe(401);
        });

        test("validation check", async () => {
            let login = await request(app).post("/api/authentication/login").send({
                username: "admin",
                password: "basarbasar"
            });

            let cookie = login.headers["set-cookie"][0].split('access-token=');
            cookie = cookie[1].split("\r\n");

            let response = await request(app).post("/api/enrollment/get/id").send({})
                .set('Accept-Language', 'en')
                .set('Cookie', [`access-token=` + cookie[0]])

            expect(JSON.stringify(response.body)).toBe('{"code":500,"error":["Enrollment Id is required","Invalid value"]}');
        });
    });
});