import React from 'react';

const UserList = ({ users, onBlock, isAdmin, currentUserRole }) => {
  console.log('isAdmin:', isAdmin);
  console.log('currentUserRole:', currentUserRole);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Usuários</h2>
      <ul className="space-y-4">
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.id} className="p-4 border border-gray-300 rounded-lg flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div>
                  <span className="font-medium">{user.email}</span> - <span className="text-gray-600">{user.role}</span>
                </div>
                {isAdmin && user.role === 'collaborator' && currentUserRole === 'admin' && user.role !== 'admin' && (
                  <button
                    onClick={() => onBlock(user.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Bloquear
                  </button>
                )}
              </div>
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
