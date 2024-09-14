import React from 'react';

const UserList = ({ users, onBlock, isAdmin, currentUserRole }) => {
  console.log('Users:', users);
  console.log('isAdmin:', isAdmin);
  console.log('currentUserRole:', currentUserRole);

  return (
    <div>
      <ul className="space-y-4">
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.id} className="p-4 border border-gray-300 rounded-lg flex items-center justify-between">
              <div className="flex-1 flex items-center space-x-4">
                <div>
                  <span className="font-medium">{user.email}</span> - <span className="text-gray-600">{user.role}</span>
                </div>
              </div>
                <button
                  onClick={() => onBlock(user.id, user.isBlocked)}
                  className={`px-4 py-2 rounded-lg transition ${user.isBlocked ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-red-500 text-white hover:bg-red-600'}`}
                >
                  {user.isBlocked ? 'Desbloquear' : 'Bloquear'}
                </button>
            </li>
          ))
        ) : (
          <p className="text-gray-600">Nenhum usuário encontrado.</p>
        )}
      </ul>
    </div>
  );
};

export default UserList;
