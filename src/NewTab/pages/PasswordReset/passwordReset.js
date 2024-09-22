import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Utils
import request from '../../utils/request';

// Components
import Button from '../../components/Button/Button';

function PasswordReset() {
  // Change password state
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState(null);
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const resetPassword = async () => {
    if (!newPassword || !confirmNewPassword) {
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setNewPasswordError("Passwords don't match");
      return;
    }

    const response = await request('/auth/reset-password', {
      method: 'POST',
      query: `token=${searchParams.get('token')}`,
      body: {
        password: newPassword,
      },
    });

    if (response.message) {
      setNewPasswordError(response.message);
      return;
    }

    window.location.href = 'https://wanderlustapp.io';
    navigate('/login');
  };

  return (
    <div className="relative h-full w-full px-4 py-8 bg-white dark:bg-gray-700 flex items-center justify-center ml-16">
      <div className="w-full flex items-center justify-center">
        <div className="w-full p-4 mt-8 bg-white rounded-lg shadow dark:border sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Reset Password
          </h2>
          <div className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Confirm password
              </label>
              <input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                name="confirm-password"
                id="confirm-password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            {newPasswordError && (
              <p className="text-sm text-red-700">{newPasswordError}</p>
            )}
            <Button text="Reset Password" onClick={resetPassword} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordReset;
