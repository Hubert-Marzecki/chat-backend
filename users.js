const users = [];

const addUser = ( {id,nick,room} ) => {

    // to manage user nicks combine them to this form => userone1
    nick = nick.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.find(user => user.room === room && user.nick === nick);
    if(existingUser) {
        return {
            error: 'Username is taken'
        }
    }

    const newUser = {id, nick, room}
    users.push(newUser)

    // to get user after adding him
    return newUser;
}

const removeUser = (id) => {

const index = users.findIndex((user) => user.id === id);

if(index !== -1) {
    return users.splice(index,1)[0];
}
}

const getUser = (id) => {
   return users.find((user) => user.id === id)
}

const getUsersInRoom = (room) => {
    users.filter((user) => user.room === room)
}

module.exports = {addUser, removeUser, getUser, getUsersInRoom }