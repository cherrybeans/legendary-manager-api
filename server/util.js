export const isAdmin = user => user.isAdmin;

export const isAuthenticated = user => !!user;

export const isSameUser = (user, userTwoId) => user.id === userTwoId;
