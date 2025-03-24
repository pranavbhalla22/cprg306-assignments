"use client";
import { useUserAuth } from "./_utils/auth-context";
import Link from "next/link";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  return (
    <div className="p-4 min-h-screen" style={{ backgroundColor: '#4E80EE' }}>
      <h1 className="text-3xl font-bold mb-4 text-white">Welcome to the Shopping List App</h1>
      {user ? (
        <div>
          <p className="text-white">
            Welcome, {user.displayName} ({user.email})
          </p>
          <button
            onClick={firebaseSignOut}
            className="mt-4 p-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
          <Link href="/week-9/shopping-list">
            <button className="mt-4 ml-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Go to Shopping List
            </button>
          </Link>
        </div>
      ) : (
        <button
          onClick={gitHubSignIn}
          className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Login with GitHub
        </button>
      )}
    </div>
  );
}