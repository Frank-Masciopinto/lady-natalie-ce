import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// Utils
import request from '../../utils/request';
import trackClick from '../../utils/trackClick';

// Hooks
import { useAuth } from '../../hooks/useAuth';

function Login() {
  // hooks
  const { login } = useAuth();

  // UseState
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [, setTermsChecked] = useState(false);
  const [, setResetPasswordSent] = useState(false);
  const [, setAuthLoading] = useState(false);
  const [, setAuthError] = useState(null);

  const navigate = useNavigate();

  // const sendResetPassword = () => {
  //     if (!email) {
  //         return;
  //     }
  //     request(`/auth/forgot-password`, {
  //         method: "POST",
  //         body: {
  //             email
  //         }
  //     })
  //         .then(response => {
  //             setResetPasswordSent(true);
  //         })
  // }

  const startLogin = async () => {
    setAuthLoading(true);
    trackClick('login');

    request('/auth/login', {
      method: 'POST',
      body: {
        email,
        password,
      },
    }).then((response) => {
      setAuthLoading(false);

      if (response.message) {
        setAuthError(response.message);

        return;
      }

      setAuthError(null);

      if (response?.data?.tokens) {
        localStorage.setItem(
          'accessToken',
          response?.data?.tokens.access.token
        );
        localStorage.setItem(
          'refreshToken',
          response?.data?.tokens.refresh.token
        );

        login({
          ...response.data.user,
          ...{
            isLoggedIn: true,
            role: response?.data?.user?.role,
          },
        });

        navigate('/');

        // Reset auth data
        setEmail(null);
        setPassword(null);
        setAuthError(null);
        setAuthLoading(false);
        setResetPasswordSent(false);
        setTermsChecked(false);
      }
    });
  };

  return (
    <div className="relative px-4 py-8 flex justify-center items-center min-h-screen">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            Sign in to your account
          </h2>
        </div>
        <input type="hidden" name="remember" value="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link
              to="/signup"
              className="font-medium text-red-600 hover:text-red-500"
            >
              Signup
            </Link>
          </div>

          <div className="text-sm">
            <Link
              to="/reset-password"
              className="font-medium text-red-600 hover:text-red-500"
            >
              Forgot your password?
            </Link>
          </div>
        </div>

        <div>
          <button
            onClick={startLogin}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg
                className="h-5 w-5 text-red-500 group-hover:text-red-400 transition ease-in-out duration-150"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.707 9.707a1 1 0 0 1 0-1.414L7.586 4H10a1 1 0 1 1 0 2H8.414l2.293 2.293a1 1 0 0 1-1.414 1.414l-2.5-2.5a1 1 0 0 1 0-1.414l2.5-2.5a1 1 0 1 1 1.414 1.414L8.414 7H10a3 3 0 1 1 0 6 1 1 0 0 1 0-2 1 1 0 0 0 0-2H7.586l-2.293-2.293a1 1 0 0 1 1.414-1.414l2.5 2.5a1 1 0 0 1 0 1.414l-2.5 2.5z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
