const users = [
  { user: 'user', pass: 'pass', role: 'user', token: 'user' },
  { user: 'admin', pass: 'admin', role: 'admin', token: 'admin' },
  { user: 'abc', pass: '0000', role: 'guest', token: 'guest' },
];

export function verifyUser(user, pass) {
  const found = users.find((u) => u.user === user && u.pass === pass);
  return found
    ? { role: found.role, token: found.token }
    : null;
}
