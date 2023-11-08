import * as bcrypt from 'bcryptjs';

const user = {
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoic2VjcmV0X2FkbWluIiwiaWF0IjoxNjk5NDgwMTE4fQ.7S_9o1yBGUMGpkIXOB9KpW7PQJupyqViN2s7_kFk9QA"
  // senha: secret_admin
}
const validUser = {
  username: 'admin',
  role: 'admin',
  email: user.email,
  password: bcrypt.hashSync(user.password, 10),
}

const userIvalid = {
  username: 'admin',
  role: 'admin',
  email: 'admin@gg.com',
  password: bcrypt.hashSync('secret_admin', 10)
}

const passwordIvalid = {
  email: 'admin@admin.com',
  password: 'nem'

  // senha: secret_admin
};
const INVALID_DATA = {
  status: 'INVALID_DATA',
  data: { message: 'Invalid email or password' },
};
const NOT_DATA = {
  status: 400,
  data: { message: 'All fields must be filled' },
};

const notData = {
  email: '',
  password: '',
  token: ''

}
export {
  user,
  INVALID_DATA,
  userIvalid,
  passwordIvalid,
  validUser,
  notData,
  NOT_DATA

}